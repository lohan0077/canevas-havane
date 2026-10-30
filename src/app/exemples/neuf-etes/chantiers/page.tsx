import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, CarteChantier, EnTetePage, Soleil, Titre } from "../_composants/Blocs";
import { chantiers, photos, photosDeChantier } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Nos chantiers — Neuf Étés (démonstration)",
  description: "Les chantiers d'une marque de piscines imaginaire, chacun sur sa page : la taille, la durée, le prix, et le chantier filmé jour par jour jusqu'au premier plongeon.",
  ...adressesDeLaPage("/exemples/neuf-etes/chantiers"),
};

// Les six étapes d'un chantier de trois semaines : une vraie suite, donc une liste
// ordonnée, immobile (elle défilait sans fin ; on la lit mieux d'un coup d'œil).
const ETAPES = [
  { jour: "Jour 1", quoi: "Terrassement" },
  { jour: "Jour 3", quoi: "Lit de pose" },
  { jour: "Jour 5", quoi: "La coque" },
  { jour: "Jour 8", quoi: "Remblai" },
  { jour: "Jour 14", quoi: "Margelles" },
  { jour: "Jour 21", quoi: "Premier plongeon" },
];

export default function Chantiers() {
  return (
    <main>
      <EnTetePage titre="Chaque chantier a sa page, et son film." photo={photos.terrassement}>
        La taille, la durée des travaux, le prix payé, et le chantier filmé jour par jour, avec
        l&apos;accord de la famille. Exactement ce que tu cherches avant d&apos;appeler un pisciniste.
      </EnTetePage>

      <div className="bg-[var(--accent)] text-[var(--sur-accent)]">
        <ol aria-label="Les étapes d'un chantier de trois semaines" className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-5 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:grid-cols-6">
          {ETAPES.map((e) => (
            <li key={e.jour} className="flex items-start gap-3">
              <Soleil className="mt-1 h-5 w-5 [&_circle]:fill-[#12445A] [&_g]:stroke-[#12445A]" />
              <span>
                <span className="block text-[15px]">{e.jour}</span>
                <span className="block font-[family-name:var(--titres)] text-xl font-bold leading-tight">{e.quoi}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <section className="mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-8 md:py-32">
        <div className="space-y-6">
          <Titre texte="Trois jardins, trois tailles." />
          <p className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
            Trois chantiers d&apos;exemple, chacun sur sa page : l&apos;entreprise est fictive.
          </p>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {chantiers.map((c, i) => (
            <Apparition as="li" key={c.slug} delai={i * 130} de="zoom">
              <CarteChantier chantier={c} titre="h2" />
            </Apparition>
          ))}
        </ul>
      </section>

      <section className="px-3 sm:px-5">
        <div className="rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-10 md:py-32">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <Titre texte="Trois semaines sur le terrain, en images." />
              <Apparition as="p" delai={200} className="text-xl leading-relaxed">
                Le terrassement, les engins, puis le bassin prêt à recevoir l&apos;eau. Photos
                d&apos;illustration : sur un vrai site, ce sont les images des chantiers, publiées
                avec l&apos;accord des familles.
              </Apparition>
            </div>
            <ul className="grid gap-5 md:grid-cols-3">
              {photosDeChantier.map((p, i) => (
                <Apparition as="li" key={p.src} delai={i * 120} className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </Apparition>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
