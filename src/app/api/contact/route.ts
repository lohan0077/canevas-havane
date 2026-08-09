import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { adresseClient, BAREMES, limiterDebit } from "@/lib/rate-limit";

// nodemailer nécessite le runtime Node (pas Edge).
export const runtime = "nodejs";

// Le compteur en mémoire n'a de sens que si l'instance reste vivante entre deux
// requêtes : la route ne doit donc jamais être pré-rendue ni mise en cache.
export const dynamic = "force-dynamic";

const schemaContact = z.object({
  name: z.string().trim().min(1, "Merci de remplir tous les champs.").max(200, "Contenu trop long."),
  email: z
    .string()
    .trim()
    .max(200, "Contenu trop long.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Adresse email invalide."),
  message: z.string().trim().min(1, "Merci de remplir tous les champs.").max(5000, "Contenu trop long."),
  // Champ piège : absent ou vide chez un visiteur réel.
  website: z.string().optional(),
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

  // 2. Plafond global : protège le quota d'envoi Google même si l'attaque change d'IP.
  const global = limiterDebit("contact:global", BAREMES.contactGlobal);
  if (!global.autorise) {
    console.error("Formulaire de contact : plafond horaire global atteint.");
    return NextResponse.json(
      { error: "Le service est momentanément saturé. Réessayez plus tard." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(global.resteMs / 1000)) } },
    );
  }

  let brut: unknown;
  try {
    brut = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const resultat = schemaContact.safeParse(brut);
  if (!resultat.success) {
    // Le premier message du schéma suffit au visiteur ; le détail reste côté serveur.
    const premier = resultat.error.issues[0]?.message ?? "Requête invalide.";
    return NextResponse.json({ error: premier }, { status: 400 });
  }

  const { name, email, message, website } = resultat.data;

  // 3. Champ piège rempli : on jette le message en répondant « envoyé », pour ne pas
  // signaler la détection au robot.
  if (website) {
    console.warn(`Formulaire de contact : champ piège rempli depuis ${ip}, message ignoré.`);
    return reponseOk();
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
