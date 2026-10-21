import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { PHOTOS } from "../_composants/donnees";
import { Surtitre } from "../_composants/Elements";

export const metadata: Metadata = {
  title: "Vert en Août — site de démonstration",
  description: "Chaque 15 août, un paysagiste imaginaire publie ses jardins, avec l'accord de leurs propriétaires, sans retouche.",
  ...adressesDeLaPage("/exemples/vert-en-aout/15-aout"),
};

const REGLES = [
  ["Le même jour", "Toutes les photos sont prises autour du 15 août, en pleine chaleur. Pas en avril."],
  ["Sans retouche", "Ni couleurs poussées, ni ciel changé. Ce qui a jauni reste jaune."],
  ["Avec l'accord", "Seulement les jardins dont les propriétaires ont dit oui, par écrit. Sans adresse, sans visage."],
  ["Même ceux qui ont souffert", "Un massif qui a mal passé l'été est montré aussi, avec ce qu'on en a appris."],
];

export default function QuinzeAout() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-8 sm:px-8">
        <Surtitre>Chaque 15 août</Surtitre>
        <h1 className="mt-4 max-w-3xl text-[36px] font-bold leading-[1.04] sm:text-6xl">Nos jardins, le 15 août. Sans retouche.</h1>
        <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-[var(--doux)]">
          Le premier album paraîtra le 15 août 2027, avec les jardins plantés cet automne et l&apos;accord de leurs
          propriétaires. Voici comment il sera fait.
        </p>
      </section>
      <section className="mx-auto max-w-6xl px-5 sm:px-8" data-film="album">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: 6 }, (_, k) => (
            <div key={k} className="grid aspect-[4/5] place-items-center rounded-[20px] border-2 border-dashed border-[#C9B98F] bg-[var(--carte)] p-3 text-center">
              <span>
                <span className="block font-[family-name:var(--titres)] text-[22px] font-bold text-[var(--accent-texte)]">15/08</span>
                <span className="mt-1 block text-[14px] text-[var(--doux)]">Jardin n° {k + 1}</span>
                <span className="mt-1 block text-[12px] text-[var(--doux)]">photo à venir</span>
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[14px] text-[var(--doux)]">L&apos;album 2027 est vide : il n&apos;y a pas encore de jardin à montrer. Aucune photo n&apos;est inventée.</p>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="text-[30px] font-bold leading-[1.05] sm:text-5xl">Quatre règles.</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {REGLES.map(([t, d], i) => (
            <li key={t} className="flex gap-4 rounded-[22px] bg-[var(--carte)] p-6">
              <span className="font-[family-name:var(--titres)] text-[32px] font-black leading-none text-[var(--accent-texte)]">{i + 1}</span>
              <span>
                <span className="block text-[19px] font-bold">{t}</span>
                <span className="mt-1 block leading-relaxed text-[var(--doux)]">{d}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-[30px]">
            <Image src={PHOTOS.jardinSec.src} alt={PHOTOS.jardinSec.alt} width={PHOTOS.jardinSec.largeur} height={PHOTOS.jardinSec.hauteur} sizes="(min-width: 768px) 540px, 92vw" className="h-auto w-full" />
          </div>
          <p className="text-[18px] leading-relaxed">
            À quoi ressemble un jardin sec en août : des gris, des bleus, des pailles, et des fleurs quand même. Photo
            d&apos;illustration, ce n&apos;est pas un jardin de Vert en Août.
          </p>
        </div>
      </section>
    </main>
  );
}
