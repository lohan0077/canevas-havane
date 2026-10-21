"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CAFES, DOSSIER, cafeDe, euros, heureLisible, nuit, photos } from "./donnees";

// 6 h 45 par défaut : la page est rendue avant de connaître l'heure du visiteur.
const DEFAUT = 6 * 60 + 45;

/**
 * L'accueil de la vidéo, celui qui suit l'heure : le matin il propose le café du
 * réveil, l'après-midi celui de la pause, le soir le déca. L'heure est lue sur le
 * téléphone du visiteur (rien n'est envoyé), et un curseur permet d'en essayer une
 * autre. L'habillage passe de la lumière du matin à la nuit.
 */
export default function Accueil() {
  const [minutes, setMinutes] = useState(DEFAUT);
  const [choisie, setChoisie] = useState(false);

  // L'heure du téléphone : lue à l'arrivée, puis chaque minute et à chaque retour
  // sur l'onglet — tant que le visiteur n'en a pas choisi une autre.
  useEffect(() => {
    if (choisie) return;
    const lire = () => {
      const d = new Date();
      setMinutes(d.getHours() * 60 + d.getMinutes());
    };
    const id = requestAnimationFrame(lire);
    const minute = setInterval(lire, 60_000);
    window.addEventListener("focus", lire);
    return () => {
      cancelAnimationFrame(id);
      clearInterval(minute);
      window.removeEventListener("focus", lire);
    };
  }, [choisie]);

  const cle = cafeDe(minutes);
  const c = CAFES[cle];
  const sombre = nuit(minutes);
  const pile = minutes % 60 === 45;
  const prochain = (Math.floor((minutes - 45) / 60) + 1) * 60 + 45;

  const theme = sombre
    ? { panneau: "bg-[#26384A] text-[#F2E3C9]", carte: "bg-[#1B2836] text-[#F2E3C9]", doux: "text-[#C9D6E2]", accent: "text-[#E8A24B]", bouton: "bg-[#E8A24B] text-[#2B1B12]", piste: "#C9D6E2" }
    : { panneau: "bg-[#F2E3C9] text-[#2B1B12]", carte: "bg-[#FBF4E7] text-[#2B1B12]", doux: "text-[#6B5340]", accent: "text-[#8A4A16]", bouton: "bg-[#2B1B12] text-[#F2E3C9]", piste: "#6B5340" };
  const rempli = (minutes / (24 * 60 - 15)) * 100;

  return (
    <section data-film="accueil" aria-label="Le café de maintenant" className={`grid transition-colors duration-700 md:grid-cols-[1.1fr_0.9fr] ${theme.panneau}`}>
      <div className="space-y-7 px-5 pb-12 pt-8 sm:px-10 sm:pt-14">
        <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${theme.doux}`}>{choisie ? "Heure choisie" : "Heure de ton téléphone"}</p>
        <div>
          <h1 className="font-[family-name:var(--titres)] text-[1.6rem] font-normal sm:text-3xl">Il est</h1>
          <p data-film="heure" className="font-[family-name:var(--titres)] text-[5.6rem] font-extralight leading-[0.9] tracking-[-0.04em] tabular-nums sm:text-[8rem]">
            {heureLisible(minutes)}
          </p>
          <p className="mt-2 font-[family-name:var(--titres)] text-xl">
            {pile ? <>moins le <span className={theme.accent}>quart.</span></> : <>Prochain moins le quart : <span className={theme.accent}>{heureLisible(prochain % (24 * 60))}</span></>}
          </p>
        </div>

        <div data-film="proposition" aria-live="polite" className={`space-y-3 rounded-[24px] p-5 transition-colors duration-700 ${theme.carte}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${theme.doux}`}>Ton café de maintenant</p>
          <p className="flex items-baseline justify-between gap-3">
            <span className="font-[family-name:var(--titres)] text-[2.6rem] font-light leading-none tracking-[-0.03em]">{c.heure}</span>
            <span className={`text-sm italic ${theme.doux}`}>{c.moment}</span>
          </p>
          <p className="font-[family-name:var(--titres)] text-2xl font-medium">{c.nom}</p>
          <p className={theme.doux}>Grain ou moulu · 250 g · {euros(c.prix)} TTC · exemple</p>
          <Link href={`${DOSSIER}/cafes#${cle}`} className={`inline-flex min-h-12 items-center rounded-full px-6 font-semibold ${theme.bouton}`}>
            Le choisir
          </Link>
        </div>

        <label className="block space-y-3">
          <span className="font-[family-name:var(--titres)] text-lg">Et à une autre heure&nbsp;?</span>
          <input
            id="mlq-heure"
            type="range"
            min={0}
            max={24 * 60 - 15}
            step={15}
            value={minutes}
            onChange={(e) => { setMinutes(Number(e.target.value)); setChoisie(true); }}
            aria-valuetext={heureLisible(minutes)}
            className="h-2 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#C8742F] [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C8742F]"
            style={{ background: `linear-gradient(90deg, #C8742F ${rempli}%, ${theme.piste} ${rempli}%)` }}
          />
          <span className={`grid grid-cols-3 text-sm ${theme.doux}`}>
            <span>matin</span><span className="text-center">après-midi</span><span className="text-right">soir</span>
          </span>
        </label>
      </div>

      <div className="relative min-h-[16rem] md:min-h-full">
        <Image src={photos.matin.src} alt={photos.matin.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className={`object-cover transition-opacity duration-700 ${sombre ? "opacity-0" : "opacity-100"}`} priority />
        <Image src={photos.soir.src} alt={photos.soir.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className={`object-cover transition-opacity duration-700 ${sombre ? "opacity-100" : "opacity-0"}`} />
      </div>
    </section>
  );
}
