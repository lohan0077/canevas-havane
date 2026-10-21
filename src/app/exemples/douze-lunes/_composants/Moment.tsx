"use client";

import { createContext, useContext, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { DOSSIER, SOIR, estOuvert, reouverture } from "./donnees";

export type LeMoment = "jour" | "soir";

type Contexte = {
  moment: LeMoment;
  /** L'heure du visiteur : `null` tant que la page n'est pas chez lui. */
  ouvert: boolean | null;
  /** Si le cabinet est fermé : quand il rouvre (« lundi à 8 h 30 »). */
  rouvre: string | null;
  /** Le visiteur a choisi lui-même d'afficher l'autre visage du site. */
  apercu: boolean;
  basculer: () => void;
};

const MomentContexte = createContext<Contexte>({ moment: "jour", ouvert: null, rouvre: null, apercu: false, basculer: () => {} });
export const useMoment = () => useContext(MomentContexte);

// L'heure se lit chez le visiteur : la page est pré-rendue, une heure prise à la
// compilation serait fausse. Une chaîne, pour que useSyncExternalStore compare des valeurs.
// Relue à chaque minute pile : à 19 h, le site bascule à 19 h.
const abonner = (prevenir: () => void) => {
  let minuteur = 0;
  const prochaine = () => {
    minuteur = window.setTimeout(() => {
      prevenir();
      prochaine();
    }, 60_000 - (Date.now() % 60_000) + 50);
  };
  prochaine();
  return () => window.clearTimeout(minuteur);
};
const lireHeure = () => {
  const maintenant = new Date();
  return estOuvert(maintenant) ? "ouvert" : `ferme|${reouverture(maintenant)}`;
};

/**
 * Le visage du site : de jour quand le cabinet est ouvert, du soir quand il est fermé
 * (le soir, la nuit, le dimanche). Un interrupteur dans l'en-tête permet de voir l'autre.
 * La page de garde est toujours du soir.
 */
export default function Moment({ children }: { children: React.ReactNode }) {
  const chemin = usePathname();
  const heure = useSyncExternalStore(abonner, lireHeure, () => null);
  const [choix, setChoix] = useState<LeMoment | null>(null);
  const ouvert = heure === null ? null : heure === "ouvert";
  const rouvre = heure?.startsWith("ferme|") ? heure.slice(6) : null;
  const automatique: LeMoment = ouvert === false ? "soir" : "jour";
  const garde = chemin.startsWith(`${DOSSIER}/garde`);
  const moment: LeMoment = garde ? "soir" : (choix ?? automatique);
  const apercu = !garde && choix !== null && choix !== automatique;

  return (
    <MomentContexte.Provider
      value={{ moment, ouvert, rouvre, apercu, basculer: () => setChoix(moment === "jour" ? "soir" : "jour") }}
    >
      <div
        data-moment={moment}
        style={moment === "soir" ? SOIR : undefined}
        className="bg-[var(--fond)] text-[var(--encre)] transition-colors duration-500"
      >
        {children}
      </div>
    </MomentContexte.Provider>
  );
}
