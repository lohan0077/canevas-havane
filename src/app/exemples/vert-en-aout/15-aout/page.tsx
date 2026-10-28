import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Surtitre, Titre } from "../_composants/Blocs";
import { PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le 15 août — Vert en Août (démonstration)",
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
      <EnTetePage surtitre="Chaque 15 août" titre="Nos jardins, le 15 août. *Sans retouche.*" photo={PHOTOS.allee} note="album 2027">
        Le premier album paraîtra le 15 août 2027, avec les jardins plantés ce printemps et
        l&apos;accord de leurs propriétaires. Voici comment il sera fait.
      </EnTetePage>

      <section className="mx-auto max-w-7xl space-y-10 px-5 py-24 sm:px-8 md:py-32" data-film="album">
        <div className="space-y-6">
          <Apparition><Surtitre>L&apos;album 2027</Surtitre></Apparition>
          <Titre texte="Six jardins, *une seule date.*" />
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }, (_, k) => (
            <Apparition as="li" key={k} delai={k * 90} className={k % 2 ? "rotate-[1.5deg]" : "rotate-[-1.5deg]"}>
              <span className="block rounded-[1rem] bg-white p-3 pb-5 shadow-[0_24px_50px_-30px_rgba(34,52,31,0.6)]">
                <span className="grid aspect-[4/5] place-items-center rounded-[0.6rem] border-2 border-dashed border-[#C9B98F] bg-[var(--carte)] text-center">
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-[clamp(1.8rem,4vw,2.6rem)] font-black text-[var(--accent-texte)]">15/08</span>
                    <span className="mt-1 block text-[14px] text-[var(--doux)]">photo à venir</span>
                  </span>
                </span>
                <span className="mt-3 block text-center font-[family-name:var(--titres)] text-[15px] font-bold">Jardin n° {k + 1}</span>
              </span>
            </Apparition>
          ))}
        </ul>
        <p className="text-[15px] text-[var(--doux)]">L&apos;album 2027 est vide : il n&apos;y a pas encore de jardin à montrer. Aucune photo n&apos;est inventée.</p>
      </section>

      <section className="px-3 sm:px-5">
        <div className="rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-10 md:py-32">
            <div className="space-y-6">
              <Apparition><Surtitre clair>Les règles</Surtitre></Apparition>
              <Titre texte="Quatre règles, *tenues.*" clair />
            </div>
            <ol className="grid gap-5 sm:grid-cols-2">
              {REGLES.map(([t, d], i) => (
                <Apparition as="li" key={t} delai={i * 110} className="flex gap-5 rounded-[2rem] border border-white/15 bg-[#2B4127] p-7">
                  <span className="font-[family-name:var(--titres)] text-5xl font-black leading-none text-[var(--accent)]">{i + 1}</span>
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-2xl font-extrabold">{t}</span>
                    <span className="mt-2 block leading-relaxed">{d}</span>
                  </span>
                </Apparition>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
        <Apparition de="gauche" className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem]">
          <Image src={PHOTOS.jardinSec.src} alt={PHOTOS.jardinSec.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </Apparition>
        <div className="space-y-6">
          <Titre texte="À quoi ressemble *un jardin sec en août.*" taille="moyen" />
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Des gris, des bleus, des pailles, et des fleurs quand même. Photo d&apos;illustration : ce
            n&apos;est pas un jardin de Vert en Août.
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
