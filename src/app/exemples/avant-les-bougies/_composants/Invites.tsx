"use client";

import { useState } from "react";
import Image from "next/image";
import { GATEAUX, TAILLES, euros, prix, tailleFaite } from "./donnees";

/** Le gâteau vu du dessus, découpé en autant de parts que d'invités (30 au plus). */
function GateauEnParts({ parts }: { parts: number }) {
  const n = Math.max(1, Math.min(parts, 30));
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-28 w-28 shrink-0 sm:h-36 sm:w-36">
      <circle cx="100" cy="100" r="92" fill="#FFD9DF" stroke="#3B1A12" strokeWidth="3" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="#C42D47" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
      {Array.from({ length: n }, (_, k) => {
        const a = (k / n) * Math.PI * 2 - Math.PI / 2;
        return <line key={k} x1="100" y1="100" x2={100 + Math.cos(a) * 92} y2={100 + Math.sin(a) * 92} stroke="#3B1A12" strokeWidth="1.6" />;
      })}
      <circle cx="100" cy="100" r="6" fill="#3B1A12" />
    </svg>
  );
}

/**
 * La seule question de l'accueil : « Vous serez combien ? ». On tape un nombre ; le
 * gâteau se découpe, et les gâteaux qui conviennent s'affichent, avec leur prix et
 * leurs allergènes. Tout se calcule dans le navigateur.
 */
export default function Invites() {
  const [saisie, setSaisie] = useState("6");
  const invites = Math.max(0, Math.min(99, Number.parseInt(saisie || "0", 10) || 0));
  const taille = invites > 0 ? tailleFaite(invites) : null;
  const changer = (d: number) => setSaisie(String(Math.max(1, Math.min(60, invites + d))));

  return (
    <div className="rounded-[32px] bg-[var(--carte)] p-5 shadow-[0_30px_60px_-35px_rgba(59,26,18,0.5)] sm:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <GateauEnParts parts={taille ?? invites} />
        <div className="space-y-2">
          <label htmlFor="nombre-invites" className="block text-sm font-bold uppercase tracking-[0.14em]">Invités</label>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Un invité de moins" onClick={() => changer(-1)} className="h-11 w-11 rounded-full border-2 border-[var(--encre)] text-2xl font-bold leading-none">−</button>
            <input
              id="nombre-invites"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={2}
              value={saisie}
              onChange={(e) => setSaisie(e.target.value.replace(/\D/g, ""))}
              className="w-16 rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-2 py-1.5 text-center font-[family-name:var(--titres)] text-4xl font-extrabold tabular-nums outline-none focus:border-[var(--accent)]"
            />
            <button type="button" aria-label="Un invité de plus" onClick={() => changer(1)} className="h-11 w-11 rounded-full bg-[var(--accent)] text-2xl font-bold leading-none text-[var(--sur-accent)]">+</button>
          </div>
        </div>
      </div>

      <div id="pour-n" aria-live="polite" className="space-y-3">
        {invites === 0 ? (
          <p className="text-[var(--doux)]">Tapez le nombre d&apos;invités.</p>
        ) : taille === null ? (
          <p className="font-semibold">Au-delà de {TAILLES[TAILLES.length - 1]} parts, on fait deux gâteaux : appelez-nous, on compose ensemble.</p>
        ) : (
          <>
            <p className="font-[family-name:var(--titres)] text-2xl font-extrabold">
              Pour {invites} : {taille !== invites ? `nos gâteaux de ${taille} parts` : "nos gâteaux"}
            </p>
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {GATEAUX.map((g) => (
                <li key={g.id} className="flex items-center gap-3 py-3">
                  <Image src={g.photo.src} alt="" width={g.photo.largeur} height={g.photo.hauteur} sizes="56px" className="h-14 w-14 shrink-0 rounded-full object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold leading-tight">{g.nom}</span>
                    <span className="block text-xs text-[var(--doux)]">{taille} parts · {g.allergenes.join(", ").toLowerCase()}</span>
                  </span>
                  <span className="shrink-0 font-[family-name:var(--titres)] text-2xl font-extrabold tabular-nums">{euros(prix(g, taille))}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[var(--doux)]">Prix TTC d&apos;exemple · allergènes sur chaque fiche, rappelés avant de commander.</p>
          </>
        )}
      </div>
    </div>
  );
}
