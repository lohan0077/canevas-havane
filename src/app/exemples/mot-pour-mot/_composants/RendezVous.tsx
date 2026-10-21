"use client";

import { useState } from "react";
import Creneaux from "../../_kit/Creneaux";

const CRENEAUX = [
  { libelle: "Lundi", sous: "18 h" },
  { libelle: "Mardi", sous: "12 h 30", pris: true },
  { libelle: "Mercredi", sous: "9 h" },
  { libelle: "Jeudi", sous: "18 h" },
  { libelle: "Vendredi", sous: "17 h 30", pris: true },
  { libelle: "Samedi", sous: "10 h" },
];

/**
 * En bas de chaque page : le client choisit lui-même son rendez-vous, au cabinet ou en
 * visio. Personne ne l'appelle pour le lui proposer (C. consom. L223-1). Créneaux
 * d'exemple ; la confirmation dit que rien n'est envoyé (le kit s'en charge).
 */
export default function RendezVous() {
  const [lieu, setLieu] = useState<"au cabinet" | "en visio">("au cabinet");

  return (
    <div data-film="rendez-vous" className="space-y-6">
      <div role="group" aria-label="Où ?" className="inline-flex rounded-full border-2 border-[var(--encre)] p-1">
        {(["au cabinet", "en visio"] as const).map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={lieu === l}
            onClick={() => setLieu(l)}
            className={`min-h-11 rounded-full px-5 text-[15px] font-semibold first-letter:uppercase ${lieu === l ? "bg-[var(--encre)] text-[var(--fond)]" : ""}`}
          >
            {l}
          </button>
        ))}
      </div>
      <Creneaux
        key={lieu}
        creneaux={CRENEAUX}
        colonnes={3}
        titreCarte={`Ton rendez-vous, ${lieu}`}
        bouton="Réserver ce créneau"
        confirmation={`Rendez-vous confirmé, ${lieu} : {creneau}`}
        note="Créneaux d'exemple, pour la semaine prochaine. Une heure, sans engagement. Personne ne t'appelle avant : c'est toi qui choisis."
      />
    </div>
  );
}
