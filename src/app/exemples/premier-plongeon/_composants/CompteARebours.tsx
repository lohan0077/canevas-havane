"use client";

import { useSyncExternalStore } from "react";
import { Plaque, styles as s } from "./Habillage";

const JOUR = 86_400_000;

/** Le premier dimanche de juillet de l'année donnée, à minuit UTC. */
function premierDimancheDeJuillet(annee: number) {
  const premierJuillet = new Date(Date.UTC(annee, 6, 1));
  return Date.UTC(annee, 6, 1 + ((7 - premierJuillet.getUTCDay()) % 7));
}

/**
 * Jours restants avant le prochain premier dimanche de juillet, compté chez le
 * visiteur : la page est pré-rendue, un nombre calculé à la compilation serait faux
 * dès le lendemain. Un vrai jour, une vraie date — rien qui presse d'acheter.
 */
function cible() {
  const maintenant = new Date();
  const aujourdHui = Date.UTC(maintenant.getFullYear(), maintenant.getMonth(), maintenant.getDate());
  let annee = maintenant.getFullYear();
  if (premierDimancheDeJuillet(annee) < aujourdHui) annee += 1;
  const date = premierDimancheDeJuillet(annee);
  return `${annee}|${new Date(date).getUTCDate()}|${Math.round((date - aujourdHui) / JOUR)}`;
}

const abonner = () => () => {};

export default function CompteARebours() {
  // Une chaîne plutôt qu'un objet : useSyncExternalStore compare les valeurs, et un
  // objet neuf à chaque lecture ferait boucler le rendu.
  const valeur = useSyncExternalStore(abonner, cible, () => null);
  const [annee, jour, restants] = valeur ? valeur.split("|") : ["…", "…", "…"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,15rem)_1fr] gap-6 items-stretch">
      <Plaque coupe={18}>
        <div className="text-center">
          <p className={`${s.technique} bg-[#e8d1cb] text-[#15131b] text-sm py-3`}>Juillet {annee}</p>
          <div className="py-6 space-y-1">
            <p className="text-[88px] leading-none font-bold text-white tabular-nums">{jour}</p>
            <p className={`${s.technique} text-sm text-[#b9c0cc]`}>Dimanche</p>
          </div>
        </div>
      </Plaque>
      <Plaque coupe={18}>
        <div className="h-full p-6 sm:p-8 flex flex-col justify-center gap-3">
          <p className={`${s.titre} text-[52px] lg:text-6xl tabular-nums whitespace-nowrap`}>J-{restants}</p>
          <p className="text-lg text-[#b9c0cc]">avant le premier dimanche de juillet.</p>
        </div>
      </Plaque>
    </div>
  );
}
