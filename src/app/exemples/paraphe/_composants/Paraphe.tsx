"use client";

import { useEffect, useState } from "react";
import { LECTEURS, type NomLecteur } from "./donnees";

/**
 * Un paraphe, tracé à la plume : le trait se dessine (`stroke-dashoffset`) après
 * `delai` millisecondes, en `duree`. Sans `anime`, il est déjà là. Avec `rejouable`,
 * on le touche et il se retrace.
 */
export default function Paraphe({ lecteur, anime = true, rejouable = false, delai = 300, duree = 900, className = "" }: { lecteur: NomLecteur; anime?: boolean; rejouable?: boolean; delai?: number; duree?: number; className?: string }) {
  const [trace, setTrace] = useState(!anime);
  const [tour, setTour] = useState(0);
  useEffect(() => {
    if (!anime && tour === 0) return;
    const t = setTimeout(() => setTrace(true), tour === 0 ? delai : 60);
    return () => clearTimeout(t);
  }, [anime, delai, tour]);

  const dessin = (
    <svg viewBox="0 0 300 120" className={rejouable ? "h-full w-full" : className} role="img" aria-label={`Paraphe de ${lecteur}`}>
      <path
        d={LECTEURS[lecteur].trait}
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        style={{ strokeDashoffset: trace ? 0 : 1, transition: trace ? `stroke-dashoffset ${duree}ms cubic-bezier(.5,0,.3,1)` : "none" }}
      />
    </svg>
  );
  if (!rejouable) return dessin;
  return (
    <button
      type="button"
      data-film="retracer"
      title="Retracer le paraphe"
      aria-label={`Retracer le paraphe de ${lecteur}`}
      onClick={() => {
        setTrace(false);
        setTour((n) => n + 1);
      }}
      className={className}
    >
      {dessin}
    </button>
  );
}
