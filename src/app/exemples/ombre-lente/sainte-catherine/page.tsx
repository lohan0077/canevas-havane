import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import { CALENDRIER, DOSSIER, LIVRAISON, PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le 25 novembre — Ombre Lente, site de démonstration",
  description: "À la Sainte-Catherine, tout bois prend racine : le 25 novembre, tous les clients d'une pépinière imaginaire plantent leur arbre le même jour, et envoient sa photo.",
  ...adressesDeLaPage("/exemples/ombre-lente/sainte-catherine"),
};

// Le coup de la vidéo « Remplir l'agenda » : le 25 novembre, tout le monde plante en
// même temps. Et la photo de ce jour-là ouvre le film de vingt ans de « Créer une marque ».
export default function SainteCatherine() {
  return (
    <main>
      <EnTetePage surtitre="Mercredi 25 novembre 2026" titre="Tous en même *temps.*" photo={PHOTOS.mainsPlantation} origine="50% 70%">
        « À la Sainte-Catherine, tout bois prend racine. » Le 25 novembre, tous les clients
        d&apos;Ombre Lente plantent leur arbre le même jour.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2">
        <div className="space-y-6">
          <Apparition><Surtitre>Le calendrier</Surtitre></Apparition>
          <TitreRevele texte="Quatre dates, *une saison.*" className="text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[0.95]" classeAccent="italic text-[var(--accent-texte)]" />
        </div>
        <ol className="space-y-8 border-l-2 border-[var(--encre)] pl-7">
          {CALENDRIER.map(([d, t], i) => (
            <Apparition as="li" key={d} delai={i * 120} className="relative space-y-1">
              <span aria-hidden="true" className="absolute -left-[37px] top-2 h-4 w-4 rounded-full border-[3px] border-[var(--fond)] bg-[#D9A441]" />
              <p className="font-[family-name:var(--titres)] text-[34px] leading-tight">{d}</p>
              <p className="text-lg leading-relaxed text-[var(--doux)]">{t}</p>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <Apparition><Surtitre clair>Le dicton</Surtitre></Apparition>
            <TitreRevele texte={"Pourquoi *novembre ?*"} className="text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[0.95]" classeAccent="italic text-[#D9A441]" />
            <Apparition as="p" delai={150} className="text-lg leading-relaxed">
              Le dicton des jardiniers visait d&apos;abord les boutures. Il rappelle ce que savent les
              pépiniéristes : novembre est le bon moment pour planter un arbre à racines nues.
              L&apos;arbre dort, la terre est encore tiède, les pluies d&apos;automne arrosent à ta place.
            </Apparition>
          </div>
          <Apparition de="zoom" className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image src={PHOTOS.arrosage.src} alt={PHOTOS.arrosage.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-5 py-20 sm:px-8 md:py-28">
        <div className="max-w-2xl space-y-5">
          <Apparition><Surtitre>Le mur du 25 novembre</Surtitre></Apparition>
          <TitreRevele texte="Il attend *vos photos.*" className="text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[0.95]" classeAccent="italic text-[var(--accent-texte)]" />
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Le soir du 25 novembre, ce mur se remplira des photos que vous voudrez bien nous envoyer.
            Publiées seulement avec votre accord, avec un prénom ou des initiales, jamais une adresse.
            Et chaque année, la suivante : dans vingt ans, ça fait un film.
          </Apparition>
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[-3, 2, -1, 3, -2, 1].map((r, k) => (
            <Apparition as="li" key={k} delai={k * 80} de="zoom">
              <div className="rounded-[6px] bg-white p-3 pb-10 shadow-[0_14px_30px_-18px_rgba(22,41,31,0.6)]" style={{ transform: `rotate(${r}deg)` }}>
                <div className="grid aspect-square place-items-center rounded-[3px] border-2 border-dashed border-[#D8C7B0] bg-[#F6EEE2]">
                  <svg viewBox="0 0 60 60" className="h-12 w-12" aria-hidden="true">
                    <path d="M30 52 V 30" stroke="#6B4A33" strokeWidth="3" strokeLinecap="round" />
                    <path d="M30 34 C 22 30, 18 22, 20 14 C 28 16, 32 24, 30 34 Z" fill="#5E7D3E" />
                    <path d="M30 30 C 38 26, 42 18, 40 12 C 32 14, 28 20, 30 30 Z" fill="#4E6B34" />
                    <path d="M14 52 H 46" stroke="#8B6B4A" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="mt-3 text-center text-[14px] font-semibold text-[#4E5E4F]">Ta photo · 25/11</p>
              </div>
            </Apparition>
          ))}
        </ul>
        <Apparition className="flex flex-wrap items-center gap-4">
          <Bouton href={`${DOSSIER}/arbres`} variante="vert">Choisir mon arbre</Bouton>
          <p className="text-[15px] text-[var(--doux)]">Commandé avant le {LIVRAISON.limite}, livré le {LIVRAISON.date}.</p>
        </Apparition>
      </section>
      <AppelFinal />
    </main>
  );
}
