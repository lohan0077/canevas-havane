"use client";

import { useState } from "react";
import { OBJETS } from "./donnees";
import styles from "./Papier.module.css";

const POSES = [
  { classe: styles.coton, angle: -5, place: "left-[6%] top-[7%]", aimant: "#C2381F" },
  { classe: styles.verge, angle: 4, place: "right-[6%] top-[12%]", aimant: "#1E2A5A" },
  { classe: styles.couche, angle: -3, place: "left-[9%] top-[53%]", aimant: "#1E2A5A" },
  { classe: styles.kraft, angle: 6, place: "right-[8%] top-[56%]", aimant: "#C2381F" },
];

/**
 * La porte du frigo : quatre choses imprimées, aimantées. On en touche une, et la
 * fiche dit son papier et son prix (TTC, d'exemple). Ce qu'on vend, montré là où
 * ça finit.
 */
export default function Frigo() {
  const [choisi, setChoisi] = useState(0);
  const o = OBJETS[choisi];

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_0.9fr] md:items-center">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] rounded-[34px] border-[6px] border-[#D9DDE2] bg-[#EEF0F2] shadow-[inset_0_-30px_60px_-40px_rgba(30,42,90,.35)]">
        <span aria-hidden="true" className="absolute left-[-14px] top-[18%] h-[34%] w-3 rounded-full bg-[#C9CED5]" />
        {OBJETS.map((objet, i) => {
          const p = POSES[i];
          const actif = choisi === i;
          return (
            <button
              key={objet.id}
              type="button"
              aria-pressed={actif}
              aria-label={`${objet.genre} : ${objet.titre}, ${objet.sous}`}
              onClick={() => setChoisi(i)}
              className={`absolute ${p.place} w-[44%] rounded-[4px] px-3 pb-4 pt-6 text-left text-[#1E2A5A] shadow-[0_10px_18px_-10px_rgba(30,42,90,.55)] transition-transform ${p.classe} ${actif ? "ring-4 ring-[var(--accent)]" : ""}`}
              style={{ transform: `rotate(${p.angle}deg) scale(${actif ? 1.05 : 1})` }}
            >
              <span aria-hidden="true" className="absolute left-1/2 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full shadow" style={{ background: p.aimant }} />
              <span className="block text-[10px] font-bold uppercase tracking-[0.14em]">{objet.genre}</span>
              <span className="block font-[family-name:var(--titres)] text-[22px] italic leading-tight">{objet.titre}</span>
              <span className="block text-xs [font-variant-numeric:lining-nums]">{objet.sous}</span>
            </button>
          );
        })}
      </div>
      <div aria-live="polite" className="rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-6 space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{o.genre}</p>
        <p className="font-[family-name:var(--titres)] text-4xl italic leading-tight">{o.titre}</p>
        <p className="text-[var(--doux)]">{o.papier}</p>
        <p className="text-lg font-bold [font-variant-numeric:lining-nums]">{o.prix} <span className="font-normal text-[var(--doux)]">· exemple</span></p>
        <p className="text-sm text-[var(--doux)]">Touche un autre objet sur la porte du frigo.</p>
      </div>
    </div>
  );
}
