import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, LIVRAISON, PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Premier Fruit — site de démonstration",
  description: "Le 25 novembre, jour de la Sainte-Catherine, tous les clients d'une pépinière imaginaire plantent leur arbre en même temps.",
  ...adressesDeLaPage("/exemples/premier-fruit/sainte-catherine"),
};

const CALENDRIER = [
  ["Jusqu'au 15 novembre", "Tu commandes ton arbre sur le site, ou à la pépinière."],
  ["Mardi 24 novembre", "Il arrive chez toi, racines nues, avec son passeport phytosanitaire."],
  ["Mercredi 25 novembre", "Tu le plantes. Le même jour que tous les autres."],
  ["Le soir", "Si tu veux, tu nous envoies la photo de ton arbre planté."],
];

export default function SainteCatherine() {
  return (
    <main>
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div className="space-y-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#E8B9A8]">Mercredi 25 novembre 2026</p>
            <h1 className="font-normal text-[58px] leading-[0.95] sm:text-8xl">Tous en même temps.</h1>
            <p className="font-[family-name:var(--titres)] text-[28px] italic leading-snug text-[#F2C9BE]">
              « À la Sainte-Catherine, tout bois prend racine. »
            </p>
            <p className="max-w-xl text-lg leading-relaxed">
              Le 25 novembre, tous les clients de Premier Fruit plantent leur arbre le même jour. Un rendez-vous par an,
              pour commencer à attendre la première récolte ensemble.
            </p>
          </div>
          <div className="overflow-hidden rounded-[28px]">
            <Image src={PHOTOS.arrosage.src} alt={PHOTOS.arrosage.alt} width={PHOTOS.arrosage.largeur} height={PHOTOS.arrosage.hauteur} sizes="(min-width: 1024px) 480px, 92vw" className="h-auto w-full" priority />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="font-normal text-[40px] sm:text-5xl">Le calendrier.</h2>
        <ol className="mt-10 border-l-2 border-[var(--accent)] pl-6 space-y-8">
          {CALENDRIER.map(([d, t]) => (
            <li key={d} className="relative space-y-1">
              <span aria-hidden="true" className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-[3px] border-[var(--fond)] bg-[var(--accent)]" />
              <p className="font-[family-name:var(--titres)] text-[28px] leading-tight">{d}</p>
              <p className="text-lg leading-relaxed text-[var(--doux)]">{t}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Le dicton</p>
            <h2 className="font-normal text-[40px] sm:text-5xl">Pourquoi novembre&nbsp;?</h2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Le dicton des jardiniers visait d&apos;abord les boutures. Il rappelle aujourd&apos;hui ce que savent les
              pépiniéristes : novembre est le bon moment pour planter un arbre à racines nues.
            </p>
            <p className="text-[var(--doux)]">
              L&apos;arbre dort, la terre est encore tiède, les pluies d&apos;automne arrosent à ta place. Au printemps,
              ses racines sont déjà installées quand les feuilles sortent.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-5 py-16 sm:px-8">
        <div className="max-w-2xl space-y-5">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Le mur du 25 novembre</p>
          <h2 className="font-normal text-[40px] sm:text-5xl">Il attend vos photos.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le soir du 25 novembre, ce mur se remplira des photos que vous voudrez bien nous envoyer. Publiées seulement
            avec votre accord, avec un prénom ou des initiales, jamais une adresse.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[-3, 2, -1, 3, -2, 1].map((r, k) => (
            <li key={k} className="rounded-[6px] bg-white p-3 pb-10 shadow-[0_14px_30px_-18px_rgba(46,26,22,0.6)]" style={{ transform: `rotate(${r}deg)` }}>
              <div className="grid aspect-square place-items-center rounded-[3px] border-2 border-dashed border-[#D8C7B0] bg-[#F6EEE2]">
                <svg viewBox="0 0 60 60" className="h-12 w-12" aria-hidden="true">
                  <path d="M30 52 V 30" stroke="#6B4A33" strokeWidth="3" strokeLinecap="round" />
                  <path d="M30 34 C 22 30, 18 22, 20 14 C 28 16, 32 24, 30 34 Z" fill="#5E7D3E" />
                  <path d="M30 30 C 38 26, 42 18, 40 12 C 32 14, 28 20, 30 30 Z" fill="#4E6B34" />
                  <path d="M14 52 H 46" stroke="#8B6B4A" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <p className="mt-3 text-center text-[14px] font-semibold text-[#5B4335]">Ta photo · 25/11</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[#E8D6BA]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <h2 className="font-normal text-[40px] sm:text-5xl">Ce qu&apos;on te demandera.</h2>
            <p className="text-lg leading-relaxed">Le 25 au soir, un message, si tu veux participer. Rien d&apos;autre.</p>
          </div>
          <ul className="space-y-3 text-lg">
            {[
              "Une photo de ton arbre planté, sans visage ni adresse visible",
              "Ton prénom, ou tes initiales",
              "Ton accord pour la publier. Sans lui, elle reste chez nous",
            ].map((x) => (
              <li key={x} className="flex gap-3 rounded-2xl bg-[var(--carte)] p-4">
                <span aria-hidden="true" className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--sur-accent)]">✓</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8">
        <h2 className="font-normal text-[40px] sm:text-5xl">Ton arbre, livré le 24.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-[var(--doux)]">
          Commandé avant le {LIVRAISON.limite}, il arrive le {LIVRAISON.date}, la veille du rendez-vous.
        </p>
        <Link href={`${DOSSIER}/arbres`} className="mt-8 inline-block rounded-full bg-[var(--accent)] px-7 py-4 text-lg font-semibold text-[var(--sur-accent)]">
          Choisir mon arbre
        </Link>
      </section>
    </main>
  );
}
