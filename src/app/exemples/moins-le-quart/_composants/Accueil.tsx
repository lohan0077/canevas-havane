"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { CAFES, DOSSIER, cafeDe, euros, heureLisible, nuit, photos } from "./donnees";

// 6 h 45 par défaut : la page est rendue avant de connaître l'heure du visiteur.
const DEFAUT = 6 * 60 + 45;

/**
 * Le premier écran, celui de la vidéo « Créer une marque » : l'accueil suit l'heure.
 * Le matin il propose le café du réveil, l'après-midi celui de la pause, le soir le
 * déca. L'heure est lue sur le téléphone du visiteur (rien n'est envoyé), et un curseur
 * permet d'en essayer une autre. Le fond vivant passe de la lumière du matin à la nuit,
 * et le cadran montre le quart d'heure d'avant l'heure.
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
  const rempli = (minutes / (24 * 60 - 15)) * 100;
  const h = Math.floor(minutes / 60), m = minutes % 60;

  return (
    <section
      id="maintenant"
      data-film="accueil"
      aria-label="Le café de maintenant"
      className={`kit-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden text-[#F2E3C9] transition-colors duration-1000 ${sombre ? "bg-[#14202C]" : "bg-[#2B1B12]"}`}
    >
      <div className={`absolute inset-0 transition-opacity duration-1000 ${sombre ? "opacity-0" : "opacity-100"}`}>
        <FondVivant couleurs={["#2B1B12", "#7A3E14", "#D98B3A"]} />
      </div>
      <div className={`absolute inset-0 transition-opacity duration-1000 ${sombre ? "opacity-100" : "opacity-0"}`}>
        <FondVivant couleurs={["#0E1822", "#26384A", "#4E6E8C"]} />
      </div>
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-5 pb-12 pt-32 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-36">
        <div className="space-y-7">
          <TitreRevele
            as="h1"
            auChargement
            texte={"Le café *d'avant l'heure.*"}
            className="font-[family-name:var(--titres)] text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-[1] tracking-[-0.035em]"
            classeAccent="font-[family-name:var(--texte)] italic text-[#E8A24B]"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F2E3C9]/90">{choisie ? "Heure choisie" : "Heure de ton téléphone"} · il est</p>
            <p data-film="heure" className="font-[family-name:var(--titres)] text-[clamp(5.2rem,14vw,11rem)] font-extralight leading-[0.9] tracking-[-0.05em] tabular-nums">
              {heureLisible(minutes)}
            </p>
            <p className="mt-2 font-[family-name:var(--titres)] text-xl">
              {pile ? <>moins le <span className="font-[family-name:var(--texte)] italic text-[#E8A24B]">quart.</span></> : <>Prochain moins le quart : <span className="text-[#E8A24B]">{heureLisible(prochain % (24 * 60))}</span></>}
            </p>
          </div>

          <div data-film="proposition" aria-live="polite" className={`max-w-xl space-y-3 rounded-[2rem] border border-white/15 p-5 backdrop-blur-md transition-colors duration-1000 sm:p-6 ${sombre ? "bg-[#14202C]/75" : "bg-[#2B1B12]/75"}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F2E3C9]/90">Ton café de maintenant</p>
            <p className="flex items-baseline justify-between gap-3">
              <span className="font-[family-name:var(--titres)] text-[2.6rem] font-light leading-none tracking-[-0.03em]">{c.heure}</span>
              <span className="text-[15px] italic text-[#F2E3C9]/90">{c.moment}</span>
            </p>
            <p className="font-[family-name:var(--titres)] text-2xl font-medium">{c.nom}</p>
            <p className="text-[#F2E3C9]/90">{c.enClair} · grain ou moulu · 250 g · {euros(c.prix)} TTC · exemple</p>
            <Link href={`${DOSSIER}/cafes#${cle}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#E8A24B] px-6 font-semibold text-[#2B1B12] transition-transform hover:scale-[1.02]">
              Le choisir <span aria-hidden="true">→</span>
            </Link>
          </div>

          <label className="block max-w-xl space-y-3">
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
              className="h-2 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#E8A24B] [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E8A24B]"
              style={{ background: `linear-gradient(90deg, #E8A24B ${rempli}%, rgba(242,227,201,0.35) ${rempli}%)` }}
            />
            <span className="grid grid-cols-3 text-sm text-[#F2E3C9]/90">
              <span>matin</span><span className="text-center">après-midi</span><span className="text-right">soir</span>
            </span>
          </label>
        </div>

        {/* Le cadran : la photo du moment, et le quart d'heure d'avant l'heure. */}
        <div aria-hidden="true" className="relative mx-auto hidden aspect-square w-full max-w-[32rem] md:block">
          <div className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-white/25">
            <Image src={photos.matin.src} alt="" fill sizes="512px" priority className={`object-cover transition-opacity duration-1000 ${sombre ? "opacity-0" : "opacity-100"}`} />
            <Image src={photos.soir.src} alt="" fill sizes="512px" className={`object-cover transition-opacity duration-1000 ${sombre ? "opacity-100" : "opacity-0"}`} />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-[conic-gradient(from_270deg,rgba(232,162,75,0.6)_0deg_90deg,transparent_90deg)]" />
          </div>
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="absolute left-1/2 top-1/2 h-[46%] w-px origin-bottom" style={{ transform: `translate(-50%, -100%) rotate(${i * 30}deg)` }}>
              <span className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-[#F2E3C9] ${i % 3 === 0 ? "h-5 w-1" : "h-3 w-0.5"}`} />
            </span>
          ))}
          <span className="absolute left-1/2 top-1/2 h-[26%] w-2 origin-bottom rounded-full bg-[#F2E3C9] transition-transform duration-700" style={{ transform: `translate(-50%, -100%) rotate(${(h % 12) * 30 + m * 0.5}deg)` }} />
          <span className="absolute left-1/2 top-1/2 h-[40%] w-1 origin-bottom rounded-full bg-[#E8A24B] transition-transform duration-700" style={{ transform: `translate(-50%, -100%) rotate(${m * 6}deg)` }} />
          <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E8A24B]" />
        </div>
      </div>
    </section>
  );
}
