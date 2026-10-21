import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { maison, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La maison — Moins le Quart, site de démonstration",
  description: "La maison Moins le Quart (entreprise fictive) : pourquoi une heure plutôt qu'un pays, la torréfaction, le comptoir et le moulin de 6 h 45.",
  ...adressesDeLaPage("/exemples/moins-le-quart/maison"),
};

const JOURNEE = [
  { heure: "6 h 45", texte: "On ouvre le comptoir. Le moulin tourne, la vidéo du jour part." },
  { heure: "9 h 45", texte: "On torréfie, une fournée par café. Le déca d'abord, pour ne rien mélanger." },
  { heure: "15 h 45", texte: "Pause. On goûte la fournée du matin, dans les trois cafetières de la maison." },
  { heure: "18 h 45", texte: "On ferme. Le déca du soir attend le dîner." },
];

export default function Maison() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-12 sm:pt-20 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div className="space-y-6">
          <p className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">La maison</p>
          <h1 className="font-[family-name:var(--titres)] text-5xl font-extralight tracking-[-0.03em] sm:text-7xl">Pas un pays. <span className="font-medium">Une heure.</span></h1>
          <p className="max-w-xl text-lg leading-relaxed">
            Moins le Quart est né d&apos;une idée simple : on ne choisit pas un café pour
            son pays d&apos;origine, mais pour le moment où on va le boire. Alors chaque
            café porte une heure.
          </p>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-[28px]">
          <Image src={photos.moulin.src} alt={photos.moulin.alt} fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover" priority />
        </div>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-4xl space-y-10 px-5 py-16 sm:py-24">
          <h2 className="font-[family-name:var(--titres)] text-4xl font-light tracking-[-0.02em] sm:text-5xl">Une journée <span className="font-medium">à la maison.</span></h2>
          <ol className="divide-y divide-[#F2E3C9]/25 border-y border-[#F2E3C9]/25">
            {JOURNEE.map((j) => (
              <li key={j.heure} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <p className="font-[family-name:var(--titres)] text-3xl font-extralight text-[#E8A24B]">{j.heure}</p>
                <p className="text-lg leading-relaxed">{j.texte}</p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-[#C9D6E2]">Journée d&apos;exemple : la maison est fictive.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-5 px-5 py-16 sm:py-20">
        <h2 className="font-[family-name:var(--titres)] text-3xl font-light">Le comptoir</h2>
        <p className="text-lg leading-relaxed">
          {maison.adresse}. Ouvert du mardi au samedi, de 6 h 45 à 18 h 45. On y goûte
          les trois cafés avant de choisir, et on y retire ses commandes.
        </p>
        <p className="text-lg leading-relaxed">
          On ne parle pas d&apos;effets : un café du matin n&apos;est pas censé te faire
          quoi que ce soit, à part être bon à 6 h 45.
        </p>
      </section>
    </div>
  );
}
