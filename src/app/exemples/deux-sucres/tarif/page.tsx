import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, HEURE_HT, TVA, euros } from "../_composants/donnees";
import { Tarif } from "../_composants/Blocs";

// « Le prix, en gros. Le crédit d'impôt, à part et plus petit. C'est la règle, et c'est
// plus honnête. » Filmée (Videos/marque-services-personne).
export const metadata: Metadata = {
  title: "Deux Sucres — site de démonstration",
  description: "Le tarif d'une entreprise d'aide à domicile imaginaire : le prix en gros, HT et TTC ; le crédit d'impôt à part et plus petit.",
  ...adressesDeLaPage("/exemples/deux-sucres/tarif"),
};

const SEMAINES = [2, 3, 4].map((h) => ({ h, ht: h * HEURE_HT, ttc: h * HEURE_HT * (1 + TVA) }));

export default function PageTarif() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 pt-6 sm:pt-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div className="space-y-4 md:pt-6">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Le <span className="italic text-[var(--accent-texte)]">tarif.</span></h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Un seul prix de l&apos;heure, hors taxes et toutes taxes comprises. Le reste, à part.</p>
        </div>
        <Tarif />
      </section>
      <section className="bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-6 px-5 py-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Une semaine, pour se repérer</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {SEMAINES.map((s) => (
              <li key={s.h} className="rounded-[26px] bg-[var(--fond)] p-6 space-y-1">
                <p className="font-semibold">{s.h} heures, le même jour</p>
                <p className="font-[family-name:var(--titres)] text-4xl font-semibold">{euros(s.ttc)}</p>
                <p className="text-[var(--doux)]">TTC, soit {euros(s.ht)} HT · exemple</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple : l&apos;entreprise est fictive. Le taux de TVA dépend des activités. Le devis est gratuit.</p>
          <Link href={`${DOSSIER}/celle-qui-viendra`} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--accent)] px-7 font-semibold text-[var(--sur-accent)]">Rencontrer celle qui viendra</Link>
        </div>
      </section>
    </>
  );
}
