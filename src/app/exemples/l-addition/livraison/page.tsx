import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { marque } from "../_composants/donnees";
import Jeudi from "../_composants/Jeudi";

export const metadata: Metadata = {
  title: "Livraison et retours · L'Addition — site de démonstration",
  description: "Site de démonstration d'une marque de vêtements imaginaire : livré le jeudi, une date écrite avant la commande, et quatorze jours pour changer d'avis.",
  ...adressesDeLaPage("/exemples/l-addition/livraison"),
};

const SEMAINE = [
  { jour: "Lundi", texte: "On prépare les colis de toutes les commandes passées jusqu'au lundi soir." },
  { jour: "Mardi", texte: "Les colis partent." },
  { jour: "Mercredi", texte: "Ils roulent." },
  { jour: "Jeudi", texte: "Ils arrivent chez toi.", fort: true },
];

export default function Livraison() {
  return (
    <>
      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 pt-10 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Livraison et retours</p>
        <h1 className="text-6xl font-black tracking-tight sm:text-8xl">
          Livré <span className="text-[var(--accent-texte)]">jeudi.</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          « Livraison rapide » ne dit rien. La loi demande une date ou un délai avant l&apos;achat ; nous,
          on écrit le jour. Une commande passée aujourd&apos;hui arrive le <strong><Jeudi /></strong>.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6">
        <ol className="grid gap-3 sm:grid-cols-4">
          {SEMAINE.map((j) => (
            <li key={j.jour} className={`space-y-2 rounded-[16px] border-2 p-5 ${j.fort ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--encre)] bg-[var(--carte)]"}`}>
              <h2 className="text-2xl font-black tracking-tight">{j.jour}</h2>
              <p>{j.texte}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-[var(--doux)]">L&apos;envoi est compris dans le prix : il a sa ligne dans l&apos;addition de chaque vêtement.</p>
      </section>

      <section className="bg-[var(--carte)] px-5 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight">Quatorze jours pour changer d&apos;avis.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Comme pour tout achat à distance, tu as quatorze jours après la réception pour nous renvoyer
              un vêtement, sans avoir à te justifier. On te rembourse dans les quatorze jours qui suivent ta
              demande.
            </p>
          </div>
          <dl className="divide-y-2 divide-[var(--encre)] border-y-2 border-[var(--encre)]">
            {[
              ["Le retour", "Dans son carton d'origine, avec l'étiquette. Les frais de retour sont à ta charge."],
              ["L'échange de taille", "Tu renvoies la mauvaise taille, on t'envoie la bonne : ce nouvel envoi est à notre charge."],
              ["Le remboursement", "Sur le moyen de paiement utilisé, dans les quatorze jours."],
              ["Une question", `${marque.telephone}, ${marque.horaires.toLowerCase()}.`],
            ].map(([t, d]) => (
              <div key={t} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
                <dt className="font-bold">{t}</dt>
                <dd className="text-[var(--doux)]">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
