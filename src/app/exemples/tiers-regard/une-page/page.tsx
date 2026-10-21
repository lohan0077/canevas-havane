import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CommeTous, Etiquette } from "../_composants/Blocs";
import UnePage from "../_composants/UnePage";
import { DOSSIER } from "../_composants/donnees";

// « Sur le site, ton rapport, traduit en une seule page. Ce qui va, et ce qui cloche. »
// La page de la vidéo, en état de marche. Exemple : aucun logement réel ; la page traduit
// le rapport sans le remplacer, et ne recommande aucune entreprise (CCH L271-6).
export const metadata: Metadata = {
  title: "Ton rapport en une page — Tiers Regard, site de démonstration",
  description: "Un rapport de diagnostic immobilier traduit en une seule page : ce qui va, ce qui cloche, en clair ou mot pour mot. Exemple d'un diagnostiqueur imaginaire.",
  ...adressesDeLaPage("/exemples/tiers-regard/une-page"),
};

export default function PageUnePage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-6 sm:px-8 sm:pt-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <Etiquette>Exemple de rapport</Etiquette>
        <h1 className="font-[family-name:var(--titres)] text-[34px] font-semibold leading-[1.02] tracking-[-0.025em] sm:text-[52px]">
          Ton rapport, traduit en <span className="text-[var(--accent-texte)]">une seule page.</span>
        </h1>
        <p className="hidden text-[17px] leading-relaxed text-[var(--doux)] lg:block">
          Un rapport de diagnostic fait souvent des dizaines de pages. Celle-ci dit l&apos;essentiel :
          ce qui va, ce qui cloche. Touche une ligne pour la lire en clair, ou mot pour mot.
        </p>
        <CommeTous className="hidden lg:block" />
      </div>
      <div className="space-y-8">
        <UnePage />
        <div className="space-y-4 lg:hidden">
          <p className="text-[16px] leading-relaxed text-[var(--doux)]">
            Un rapport de diagnostic fait souvent des dizaines de pages. Celle-ci dit l&apos;essentiel.
          </p>
          <CommeTous />
        </div>
        <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex h-12 items-center gap-3 rounded-[6px] bg-[var(--accent)] pl-5 pr-2 text-[13px] font-medium uppercase tracking-[0.16em] text-[var(--sur-accent)]">
          Prendre rendez-vous
          <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-[4px] bg-[var(--sur-accent)] text-[var(--accent)]">↗</span>
        </Link>
      </div>
    </div>
  );
}
