"use client";

import { useState } from "react";
import { SOIRS, entreprise, lignes } from "./donnees";

/**
 * Le rapport de passage, tel que le client le reçoit chaque soir : l'heure d'arrivée et
 * de départ, ce qui a été fait, ce qu'on a remarqué en passant. Il dit ce qui a été fait,
 * jamais qui l'a fait (« équipe du soir · 2 agents »). Rapports d'exemple ; rien n'est
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
        <div className="grid grid-cols-5 gap-1 rounded-2xl bg-[var(--carte)] p-1" role="group" aria-label="Le soir">
          {SOIRS.map((x) => (
            <button
              key={x.id}
              id={`soir-${x.id}`}
              type="button"
              aria-pressed={soir === x.id}
              onClick={() => changer(x.id)}
              className={`h-10 rounded-xl text-sm font-semibold ${soir === x.id ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : ""}`}
            >
              {x.jour.slice(0, 3)}.
            </button>
          ))}
        </div>
      )}

      <article className="rounded-[26px] border-2 border-[var(--encre)] bg-[var(--fond)] overflow-hidden">
        <header className="flex items-start justify-between gap-3 border-b-2 border-[var(--encre)] px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Rapport de passage</p>
            <h3 className="mt-1 text-2xl font-bold leading-tight">{s.jour} soir, <span className="whitespace-nowrap">2e étage</span></h3>
          </div>
          <p className="shrink-0 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-[var(--sur-accent)] tabular-nums">{s.depart}</p>
        </header>
        <ul className="divide-y divide-[var(--trait)]">
          {lignes(s).map((l, i) => (
            <li key={l.titre}>
              <button
                type="button"
                id={`ligne-${i}`}
                aria-expanded={ouverte === i}
                onClick={() => setOuverte(ouverte === i ? null : i)}
                className="flex w-full items-center gap-3 px-5 py-3.5 text-left"
              >
                <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-sm font-black">✓</span>
                <span className="flex-1 text-[17px] font-semibold">{l.titre}</span>
                <span aria-hidden="true" className={`text-lg transition-transform ${ouverte === i ? "rotate-90" : ""}`}>›</span>
              </button>
              {ouverte === i && <p className="px-5 pb-4 pl-[60px] text-[15px] leading-relaxed text-[var(--doux)]">{l.detail}</p>}
            </li>
          ))}
        </ul>
        <p className="border-t border-[var(--trait)] px-5 py-3 text-sm font-semibold">{entreprise.equipe}</p>
      </article>

      <section id="remarques" aria-label="Remarqué en passant" className="rounded-[26px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-5 space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em]">Remarqué en passant</p>
        {s.remarques.length === 0 ? (
          <p className="text-lg font-semibold">Rien à signaler ce soir.</p>
        ) : (
          s.remarques.map((r, i) => (
            <div key={r.titre} className="rounded-2xl bg-[var(--carte)] text-[var(--encre)]">
              <button
                type="button"
                id={`remarque-${i}`}
                aria-expanded={remarque === i}
                onClick={() => setRemarque(remarque === i ? null : i)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#FFE36E] text-[var(--encre)] font-black">!</span>
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
          <p className="inline-block rotate-[-4deg] rounded-md border-2 border-[var(--accent)] px-3 py-1 font-black uppercase tracking-[0.08em] text-[var(--accent)]">
            Signalé à {s.depart}
          </p>
        )}
      </section>

      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={() => setLu(true)} disabled={lu} className="h-11 shrink-0 whitespace-nowrap rounded-full border-2 border-[var(--encre)] px-4 text-sm font-semibold disabled:border-[var(--trait)]">
          {lu ? "Lu ✓" : "Marquer comme lu"}
        </button>
        <p className="text-xs text-[var(--doux)] text-right">Rapport d'exemple · rien n'est envoyé</p>
      </div>
    </div>
  );
}
