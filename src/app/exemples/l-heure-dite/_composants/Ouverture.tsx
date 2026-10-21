"use client";

import Link from "next/link";
import { DOSSIER, HEURES, entreprise } from "./donnees";
import { joursOuvrables, useAujourdhui } from "./jours";

// Premier écran inspiré du modèle « Book Hero » de MotionSites : un nom en très grand,
// en didone, et dessous une rangée d'objets inclinés, en éventail, puis des pastilles.
// Le modèle alignait des livres ; ici, les cinq prochains jours ouvrables, vrais, à la
// date du visiteur — et les heures qu'on tient.
const TEINTES = [
  "bg-[var(--carte)] text-[var(--encre)] border border-[var(--trait)]",
  "bg-[#9CC3D5] text-[#14324A]",
  "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  "bg-[#E8A77C] text-[#2A1A10]",
  "bg-[var(--carte)] text-[var(--encre)] border border-[var(--trait)]",
];
const ANGLES = [-13, -6, 0, 6, 13];
const DECALAGES = [22, 6, 0, 6, 22];

export default function Ouverture() {
  const aujourdhui = useAujourdhui();
  const jours = aujourdhui ? joursOuvrables(aujourdhui) : [];

  return (
    <section className="relative overflow-hidden px-5 pt-12 pb-14 sm:pt-20 sm:pb-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--doux)]">Pompes à chaleur · installation</p>
      <h1 className="mt-5 text-[64px] sm:text-[132px] font-normal tracking-[-0.03em] leading-[0.95]">
        L'Heure <em className="italic">Dite</em>
      </h1>
      <p className="mt-4 font-[family-name:var(--titres)] italic text-2xl sm:text-3xl text-[var(--accent-texte)]">{entreprise.signature}</p>

      {/* L'éventail des cinq prochains jours ouvrables. */}
      <div className="relative mx-auto mt-12 h-[178px] sm:h-[230px] max-w-[640px]" aria-label="Les cinq prochains jours ouvrables">
        <ul className="absolute inset-0 flex items-start justify-center">
          {Array.from({ length: 5 }, (_, i) => {
            const j = jours[i];
            return (
              <li
                key={i}
                className={`-mx-2.5 sm:mx-0 w-[86px] sm:w-[118px] h-[150px] sm:h-[196px] rounded-[18px] shadow-[0_18px_30px_-18px_rgba(31,61,43,.6)] flex flex-col items-center justify-between py-4 ${TEINTES[i]}`}
                style={{ transform: `translateY(${DECALAGES[i]}px) rotate(${ANGLES[i]}deg)`, zIndex: i === 2 ? 5 : 5 - Math.abs(i - 2) }}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.12em]">{j ? j.court : " "}</span>
                <span className="font-[family-name:var(--titres)] text-[38px] sm:text-[58px] leading-none tabular-nums">{j ? j.quantieme : " "}</span>
                <span className="text-[11px] sm:text-xs">{j ? j.mois : " "}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Les heures d'appel">
        {HEURES.map((h) => (
          <li key={h.id} className="rounded-full border border-[var(--encre)] px-4 py-1.5 text-[15px] tabular-nums">{h.libelle}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-[var(--doux)]">Les cinq prochains jours ouvrables, et les heures qu'on tient.</p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--sombre)] px-8 text-lg font-semibold text-[var(--sur-sombre)]">
          Choisir mon heure
        </Link>
        <Link href={`${DOSSIER}/pompes-a-chaleur`} className="inline-flex h-14 items-center justify-center rounded-full border border-[var(--encre)] px-8 text-lg">
          Nos pompes à chaleur
        </Link>
      </div>
    </section>
  );
}
