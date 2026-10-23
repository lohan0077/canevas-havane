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

/** Le compte à rebours : une page de calendrier, et les jours qui restent. */
export default function CompteARebours() {
  // Une chaîne plutôt qu'un objet : useSyncExternalStore compare les valeurs, et un
  // objet neuf à chaque lecture ferait boucler le rendu.
  const valeur = useSyncExternalStore(abonner, cible, () => null);
  const [annee, jour, restants] = valeur ? valeur.split("|") : ["…", "…", "…"];

  return (
    <div data-film="compte-a-rebours" className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-[minmax(0,14rem)_1fr]">
      <div className="overflow-hidden rounded-[2rem] bg-[var(--carte)] text-center text-[var(--encre)] shadow-[0_30px_60px_-40px_rgba(0,0,0,0.7)]">
        <p className="bg-[var(--accent)] py-3 font-[family-name:var(--titres)] text-base font-normal text-[var(--sur-accent)]">Juillet {annee}</p>
        <div className="space-y-1 py-6">
          <p className="font-[family-name:var(--titres)] text-[88px] font-normal leading-none tabular-nums">{jour}</p>
          <p className="font-[family-name:var(--titres)] text-base font-normal">Dimanche</p>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2 rounded-[2rem] border-2 border-white/20 p-6 sm:p-8">
        <p className="whitespace-nowrap font-[family-name:var(--titres)] text-[clamp(3.5rem,8vw,5.5rem)] font-normal leading-none tracking-[-0.03em] tabular-nums">
          J-{restants}
        </p>
        <p className="text-lg">avant le premier dimanche de juillet.</p>
      </div>
    </div>
  );
}
