"use client";

import { useState } from "react";
import Image from "next/image";
import { photos } from "./donnees";

/**
 * Les deux photos d'un séjour, sous le même angle : avant l'arrivée du voyageur, après
 * son départ. On glisse de l'une à l'autre ; « Superposer » les fond en mode différence :
 * ce qui a bougé ressort en clair, ce qui n'a pas bougé reste noir.
 * Ici, la même photo d'illustration sert deux fois, et la légende le dit : sur un vrai
 * site, deux vraies photos du séjour, non retouchées.
 */
export default function Comparateur({
  avant,
  apres,
  priorite = false,
}: {
  avant: string;
  apres: string;
  priorite?: boolean;
}) {
  const [part, setPart] = useState(50);
  const [superpose, setSuperpose] = useState(false);
  const p = photos.salon;
  const image = (alt: string, extra = "") => (
    <Image
      src={p.src}
      alt={alt}
      width={p.largeur}
      height={p.hauteur}
      sizes="(min-width: 1024px) 720px, 100vw"
      priority={priorite}
      className={`absolute inset-0 h-full w-full object-cover ${extra}`}
    />
  );

  return (
    <figure data-film="comparateur" className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[var(--sombre)] sm:aspect-[16/9]">
        {image(`Après le départ du voyageur, ${apres} : ${p.alt}`)}
        <div className="absolute inset-0" style={{ clipPath: superpose ? undefined : `inset(0 ${100 - part}% 0 0)` }}>
          {image(`Avant l'arrivée du voyageur, ${avant}`, superpose ? "mix-blend-difference" : "")}
        </div>

        {!superpose && (
          <div aria-hidden="true" className="absolute inset-y-0 w-[3px] -translate-x-1/2 bg-[#FFFDF8]" style={{ left: `${part}%` }}>
            <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#FFFDF8] text-[15px] font-bold text-[#1F3A33] shadow-lg">
              ⇆
            </span>
          </div>
        )}
        {/* Le curseur reste dans la page quand les photos sont superposées (inactif, invisible) :
            le tournage le retrouve d'une image à l'autre. */}
        <input
          type="range"
          min={0}
          max={100}
          value={part}
          disabled={superpose}
          data-film="comparateur-curseur"
          aria-label="Glisser entre la photo d'avant et celle d'après"
          onChange={(e) => setPart(Number(e.target.value))}
          className={`absolute inset-0 h-full w-full cursor-ew-resize opacity-0 ${superpose ? "pointer-events-none" : ""}`}
        />

        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-[#FFFDF8] px-3 py-1.5 text-[12px] font-semibold text-[#1F3A33]">
          Avant · {avant}
        </span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-[#FFFDF8] px-3 py-1.5 text-[12px] font-semibold text-[#1F3A33]">
          Après · {apres}
        </span>

        {superpose && (
          <span
            role="status"
            data-film="identique"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] rounded-[14px] border-[3px] border-[#E3C88E] bg-[#1F3A33] px-6 py-3 font-[family-name:var(--titres)] text-[34px] leading-none text-[#E3C88E]"
          >
            Identique
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          data-film="superposer"
          aria-pressed={superpose}
          onClick={() => setSuperpose((s) => !s)}
          className={`min-h-11 rounded-full px-5 text-[14px] font-semibold ${superpose ? "bg-[var(--encre)] text-[var(--carte)]" : "border border-[var(--encre)]"}`}
        >
          {superpose ? "Revenir aux deux photos" : "Superposer les deux photos"}
        </button>
        <p className="text-[13px] text-[var(--doux)]">Même angle, même cadrage.</p>
      </div>
      <figcaption className="text-[13px] leading-relaxed text-[var(--doux)]">
        {superpose
          ? "Superposées en mode différence : ce qui a bougé ressortirait en clair. Tout est noir, rien n'a bougé. "
          : "Glisse pour passer de l'arrivée au départ. "}
        Photo d&apos;illustration, utilisée deux fois : sur un vrai site, deux vraies photos du séjour,
        non retouchées.
      </figcaption>
    </figure>
  );
}
