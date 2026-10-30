"use client";

import { useState } from "react";
import Image from "next/image";
import { MOIS, PHOTOS } from "./donnees";
import { useMoisCourant } from "./mois";
import styles from "./Calendrier.module.css";

const deux = (n: number) => String(n).padStart(2, "0");

/**
 * Le calendrier des fleurs, posé sur la bande sombre de l'accueil : douze onglets, une
 * page par mois, reliée par sa spirale. On tourne les pages — la page tombe du haut,
 * comme une feuille qu'on rabat. La fleur du mois, celles qui l'accompagnent, celle qui
 * arrive et celle qui s'en va. Ouvert sur le mois en cours. Rien n'est envoyé.
 */
export default function Calendrier() {
  const courant = useMoisCourant();
  const [choisi, setN] = useState<number | null>(null);
  const n = choisi ?? courant;
  const mois = MOIS[n - 1];
  const photo = PHOTOS[mois.photo];
  const aller = (k: number) => setN(((k - 1 + 12) % 12) + 1);

  return (
    <div className="space-y-5" data-film="calendrier">
      <ol className="grid grid-cols-6 gap-1.5 lg:grid-cols-12" aria-label="Choisir un mois">
        {MOIS.map((m) => {
          const actif = m.n === n;
          return (
            <li key={m.n}>
              <button
                type="button"
                data-mois={m.n}
                aria-pressed={actif}
                onClick={() => setN(m.n)}
                className={`w-full rounded-xl border py-2 text-center text-[13px] font-medium transition-all duration-300 ${
                  actif
                    ? "-translate-y-1 border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]"
                    : "border-white/25 text-[var(--sur-sombre)] hover:border-[var(--accent)]"
                }`}
              >
                <span className="block font-[family-name:var(--titres)] text-xl font-normal">{deux(m.n)}</span>
                {m.court}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="relative pt-3 [perspective:1800px]">
        <div aria-hidden="true" className="absolute left-0 right-0 top-0 z-10 flex justify-around px-10">
          {Array.from({ length: 11 }, (_, k) => (
            <i key={k} className="h-6 w-2 rounded-full border border-white/40 bg-[var(--sombre)]" />
          ))}
        </div>
        <article
          key={n}
          id="page-du-mois"
          aria-live="polite"
          className={`${styles.page} overflow-hidden rounded-2xl bg-[var(--fond)] text-[var(--encre)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.65)]`}
        >
          <div className="grid sm:grid-cols-[0.95fr_1.05fr]">
            <figure className="relative h-60 overflow-hidden bg-[var(--sombre)] sm:h-auto sm:min-h-[480px]">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 640px) 45vw, 100vw" className="object-cover" />
            </figure>
            <div className="flex flex-col gap-4 p-5 sm:p-9">
              <p className="flex items-baseline justify-between text-[15px] font-medium text-[var(--doux)]">
                <span>Ce qui fleurit en</span>
                <span className="font-[family-name:var(--titres)] text-base font-normal italic">{deux(n)} / 12</span>
              </p>
              <h3 className="text-[clamp(2.75rem,6vw,5.25rem)] font-normal leading-[1] tracking-[-0.02em]">{mois.nom}</h3>
              <p className="font-[family-name:var(--titres)] text-[clamp(2rem,3.5vw,2.8rem)] italic leading-none text-[var(--accent-texte)]">{mois.fleur}</p>
              <p className="max-w-sm text-lg leading-relaxed">{mois.mot}</p>
              <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[var(--trait)] pt-4 text-[15px]">
                <div className="col-span-2">
                  <dt className="text-[14px] font-medium text-[var(--doux)]">Aussi</dt>
                  <dd>{mois.aussi.join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-[14px] font-medium text-[var(--doux)]">Arrive</dt>
                  <dd>{mois.arrive}</dd>
                </div>
                <div>
                  <dt className="text-[14px] font-medium text-[var(--doux)]">S&apos;en va</dt>
                  <dd>{mois.part}</dd>
                </div>
              </dl>
            </div>
          </div>
        </article>
      </div>

      <div className="flex items-center justify-between gap-3">
        {/* Le mois visé est dans le nom du bouton, pour qui ne voit pas les onglets. */}
        <button
          type="button"
          onClick={() => aller(n - 1)}
          aria-label={`Revenir d'un mois, à ${MOIS[(n + 10) % 12].nom.toLowerCase()}`}
          className="h-12 whitespace-nowrap rounded-full border border-white/30 px-4 text-[15px] font-medium text-[var(--sur-sombre)] hover:border-[var(--accent)] sm:px-5"
        >
          Revenir d&apos;un mois
        </button>
        <button
          type="button"
          onClick={() => aller(n + 1)}
          aria-label={`Tourner la page : ${MOIS[n % 12].nom.toLowerCase()}`}
          className="h-12 whitespace-nowrap rounded-full bg-[var(--accent)] px-4 text-[15px] font-medium text-[var(--sur-accent)] sm:px-5"
        >
          Tourner la page
        </button>
      </div>
      <p className="max-w-[26rem] text-[15px] leading-relaxed text-[var(--sur-sombre)]">
        Calendrier indicatif : une saison avance ou recule selon la région et l&apos;année. Chaque mois, il est confirmé avec les producteurs.
      </p>
    </div>
  );
}
