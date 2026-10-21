"use client";

import { useState } from "react";
import { MOMENTS_PHOTO } from "./donnees";

/**
 * Réserver la dernière photo, sur le perron : le moment, puis l'accord. Le bouton reste
 * fermé tant que l'accord de la famille n'est pas coché, et s'il y a des enfants, celui
 * de leurs deux parents. Rien n'est envoyé.
 */
export default function DernierePhoto() {
  const [moment, setMoment] = useState<string | null>(null);
  const [accord, setAccord] = useState(false);
  const [enfants, setEnfants] = useState(false);
  const [parents, setParents] = useState(false);
  const [fait, setFait] = useState(false);
  const pret = moment !== null && accord && (!enfants || parents);
  const choisi = MOMENTS_PHOTO.find((m) => m.id === moment);

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (pret) setFait(true);
      }}
    >
      <fieldset className="space-y-3">
        <legend className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em]">Le moment</legend>
        {MOMENTS_PHOTO.map((m) => (
          <label key={m.id} className={`flex cursor-pointer items-center gap-4 border px-4 py-4 ${moment === m.id ? "border-[var(--encre)] bg-[var(--carte)]" : "border-[var(--trait)]"}`}>
            <input type="radio" name="moment" value={m.id} checked={moment === m.id} onChange={() => { setMoment(m.id); setFait(false); }} className="h-5 w-5 accent-[var(--accent)]" />
            <span>
              <span className="block font-[family-name:var(--titres)] text-[22px] leading-tight">{m.libelle}</span>
              <span className="block text-[14px] text-[var(--doux)]">{m.detail}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <fieldset className="space-y-3 border-t border-[var(--trait)] pt-5">
        <legend className="sr-only">L&apos;accord</legend>
        <label className="flex items-start gap-3 text-[16px] leading-snug">
          <input type="checkbox" checked={accord} onChange={(e) => { setAccord(e.target.checked); setFait(false); }} className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]" />
          Tous ceux qui seront sur la photo sont d&apos;accord, et le signeront le jour même.
        </label>
        <label className="flex items-start gap-3 text-[16px] leading-snug">
          <input type="checkbox" checked={enfants} onChange={(e) => { setEnfants(e.target.checked); setFait(false); }} className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]" />
          Il y aura des enfants sur la photo.
        </label>
        {enfants && (
          <label className="ml-8 flex items-start gap-3 text-[16px] leading-snug">
            <input type="checkbox" checked={parents} onChange={(e) => { setParents(e.target.checked); setFait(false); }} className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]" />
            Leurs deux parents donneront leur accord écrit.
          </label>
        )}
      </fieldset>

      <button type="submit" disabled={!pret} className="h-14 w-full bg-[var(--accent)] px-6 text-[15px] font-semibold uppercase tracking-[0.16em] text-[var(--sur-accent)] disabled:cursor-not-allowed disabled:opacity-60">
        Réserver la dernière photo
      </button>
      {fait && choisi && (
        <div role="status" className="space-y-1 border border-[var(--encre)] bg-[var(--carte)] p-5">
          <p className="font-[family-name:var(--titres)] text-[24px]">La photo : {choisi.libelle.toLowerCase()}.</p>
          <p className="text-[14px] text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré. La photo n&apos;est jamais publiée : elle est à vous.</p>
        </div>
      )}
    </form>
  );
}
