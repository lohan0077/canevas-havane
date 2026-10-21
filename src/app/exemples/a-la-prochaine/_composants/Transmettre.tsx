"use client";

import { useState, type FormEvent } from "react";

/**
 * Inscrire le nom suivant : le numéro, un prénom, une année, et deux accords. En
 * démonstration, rien n'est envoyé ni inscrit — la confirmation le dit.
 */
export default function Transmettre() {
  const [fait, setFait] = useState<{ numero: string; prenom: string } | null>(null);
  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setFait({ numero: String(d.get("numero")).padStart(4, "0"), prenom: String(d.get("prenom")) });
  };

  if (fait) {
    return (
      <div role="status" className="space-y-2 border-2 border-[var(--accent)] bg-[var(--carte)] p-6">
        <p className="font-[family-name:var(--titres)] text-3xl">
          Demande prête : {fait.prenom}, sous le n° {fait.numero}.
        </p>
        <p className="text-[var(--doux)]">Sur un vrai site, la boutique vérifierait avec la personne précédente avant d&apos;ajouter la ligne.</p>
        <p className="text-sm font-semibold">Démonstration : rien n&apos;est envoyé, rien n&apos;est inscrit.</p>
        <button type="button" onClick={() => setFait(null)} className="text-sm font-semibold underline underline-offset-4">Revenir au formulaire</button>
      </div>
    );
  }

  const champ = "min-h-12 w-full border border-[var(--encre)] bg-[var(--carte)] px-4 text-lg focus:outline-2 focus:outline-offset-2 focus:outline-[var(--encre)]";
  return (
    <form onSubmit={soumettre} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="block text-[13px] font-semibold uppercase tracking-[0.16em]">Le numéro gravé</span>
          <input name="numero" inputMode="numeric" maxLength={4} pattern="[0-9]{1,4}" required className={`${champ} tabular-nums`} />
        </label>
        <label className="block space-y-2">
          <span className="block text-[13px] font-semibold uppercase tracking-[0.16em]">Ton prénom</span>
          <input name="prenom" autoComplete="given-name" required maxLength={30} className={champ} />
        </label>
      </div>
      <label className="flex items-start gap-3 text-[15px] leading-relaxed">
        <input type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]" />
        <span>J&apos;accepte que mon prénom et l&apos;année figurent sur la page publique de ce numéro. Je peux les faire retirer à tout moment.</span>
      </label>
      <label className="flex items-start gap-3 text-[15px] leading-relaxed">
        <input type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]" />
        <span>La personne qui me l&apos;a donné sait que je l&apos;inscris. La boutique lui demandera confirmation.</span>
      </label>
      <button type="submit" className="min-h-14 w-full bg-[var(--accent)] px-6 text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--sur-accent)] sm:w-auto">
        Inscrire mon prénom
      </button>
    </form>
  );
}
