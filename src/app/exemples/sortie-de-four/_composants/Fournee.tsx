"use client";

import { useState } from "react";
import Link from "next/link";
import Piece from "./Piece";
import { DOSSIER, FORMES, pieces, prix, type Forme } from "./donnees";

/**
 * La fournée : chaque pièce, son numéro, son prix et son état — « En ligne » ou
 * « Partie ». Un filtre par forme, et une case pour cacher celles qui sont parties.
 * Les états sont un exemple : sur un vrai site, ils viendraient des vraies ventes.
 */
export default function Fournee({ limite }: { limite?: number }) {
  const [forme, setForme] = useState<Forme | "tout">("tout");
  const [cacher, setCacher] = useState(false);
  const liste = pieces
    .filter((p) => forme === "tout" || p.forme === forme)
    .filter((p) => !cacher || !p.partie)
    .slice(0, limite);

  return (
    <div className="space-y-6">
      {!limite && (
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrer par forme">
          {FORMES.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={forme === f.id}
              onClick={() => setForme(f.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                forme === f.id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"
              }`}
            >
              {f.libelle}
            </button>
          ))}
          <label className="ml-auto flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={cacher} onChange={(e) => setCacher(e.target.checked)} className="h-5 w-5 accent-[var(--accent)]" />
            Cacher les pièces parties
          </label>
        </div>
      )}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4" data-film="grille">
        {liste.map((p) => (
          <li key={p.slug} data-piece={p.slug}>
            <Link href={`${DOSSIER}/fournee/${p.slug}`} className="group block space-y-3">
              <div className={`relative grid aspect-square place-items-center rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-5 transition-transform group-hover:-translate-y-1 ${p.partie ? "opacity-60" : ""}`}>
                <Piece forme={p.forme} email={p.email} className="w-[82%]" />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${
                    p.partie ? "bg-[var(--encre)] text-[var(--fond)]" : "bg-[var(--accent)] text-[var(--sur-accent)]"
                  }`}
                >
                  {p.partie ? "Partie" : "En ligne"}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-[family-name:var(--titres)] text-2xl leading-tight">{p.nom}</p>
                <p className={`font-semibold tabular-nums ${p.partie ? "line-through text-[var(--doux)]" : ""}`}>{prix(p.prix)}</p>
              </div>
              <p className="text-sm text-[var(--doux)]">{p.emailNom}</p>
            </Link>
          </li>
        ))}
      </ul>
      {liste.length === 0 && <p className="text-[var(--doux)]">Plus aucune pièce de cette forme dans la fournée : la prochaine sort du four le 19 novembre.</p>}
    </div>
  );
}
