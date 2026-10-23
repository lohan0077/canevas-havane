"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./animations.module.css";

const DUREE = 20; // secondes : la vidéo d'une pièce dure vingt secondes

const lisse = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const entre = (a: number, b: number, t: number) => a + (b - a) * t;

/** La terre à l'instant `p` (0 → 1) : une motte centrée, puis ouverte, puis montée en bol. */
function terre(p: number) {
  const monte = lisse(0.45, 1, p);
  const c = 200, base = 214;
  const wb = entre(150, 96, lisse(0.1, 0.9, p));          // largeur au pied
  const wt = entre(36, 178, lisse(0.2, 1, p));            // largeur en haut
  const h = entre(58, 84, monte) + 6 * lisse(0.1, 0.3, p);
  const m = lisse(0.3, 1, p);
  // Deux points de contrôle par flanc : un dôme au départ, un ventre arrondi à la fin.
  const x1 = wb / 2 + entre(0, 30, m), y1 = h * entre(0.7, 0.04, m);
  const x2 = wt / 2 + entre(26, -8, m), y2 = h * entre(1, 0.5, m);
  const corps =
    `M${c - wb / 2} ${base} C${c - x1} ${base - y1} ${c - x2} ${base - y2} ${c - wt / 2} ${base - h} ` +
    `L${c + wt / 2} ${base - h} C${c + x2} ${base - y2} ${c + x1} ${base - y1} ${c + wb / 2} ${base} Z`;
  const ouvert = lisse(0.28, 0.55, p);
  return { corps, haut: base - h, rx: wt / 2, ouvert };
}

const temps = (s: number) => `0:${String(Math.floor(s)).padStart(2, "0")}`;

/**
 * La « vidéo » du tournage d'une pièce : le tour, et la terre qui monte en bol.
 * Ici un dessin animé — l'atelier est fictif — avec les commandes d'un vrai lecteur :
 * lecture, pause, et la barre qu'on fait glisser. Rien n'est chargé d'ailleurs.
 */
export default function Tour({ legende, date }: { legende: string; date: string }) {
  const [t, setT] = useState(0);
  const [lecture, setLecture] = useState(false);
  const [glisse, setGlisse] = useState(false);
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!lecture) return;
    let image = 0;
    let avant = performance.now();
    const pas = (maintenant: number) => {
      const dt = (maintenant - avant) / 1000;
      avant = maintenant;
      setT((x) => {
        const suivant = Math.min(DUREE, x + dt);
        if (suivant >= DUREE) setLecture(false);
        return suivant;
      });
      image = requestAnimationFrame(pas);
    };
    image = requestAnimationFrame(pas);
    return () => cancelAnimationFrame(image);
  }, [lecture]);

  useEffect(() => () => {
    if (minuteur.current) clearTimeout(minuteur.current);
  }, []);

  const p = t / DUREE;
  const { corps, haut, rx, ouvert } = terre(p);
  const tourne = lecture || glisse;

  return (
    <figure className="space-y-3" data-film="video">
      <div className="relative overflow-hidden rounded-[28px] bg-[#2A1B12] text-[#F3EADF] aspect-[4/3.4] sm:aspect-[16/11]">
        <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-label={`Animation du tournage, ${temps(t)} sur 0:20`} role="img">
          <defs>
            <radialGradient id="tour-lumiere" cx="0.5" cy="0.2" r="0.8">
              <stop offset="0" stopColor="#5A3E2B" />
              <stop offset="1" stopColor="#2A1B12" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#tour-lumiere)" />
          {/* La girelle : des cercles en pointillé qui tournent. */}
          <ellipse cx="200" cy="222" rx="170" ry="36" fill="#6B6560" />
          <ellipse cx="200" cy="216" rx="170" ry="36" fill="#8E8780" />
          {[150, 112, 74].map((r, i) => (
            <ellipse
              key={r}
              cx="200"
              cy="216"
              rx={r}
              ry={r * 0.21}
              fill="none"
              stroke="#B9B1A8"
              strokeWidth="2"
              strokeDasharray={`${14 + i * 4} ${18 + i * 6}`}
              className={tourne ? styles.tourne : undefined}
            />
          ))}
          <path d={corps} fill="#B98A62" />
          <path d={corps} fill="url(#tour-lumiere)" opacity=".18" />
          <ellipse cx="200" cy={haut} rx={rx} ry={6 + 10 * ouvert} fill="#A27450" />
          <ellipse cx="200" cy={haut + 2 * ouvert} rx={Math.max(0, rx - 9) * ouvert} ry={(4 + 8 * ouvert) * ouvert} fill="#5C3A22" />
        </svg>
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#1F1813]/85 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">
          <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${tourne ? "bg-[#E5533D]" : "bg-[#F3EADF]"}`} />
          Tournage · {date}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          data-film="lecture"
          onClick={() => {
            if (t >= DUREE) setT(0);
            setLecture((l) => !l);
          }}
          aria-label={lecture ? "Mettre en pause" : "Lire la vidéo du tournage"}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)]"
        >
          {lecture ? (
            <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true"><rect x="4" y="3" width="4" height="14" rx="1" fill="currentColor" /><rect x="12" y="3" width="4" height="14" rx="1" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true"><path d="M5 3 L17 10 L5 17 Z" fill="currentColor" /></svg>
          )}
        </button>
        <input
          type="range"
          min={0}
          max={DUREE}
          step={0.1}
          value={t}
          data-film="avance"
          aria-label="Avancer dans la vidéo du tournage"
          onChange={(e) => {
            setLecture(false);
            setT(Number(e.target.value));
            setGlisse(true);
            if (minuteur.current) clearTimeout(minuteur.current);
            minuteur.current = setTimeout(() => setGlisse(false), 400);
          }}
          className="h-2 min-w-0 flex-1 cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--accent)]"
          style={{ background: `linear-gradient(90deg, var(--accent) ${p * 100}%, var(--trait) ${p * 100}%)` }}
        />
        <span className="shrink-0 text-sm font-semibold tabular-nums">{temps(t)} / 0:20</span>
      </div>
      <figcaption className="text-sm opacity-90">{legende}</figcaption>
    </figure>
  );
}
