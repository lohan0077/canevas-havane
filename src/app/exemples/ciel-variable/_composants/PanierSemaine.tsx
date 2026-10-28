"use client";

import { useState } from "react";
import type { Bulletin } from "./donnees";

/**
 * Le panier qui découle du bulletin : chaque légume, oui ou non, et pourquoi — on
 * touche la ligne pour lire la raison. Ce qui manque est dit, pas caché.
 */
export default function PanierSemaine({ bulletin, ouvert: depart = null }: { bulletin: Bulletin; ouvert?: string | null }) {
  const [ouvert, setOuvert] = useState<string | null>(depart);
  return (
    <ul id={`panier-${bulletin.numero}`} className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {bulletin.panier.map((l) => {
        const deplie = ouvert === l.nom;
        return (
          <li key={l.nom}>
            <button
              type="button"
              aria-expanded={deplie}
              onClick={() => setOuvert(deplie ? null : l.nom)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className={`font-[family-name:var(--titres)] text-2xl font-light uppercase ${l.oui ? "" : "line-through decoration-1"}`}>{l.nom}</span>
              <span className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold ${l.oui ? "bg-[#486A2C] text-white" : "bg-[#9A3B2E] text-white"}`}>
                {l.oui ? "Oui" : "Non"}
              </span>
            </button>
            {deplie && <p className="pb-4 pr-16 text-lg leading-snug text-[var(--doux)]">{l.pourquoi}</p>}
          </li>
        );
      })}
    </ul>
  );
}
