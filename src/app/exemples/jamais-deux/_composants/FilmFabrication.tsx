"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FILM } from "./donnees";

const PLAN = 1500; // ms par plan
const DUREE = PLAN * FILM.length;
const temps = (ms: number) => `0:${String(Math.floor(ms / 1000)).padStart(2, "0")}`;

/**
 * Le film de la fabrication d'une pièce. La marque étant fictive, quatre photos tiennent
 * lieu de film : elles défilent comme ses plans, avec la barre de lecture et le temps.
 */
export default function FilmFabrication({ numero }: { numero: number }) {
  const [ecoule, setEcoule] = useState(0);
  const [lecture, setLecture] = useState(false);

  useEffect(() => {
    if (!lecture) return;
    const debut = Date.now() - ecoule;
    const t = setInterval(() => {
      const e = Date.now() - debut;
      if (e >= DUREE) {
        setEcoule(DUREE);
        setLecture(false);
      } else setEcoule(e);
    }, 50);
    return () => clearInterval(t);
    // `ecoule` n'est lu qu'au départ de la lecture.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lecture]);

  const plan = Math.min(FILM.length - 1, Math.floor(ecoule / PLAN));
  const fini = ecoule >= DUREE;

  return (
    <figure className="space-y-2" data-film="film">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--sombre)]">
        {FILM.map((f, i) => (
          <Image
            key={f.legende}
            src={f.image.src}
            alt={i === plan ? `${f.legende} : ${f.image.alt}` : ""}
            width={f.image.largeur}
            height={f.image.hauteur}
            sizes="(min-width: 1024px) 560px, 100vw"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === plan ? "opacity-100" : "opacity-0"} ${i === 2 ? "object-[75%_50%]" : i === 0 ? "object-right" : ""}`}
          />
        ))}
        <span className="absolute left-3 top-3 bg-[var(--sombre)] px-2 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--sur-sombre)]">
          Pièce n° {numero} · sa fabrication
        </span>
        {!lecture && (
          <button
            type="button"
            onClick={() => {
              if (fini) setEcoule(0);
              setLecture(true);
            }}
            aria-label={fini ? "Revoir le film de sa fabrication" : "Lire le film de sa fabrication"}
            className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--fond)] text-[var(--encre)] shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" aria-hidden="true"><path d="M6 4l14 8-14 8z" fill="currentColor" /></svg>
          </button>
        )}
        <span className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-[var(--sombre)] px-3 py-2 text-[12px] font-semibold tabular-nums text-[var(--sur-sombre)]">
          <span>{temps(ecoule)}</span>
          <span className="relative h-1 flex-1 bg-white/25">
            <span className="absolute inset-y-0 left-0 bg-[var(--sur-sombre)]" style={{ width: `${(ecoule / DUREE) * 100}%` }} />
          </span>
          <span>{temps(DUREE)}</span>
        </span>
      </div>
      <figcaption className="flex flex-col gap-0.5 text-[13px] text-[var(--doux)] sm:flex-row sm:justify-between sm:gap-4">
        <span aria-live="polite" className="font-semibold text-[var(--encre)]">{FILM[plan].legende}</span>
        <span>Photos à la place du film : la marque est fictive.</span>
      </figcaption>
    </figure>
  );
}
