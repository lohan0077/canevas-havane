"use client";

import { useState } from "react";
import { PRIX, entreprise } from "./donnees";

const euros = (n: number) => `${n.toLocaleString("fr-FR")} €`;

/**
 * Le prix, comme l'arrêté du 17 mars 2015 le demande : à l'heure, HT et TTC, les frais
 * annexes, le mode d'intervention, le devis ; et l'avantage fiscal à part, détaché du
 * prix, en caractères nettement plus petits (art. 5).
 */
export function PrixCours() {
  return (
    <div data-film="prix" className="rounded-[6px] border-2 border-[var(--encre)] bg-[var(--carte)] p-6 sm:p-8 space-y-5">
      <p className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold uppercase tracking-[0.14em]">Cours de maths à domicile · 1 heure</span>
        <span className="rotate-[4deg] rounded-[4px] border-2 border-[var(--accent-texte)] px-2 py-0.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-texte)]">Exemple</span>
      </p>
      <p className="font-[family-name:var(--titres)] [font-variant-numeric:lining-nums] leading-none">
        <span className="text-[84px] sm:text-[104px]">{PRIX.heure}&nbsp;€</span>
        <span className="ml-2 inline-block align-[0.6em] text-2xl leading-tight">TTC<br />l&apos;heure</span>
      </p>
      <dl className="space-y-3 border-t border-[var(--trait)] pt-4 leading-snug">
        <div>
          <dt className="font-bold">Hors taxes</dt>
          <dd>{PRIX.heure},00&nbsp;€ HT l&apos;heure · {PRIX.tva} (exemple) : HT = TTC.</dd>
        </div>
        <div>
          <dt className="font-bold">Frais annexes</dt>
          <dd>{PRIX.frais}</dd>
        </div>
        <div>
          <dt className="font-bold">Mode d&apos;intervention</dt>
          <dd>Prestataire : {entreprise.prof} donne les cours et les facture elle-même.</dd>
        </div>
        <div>
          <dt className="font-bold">Devis</dt>
          <dd>Gratuit. Remis avant le premier cours dès 100&nbsp;€ TTC par mois, et sur simple demande en dessous.</dd>
        </div>
      </dl>
      <div data-film="avantage" className="rounded-[4px] border border-dashed border-[var(--doux)] bg-[var(--fond)] px-4 py-3 text-[13px] leading-snug space-y-1">
        <p className="font-bold">Avantage fiscal, sous conditions</p>
        <p>
          Crédit d&apos;impôt de 50&nbsp;% des sommes versées, dans la limite d&apos;un plafond annuel
          (CGI, art. 199 sexdecies) : {PRIX.heure * PRIX.credit}&nbsp;€ l&apos;heure après crédit d&apos;impôt.
          Cours chez l&apos;élève, en individuel ; activité déclarée en services à la personne
          (n°&nbsp;{entreprise.sap}, exemple). Ni visio, ni groupe.
        </p>
      </div>
    </div>
  );
}

/** Combien par mois : le total TTC en grand ; l'avantage fiscal à part, en petit. */
export function CalculMois() {
  const [heures, setHeures] = useState(4);
  const total = heures * PRIX.heure;
  const rempli = ((heures - 1) / 11) * 100;

  return (
    <div className="rounded-[6px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-6 sm:p-8 space-y-5">
      <label className="block space-y-3">
        <span className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-bold uppercase tracking-[0.14em]">Heures par mois</span>
          <span className="font-[family-name:var(--titres)] text-3xl [font-variant-numeric:lining-nums]">{heures}&nbsp;h</span>
        </span>
        <input
          type="range"
          min={1}
          max={12}
          value={heures}
          onChange={(e) => setHeures(Number(e.target.value))}
          className="w-full h-2.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--sur-sombre)] [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[#F2C14E] [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--sur-sombre)] [&::-moz-range-thumb]:border-[5px] [&::-moz-range-thumb]:border-[#F2C14E]"
          style={{ background: `linear-gradient(90deg, #F2C14E ${rempli}%, rgba(251,248,241,.25) ${rempli}%)` }}
        />
      </label>
      <div aria-live="polite" className="space-y-1">
        <p className="text-sm font-bold uppercase tracking-[0.14em]">Total du mois</p>
        <p className="font-[family-name:var(--titres)] text-6xl [font-variant-numeric:lining-nums]">{euros(total)} <span className="text-xl">TTC</span></p>
        <p className="text-sm">{euros(total)} HT · TVA non applicable (exemple) · déplacement compris</p>
        <p className="text-sm">
          {total >= 100 ? "À partir de 100 € TTC par mois : un devis gratuit vous est remis avant le premier cours." : "Devis gratuit sur simple demande."}
        </p>
      </div>
      <p className="rounded-[4px] border border-dashed border-[rgba(251,248,241,.6)] px-3 py-2 text-[12px] leading-snug">
        Avantage fiscal, sous conditions : après crédit d&apos;impôt de 50&nbsp;%, {euros(total * PRIX.credit)} pour le mois.
      </p>
    </div>
  );
}
