import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Compteur from "../_composants/Compteur";
import { CAVE, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La cave — Patience, site de démonstration",
  description: "La cave de la fromagerie Patience (entreprise fictive) : chaque fromage, son âge en jours, et la date où il sera prêt.",
  ...adressesDeLaPage("/exemples/patience/cave"),
};

export default function Cave() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-12 sm:pt-20 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-texte)]">La cave</p>
          <h1 className="text-5xl sm:text-7xl">Tout ce qui <em className="text-[var(--accent-texte)]">attend.</em></h1>
          <p className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
            Chaque fromage, sa date d&apos;entrée en cave, et son âge — qui tourne pendant
            que tu lis. Quand la barre est pleine, il est prêt.
          </p>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-[20px]">
          <Image src={photos.cave.src} alt={photos.cave.alt} fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover" priority />
        </div>
      </section>
      <section className="border-t border-[var(--trait)]">
        <ul className="mx-auto max-w-6xl divide-y divide-[var(--trait)] px-5">
          {CAVE.map((f) => (
            <li key={f.slug} className="grid gap-6 py-10 md:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">{f.numero} · exemple</p>
                <h2 className="text-4xl">{f.nom}</h2>
                <p className="text-[var(--doux)]">{f.lait} · {f.poids} · allergène : <strong>lait</strong></p>
                <p className="leading-relaxed">{f.soin}</p>
              </div>
              <Compteur entree={f.entree} dureeJours={f.dureeJours} />
            </li>
          ))}
        </ul>
        <p className="mx-auto max-w-6xl px-5 pb-12 text-sm text-[var(--doux)]">Dates d&apos;entrée en cave d&apos;exemple : la fromagerie est fictive.</p>
      </section>
    </div>
  );
}
