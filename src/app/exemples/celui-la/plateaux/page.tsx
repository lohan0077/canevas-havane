import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, OCCASIONS, euros, photos, plateauPour } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les plateaux par occasion — Celui-Là, site de démonstration",
  description: "Plateaux de fromage pour 6, 10, 20 personnes ou pour un mariage, chez la fromagerie Celui-Là (entreprise fictive) : composition, poids, prix par personne.",
  ...adressesDeLaPage("/exemples/celui-la/plateaux"),
};

export default function Plateaux() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-12 sm:pt-20 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Par occasion</p>
          <h1 className="text-5xl sm:text-7xl">Un plateau <span className="text-[var(--accent-texte)]">pour chaque tablée.</span></h1>
          <p className="max-w-xl text-lg leading-relaxed">Ce que tout le monde cherche avant de recevoir : pour combien, combien de fromages, combien ça coûte.</p>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-[6px] border border-[var(--encre)]">
          <Image src={photos.morceaux.src} alt={photos.morceaux.alt} fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" priority />
        </div>
      </section>
      <section className="border-t border-[var(--encre)]">
        <ul className="mx-auto grid max-w-6xl gap-px bg-[var(--trait)] sm:grid-cols-2">
          {OCCASIONS.map((o) => {
            const p = plateauPour(o.personnes);
            return (
              <li key={o.slug} className="bg-[var(--fond)]">
                <Link href={`${DOSSIER}/plateaux/${o.slug}`} className="flex h-full flex-col gap-3 p-6 sm:p-8">
                  <span className="font-[family-name:var(--titres)] text-3xl leading-tight">{o.titre}</span>
                  <span className="text-[var(--doux)]">{o.chapo}</span>
                  <span className="pt-2 font-semibold [font-variant-numeric:lining-nums]">{p.fromages.length} fromages · {p.poids} · {euros(p.parPersonne)} par personne <span className="font-normal text-[var(--doux)]">· exemple</span></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
