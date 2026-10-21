"use client";

import { useState } from "react";
import { STATUTS, euros, honoraires, type Statut } from "./donnees";
import anim from "./Heure.module.css";

/**
 * Vos honoraires : deux questions, votre statut et votre chiffre d'affaires, et le prix
 * par mois. Hors taxes (clientèle professionnelle), TTC à côté. Une indication : le prix
 * est fixé dans la lettre de mission. Tout se calcule dans le navigateur.
 */
export default function Simulateur({ titre = "h2" }: { titre?: "h1" | "h2" }) {
  const [statut, setStatut] = useState<Statut | null>(null);
  const [ca, setCa] = useState(0);
  const [touche, setTouche] = useState(false);
  const s = STATUTS.find((x) => x.id === statut);
  const plafond = s?.plafond ?? 500_000;
  const valeur = Math.min(ca, plafond);
  const prix = statut && touche ? honoraires(statut, valeur) : null;
  const rempli = (valeur / plafond) * 100;
  const Titre = titre;

  return (
    <div data-film="simulateur" className="border border-[var(--trait)] bg-[var(--carte)]">
      <div className="border-b border-[var(--trait)] px-5 py-5 sm:px-8">
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Vos honoraires</p>
        <Titre className="mt-1 text-[34px] sm:text-[44px]">Combien par mois&nbsp;?</Titre>
      </div>

      <fieldset className="border-b border-[var(--trait)] px-5 py-5 sm:px-8">
        <legend className="sr-only">Votre statut</legend>
        <p aria-hidden="true" className="text-[15px] font-semibold">1. Votre statut</p>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {STATUTS.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={statut === x.id}
              aria-label={x.long}
              data-film={`statut-${x.id}`}
              onClick={() => setStatut(x.id)}
              className={`min-h-[52px] border text-[16px] font-semibold transition-colors ${
                statut === x.id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--fond)]"
              }`}
            >
              {x.court}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block border-b border-[var(--trait)] px-5 py-5 sm:px-8">
        <span className="flex items-baseline justify-between gap-4">
          <span className="text-[15px] font-semibold">2. Votre chiffre d&apos;affaires annuel</span>
          <span className="text-xl font-semibold tabular-nums">{touche ? euros(valeur) : "Glissez"}</span>
        </span>
        <input
          type="range"
          data-film="chiffre"
          min={0}
          max={plafond}
          step={5000}
          value={valeur}
          onChange={(e) => {
            setCa(Number(e.target.value));
            setTouche(true);
          }}
          aria-valuetext={euros(valeur)}
          className="mt-4 h-2 w-full cursor-pointer appearance-none bg-[var(--trait)] [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[var(--encre)] [&::-moz-range-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[var(--encre)] [&::-webkit-slider-thumb]:bg-[var(--accent)]"
          style={{ background: `linear-gradient(90deg, var(--encre) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
        <span className="mt-2 flex justify-between text-[13px] text-[var(--doux)]">
          <span>0 €</span>
          <span>{euros(plafond)}</span>
        </span>
      </label>

      <div aria-live="polite" className="min-h-[148px] px-5 py-5 sm:px-8">
        {prix !== null && s ? (
          <div key={`${statut}-${prix}`} data-film="prix" className={`space-y-3 ${anim.tombe}`}>
            <p className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-[family-name:var(--titres)] text-[56px] font-semibold leading-none tabular-nums">{euros(prix)}</span>
              <span className="text-xl font-semibold">HT / mois</span>
            </p>
            <p className="text-[15px] text-[var(--doux)]">
              soit {euros(Math.round(prix * 1.2 * 100) / 100)} TTC · <strong className="text-[var(--encre)]">exemple · fixé dans la lettre de mission</strong>
            </p>
            <ul className="grid gap-1.5 border-t border-[var(--trait)] pt-3 text-[15px] sm:grid-cols-2">
              {s.compris.map((c) => (
                <li key={c} className="flex gap-2"><span aria-hidden="true">✓</span>{c}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">
            {statut ? "Glissez jusqu'à votre chiffre d'affaires : le prix s'affiche, par mois." : "Choisissez votre statut, puis votre chiffre d'affaires : le prix s'affiche, par mois."}
          </p>
        )}
      </div>
      <p className="border-t border-[var(--trait)] px-5 py-3 text-[13px] text-[var(--doux)] sm:px-8">
        Prix hors taxes, pour une clientèle professionnelle ; TVA de 20 % en sus. Indication
        d&apos;exemple : les honoraires sont convenus par écrit avant toute mission.
      </p>
    </div>
  );
}
