import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Devis from "../_composants/Devis";

// « Et le devis, en trois questions : combien d'heures, quels jours, pour qui. »
// L'outil, filmé tel quel (Videos/agenda-services-personne/tournage.mjs).
export const metadata: Metadata = {
  title: "Nouvelles du Jour — site de démonstration",
  description: "Le devis d'une entreprise d'aide à domicile imaginaire, en trois questions : combien d'heures, quels jours, pour qui.",
  ...adressesDeLaPage("/exemples/nouvelles-du-jour/devis"),
};

export default function PageDevis() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-8 sm:pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="space-y-5 lg:pt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Devis gratuit</p>
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
          Ton devis en <span className="italic text-[var(--accent-texte)]">3 questions.</span>
        </h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          Combien d&apos;heures, quels jours, pour qui. Le reste, on en parle à la maison.
        </p>
      </div>
      <Devis />
    </section>
  );
}
