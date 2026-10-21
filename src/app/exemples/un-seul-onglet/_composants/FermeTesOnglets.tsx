"use client";

import { useEffect, useState } from "react";
import { CRENEAUX, QUESTIONS, type IdQuestion } from "./donnees";
import BarreOnglets from "./BarreOnglets";

const OUVERTS = 40;

/**
 * L'outil de l'accueil. Un seul bouton, « Ferme tes onglets » ; il ouvre trois
 * questions (avec qui, quand, quel budget), puis les créneaux de trente minutes
 * avec un conseiller. À la réservation, les quarante onglets se ferment un à un
 * jusqu'au dernier : « Ton voyage ». Rien ne quitte le navigateur.
 */
export default function FermeTesOnglets() {
  const [ouvert, setOuvert] = useState(false);
  const [reponses, setReponses] = useState<Partial<Record<IdQuestion, string>>>({});
  const [creneau, setCreneau] = useState<number | null>(null);
  const [reserve, setReserve] = useState(false);
  const [onglets, setOnglets] = useState(OUVERTS);

  // Les onglets se ferment un par un, en un peu moins de deux secondes.
  useEffect(() => {
    if (!reserve || onglets <= 1) return;
    const minuteur = setTimeout(() => setOnglets((n) => n - 1), 45);
    return () => clearTimeout(minuteur);
  }, [reserve, onglets]);

  if (!ouvert) {
    return (
      <div className="space-y-3" data-film="questions">
        <button
          type="button"
          onClick={() => setOuvert(true)}
          data-film="fermer-onglets"
          className="flex min-h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[var(--accent)] px-6 text-xl font-bold text-[var(--sur-accent)] shadow-[0_18px_30px_-18px_rgba(31,95,168,0.9)] sm:w-auto"
        >
          <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-md bg-white/20 text-base">✕</span>
          Ferme tes onglets
        </button>
        <p className="text-sm text-[var(--doux)]">Trois questions, puis trente minutes avec un conseiller.</p>
      </div>
    );
  }

  const c = creneau === null ? null : CRENEAUX[creneau];
  const resume = QUESTIONS.map((q) => reponses[q.id]).filter(Boolean).join(" · ");

  return (
    <div className="space-y-4" data-film="questions">
      <div className="rounded-2xl bg-[var(--carte)] p-4 sm:p-6 shadow-[0_24px_40px_-30px_rgba(15,42,67,0.6)] space-y-4">
        {QUESTIONS.map((q) => (
          <fieldset key={q.id} className="space-y-2">
            <legend className="font-[family-name:var(--titres)] text-2xl leading-tight">{q.question}</legend>
            <div className="flex flex-wrap gap-1.5">
              {q.reponses.map((r) => {
                const actif = reponses[q.id] === r;
                return (
                  <button
                    key={r}
                    type="button"
                    aria-pressed={actif}
                    data-film={`${q.id}-${r}`}
                    onClick={() => setReponses({ ...reponses, [q.id]: r })}
                    className={`min-h-10 rounded-lg border px-3 text-[15px] font-semibold transition-colors ${
                      actif ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--fond)] hover:border-[var(--accent)]"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div id="trente-minutes" className="scroll-mt-20 rounded-2xl bg-[var(--carte)] p-4 sm:p-6 shadow-[0_24px_40px_-30px_rgba(15,42,67,0.6)] space-y-4" data-film="creneaux">
        {reserve && c ? (
          <div role="status" className="space-y-4">
            <BarreOnglets nombre={onglets} />
            <p className="text-sm font-bold tabular-nums text-[var(--accent-texte)]" aria-hidden="true">
              {onglets > 1 ? `${onglets} onglets ouverts` : "1 onglet : ton voyage"}
            </p>
            <p className="font-[family-name:var(--titres)] text-3xl leading-tight">
              Rendez-vous {c.jour.toLowerCase()} {c.heure.replace(/ /g, " ")}.
            </p>
            <p className="leading-relaxed">
              Trente minutes avec un conseiller, en visio ou à l&apos;agence. Il ferme les onglets à ta place.
              {resume && <span className="mt-1 block font-semibold">{resume}</span>}
            </p>
            <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
            <button type="button" onClick={() => { setReserve(false); setCreneau(null); setOnglets(OUVERTS); }} className="text-sm font-semibold underline underline-offset-4">
              Choisir un autre créneau
            </button>
          </div>
        ) : (
          <>
            <p className="font-[family-name:var(--titres)] text-2xl leading-tight">Trente minutes avec un conseiller</p>
            <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Créneaux de trente minutes">
              {CRENEAUX.map((x, i) => (
                <button
                  key={x.jour + x.heure}
                  type="button"
                  disabled={x.pris}
                  aria-pressed={creneau === i}
                  onClick={() => setCreneau(i)}
                  data-film={`creneau-${x.jour.toLowerCase()}-${x.heure.replace(/\s/g, "")}`}
                  className={`min-h-14 rounded-lg border px-1 text-sm leading-tight ${
                    x.pris
                      ? "border-[var(--trait)] text-[var(--doux)]"
                      : creneau === i
                        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]"
                        : "border-[var(--trait)] bg-[var(--fond)] hover:border-[var(--accent)]"
                  }`}
                >
                  <span className="block font-bold">{x.jour}</span>
                  <span className="block">{x.pris ? "pris" : x.heure}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={creneau === null}
              onClick={() => setReserve(true)}
              data-film="reserver-30"
              className="flex min-h-14 w-full items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-bold text-[var(--sur-accent)] disabled:cursor-not-allowed"
            >
              {creneau === null ? "Choisis un créneau" : "Réserver 30 minutes"}
            </button>
            <p className="text-xs text-[var(--doux)]">Créneaux pris : exemple. Gratuit, sans engagement.</p>
          </>
        )}
      </div>
    </div>
  );
}
