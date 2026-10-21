"use client";

import { useState } from "react";
import Image from "next/image";
import { PHOTOS, PHOTO_DU_SAVON, PRIX, SAVONS } from "./donnees";
import { Pain } from "./Elements";

const ANIMATION = `@keyframes sv-arrive { from { opacity: 0; transform: translateY(24px) rotate(-6deg); } to { opacity: 1; transform: none; } }
@keyframes sv-fond { from { opacity: 0; } to { opacity: 1; } }`;

/**
 * La question du site, et la seule : « Ça sentait quoi, chez toi, enfant ? ». Un
 * souvenir choisi, et le savon qui le porte. Aucune question sur la peau. Tout se
 * passe dans le navigateur.
 */
export function QuestionSouvenir() {
  const [choix, setChoix] = useState<string | null>(null);
  const [ajoute, setAjoute] = useState(false);
  const savon = SAVONS.find((s) => s.slug === choix);

  return (
    <div className="rounded-[32px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8" data-film="question">
      <style>{ANIMATION}</style>
      <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-texte)]">Trouver ton savon</p>
      <h3 className="mt-3 text-[34px] leading-[1.05]">Ça sentait quoi, <span className="italic">chez toi</span>, enfant&nbsp;?</h3>
      <p className="mt-2 text-[16px] text-[var(--doux)]">Choisis un souvenir, on te dit quel savon.</p>
      <div className="mt-5 grid gap-2.5" role="group" aria-label="Les souvenirs">
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
              className={`flex items-center gap-4 rounded-[20px] border-2 p-2.5 pr-4 text-left transition-colors ${actif ? "border-[var(--encre)] bg-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
            >
              <Image src={p.src} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-[14px] object-cover" />
              <span className="flex-1 text-[18px] font-semibold leading-snug">{s.souvenir}</span>
              <span aria-hidden="true" className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 ${actif ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)]"}`}>{actif ? "✓" : ""}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        {savon && (
          <div key={savon.slug} className="mt-6 rounded-[26px] p-5 text-center" style={{ background: savon.fond, animation: "sv-fond 500ms ease both" }} data-film="resultat">
            <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#6E5560]">Ton savon</p>
            <div className="my-5" style={{ animation: "sv-arrive 700ms cubic-bezier(.2,.8,.2,1) 120ms both" }}>
              <Pain savon={savon} incline={-4} />
            </div>
            <p className="font-[family-name:var(--titres)] text-[30px] italic leading-tight">{savon.nom}</p>
            <p className="mx-auto mt-2 max-w-sm text-[16px] leading-relaxed">{savon.odeur}</p>
            <p className="mt-3 text-[15px] font-semibold">{PRIX} € TTC · 100 g · exemple</p>
            {ajoute ? (
              <p role="status" className="mt-4 rounded-[16px] bg-[var(--carte)] p-3 text-[15px]">
                Ajouté à ton panier. Démonstration : aucune commande, aucun paiement, rien n&apos;est envoyé.
              </p>
            ) : (
              <button type="button" onClick={() => setAjoute(true)} className="mt-4 rounded-full bg-[var(--accent)] px-6 py-3.5 text-[16px] font-semibold text-[var(--sur-accent)]">
                Le commander
              </button>
            )}
          </div>
        )}
      </div>
      <p className="mt-5 text-[14px] leading-relaxed text-[var(--doux)]">
        Aucune question sur ta peau : on ne lui promet rien. On te dit ce qu&apos;il y a dans le savon.
      </p>
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
      className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7 space-y-4"
      data-film="proposition"
    >
      <label className="block space-y-2">
        <span className="font-[family-name:var(--titres)] text-[26px] leading-tight">Chez ta grand-mère, ça sentait quoi&nbsp;?</span>
        <input
          type="text"
          value={odeur}
          maxLength={80}
          onChange={(e) => { setOdeur(e.target.value); setEnvoye(false); }}
          placeholder="La cire sur les meubles, la laine du pull…"
          className="w-full rounded-[14px] border-2 border-[var(--trait)] bg-[var(--fond)] px-4 py-3 text-[17px] outline-none focus:border-[var(--encre)]"
        />
      </label>
      {envoye ? (
        <p role="status" className="rounded-[14px] bg-[#F1D9D6] p-4 text-[15px]">
          Merci. Sur le vrai site, « {odeur.trim()} » compterait dans le décompte. Démonstration : rien n&apos;est envoyé ni enregistré.
        </p>
      ) : (
        <button type="submit" className="w-full rounded-full bg-[var(--accent)] px-6 py-3.5 text-[16px] font-semibold text-[var(--sur-accent)]">Proposer cette odeur</button>
      )}
      <p className="text-[13px] text-[var(--doux)]">Pas de nom, pas d&apos;adresse : juste une odeur.</p>
    </form>
  );
}
