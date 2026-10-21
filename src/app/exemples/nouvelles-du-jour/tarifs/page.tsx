import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, HEURE_HT, TVA, euros } from "../_composants/donnees";
import { PrixHonnete } from "../_composants/Blocs";

// « Sur le site, le prix en gros. Et en dessous, à part, en plus petit : le crédit
// d'impôt, sous conditions. » La page des tarifs, filmée (Videos/agenda-services-personne).
export const metadata: Metadata = {
  title: "Nouvelles du Jour — site de démonstration",
  description: "Les tarifs d'une entreprise d'aide à domicile imaginaire : le prix en gros, HT et TTC ; l'avantage fiscal à part, en plus petit.",
  ...adressesDeLaPage("/exemples/nouvelles-du-jour/tarifs"),
};

const EXEMPLES = [2, 4, 6].map((h) => ({ h, ht: h * HEURE_HT, ttc: h * HEURE_HT * (1 + TVA) }));

export default function Tarifs() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-8 sm:pt-14 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div className="space-y-5 md:pt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Les tarifs</p>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Un prix, écrit en gros.</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le même prix pour le ménage, le linge et les courses. Hors taxes et toutes taxes
            comprises, sans frais cachés.
          </p>
        </div>
        <PrixHonnete />
      </section>

      <section className="bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-8 px-5 py-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Par semaine, pour se repérer</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {EXEMPLES.map((e) => (
              <li key={e.h} className="rounded-[24px] bg-[#E6EDE4] p-6 space-y-1">
                <p className="font-semibold">{e.h} heures par semaine</p>
                <p className="font-[family-name:var(--titres)] text-4xl font-semibold tabular-nums">{euros(e.ttc)}</p>
                <p className="text-[var(--doux)]">TTC, soit {euros(e.ht)} HT · exemple</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple : l&apos;entreprise est fictive. Le taux de TVA dépend des activités.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-5 px-5 py-16 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Ton devis, en trois questions.</h2>
        <Link href={`${DOSSIER}/devis`} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--accent)] px-7 font-semibold text-[var(--sur-accent)]">Commencer</Link>
      </section>
    </>
  );
}
