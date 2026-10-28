"use client";

import { useState } from "react";
import { JOURS_ESTIMATION } from "./donnees";

type Choix = { jour: string; h: string } | null;

/**
 * Faire estimer sa maison : le vendeur choisit lui-même son jour et son heure, puis
 * réserve. Les créneaux pris sont un exemple ; rien n'est envoyé.
 * `compacte` : un onglet par jour (la feuille de l'accueil) ; sinon, tous les jours.
 */
export default function Estimation({ compacte = false }: { compacte?: boolean }) {
  const [choix, setChoix] = useState<Choix>(null);
  const [reserve, setReserve] = useState(false);
  const [onglet, setOnglet] = useState(JOURS_ESTIMATION[0].id);
  const jour = JOURS_ESTIMATION.find((j) => j.id === choix?.jour);
  const libelle = choix && jour ? `${jour.libelle.toLowerCase()} ${jour.date}, ${choix.h}` : "";
  const jours = compacte ? JOURS_ESTIMATION.filter((j) => j.id === onglet) : JOURS_ESTIMATION;

  const heures = (j: (typeof JOURS_ESTIMATION)[number]) => (
    <div className="grid grid-cols-3 gap-2.5">
      {j.heures.map((h) => {
        const actif = choix?.jour === j.id && choix.h === h.h;
        return (
          <button
            key={h.h}
            type="button"
            data-film={`creneau-${j.id}-${h.h.replace(/\s/g, "")}`}
            disabled={h.pris || reserve}
            aria-pressed={actif}
            onClick={() => setChoix({ jour: j.id, h: h.h })}
            className={`min-h-[56px] rounded-2xl border-2 px-2 text-[17px] font-semibold transition-colors ${
              h.pris
                ? "border-transparent bg-[var(--fond)] text-[var(--doux)] line-through decoration-1"
                : actif
                  ? "border-[var(--sombre)] bg-[var(--sombre)] text-[var(--sur-sombre)]"
                  : "border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)]"
            }`}
          >
            {h.h}
            <span className="sr-only">{h.pris ? " (pris)" : " (libre)"}</span>
          </button>
        );
      })}
    </div>
  );

  const confirmation = (
    <div className="mt-4 rounded-[20px] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]" data-film="confirmation">
      {reserve ? (
        <div role="status" className="space-y-2">
          <p className="font-[family-name:var(--titres)] text-[30px] leading-tight">Estimation : {libelle}</p>
          <p className="text-[14px]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
          <button type="button" onClick={() => { setReserve(false); setChoix(null); }} className="text-[14px] font-semibold underline underline-offset-4">
            Choisir un autre créneau
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[16px]">Ton créneau : <b>{libelle}</b></p>
          <button
            type="button"
            onClick={() => setReserve(true)}
            className="h-14 w-full rounded-full bg-[var(--accent)] px-6 text-[16px] font-semibold text-[var(--sur-accent)]"
          >
            Réserver l&apos;estimation
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-5" data-film="creneaux">
      {compacte && (
        <div role="group" aria-label="Le jour" className="grid grid-cols-3 gap-2">
          {JOURS_ESTIMATION.map((j) => (
            <button
              key={j.id}
              type="button"
              data-film={`jour-${j.id}`}
              aria-pressed={onglet === j.id}
              disabled={reserve}
              onClick={() => setOnglet(j.id)}
              className={`rounded-2xl border-2 px-2 py-2.5 text-center ${onglet === j.id ? "border-[var(--accent)] bg-[var(--carte)]" : "border-[var(--trait)] bg-[var(--fond)]"}`}
            >
              <span className="block font-[family-name:var(--titres)] text-[24px] leading-none">{j.libelle}</span>
              <span className="mt-1 block text-[13px] text-[var(--doux)]">{j.date}</span>
            </button>
          ))}
        </div>
      )}
      <ul className="space-y-4">
        {jours.map((j) => (
          <li key={j.id} className={compacte ? "" : "rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-5"}>
            {!compacte && (
              <p className="mb-4 flex items-baseline justify-between gap-3">
                <span className="font-[family-name:var(--titres)] text-[30px] leading-none">{j.libelle}</span>
                <span className="text-[15px] text-[var(--doux)]">{j.date}</span>
              </p>
            )}
            {heures(j)}
            {choix?.jour === j.id && confirmation}
          </li>
        ))}
      </ul>
      <p className="text-[14px] text-[var(--doux)]">Créneaux d&apos;exemple : sur un vrai site, ils suivent l&apos;agenda réel de l&apos;agence. Une estimation dure environ une heure, sur place.</p>
    </div>
  );
}
