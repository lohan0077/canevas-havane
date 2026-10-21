"use client";

import { useEffect, useState } from "react";
import { ageDe, dateLisible } from "./donnees";

const deux = (n: number) => String(n).padStart(2, "0");

/**
 * L'âge d'un fromage, compté depuis sa date d'entrée en cave, qui tourne pendant
 * qu'on regarde : les jours en grand, puis les heures, les minutes, les secondes.
 * Calculé dans le navigateur, à partir d'une date écrite — jamais d'un chiffre
 * inventé. Ce n'est pas un compte à rebours : il compte le temps passé.
 */
export default function Compteur({
  entree,
  dureeJours,
  grand = false,
  film,
}: {
  entree: string;
  dureeJours: number;
  grand?: boolean;
  film?: string;
}) {
  const [maintenant, setMaintenant] = useState<number | null>(null);
  useEffect(() => {
    const tic = () => setMaintenant(Date.now());
    const id = requestAnimationFrame(tic);
    const seconde = setInterval(tic, 1000);
    return () => {
      cancelAnimationFrame(id);
      clearInterval(seconde);
    };
  }, []);

  const age = maintenant === null ? null : ageDe(entree, maintenant);
  const part = age ? Math.min(1, age.jours / dureeJours) : 0;
  const prete = age !== null && age.jours >= dureeJours;

  return (
    <div data-film={film} className="space-y-3">
      <p className={`font-[family-name:var(--titres)] leading-none [font-variant-numeric:lining-nums_tabular-nums] ${grand ? "text-[5.4rem] sm:text-[7rem]" : "text-5xl"}`}>
        <span className={grand ? "text-[0.4em] italic" : "text-[0.5em] italic"}>Jour </span>
        {age ? age.jours : "—"}
      </p>
      <p className={`[font-variant-numeric:tabular-nums] ${grand ? "text-xl" : "text-base"} text-[var(--doux)]`} aria-live="off">
        {age ? `${age.heures} h ${deux(age.minutes)} min ${deux(age.secondes)} s` : "…"} en cave, et ça continue
      </p>
      <div className="space-y-1.5">
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--trait)]" aria-hidden="true">
          <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${part * 100}%` }} />
        </div>
        <p className="text-sm text-[var(--doux)]">
          Entrée en cave le {dateLisible(entree)} · {prete ? "prête depuis le" : "prête le"} {dateLisible(entree, dureeJours)}
        </p>
      </div>
    </div>
  );
}
