"use client";

import { useSyncExternalStore } from "react";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
      <div className="mx-auto w-56 rotate-[-3deg] rounded-[26px] overflow-hidden bg-white shadow-[0_24px_50px_-24px_rgba(15,52,66,0.55)] text-center">
        <div className="bg-[#C4471D] text-white text-lg font-extrabold uppercase tracking-[0.2em] py-3">Juillet {annee}</div>
        <div className="py-5">
          <p className="text-[96px] leading-none font-extrabold text-[#0F3442] tabular-nums">{jour}</p>
          <p className="font-[family-name:var(--pp-titres)] italic text-3xl text-[#0F3442]">dimanche</p>
        </div>
      </div>
      <div className="text-center sm:text-left space-y-2">
        <p className="text-6xl font-extrabold tabular-nums text-[#0F3442]">J-{restants}</p>
        <p className="text-lg text-[#4A6470]">avant le premier dimanche de juillet.</p>
      </div>
    </div>
  );
}
