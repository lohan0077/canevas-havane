"use client";

import { useState } from "react";
import { PLANNING, SAMEDIS, euros, machine, prixMachine, type IdMachine } from "./donnees";

type Choix = { machine: IdMachine; samedi: number };

const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/**
 * Les disponibilités, machine par machine, samedi par samedi — comme les chambres
 * d'un hôtel. On touche un samedi libre ; la barre du bas récapitule (machine, date,
 * prix TTC livré) et « Réserver » le bloque. Les cases « Pris » sont un exemple, et
 * rien n'est envoyé : la page le dit.
 */
export default function Planning() {
  const [choix, setChoix] = useState<Choix | null>(null);
  const [reserve, setReserve] = useState<Choix | null>(null);
  const [chauffeur, setChauffeur] = useState(false);

  const estReserve = (m: IdMachine, s: number) => reserve?.machine === m && reserve.samedi === s;
  const m = choix ? machine(choix.machine) : null;

  return (
    <div id="planning" className="relative">
      <div className="rounded-[18px] border border-[var(--encre)] bg-[var(--carte)]">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--encre)] px-4 py-3">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em]">Disponibilités · avril 2027</p>
          <p className="text-[12px] font-semibold text-[var(--doux)]">Les samedis</p>
        </div>
        <ul className="divide-y divide-[var(--trait)]">
          {PLANNING.map((ligne) => {
            const mach = machine(ligne.id);
            return (
              <li key={ligne.id} className="px-4 py-3.5 space-y-2.5">
                <p className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[19px] font-black uppercase tracking-[-0.01em]">{mach.court}</span>
                  <span className="whitespace-nowrap text-[13px] font-semibold tabular-nums text-[var(--doux)]">{euros(mach.jour)} TTC / jour · exemple</span>
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {SAMEDIS.map((s, i) => {
                    const pris = ligne.etats[i] === "pris";
                    const actif = choix?.machine === ligne.id && choix.samedi === i;
                    const fait = estReserve(ligne.id, i);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        data-film={`${ligne.id}-${s.id}`}
                        disabled={pris || fait}
                        aria-pressed={actif}
                        aria-label={`${mach.nom}, ${s.long} : ${pris ? "pris" : fait ? "réservé" : "libre"}`}
                        onClick={() => {
                          setChoix({ machine: ligne.id, samedi: i });
                          setReserve(null);
                        }}
                        className={`flex h-[60px] flex-col items-center justify-center rounded-[10px] border text-center transition-colors ${
                          fait
                            ? "border-[var(--encre)] bg-[var(--accent)] text-[var(--sur-accent)]"
                            : pris
                              ? "border-[var(--trait)] bg-[var(--fond)] text-[var(--doux)] cursor-not-allowed"
                              : actif
                                ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]"
                                : "border-[var(--encre)] bg-[var(--carte)]"
                        }`}
                      >
                        <span className="text-[13px] font-bold leading-tight">{s.court}</span>
                        <span className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.06em]">
                          {fait ? "Réservé ✓" : pris ? "Pris" : "Libre"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="border-t border-[var(--trait)] px-4 py-3 text-[13px] text-[var(--doux)]">
          Disponibilités d&apos;exemple : l&apos;entreprise est fictive. Sur un vrai site, elles bougent à chaque réservation.
        </p>
      </div>

      {/* Le récapitulatif, collé au bas de l'écran tant que la grille est en vue. */}
      <div className="sticky bottom-3 z-10 mt-4" aria-live="polite">
        {m && choix && (
          <div data-film="recap" className="rounded-[18px] border border-[var(--encre)] bg-[var(--encre)] p-4 text-[var(--fond)] shadow-[0_18px_40px_-18px_rgba(21,19,15,.7)] space-y-3">
            {reserve ? (
              <div role="status" className="space-y-1.5">
                <p className="font-[family-name:var(--titres)] text-[22px] font-black uppercase leading-tight text-[var(--accent)]">Réservé ✓</p>
                <p className="font-semibold">
                  {m.nom}, {SAMEDIS[reserve.samedi].long}
                  {chauffeur && m.chauffeur ? ", avec chauffeur" : ""}.
                </p>
                <p className="text-[13px]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
                <button type="button" onClick={() => { setReserve(null); setChoix(null); }} className="text-[13px] font-bold underline underline-offset-4">
                  Choisir un autre samedi
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-semibold leading-snug">
                    {m.court}
                    <br />
                    {majuscule(SAMEDIS[choix.samedi].long)}
                  </p>
                  <p className="text-right">
                    <span className="block font-[family-name:var(--titres)] text-[22px] font-black tabular-nums">{euros(prixMachine(m, 1, chauffeur))}</span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.1em]">TTC · exemple</span>
                  </p>
                </div>
                {m.chauffeur && (
                  <label className="flex items-center gap-3 text-[14px] font-semibold cursor-pointer">
                    <input type="checkbox" checked={chauffeur} onChange={(e) => setChauffeur(e.target.checked)} className="h-5 w-5 accent-[var(--accent)]" />
                    Avec chauffeur ({euros(m.chauffeur)} la journée)
                  </label>
                )}
                <button
                  type="button"
                  onClick={() => setReserve(choix)}
                  className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] text-[16px] font-black uppercase tracking-[0.04em] text-[var(--sur-accent)]"
                >
                  Réserver ce samedi
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
