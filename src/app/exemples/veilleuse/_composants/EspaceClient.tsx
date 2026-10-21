"use client";

import { useState } from "react";
import MentionCnaps from "./MentionCnaps";
import { NUITS } from "./donnees";

/**
 * L'espace client d'exemple : qui vient ce soir, son prénom, ses horaires, et les
 * références de sa carte professionnelle — que la loi permet au client de demander
 * (CSI, art. L612-15, al. 3), données ici avant qu'il demande. Une consigne pour la
 * nuit peut s'écrire ; rien n'est envoyé, la démonstration le dit.
 */
export default function EspaceClient() {
  const [nuit, setNuit] = useState(0);
  const [carte, setCarte] = useState(false);
  const [consigne, setConsigne] = useState("");
  const [notee, setNotee] = useState(false);
  const n = NUITS[nuit];

  return (
    <div data-film="ce-soir" className="rounded-[30px] bg-[var(--fond)] text-[var(--encre)] p-5 sm:p-7 space-y-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Ton espace client</p>
        <p className="text-xs font-semibold text-[var(--doux)]">Maison · exemple</p>
      </div>

      <div role="tablist" aria-label="Les nuits de la semaine" className="grid grid-cols-3 gap-1.5 rounded-full bg-[#E9DFCB] p-1.5">
        {NUITS.map((x, i) => (
          <button
            key={x.jour}
            type="button"
            role="tab"
            aria-selected={nuit === i}
            onClick={() => {
              setNuit(i);
              setCarte(false);
              setNotee(false);
            }}
            className={`rounded-full px-2 py-2.5 text-sm font-bold transition-colors ${nuit === i ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "text-[var(--encre)]"}`}
          >
            {x.jour}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="space-y-4">
        <h3 className="text-[34px] leading-[1.05] font-normal">
          {n.jour === "Ce soir" ? "Ce soir, chez toi" : `${n.jour}, chez toi`}
        </h3>
        <div className="flex items-center gap-4 rounded-[22px] bg-[var(--carte)] border border-[var(--trait)] p-4">
          <span aria-hidden="true" className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[var(--sombre)] font-[family-name:var(--titres)] text-3xl text-[var(--accent)]">
            {n.initiale}
          </span>
          <div className="min-w-0">
            <p className="font-[family-name:var(--titres)] text-[28px] leading-none" data-prenom>{n.prenom}</p>
            <p className="mt-1.5 text-sm text-[var(--doux)]">Agent de sécurité · {n.date}, {n.horaires} · {n.passages}</p>
          </div>
        </div>

        {carte ? (
          <div role="status" className="rounded-[22px] border-2 border-[var(--accent)] bg-[var(--carte)] p-4 space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Carte professionnelle de {n.prenom}</p>
            <p className="text-[13px] sm:text-[15px] font-bold tracking-tight whitespace-nowrap">n°&nbsp;{n.carte}</p>
            <p className="text-sm text-[var(--doux)]">Numéro d&apos;exemple. ✓ Références transmises avant la nuit, sans que tu aies à les demander.</p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setCarte(true)}
            className="w-full rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-4 font-bold"
          >
            Voir les références de sa carte
          </button>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (consigne.trim()) setNotee(true);
          }}
          className="space-y-2"
        >
          <label htmlFor="vl-consigne" className="text-sm font-bold">Une consigne pour {n.jour === "Ce soir" ? "ce soir" : n.jour.toLowerCase()} ?</label>
          <div className="flex gap-2">
            <input
              id="vl-consigne"
              type="text"
              autoComplete="off"
              value={consigne}
              onChange={(e) => {
                setConsigne(e.target.value);
                setNotee(false);
              }}
              placeholder="Le portail du fond reste ouvert…"
              className="min-w-0 flex-1 rounded-full border-2 border-[var(--trait)] bg-[var(--carte)] px-4 py-3 placeholder:text-[var(--doux)] focus:border-[var(--sombre)] outline-none"
            />
            <button type="submit" className="shrink-0 rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-4 font-bold">Noter</button>
          </div>
          {notee && (
            <p role="status" className="text-sm">
              <span className="font-bold">Consigne notée pour {n.prenom}.</span> Démonstration : rien n&apos;est envoyé.
            </p>
          )}
        </form>
      </div>

      <MentionCnaps className="border-t border-[var(--trait)] pt-4" />
    </div>
  );
}
