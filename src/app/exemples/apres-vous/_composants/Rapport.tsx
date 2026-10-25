"use client";

import { useState } from "react";
import { SOIRS, entreprise, lignes, nb } from "./donnees";

/** Le papier du rapport : clair, comme un vrai document posé sur la nuit du site. */
export const PAPIER = "[--encre:#121C33] [--doux:#4B5568] [--carte:#FFFFFF] [--trait:#DDD6C6] [--fond:#F5F1E8] [--accent-texte:#7A4E06]";

/**
 * Le rapport de passage, tel que le client le reçoit chaque soir : l'heure d'arrivée et
 * de départ, ce qui a été fait, ce qu'on a remarqué en passant. Il dit ce qui a été fait,
 * jamais qui l'a fait (« l'équipe du soir · 2 agents »). Rapports d'exemple ; rien n'est
 * envoyé.
 */
export default function Rapport({ choixDuSoir = true }: { choixDuSoir?: boolean }) {
  const [soir, setSoir] = useState("mardi");
  const [ouverte, setOuverte] = useState<number | null>(null);
  const [remarque, setRemarque] = useState<number | null>(null);
  const [lu, setLu] = useState(false);
  const s = SOIRS.find((x) => x.id === soir) ?? SOIRS[1];
  const changer = (id: string) => {
    setSoir(id);
    setOuverte(null);
    setRemarque(null);
    setLu(false);
  };

  return (
    <div data-film="rapport" className="space-y-4">
      {choixDuSoir && (
        <div className="grid grid-cols-5 gap-1 rounded-[10px] border border-[var(--trait)] bg-[var(--carte)] p-1" role="group" aria-label="Le soir">
          {SOIRS.map((x) => (
            <button
              key={x.id}
              id={`soir-${x.id}`}
              type="button"
              aria-pressed={soir === x.id}
              onClick={() => changer(x.id)}
              className={`h-10 rounded-[7px] text-sm font-semibold transition-colors ${soir === x.id ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "text-[var(--encre)] hover:bg-[var(--sombre)]"}`}
            >
              {x.jour.slice(0, 3)}.
            </button>
          ))}
        </div>
      )}

      <article className={`${PAPIER} overflow-hidden rounded-[10px] bg-[var(--fond)] text-[var(--encre)] shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)]`}>
        <header className="flex items-start justify-between gap-3 border-b border-[var(--trait)] px-5 py-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--accent-texte)]">Rapport de passage · Après Vous</p>
            <h3 className="mt-1 font-[family-name:var(--titres)] text-[30px] leading-tight">
              {s.jour} soir, <span className="whitespace-nowrap italic">2e étage</span>
            </h3>
          </div>
          <p className="mt-1 shrink-0 rounded-full bg-[#121C33] px-3 py-1 text-xs font-bold tabular-nums text-[#F5F1E8]">{s.depart}</p>
        </header>
        <ul className="divide-y divide-[var(--trait)]">
          {lignes(s).map((l, i) => (
            <li key={l.titre}>
              <button
                type="button"
                id={`ligne-${i}`}
                aria-expanded={ouverte === i}
                onClick={() => setOuverte(ouverte === i ? null : i)}
                className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-[var(--carte)]"
              >
                <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#6FB7A8] text-sm font-black text-[#121C33]">✓</span>
                <span className="flex-1 text-[17px] font-semibold">{l.titre}</span>
                <span aria-hidden="true" className={`text-lg transition-transform ${ouverte === i ? "rotate-90" : ""}`}>›</span>
              </button>
              {ouverte === i && <p className="px-5 pb-4 pl-[60px] text-[15px] leading-relaxed text-[var(--doux)]">{l.detail}</p>}
            </li>
          ))}
        </ul>
        <p className="border-t border-[var(--trait)] px-5 py-3 text-sm font-semibold">{entreprise.equipe}</p>
      </article>

      <section id="remarques" aria-label="Remarqué en passant" className="space-y-3 rounded-[10px] border border-[var(--trait)] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--accent-texte)]">Remarqué en passant</p>
        {s.remarques.length === 0 ? (
          <p className="font-[family-name:var(--titres)] text-2xl">Rien à signaler ce soir.</p>
        ) : (
          s.remarques.map((r, i) => (
            <div key={r.titre} className={`${PAPIER} rounded-[8px] bg-[var(--carte)] text-[var(--encre)]`}>
              <button
                type="button"
                id={`remarque-${i}`}
                aria-expanded={remarque === i}
                onClick={() => setRemarque(remarque === i ? null : i)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E9B44C] font-black text-[#121C33]">!</span>
                <span className="flex-1">
                  <span className="block font-bold">{r.titre}</span>
                  <span className="block text-sm text-[var(--doux)]">{r.lieu} · {r.heure}</span>
                </span>
              </button>
              {remarque === i && <p className="px-4 pb-4 pl-[60px] text-[15px] leading-relaxed">{r.detail}</p>}
            </div>
          ))
        )}
        {s.remarques.length > 0 && (
          <p className="inline-block rotate-[-4deg] rounded-[4px] border-2 border-[var(--accent)] px-3 py-1 font-bold uppercase tracking-[0.1em] text-[var(--accent-texte)]">
            Signalé à {nb(s.depart)}
          </p>
        )}
      </section>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setLu(true)}
          disabled={lu}
          className="h-11 shrink-0 whitespace-nowrap rounded-[6px] border border-[var(--encre)]/40 px-4 text-sm font-semibold disabled:border-[var(--trait)]"
        >
          {lu ? "Lu ✓" : "Marquer comme lu"}
        </button>
        <p className="text-right text-xs text-[var(--doux)]">Rapport d&apos;exemple · rien n&apos;est envoyé</p>
      </div>
    </div>
  );
}
