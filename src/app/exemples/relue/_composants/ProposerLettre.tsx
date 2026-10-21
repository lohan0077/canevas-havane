"use client";

import { useState } from "react";

/**
 * Proposer une lettre pour la lecture du dimanche : la case qui compte est celle de
 * l'auteur. Le papier appartient à qui l'a reçue ; le texte, à qui l'a écrit
 * (CPI, art. L121-2). Démonstration : rien n'est envoyé.
 */
export default function ProposerLettre() {
  const [auteur, setAuteur] = useState(false);
  const [noms, setNoms] = useState(false);
  const [envoye, setEnvoye] = useState(false);
  const pret = auteur && noms;

  return (
    <form
      className="rounded-[18px] border border-[var(--trait)] bg-[var(--carte)] p-6 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (pret) setEnvoye(true);
      }}
    >
      <label className="flex gap-3 items-start text-lg leading-snug">
        <input type="checkbox" checked={auteur} onChange={(e) => { setAuteur(e.target.checked); setEnvoye(false); }} className="mt-1.5 w-5 h-5 accent-[var(--accent)] shrink-0" />
        <span>J&apos;en suis l&apos;auteur — ou j&apos;ai l&apos;accord écrit de son auteur, ou de ses héritiers.</span>
      </label>
      <label className="flex gap-3 items-start text-lg leading-snug">
        <input type="checkbox" checked={noms} onChange={(e) => { setNoms(e.target.checked); setEnvoye(false); }} className="mt-1.5 w-5 h-5 accent-[var(--accent)] shrink-0" />
        <span>Les personnes nommées sont d&apos;accord, ou leurs prénoms seront changés.</span>
      </label>
      {envoye ? (
        <div role="status" className="rounded-[14px] border-2 border-[var(--accent)] bg-[var(--fond)] p-4 space-y-1">
          <p className="font-semibold">Merci. On te répond avant de lire quoi que ce soit.</p>
          <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        </div>
      ) : (
        <button type="submit" disabled={!pret} className="w-full min-h-12 rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 text-lg font-semibold disabled:cursor-not-allowed">
          Proposer ma lettre
        </button>
      )}
      <p className="text-sm text-[var(--doux)]">Sans ces deux cases, on ne lit pas : le papier t&apos;appartient, le texte reste à celui qui l&apos;a écrit.</p>
    </form>
  );
}
