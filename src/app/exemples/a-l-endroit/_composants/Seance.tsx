"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER } from "./donnees";

// Les créneaux de la semaine. Ceux qui sont pris sont un exemple.
const CRENEAUX = [
  { jour: "Mercredi", heure: "17 h" },
  { jour: "Jeudi", heure: "18 h" },
  { jour: "Jeudi", heure: "19 h 30", pris: true },
  { jour: "Vendredi", heure: "12 h 30" },
  { jour: "Samedi", heure: "11 h", pris: true },
  { jour: "Samedi", heure: "15 h" },
];

const court = (jour: string) => `${jour.slice(0, 3)}.`;

/**
 * La séance d'essayage, réservée en deux gestes : un créneau, puis le bouton.
 * La confirmation dit ce qui attend en boutique. Rien n'est envoyé.
 */
export default function Seance() {
  const [choisi, setChoisi] = useState<number | null>(null);
  const [reserve, setReserve] = useState(false);
  const c = choisi === null ? null : CRENEAUX[choisi];

  return (
    <div className="rounded-[28px] bg-[var(--carte)] p-6 sm:p-8 shadow-[0_30px_60px_-40px_rgba(29,43,58,0.6)] space-y-6" data-film="seance">
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Séance d&apos;essayage</p>
        <h3 className="text-[2.6rem] leading-[1.02]">Toi, <em>à l&apos;endroit.</em></h3>
      </div>
      <ul className="grid grid-cols-3 gap-2 text-center">
        {[
          { grand: "30", petit: "minutes" },
          { grand: "5", petit: "montures" },
          { grand: "1", petit: "écran, pas un miroir" },
        ].map((f) => (
          <li key={f.petit} className="rounded-2xl bg-[var(--fond)] px-2 py-3">
            <span className="block font-[family-name:var(--titres)] text-4xl leading-none [font-variant-numeric:lining-nums]">{f.grand}</span>
            <span className="mt-1 block text-[13px] leading-tight">{f.petit}</span>
          </li>
        ))}
      </ul>

      {reserve && c ? (
        <div role="status" className="space-y-3 rounded-2xl border-2 border-[var(--encre)] p-5">
          <p className="font-[family-name:var(--titres)] text-[1.9rem] leading-tight">
            Réservée&nbsp;:
            <span className="block italic">{c.jour.toLowerCase()} {c.heure.replace(/ /g, "\u00A0")}</span>
          </p>
          <p className="text-[15px] leading-relaxed">Trente minutes, cinq montures, et l&apos;écran réglé à l&apos;endroit. Tu repars avec les photos.</p>
          <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
          <button type="button" onClick={() => { setReserve(false); setChoisi(null); }} className="text-sm font-semibold underline underline-offset-4">
            Choisir un autre créneau
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Créneaux de la semaine">
            {CRENEAUX.map((x, i) => (
              <button
                key={x.jour + x.heure}
                type="button"
                disabled={x.pris}
                aria-pressed={choisi === i}
                onClick={() => setChoisi(i)}
                data-film={`creneau-${x.jour.toLowerCase()}-${x.heure.replace(/\s/g, "")}`}
                className={`min-h-14 rounded-2xl border-2 px-1 text-[15px] font-semibold leading-tight ${
                  x.pris
                    ? "border-[var(--trait)] text-[var(--doux)] line-through"
                    : choisi === i
                      ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--carte)]"
                      : "border-[var(--trait)] hover:border-[var(--encre)]"
                }`}
              >
                <span className="block">{court(x.jour)}</span>
                <span className="block text-[13px] font-normal">{x.heure}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={choisi === null}
            onClick={() => setReserve(true)}
            data-film="reserver-seance"
            className="flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] text-lg font-bold text-[var(--sur-accent)] disabled:cursor-not-allowed disabled:opacity-100"
          >
            {choisi === null ? "Choisis un créneau" : "Réserver ma séance"}
          </button>
          <p className="text-sm text-[var(--doux)]">
            Créneaux barrés : déjà pris (exemple). Pour choisir tes cinq montures à l&apos;avance :{" "}
            <Link href={`${DOSSIER}/seance`} className="font-semibold text-[var(--encre)] underline underline-offset-4">la page séance</Link>.
          </p>
        </>
      )}
    </div>
  );
}
