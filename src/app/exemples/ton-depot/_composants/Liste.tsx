"use client";

import { useState } from "react";
import { euros, listes } from "./donnees";

/**
 * La liste du matériel pour ouvrir un restaurant : trois métiers, la liste de base de
 * chacun, chiffrée en hors taxes. On décoche ce qu'on a déjà, le total suit, et on commande
 * d'un coup. Rien n'est commandé : la démonstration le dit.
 */
export default function Liste() {
  const [id, setId] = useState("pizzeria");
  const [retirees, setRetirees] = useState<string[]>([]);
  const [commande, setCommande] = useState(false);
  const liste = listes.find((l) => l.id === id) ?? listes[0];
  const gardees = liste.lignes.filter((l) => !retirees.includes(l.ref));
  const total = gardees.reduce((t, l) => t + l.prix, 0);

  return (
    <div className="space-y-5" data-film="liste">
      <div role="tablist" aria-label="Le métier" className="flex flex-wrap gap-2">
        {listes.map((l) => (
          <button
            key={l.id}
            type="button"
            role="tab"
            aria-selected={l.id === id}
            onClick={() => {
              setId(l.id);
              setRetirees([]);
              setCommande(false);
            }}
            className={`shrink-0 rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] ${l.id === id ? "border-[var(--sur-sombre)] bg-[var(--sur-sombre)] text-[var(--sombre)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
          >
            {l.titre.replace("Ouvrir ", "")}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-[14px] border border-[var(--trait)] bg-[var(--carte)]">
        <div className="flex items-end justify-between gap-4 border-b border-[var(--trait)] p-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--doux)]">La liste de base</p>
            <p className="font-[family-name:var(--titres)] text-2xl font-extrabold">{liste.titre}</p>
          </div>
          <span className="shrink-0 rounded-md border border-[var(--trait)] px-2 py-1 text-xs font-bold">{liste.couverts}</span>
        </div>
        <ul className="divide-y divide-[var(--trait)]">
          {liste.lignes.map((l) => {
            const garde = !retirees.includes(l.ref);
            return (
              <li key={l.ref}>
                <label className="flex cursor-pointer items-center gap-3 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={garde}
                    disabled={commande}
                    onChange={() => setRetirees(garde ? [...retirees, l.ref] : retirees.filter((r) => r !== l.ref))}
                    className="h-5 w-5 shrink-0 accent-[#5CD68D]"
                  />
                  <span className={`min-w-0 flex-1 ${garde ? "" : "text-[var(--doux)] line-through"}`}>
                    {l.nom} <span className="whitespace-nowrap text-xs text-[var(--doux)]">{l.ref}</span>
                  </span>
                  <span className={`shrink-0 font-bold tabular-nums ${garde ? "" : "text-[var(--doux)] line-through"}`}>{euros(l.prix)}</span>
                </label>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between gap-4 border-t border-[var(--trait)] bg-[var(--sombre)] p-4" data-film="total">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--doux)]">Total HT · exemple</p>
            <p className="font-[family-name:var(--titres)] text-3xl font-extrabold tabular-nums">{euros(total)}</p>
            <p className="text-xs text-[var(--doux)] tabular-nums">soit {euros(total * 1.2)} TTC</p>
          </div>
          {!commande && (
            <button
              type="button"
              disabled={total === 0}
              onClick={() => setCommande(true)}
              className="shrink-0 rounded-full bg-[var(--accent)] px-5 py-3 font-bold text-[var(--sur-accent)] disabled:opacity-60"
            >
              Tout commander
            </button>
          )}
        </div>
      </div>
      {commande && (
        <div role="status" className="space-y-1 rounded-[14px] border border-[#5CD68D]/60 p-4">
          <p className="font-bold">
            Commande préparée : {gardees.length} appareil{gardees.length > 1 ? "s" : ""}, {euros(total)} HT.
          </p>
          <p className="text-sm">Le comptoir te rappelle pour la date de livraison et l&apos;installation.</p>
          <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est commandé.</p>
        </div>
      )}
      <p className="text-xs text-[var(--doux)]">
        Prix hors taxes d&apos;exemple, vente réservée aux professionnels. La liste de base : le gros matériel, pas l&apos;équipement
        complet.
      </p>
    </div>
  );
}
