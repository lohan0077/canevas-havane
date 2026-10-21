"use client";

import { useState } from "react";
import Piece from "./Piece";
import styles from "./animations.module.css";
import { pieces } from "./donnees";

/**
 * Le four de l'atelier, dessiné : la porte s'ouvre sur la fournée, deux soles de
 * pièces dans la lueur. C'est le rendez-vous du mois, en direct ; ici, on l'ouvre
 * d'un doigt.
 */
export default function Four() {
  const [ouvert, setOuvert] = useState(false);
  const soles = [pieces.slice(0, 4), pieces.slice(4, 8)];

  return (
    <div className="space-y-5" data-film="four">
      <div className="relative mx-auto max-w-md [perspective:1400px]">
        <div className="relative rounded-[22px] bg-[#3A332F] p-4 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
          <div className="relative overflow-hidden rounded-[14px] bg-[#1A0F0A] px-3 py-4 space-y-3">
            <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,#F2A24A_0%,#C2521F_45%,#1A0F0A_80%)] transition-opacity duration-700 ${ouvert ? `opacity-100 ${styles.lueur}` : "opacity-30"}`} />
            {soles.map((sole, i) => (
              <div key={i} className="relative">
                <div className="flex items-end justify-around gap-1 px-1">
                  {sole.map((p) => (
                    <Piece key={p.slug} forme={p.forme} email={p.email} className="w-[22%]" />
                  ))}
                </div>
                <div className="h-2 rounded-full bg-[#5C4A3E]" />
              </div>
            ))}
          </div>
          <div
            className="absolute inset-4 origin-left rounded-[14px] bg-[linear-gradient(135deg,#5A514C,#3A332F)] border border-[#6E645D] transition-transform duration-[1100ms] ease-[cubic-bezier(.2,.8,.2,1)] flex flex-col items-center justify-center gap-3"
            style={{ transform: ouvert ? "rotateY(-104deg)" : "rotateY(0deg)" }}
            aria-hidden={ouvert}
          >
            <span className="h-24 w-3 rounded-full bg-[#211B18]" />
            <span className="rounded-full bg-[#211B18] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#F3EADF]">Cuisson terminée · 1 280 °C</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => setOuvert((o) => !o)}
          aria-pressed={ouvert}
          className="rounded-full bg-[var(--accent)] px-7 py-3.5 text-lg font-bold text-[var(--sur-accent)]"
        >
          {ouvert ? "Refermer le four" : "Ouvrir le four"}
        </button>
        <p className="text-center text-sm text-[var(--sur-sombre)]" aria-live="polite">
          {ouvert ? "Huit pièces, huit numéros. Ce soir, elles sont en ligne." : "Le four refroidit depuis deux jours. On l'ouvre devant toi."}
        </p>
      </div>
    </div>
  );
}
