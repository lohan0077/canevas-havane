"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Bijou from "./Bijou";
import { Tampon } from "./Pieces";
import { DOSSIER, PIECES, SORTIE, euros, grave } from "./donnees";

const pieces = SORTIE.numeros.map((n) => PIECES.find((p) => p.numero === n)!);
// L'ordre où elles sont parties (exemple) : les tampons se posent un par un.
const ordre = pieces.filter((p) => p.partieLe).map((p) => p.numero);

/**
 * La sortie du vendredi : six pièces, telles qu'elles étaient à 18 h. « Voir ce qui
 * est parti » pose les tampons, un par un, dans l'ordre où elles sont parties.
 * Rien ne se décompte, rien ne presse : ce sont les ventes passées de la sortie.
 */
export default function Vendredi() {
  const [etape, setEtape] = useState(0);       // nombre de tampons posés
  const [rejoue, setRejoue] = useState(false);

  useEffect(() => {
    if (!rejoue || etape >= ordre.length) return;
    const t = setTimeout(() => setEtape((e) => e + 1), etape === 0 ? 250 : 450);
    return () => clearTimeout(t);
  }, [rejoue, etape]);

  const posee = (n: number) => ordre.indexOf(n) > -1 && ordre.indexOf(n) < etape;

  return (
    <div className="space-y-5" data-film="vendredi">
      <div className="flex items-center justify-between gap-3 border-y border-[var(--trait)] py-3 text-[13px] font-semibold uppercase tracking-[0.14em]">
        <span>Sortie du {SORTIE.date}</span>
        <span className="tabular-nums text-[var(--accent-texte)]">18 h 00</span>
      </div>
      <ul className="grid grid-cols-3 gap-x-2.5 gap-y-4 sm:gap-x-5">
        {pieces.map((p) => (
          <li key={p.numero}>
            <Link href={`${DOSSIER}/pieces/${p.numero}`} className="group block">
              <span className="relative block aspect-square overflow-hidden bg-[var(--sombre)]">
                <Bijou piece={p} className="h-full w-full p-2.5 transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-1.5 top-1 text-[12px] font-semibold tabular-nums text-[var(--sur-sombre)]">[{grave(p.numero)}]</span>
                {p.partieLe && <Tampon visible={posee(p.numero)} />}
              </span>
              <span className="mt-1.5 block font-[family-name:var(--titres)] text-[20px] leading-tight">{p.nom}</span>
              <span className="block text-[12px] text-[var(--doux)]">{posee(p.numero) ? "Partie" : `${euros(p.prix)} · 1 sur 1`}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {etape < ordre.length || !rejoue ? (
          <button
            type="button"
            onClick={() => {
              setEtape(0);
              setRejoue(true);
            }}
            disabled={rejoue}
            className="min-h-12 bg-[var(--encre)] px-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--fond)]"
          >
            Voir ce qui est parti
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setRejoue(false);
              setEtape(0);
            }}
            className="min-h-12 border border-[var(--encre)] px-6 text-[13px] font-semibold uppercase tracking-[0.14em]"
          >
            Revoir la sortie à 18 h
          </button>
        )}
        <p role="status" className="text-sm text-[var(--doux)]">
          {rejoue ? `${etape} partie${etape > 1 ? "s" : ""} sur 6, ${6 - etape} encore là.` : "Six pièces, six numéros, une fois chacune."}
        </p>
      </div>
      <p className="text-[13px] text-[var(--doux)]">Pièces, prix TTC et ventes d&apos;exemple : la marque est fictive.</p>
    </div>
  );
}
