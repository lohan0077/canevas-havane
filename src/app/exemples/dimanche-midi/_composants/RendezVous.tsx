"use client";

import { useState } from "react";
import Creneaux from "../../_kit/Creneaux";

const QUI = ["Toi seul", "À deux", "En famille"] as const;

/**
 * Le rendez-vous, pris par la famille elle-même : qui vient, au cabinet ou en visio, et
 * un créneau. Le cabinet ne rappelle personne et ne se rend pas chez les gens (CMF L341-1).
 * Créneaux d'exemple ; la confirmation dit que rien n'est envoyé (le kit s'en charge).
 */
export default function RendezVous() {
  const [qui, setQui] = useState<(typeof QUI)[number]>("À deux");
  const [visio, setVisio] = useState(false);

  return (
    <div data-film="rendez-vous" className="space-y-5 rounded-[26px] bg-[var(--carte)] p-5 text-[var(--encre)] sm:p-7">
      <div role="group" aria-label="Qui vient" className="grid grid-cols-3 gap-2">
        {QUI.map((q) => (
          <button
            key={q}
            type="button"
            aria-pressed={qui === q}
            onClick={() => setQui(q)}
            className={`min-h-11 rounded-full text-[14px] font-semibold ${qui === q ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--trait)] bg-[var(--fond)]"}`}
          >
            {q}
          </button>
        ))}
      </div>
      <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px]">
        <input type="checkbox" checked={visio} onChange={(e) => setVisio(e.target.checked)} className="h-5 w-5 accent-[#2F4A3A]" />
        En visio plutôt qu&apos;au cabinet
      </label>
      <Creneaux
        key={`${qui}-${visio}`}
        colonnes={3}
        creneaux={[
          { libelle: "Mardi", sous: "18 h" },
          { libelle: "Mercredi", sous: "12 h 30" },
          { libelle: "Jeudi", sous: "9 h", pris: true },
          { libelle: "Vendredi", sous: "17 h" },
          { libelle: "Samedi", sous: "10 h", pris: true },
          { libelle: "Dimanche", sous: "midi" },
        ]}
        titreCarte={`${qui}, ${visio ? "en visio" : "au cabinet"}`}
        bouton="Prendre ce rendez-vous"
        confirmation={`Rendez-vous noté, ${qui.toLowerCase()}, ${visio ? "en visio" : "au cabinet"} : {creneau}`}
        note="Créneaux d'exemple, la semaine prochaine. Une heure, sans frais et sans engagement. Personne ne te rappelle : c'est toi qui choisis."
      />
    </div>
  );
}
