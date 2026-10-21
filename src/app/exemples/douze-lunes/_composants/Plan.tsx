"use client";

import { useState } from "react";

/**
 * Un plan dessiné, pas une carte : aucune tuile chargée chez un tiers, aucune adresse
 * réelle. Le bouton trace le trajet jusqu'à la garde (ou jusqu'au cabinet).
 */
export default function Plan({ depart, arrivee, duree, bouton = "Itinéraire" }: { depart: string; arrivee: string; duree: string; bouton?: string }) {
  const [trace, setTrace] = useState(false);
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[24px] border border-[var(--trait)] bg-[var(--carte)]">
        <svg viewBox="0 0 360 220" role="img" aria-label={`Plan schématique : de ${depart} à ${arrivee}`} className="block h-auto w-full">
          <g stroke="var(--trait)" strokeWidth="10" strokeLinecap="round" fill="none">
            <path d="M-10 60 H370" />
            <path d="M-10 150 C80 140 140 170 220 150 S330 120 370 130" />
            <path d="M70 -10 V230" />
            <path d="M190 -10 C185 60 200 120 195 230" />
            <path d="M300 -10 V230" />
          </g>
          <g stroke="var(--trait)" strokeWidth="3" fill="none" opacity="0.8">
            <path d="M-10 105 H370" />
            <path d="M130 -10 V230" />
            <path d="M245 -10 V230" />
          </g>
          <path
            d="M70 190 V150 C120 146 150 168 195 152 L192 60 H300 V40"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="520"
            strokeDashoffset={trace ? 0 : 520}
            style={{ transition: "stroke-dashoffset 1.4s ease-out" }}
          />
          <circle cx="70" cy="190" r="9" fill="var(--encre)" />
          <circle cx="70" cy="190" r="3.5" fill="var(--carte)" />
          <g transform="translate(300 40)">
            <path d="M0 0 C-10 -12 -12 -18 -12 -24 A12 12 0 0 1 12 -24 C12 -18 10 -12 0 0Z" fill="var(--accent)" />
            <circle cy="-24" r="4.5" fill="var(--sur-accent)" />
          </g>
        </svg>
        <p className="absolute left-[25%] top-[80%] rounded-full bg-[var(--fond)] px-3 py-1 text-xs font-bold">{depart}</p>
        <p className="absolute right-[22%] top-[7%] rounded-full bg-[var(--fond)] px-3 py-1 text-xs font-bold">{arrivee}</p>
      </div>
      <button
        type="button"
        data-film="itineraire"
        onClick={() => setTrace(true)}
        className="flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-full border-2 border-[var(--accent)] px-5 font-bold"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
        </svg>
        {bouton}
      </button>
      {trace && (
        <p role="status" className="text-[15px]">
          <span className="font-bold">{duree}.</span>{" "}
          <span className="text-[var(--doux)]">Plan schématique de démonstration : sur un vrai site, ce bouton ouvre le GPS du téléphone.</span>
        </p>
      )}
    </div>
  );
}
