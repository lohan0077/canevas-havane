"use client";

import { useId, useState } from "react";
import Creneaux, { type Creneau } from "../../_kit/Creneaux";
import { QUESTIONS, type Choix } from "./donnees";
import TroisQuestions from "./TroisQuestions";
import Plateau from "./Plateau";

// Les créneaux de la semaine d'essayage. Ceux qui sont pris sont un exemple.
const CRENEAUX: Creneau[] = [
  { libelle: "Mardi", sous: "10 h" },
  { libelle: "Mardi", sous: "17 h 30", pris: true },
  { libelle: "Mercredi", sous: "14 h" },
  { libelle: "Jeudi", sous: "11 h", pris: true },
  { libelle: "Jeudi", sous: "18 h" },
  { libelle: "Vendredi", sous: "16 h" },
  { libelle: "Samedi", sous: "10 h" },
  { libelle: "Samedi", sous: "11 h", pris: true },
  { libelle: "Samedi", sous: "15 h 30" },
];

const Etape = ({ n, titre, children }: { n: number; titre: string; children: React.ReactNode }) => (
  <section className="space-y-6 border-t-2 border-[var(--encre)] pt-6">
    <h2 className="flex items-baseline gap-4 text-4xl sm:text-5xl">
      <span className="font-[family-name:var(--texte)] text-sm font-bold tabular-nums text-[var(--accent-texte)]">0{n}</span>
      {titre}
    </h2>
    {children}
  </section>
);

/** La réservation, en trois temps : les réponses, le prénom, le créneau. Rien n'est envoyé. */
export default function Essayage({ depart }: { depart: Choix }) {
  const [choix, setChoix] = useState<Choix>(depart);
  const [prenom, setPrenom] = useState("");
  const id = useId();
  const complet = QUESTIONS.every((q) => choix[q.id]);

  return (
    <div className="space-y-16">
      <Etape n={1} titre="Tes trois réponses">
        <TroisQuestions choix={choix} changer={setChoix} avecBouton={false} />
      </Etape>

      <Etape n={2} titre="Ton plateau">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <Plateau choix={complet ? choix : undefined} prenom={prenom} saisie={false} creneau="ton essayage" />
          <div className="space-y-2">
            <label htmlFor={id} className="block text-sm font-semibold">Ton prénom, pour le chevalet (facultatif)</label>
            <input
              id={id}
              type="text"
              maxLength={20}
              autoComplete="off"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Camille"
              className="w-full rounded-xl border border-[var(--trait)] bg-[var(--carte)] px-4 py-3 text-lg outline-none focus:border-[var(--accent)]"
            />
            <p className="text-sm text-[var(--doux)]">
              {complet ? "Le plateau suit tes trois réponses." : "Réponds aux trois questions : le plateau se range d'après elles."}
            </p>
          </div>
        </div>
      </Etape>

      <Etape n={3} titre="Ton créneau">
        <p className="max-w-xl leading-relaxed text-[var(--doux)]">
          Quarante-cinq minutes, en boutique. On prépare ton plateau la veille.
        </p>
        <Creneaux
          creneaux={CRENEAUX}
          colonnes={3}
          titreCarte="Ton essayage"
          bouton="Réserver mon essayage"
          confirmation={`Réservé : {creneau}. Ton plateau sera prêt${prenom.trim() ? `, ${prenom.trim()}` : ""} : douze montures, à ton prénom.`}
          note="Créneaux pris : exemple. L'essayage dure 45 minutes."
          libellePris="Pris"
          libelleLibre="Libre"
        />
      </Etape>
    </div>
  );
}
