"use client";

import { useEffect, useState } from "react";
import s from "./Relue.module.css";
import { LETTRE } from "./donnees";

/**
 * La lettre de la semaine, lue à voix haute : un lecteur, et les lignes qui
 * s'éclairent au fil de la lecture. Sur ce site de démonstration, il n'y a pas de
 * son — le lecteur montre le geste, rien n'est chargé ni envoyé.
 */
export default function Lecture() {
  const [lecture, setLecture] = useState(false);
  const [t, setT] = useState(0); // dixièmes de seconde écoulés
  const fin = LETTRE.duree * 10;

  useEffect(() => {
    if (!lecture) return;
    const id = setInterval(() => {
      setT((x) => {
        if (x + 1 >= fin) {
          setLecture(false);
          return fin;
        }
        return x + 1;
      });
    }, 100);
    return () => clearInterval(id);
  }, [lecture, fin]);

  const lignes = [...LETTRE.lignes, `${LETTRE.signature} — ${LETTRE.lieu}`];
  const allumees = Math.ceil((t / fin) * lignes.length);
  const secondes = (n: number) => `0:${String(Math.floor(n / 10)).padStart(2, "0")}`;

  return (
    <div className="space-y-6" data-film="lecture">
      <div className="rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] pl-2 pr-5 py-2 flex items-center gap-4">
        <button
          type="button"
          data-film="lire"
          aria-label={lecture ? "Mettre en pause" : t >= fin ? "Réécouter la lettre" : "Écouter la lettre"}
          onClick={() => {
            if (t >= fin) setT(0);
            setLecture((l) => !l);
          }}
          className="grid place-items-center shrink-0 w-12 h-12 rounded-full bg-[#E9B44C] text-[var(--sombre)]"
        >
          {lecture ? (
            <svg viewBox="0 0 20 20" className="w-5 h-5" aria-hidden="true"><rect x="4" y="3" width="4" height="14" fill="currentColor" /><rect x="12" y="3" width="4" height="14" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 20 20" className="w-5 h-5" aria-hidden="true"><path d="M5 3 L17 10 L5 17 Z" fill="currentColor" /></svg>
          )}
        </button>
        <div className="flex-1 flex items-center gap-[3px] h-10" aria-hidden="true">
          {Array.from({ length: 26 }, (_, i) => (
            <i
              key={i}
              className={`${lecture ? s.barre : ""} block flex-1 rounded-full ${i / 26 <= t / fin ? "bg-[#E9B44C]" : "bg-[var(--sur-sombre)]/40"}`}
              style={{ height: `${30 + ((i * 37) % 70)}%` }}
            />
          ))}
        </div>
        <span className="text-sm tabular-nums shrink-0">{secondes(t)} / {secondes(fin)}</span>
      </div>

      <figure className="rounded-[6px] bg-[var(--carte)] border border-[var(--trait)] shadow-[0_18px_40px_-18px_rgba(30,43,74,0.35)] px-6 py-7">
        <blockquote className="space-y-1.5">
          {lignes.map((l, i) => (
            <p
              key={l}
              className={`font-[family-name:var(--titres)] italic transition-colors duration-300 ${i === lignes.length - 1 ? "pt-3 text-lg not-italic" : "text-xl sm:text-2xl leading-snug"} ${
                t > 0 && i < allumees ? "text-[var(--encre)]" : t > 0 ? "text-[var(--doux)]" : "text-[var(--encre)]"
              } ${lecture && i === allumees - 1 ? "bg-[#F4E7CC] -mx-2 px-2 rounded-[4px]" : ""}`}
            >
              {l}
            </p>
          ))}
        </blockquote>
        <figcaption className="mt-5 text-sm text-[var(--doux)]">Lettre inventée pour l&apos;exemple.</figcaption>
      </figure>

      <p data-film="accord" className="inline-flex -rotate-2 rounded-[6px] border-2 border-[var(--accent-texte)] px-4 py-2 text-[var(--accent-texte)] text-sm font-bold uppercase tracking-[0.14em]">
        Lue avec l&apos;accord de son auteur
      </p>
    </div>
  );
}
