"use client";

import { useState } from "react";
import Creneaux, { type Creneau } from "../../_kit/Creneaux";
import { MONTURES, euros } from "./donnees";
import { Verres } from "./Visage";

const MAX = 5;

// Les créneaux de la semaine ; ceux qui sont pris sont un exemple.
const CRENEAUX: Creneau[] = [
  { libelle: "Mer.", sous: "17 h" },
  { libelle: "Jeu.", sous: "18 h" },
  { libelle: "Jeu.", sous: "19 h 30", pris: true },
  { libelle: "Ven.", sous: "12 h 30" },
  { libelle: "Sam.", sous: "11 h", pris: true },
  { libelle: "Sam.", sous: "15 h" },
];

/**
 * Cinq montures mises de côté à l'avance, puis un créneau. Au-delà de cinq, les
 * autres se grisent : la séance dure trente minutes. Tout reste dans le navigateur.
 */
export default function ChoixMontures() {
  const [choix, setChoix] = useState<string[]>([]);
  const basculer = (id: string) =>
    setChoix((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length < MAX ? [...c, id] : c));
  const noms = MONTURES.filter((m) => choix.includes(m.id)).map((m) => m.nom);

  return (
    <div className="space-y-14">
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl sm:text-5xl">1. Tes cinq montures</h2>
          <p className="rounded-full bg-[var(--sombre)] px-4 py-2 text-sm font-bold text-[var(--sur-sombre)] tabular-nums" aria-live="polite">
            {choix.length} / {MAX} choisies
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {MONTURES.map((m) => {
            const pris = choix.includes(m.id);
            const plein = !pris && choix.length >= MAX;
            return (
              <li key={m.id}>
                <button
                  type="button"
                  aria-pressed={pris}
                  disabled={plein}
                  onClick={() => basculer(m.id)}
                  className={`w-full rounded-2xl border-2 p-3 text-left transition-colors ${pris ? "border-[var(--encre)] bg-[var(--carte)]" : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"} disabled:cursor-not-allowed`}
                >
                  <span className="relative grid aspect-[16/9] place-items-center rounded-xl bg-[var(--fond)]">
                    {pris && <span className="absolute right-1.5 top-1.5 rounded-full bg-[var(--encre)] px-2 py-0.5 text-[11px] font-bold text-[var(--carte)]">Choisie</span>}
                    <svg viewBox="0 0 160 72" className="w-[80%]" aria-hidden="true">
                      <Verres forme={m.forme} couleur={plein ? "#B9BEC5" : m.couleur} />
                    </svg>
                  </span>
                  <span className="mt-2 block font-[family-name:var(--titres)] text-2xl">{m.nom}</span>
                  <span className="block text-sm text-[var(--doux)]">{m.matiere}</span>
                  <span className="block text-sm font-semibold tabular-nums">{euros(m.prix)} TTC</span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="text-sm text-[var(--doux)]">Prix de la monture seule, TTC, exemple. Les noms sont ceux de la maison : aucune marque.</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-4xl sm:text-5xl">2. Ton créneau</h2>
        <Creneaux
          creneaux={CRENEAUX}
          colonnes={3}
          titreCarte="Ta séance, à l'endroit"
          bouton="Réserver ma séance"
          confirmation={
            noms.length
              ? `Réservée : {creneau}. Devant l'écran t'attendront : ${noms.join(", ")}.`
              : "Réservée : {creneau}. Tu choisiras tes cinq montures au mur, en arrivant."
          }
          note="Créneaux pris : exemple. Une séance dure trente minutes."
          libellePris="Pris"
          libelleLibre="Libre"
        />
      </section>
    </div>
  );
}
