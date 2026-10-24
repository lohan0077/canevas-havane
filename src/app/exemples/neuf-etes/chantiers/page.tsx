import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import Defilant from "../../_kit/Defilant";
import { AppelFinal, CarteChantier, EnTetePage, Soleil, Surtitre, Titre } from "../_composants/Blocs";
import { chantiers, photos, photosDeChantier } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Nos chantiers — Neuf Étés (démonstration)",
  description: "Les chantiers d'une marque de piscines imaginaire, chacun sur sa page : la taille, la durée, le prix, et le chantier filmé jour par jour jusqu'au premier plongeon.",
  ...adressesDeLaPage("/exemples/neuf-etes/chantiers"),
};

const ETAPES = ["Jour 1 · terrassement", "Jour 3 · lit de pose", "Jour 5 · la coque", "Jour 8 · remblai", "Jour 14 · margelles", "Jour 21 · premier plongeon"];

export default function Chantiers() {
  return (
    <main>
      <EnTetePage surtitre="Nos chantiers" titre="Chaque chantier a *sa page,* et son film." photo={photos.terrassement}>
        La taille, la durée des travaux, le prix payé, et le chantier filmé jour par jour, avec
        l&apos;accord de la famille. Exactement ce que tu cherches avant d&apos;appeler un pisciniste.
      </EnTetePage>

      <div className="bg-[var(--accent)] py-5 text-[var(--sur-accent)]">
        <Defilant
          duree={40}
          elements={ETAPES}
          separateur={<Soleil className="inline h-6 w-6 align-[-3px] [&_circle]:fill-[#12445A] [&_g]:stroke-[#12445A]" />}
          classeElement="font-[family-name:var(--titres)] text-xl md:text-2xl font-bold whitespace-nowrap"
        />
      </div>

      <section className="mx-auto max-w-7xl space-y-14 px-5 py-24 sm:px-8 md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>Trois chantiers d&apos;exemple</Surtitre></Apparition>
          <Titre texte="Trois jardins, *trois tailles.*" />
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
              <div className="space-y-6">
                <Apparition><Surtitre clair>Sur le terrain</Surtitre></Apparition>
                <Titre texte="Trois semaines, *en images.*" clair />
              </div>
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
