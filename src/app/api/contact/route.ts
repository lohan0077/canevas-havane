import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// nodemailer nécessite le runtime Node (pas Edge).
export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Merci de remplir tous les champs." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "Contenu trop long." }, { status: 400 });
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

  return NextResponse.json({ ok: true });
}
