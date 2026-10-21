"use client";

import { useState } from "react";
import { RETRAITS, euros, laitsDe, plateauPour } from "./donnees";
import Dessin from "./Dessin";

/**
 * L'outil de l'accueil, celui de la vidéo : « vous êtes combien ? ». On glisse, le
 * site compose le plateau — le nombre de fromages, le poids, le prix par personne —
 * puis la commande, avec le lait de chaque fromage et les allergènes AVANT le bouton.
 * Retrait en boutique. Rien n'est envoyé, rien n'est payé.
 */
export default function Plateau({ depart = 4 }: { depart?: number }) {
  const [n, setN] = useState(depart);
  const [retrait, setRetrait] = useState<string | null>(null);
  const [commande, setCommande] = useState(false);
  const p = plateauPour(n);
  const rempli = ((n - 4) / (30 - 4)) * 100;

  return (
    <div className="space-y-5">
      <label data-film="combien" className="block space-y-4 rounded-[6px] border border-[var(--encre)] bg-[var(--carte)] p-5 shadow-[6px_6px_0_var(--encre)]">
        <span className="flex items-baseline justify-between gap-3">
          <span className="font-[family-name:var(--titres)] text-2xl">Vous êtes combien&nbsp;?</span>
          <span className="whitespace-nowrap text-2xl font-semibold [font-variant-numeric:lining-nums]">{n} <span className="text-base font-normal">pers.</span></span>
        </span>
        <input
          id="cl-combien"
          type="range"
          min={4}
          max={30}
          value={n}
          onChange={(e) => { setN(Number(e.target.value)); setCommande(false); }}
          className="h-2.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#1F2A24] [&::-moz-range-thumb]:bg-[#E3B23C] [&::-webkit-slider-thumb]:h-9 [&::-webkit-slider-thumb]:w-9 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#1F2A24] [&::-webkit-slider-thumb]:bg-[#E3B23C]"
          style={{ background: `linear-gradient(90deg, #1F2A24 ${rempli}%, #E8E0CC ${rempli}%)` }}
        />
        <span className="flex justify-between text-sm text-[var(--doux)]"><span>4</span><span>30 personnes</span></span>
      </label>

      <div data-film="resultat" aria-live="polite" className="space-y-4 rounded-[6px] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E3B23C]">Plateau pour {n}</p>
        <p className="font-[family-name:var(--titres)] text-[1.9rem] leading-tight [font-variant-numeric:lining-nums]">
          {p.fromages.length} fromages · {p.poids}
        </p>
        <p className="text-lg [font-variant-numeric:lining-nums]">{euros(p.parPersonne)} par personne · {euros(p.total)} TTC <span className="text-sm">· exemple</span></p>
        <ul className="grid grid-cols-3 gap-2 pt-1 sm:grid-cols-6">
          {p.fromages.map((f) => (
            <li key={f.numero} className="flex flex-col items-center gap-1 rounded-[4px] bg-[#FFFBF2] px-1 pb-2 pt-1 text-center text-[#1F2A24]">
              <Dessin forme={f.forme} teinte={f.teinte} className="h-10 w-14" />
              <span className="text-[11px] font-semibold leading-tight">N° {f.numero}</span>
            </li>
          ))}
        </ul>
      </div>

      <div id="commande" data-film="commande" className="scroll-mt-20 space-y-4 rounded-[6px] border border-[var(--encre)] bg-[var(--carte)] p-5">
        <p className="font-[family-name:var(--titres)] text-2xl">
          Prêt {retrait ? <>{retrait.split(" · ")[0].toLowerCase()} à {retrait.split(" · ")[1]}</> : "quand tu passes"}
        </p>
        <ul className="space-y-1 text-[15px]">
          <li>{p.fromages.length} fromages, découpés</li>
          <li>Présentés sur plateau, avec leurs cartes</li>
          <li>Retrait en boutique</li>
        </ul>
        <div data-film="laits" className="space-y-2 rounded-[4px] bg-[#F3EBD8] p-4 text-[15px]">
          <p className="font-semibold">Laits et allergènes, avant la commande</p>
          <ul className="space-y-0.5 text-[var(--doux)]">
            {laitsDe(p.fromages).map((l) => <li key={l}>{l}</li>)}
          </ul>
          <p><span className="font-semibold">Allergène :</span> <strong>lait</strong> (tous les fromages).</p>
        </div>
        <fieldset>
          <legend className="mb-2 font-semibold">Je passe le chercher</legend>
          <div className="grid grid-cols-3 gap-2">
            {RETRAITS.map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={retrait === r}
                onClick={() => { setRetrait(r); setCommande(false); }}
                data-retrait={r}
                className={`min-h-14 rounded-[4px] border px-1 text-sm font-semibold leading-tight ${retrait === r ? "border-[#1F2A24] bg-[#1F2A24] text-[#FFFBF2]" : "border-[var(--encre)] bg-[var(--carte)]"}`}
              >
                <span className="block">{r.split(" · ")[0]}</span>
                <span className="block [font-variant-numeric:lining-nums]">{r.split(" · ")[1]}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-[var(--doux)]">Au moins deux jours avant : commandé jeudi, prêt samedi.</p>
        </fieldset>
        {commande && retrait ? (
          <div role="status" className="space-y-1 rounded-[4px] border-2 border-[#1F2A24] bg-[#FFFBF2] p-4">
            <p className="font-[family-name:var(--titres)] text-xl">Commande reçue : {retrait.replace(" · ", ", ").toLowerCase()}</p>
            <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré. Paiement à la boutique.</p>
          </div>
        ) : (
          <button
            type="button"
            disabled={!retrait}
            onClick={() => setCommande(true)}
            className="w-full min-h-14 rounded-[4px] bg-[#E3B23C] px-6 text-lg font-semibold text-[#1F2A24] disabled:cursor-not-allowed disabled:bg-[#E8E0CC] disabled:text-[#4E5852] [font-variant-numeric:lining-nums]"
          >
            {retrait ? `Commander · ${euros(p.total)}` : "Choisis ton créneau"}
          </button>
        )}
      </div>
    </div>
  );
}
