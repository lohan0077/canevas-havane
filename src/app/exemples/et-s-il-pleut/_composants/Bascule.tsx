"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DOSSIER, MOMENTS, photos } from "./donnees";

// L'averse dessinée par-dessus la photo : des traits obliques qui tombent. Rien ne
// bouge pour qui a demandé moins d'animations.
const AVERSE = `
@keyframes esp-pluie { to { background-position: -36px 144px; } }
.esp-averse {
  background-image: repeating-linear-gradient(104deg, transparent 0 22px, rgba(255,255,255,.42) 22px 23.5px, transparent 23.5px 46px);
  background-size: 144px 144px;
  animation: esp-pluie .45s linear infinite;
}
@media (prefers-reduced-motion: reduce) { .esp-averse { animation: none; } }
`;

/**
 * La bascule : un mariage d'exemple en deux versions. Soleil ou pluie, d'un toucher :
 * la photo change, l'averse tombe, et chaque moment de la journée change de lieu.
 * Tout se passe ici ; la date est un exemple, pas une prévision.
 */
export default function Bascule({ grand = false }: { grand?: boolean }) {
  const [pluie, setPluie] = useState(false);
  return (
    <div data-film="bascule" className="overflow-hidden rounded-[32px] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_30px_60px_-40px_rgba(47,59,76,0.55)]">
      <style>{AVERSE}</style>
      <div className={`relative ${grand ? "aspect-[4/3] lg:aspect-[16/9]" : "aspect-[4/3]"} bg-[#1E2733]`}>
        <Image src={photos.jardin.src} alt={photos.jardin.alt} fill sizes="(min-width: 1024px) 640px, 100vw" className={`object-cover transition-opacity duration-700 ${pluie ? "opacity-0" : "opacity-100"}`} />
        <Image src={photos.grange.src} alt={photos.grange.alt} fill sizes="(min-width: 1024px) 640px, 100vw" className={`object-cover object-[50%_60%] transition-opacity duration-700 ${pluie ? "opacity-100" : "opacity-0"}`} />
        <div aria-hidden="true" className={`absolute inset-0 bg-[#1E2733]/30 transition-opacity duration-700 ${pluie ? "opacity-100" : "opacity-0"}`} />
        <div aria-hidden="true" className={`esp-averse absolute inset-0 transition-opacity duration-700 ${pluie ? "opacity-100" : "opacity-0"}`} />
        <p className="absolute bottom-3 left-3 rounded-full bg-[#1E2733] px-3.5 py-1.5 text-xs font-medium text-[var(--sur-sombre)]">
          Samedi 11 septembre 2027 · exemple
        </p>
        <p aria-live="polite" className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-[var(--fond)] px-3.5 py-1.5 text-sm font-semibold text-[var(--encre)]">
          {pluie ? (
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 9a3 3 0 0 1 .3-6A4 4 0 0 1 12 4a2.5 2.5 0 0 1 0 5z" fill="#7C8FA6" /><path d="M5 11l-1 3M8.5 11l-1 3M12 11l-1 3" stroke="#2F3B4C" strokeWidth="1.4" strokeLinecap="round" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="3.4" fill="#F2C230" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6L13 13M3 13l1.4-1.4M11.6 4.4L13 3" stroke="#B88A00" strokeWidth="1.3" strokeLinecap="round" /></svg>
          )}
          {pluie ? "Version pluie" : "Version soleil"}
        </p>
      </div>

      <div className="p-5 sm:p-7 space-y-5">
        <div className="flex items-center justify-center gap-4">
          <span className={`font-[family-name:var(--titres)] text-[26px] italic transition-opacity ${pluie ? "opacity-60" : ""}`}>Soleil</span>
          <button
            id="esp-bascule"
            type="button"
            role="switch"
            aria-checked={pluie}
            aria-label="Basculer sur la version pluie"
            onClick={() => setPluie((p) => !p)}
            className={`relative h-11 w-[84px] shrink-0 rounded-full border-2 border-[var(--encre)] transition-colors ${pluie ? "bg-[var(--encre)]" : "bg-[#FFF4CF]"}`}
          >
            <span aria-hidden="true" className={`absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow transition-[left] duration-300 ${pluie ? "left-[44px]" : "left-[4px]"}`} />
          </button>
          <span className={`font-[family-name:var(--titres)] text-[26px] italic transition-opacity ${pluie ? "" : "opacity-60"}`}>Pluie</span>
        </div>

        <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {MOMENTS.map((m, i) => (
            <li key={m.moment} className="grid grid-cols-[86px_1fr] items-baseline gap-3 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">
                {m.moment}
                <span className="block font-normal normal-case tracking-normal tabular-nums">{m.heure.replace(/ /g, " ")}</span>
              </span>
              <span className="relative block min-h-[1.6em] font-[family-name:var(--titres)] text-[21px] leading-snug">
                <span
                  className={`block transition-all duration-500 ${pluie ? "pointer-events-none absolute inset-x-0 top-0 -translate-y-2 opacity-0" : "opacity-100"}`}
                  style={{ transitionDelay: `${i * 90}ms` }}
                  aria-hidden={pluie}
                >
                  {m.soleil}
                </span>
                <span
                  className={`block transition-all duration-500 ${pluie ? "opacity-100" : "pointer-events-none absolute inset-x-0 top-0 translate-y-2 opacity-0"}`}
                  style={{ transitionDelay: `${i * 90}ms` }}
                  aria-hidden={!pluie}
                >
                  {m.pluie}
                </span>
              </span>
            </li>
          ))}
        </ol>

        <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="font-[family-name:var(--titres)] text-xl italic">Les deux, dans le même devis.</span>
          <Link href={`${DOSSIER}/deux-versions#devis`} className="text-sm font-semibold underline underline-offset-4 decoration-[var(--accent)] decoration-2">Voir le devis d&apos;exemple</Link>
        </p>
      </div>
    </div>
  );
}
