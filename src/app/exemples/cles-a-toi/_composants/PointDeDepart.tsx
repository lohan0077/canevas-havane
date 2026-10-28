"use client";

import { useState } from "react";

const LIEUX = [
  { id: "maison", libelle: "Chez moi", phrase: "devant chez toi" },
  { id: "lycee", libelle: "Au lycée", phrase: "devant le lycée" },
  { id: "travail", libelle: "Au travail", phrase: "devant ton travail" },
];
const HORAIRES = [
  { libelle: "Mar. 7 h 30", long: "mardi à 7 h 30", moniteur: "Inès" },
  { libelle: "Mer. 17 h", long: "mercredi à 17 h", moniteur: "Inès" },
  { libelle: "Jeu. 19 h", long: "jeudi à 19 h", moniteur: "Théo" },
];

/** « Je passe te prendre », en vrai : on choisit le point de départ et l'heure. Rien n'est envoyé. */
export default function PointDeDepart() {
  const [lieu, setLieu] = useState(1);
  const [heure, setHeure] = useState(1);
  const [reserve, setReserve] = useState(false);
  const h = HORAIRES[heure];

  const choix = (actif: boolean) =>
    `rounded-full border-2 px-4 py-2.5 font-[family-name:var(--titres)] font-semibold transition-colors ${
      actif ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--sur-sombre)]/40"
    }`;

  return (
    <div className="rounded-[32px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-6 sm:p-8 space-y-6">
      <fieldset className="space-y-3">
        <legend className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent)]">D'où on part ?</legend>
        <div className="flex flex-wrap gap-2">
          {LIEUX.map((l, i) => (
            <button key={l.id} type="button" aria-pressed={lieu === i} onClick={() => { setLieu(i); setReserve(false); }} className={choix(lieu === i)}>
              {l.libelle}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="space-y-3">
        <legend className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Quand ?</legend>
        <div className="flex flex-wrap gap-2">
          {HORAIRES.map((x, i) => (
            <button key={x.libelle} type="button" aria-pressed={heure === i} onClick={() => { setHeure(i); setReserve(false); }} className={choix(heure === i)}>
              {x.libelle}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="rounded-2xl bg-[var(--fond)] text-[var(--encre)] p-5 space-y-3" aria-live="polite">
        <p className="font-[family-name:var(--titres)] text-2xl font-bold leading-snug">
          {h.moniteur} passe te prendre {LIEUX[lieu].phrase}, {h.long}.
        </p>
        <p>Une heure au volant, et retour au même endroit.</p>
        {reserve ? (
          <p role="status" className="rounded-xl bg-[var(--carte)] border-2 border-[var(--accent-texte)] p-3 font-semibold">
            Départ réservé. Démonstration : rien n'est envoyé, rien n'est enregistré.
          </p>
        ) : (
          <button type="button" onClick={() => setReserve(true)} className="w-full rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-3.5 font-[family-name:var(--titres)] text-lg font-bold">
            Réserver ce départ
          </button>
        )}
      </div>
      <p className="text-sm">Dans un rayon de 8 km autour de l'école. Horaires et prénoms d'exemple.</p>
    </div>
  );
}
