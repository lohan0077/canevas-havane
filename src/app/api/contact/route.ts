import { NextResponse } from "next/server";

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
    return NextResponse.json(
      { error: "Merci de remplir tous les champs." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Adresse email invalide." },
      { status: 400 }
    );
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "Contenu trop long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    console.error("Contact form: RESEND_API_KEY ou CONTACT_TO_EMAIL manquant.");
    return NextResponse.json(
      { error: "Le service d'envoi n'est pas configuré. Contactez-nous directement par email." },
      { status: 503 }
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Canevas Havane <onboarding@resend.dev>",
      to: [toEmail],
      reply_to: email,
      subject: `Nouveau contact : ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
    }),
  });

  if (!response.ok) {
    console.error("Resend error:", response.status, await response.text());
    return NextResponse.json(
      { error: "L'envoi a échoué. Réessayez ou contactez-nous par email." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
