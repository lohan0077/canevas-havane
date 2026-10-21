"use client";

import { useState } from "react";

const JOURS = [
  { jour: "Lun.", heures: ["9 h 30", "12 h 30", "18 h"] },
  { jour: "Mar.", heures: ["10 h", "17 h 30"] },
  { jour: "Mer.", heures: ["9 h", "14 h", "18 h 30"] },
  { jour: "Jeu.", heures: ["12 h 30", "18 h"] },
  { jour: "Ven.", heures: ["9 h 30", "16 h"] },
];

/**
 * Prendre rendez-vous : un jour, une heure, au cabinet ou en visio. C'est le client qui
 * choisit ; personne ne l'appelle pour le lui proposer. Créneaux d'exemple, rien n'est envoyé.
 */
export default function RendezVous() {
  const [jour, setJour] = useState(0);
  const [heure, setHeure] = useState<string | null>(null);
  const [lieu, setLieu] = useState("au cabinet");
  const [confirme, setConfirme] = useState(false);

  return (
    <div data-film="rendez-vous" className="space-y-5 rounded-[28px] bg-[var(--carte)] p-5 text-[var(--encre)] sm:p-7">
      <div role="group" aria-label="Le jour" className="grid grid-cols-5 gap-2">
        {JOURS.map((j, i) => (
          <button
            key={j.jour}
            type="button"
            aria-pressed={jour === i}
            onClick={() => {
              setJour(i);
              setHeure(null);
              setConfirme(false);
            }}
            className={`min-h-12 rounded-2xl text-[15px] font-semibold ${jour === i ? "bg-[var(--encre)] text-[var(--carte)]" : "border border-[var(--trait)] bg-[var(--fond)]"}`}
          >
            {j.jour}
          </button>
        ))}
      </div>
      <div role="group" aria-label="L'heure" className="flex flex-wrap gap-2">
        {JOURS[jour].heures.map((h) => (
          <button
            key={h}
            type="button"
            aria-pressed={heure === h}
            onClick={() => {
              setHeure(h);
              setConfirme(false);
            }}
            className={`min-h-11 rounded-full px-4 text-[15px] font-semibold tabular-nums ${heure === h ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--trait)] bg-[var(--fond)]"}`}
          >
            {h}
          </button>
        ))}
      </div>
      <div role="group" aria-label="Où" className="flex gap-2">
        {["au cabinet", "en visio"].map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={lieu === l}
            onClick={() => setLieu(l)}
            className={`min-h-11 flex-1 rounded-full text-[15px] font-semibold first-letter:uppercase ${lieu === l ? "border-2 border-[var(--encre)]" : "border border-[var(--trait)] bg-[var(--fond)]"}`}
          >
            {l}
          </button>
        ))}
      </div>
      {confirme && heure ? (
        <div role="status" className="space-y-1 rounded-2xl border-2 border-[#3FA36B] bg-[var(--fond)] p-4">
          <p className="font-semibold">
            Rendez-vous noté : {JOURS[jour].jour.replace(".", "")} {heure}, {lieu}.
          </p>
          <p className="text-[14px] text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        </div>
      ) : (
        <button
          type="button"
          disabled={!heure}
          onClick={() => setConfirme(true)}
          className="w-full rounded-full bg-[var(--encre)] px-6 py-4 text-[17px] font-semibold text-[var(--carte)] disabled:cursor-not-allowed"
        >
          {heure ? `Réserver ${JOURS[jour].jour.replace(".", "").toLowerCase()} ${heure}` : "Choisis une heure"}
        </button>
      )}
      <p className="text-[12px] leading-relaxed text-[var(--doux)]">Créneaux d&apos;exemple, pour la semaine prochaine. Personne ne t&apos;appelle pour te proposer un rendez-vous : c&apos;est toi qui le prends.</p>
    </div>
  );
}
