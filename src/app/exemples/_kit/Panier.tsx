"use client";

import { useState } from "react";

export type Produit = { nom: string; detail?: string; prix: number };

const euros = (n: number) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" }).replace(/ | /g, " ");

/**
 * Une petite boutique : des produits, des quantités, un total TTC et un bouton qui
 * ne commande rien — la démonstration le dit. Aucun paiement, aucun envoi.
 */
export default function Panier({
  produits,
  bouton = "Commander",
  confirmation = "Commande prête",
  mention = "Prix TTC d'exemple.",
}: {
  produits: Produit[];
  bouton?: string;
  confirmation?: string;
  mention?: string;
}) {
  const [quantites, setQuantites] = useState(produits.map(() => 0));
  const [valide, setValide] = useState(false);
  const total = produits.reduce((t, p, i) => t + p.prix * quantites[i], 0);
  const changer = (i: number, d: number) => {
    setValide(false);
    setQuantites(quantites.map((q, j) => (j === i ? Math.max(0, Math.min(9, q + d)) : q)));
  };

  return (
    <div className="rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-6 sm:p-8 space-y-5">
      <ul className="divide-y divide-[var(--trait)]">
        {produits.map((p, i) => (
          <li key={p.nom} className="flex items-center justify-between gap-4 py-4">
            <span className="min-w-0">
              <span className="block text-lg font-semibold">{p.nom}</span>
              {p.detail && <span className="block text-sm text-[var(--doux)]">{p.detail}</span>}
              <span className="block text-sm font-bold tabular-nums">{euros(p.prix)}</span>
            </span>
            <span className="flex items-center gap-3 shrink-0">
              <button type="button" aria-label={`Retirer un ${p.nom}`} onClick={() => changer(i, -1)} className="h-10 w-10 rounded-full border-2 border-[var(--trait)] text-xl font-bold">−</button>
              <span className="w-5 text-center text-lg font-bold tabular-nums">{quantites[i]}</span>
              <button type="button" aria-label={`Ajouter un ${p.nom}`} onClick={() => changer(i, 1)} className="h-10 w-10 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-xl font-bold">+</button>
            </span>
          </li>
        ))}
      </ul>
      <p className="flex items-baseline justify-between text-xl font-extrabold">
        <span>Total TTC</span>
        <span className="tabular-nums">{euros(total)}</span>
      </p>
      {valide ? (
        <div role="status" className="rounded-2xl bg-[var(--fond)] border-2 border-[var(--accent)] p-4 space-y-1">
          <p className="font-bold">{confirmation}</p>
          <p className="text-sm text-[var(--doux)]">Démonstration : aucune commande passée, aucun paiement.</p>
        </div>
      ) : (
        <button
          type="button"
          disabled={total === 0}
          onClick={() => setValide(true)}
          className="w-full rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-4 text-lg font-extrabold disabled:cursor-not-allowed"
        >
          {bouton}
        </button>
      )}
      <p className="text-xs text-[var(--doux)]">{mention}</p>
    </div>
  );
}
