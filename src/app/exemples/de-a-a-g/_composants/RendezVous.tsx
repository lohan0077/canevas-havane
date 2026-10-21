"use client";

import { useState } from "react";
import { Certification } from "./Blocs";
import { CRENEAUX } from "./donnees";

/**
 * Le rendez-vous en ligne : le propriétaire choisit son jour et son heure, et la
 * certification de celui qui viendra reste en vue jusqu'à la confirmation. Créneaux
 * d'exemple ; rien n'est envoyé.
 */
export default function RendezVous() {
  const [choix, setChoix] = useState<{ jour: string; h: string } | null>(null);
  const [fait, setFait] = useState(false);
  const jour = CRENEAUX.find((j) => j.id === choix?.jour);
  const libelle = choix && jour ? `${jour.libelle.toLowerCase()} ${jour.date}, ${choix.h}` : "";

  return (
    <div className="space-y-3" data-film="creneaux">
      {CRENEAUX.map((j) => (
        <div key={j.id} className="rounded-[24px] bg-[var(--carte)] p-4 ring-1 ring-[var(--trait)]">
          <p className="mb-3 flex items-baseline justify-between">
            <span className="font-[family-name:var(--titres)] text-[22px] font-bold tracking-[-0.02em]">{j.libelle}</span>
            <span className="text-[14px] text-[var(--doux)]">{j.date}</span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            {j.heures.map((h) => {
              const actif = choix?.jour === j.id && choix.h === h.h;
              return (
                <button
                  key={h.h}
                  type="button"
                  data-film={`rdv-${j.id}-${h.h.replace(/\s/g, "")}`}
                  disabled={h.pris || fait}
                  aria-pressed={actif}
                  onClick={() => setChoix({ jour: j.id, h: h.h })}
                  className={`min-h-[52px] rounded-[16px] text-[16px] font-semibold ${
                    h.pris ? "bg-[var(--fond)] text-[var(--doux)] line-through decoration-1" : actif ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[#E3F1E7] ring-1 ring-[var(--trait)]"
                  }`}
                >
                  {h.h}
                  <span className="sr-only">{h.pris ? " (pris)" : " (libre)"}</span>
                </button>
              );
            })}
          </div>
          {choix?.jour === j.id && (
            <div className="mt-4 space-y-4 rounded-[20px] bg-[#FBF4D6] p-4 ring-1 ring-[#E9D98F]" data-film="confirmation">
              {fait ? (
                <div role="status" className="space-y-1">
                  <p className="font-[family-name:var(--titres)] text-[24px] font-bold leading-tight tracking-[-0.02em]">Diagnostic : {libelle}</p>
                  <p className="text-[14px] text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
                </div>
              ) : (
                <p className="text-[16px]">Ton créneau : <b>{libelle}</b>. Le rapport, sous 48 h (exemple).</p>
              )}
              <Certification compacte />
              {!fait && (
                <button type="button" onClick={() => setFait(true)} className="h-12 w-full rounded-[14px] bg-[var(--accent)] text-[15px] font-semibold text-[var(--sur-accent)]">
                  Réserver ce diagnostic
                </button>
              )}
            </div>
          )}
        </div>
      ))}
      <p className="text-[13px] text-[var(--doux)]">Créneaux d&apos;exemple : sur un vrai site, ils suivent l&apos;agenda réel du diagnostiqueur.</p>
    </div>
  );
}
