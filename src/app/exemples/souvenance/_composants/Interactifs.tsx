"use client";

import { useState } from "react";
import Image from "next/image";
import { ETATS, LOTS, PHOTOS, PHOTO_DU_SAVON, PRIX, PROCHAIN, SAVONS, dernierLot, savonDe, trouverLot } from "./donnees";
import { Pain } from "./Pain";

// Les entrées animées des outils (animations CSS : le tournage des vidéos les rejoue
// image par image).
const ANIMATION = `@keyframes sv-arrive { from { opacity: 0; transform: translateY(28px) rotate(-8deg) scale(.92); } to { opacity: 1; transform: none; } }
@keyframes sv-fond { from { opacity: 0; transform: scale(.98); } to { opacity: 1; transform: none; } }
@keyframes sv-pose { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }`;
const pose = (i: number) => ({ animation: `sv-pose 420ms cubic-bezier(.2,.8,.2,1) ${i * 160}ms both` });

/**
 * La question du site, et la seule : « Ça sentait quoi, chez toi, enfant ? ». Un
 * souvenir choisi, et le savon qui le porte. Aucune question sur la peau. Tout se
 * passe dans le navigateur.
 */
export function QuestionSouvenir() {
  const [choix, setChoix] = useState<string | null>(null);
  const [ajoute, setAjoute] = useState(false);
  const savon = SAVONS.find((s) => s.slug === choix);
  const lot = savon ? dernierLot(savon.slug) : undefined;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_40px_90px_-50px_rgba(42,24,32,0.55)]" data-film="question">
      <style>{ANIMATION}</style>
      <div className="flex items-center justify-between gap-4 border-b border-[var(--trait)] px-5 py-3.5 sm:px-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-texte)]">Trouver ton savon</p>
        <p className="text-[13px] text-[var(--doux)]">1 question · 0 type de peau</p>
      </div>
      <div className="space-y-6 p-5 sm:p-8">
        <h3 className="font-[family-name:var(--titres)] text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
          Ça sentait quoi, <span className="italic text-[var(--accent-texte)]">chez toi</span>, enfant&nbsp;?
        </h3>
        <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label="Les souvenirs">
          {SAVONS.map((s) => {
            const p = PHOTOS[PHOTO_DU_SAVON[s.slug]];
            const actif = s.slug === choix;
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={actif}
                data-film={`souvenir-${s.slug}`}
                onClick={() => { setChoix(s.slug); setAjoute(false); }}
                className={`group flex items-center gap-4 rounded-[1.4rem] border-2 p-2.5 pr-4 text-left transition-all duration-300 sm:flex-col sm:items-stretch sm:p-3 ${
                  actif ? "border-[var(--encre)] bg-[var(--fond)] sm:-translate-y-1" : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--accent)]"
                }`}
              >
                <span className="relative block h-16 w-14 shrink-0 overflow-hidden rounded-t-full rounded-b-[10px] sm:h-40 sm:w-full">
                  <Image src={p.src} alt="" fill sizes="(min-width: 640px) 220px, 56px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="flex flex-1 items-center justify-between gap-3">
                  <span className="text-[17px] font-semibold leading-snug">{s.souvenir}</span>
                  <span aria-hidden="true" className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 text-[13px] ${actif ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)]"}`}>{actif ? "✓" : ""}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div aria-live="polite">
          {savon && lot ? (
            <div key={savon.slug} className="grid gap-6 rounded-[1.6rem] p-5 sm:grid-cols-[0.9fr_1.1fr] sm:items-center sm:p-7" style={{ background: savon.fond, animation: "sv-fond 500ms ease both" }} data-film="resultat">
              <div style={{ animation: "sv-arrive 760ms cubic-bezier(.2,.8,.2,1) 120ms both" }}>
                <Pain savon={savon} lot={lot.numero} incline={-5} />
              </div>
              <div className="space-y-3 text-[#3E2532]">
                <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#6A5260]">Ton savon</p>
                <p className="font-[family-name:var(--titres)] text-[2.2rem] italic leading-[1.02]">{savon.nom}</p>
                <p className="text-[17px] leading-relaxed">{savon.odeur}</p>
                <p className="text-[15px] font-semibold">{PRIX} € TTC · 100 g · exemple · lot {lot.numero}, {ETATS[lot.etat].toLowerCase()}</p>
                {ajoute ? (
                  <p role="status" className="rounded-[1rem] bg-[#FFFBF5] p-3 text-[15px]">
                    Ajouté à ton panier. Démonstration : aucune commande, aucun paiement, rien n&apos;est envoyé.
                  </p>
                ) : (
                  <button type="button" onClick={() => setAjoute(true)} className="rounded-full bg-[#3E2532] px-6 py-3.5 text-[16px] font-semibold text-[#F7F1E8]">
                    Le commander
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="rounded-[1.6rem] border border-dashed border-[var(--trait)] p-5 text-[16px] text-[var(--doux)]">
              Choisis un souvenir : le savon qui sent comme lui arrive ici, avec son lot.
            </p>
          )}
        </div>
        <p className="text-[14px] leading-relaxed text-[var(--doux)]">
          Aucune question sur ta peau : on ne lui promet rien. On te dit ce qu&apos;il y a dans le savon.
        </p>
      </div>
    </div>
  );
}

/**
 * Le numéro de lot, en page d'accueil : on tape celui qui est écrit sur son savon, et
 * l'on voit le jour où il a été coulé, sa sortie du séchoir, et ses ingrédients. Tout
 * se cherche dans le navigateur, dans le carnet des lots.
 */
export function RechercheLot() {
  const [saisie, setSaisie] = useState("");
  const lot = trouverLot(saisie);
  const complet = saisie.replace(/\D/g, "").length >= 3;

  return (
    <div className="space-y-4 rounded-[2rem] bg-[var(--carte)] p-4 text-[var(--encre)] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)] sm:p-6" data-film="recherche">
      <style>{ANIMATION}</style>
      <label className="block">
        <span className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--doux)]">Le numéro de lot, sur la bande du savon</span>
        <span className="mt-2 flex items-center gap-3 rounded-[1.2rem] border-2 border-[var(--encre)] bg-[var(--fond)] px-4 py-2.5 focus-within:border-[var(--accent-texte)]">
          <span className="font-[family-name:var(--titres)] text-[26px] italic">Lot</span>
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
            className="w-full min-w-0 bg-transparent font-[family-name:var(--titres)] text-[38px] tracking-[0.14em] tabular-nums outline-none placeholder:text-[#9C8A92]"
          />
        </span>
      </label>

      <div aria-live="polite">
        {lot ? (
          <article key={lot.numero} className="overflow-hidden rounded-[1.4rem] border border-[var(--trait)] bg-[var(--fond)]" data-film="fiche-lot">
            <header className="flex items-center justify-between gap-3 px-5 py-4" style={{ ...pose(0), background: savonDe(lot.savon).fond }}>
              <p className="font-[family-name:var(--titres)] text-[24px] leading-tight text-[#3E2532]">
                Lot {lot.numero} · <span className="italic">{savonDe(lot.savon).nom}</span>
              </p>
              <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${lot.etat === "epuise" ? "bg-[#3E2532] text-[#F7F1E8]" : "bg-[#C9A9A6] text-[#3E2532]"}`}>
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
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">{t}</dt>
                  <dd className="text-right text-[19px] font-semibold">{d}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-[var(--trait)] bg-[var(--carte)] px-5 py-4" style={pose(5)} data-film="ingredients">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">Ingrédients du lot</p>
              <p className="mt-1 text-[16px] leading-snug"><span className="font-semibold">Ingredients :</span> {savonDe(lot.savon).inci}</p>
              <p className="mt-2 text-[13px] text-[var(--doux)]">À utiliser de préférence avant fin {lot.ddm} · exemple</p>
            </div>
          </article>
        ) : complet ? (
          <p className="rounded-[1.4rem] border border-dashed border-[var(--trait)] p-5 text-[16px]">
            Ce numéro n&apos;est pas dans le carnet. Les lots d&apos;exemple vont du {LOTS[0].numero} au {LOTS[LOTS.length - 1].numero}.
          </p>
        ) : (
          <div className="space-y-3 px-1">
            <p className="text-[15px] text-[var(--doux)]">Il est imprimé sur la bande de papier, sous la date. Essaie 047.</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Lots d'exemple">
              {LOTS.slice(1, 5).map((l) => (
                <button key={l.numero} type="button" onClick={() => setSaisie(l.numero)} className="rounded-full border border-[var(--trait)] bg-[var(--fond)] px-4 py-2 text-[15px] font-semibold tabular-nums hover:border-[var(--encre)]">
                  Lot {l.numero}
                </button>
              ))}
            </div>
          </div>
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
  const s = savonDe(lot.savon);
  return (
    <div className="relative space-y-5 overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-5 text-[var(--encre)] sm:p-7" data-film="reservation">
      <style>{ANIMATION}</style>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Le prochain lot · {lot.sortie}</p>
          <p className="mt-2 font-[family-name:var(--titres)] text-[44px] leading-none">Lot {lot.numero}</p>
          <p className="mt-1 font-[family-name:var(--titres)] text-[20px] italic">{s.nom}</p>
        </div>
        <p className="text-right font-[family-name:var(--titres)] text-[34px] leading-none">{PRIX} €<span className="mt-1 block font-[family-name:var(--texte)] text-[11px] uppercase tracking-[0.14em] text-[var(--doux)]">TTC · exemple</span></p>
      </div>
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: 16 }, (_, k) => (
          <span key={k} className="h-6 flex-1 rounded-[4px]" style={{ background: s.fond, outline: `1px solid ${s.bord}` }} />
        ))}
      </div>
      <p className="text-[15px] text-[var(--doux)]">{lot.savons} savons · coulé le {lot.coule.replace(" 2026", "")} · 100 g · au séchoir depuis {lot.jours} jours</p>
      <div className="flex items-center justify-between">
        <span className="text-[16px] font-semibold">Combien de savons</span>
        <span className="flex items-center gap-3">
          <button type="button" aria-label="Un savon de moins" onClick={() => { setFait(false); setQuantite((q) => Math.max(1, q - 1)); }} className="h-11 w-11 rounded-full border-2 border-[var(--trait)] text-xl">−</button>
          <span className="w-6 text-center text-xl font-bold tabular-nums">{quantite}</span>
          <button type="button" aria-label="Un savon de plus" onClick={() => { setFait(false); setQuantite((q) => Math.min(6, q + 1)); }} className="h-11 w-11 rounded-full bg-[var(--encre)] text-xl text-[var(--fond)]">+</button>
        </span>
      </div>
      {fait ? (
        <div role="status" className="space-y-1 rounded-[1.4rem] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]" style={pose(0)}>
          <p className="font-[family-name:var(--titres)] text-[28px] leading-tight">Réservé : lot {lot.numero}</p>
          <p className="text-[15px]">{quantite} savon{quantite > 1 ? "s" : ""}, {quantite * PRIX} € TTC, à retirer à la boutique-atelier ou expédié{quantite > 1 ? "s" : ""} dès le {lot.sortie}.</p>
          <p className="text-[13px] text-[#E8C4BC]">Démonstration : aucune réservation enregistrée, aucun paiement, rien n&apos;est envoyé.</p>
        </div>
      ) : (
        <button type="button" onClick={() => setFait(true)} data-film="reserver" className="w-full rounded-full bg-[var(--encre)] px-6 py-4 text-[18px] font-semibold text-[var(--fond)] transition-transform hover:scale-[1.01]">
          Réserver mon savon
        </button>
      )}
    </div>
  );
}

/**
 * « Ça sentait quoi, chez ta grand-mère ? » : proposer l'odeur du prochain savon.
 * Démonstration : rien n'est envoyé ni enregistré.
 */
export function Proposition() {
  const [odeur, setOdeur] = useState("");
  const [envoye, setEnvoye] = useState(false);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (odeur.trim()) setEnvoye(true); }}
      className="space-y-4 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8"
      data-film="proposition"
    >
      <label className="block space-y-3">
        <span className="block font-[family-name:var(--titres)] text-[30px] leading-tight">Chez ta grand-mère, ça sentait <span className="italic text-[var(--accent-texte)]">quoi</span>&nbsp;?</span>
        <input
          type="text"
          value={odeur}
          maxLength={80}
          onChange={(e) => { setOdeur(e.target.value); setEnvoye(false); }}
          placeholder="La cire sur les meubles, la laine du pull…"
          className="w-full rounded-[1rem] border-2 border-[var(--trait)] bg-[var(--fond)] px-4 py-3.5 text-[17px] outline-none placeholder:text-[#8C7883] focus:border-[var(--encre)]"
        />
      </label>
      {envoye ? (
        <p role="status" className="rounded-[1rem] bg-[#F1DCD8] p-4 text-[15px]">
          Merci. Sur le vrai site, « {odeur.trim()} » compterait dans le décompte. Démonstration : rien n&apos;est envoyé ni enregistré.
        </p>
      ) : (
        <button type="submit" className="w-full rounded-full bg-[var(--encre)] px-6 py-4 text-[16px] font-semibold text-[var(--fond)]">Proposer cette odeur</button>
      )}
      <p className="text-[13px] text-[var(--doux)]">Pas de nom, pas d&apos;adresse : juste une odeur.</p>
    </form>
  );
}
