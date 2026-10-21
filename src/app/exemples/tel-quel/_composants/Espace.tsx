"use client";

import { useState } from "react";
import { remiseEnPlace, sejours } from "./donnees";
import Comparateur from "./Comparateur";

/**
 * L'espace propriétaire, en exemple : la notification du jour du départ, puis les séjours,
 * chacun avec ses deux photos et sa liste de remise en place cochée. Un séjour où un verre
 * a été cassé s'affiche comme les autres : « tel quel » est une méthode, pas la promesse
 * que rien n'arrive. Aucun séjour n'a de date ni d'adresse.
 */
export default function Espace() {
  const [numero, setNumero] = useState(sejours[0].numero);
  const s = sejours.find((x) => x.numero === numero) ?? sejours[0];
  const dernier = sejours[0];

  const voirLesPhotos = () => {
    setNumero(dernier.numero);
    document.getElementById("photos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-14">
      {/* La notification du jour du départ. */}
      <div data-film="notification" className="mx-auto max-w-md overflow-hidden rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_30px_60px_-40px_rgba(31,58,51,0.6)]">
        <div className="flex items-center justify-between gap-3 bg-[var(--sombre)] px-5 py-3 text-[var(--sur-sombre)]">
          <span className="text-[13px] font-semibold">Le jour du départ · 11 h 04</span>
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#E3C88E]">Tel Quel</span>
        </div>
        <div className="space-y-4 p-5">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-texte)]">Séjour n° {dernier.numero} clôturé</p>
          <p className="font-[family-name:var(--titres)] text-[34px] leading-[1.05]">
            Ton appartement, <em className="text-[var(--accent-texte)]">tel quel.</em>
          </p>
          <ul className="space-y-2">
            {dernier.verifie.map((v) => (
              <li key={v} className="flex items-center gap-3 text-[16px]">
                <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--sombre)] text-[13px] text-[#E3C88E]">✓</span>
                {v}
              </li>
            ))}
          </ul>
          <button
            type="button"
            data-film="voir-photos"
            onClick={voirLesPhotos}
            className="w-full rounded-full bg-[var(--accent)] px-6 py-3.5 text-[16px] font-semibold text-[var(--sur-accent)]"
          >
            Voir les photos
          </button>
        </div>
      </div>

      {/* Les séjours. */}
      <section id="photos" aria-labelledby="titre-sejour" className="scroll-mt-20 space-y-6">
        <div role="group" aria-label="Choisir un séjour" className="flex flex-wrap gap-2">
          {sejours.map((x) => (
            <button
              key={x.numero}
              type="button"
              data-film={`sejour-${x.numero}`}
              aria-pressed={x.numero === numero}
              onClick={() => setNumero(x.numero)}
              className={`min-h-11 rounded-full px-4 text-[14px] font-semibold ${
                x.numero === numero ? "bg-[var(--encre)] text-[var(--carte)]" : "border border-[var(--trait)] bg-[var(--carte)]"
              }`}
            >
              Séjour n° {x.numero}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 id="titre-sejour" className="text-[36px] font-normal">Séjour n° {s.numero}</h2>
          <p className="text-[14px] text-[var(--doux)]">
            {s.nuits} nuits · {s.voyageurs} voyageurs
          </p>
        </div>

        <Comparateur key={s.numero} avant={s.heureAvant} apres={s.heureApres} />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-6">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-texte)]">Remise en place, cochée au départ</p>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {remiseEnPlace.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15px] leading-snug">
                  <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-[var(--sombre)] text-[11px] text-[#E3C88E]">✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div aria-live="polite" className="rounded-[24px] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)] sm:p-6">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#E3C88E]">Ce qui s&apos;est passé</p>
            <p className="text-[16px] leading-relaxed">{s.incident ?? "Rien à signaler : tout est remis comme à l'arrivée."}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
