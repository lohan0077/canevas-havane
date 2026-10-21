"use client";

import { useState } from "react";
import { MENAGE, TAUX_GESTION } from "./donnees";

const euros = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0")} €`;

function Curseur({
  id,
  libelle,
  valeur,
  min,
  max,
  pas = 1,
  unite,
  onChange,
}: {
  id: string;
  libelle: string;
  valeur: number;
  min: number;
  max: number;
  pas?: number;
  unite: string;
  onChange: (v: number) => void;
}) {
  const rempli = ((valeur - min) / (max - min)) * 100;
  return (
    <label htmlFor={id} className="block space-y-2.5">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-[14px] font-bold">{libelle}</span>
        <span className="font-[family-name:var(--titres)] text-[26px] leading-none tabular-nums whitespace-nowrap">
          {valeur} {unite}
        </span>
      </span>
      <input
        id={id}
        data-film={id}
        type="range"
        min={min}
        max={max}
        step={pas}
        value={valeur}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-[var(--accent)] [&::-moz-range-thumb]:bg-[var(--carte)] [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[var(--accent)] [&::-webkit-slider-thumb]:bg-[var(--carte)] [&::-webkit-slider-thumb]:shadow"
        style={{ background: `linear-gradient(90deg, var(--accent) ${rempli}%, var(--trait) ${rempli}%)` }}
      />
    </label>
  );
}

/**
 * Le barème appliqué à un mois : le prix de la nuit, les nuits louées, les départs.
 * Ce que le propriétaire paie (la gestion), ce qu'il reçoit, et ce que les voyageurs
 * paient en plus (le ménage). Tout se calcule dans le navigateur ; prix d'exemple.
 */
export default function Calculateur() {
  const [prixNuit, setPrixNuit] = useState(85);
  const [nuits, setNuits] = useState(18);
  const [departs, setDeparts] = useState(6);
  const departsReels = Math.min(departs, nuits);

  const loyers = prixNuit * nuits;
  const gestion = loyers * TAUX_GESTION;
  const reverse = loyers - gestion;
  const menage = departsReels * MENAGE;

  return (
    <div data-film="calculateur" className="grid gap-6 rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7 lg:grid-cols-[1fr_1fr] lg:gap-10">
      <div className="space-y-6">
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Un mois, par exemple</p>
        <Curseur id="prix-nuit" libelle="Prix de la nuit" valeur={prixNuit} min={40} max={250} pas={5} unite="€" onChange={setPrixNuit} />
        <Curseur id="nuits" libelle="Nuits louées dans le mois" valeur={nuits} min={0} max={31} unite={nuits > 1 ? "nuits" : "nuit"} onChange={setNuits} />
        <Curseur id="departs" libelle="Départs de voyageurs" valeur={departs} min={0} max={15} unite={departs > 1 ? "départs" : "départ"} onChange={setDeparts} />
      </div>

      <div aria-live="polite" className="rounded-[18px] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)] sm:p-6">
        <dl className="divide-y divide-[#34435A]">
          <div className="flex items-baseline justify-between gap-4 pb-3">
            <dt className="text-[14px] text-[#C9D0DB]">Loyers encaissés</dt>
            <dd className="text-[18px] font-bold tabular-nums">{euros(loyers)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 py-3">
            <dt className="text-[14px] text-[#C9D0DB]">
              Gestion des séjours, 20&nbsp;%
              <span className="block text-[12px]">payée par toi</span>
            </dt>
            <dd className="text-[18px] font-bold tabular-nums">− {euros(gestion)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 py-3">
            <dt className="text-[15px] font-bold text-[#E2B65C]">Reversé sur ton compte</dt>
            <dd className="font-[family-name:var(--titres)] text-[36px] leading-none tabular-nums">{euros(reverse)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 pt-3">
            <dt className="text-[14px] text-[#C9D0DB]">
              Ménage et linge, {departsReels}&nbsp;×&nbsp;45&nbsp;€
              <span className="block text-[12px]">payés par les voyageurs, en plus de leurs nuits</span>
            </dt>
            <dd className="text-[18px] font-bold tabular-nums">{euros(menage)}</dd>
          </div>
        </dl>
        <p className="mt-4 border-t border-[#34435A] pt-3 text-[12px] leading-relaxed text-[#C9D0DB]">
          Prix d&apos;exemple, TTC. Avant impôts, hors taxe de séjour. Calcul fait sur ton téléphone : rien n&apos;est envoyé.
        </p>
      </div>
    </div>
  );
}
