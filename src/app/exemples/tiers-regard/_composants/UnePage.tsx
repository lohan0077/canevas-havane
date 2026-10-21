"use client";

import { useState } from "react";
import { RAPPORT, type Ligne } from "./donnees";

const LETTRES = ["A", "B", "C", "D", "E", "F", "G"];
const COULEURS: Record<string, [string, string]> = {
  A: ["#009C6D", "#111111"], B: ["#52B153", "#111111"], C: ["#78BD76", "#111111"], D: ["#F4E70F", "#111111"],
  E: ["#F0B50F", "#111111"], F: ["#EB8235", "#111111"], G: ["#D7221F", "#FFFFFF"],
};

/**
 * Le rapport traduit en une seule page : la lettre du DPE, ce qui va, ce qui cloche.
 * Chaque ligne s'ouvre ; un interrupteur montre la phrase du rapport mot pour mot, ou
 * sa traduction en clair. Exemple : aucun logement réel, aucune entreprise recommandée.
 */
export default function UnePage() {
  const [clair, setClair] = useState(true);
  const [ouvertes, setOuvertes] = useState<string[]>(["amiante"]);
  const basculer = (id: string) => setOuvertes((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  const bloc = (genre: "va" | "cloche", lignes: Ligne[]) => {
    const va = genre === "va";
    return (
      <section data-film={`bloc-${genre}`} aria-labelledby={`tr-${genre}`} className="overflow-hidden rounded-[10px] border border-[var(--trait)] bg-[var(--carte)]">
        <h2 id={`tr-${genre}`} className={`flex items-center gap-2.5 border-b border-[var(--trait)] px-5 py-3.5 text-[13px] font-medium uppercase tracking-[0.18em] ${va ? "text-[#5CCB7F]" : "text-[#FF8A5C]"}`}>
          <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${va ? "bg-[#5CCB7F]" : "bg-[#FF8A5C]"}`} />
          {va ? "Ce qui va" : "Ce qui cloche"}
        </h2>
        <ul className="divide-y divide-[var(--trait)]">
          {lignes.map((l) => {
            const ouverte = ouvertes.includes(l.id);
            return (
              <li key={l.id}>
                <button
                  type="button"
                  data-film={`ligne-${l.id}`}
                  aria-expanded={ouverte}
                  onClick={() => basculer(l.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-[family-name:var(--titres)] text-[21px] font-semibold leading-tight tracking-[-0.01em]">{l.titre}</span>
                  <span aria-hidden="true" className={`grid h-7 w-7 shrink-0 place-items-center rounded-[4px] border border-[var(--trait)] text-[16px] transition-transform ${ouverte ? "rotate-45" : ""}`}>+</span>
                </button>
                {ouverte && (
                  <div className="px-5 pb-5">
                    {clair ? (
                      <p className="text-[16px] leading-relaxed">{l.clair}</p>
                    ) : (
                      <p className="border-l-2 border-[var(--trait)] pl-4 text-[15px] leading-relaxed text-[var(--doux)]">«&nbsp;{l.rapport}&nbsp;»</p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    );
  };

  return (
    <div className="space-y-4">
      <div data-film="entete-rapport" className="rounded-[10px] border border-[var(--trait)] bg-[var(--carte)] p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--doux)]">Ton rapport · exemple</p>
            <p className="font-[family-name:var(--titres)] text-[26px] font-semibold leading-tight tracking-[-0.02em]">Ta maison, en une page</p>
            <p className="text-[14px] text-[var(--doux)]">{RAPPORT.bien}</p>
          </div>
          <p className="shrink-0 text-center">
            <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--doux)]">DPE</span>
            <span className="mt-1 grid h-14 w-14 place-items-center rounded-[8px] font-[family-name:var(--titres)] text-[34px] font-bold" style={{ background: COULEURS[RAPPORT.lettre][0], color: COULEURS[RAPPORT.lettre][1] }}>
              {RAPPORT.lettre}
            </span>
          </p>
        </div>
        <div aria-hidden="true" className="mt-4 flex items-end gap-1">
          {LETTRES.map((l, i) => (
            <span
              key={l}
              className={`flex-1 rounded-t-[3px] text-center text-[11px] font-bold leading-[18px] ${l === RAPPORT.lettre ? "outline outline-2 outline-offset-2 outline-[#F3F4F6]" : "opacity-40"}`}
              style={{ background: COULEURS[l][0], color: COULEURS[l][1], height: `${18 + i * 3}px` }}
            >
              {l}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[13px] text-[var(--doux)]">Classe énergie {RAPPORT.lettre} · classe climat {RAPPORT.climat} (exemple).</p>
      </div>

      <div role="group" aria-label="Comment lire la page" className="grid grid-cols-2 gap-1 rounded-[8px] border border-[var(--trait)] p-1">
        {[
          { v: true, l: "En clair" },
          { v: false, l: "Mot pour mot" },
        ].map((o) => (
          <button
            key={o.l}
            type="button"
            data-film={o.v ? "en-clair" : "mot-pour-mot"}
            aria-pressed={clair === o.v}
            onClick={() => setClair(o.v)}
            className={`h-11 rounded-[6px] text-[13px] font-medium uppercase tracking-[0.14em] ${clair === o.v ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "text-[var(--encre)]"}`}
          >
            {o.l}
          </button>
        ))}
      </div>

      {bloc("va", RAPPORT.va)}
      {bloc("cloche", RAPPORT.cloche)}

      <p className="rounded-[10px] border border-dashed border-[var(--trait)] px-5 py-4 text-[15px] leading-relaxed">
        Le rapport complet reste joint, page par page : c&apos;est lui qui fait foi.{" "}
        <span className="text-[var(--doux)]">Aucune entreprise de travaux n&apos;est recommandée, ni ici, ni dans le rapport.</span>
      </p>
    </div>
  );
}
