"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DOSSIER, photos } from "./donnees";
import { ORIENTATIONS, SAISONS, CIELS, forme, heure } from "./soleil";

// Premier écran inspiré du modèle « Solar Energy Hero » de MotionSites : un grand titre
// centré au-dessus des toits, et une pastille à deux positions sous le titre. Le modèle
// basculait entre matin et nuit ; ici, entre plein sud et plein ouest, pour dire en
// une touche ce que fait le site.
const CHOIX = [ORIENTATIONS[2], ORIENTATIONS[4]];

export default function Ouverture() {
  const [i, setI] = useState(0);
  const pic = forme(CHOIX[i], SAISONS[0], CIELS[0]).pic;

  return (
    <section className="relative isolate overflow-hidden bg-[#1D4E89] text-white">
      <Image src={photos.ciel.src} alt={photos.ciel.alt} width={photos.ciel.largeur} height={photos.ciel.hauteur} priority sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_100%]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(13,38,74,.82)_0%,rgba(13,38,74,.55)_45%,rgba(13,38,74,.1)_75%,rgba(13,38,74,.35)_100%)]" />
      <div className="max-w-5xl mx-auto px-5 pt-14 pb-10 sm:pt-24 sm:pb-16 min-h-[640px] sm:min-h-[720px] flex flex-col items-center text-center">
        <p className="rounded-full border border-white/50 px-4 py-1.5 text-[13px] font-semibold tracking-wide">Panneaux solaires · maisons individuelles</p>
        <h1 className="mt-6 text-[52px] sm:text-[88px] font-semibold tracking-[-0.04em]">
          Ton toit,<br />à <span className="text-[var(--accent)]">midi pile.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg sm:text-xl leading-relaxed">
          On ne te promet pas d'économies en très gros. On te montre ta journée, heure par heure : quand ton toit produit, et quand lancer la machine.
        </p>
        <div className="mt-7 rounded-full bg-white p-1.5 text-[var(--encre)] shadow-lg" role="group" aria-label="Orientation du toit">
          {CHOIX.map((o, k) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={i === k}
              onClick={() => setI(k)}
              className={`h-11 rounded-full px-5 text-[15px] font-bold transition-colors ${i === k ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : ""}`}
            >
              {o.court === "Sud" ? "Plein sud" : "Plein ouest"}
            </button>
          ))}
        </div>
        <p className="mt-3 text-[15px] font-semibold" aria-live="polite">
          En été, ton pic vers <span className="tabular-nums">{heure(pic)}</span> · exemple
        </p>
        <div className="mt-auto pt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href={`${DOSSIER}/ma-journee`} className="flex h-14 sm:flex-1 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-lg font-bold text-[var(--sur-accent)]">
            Voir ma journée
          </Link>
          <Link href={`${DOSSIER}/etre-rappele`} className="flex h-14 sm:flex-1 items-center justify-center rounded-full border-2 border-white bg-[#0D264A]/40 px-6 text-lg font-bold">
            Être rappelé
          </Link>
        </div>
      </div>
    </section>
  );
}
