import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { ARBRES, DOSSIER, LIVRAISON, euros, recolteDe } from "../_composants/donnees";
import { Fruit } from "../_composants/Dessins";

export const metadata: Metadata = {
  title: "Premier Fruit — site de démonstration",
  description: "Le catalogue d'une pépinière imaginaire : chaque arbre fruitier avec l'été estimé de sa première récolte et son passeport phytosanitaire.",
  ...adressesDeLaPage("/exemples/premier-fruit/arbres"),
};

export default function Arbres() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="max-w-2xl space-y-5">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Nos arbres · saison 2026 – 2027</p>
        <h1 className="font-normal text-[48px] sm:text-6xl">Choisis ton été.</h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          Chaque arbre affiche l&apos;année estimée de sa première récolte, pour une plantation en novembre. Tous
          voyagent avec leur passeport phytosanitaire, et arrivent le {LIVRAISON.date}.
        </p>
      </div>

      <ul className="mt-12 space-y-4">
        {ARBRES.map((a) => (
          <li key={a.slug}>
            <Link
              href={`${DOSSIER}/arbres/${a.slug}`}
              className="group grid grid-cols-[84px_1fr] items-center gap-4 rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-4 sm:grid-cols-[120px_1fr_auto] sm:gap-8 sm:p-6"
            >
              <span className="grid aspect-square place-items-center rounded-[18px] bg-[#F1E6D6]">
                <Fruit fruit={a.fruit} className="h-16 w-16 sm:h-24 sm:w-24 transition-transform group-hover:-rotate-6" />
              </span>
              <span className="space-y-1">
                <span className="block font-[family-name:var(--titres)] text-[28px] leading-tight sm:text-4xl">
                  {a.espece} <span className="italic">{a.variete}</span>
                </span>
                <span className="block text-[15px] text-[var(--doux)]">{a.phrase}</span>
                <span className="block pt-1 text-[14px] font-semibold text-[var(--accent-texte)]">
                  Première récolte estimée : {recolteDe(a, "demi-tige").toLowerCase()} · exemple
                </span>
              </span>
              <span className="col-span-2 flex items-center justify-between border-t border-[var(--trait)] pt-3 sm:col-span-1 sm:block sm:border-0 sm:pt-0 sm:text-right">
                <span className="block text-[14px] text-[var(--doux)]">dès</span>
                <span className="block text-2xl font-semibold tabular-nums">{euros(a.prix.scion)} TTC</span>
                <span className="block text-[13px] text-[var(--doux)]">exemple</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-[var(--doux)]">
        Prix TTC d&apos;exemple, hors livraison ({euros(LIVRAISON.prix)}). Années de récolte estimées :
        elles dépendent de la variété, du porte-greffe, de la forme de l&apos;arbre et du sol.
      </p>
    </main>
  );
}
