"use client";

import { useEffect, useRef, useState } from "react";
import { DELAI_DU_MOIS, HISTORIQUE, MOIS_DU_CHIFFRE, heures } from "./donnees";
import anim from "./Mouvements.module.css";

/**
 * Le chiffre du mois, en grand : il se compte jusqu'à sa valeur quand il entre à
 * l'écran (une fois). Le texte lisible par tous porte la valeur exacte dès le départ.
 */
export function ChiffreDuMois() {
  const [affiche, setAffiche] = useState(DELAI_DU_MOIS);
  const boite = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const e = boite.current;
    if (!e || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let image = 0;
    const observateur = new IntersectionObserver(([entree]) => {
      if (!entree.isIntersecting) return;
      observateur.disconnect();
      const debut = performance.now();
      const pas = (t: number) => {
        const p = Math.min(1, (t - debut) / 1400);
        setAffiche(Math.round(DELAI_DU_MOIS * (1 - (1 - p) ** 3)));
        if (p < 1) image = requestAnimationFrame(pas);
      };
      image = requestAnimationFrame(pas);
    }, { threshold: 0.6 });
    observateur.observe(e);
    return () => {
      observateur.disconnect();
      cancelAnimationFrame(image);
    };
  }, []);

  return (
    <div data-film="chiffre-du-mois" className="border border-[var(--trait)] bg-[var(--carte)]">
      <p className="flex items-center justify-between gap-3 border-b border-[var(--trait)] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] sm:px-8">
        <span>Premier Billet</span>
        <span className="bg-[var(--accent)] px-2 py-0.5 text-[var(--sur-accent)]">Chiffre du mois</span>
      </p>
      <div className="px-5 py-7 sm:px-8">
        <p className="font-[family-name:var(--titres)] text-[22px] italic leading-snug">
          En {MOIS_DU_CHIFFRE}, nous vous avons répondu en moyenne en
        </p>
        <p ref={boite} aria-hidden="true" className="mt-2 font-[family-name:var(--titres)] text-[86px] font-semibold leading-none tabular-nums text-[var(--accent-texte)] sm:text-[132px]">
          {heures(affiche)}
        </p>
        <p className="sr-only">{heures(DELAI_DU_MOIS)}</p>
      </div>
      <p className="border-t border-[var(--trait)] px-5 py-3 text-[13px] text-[var(--doux)] sm:px-8">
        Mis à jour le 1er de chaque mois · exemple : le cabinet est fictif
      </p>
    </div>
  );
}

/** Six mois de délais de réponse. Toucher une barre donne son détail. */
export function Courbe() {
  const [choisi, setChoisi] = useState(HISTORIQUE.length - 1);
  const max = Math.max(...HISTORIQUE.map((h) => h.minutes));
  const m = HISTORIQUE[choisi];
  return (
    <div data-film="courbe" className="border border-[var(--trait)] bg-[var(--carte)]">
      <p className="flex items-center justify-between gap-3 border-b border-[var(--trait)] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] sm:px-8">
        <span>Délai moyen de réponse</span>
        <span className="text-[var(--doux)]">exemple</span>
      </p>
      <div className="grid h-[230px] grid-cols-6 items-end gap-2 px-4 pt-6 sm:gap-4 sm:px-8">
        {HISTORIQUE.map((h, i) => (
          <button
            key={h.mois}
            type="button"
            data-film={`mois-${i}`}
            aria-pressed={choisi === i}
            aria-label={`${h.mois} : ${heures(h.minutes)}`}
            onClick={() => setChoisi(i)}
            className="flex h-full flex-col items-center justify-end gap-1.5"
          >
            <span className={`text-[12px] font-semibold tabular-nums ${choisi === i ? "" : "text-[var(--doux)]"}`}>{heures(h.minutes)}</span>
            <span
              className={`${anim.monte} block w-full ${choisi === i ? "bg-[var(--accent)] outline outline-2 outline-[var(--encre)]" : "bg-[var(--encre)]"}`}
              style={{ height: `${(h.minutes / max) * 150}px`, animationDelay: `${i * 70}ms` }}
            />
          </button>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-2 px-4 pb-4 pt-2 text-center text-[13px] sm:gap-4 sm:px-8" aria-hidden="true">
        {HISTORIQUE.map((h) => <span key={h.mois}>{h.mois}</span>)}
      </div>
      <div role="status" className="min-h-[96px] border-t border-[var(--trait)] px-5 py-4 sm:px-8">
        <p className="font-semibold">
          <span className="capitalize">{m.mois}</span> : {heures(m.minutes)} en moyenne, sur {m.messages} messages.
        </p>
        <p className="mt-1 text-[15px] text-[var(--doux)]">{m.note || "Touchez un mois pour voir son détail."}</p>
      </div>
    </div>
  );
}
