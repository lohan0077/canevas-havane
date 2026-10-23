"use client";

import { useState } from "react";
import { FORMULES, SAMEDIS, euros } from "./donnees";

const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/**
 * Bloquer son samedi, direct sur le site : on touche un samedi libre, le récapitulatif
 * dit « Votre samedi est libre », l'heure de fin « selon la salle », et « Bloquer ma
 * date » le réserve. Rien n'est envoyé ; les samedis « pris » sont un exemple.
 */
export default function ReserverSamedi() {
  const [id, setId] = useState<string | null>(null);
  const [invites, setInvites] = useState(120);
  const [bloque, setBloque] = useState<string | null>(null);
  const s = SAMEDIS.find((x) => x.id === id) ?? null;
  const formule = FORMULES[0];

  return (
    <div className="space-y-6">
      <ul id="grille-samedis" className="grid grid-cols-3 gap-2">
        {SAMEDIS.map((x) => {
          const fait = bloque === x.id;
          return (
            <li key={x.id}>
              <button
                type="button"
                data-film={`samedi-${x.id}`}
                disabled={x.pris || fait}
                aria-pressed={x.id === id}
                onClick={() => { setId(x.id); setBloque(null); }}
                className={`w-full rounded-[16px] border p-3 text-center transition-colors ${
                  fait
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]"
                    : x.pris
                      ? "border-[var(--trait)] text-[var(--doux)] cursor-not-allowed"
                      : x.id === id
                        ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]"
                        : "border-[var(--accent)] bg-[var(--carte)]"
                }`}
              >
                <span className="block text-[11px] uppercase tracking-[0.14em]">Samedi</span>
                <span className="block font-[family-name:var(--titres)] text-[30px] font-extrabold leading-tight">{x.jour}</span>
                <span className="block text-[13px]">{x.mois}</span>
                <span className="mt-1 block text-[12px] font-semibold uppercase tracking-[0.1em]">{fait ? "Bloqué ✓" : x.pris ? "Pris" : "Libre"}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="text-[13px] text-[var(--doux)]">Samedis d&apos;exemple : l&apos;entreprise est fictive.</p>

      <div id="recap-samedi" className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5 space-y-4 shadow-[0_24px_60px_-34px_rgba(42,25,15,.5)]">
        {s ? (
          <>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{majuscule(s.long)}</p>
            <p className="font-[family-name:var(--titres)] text-[34px] font-extrabold lowercase leading-[0.95] tracking-[-0.04em]">
              Votre samedi est <span className="text-[var(--accent-texte)]">libre</span>
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[15px]">Mariage · <span className="tabular-nums">{invites}</span> invités</span>
              <span className="flex items-center gap-2">
                <button type="button" aria-label="10 invités de moins" onClick={() => setInvites(Math.max(30, invites - 10))} className="h-10 w-10 rounded-full border border-[var(--trait)] text-lg font-bold">−</button>
                <button type="button" aria-label="10 invités de plus" onClick={() => setInvites(Math.min(300, invites + 10))} className="h-10 w-10 rounded-full border border-[var(--trait)] text-lg font-bold">+</button>
              </span>
            </div>
            <p className="text-[15px]">Jusqu&apos;à 2 h, selon la salle</p>
            <p className="text-[15px]">
              {formule.nom} : <strong className="tabular-nums">{euros(formule.prix)} TTC</strong> <span className="text-[var(--doux)]">· exemple</span>
            </p>
            {bloque === s.id ? (
              <div role="status" className="rounded-[16px] border-2 border-[var(--accent)] p-4 space-y-1">
                <p className="font-[family-name:var(--titres)] text-[24px] font-extrabold lowercase">{majuscule(s.long.replace(" 2027", ""))} : bloqué</p>
                <p className="text-[14px] text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré. On vous appellerait pour lire ensemble le règlement de la salle.</p>
              </div>
            ) : (
              <button type="button" onClick={() => setBloque(s.id)} className="flex h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] text-[17px] font-bold text-[var(--sur-accent)]">
                Bloquer ma date
              </button>
            )}
          </>
        ) : (
          <p className="font-[family-name:var(--titres)] text-[26px] font-extrabold lowercase leading-tight">touchez un samedi libre.</p>
        )}
      </div>
    </div>
  );
}
