"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ARBRES, DOSSIER, TEINTES, euros, type Forme } from "./donnees";

const PLANTATION = 2026;
const FRUITS = [[-38, -96], [-8, -118], [26, -100], [44, -70], [-50, -64], [10, -78], [-22, -60], [30, -132]];
const ordinal = (n: number) => (n === 1 ? "1er" : `${n}e`);

/**
 * « Tu cueilles quand ? » : on choisit son arbre, l'arbre grandit année après année
 * jusqu'à l'été de sa première récolte estimée. Tout se calcule ici, dans le
 * navigateur ; les années sont des estimations d'exemple.
 */
export default function Recolte() {
  const [choisi, setChoisi] = useState<string | null>(null);
  const [forme, setForme] = useState<Forme>("demi-tige");
  const [progres, setProgres] = useState(0);
  const anim = useRef<number>(0);
  const arbre = ARBRES.find((a) => a.slug === choisi) ?? null;
  const cible = arbre ? arbre.recolte[forme] : PLANTATION;

  // L'arbre grandit à chaque choix : lancé depuis le clic, arrêté au démontage.
  useEffect(() => () => cancelAnimationFrame(anim.current), []);
  const lancer = () => {
    cancelAnimationFrame(anim.current);
    const calme = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duree = 1700;
    let debut = 0;
    const pas = (t: number) => {
      if (!debut) debut = t;
      const x = Math.min(1, (t - debut) / duree);
      setProgres(calme ? 1 : 1 - (1 - x) ** 3);
      if (x < 1 && !calme) anim.current = requestAnimationFrame(pas);
    };
    setProgres(0);
    anim.current = requestAnimationFrame(pas);
  };

  const annee = arbre ? PLANTATION + Math.round(progres * (cible - PLANTATION)) : PLANTATION;
  const fini = arbre !== null && progres >= 1;
  const echelle = arbre ? 0.34 + 0.66 * progres : 0.34;
  const teinte = arbre ? TEINTES[arbre.fruit] : TEINTES.cerise;

  return (
    <div className="space-y-5" data-film="recolte">
      <div className="grid grid-cols-3 gap-2.5" role="group" aria-label="Choisis ton arbre">
        {ARBRES.map((a) => {
          const actif = a.slug === choisi;
          return (
            <button
              key={a.slug}
              type="button"
              aria-pressed={actif}
              data-film={`arbre-${a.slug}`}
              onClick={() => {
                setChoisi(a.slug);
                lancer();
              }}
              className={`min-h-[64px] rounded-2xl border-2 px-2 py-2.5 text-center transition-colors ${actif ? "border-[var(--accent)] bg-[var(--carte)] shadow-[0_8px_24px_-14px_rgba(158,27,42,0.6)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
            >
              <span className="block font-semibold leading-tight">{a.espece}</span>
              <span className="block text-[12px] leading-tight text-[var(--doux)] mt-0.5">{a.variete}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold">Il arrive en</span>
        <div className="inline-flex rounded-full border-2 border-[var(--trait)] bg-[var(--carte)] p-1" role="group" aria-label="Forme de l'arbre">
          {(["demi-tige", "scion"] as Forme[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={forme === f}
              onClick={() => {
                setForme(f);
                if (choisi) lancer();
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${forme === f ? "bg-[var(--encre)] text-[var(--fond)]" : "text-[var(--encre)]"}`}
            >
              {f === "demi-tige" ? "Demi-tige · 2 ans" : "Scion · 1 an"}
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[28px] border border-[var(--trait)] bg-[#F3E4CF]">
        <p className="absolute left-5 top-4 z-10 font-[family-name:var(--titres)] text-[44px] leading-none tabular-nums text-[var(--encre)]" aria-hidden="true">
          {annee}
        </p>
        <p className="absolute right-5 top-5 z-10 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5B4335]">
          {arbre ? `${arbre.espece} · ${arbre.variete}` : "Ton arbre"}
        </p>
        <svg viewBox="0 0 340 250" className="block w-full h-auto" aria-hidden="true">
          <circle cx="282" cy="74" r="26" fill="#F2C46B" opacity={0.25 + 0.6 * progres} />
          <path d="M0 188 C 60 170, 110 176, 170 186 S 280 172, 340 182 V 250 H 0 Z" fill="#B9C79A" />
          <path d="M0 206 C 80 196, 200 214, 340 200 V 250 H 0 Z" fill="#8FA36B" />
          <g transform={`translate(170 214) scale(${echelle})`} style={{ transformOrigin: "0 0" }}>
            <path d="M-6 0 C -5 -40, -7 -70, -3 -96 L 3 -96 C 6 -70, 5 -40, 6 0 Z" fill="#6B4A33" />
            <path d="M-2 -70 C -14 -84, -26 -92, -36 -104" stroke="#6B4A33" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M2 -78 C 14 -92, 26 -98, 38 -110" stroke="#6B4A33" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="-36" cy="-104" r="38" fill="#5E7D3E" />
            <circle cx="36" cy="-108" r="40" fill="#4E6B34" />
            <circle cx="0" cy="-132" r="44" fill="#5E7D3E" />
            <circle cx="-8" cy="-92" r="34" fill="#4E6B34" />
            {FRUITS.map(([x, y], k) => (
              <circle
                key={k}
                cx={x}
                cy={y}
                r="8"
                fill={teinte.fruit}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transform: fini ? "scale(1)" : "scale(0)",
                  transition: `transform 380ms cubic-bezier(.34,1.56,.64,1) ${k * 70}ms`,
                }}
              />
            ))}
          </g>
        </svg>
      </div>

      <div aria-live="polite" className="rounded-[24px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-6 space-y-3" data-film="estimation">
        {arbre ? (
          <>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#E8B9A8]">Première récolte estimée</p>
            <p className={`font-[family-name:var(--titres)] text-[44px] leading-none transition-opacity duration-300 ${fini ? "opacity-100" : "opacity-40"}`}>
              {arbre.saison} {fini ? cible : annee}
            </p>
            <p className="leading-relaxed">
              Planté en novembre {PLANTATION}, en {forme === "demi-tige" ? "demi-tige de deux ans" : "scion d'un an"} : le{" "}
              {ordinal(cible - PLANTATION)} été après la plantation. Cueillette : {arbre.cueillette}.
            </p>
            <p className="text-sm text-[#E3D3C2]">Estimation selon la variété, le porte-greffe et le sol · exemple</p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Link href={`${DOSSIER}/arbres/${arbre.slug}`} className="rounded-full bg-[var(--fond)] text-[var(--encre)] px-5 py-3 font-semibold">
                Voir le {arbre.espece.toLowerCase()} {arbre.variete}
              </Link>
              <span className="text-sm font-semibold tabular-nums">{euros(arbre.prix[forme])} TTC · exemple</span>
            </div>
          </>
        ) : (
          <>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#E8B9A8]">Ta première récolte</p>
            <p className="font-[family-name:var(--titres)] text-3xl leading-tight">Choisis ton arbre.</p>
            <p className="leading-relaxed">Le site te dit l&apos;été de ta première récolte, variété par variété.</p>
          </>
        )}
      </div>
    </div>
  );
}
