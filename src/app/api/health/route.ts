import { NextResponse } from "next/server";

// Point de contrôle pour une surveillance externe (UptimeRobot ou équivalent).
//
// Il répond 200 tant que le site tourne ET que la configuration d'envoi d'e-mail est
// présente ; 503 sinon. C'est ce second cas qui compte : le jour où le mot de passe
// d'application Google est retiré ou expire, le formulaire de contact cesse
// silencieusement de fonctionner. Sans ce contrôle, personne ne l'apprend.
//
// Volontairement muet sur le détail : un visiteur ne doit pas pouvoir déduire d'ici
// quelle variable manque.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  // semgrep-ok: publique et sans plafond parce que c'est un point de contrôle destiné à
  // une sonde externe — un plafond ferait passer la sonde elle-même pour une panne.
  // La route ne divulgue qu'un mot : "ok" ou "degraded".

  const smtpConfigure = Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.CONTACT_TO_EMAIL,
  );

  if (!smtpConfigure) {
    console.error("Contrôle de santé : configuration SMTP incomplète, le formulaire est hors service.");
    return NextResponse.json(
      { status: "degraded" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { status: "ok" },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}
