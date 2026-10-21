"use client";

import { useState } from "react";
import Image from "next/image";
import { photos } from "./donnees";

type Marque = { x: number; y: number };

/**
 * L'affiche de lancement, en jeu : « Trouve les 7 différences ». On touche la photo de
 * droite là où l'on croit voir un écart ; chaque fois, un cercle dit « rien ici ». Au
 * septième essai, la réponse : il n'y en a aucune. Les deux photos sont la même image
 * d'illustration, et la légende le dit.
 */
export default function SeptDifferences() {
  const [marques, setMarques] = useState<Marque[]>([]);
  const fini = marques.length >= 7;
  const p = photos.salon;

  const toucher = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (fini) return;
    const r = e.currentTarget.getBoundingClientRect();
    setMarques([...marques, { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }]);
  };

  return (
    <div data-film="sept-differences" className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
          <Image src={p.src} alt={`Photo de gauche : ${p.alt}`} width={p.largeur} height={p.hauteur} sizes="(min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover" />
        </div>
        <button
          type="button"
          onClick={toucher}
          aria-label="Photo de droite : touche l'endroit où tu vois une différence"
          className="relative aspect-[4/3] cursor-crosshair overflow-hidden rounded-[22px]"
        >
          <Image src={p.src} alt="" width={p.largeur} height={p.hauteur} sizes="(min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover" />
          {marques.map((m, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-[#FFFDF8] bg-[#1F3A33]/70 text-[11px] font-semibold leading-tight text-[#FFFDF8]"
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              rien
              <br />
              ici
            </span>
          ))}
        </button>
      </div>

      <div aria-live="polite" className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] bg-[var(--sombre)] px-5 py-4 text-[var(--sur-sombre)]">
        {fini ? (
          <p className="font-[family-name:var(--titres)] text-[28px] leading-tight">
            Il n&apos;y en a <em className="text-[#E3C88E]">aucune.</em> Tout est remis en place.
          </p>
        ) : (
          <p className="text-[16px]">
            Différences cherchées : <strong className="font-[family-name:var(--titres)] text-[26px] font-normal tabular-nums">{marques.length}</strong> / 7
          </p>
        )}
        {marques.length > 0 && (
          <button type="button" onClick={() => setMarques([])} className="text-[14px] font-semibold underline underline-offset-4">
            Recommencer
          </button>
        )}
      </div>
      <p className="text-[13px] leading-relaxed text-[var(--doux)]">
        Ici, la même photo d&apos;illustration, deux fois. L&apos;affiche de lancement montre deux vraies
        photos d&apos;un séjour, non retouchées, publiées avec l&apos;accord écrit du propriétaire, sans
        voyageur ni objet personnel reconnaissable.
      </p>
    </div>
  );
}
