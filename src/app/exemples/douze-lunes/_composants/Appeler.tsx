"use client";

import { useState } from "react";

/**
 * Le bouton « Appeler ». Sur un vrai site, un lien `tel:` ; ici, le numéro est pris dans
 * la tranche que l'ARCEP réserve à la fiction : le bouton l'affiche et dit qu'il ne
 * sonne chez personne, plutôt que d'ouvrir le téléphone.
 */
export default function Appeler({ numero, libelle = "Appeler" }: { numero: string; libelle?: string }) {
  const [montre, setMontre] = useState(false);
  return (
    <div className="space-y-3">
      <button
        type="button"
        data-film="appeler"
        onClick={() => setMontre(true)}
        className="flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-full bg-[var(--accent)] px-5 font-bold text-[var(--sur-accent)]"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path fill="currentColor" d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
        </svg>
        {libelle}
      </button>
      {montre && (
        <div role="status" className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--fond)] p-4 space-y-1">
          <p className="text-2xl font-bold tabular-nums">{numero}</p>
          <p className="text-sm text-[var(--doux)]">
            Démonstration : ce numéro appartient à la tranche réservée à la fiction, il ne sonne chez personne.
          </p>
        </div>
      )}
    </div>
  );
}
