"use client";

import { useState } from "react";
import { LIVRAISON, type Forme } from "./donnees";

const prix = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + " €";

/**
 * Commander son arbre : la forme, la quantité, le total TTC livraison comprise, et
 * une confirmation qui dit le jour de livraison. Démonstration : aucune commande
 * n'est passée, aucun paiement, rien n'est envoyé.
 */
export default function Commande({
  nom,
  prixParForme,
  livre,
  recolte,
}: {
  nom: string;
  prixParForme: Record<Forme, number>;
  livre: Record<Forme, string>;
  recolte: Record<Forme, string>;
}) {
  const [forme, setForme] = useState<Forme>("demi-tige");
  const [quantite, setQuantite] = useState(1);
  const [fait, setFait] = useState(false);
  const total = prixParForme[forme] * quantite + LIVRAISON.prix;
  const changer = (f: () => void) => {
    setFait(false);
    f();
  };

  return (
    <div className="rounded-[26px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7 space-y-5" data-film="commande">
      <fieldset className="space-y-2.5">
        <legend className="text-sm font-semibold mb-2">Il arrive en</legend>
        {(["demi-tige", "scion"] as Forme[]).map((f) => (
          <label
            key={f}
            className={`flex cursor-pointer items-start justify-between gap-4 rounded-2xl border-2 px-4 py-3 ${forme === f ? "border-[var(--accent)]" : "border-[var(--trait)]"}`}
          >
            <span className="flex items-start gap-3">
              <input type="radio" name="forme" checked={forme === f} onChange={() => changer(() => setForme(f))} className="mt-1.5 h-4 w-4 accent-[var(--accent)]" />
              <span>
                <span className="block font-semibold">{f === "demi-tige" ? "Demi-tige · 2 ans" : "Scion · 1 an"}</span>
                <span className="block text-sm text-[var(--doux)]">{livre[f]}</span>
                <span className="block text-sm text-[var(--doux)]">Récolte estimée : {recolte[f]}</span>
              </span>
            </span>
            <span className="font-semibold tabular-nums whitespace-nowrap">{prix(prixParForme[f])}</span>
          </label>
        ))}
      </fieldset>

      <div className="flex items-center justify-between">
        <span className="font-semibold">Quantité</span>
        <span className="flex items-center gap-3">
          <button type="button" aria-label="Un arbre de moins" onClick={() => changer(() => setQuantite((q) => Math.max(1, q - 1)))} className="h-11 w-11 rounded-full border-2 border-[var(--trait)] text-xl font-bold">−</button>
          <span className="w-6 text-center text-lg font-bold tabular-nums">{quantite}</span>
          <button type="button" aria-label="Un arbre de plus" onClick={() => changer(() => setQuantite((q) => Math.min(6, q + 1)))} className="h-11 w-11 rounded-full bg-[var(--encre)] text-[var(--fond)] text-xl font-bold">+</button>
        </span>
      </div>

      <dl className="space-y-1.5 border-t border-[var(--trait)] pt-4 text-[15px]">
        <div className="flex justify-between gap-4"><dt>Livraison, passeport phytosanitaire joint</dt><dd className="tabular-nums whitespace-nowrap">{prix(LIVRAISON.prix)}</dd></div>
        <div className="flex justify-between text-lg font-bold"><dt>Total TTC</dt><dd className="tabular-nums whitespace-nowrap">{prix(total)}</dd></div>
      </dl>

      {fait ? (
        <div role="status" className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--fond)] p-5 space-y-1.5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Commande prête</p>
          <p className="font-[family-name:var(--titres)] text-[30px] leading-tight">Livraison le 24 novembre</p>
          <p>
            {quantite > 1 ? `${quantite} × ` : ""}{nom}, le {LIVRAISON.date} : la veille de la Sainte-Catherine.
          </p>
          <p className="text-sm text-[var(--doux)]">Démonstration : aucune commande passée, aucun paiement, rien n&apos;est envoyé.</p>
        </div>
      ) : (
        <button
          type="button"
          data-film="commander"
          onClick={() => setFait(true)}
          className="w-full rounded-full bg-[var(--accent)] px-6 py-4 text-lg font-semibold text-[var(--sur-accent)]"
        >
          Commander mon arbre
        </button>
      )}
      <p className="text-[13px] text-[var(--doux)]">
        Prix TTC d&apos;exemple. Commandé avant le {LIVRAISON.limite}, livré le 24 novembre.
      </p>
    </div>
  );
}
