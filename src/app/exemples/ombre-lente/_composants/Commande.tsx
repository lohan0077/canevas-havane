"use client";

import { useState } from "react";
import { LIVRAISON, euros } from "./donnees";

export type Option = { id: string; libelle: string; detail: string; note?: string; prix: number };

/**
 * Commander son arbre, directement sur le site : la forme, la quantité, le total TTC
 * livraison comprise, et une confirmation qui dit le jour de livraison — la veille de
 * la Sainte-Catherine. Démonstration : aucune commande, aucun paiement, rien n'est envoyé.
 */
export default function Commande({ nom, options }: { nom: string; options: Option[] }) {
  const [choix, setChoix] = useState(options[0].id);
  const [quantite, setQuantite] = useState(1);
  const [fait, setFait] = useState(false);
  const option = options.find((o) => o.id === choix) ?? options[0];
  const total = option.prix * quantite + LIVRAISON.prix;
  const changer = (f: () => void) => {
    setFait(false);
    f();
  };

  return (
    <div className="space-y-5 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_40px_80px_-50px_rgba(22,41,31,0.6)] sm:p-7" data-film="commande">
      <fieldset className="space-y-2.5">
        <legend className="mb-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--doux)]">Il arrive en</legend>
        {options.map((o) => (
          <label
            key={o.id}
            className={`flex cursor-pointer items-start justify-between gap-4 rounded-2xl border-2 px-4 py-3 transition-colors ${choix === o.id ? "border-[var(--encre)] bg-[var(--fond)]" : "border-[var(--trait)]"}`}
          >
            <span className="flex items-start gap-3">
              <input type="radio" name="forme" checked={choix === o.id} onChange={() => changer(() => setChoix(o.id))} className="mt-1.5 h-4 w-4 accent-[#16291F]" />
              <span>
                <span className="block font-semibold">{o.libelle}</span>
                <span className="block text-sm text-[var(--doux)]">{o.detail}</span>
                {o.note && <span className="block text-sm text-[var(--doux)]">{o.note}</span>}
              </span>
            </span>
            <span className="whitespace-nowrap font-semibold tabular-nums">{euros(o.prix)}</span>
          </label>
        ))}
      </fieldset>

      <div className="flex items-center justify-between">
        <span className="font-semibold">Quantité</span>
        <span className="flex items-center gap-3">
          <button type="button" aria-label="Un arbre de moins" onClick={() => changer(() => setQuantite((q) => Math.max(1, q - 1)))} className="h-11 w-11 rounded-full border-2 border-[var(--trait)] text-xl font-bold">−</button>
          <span className="w-6 text-center text-lg font-bold tabular-nums">{quantite}</span>
          <button type="button" aria-label="Un arbre de plus" onClick={() => changer(() => setQuantite((q) => Math.min(6, q + 1)))} className="h-11 w-11 rounded-full bg-[var(--encre)] text-xl font-bold text-[var(--fond)]">+</button>
        </span>
      </div>

      <dl className="space-y-1.5 border-t border-[var(--trait)] pt-4 text-[15px]">
        <div className="flex justify-between gap-4"><dt>Livraison, passeport phytosanitaire joint</dt><dd className="whitespace-nowrap tabular-nums">{euros(LIVRAISON.prix)}</dd></div>
        <div className="flex justify-between text-lg font-bold"><dt>Total TTC</dt><dd className="whitespace-nowrap tabular-nums">{euros(total)}</dd></div>
      </dl>

      {fait ? (
        <div role="status" className="space-y-1.5 rounded-2xl bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#D9A441]">Commande prête</p>
          <p className="font-[family-name:var(--titres)] text-[30px] leading-tight">Livré le 24 novembre</p>
          <p>
            {quantite > 1 ? `${quantite} × ` : ""}{nom}, le {LIVRAISON.date} : la veille de la Sainte-Catherine.
          </p>
          <p className="text-sm text-[#C9D3B8]">Démonstration : aucune commande passée, aucun paiement, rien n&apos;est envoyé.</p>
        </div>
      ) : (
        <button
          type="button"
          data-film="commander"
          onClick={() => setFait(true)}
          className="flex min-h-14 w-full items-center justify-between gap-4 rounded-full bg-[#D9A441] py-2 pl-6 pr-2 text-[17px] font-semibold text-[#16291F] transition-transform hover:scale-[1.01]"
        >
          Commander mon arbre
          <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-[#16291F] text-[#D9A441]">→</span>
        </button>
      )}
      <p className="text-[13px] text-[var(--doux)]">
        Prix TTC d&apos;exemple. Commandé avant le {LIVRAISON.limite}, livré le 24 novembre.
      </p>
    </div>
  );
}
