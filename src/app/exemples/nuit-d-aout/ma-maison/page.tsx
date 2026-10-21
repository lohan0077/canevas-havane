import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { COMPRIS, DOSSIER, FOURCHETTES, euros, photos } from "../_composants/donnees";
import PlanMaison from "../_composants/PlanMaison";

export const metadata: Metadata = {
  title: "Ma maison · Nuit d'Août — site de démonstration",
  description: "Touche les pièces à rafraîchir : le site compte les unités intérieures et donne une fourchette TTC, pose comprise. Installateur de climatisation imaginaire, site de démonstration.",
  ...adressesDeLaPage("/exemples/nuit-d-aout/ma-maison"),
};

export default function MaMaison() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">Ma maison</p>
          <h1 className="text-[2.9rem] sm:text-7xl font-light tracking-[-0.03em] leading-[1]">Quelle pièce on rafraîchit&nbsp;?</h1>
          <p className="text-xl leading-relaxed text-[var(--doux)]">
            Une unité intérieure par pièce, une unité extérieure pour toutes. Touche les pièces : la
            fourchette suit.
          </p>
        </div>
        <div className="min-w-0">
          <PlanMaison />
        </div>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-4xl font-light tracking-[-0.02em]">Les fourchettes, unité par unité.</h2>
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--encre)]">
              {Object.entries(FOURCHETTES).map(([n, [min, max]]) => (
                <li key={n} className="flex flex-wrap items-baseline justify-between gap-x-6 py-3">
                  <span className="font-semibold">{n} unité{Number(n) > 1 ? "s" : ""}</span>
                  <span className="tabular-nums">{euros(min)} – {euros(max)}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-[var(--doux)]">TTC, pose comprise · exemples. Le prix ferme vient au devis, après la visite technique.</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-light tracking-[-0.02em]">Ce que la pose comprend.</h2>
            <ul className="space-y-2.5 text-lg">
              {COMPRIS.map((c) => (
                <li key={c} className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
        <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-[var(--sombre)]">
          <Image src={photos.draps.src} alt={photos.draps.alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <h2 className="text-4xl sm:text-5xl font-light tracking-[-0.02em]">Et ensuite, ta date.</h2>
          <p className="text-xl leading-relaxed text-[var(--doux)]">Le délai de pose est en haut de chaque page, mis à jour chaque lundi. Choisis ta date avant l&apos;été.</p>
          <Link href={`${DOSSIER}/ma-date`} className="inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-3.5 text-lg font-semibold">Réserver ma pose</Link>
        </div>
      </section>
    </div>
  );
}
