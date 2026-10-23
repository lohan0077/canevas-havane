"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Estimation from "./Estimation";
import { DOSSIER, agence } from "./donnees";

/**
 * Le seul bouton de l'accueil : « Faire estimer ma maison ». Il ouvre, sur place, une
 * feuille où le vendeur choisit son créneau — sans changer de page.
 */
export default function BoutonEstimer() {
  const [ouvert, setOuvert] = useState(false);
  const titre = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ouvert) return;
    titre.current?.focus();
    const fermer = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", fermer);
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fermer);
      document.body.style.overflow = avant;
    };
  }, [ouvert]);

  return (
    <>
      <button
        type="button"
        data-film="estimer"
        aria-haspopup="dialog"
        onClick={() => setOuvert(true)}
        className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-[var(--accent)] px-8 text-[18px] font-semibold text-[var(--sur-accent)] shadow-[0_16px_40px_rgba(233,162,59,0.3)]"
      >
        Faire estimer ma maison
        <span aria-hidden="true">→</span>
      </button>
      {ouvert && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <button type="button" aria-label="Fermer" onClick={() => setOuvert(false)} className="absolute inset-0 bg-[#0B0D1E]/60 backdrop-blur-[2px]" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lsm-feuille-titre"
            data-film="feuille"
            className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-t-[30px] bg-[var(--fond)] px-5 pb-8 pt-4 text-[var(--encre)] shadow-2xl sm:rounded-[30px] sm:px-8"
          >
            <span aria-hidden="true" className="mx-auto mb-4 block h-1.5 w-12 rounded-full bg-[var(--trait)] sm:hidden" />
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2 id="lsm-feuille-titre" ref={titre} tabIndex={-1} className="text-[38px] leading-none outline-none">
                  Faire estimer <span className="italic">ma maison</span>
                </h2>
                <p className="text-[13px] text-[var(--doux)]">
                  Carte pro n°&nbsp;{agence.carte.replace(/ /g, " ")}, délivrée par la {agence.cci} (exemple)
                </p>
              </div>
              <button type="button" onClick={() => setOuvert(false)} className="h-11 shrink-0 rounded-full border border-[var(--trait)] px-4 text-[14px] font-semibold">
                Fermer
              </button>
            </div>
            <Estimation compacte />
            <p className="mt-5 text-[15px]">
              <Link href={`${DOSSIER}/estimation`} className="font-semibold underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">
                Comment se passe une estimation
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
