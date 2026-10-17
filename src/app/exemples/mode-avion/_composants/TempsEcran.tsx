"use client";

import { useState } from "react";
import { JOURS_COURTS, REPARTITION } from "./donnees";

/**
 * Le seul outil du site : ton temps d'écran de la semaine, et ce qu'il ferait en
 * séances d'une heure. Le calcul se fait dans le navigateur ; rien n'est envoyé. Ce
 * n'est ni une statistique ni une promesse : c'est le temps que tu as saisi.
 */
export default function TempsEcran() {
  const [heures, setHeures] = useState(0);
  const [montre, setMontre] = useState(false);
  const rempli = (heures / 70) * 100;
  const total = REPARTITION.reduce((t, x) => t + x, 0);

  return (
    <div className="rounded-[30px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8 space-y-6">
      <label className="block space-y-4">
        <span className="flex items-baseline justify-between gap-4">
          <span className="font-[family-name:var(--titres)] font-semibold">Ton temps d'écran, cette semaine</span>
          <span className="font-[family-name:var(--titres)] text-3xl font-semibold tabular-nums whitespace-nowrap">{heures} h</span>
        </span>
        <span aria-hidden="true" className="flex h-[180px] items-end justify-between gap-2 border-b border-[var(--trait)] px-1">
          {REPARTITION.map((x, i) => (
            <span key={i} className="flex h-[170px] flex-1 items-end justify-center">
              <span className="flex h-full w-full max-w-[34px] items-end rounded-t-[10px] bg-[var(--fond)]">
                <span className="w-full rounded-t-[10px] bg-[var(--accent-texte)] transition-[height] duration-150" style={{ height: `${Math.min(170, (x / total) * heures * 13)}px` }} />
              </span>
            </span>
          ))}
        </span>
        <span aria-hidden="true" className="flex justify-between gap-2 px-1 text-sm text-[var(--doux)]">
          {JOURS_COURTS.map((j, i) => <span key={i} className="flex-1 text-center">{j}</span>)}
        </span>
        <input
          id="ecran-semaine"
          type="range"
          min={0}
          max={70}
          value={heures}
          onChange={(e) => setHeures(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--encre)] [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[var(--accent)]"
          style={{ background: `linear-gradient(90deg, var(--accent) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
      </label>
      <p className="text-sm text-[var(--doux)]">Ton téléphone donne la moyenne par jour, dans les réglages du temps d'écran : multiplie-la par sept. Répartition des barres : exemple.</p>

      {montre && heures > 0 ? (
        <div data-film="resultat-seances" aria-live="polite" className="rounded-[24px] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] space-y-1">
          <p className="font-[family-name:var(--titres)] text-7xl font-semibold tracking-tight tabular-nums">{heures}</p>
          <p className="font-[family-name:var(--titres)] text-2xl font-semibold">séance{heures > 1 ? "s" : ""} d'une heure.</p>
          <p className="text-xl">Elles étaient dans ton téléphone.</p>
          <p className="pt-2 text-sm">Exemple de calcul : une heure d'écran, une séance d'une heure. Ce n'est pas une promesse, c'est ton temps. Rien n'est envoyé.</p>
        </div>
      ) : (
        <button
          type="button"
          data-film="calculer-seances"
          disabled={heures === 0}
          onClick={() => setMontre(true)}
          className="w-full rounded-full bg-[var(--accent)] px-6 py-4 font-[family-name:var(--titres)] text-lg font-semibold text-[var(--sur-accent)] disabled:bg-[var(--trait)] disabled:text-[var(--encre)]"
        >
          {heures === 0 ? "Glisse jusqu'à ton temps d'écran" : "Combien de séances ?"}
        </button>
      )}
    </div>
  );
}
