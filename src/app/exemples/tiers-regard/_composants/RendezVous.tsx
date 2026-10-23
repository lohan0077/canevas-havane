"use client";

import { useState } from "react";
import { Certification } from "./Blocs";
import { CRENEAUX } from "./donnees";

/**
 * Le rendez-vous en ligne (vidéo « Remplir l'agenda ») : le propriétaire choisit son jour
 * et son heure, et la certification de celle qui viendra reste en vue jusqu'à la
 * confirmation. Créneaux d'exemple ; rien n'est envoyé.
 */
export default function RendezVous() {
  const [choix, setChoix] = useState<{ jour: string; h: string } | null>(null);
  const [fait, setFait] = useState(false);
  const jour = CRENEAUX.find((j) => j.id === choix?.jour);
  const libelle = choix && jour ? `${jour.libelle.toLowerCase()} ${jour.date}, ${choix.h}` : "";

  return (
    <div className="space-y-3" data-film="creneaux">
      {CRENEAUX.map((j) => (
        <div key={j.id} className="rounded-[1.25rem] border border-[var(--trait)] bg-[var(--carte)] p-4 sm:p-5">
          <p className="mb-3 flex items-baseline justify-between">
            <span className="font-[family-name:var(--titres)] text-[22px] font-semibold tracking-[-0.03em]">{j.libelle}</span>
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
                  className={`min-h-[52px] rounded-[10px] text-[16px] font-semibold transition-all duration-300 ${
                    h.pris ? "bg-[var(--fond)] text-[var(--doux)] line-through decoration-1" : actif ? "scale-[1.04] bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--trait)] bg-[var(--fond)] hover:border-[var(--doux)]"
                  }`}
                >
                  {h.h}
                  <span className="sr-only">{h.pris ? " (pris)" : " (libre)"}</span>
                </button>
              );
            })}
          </div>
          {choix?.jour === j.id && (
            <div className="mt-4 space-y-4 rounded-[12px] bg-[#F3F2EC] p-4 text-[#111827]" data-film="confirmation">
              {fait ? (
                <div role="status" className="space-y-1">
                  <p className="font-[family-name:var(--titres)] text-[22px] font-semibold leading-tight tracking-[-0.03em]">Diagnostic : {libelle}</p>
                  <p className="text-[14px] text-[#4B5563]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
                </div>
              ) : (
                <p className="text-[16px]">Ton créneau : <b>{libelle}</b>. Le rapport, sous 48 h (exemple).</p>
              )}
              <Certification compacte />
              {!fait && (
                <button type="button" onClick={() => setFait(true)} className="min-h-12 w-full rounded-[10px] bg-[#111827] text-[14px] font-semibold uppercase tracking-[0.14em] text-[#F5D90A]">
                  Réserver ce diagnostic
                </button>
              )}
            </div>
          )}
        </div>
      ))}
      <p className="text-[13px] text-[var(--doux)]">Créneaux d&apos;exemple : sur un vrai site, ils suivent l&apos;agenda réel de la diagnostiqueuse.</p>
    </div>
  );
}
