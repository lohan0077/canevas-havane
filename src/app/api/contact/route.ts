import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { adresseClient, BAREMES, limiterDebit } from "@/lib/rate-limit";
import { lireCorpsPlafonne, TAILLE_MAX_CORPS } from "@/lib/corps-requete";

// nodemailer nécessite le runtime Node (pas Edge).
export const runtime = "nodejs";

// Le compteur en mémoire n'a de sens que si l'instance reste vivante entre deux
// requêtes : la route ne doit donc jamais être pré-rendue ni mise en cache.
export const dynamic = "force-dynamic";

// Les seuls messages d'erreur qu'un visiteur a le droit de lire. Tout ce que le
// schéma pourrait produire d'autre — un message brut de Zod, en anglais, nommant
// le type attendu — est remplacé par le message générique. Audit du 10/08/2026 :
// `{"name":123}` renvoyait « Invalid input: expected string, received number ».
const CHAMPS_OBLIGATOIRES = "Merci de remplir tous les champs.";
const CONTENU_TROP_LONG = "Contenu trop long.";
const EMAIL_INVALIDE = "Adresse email invalide.";
const REQUETE_INVALIDE = "Requête invalide.";
const MESSAGES_AUTORISES: readonly string[] = [
  CHAMPS_OBLIGATOIRES,
  CONTENU_TROP_LONG,
  EMAIL_INVALIDE,
  REQUETE_INVALIDE,
];

const schemaContact = z.object({
  name: z
    .string(CHAMPS_OBLIGATOIRES)
    .trim()
    .min(1, CHAMPS_OBLIGATOIRES)
    .max(200, CONTENU_TROP_LONG),
  email: z
    .string(CHAMPS_OBLIGATOIRES)
    .trim()
    .max(200, CONTENU_TROP_LONG)
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, EMAIL_INVALIDE),
  message: z
    .string(CHAMPS_OBLIGATOIRES)
    .trim()
    .min(1, CHAMPS_OBLIGATOIRES)
    .max(5000, CONTENU_TROP_LONG),
  // Champ piège : absent ou vide chez un visiteur réel. Borné comme les autres —
  // c'était le seul champ du schéma sans plafond de longueur.
  website: z.string(REQUETE_INVALIDE).max(200, CONTENU_TROP_LONG).optional(),
});

// Réponse identique pour un robot piégé et pour un envoi réussi : ne rien lui apprendre.
// C'est une fonction et non une constante — le corps d'une réponse ne se lit qu'une fois,
// une instance partagée entre deux requêtes échouerait à la seconde.
const reponseOk = () => NextResponse.json({ ok: true });

export async function POST(request: Request) {
  // semgrep-ok: publique parce que c'est un formulaire de contact — il n'y a ni compte
  // utilisateur ni ressource privée sur ce site. Ce qui tient lieu de garde, ce sont
  // les deux plafonds et le champ piège ci-dessous.

  // 1. Plafond par IP, avant tout travail : une requête refusée ne doit rien coûter.
  const ip = adresseClient(request);
  const parIp = limiterDebit(`contact:${ip}`, BAREMES.contactParIp);
  if (!parIp.autorise) {
    return NextResponse.json(
      { error: "Trop de messages envoyés. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(parIp.resteMs / 1000)) } },
    );
  }

  // 2. Taille du corps, avant de le mettre en mémoire.
  const corps = await lireCorpsPlafonne(request, TAILLE_MAX_CORPS);
  if (!corps.ok) {
    return NextResponse.json(
      { error: corps.raison === "trop-gros" ? CONTENU_TROP_LONG : REQUETE_INVALIDE },
      { status: corps.raison === "trop-gros" ? 413 : 400 },
    );
  }

  let brut: unknown;
  try {
    brut = JSON.parse(corps.texte);
  } catch {
    return NextResponse.json({ error: REQUETE_INVALIDE }, { status: 400 });
  }

  const resultat = schemaContact.safeParse(brut);
  if (!resultat.success) {
    // Le premier message du schéma suffit au visiteur — à condition qu'il vienne
    // bien de nous. Le détail reste côté serveur.
    const premier = resultat.error.issues[0]?.message;
    const message = premier && MESSAGES_AUTORISES.includes(premier) ? premier : REQUETE_INVALIDE;
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { name, email, message, website } = resultat.data;

  // 3. Champ piège rempli : on jette le message en répondant « envoyé », pour ne pas
  // signaler la détection au robot. Aucun jeton du plafond global n'est consommé —
  // un robot ne doit pas pouvoir fermer le formulaire aux visiteurs légitimes.
  if (website) {
    console.warn(`Formulaire de contact : champ piège rempli depuis ${ip}, message ignoré.`);
    return reponseOk();
  }

  // 4. Plafond global, décompté ici et pas plus tôt : il protège le quota d'envoi du
  // compte Google, donc il ne doit être entamé que par ce qui va réellement partir.
  //
  // Il était auparavant décompté avant même la lecture du corps. Une requête dont le
  // contenu n'était pas du JSON consommait donc un jeton et repartait en 400 : 42 de
  // ces requêtes, réparties sur 14 adresses, fermaient le formulaire à tout le monde
  // pendant une heure, sans qu'un seul e-mail soit envoyé (audit du 10/08/2026).
  const global = limiterDebit("contact:global", BAREMES.contactGlobal);
  if (!global.autorise) {
    console.error("Formulaire de contact : plafond horaire global atteint.");
    return NextResponse.json(
      { error: "Le service est momentanément saturé. Réessayez plus tard." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(global.resteMs / 1000)) } },
    );
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!host || !user || !password || !to) {
    console.error("Formulaire de contact : configuration SMTP incomplète.");
    return NextResponse.json(
      { error: "Le service d'envoi n'est pas configuré. Contactez-nous directement par email." },
      { status: 503 }
    );
  }

  const port = Number(process.env.SMTP_PORT ?? 587);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = TLS implicite, 587 = STARTTLS
    auth: { user, pass: password },
  });

  try {
    await transporter.sendMail({
      // Gmail réécrit l'expéditeur s'il diffère du compte authentifié :
      // on envoie donc depuis `user` et on place l'adresse du visiteur en réponse.
      from: `"Canevas Havane" <${user}>`,
      to,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Nouveau contact : ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
    });
  } catch (error) {
    console.error("Échec de l'envoi SMTP :", error);
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez ou contactez-nous par email." },
      { status: 502 }
    );
  }

  return reponseOk();
}
