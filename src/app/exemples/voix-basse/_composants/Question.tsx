"use client";

import { useState } from "react";
import Creneaux from "../../_kit/Creneaux";
import { CRENEAUX_CALMES, CRENEAUX_HABITUELS, NIVEAUX, type Niveau } from "./donnees";

/**
 * Avant de réserver, une seule question : ton animal est stressé ? « Un peu » ou
 * « Beaucoup » ouvre les créneaux calmes (avant l'ouverture, la salle d'attente est à
 * toi) ; « Pas du tout », les créneaux de la journée. Rien ne quitte le navigateur.
 */
export default function Question({ titre = "h2" }: { titre?: "h1" | "h2" }) {
  const [niveau, setNiveau] = useState<Niveau | null>(null);
  const calme = niveau === "un-peu" || niveau === "beaucoup";
  const Titre = titre;

  return (
    <div className="space-y-8">
      <div data-film="question" className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Avant de réserver, une seule question</p>
        <Titre className="text-[52px] sm:text-7xl">
          Ton animal est <em>stressé&nbsp;?</em>
        </Titre>
        <div role="radiogroup" aria-label="Ton animal est stressé ?" className="grid grid-cols-3 gap-2.5">
          {NIVEAUX.map((n) => (
            <button
              key={n.id}
              type="button"
              role="radio"
              aria-checked={niveau === n.id}
              data-film={`niveau-${n.id}`}
              onClick={() => setNiveau(n.id)}
              className={`min-h-[64px] rounded-2xl border-2 px-1 text-base font-semibold transition-colors ${
                niveau === n.id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"
              }`}
            >
              {n.libelle}
            </button>
          ))}
        </div>
      </div>

      {niveau && (
        <div data-film="creneaux" className="space-y-5" key={calme ? "calme" : "habituel"}>
          {calme ? (
            <div className="rounded-[24px] bg-[var(--accent)] p-5 text-[var(--sur-accent)] sm:p-6">
              <p className="text-xl font-semibold">✓ On te propose un créneau calme.</p>
              <p className="mt-1 leading-relaxed">
                Avant l&apos;ouverture, à 8 h ou 8 h 15 : la salle d&apos;attente est à toi. Même consultation, même prix.
              </p>
            </div>
          ) : (
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Tant mieux. Voici les créneaux de la semaine ; le créneau calme reste là si un jour il en a besoin.
            </p>
          )}
          <Creneaux
            creneaux={calme ? CRENEAUX_CALMES : CRENEAUX_HABITUELS}
            colonnes={3}
            titreCarte={calme ? "Ton créneau calme" : "Ton rendez-vous"}
            bouton={calme ? "Réserver ce créneau calme" : "Réserver ce créneau"}
            confirmation={calme ? "Créneau calme réservé : la salle d'attente sera à toi." : "Rendez-vous réservé : on t'attend."}
            note="Créneaux d'exemple. Sur un vrai site, ils suivent l'agenda réel du cabinet."
          />
        </div>
      )}
    </div>
  );
}
