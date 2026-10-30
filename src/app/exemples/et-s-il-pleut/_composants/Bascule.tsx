"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DOSSIER, MOMENTS, photos } from "./donnees";

/** Le soleil et le parapluie du curseur : l'un tourne et s'efface, l'autre entre. */
function Pastille({ pluie }: { pluie: boolean }) {
  return (
    <span aria-hidden="true" className={`relative grid h-8 w-8 place-items-center rounded-full bg-[var(--accent)] shadow-[0_4px_12px_-4px_rgba(25,26,40,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] motion-reduce:transition-none ${pluie ? "rotate-[360deg]" : ""}`}>
      <svg viewBox="0 0 24 24" width="18" height="18" className={`absolute transition-[opacity,transform] duration-300 ${pluie ? "scale-50 opacity-0" : "opacity-100"}`}>
        <circle cx="12" cy="12" r="3.6" fill="none" stroke="#191A28" strokeWidth="1.6" />
        <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6L18 18M6 18l1.4-1.4M16.6 7.4L18 6" stroke="#191A28" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 24 24" width="18" height="18" className={`absolute transition-[opacity,transform] duration-300 ${pluie ? "opacity-100" : "scale-50 opacity-0"}`}>
        <path d="M4 12.5a8 8 0 0 1 16 0c-1-.9-2.1-.9-2.7 0-.5-.9-2.1-.9-2.7 0-.5-.9-2.1-.9-2.6 0-.5-.9-2.1-.9-2.7 0-.5-.9-2.1-.9-2.7 0-.5-.9-1.6-.9-2.6 0z" fill="#191A28" />
        <path d="M12 12.5v5.5a1.8 1.8 0 0 1-3.6 0" fill="none" stroke="#191A28" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/**
 * La bascule : un mariage d'exemple en deux versions. Soleil ou pluie, d'un toucher :
 * la grange se découvre en cercle depuis la pastille, l'averse tombe, et chaque moment
 * de la journée change de lieu, l'un après l'autre. Tout se passe ici ; la date est un
 * exemple, pas une prévision.
 */
export default function Bascule({ grand = false }: { grand?: boolean }) {
  const [pluie, setPluie] = useState(false);
  return (
    <div data-film="bascule" className="overflow-hidden rounded-[1.75rem] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_40px_80px_-50px_rgba(25,26,40,0.55)]">
      <div className={`relative ${grand ? "aspect-[4/3] lg:aspect-[16/9]" : "aspect-[4/3]"} overflow-hidden bg-[var(--sombre)]`}>
        <Image
          src={photos.jardin.src}
          alt={photos.jardin.alt}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          className={`object-cover transition-transform duration-[1200ms] ease-out motion-reduce:transition-none ${pluie ? "scale-105" : "scale-100"}`}
        />
        {/* La version pluie se découvre en cercle, depuis la pastille en haut à droite. */}
        <div
          className="absolute inset-0 transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.7,0,0.2,1)] motion-reduce:transition-none"
          style={{ clipPath: pluie ? "circle(150% at 88% 9%)" : "circle(0% at 88% 9%)" }}
          aria-hidden={!pluie}
        >
          {/* Chargée d'emblée : cachée par le cercle, elle doit être prête au premier toucher. */}
          <Image src={photos.grange.src} alt={photos.grange.alt} fill loading="eager" sizes="(min-width: 1024px) 640px, 100vw" className="object-cover object-[50%_60%]" />
          <div className="absolute inset-0 bg-[#191A28]/30" />
          <div className="esp-averse" />
        </div>
        <p className="absolute bottom-3 left-3 rounded-full bg-[var(--sombre)] px-3.5 py-1.5 text-xs font-semibold text-[var(--sur-sombre)]">
          Samedi 11 septembre 2027 · exemple
        </p>
        <p aria-live="polite" className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-[var(--carte)] px-3.5 py-1.5 text-sm font-semibold text-[var(--encre)] shadow-[0_6px_18px_-8px_rgba(25,26,40,0.5)]">
          <span key={pluie ? "p" : "s"} className="esp-ligne flex items-center gap-2">
            {pluie ? (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 9a3 3 0 0 1 .3-6A4 4 0 0 1 12 4a2.5 2.5 0 0 1 0 5z" fill="#8E8AA8" /><path d="M5 11l-1 3M8.5 11l-1 3M12 11l-1 3" stroke="#191A28" strokeWidth="1.4" strokeLinecap="round" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="3.4" fill="#FFC61A" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6L13 13M3 13l1.4-1.4M11.6 4.4L13 3" stroke="#B88A00" strokeWidth="1.3" strokeLinecap="round" /></svg>
            )}
            {pluie ? "Version pluie" : "Version soleil"}
          </span>
        </p>
      </div>

      <div className="space-y-5 p-5 sm:p-7">
        <div className="flex items-center justify-center gap-4">
          <span className={`font-[family-name:var(--titres)] text-[26px] italic transition-colors duration-500 ${pluie ? "text-[var(--doux)]" : "text-[var(--encre)]"}`}>Soleil</span>
          <button
            id="esp-bascule"
            type="button"
            role="switch"
            aria-checked={pluie}
            aria-label="Basculer sur la version pluie"
            onClick={() => setPluie((p) => !p)}
            className={`relative h-11 w-[88px] shrink-0 rounded-full border-2 border-[var(--encre)] transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--encre)] ${pluie ? "bg-[var(--sombre)]" : "bg-[#FFF3C4]"}`}
          >
            <span className={`absolute top-1/2 -translate-y-1/2 transition-[left] duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] motion-reduce:transition-none ${pluie ? "left-[46px]" : "left-[4px]"}`}>
              <Pastille pluie={pluie} />
            </span>
          </button>
          <span className={`font-[family-name:var(--titres)] text-[26px] italic transition-colors duration-500 ${pluie ? "text-[var(--encre)]" : "text-[var(--doux)]"}`}>Pluie</span>
        </div>

        <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {MOMENTS.map((m, i) => (
            <li key={m.moment} className="grid grid-cols-[86px_1fr] items-baseline gap-3 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">
                {m.moment}
                <span className="block font-medium normal-case tracking-normal tabular-nums">{m.heure.replace(/ /g, " ")}</span>
              </span>
              <span className="relative block min-h-[1.6em] font-[family-name:var(--titres)] text-[20px] leading-snug">
                <span
                  className={`block transition-all duration-500 motion-reduce:transition-none ${pluie ? "pointer-events-none absolute inset-x-0 top-0 -translate-y-2 opacity-0 blur-[3px]" : "opacity-100"}`}
                  style={{ transitionDelay: `${i * 90}ms` }}
                  aria-hidden={pluie}
                >
                  {m.soleil}
                </span>
                <span
                  className={`block transition-all duration-500 motion-reduce:transition-none ${pluie ? "opacity-100" : "pointer-events-none absolute inset-x-0 top-0 translate-y-2 opacity-0 blur-[3px]"}`}
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
          <Link href={`${DOSSIER}/deux-versions#devis`} className="text-sm font-semibold underline decoration-[var(--accent)] decoration-2 underline-offset-4 transition-[text-underline-offset] hover:underline-offset-[6px]">
            Voir le devis d&apos;exemple
          </Link>
        </p>
      </div>
    </div>
  );
}
