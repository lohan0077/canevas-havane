"use client";

import { Calendrier, ChampNaissance } from "./Annee";
import { useMoment } from "./Moment";

/**
 * Le calendrier de la première année, juste sous l'ouverture. Le soir, l'ouverture
 * laisse sa place à la garde : le champ de la date de naissance descend ici.
 */
export default function SectionAnnee() {
  const { moment } = useMoment();
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      {moment === "soir" ? (
        <div className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-9">
          <ChampNaissance titreNiveau={2} />
        </div>
      ) : (
        <div className="space-y-5 lg:pt-4">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Sa première année</p>
          <h2 className="text-[38px] sm:text-5xl">Chaque visite, avec sa date.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Cinq rendez-vous font la première année d&apos;un chaton ou d&apos;un chiot. Ils tombent
            à des âges précis : on les pose dès la naissance, et chacun se réserve d&apos;un geste.
          </p>
        </div>
      )}
      <Calendrier />
    </div>
  );
}
