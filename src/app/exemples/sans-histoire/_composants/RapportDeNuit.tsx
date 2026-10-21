"use client";

import { useState } from "react";
import Image from "next/image";
import MentionCnaps from "./MentionCnaps";
import { RONDES, photos } from "./donnees";

const FIN = 600; // de 21 h à 7 h, en minutes

/** « 03 h 05 » à partir du nombre de minutes écoulées depuis 21 h. */
const heure = (m: number) => {
  const total = (21 * 60 + m) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")} h ${String(total % 60).padStart(2, "0")}`;
};

/**
 * Le rapport de 7 h, en exemple : un curseur rejoue la nuit d'un chantier, les
 * rondes tombent à leur heure, chacune avec sa photo du site (jamais une personne).
 * À 7 h, le rapport part. Rien n'est envoyé pour de vrai : tout se passe ici.
 * Le rapport est une correspondance : il porte les mentions de l'art. L612-15.
 */
export default function RapportDeNuit() {
  const [minute, setMinute] = useState(FIN);
  const [ouverte, setOuverte] = useState<number | null>(null);
  const rempli = (minute / FIN) * 100;
  const envoye = minute >= FIN;

  return (
    <div data-film="rapport" className="rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] shadow-[0_30px_60px_-40px_rgba(30,35,38,0.45)] overflow-hidden">
      <div className="px-5 sm:px-7 pt-5 pb-4 border-b border-[var(--trait)] flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Rapport de la nuit</p>
          <p className="font-[family-name:var(--titres)] text-2xl leading-tight mt-1">Chantier rue de l&apos;Exemple</p>
          <p className="text-sm text-[var(--doux)]">Lyon 7e · nuit du dimanche au lundi · exemple</p>
        </div>
        <p className="shrink-0 rounded-full bg-[var(--fond)] border border-[var(--trait)] px-3 py-1.5 text-sm font-semibold tabular-nums" aria-live="polite">
          {heure(minute)}
        </p>
      </div>

      <div className="px-5 sm:px-7 py-4 space-y-2">
        <label htmlFor="sh-nuit" className="flex items-baseline justify-between text-sm font-semibold">
          <span>Rejouer la nuit</span>
          <span className="text-xs font-normal text-[var(--doux)]">21 h → 7 h</span>
        </label>
        <input
          id="sh-nuit"
          type="range"
          min={0}
          max={FIN}
          step={5}
          value={minute}
          onChange={(e) => {
            setMinute(Number(e.target.value));
            setOuverte(null);
          }}
          className="w-full h-2.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--carte)] [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[var(--encre)] [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--carte)] [&::-moz-range-thumb]:border-[5px] [&::-moz-range-thumb]:border-[var(--encre)]"
          style={{ background: `linear-gradient(90deg, var(--encre) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
      </div>

      <ol className="px-5 sm:px-7 pb-2 divide-y divide-[var(--trait)]">
        {RONDES.map((r, i) => {
          const faite = minute >= r.minute;
          const nuit = r.minute < 480;
          return (
            <li key={r.titre} className="py-3">
              {faite ? (
                <div className="flex items-center gap-3.5">
                  <button
                    type="button"
                    data-photo={i + 1}
                    aria-expanded={ouverte === i}
                    aria-label={`Photo de la ${r.titre.toLowerCase()}, ${r.heure}`}
                    onClick={() => setOuverte(ouverte === i ? null : i)}
                    className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[var(--trait)]"
                  >
                    <Image
                      src={photos.aube.src}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                      style={{ objectPosition: r.cadrage, filter: nuit ? "brightness(.42) saturate(.55)" : "brightness(.9)" }}
                    />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-baseline gap-2">
                      <span className="font-semibold tabular-nums">{r.heure}</span>
                      <span className="text-sm text-[var(--doux)]">{r.titre}</span>
                    </p>
                    <p className="text-sm leading-snug">{r.note}</p>
                  </div>
                  <span aria-label="Vérifié" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] text-sm">✓</span>
                </div>
              ) : (
                <p className="flex items-center gap-3.5 text-sm text-[var(--doux)]">
                  <span aria-hidden="true" className="h-14 w-14 shrink-0 rounded-xl border border-dashed border-[var(--doux)]" />
                  {r.titre} · à venir
                </p>
              )}
              {faite && ouverte === i && (
                <figure className="mt-3 space-y-1.5">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                    <Image
                      src={photos.aube.src}
                      alt={`Le chantier à ${r.heure}, photographié pendant la ${r.titre.toLowerCase()}`}
                      fill
                      sizes="(min-width: 640px) 480px, 90vw"
                      className="object-cover"
                      style={{ objectPosition: r.cadrage, filter: nuit ? "brightness(.42) saturate(.55)" : "brightness(.9)" }}
                    />
                  </div>
                  <figcaption className="text-xs text-[var(--doux)]">Photo prise par l&apos;agent à {r.heure} : le site, jamais une personne.</figcaption>
                </figure>
              )}
            </li>
          );
        })}
      </ol>

      <div className="px-5 sm:px-7 pb-5 space-y-4">
        <div
          role="status"
          className={`rounded-2xl px-4 py-3 flex items-center justify-between gap-3 transition-colors ${envoye ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--fond)] text-[var(--doux)] border border-dashed border-[var(--trait)]"}`}
        >
          <span className="font-[family-name:var(--titres)] text-xl italic">{envoye ? "Rien à signaler." : "La nuit continue…"}</span>
          <span className="text-xs font-semibold tabular-nums">{envoye ? "Envoyé à 07 h 00" : "envoi à 07 h 00"}</span>
        </div>
        <MentionCnaps compacte />
      </div>
    </div>
  );
}
