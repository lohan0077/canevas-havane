"use client";

import { useState } from "react";
import { euros } from "./donnees";

const FORMULES = [
  { cle: 2, titre: "Deux passages", detail: "vers 23 h et vers 4 h", prix: 45 },
  { cle: 3, titre: "Trois passages", detail: "en début, milieu et fin de nuit", prix: 60 },
];

/**
 * Tu pars combien de nuits ? Le prix de la maison veillée pendant les vacances,
 * calculé ici : TTC, parce que c'est un particulier qui l'achète, et marqué exemple.
 */
export default function CalculVacances() {
  const [nuits, setNuits] = useState(7);
  const [passages, setPassages] = useState(2);
  const f = FORMULES.find((x) => x.cle === passages) ?? FORMULES[0];
  const rempli = ((nuits - 1) / 20) * 100;

  return (
    <div data-film="vacances" className="rounded-[30px] bg-[var(--carte)] border border-[var(--trait)] p-6 sm:p-8 space-y-6">
      <div className="space-y-3">
        <label htmlFor="vl-nuits" className="flex items-baseline justify-between gap-3">
          <span className="font-bold">Tu pars combien de nuits&nbsp;?</span>
          <span className="font-[family-name:var(--titres)] text-3xl tabular-nums">{nuits}</span>
        </label>
        <input
          id="vl-nuits"
          type="range"
          min={1}
          max={21}
          value={nuits}
          onChange={(e) => setNuits(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[var(--sombre)] [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--accent)] [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-[var(--sombre)]"
          style={{ background: `linear-gradient(90deg, var(--sombre) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
      </div>
      <fieldset className="grid grid-cols-2 gap-2.5">
        <legend className="sr-only">Passages par nuit</legend>
        {FORMULES.map((x) => (
          <button
            key={x.cle}
            type="button"
            aria-pressed={passages === x.cle}
            onClick={() => setPassages(x.cle)}
            className={`rounded-[20px] border-2 p-3.5 text-left transition-colors ${passages === x.cle ? "border-[var(--sombre)] bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border-[var(--trait)] bg-[var(--fond)]"}`}
          >
            <span className="block font-bold">{x.titre}</span>
            <span className="block text-sm">{x.detail}</span>
          </button>
        ))}
      </fieldset>
      <div aria-live="polite" className="rounded-[22px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-5 space-y-1">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Ta maison veillée · exemple</p>
        <p className="font-[family-name:var(--titres)] text-4xl tabular-nums">{euros(f.prix * nuits)} TTC</p>
        <p className="text-sm text-[#C9C2B3]">{nuits} nuit{nuits > 1 ? "s" : ""} × {euros(f.prix)} TTC, {f.titre.toLowerCase()} par nuit, une photo du portail à chaque fois.</p>
      </div>
      <p className="text-sm text-[var(--doux)]">Prix TTC d&apos;exemple, pour un particulier. Calcul fait sur ton téléphone : rien n&apos;est envoyé.</p>
    </div>
  );
}
