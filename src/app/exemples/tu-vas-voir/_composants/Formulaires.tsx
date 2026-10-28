"use client";

import { useState, type FormEvent } from "react";
import { CONSEILS, LIBRAIRES, livre } from "./donnees";

/**
 * Commander un livre qui n'est pas en rayon : à l'unité, sans frais de commande —
 * la loi l'impose à tout détaillant (loi n° 81-766, art. 1). En démonstration, rien
 * n'est envoyé.
 */
export function Commande() {
  const [fait, setFait] = useState<string | null>(null);
  const [retrait, setRetrait] = useState(true);
  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFait(String(new FormData(e.currentTarget).get("titre")));
  };
  const champ = "min-h-12 w-full rounded-2xl border-2 border-[var(--encre)] bg-[var(--fond)] px-4 text-lg focus:outline-none focus:ring-4 focus:ring-[#B9C3F5]";

  if (fait) {
    return (
      <div role="status" className="space-y-2 rounded-3xl bg-[var(--carte)] p-6">
        <p className="font-[family-name:var(--titres)] text-[28px] leading-tight">Commande prête : « {fait} ».</p>
        <p className="text-[var(--doux)]">{retrait ? "À retirer en boutique : 0 € de port, aucun frais de commande." : "Envoi par la poste : 3,50 € de port sous 35 € de livres neufs (3 € au moins, c'est la loi), 1 € au-delà."}</p>
        <p className="text-sm font-semibold">Démonstration : rien n&apos;est envoyé, rien n&apos;est commandé.</p>
        <button type="button" onClick={() => setFait(null)} className="text-sm font-semibold underline underline-offset-4">Commander un autre livre</button>
      </div>
    );
  }

  return (
    <form onSubmit={soumettre} className="space-y-4 rounded-3xl bg-[var(--carte)] p-5 sm:p-7">
      <label className="block space-y-1.5">
        <span className="block text-[12px] font-semibold uppercase tracking-[0.12em]">Le titre</span>
        <input name="titre" required maxLength={120} className={champ} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="block text-[12px] font-semibold uppercase tracking-[0.12em]">L&apos;auteur (si tu le sais)</span>
          <input name="auteur" maxLength={80} className={champ} />
        </label>
        <label className="block space-y-1.5">
          <span className="block text-[12px] font-semibold uppercase tracking-[0.12em]">Ton prénom</span>
          <input name="prenom" required maxLength={30} autoComplete="given-name" className={champ} />
        </label>
      </div>
      <fieldset className="space-y-2">
        <legend className="text-[12px] font-semibold uppercase tracking-[0.12em]">Je le récupère</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { v: true, t: "En boutique", d: "0 € de port" },
            { v: false, t: "Par la poste", d: "3,50 € sous 35 €, 1 € au-delà" },
          ].map((o) => (
            <button key={o.t} type="button" aria-pressed={retrait === o.v} onClick={() => setRetrait(o.v)} className={`rounded-2xl border-2 px-4 py-3 text-left ${retrait === o.v ? "border-[var(--accent)] bg-[#E8ECFB]" : "border-[var(--trait)] bg-[var(--fond)]"}`}>
              <span className="block font-semibold">{o.t}</span>
              <span className="block text-sm text-[var(--doux)]">{o.d}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <button type="submit" className="min-h-14 w-full rounded-full bg-[var(--accent)] px-6 text-[16px] font-semibold text-[var(--sur-accent)]">
        Commander, sans frais de commande
      </button>
    </form>
  );
}

/** Tous les conseils déjà écrits, filtrés par libraire. */
export function TousLesConseils() {
  const [qui, setQui] = useState<string | null>(null);
  const liste = CONSEILS.filter((c) => !qui || c.libraire === qui);
  return (
    <div className="space-y-8">
      <div role="group" aria-label="Filtrer par libraire" className="flex flex-wrap gap-2">
        {[null, ...LIBRAIRES.map((l) => l.prenom)].map((p) => (
          <button key={p ?? "tous"} type="button" aria-pressed={qui === p} onClick={() => setQui(p)} className={`min-h-11 rounded-full border-2 px-5 font-semibold ${qui === p ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}>
            {p ?? "Tous"}
          </button>
        ))}
      </div>
      <ul data-liste="conseils" className="grid gap-5 md:grid-cols-2">
        {liste.map((c) => (
          <li key={c.pour} className="space-y-3 rounded-3xl bg-[var(--carte)] p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--doux)]">Si t&apos;as adoré</p>
            <p className="font-[family-name:var(--titres)] text-[30px] italic leading-tight">{c.pour}</p>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--doux)]">{c.libraire} te conseille</p>
            <ol className="list-inside list-decimal space-y-1 text-[17px]">
              {c.livres.map((id) => <li key={id}><strong>{livre(id).titre}</strong>, {livre(id).auteur}</li>)}
            </ol>
            <p className="font-[family-name:var(--f-caveat)] text-[24px] leading-snug">« {c.mot} »</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
