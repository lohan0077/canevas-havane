"use client";

import { useState, type FormEvent } from "react";

/**
 * Commander un livre qu'on n'a pas en rayon : à l'unité, sans frais de commande
 * (loi n° 81-766, art. 1, al. 3). Retrait en boutique. Rien n'est envoyé.
 */
export default function Commande() {
  const [fait, setFait] = useState<string | null>(null);
  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFait(String(new FormData(e.currentTarget).get("titre")));
  };
  if (fait) {
    return (
      <div role="status" className="space-y-2 border border-[var(--encre)] bg-[var(--carte)] p-6">
        <p className="font-[family-name:var(--titres)] text-[30px] italic leading-tight">« {fait} », commandé.</p>
        <p className="text-[var(--doux)]">Sans frais de commande, au prix de l&apos;éditeur, à retirer en boutique (0 € de port). Il arrivera sans paraphe.</p>
        <p className="text-sm font-semibold">Démonstration : rien n&apos;est envoyé, rien n&apos;est commandé.</p>
        <button type="button" onClick={() => setFait(null)} className="text-sm underline underline-offset-4">Commander un autre livre</button>
      </div>
    );
  }
  const champ = "min-h-12 w-full border border-[var(--encre)] bg-[var(--carte)] px-4 text-lg focus:outline-2 focus:outline-offset-2 focus:outline-[var(--encre)]";
  return (
    <form onSubmit={soumettre} className="space-y-4">
      <label className="block space-y-1.5">
        <span className="block text-[13px] uppercase tracking-[0.14em]">Titre</span>
        <input name="titre" required maxLength={120} className={champ} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="block text-[13px] uppercase tracking-[0.14em]">Auteur (facultatif)</span>
          <input name="auteur" maxLength={80} className={champ} />
        </label>
        <label className="block space-y-1.5">
          <span className="block text-[13px] uppercase tracking-[0.14em]">Ton prénom</span>
          <input name="prenom" required maxLength={30} autoComplete="given-name" className={champ} />
        </label>
      </div>
      <button type="submit" className="min-h-12 w-full bg-[var(--accent)] px-6 font-semibold text-[var(--sur-accent)] sm:w-auto">
        Commander, sans frais de commande
      </button>
    </form>
  );
}
