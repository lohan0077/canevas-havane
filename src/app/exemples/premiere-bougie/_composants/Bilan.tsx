"use client";

import { useEffect, useRef, useState } from "react";
import { BILAN } from "./donnees";
import Bougie from "./Bougie";

/**
 * Le bilan d'ensemble : dix-huit bougies, quinze allumées, trois éteintes, et les
 * trois chiffres qui montent quand le bloc arrive à l'écran. Jamais une ligne par
 * personne. Chiffres d'exemple.
 */
export default function Bilan() {
  const bloc = useRef<HTMLDivElement>(null);
  // Le serveur rend le bilan complet : sans JavaScript, ou avant qu'il arrive, les
  // vrais chiffres s'affichent. Dans le navigateur, si le bloc n'est pas encore à
  // l'écran, on repart de zéro et le décompte se joue quand il y arrive.
  const [p, setP] = useState(1); // progression du décompte, de 0 à 1
  const [anime, setAnime] = useState(false);

  useEffect(() => {
    const e = bloc.current;
    if (!e) return;
    let premier = true;
    const obs = new IntersectionObserver(([x]) => {
      if (premier) {
        premier = false;
        if (x.isIntersecting) obs.disconnect();
        else setP(0);
        return;
      }
      if (x.isIntersecting && x.intersectionRatio >= 0.6) { setAnime(true); obs.disconnect(); }
    }, { threshold: 0.6 });
    obs.observe(e);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!anime || p >= 1) return;
    const minuteur = setTimeout(() => setP((x) => Math.min(1, x + 1 / 24)), 55);
    return () => clearTimeout(minuteur);
  }, [anime, p]);

  const n = (v: number) => Math.round(v * (1 - (1 - p) ** 3));
  const lignes = [
    { quoi: "Recrues", detail: "arrivées il y a plus d'un an", valeur: BILAN.recrues, ton: "" },
    { quoi: "Toujours là", detail: "un an après leur arrivée", valeur: BILAN.toujoursLa, ton: "fete" },
    { quoi: "Parties", detail: "avant leur première année", valeur: BILAN.parties, ton: "depart" },
  ];

  return (
    <div ref={bloc} className="overflow-hidden rounded-[28px] bg-[var(--sombre)] text-[var(--sur-sombre)]" data-film="bilan">
      <div className="space-y-1 px-6 pt-6 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9C9DA]">Notre bilan · exemple</p>
        <p className="font-[family-name:var(--titres)] text-4xl">Toujours là&nbsp;?</p>
      </div>
      <ul className="grid grid-cols-9 gap-x-1 gap-y-2 px-6 pt-5 sm:px-8" aria-label={`${BILAN.toujoursLa} bougies allumées, ${BILAN.parties} éteintes`}>
        {Array.from({ length: BILAN.recrues }, (_, k) => (
          <li key={k}><Bougie allumee={k < BILAN.toujoursLa ? p > (k / BILAN.recrues) * 0.8 : false} className="mx-auto h-12 w-5" /></li>
        ))}
      </ul>
      <dl className="mt-5 divide-y divide-[#3A3A55] border-t border-[#3A3A55]">
        {lignes.map((l) => (
          <div key={l.quoi} className="flex items-center justify-between gap-4 px-6 py-4 sm:px-8">
            <dt>
              <span className={`block text-lg font-semibold ${l.ton === "fete" ? "text-[#F2C14E]" : l.ton === "depart" ? "text-[#F49A82]" : ""}`}>{l.quoi}</span>
              <span className="block text-sm text-[#C9C9DA]">{l.detail}</span>
            </dt>
            <dd className="flex items-center gap-3">
              {l.ton === "fete" && p >= 1 && <span className="rounded-full bg-[#F2C14E] px-2.5 py-1 text-xs font-bold text-[#22223B]">1 an</span>}
              <span className="font-[family-name:var(--titres)] text-5xl tabular-nums [font-variant-numeric:lining-nums]">{n(l.valeur)}</span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="px-6 pb-6 pt-1 text-xs leading-relaxed text-[#C9C9DA] sm:px-8">
        Chiffres d&apos;ensemble, {BILAN.periode} (exemple). Jamais une ligne par personne : ni nom, ni poste, ni entreprise.
      </p>
    </div>
  );
}
