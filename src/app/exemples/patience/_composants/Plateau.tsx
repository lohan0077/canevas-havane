"use client";

import { useState } from "react";
import Dessin from "./Dessin";
import { RETRAITS, euros, laitsDe, plateauPour } from "./donnees";

/**
 * L'outil de l'accueil, celui de la vidéo « Remplir le carnet de commandes » : « vous
 * êtes combien ? ». On glisse, le site compose le plateau — les fromages, le poids, le
 * prix par personne — puis la commande, avec le lait de chaque fromage et l'allergène
 * AVANT le bouton. Retrait en boutique. Rien n'est envoyé, rien n'est payé.
 */
export default function Plateau({ depart = 4 }: { depart?: number }) {
  const [n, setN] = useState(depart);
  const [retrait, setRetrait] = useState<string | null>(null);
  const [commande, setCommande] = useState(false);
  const p = plateauPour(n);
  const rempli = ((n - 4) / (30 - 4)) * 100;

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-[var(--carte)] text-[var(--encre)] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--trait)] bg-[var(--fond)] px-5 py-3.5 sm:px-7">
        <p className="font-[family-name:var(--titres)] text-lg italic">Le plateau</p>
        <p className="text-sm font-semibold text-[var(--doux)]">120 g par personne</p>
      </div>
      <div className="space-y-5 p-5 sm:p-7">
        <label data-film="combien" className="block space-y-4">
          <span className="flex items-baseline justify-between gap-3">
            <span className="font-[family-name:var(--titres)] text-[1.9rem] leading-tight">Vous êtes combien&nbsp;?</span>
            <span className="whitespace-nowrap font-[family-name:var(--titres)] text-4xl [font-variant-numeric:lining-nums]">{n}</span>
          </span>
          <input
            id="pa-combien"
            type="range"
            min={4}
            max={30}
            value={n}
            onChange={(e) => { setN(Number(e.target.value)); setCommande(false); }}
            aria-valuetext={`${n} personnes`}
            className="h-2.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#2A1E15] [&::-moz-range-thumb]:bg-[#D9A441] [&::-webkit-slider-thumb]:h-9 [&::-webkit-slider-thumb]:w-9 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#2A1E15] [&::-webkit-slider-thumb]:bg-[#D9A441]"
            style={{ background: `linear-gradient(90deg, #2A1E15 ${rempli}%, #DCCCAA ${rempli}%)` }}
          />
          <span className="flex justify-between text-sm text-[var(--doux)]"><span>4</span><span>30 personnes</span></span>
        </label>

        <div data-film="resultat" aria-live="polite" className="space-y-4 rounded-[1.25rem] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E3B85C]">Plateau pour {n}</p>
          <p className="font-[family-name:var(--titres)] text-[2.1rem] leading-tight [font-variant-numeric:lining-nums]">
            {p.fromages.length} fromages · {p.poids}
          </p>
          <p className="text-lg [font-variant-numeric:lining-nums]">{euros(p.parPersonne)} par personne · {euros(p.total)} TTC <span className="text-sm">· exemple</span></p>
          <ul className="grid grid-cols-3 gap-2 pt-1 sm:grid-cols-6">
            {p.fromages.map((f) => (
              <li key={f.numero} className="flex flex-col items-center gap-1 rounded-[0.6rem] bg-[#FBF6EA] px-1 pb-2 pt-1 text-center text-[#2A1E15]">
                <Dessin forme={f.forme} teinte={f.teinte} className="h-10 w-14" />
                <span className="text-[11px] font-semibold leading-tight">N° {f.numero}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id="commande" data-film="commande" className="scroll-mt-20 space-y-4 rounded-[1.25rem] border border-[var(--trait)] p-5">
          <p className="font-[family-name:var(--titres)] text-2xl">
            Prêt {retrait ? <>{retrait.split(" · ")[0].toLowerCase()} à {retrait.split(" · ")[1]}</> : "quand tu passes"}
          </p>
          <ul className="space-y-1 text-[15px]">
            <li>{p.fromages.length} fromages, découpés du plus doux au plus fort</li>
            <li>Présentés sur plateau, avec leurs cartes</li>
            <li>Retrait en boutique, paiement sur place</li>
          </ul>
          <div data-film="laits" className="space-y-2 rounded-[0.75rem] bg-[var(--fond)] p-4 text-[15px]">
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
                  className={`min-h-14 rounded-[0.75rem] border-2 px-1 text-sm font-semibold leading-tight transition-colors ${retrait === r ? "border-[#2A1E15] bg-[#2A1E15] text-[#FBF6EA]" : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"}`}
                >
                  <span className="block">{r.split(" · ")[0]}</span>
                  <span className="block [font-variant-numeric:lining-nums]">{r.split(" · ")[1]}</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-[var(--doux)]">Au moins deux jours avant : commandé jeudi, prêt samedi matin.</p>
          </fieldset>
          {commande && retrait ? (
            <div role="status" className="space-y-1 rounded-[0.75rem] border-2 border-[#2A1E15] bg-[var(--fond)] p-4">
              <p className="font-[family-name:var(--titres)] text-xl">Commande reçue : {retrait.replace(" · ", ", ").toLowerCase()}</p>
              <p className="text-sm text-[var(--doux)]">Ton plateau t&apos;attend au comptoir. Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré. Paiement à la boutique.</p>
            </div>
          ) : (
            <button
              type="button"
              disabled={!retrait}
              onClick={() => setCommande(true)}
              className="w-full min-h-14 rounded-full bg-[var(--accent)] px-6 text-lg font-semibold text-[var(--sur-accent)] transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:bg-[var(--trait)] disabled:text-[var(--encre)] [font-variant-numeric:lining-nums]"
            >
              {retrait ? `Commander · ${euros(p.total)}` : "Choisis ton créneau"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
