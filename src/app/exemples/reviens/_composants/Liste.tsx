"use client";

import { useState } from "react";
import { euros, listes, ttc } from "./donnees";

/**
 * La liste du matériel pour ouvrir un restaurant : trois métiers, la liste de base de
 * chacun, chiffrée en hors taxes. On décoche ce qu'on a déjà, le total suit, et on
 * commande d'un coup. Rien n'est commandé : la démonstration le dit.
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
            className={`shrink-0 rounded-[8px] border-2 px-3.5 py-2 font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.08em] ${l.id === id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)]"}`}
          >
            {l.titre.replace("Ouvrir ", "")}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-[16px] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_40px_90px_-50px_rgba(31,43,53,0.7)]">
        <div className="flex items-end justify-between gap-4 border-b border-dashed border-[var(--trait)] p-5">
          <div>
            <p className="font-[family-name:var(--titres)] text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--doux)]">La liste de base</p>
            <p className="font-[family-name:var(--titres)] text-[1.7rem] font-black uppercase leading-tight tracking-[-0.02em]">{liste.titre}</p>
          </div>
          <span className="shrink-0 rounded-[6px] border-2 border-[var(--encre)] px-2 py-1 font-[family-name:var(--titres)] text-xs font-bold uppercase">{liste.couverts}</span>
        </div>
        <ul className="divide-y divide-[var(--trait)]">
          {liste.lignes.map((l) => {
            const garde = !retirees.includes(l.ref);
            return (
              <li key={l.ref}>
                <label className="flex cursor-pointer items-center gap-3 px-5 py-3.5">
                  <input
                    type="checkbox"
                    checked={garde}
                    disabled={commande}
                    onChange={() => setRetirees(garde ? [...retirees, l.ref] : retirees.filter((r) => r !== l.ref))}
                    className="h-5 w-5 shrink-0 accent-[var(--accent)]"
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
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]" data-film="total">
          <div>
            <p className="font-[family-name:var(--titres)] text-[12px] font-bold uppercase tracking-[0.2em] text-[#E9D8B4]">Total HT · exemple</p>
            <p className="font-[family-name:var(--titres)] text-[2.2rem] font-black leading-tight tabular-nums">{euros(total)}</p>
            <p className="text-xs tabular-nums">soit {euros(ttc(total))} TTC</p>
          </div>
          {!commande && (
            <button
              type="button"
              disabled={total === 0}
              onClick={() => setCommande(true)}
              className="w-full shrink-0 rounded-[10px] bg-[var(--accent)] px-5 py-3.5 font-[family-name:var(--titres)] font-extrabold uppercase tracking-[0.04em] text-[var(--sur-accent)] sm:w-auto"
            >
              Tout commander
            </button>
          )}
        </div>
      </div>
      {commande && (
        <div role="status" className="space-y-1 rounded-[12px] border-2 border-[var(--accent)] bg-[var(--carte)] p-4">
          <p className="font-bold">
            Commande préparée : {gardees.length} appareil{gardees.length > 1 ? "s" : ""}, {euros(total)} HT.
          </p>
          <p className="text-sm">Le comptoir te rappelle pour la date de livraison et l&apos;installation.</p>
          <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est commandé.</p>
        </div>
      )}
      <p className="text-xs text-[var(--doux)]">
        Prix hors taxes d&apos;exemple, vente réservée aux professionnels. La liste de base : le gros matériel, pas
        l&apos;équipement complet.
      </p>
    </div>
  );
}
