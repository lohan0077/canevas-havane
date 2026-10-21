"use client";

import { useState } from "react";
import { GRAMMES_PAR_TASSE, METHODES, ORDRE_METHODES, abonnementPour, euros } from "./donnees";
import { Tasse } from "./Icones";

/**
 * L'abonnement de la vidéo, réglé en tasses : on glisse jusqu'au nombre de tasses
 * par jour, le site calcule le paquet et le rythme pour que le café arrive avant
 * que le paquet soit vide. Un repère de consommation, jamais une recommandation.
 */
export default function Tasses() {
  const [tasses, setTasses] = useState(1);
  const [mouture, setMouture] = useState("grain");
  const [pret, setPret] = useState(false);
  const a = abonnementPour(tasses);
  const rempli = ((tasses - 1) / 5) * 100;

  return (
    <div data-film="tasses" className="space-y-6 rounded-[28px] border-[3px] border-[var(--encre)] bg-[var(--carte)] p-5 sm:p-8">
      <label className="block space-y-4">
        <span className="flex items-baseline justify-between gap-3">
          <span className="font-[family-name:var(--titres)] text-xl font-bold">Combien de tasses par jour&nbsp;?</span>
          <span className="whitespace-nowrap text-2xl font-extrabold tabular-nums">{tasses}</span>
        </span>
        <span className="flex h-12 items-end gap-1 text-[var(--encre)]" aria-hidden="true">
          {Array.from({ length: tasses }, (_, i) => <Tasse key={i} className="h-12 w-12" />)}
        </span>
        <input
          type="range"
          id="pq-tasses"
          min={1}
          max={6}
          step={1}
          value={tasses}
          onChange={(e) => { setTasses(Number(e.target.value)); setPret(false); }}
          className="h-3 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-[var(--encre)] [&::-moz-range-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:h-9 [&::-webkit-slider-thumb]:w-9 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[var(--encre)] [&::-webkit-slider-thumb]:bg-[var(--accent)]"
          style={{ background: `linear-gradient(90deg, var(--encre) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
        <span className="flex justify-between text-sm text-[var(--doux)]"><span>1 tasse</span><span>6 tasses</span></span>
      </label>

      <div data-film="envoi" aria-live="polite" className="space-y-1 rounded-2xl bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#F7C9A8]">On t&apos;envoie</p>
        <p className="font-[family-name:var(--titres)] text-[1.7rem] font-bold leading-tight">
          {a.libelle} toutes les {a.semaines} semaines
        </p>
        <p>avant que le paquet soit vide · exemple</p>
        <p className="pt-2 text-lg font-bold tabular-nums">{euros(a.prix)} TTC l&apos;envoi <span className="text-sm font-normal">· prix d&apos;exemple</span></p>
      </div>

      <label className="block space-y-2">
        <span className="font-semibold">En grain ou moulu ?</span>
        <select
          value={mouture}
          onChange={(e) => { setMouture(e.target.value); setPret(false); }}
          className="w-full min-h-12 rounded-xl border-2 border-[var(--encre)] bg-[var(--carte)] px-3 text-base"
        >
          <option value="grain">En grain</option>
          {ORDRE_METHODES.map((m) => <option key={m} value={m}>Moulu pour {METHODES[m].pour}</option>)}
        </select>
      </label>

      {pret ? (
        <div role="status" className="space-y-1 rounded-2xl border-[3px] border-[var(--accent)] p-4">
          <p className="font-bold">Abonnement prêt : {a.libelle} toutes les {a.semaines} semaines</p>
          <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est payé.</p>
        </div>
      ) : (
        <button type="button" onClick={() => setPret(true)} className="w-full min-h-14 rounded-full bg-[var(--accent)] px-6 text-lg font-extrabold text-[var(--sur-accent)]">
          M&apos;abonner
        </button>
      )}
      <p className="text-sm text-[var(--doux)]">
        Calcul fait avec {GRAMMES_PAR_TASSE} g de café par tasse : un repère d&apos;exemple, pas une
        recommandation. Tu changes le rythme, tu suspends ou tu arrêtes quand tu veux.
      </p>
    </div>
  );
}
