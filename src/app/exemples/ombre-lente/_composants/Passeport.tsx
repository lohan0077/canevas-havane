"use client";

import { useState } from "react";

const ETOILES = Array.from({ length: 12 }, (_, k) => {
  const a = (k * Math.PI) / 6;
  // Arrondi : le serveur et le navigateur doivent écrire exactement le même nombre.
  return [(20 + 12 * Math.sin(a)).toFixed(2), (15 - 12 * Math.cos(a)).toFixed(2)];
});

/**
 * L'étiquette du passeport phytosanitaire au format commun européen — drapeau,
 * rubriques A à D —, telle qu'elle est attachée à l'arbre expédié. Les valeurs sont
 * des exemples ; « Lire l'étiquette » explique chaque rubrique.
 */
export default function Passeport({ latin, lot }: { latin: string; lot: string }) {
  const [lu, setLu] = useState(false);
  const lignes = [
    ["A", latin, "Le nom botanique de l'arbre."],
    ["B", "FR 00000", "Le pays et le numéro d'enregistrement de la pépinière au registre officiel."],
    ["C", lot, "Le code de traçabilité du lot, pour remonter jusqu'au rang de pépinière."],
    ["D", "FR", "Le pays d'origine."],
  ];
  return (
    <div className="space-y-5" data-film="passeport">
      <figure className="relative mx-auto max-w-[340px] rounded-[22px] bg-[#C9A57A] p-6 pt-10 shadow-[inset_0_0_60px_rgba(80,50,20,0.35)]">
        <span aria-hidden="true" className="absolute left-1/2 top-3 h-12 w-[3px] -translate-x-1/2 rounded bg-[#7A5C3A]" />
        <div className="relative rotate-[-2deg] rounded-md bg-white text-[#1B1B1B] shadow-[0_18px_30px_-16px_rgba(0,0,0,0.55)]">
          <span aria-hidden="true" className="absolute left-1/2 -top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-[#7A5C3A] bg-[#C9A57A]" />
          <div className="flex items-center gap-3 border-b-2 border-[#1B1B1B] px-4 pt-5 pb-3">
            <svg viewBox="0 0 40 30" className="h-9 w-12 shrink-0" aria-hidden="true">
              <rect width="40" height="30" fill="#003399" />
              {ETOILES.map(([x, y], k) => (
                <circle key={k} cx={x} cy={y} r="1.6" fill="#FFCC00" />
              ))}
            </svg>
            <p className="leading-tight">
              <span className="block font-bold text-[15px]">Passeport phytosanitaire</span>
              <span className="block text-[12px]">Plant Passport</span>
            </p>
          </div>
          <dl className="px-4 py-3 space-y-1.5 font-mono text-[14px]">
            {lignes.map(([l, v, d]) => (
              <div key={l} className="space-y-0.5">
                <div className="flex gap-3">
                  <dt className="font-bold w-4">{l}</dt>
                  <dd className={l === "A" ? "italic" : ""}>{v}</dd>
                </div>
                {lu && <p className="pl-7 font-sans text-[12.5px] leading-snug text-[#4A4A4A]">{d}</p>}
              </div>
            ))}
          </dl>
          <span className="absolute right-3 bottom-3 rotate-[-10deg] rounded border-2 border-[#A11D2A] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#A11D2A]">
            Exemple
          </span>
        </div>
        <figcaption className="mt-5 text-center text-[13px] font-semibold text-[#2A1A14]">
          L&apos;étiquette attachée à ton arbre, en photo avant l&apos;achat
          <span className="block font-normal">Obligatoire : règl. (UE) 2016/2031, art. 79, 81 et 83</span>
        </figcaption>
      </figure>
      <button
        type="button"
        data-film="lire-etiquette"
        aria-expanded={lu}
        onClick={() => setLu((x) => !x)}
        className="mx-auto block rounded-full border-2 border-[var(--encre)] px-6 py-3 font-semibold"
      >
        {lu ? "Masquer les explications" : "Lire l'étiquette"}
      </button>
    </div>
  );
}
