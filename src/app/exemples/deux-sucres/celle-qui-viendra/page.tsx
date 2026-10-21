import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Rencontre from "../_composants/Rencontre";

// « Sur le site, tu choisis pas un service. Tu rencontres celle qui viendra. Son
// prénom, sa photo, ce qu'elle aime. » Filmée (Videos/marque-services-personne).
export const metadata: Metadata = {
  title: "Deux Sucres — site de démonstration",
  description: "Rencontrer celle qui viendra : son prénom, ses jours, ce qu'elle aime. Démonstration d'une entreprise d'aide à domicile imaginaire.",
  ...adressesDeLaPage("/exemples/deux-sucres/celle-qui-viendra"),
};

export default function CelleQuiViendra() {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-20 pt-6 sm:pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      <div className="space-y-4 lg:pt-6">
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Celle qui <span className="italic text-[var(--accent-texte)]">viendra.</span></h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">Pas un service : une personne. Son prénom, ses jours, ce qu&apos;elle aime.</p>
      </div>
      <Rencontre />
    </section>
  );
}
