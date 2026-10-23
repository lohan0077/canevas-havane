"use client";

import { useState } from "react";
import Image from "next/image";
import { GATEAUX, TAILLES, euros, prix, tailleFaite } from "./donnees";

/** Le gâteau vu du dessus, découpé en autant de parts que d'invités (30 au plus). */
function GateauEnParts({ parts }: { parts: number }) {
  const n = Math.max(1, Math.min(parts, 30));
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-36 w-36 shrink-0 sm:h-48 sm:w-48">
      <circle cx="100" cy="100" r="94" fill="#F3D88A" />
      <circle cx="100" cy="100" r="86" fill="#E9B7C0" stroke="#3D1D13" strokeWidth="3" />
      <circle cx="100" cy="100" r="64" fill="none" stroke="#FFF8EC" strokeWidth="3" strokeDasharray="1 11" strokeLinecap="round" />
      {Array.from({ length: n }, (_, k) => {
        const a = (k / n) * Math.PI * 2 - Math.PI / 2;
        return <line key={`${n}-${k}`} x1="100" y1="100" x2={100 + Math.cos(a) * 86} y2={100 + Math.sin(a) * 86} stroke="#3D1D13" strokeWidth="1.6" />;
      })}
      <circle cx="100" cy="100" r="7" fill="#3D1D13" />
    </svg>
  );
}

/**
 * La seule question de l'accueil, comme une application : « Vous serez combien ? ». On
 * tape un nombre ; le gâteau se découpe, et les gâteaux de la vitrine qui conviennent
 * s'affichent, avec leur prix et leurs allergènes. Tout se calcule dans le navigateur.
 */
export default function Invites() {
  const [saisie, setSaisie] = useState("6");
  const invites = Math.max(0, Math.min(99, Number.parseInt(saisie || "0", 10) || 0));
  const taille = invites > 0 ? tailleFaite(invites) : null;
  const changer = (d: number) => setSaisie(String(Math.max(1, Math.min(60, invites + d))));

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_50px_100px_-50px_rgba(61,29,19,0.55)]">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--trait)] bg-[#F3D88A] px-5 py-3 sm:px-8">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em]">Gâteau à partager</p>
        <p className="font-[family-name:var(--f-caveat)] text-xl">prix d&apos;exemple, allergènes compris</p>
      </div>
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col items-center gap-6 border-b border-[var(--trait)] p-6 sm:p-9 lg:border-b-0 lg:border-r">
          <GateauEnParts parts={taille ?? invites} />
          <div className="space-y-2 text-center">
            <label htmlFor="nombre-invites" className="block text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--doux)]">Invités</label>
            <div className="flex items-center gap-3">
              <button type="button" aria-label="Un invité de moins" onClick={() => changer(-1)} className="grid h-12 w-12 place-items-center rounded-full border-2 border-[var(--encre)] text-2xl font-bold leading-none">−</button>
              <input
                id="nombre-invites"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={2}
                value={saisie}
                onChange={(e) => setSaisie(e.target.value.replace(/\D/g, ""))}
                className="w-24 rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-2 py-1 text-center font-[family-name:var(--titres)] text-6xl tabular-nums outline-none focus:border-[var(--encre)]"
              />
              <button type="button" aria-label="Un invité de plus" onClick={() => changer(1)} className="grid h-12 w-12 place-items-center rounded-full bg-[var(--encre)] text-2xl font-bold leading-none text-[var(--fond)]">+</button>
            </div>
          </div>
        </div>

        <div id="pour-n" aria-live="polite" className="scroll-mt-24 space-y-4 p-5 sm:p-8">
          {invites === 0 ? (
            <p className="text-[var(--doux)]">Tape le nombre d&apos;invités.</p>
          ) : taille === null ? (
            <p className="font-bold">Au-delà de {TAILLES[TAILLES.length - 1]} parts, on fait deux gâteaux : appelle-nous, on compose ensemble.</p>
          ) : (
            <>
              <p className="font-[family-name:var(--titres)] text-3xl leading-tight">
                Pour {invites}&nbsp;: <span className="italic text-[var(--accent-texte)]">{taille !== invites ? `nos gâteaux de ${taille} parts` : "nos gâteaux"}</span>
              </p>
              <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
                {GATEAUX.map((g) => (
                  <li key={g.id} className="flex items-center gap-4 py-3">
                    <Image src={g.photo.src} alt="" width={g.photo.largeur} height={g.photo.hauteur} sizes="64px" className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-16 sm:w-16" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-[family-name:var(--titres)] text-xl leading-tight">{g.nom}</span>
                      <span className="block text-[13px] text-[var(--doux)]">{taille} parts · {g.allergenes.join(", ").toLowerCase()}</span>
                    </span>
                    <span className="shrink-0 font-[family-name:var(--titres)] text-2xl tabular-nums">{euros(prix(g, taille))}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[13px] text-[var(--doux)]">Prix TTC d&apos;exemple · des recettes de famille, refaites avec l&apos;accord de chaque famille.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
