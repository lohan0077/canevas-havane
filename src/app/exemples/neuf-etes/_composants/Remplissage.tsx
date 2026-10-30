"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useState } from "react";
import { DOSSIER } from "./donnees";

// Le premier écran de l'accueil : la piscine qui se remplit (Bassin3D), et par-dessus,
// la question de la marque. L'affiche — la même piscine, pleine, en image fixe — est
// là tout de suite ; la 3D se charge ensuite et prend sa place en fondu. Si le
// navigateur ne sait pas faire de 3D, l'affiche reste, et rien ne manque.
//
// Le texte ne bloque jamais l'eau : la couche du texte laisse passer le doigt et la
// souris, seuls les boutons les prennent.

const Bassin3D = dynamic(() => import("./Bassin3D"), { ssr: false, loading: () => null });

export default function Remplissage() {
  const [pret, setPret] = useState(false);
  const [sans3D, setSans3D] = useState(false);
  const surPret = useCallback(() => setPret(true), []);
  const indisponible = useCallback(() => setSans3D(true), []);

  return (
    <section id="ouverture" aria-label="Neuf Étés" className="relative flex-1 overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${DOSSIER}/bassin.webp)` }}
        role="img"
        aria-label="Une piscine de jardin pleine, en fin de journée d'été, devant une maison blanche"
      />
      {!sans3D && (
        <div className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${pret ? "opacity-100" : "opacity-0"}`}>
          <Bassin3D onPret={surPret} onIndisponible={indisponible} />
        </div>
      )}

      {/* Deux voiles : le texte reste lisible quel que soit le reflet en dessous. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#0D3446]/70 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#0A2A38] via-[#0D3446]/90 via-55% to-transparent lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-[62%] lg:bg-gradient-to-r lg:via-[#0D3446]/80" aria-hidden="true" />

      {/* L'invitation à toucher l'eau, posée au-dessus du bassin une fois rempli. */}
      {!sans3D && (
        <p
          className={`pointer-events-none absolute left-1/2 top-[34%] z-10 -translate-x-1/2 rounded-full border border-white/30 bg-[#0D3446]/55 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-opacity delay-[8000ms] duration-1000 motion-reduce:hidden lg:left-[66%] lg:top-[62%] ${pret ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        >
          <span className="[@media(pointer:coarse)]:hidden">Passe la souris sur l&apos;eau</span>
          <span className="hidden [@media(pointer:coarse)]:inline">Touche l&apos;eau</span>
        </p>
      )}

      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-28 md:pb-16 lg:pb-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#CFE6EE]">Piscines familiales</p>
        <h1 className="mt-4 text-[2.6rem] font-normal leading-[1.02] tracking-[-0.01em] text-white sm:text-6xl lg:text-7xl">
          Il te reste
          <br />
          <span className="text-[var(--accent)]">combien d&apos;étés&nbsp;?</span>
        </h1>
        <p className="mt-5 hidden max-w-md text-base leading-relaxed text-[#E4EEF1] sm:block md:text-lg">
          Entre l&apos;âge de tes enfants : le site compte les étés qu&apos;il te reste avec eux, à la maison.
          Neuf Étés construit l&apos;endroit où ils vont se passer.
        </p>
        <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="#etes"
            data-film="appel-ouverture"
            className="rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-[var(--sur-accent)] shadow-[0_10px_30px_rgba(246,196,69,.25)] transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Compter mes étés
          </Link>
          <Link
            href="#prix"
            className="rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Ton jardin fait combien&nbsp;?
          </Link>
        </div>
      </div>
    </section>
  );
}
