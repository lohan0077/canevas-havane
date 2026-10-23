"use client";

import { useEffect, useState } from "react";
import { ageDe, dateLisible } from "./donnees";

const deux = (n: number) => String(n).padStart(2, "0");

/**
 * L'âge d'un fromage, compté depuis sa date d'entrée en cave, qui tourne pendant
 * qu'on regarde : les jours en grand, puis les heures, les minutes, les secondes.
 * Calculé dans le navigateur, à partir d'une date écrite — jamais d'un chiffre
 * inventé. Ce n'est pas un compte à rebours : il compte le temps passé.
 * `taille` : « geant » pour le premier écran, « grand » pour une carte, « petit » sinon.
 * `sombre` : posé sur la cave (fond sombre).
 */
export default function Compteur({
  entree,
  dureeJours,
  taille = "petit",
  sombre = false,
  film,
}: {
  entree: string;
  dureeJours: number;
  taille?: "geant" | "grand" | "petit";
  sombre?: boolean;
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
  const doux = sombre ? "text-[var(--sur-sombre)]/90" : "text-[var(--doux)]";
  const chiffres = { geant: "text-[clamp(6rem,19vw,13rem)]", grand: "text-7xl", petit: "text-5xl" }[taille];

  return (
    <div data-film={film} className="space-y-3">
      <p className={`font-[family-name:var(--titres)] leading-[0.85] tracking-[-0.03em] [font-variant-numeric:lining-nums_tabular-nums] ${chiffres}`}>
        <span className="text-[0.32em] italic tracking-normal">Jour </span>
        {age ? age.jours : "—"}
      </p>
      <p className={`[font-variant-numeric:tabular-nums] ${taille === "geant" ? "text-xl sm:text-2xl" : "text-base"} ${doux}`} aria-live="off">
        {age ? `${age.heures} h ${deux(age.minutes)} min ${deux(age.secondes)} s` : "…"} en cave, et ça continue
      </p>
      <div className="space-y-1.5">
        <div className={`h-1.5 overflow-hidden rounded-full ${sombre ? "bg-white/20" : "bg-[var(--trait)]"}`} aria-hidden="true">
          <div className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-700" style={{ width: `${part * 100}%` }} />
        </div>
        <p className={`text-sm ${doux}`}>
          En cave depuis le {dateLisible(entree)} · affinage {prete ? "terminé le" : "prévu jusqu'au"} {dateLisible(entree, dureeJours)}
        </p>
      </div>
    </div>
  );
}
