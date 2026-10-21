"use client";

import { useState, type FormEvent } from "react";
import { CLUB } from "./donnees";

/** S'inscrire au club des livres pas finis : un prénom et le livre lâché. Rien n'est envoyé. */
export default function Club() {
  const [fait, setFait] = useState<{ prenom: string; livre: string } | null>(null);
  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setFait({ prenom: String(d.get("prenom")), livre: String(d.get("livre")) });
  };
  if (fait) {
    return (
      <div role="status" className="space-y-2 border border-[var(--sur-sombre)] p-6">
        <p className="font-[family-name:var(--titres)] text-[30px] italic leading-tight">À {CLUB.date.toLowerCase()}, {fait.prenom}.</p>
        <p>Apporte « {fait.livre} ». Tu nous diras page combien tu l&apos;as lâché.</p>
        <p className="text-sm font-semibold">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        <button type="button" onClick={() => setFait(null)} className="text-sm underline underline-offset-4">Revenir au formulaire</button>
      </div>
    );
  }
  const champ = "min-h-12 w-full border border-[var(--sur-sombre)] bg-transparent px-4 text-lg text-[var(--sur-sombre)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--sur-sombre)]";
  return (
    <form onSubmit={soumettre} className="space-y-4">
      <label className="block space-y-1.5">
        <span className="block text-[13px] uppercase tracking-[0.14em]">Ton prénom</span>
        <input name="prenom" required maxLength={30} autoComplete="given-name" className={champ} />
      </label>
      <label className="block space-y-1.5">
        <span className="block text-[13px] uppercase tracking-[0.14em]">Le livre que tu as lâché</span>
        <input name="livre" required maxLength={100} className={champ} />
      </label>
      <button type="submit" className="min-h-12 w-full bg-[var(--sur-sombre)] px-6 font-semibold text-[var(--sombre)] sm:w-auto">
        Garder ma chaise
      </button>
    </form>
  );
}
