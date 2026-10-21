import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER } from "../_composants/donnees";
import EcrireCarte from "../_composants/EcrireCarte";
import { Libelle } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "La carte — Deux Mots — site de démonstration",
  description: "Que mettre sur la carte d'un bouquet de fleurs ? Des phrases pour l'amour, un anniversaire, un ami, un merci, un pardon — et la tienne, écrite à la main.",
  ...adressesDeLaPage("/exemples/deux-mots/la-carte"),
};

// Ce que les gens tapent : « message bouquet de fleur amour », « … anniversaire »,
// « … amitié » (suggestions Google relevées le 15/10/2026). La page y répond.
export default function LaCarte() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-20">
      <div className="max-w-3xl space-y-5">
        <Libelle>La carte</Libelle>
        <h1 className="text-[52px] sm:text-[80px]">
          Que mettre <span className="italic text-[var(--accent-texte)]">sur la carte&nbsp;?</span>
        </h1>
        <p className="text-lg leading-relaxed">
          Choisis une phrase, change un mot, ou écris la tienne : on la recopie à la main,
          à l&apos;encre, sur la carte du bouquet.
        </p>
      </div>
      <div className="mt-12">
        <EcrireCarte />
      </div>
      <Link href={`${DOSSIER}#choix`} className="mt-14 inline-flex items-center gap-3 rounded-full bg-[var(--encre)] py-2 pl-6 pr-2 font-semibold text-[var(--fond)]">
        Choisir le bouquet qui va avec
        <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-[var(--fond)] text-[var(--encre)]">→</span>
      </Link>
    </main>
  );
}
