"use client";

import { useState } from "react";

/**
 * Le bouton d'achat d'une pièce unique. Il ne commande rien : la démonstration le
 * dit. Une pièce déjà partie n'a pas de bouton — elle ne reviendra pas.
 */
export default function Acheter({ nom, bouton, prix, partie, envoi }: { nom: string; bouton: string; prix: string; partie: boolean; envoi: string }) {
  const [achete, setAchete] = useState(false);

  if (partie) {
    return (
      <div className="rounded-[24px] border-2 border-[var(--encre)] p-5 space-y-1">
        <p className="text-lg font-bold">Partie.</p>
        <p className="text-[var(--doux)]">Quelqu&apos;un l&apos;a vue naître avant toi. Elle ne reviendra pas : c&apos;était la seule.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-film="achat">
      {achete ? (
        <div role="status" className="rounded-[24px] border-2 border-[var(--accent)] bg-[var(--carte)] p-5 space-y-2">
          <p className="text-xl font-bold">Commande reçue : {nom.toLowerCase()}</p>
          <p>Ce numéro n&apos;existait qu&apos;une fois. Sa page dit maintenant « Partie ».</p>
          <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est payé.</p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAchete(true)}
          className="flex w-full items-center justify-between gap-4 rounded-full bg-[var(--accent)] px-7 py-4 text-lg font-bold text-[var(--sur-accent)] transition-colors hover:bg-[var(--accent-texte)]"
        >
          <span>{bouton}</span>
          <span className="tabular-nums">{prix}</span>
        </button>
      )}
      <p className="text-sm text-[var(--doux)]">Prix TTC, exemple. Envoi : {envoi}.</p>
    </div>
  );
}
