"use client";

import { useState } from "react";
import { Plaque, styles as s } from "./Habillage";
import { ANNEE, PRISES, SEMAINES, lundi } from "./donnees";

const jourMois = (d: Date) =>
  d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" });

// Chaque case est une petite plaque : le filet est le fond du bouton, l'intérieur
// est recoupé, comme dans `Nuit.module.css`.
const COUPE = "[clip-path:polygon(0_0,calc(100%-12px)_0,100%_12px,100%_100%,0_100%)]";
const COUPE_DEDANS = "[clip-path:polygon(0_0,calc(100%-11.41px)_0,100%_11.41px,100%_100%,0_100%)]";

export default function Creneaux() {
  const [choisie, setChoisie] = useState<number | null>(null);
  const [bloquee, setBloquee] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {SEMAINES.map((sem) => {
          const prise = PRISES.has(sem);
          const active = choisie === sem;
          return (
            <button
              key={sem}
              type="button"
              disabled={prise || bloquee}
              aria-pressed={active}
              onClick={() => setChoisie(sem)}
              className={`group block p-px text-center ${COUPE} transition-colors ${
                active
                  ? "bg-[#e8d1cb]"
                  : prise
                    ? "bg-[rgba(255,255,255,0.08)] cursor-not-allowed"
                    : "bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.5)] cursor-pointer"
              } focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2`}
            >
              <span
                className={`block px-2 py-4 ${COUPE_DEDANS} ${
                  active ? "bg-[#e8d1cb] text-[#15131b]" : prise ? "bg-[#070b13] text-[#8f98a8]" : "bg-[#0a0f19] text-white"
                }`}
              >
                <span className={`${s.technique} block text-[10px]`}>Semaine</span>
                <span className="block text-3xl font-bold leading-tight tabular-nums">{sem}</span>
                <span className="block text-xs">{jourMois(lundi(ANNEE, sem))}</span>
                <span
                  className={`${s.technique} mt-2 block text-[10px] ${
                    active ? "text-[#15131b]" : prise ? "text-[#8f98a8] line-through" : "text-[#7edbee]"
                  }`}
                >
                  {active ? "Choisie" : prise ? "Réservée" : "Libre"}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-sm text-[#8f98a8]">
        Dates d&apos;exemple. Sur un vrai site, ce calendrier suit le planning réel de
        l&apos;entreprise, mis à jour à chaque signature.
      </p>

      {choisie !== null && (
        <Plaque coupe={20}>
          <div className="p-6 sm:p-8 space-y-5">
            <p className={`${s.technique} text-xs text-[#e8d1cb]`}>Saison {ANNEE}</p>
            <p className={`${s.titre} text-3xl sm:text-4xl`}>Ta date de chantier</p>
            <p className="text-lg text-[#b9c0cc]">
              Semaine {choisie} · à partir du{" "}
              {lundi(ANNEE, choisie).toLocaleDateString("fr-FR", { day: "numeric", month: "long", timeZone: "UTC" })}
            </p>
            {bloquee ? (
              <Plaque fond="#0e1522" coupe={12}>
                <div className="p-4 space-y-1" role="status">
                  <p className={`${s.technique} text-sm text-[#7edbee]`}>Pré-réservée · après visite technique</p>
                  <p className="text-sm text-[#b9c0cc]">
                    Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.
                  </p>
                </div>
              </Plaque>
            ) : (
              <button type="button" onClick={() => setBloquee(true)} className={`${s.bouton} w-full sm:w-auto`}>
                Bloquer ma date
              </button>
            )}
            {bloquee && (
              <button
                type="button"
                onClick={() => {
                  setBloquee(false);
                  setChoisie(null);
                }}
                className="text-sm font-bold text-[#e8d1cb] underline underline-offset-4"
              >
                Choisir une autre semaine
              </button>
            )}
          </div>
        </Plaque>
      )}
    </div>
  );
}
