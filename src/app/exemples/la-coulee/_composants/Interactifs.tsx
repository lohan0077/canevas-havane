"use client";

import { useState } from "react";
import { ETATS, LOTS, PRIX, PROCHAIN, RECETTES, trouverLot } from "./donnees";

// Les lignes du carnet se posent l'une après l'autre (animation CSS : le tournage
// des vidéos la rejoue image par image).
const ANIMATION = `@keyframes lc-pose { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }`;
const pose = (i: number) => ({ animation: `lc-pose 420ms cubic-bezier(.2,.8,.2,1) ${i * 160}ms both` });

/**
 * La page d'accueil de la vidéo : on tape le numéro de lot écrit sur son savon, et
 * l'on voit le jour où il a été coulé, sa sortie du séchoir, et ses ingrédients.
 * Tout se cherche dans le navigateur, dans le carnet ci-dessous.
 */
export function RechercheLot() {
  const [saisie, setSaisie] = useState("");
  const lot = trouverLot(saisie);
  const complet = saisie.replace(/\D/g, "").length >= 3;

  return (
    <div className="space-y-5" data-film="recherche">
      <style>{ANIMATION}</style>
      <label className="block">
        <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--doux)]">Le numéro de lot, sur l&apos;étiquette</span>
        <span className="mt-2 flex items-center gap-3 rounded-[6px] border-2 border-[var(--encre)] bg-[var(--carte)] px-4 py-3 focus-within:border-[var(--accent)]">
          <span className="font-mono text-[22px] font-bold">Lot</span>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={3}
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
            placeholder="047"
            aria-label="Numéro de lot"
            data-film="saisie-lot"
            className="w-full min-w-0 bg-transparent font-mono text-[34px] font-bold tracking-[0.12em] outline-none placeholder:text-[#8F8A99]"
          />
        </span>
      </label>

      <div aria-live="polite">
        {lot ? (
          <article key={lot.numero} className="rounded-[6px] border border-[var(--trait)] bg-[var(--carte)]" data-film="fiche-lot">
            <header className="flex items-center justify-between gap-3 border-b border-[var(--trait)] px-5 py-3" style={pose(0)}>
              <p className="font-[family-name:var(--titres)] text-[20px] font-bold">Lot {lot.numero} · {RECETTES[lot.recette].nom}</p>
              <span className={`shrink-0 rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase ${lot.etat === "epuise" ? "bg-[var(--encre)] text-[var(--fond)]" : "bg-[var(--accent)] text-[var(--sur-accent)]"}`}>
                {ETATS[lot.etat]}
              </span>
            </header>
            <dl className="divide-y divide-[var(--trait)]">
              {[
                ["Coulé le", lot.coule],
                ["Sorti du séchoir", lot.etat === "epuise" ? lot.sortie : `${lot.sortie} (prévu)`],
                ["Dans ce lot", `${lot.savons} savons`],
                ["Coulé par", lot.coulePar],
              ].map(([t, d], i) => (
                <div key={t} className="flex items-baseline justify-between gap-4 px-5 py-3" style={pose(i + 1)}>
                  <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--doux)]">{t}</dt>
                  <dd className="text-right text-[19px] font-semibold">{d}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-[var(--trait)] bg-[#E4DCF0] px-5 py-4" style={pose(5)} data-film="ingredients">
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#5E5A6B]">Ingrédients du lot</p>
              <p className="mt-1 text-[16px] leading-snug"><span className="font-semibold">Ingredients :</span> {RECETTES[lot.recette].inci}</p>
              <p className="mt-2 text-[13px] text-[#5E5A6B]">À utiliser de préférence avant fin {lot.ddm} · exemple</p>
            </div>
          </article>
        ) : complet ? (
          <p className="rounded-[6px] border border-dashed border-[var(--trait)] p-5 text-[16px]">
            Ce numéro n&apos;est pas dans le carnet. Les lots d&apos;exemple vont du {LOTS[0].numero} au {LOTS[LOTS.length - 1].numero}.
          </p>
        ) : (
          <p className="text-[15px] text-[var(--doux)]">Il est imprimé sur l&apos;étiquette, sous la date. Essaie 047.</p>
        )}
      </div>
    </div>
  );
}

/** Réserver un savon du prochain lot. Démonstration : rien n'est envoyé ni payé. */
export function ReserverLot() {
  const [quantite, setQuantite] = useState(1);
  const [fait, setFait] = useState(false);
  const lot = PROCHAIN;
  return (
    <div className="relative rounded-[6px] border-2 border-[var(--encre)] bg-[var(--carte)] p-5 space-y-4" data-film="reservation">
      <style>{ANIMATION}</style>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--doux)]">Le prochain lot · {lot.sortie}</p>
          <p className="mt-1 font-[family-name:var(--titres)] text-[30px] font-bold leading-none">Lot {lot.numero}</p>
          <p className="mt-1 text-[16px]">{RECETTES[lot.recette].nom}</p>
        </div>
        <p className="text-right font-mono text-[22px] font-bold">{PRIX} €<span className="block text-[11px] font-normal uppercase tracking-[0.12em] text-[var(--doux)]">TTC · exemple</span></p>
      </div>
      <p className="text-[15px] text-[var(--doux)]">{lot.savons} savons · coulé le {lot.coule.replace(" 2026", "")} · 100 g</p>
      <div className="flex items-center justify-between">
        <span className="text-[15px]">Combien de savons</span>
        <span className="flex items-center gap-3">
          <button type="button" aria-label="Un savon de moins" onClick={() => { setFait(false); setQuantite((q) => Math.max(1, q - 1)); }} className="h-11 w-11 rounded-full border-2 border-[var(--trait)] font-mono text-xl">−</button>
          <span className="w-6 text-center font-mono text-xl font-bold">{quantite}</span>
          <button type="button" aria-label="Un savon de plus" onClick={() => { setFait(false); setQuantite((q) => Math.min(6, q + 1)); }} className="h-11 w-11 rounded-full bg-[var(--encre)] font-mono text-xl text-[var(--fond)]">+</button>
        </span>
      </div>
      {fait ? (
        <div role="status" className="rounded-[6px] bg-[var(--sombre)] p-4 text-[var(--sur-sombre)] space-y-1" style={pose(0)}>
          <p className="font-[family-name:var(--titres)] text-[26px] font-bold">Réservé : lot {lot.numero}</p>
          <p className="text-[15px]">{quantite} savon{quantite > 1 ? "s" : ""}, {quantite * PRIX} € TTC, à retirer à l&apos;atelier ou expédié(s) dès le {lot.sortie}.</p>
          <p className="text-[13px] text-[#C9BEE3]">Démonstration : aucune réservation enregistrée, aucun paiement, rien n&apos;est envoyé.</p>
        </div>
      ) : (
        <button type="button" onClick={() => setFait(true)} data-film="reserver" className="w-full rounded-[6px] bg-[var(--accent)] px-6 py-4 text-[18px] font-semibold text-[var(--sur-accent)]">
          Réserver mon savon
        </button>
      )}
    </div>
  );
}
