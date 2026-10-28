"use client";

import { useState } from "react";

const CRENEAUX = [
  { cle: "lundi-18", jour: "Lundi", heure: "18 h" },
  { cle: "mardi-1230", jour: "Mardi", heure: "12 h 30", pris: true },
  { cle: "mercredi-9", jour: "Mercredi", heure: "9 h" },
  { cle: "jeudi-18", jour: "Jeudi", heure: "18 h" },
  { cle: "vendredi-1730", jour: "Vendredi", heure: "17 h 30", pris: true },
  { cle: "samedi-10", jour: "Samedi", heure: "10 h" },
];

/**
 * En bas de chaque page : le client choisit lui-même son rendez-vous, au cabinet ou en
 * visio. Personne ne l'appelle pour le lui proposer (C. consom. L223-1). Créneaux
 * d'exemple ; la confirmation dit que rien n'est envoyé.
 */
export default function RendezVous() {
  const [lieu, setLieu] = useState<"au cabinet" | "en visio">("au cabinet");
  const [choisi, setChoisi] = useState<string | null>(null);
  const [reserve, setReserve] = useState(false);
  const c = CRENEAUX.find((x) => x.cle === choisi);

  return (
    <div data-film="rendez-vous" className="space-y-5">
      <div role="group" aria-label="Où ?" className="inline-flex rounded-full bg-[#F1E6CF] p-1">
        {(["au cabinet", "en visio"] as const).map((l) => (
          <button
            key={l}
            type="button"
            data-film={l === "en visio" ? "visio" : "cabinet"}
            aria-pressed={lieu === l}
            onClick={() => {
              setLieu(l);
              setReserve(false);
            }}
            className={`min-h-11 rounded-full px-5 text-[15px] font-bold first-letter:uppercase ${lieu === l ? "bg-[#1B2A41] text-[#FFF8EC]" : ""}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div role="group" aria-label="La semaine prochaine" className="grid grid-cols-3 gap-2.5">
        {CRENEAUX.map((x) => {
          const actif = choisi === x.cle;
          return (
            <button
              key={x.cle}
              type="button"
              data-film={`creneau-${x.cle}`}
              disabled={x.pris || reserve}
              aria-pressed={actif}
              onClick={() => setChoisi(x.cle)}
              className={`rounded-[16px] border-2 px-2 py-3 text-center transition-colors ${
                x.pris
                  ? "border-transparent bg-[#EFE8DA] text-[#5A6372]"
                  : actif
                    ? "border-[#1B2A41] bg-[#F2C14E] text-[#1B2A41]"
                    : "border-[#E2D6BE] bg-white text-[#1B2A41] hover:border-[#1B2A41]"
              }`}
            >
              <span className="block text-[16px] font-bold leading-tight">{x.jour}</span>
              <span className="block text-[14px] tabular-nums">{x.heure}</span>
              <span className={`mt-1.5 block text-[11px] font-bold uppercase tracking-[0.08em] ${x.pris ? "line-through" : ""}`}>{x.pris ? "Pris" : "Libre"}</span>
            </button>
          );
        })}
      </div>
      <p className="text-[13px] leading-relaxed text-[#4F5B6D]">
        Créneaux d&apos;exemple, la semaine prochaine. Une heure, sans engagement. Personne ne t&apos;appelle avant : c&apos;est toi qui choisis.
      </p>

      {c && (
        <div data-film="carte-rendez-vous" className="space-y-3 rounded-[20px] border-2 border-[#1B2A41] bg-white p-5">
          <p className="font-[family-name:var(--titres)] text-[26px] font-semibold leading-tight">
            {c.jour}, {c.heure} · {lieu}
          </p>
          {reserve ? (
            <div role="status" className="space-y-1 rounded-[14px] bg-[#E3F2E9] p-4 text-[#1F5F3C]">
              <p className="font-bold">Rendez-vous réservé : {c.jour.toLowerCase()} {c.heure}, {lieu}.</p>
              <p className="text-[14px]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
            </div>
          ) : (
            <button type="button" data-film="reserver" onClick={() => setReserve(true)} className="w-full rounded-[14px] bg-[#F2C14E] px-6 py-4 text-[17px] font-bold text-[#1B2A41]">
              Réserver ce créneau
            </button>
          )}
          {reserve && (
            <button
              type="button"
              onClick={() => {
                setReserve(false);
                setChoisi(null);
              }}
              className="text-[14px] font-bold underline underline-offset-4"
            >
              Choisir un autre créneau
            </button>
          )}
        </div>
      )}
    </div>
  );
}
