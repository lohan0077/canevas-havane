"use client";

import { useEffect, useState } from "react";
import Apparition from "../../_kit/Apparition";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import BarreOnglets from "./BarreOnglets";
import { Surtitre } from "./Blocs";
import { CRENEAUX, QUESTIONS, agence, photos, type IdQuestion } from "./donnees";

const OUVERTS = 40;

/**
 * Le premier écran de l'accueil, et son seul outil. Une fenêtre de navigateur aux
 * quarante onglets, la promesse « un jour », et un seul bouton : « Ferme tes onglets ».
 * Il ouvre trois questions (avec qui, quand, quel budget), puis les créneaux de trente
 * minutes avec un conseiller. À la réservation, les quarante onglets se ferment un à
 * un jusqu'au dernier : « Ton voyage ». Rien ne quitte le navigateur.
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

  const c = creneau === null ? null : CRENEAUX[creneau];
  const resume = QUESTIONS.map((q) => reponses[q.id]).filter(Boolean).join(" · ");

  return (
    <section id="ferme" className="kit-grain relative isolate scroll-mt-0 overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <PhotoCinema src={photos.fuji.src} alt="" priority origine="50% 60%" className="opacity-60" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,48,42,0.72)_0%,rgba(22,48,42,0.5)_35%,rgba(22,48,42,0.9)_75%,rgba(22,48,42,0.98)_100%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col px-4 pb-12 pt-24 sm:px-8 sm:pt-28">
        {/* La fenêtre aux quarante onglets. */}
        <Apparition de="flou" className="overflow-hidden rounded-2xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]">
          <BarreOnglets nombre={onglets} sombre />
          <div className="flex items-center gap-3 bg-[#21433A] px-3 py-2">
            <span aria-hidden="true" className="flex gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full bg-[#E5674B]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#F2C14E]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#7FB59A]" />
            </span>
            <span className="min-w-0 flex-1 truncate rounded-full bg-[#16302A] px-4 py-1 text-[13px] tabular-nums">
              {onglets > 1 ? `Dimanche, 23 h · ${onglets} onglets ouverts, et toujours rien de réservé` : "Un seul onglet : ton voyage"}
            </span>
          </div>
        </Apparition>

        <div className="flex flex-1 flex-col justify-center gap-7 py-10 sm:py-14">
          <Apparition>
            <Surtitre>{agence.nom} · agence de voyage</Surtitre>
          </Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={"Tu avais dit « un jour ». *C'est quand ?*"}
            className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3.4rem,8.6vw,8.4rem)] leading-[0.9] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent)]"
          />
          <Apparition as="p" delai={450} className="hidden max-w-2xl text-[clamp(1.1rem,1.6vw,1.3rem)] leading-relaxed sm:block">
            Le voyage que tu as promis, sans quarante onglets ouverts un dimanche soir : un seul bouton,
            trois questions, trente minutes avec un conseiller.
          </Apparition>

          <div data-film="questions" className="scroll-mt-24 space-y-4">
            {!ouvert ? (
              <Apparition delai={650} className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setOuvert(true)}
                  data-film="fermer-onglets"
                  className="group inline-flex min-h-16 items-center gap-3 rounded-full bg-[var(--accent)] px-7 text-xl font-semibold text-[var(--sur-accent)] shadow-[0_20px_40px_-18px_rgba(242,165,142,0.8)] transition-transform hover:scale-[1.03]"
                >
                  <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-[var(--sur-accent)] text-[15px] text-[var(--accent)] transition-transform duration-500 group-hover:rotate-90">✕</span>
                  Ferme tes onglets
                </button>
                <p className="text-[15px]">Trois questions, puis trente minutes avec un conseiller.</p>
              </Apparition>
            ) : (
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-5 rounded-[1.8rem] bg-[var(--fond)] p-5 text-[var(--encre)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] sm:p-7">
                  {QUESTIONS.map((q) => (
                    <fieldset key={q.id} className="space-y-2.5">
                      <legend className="font-[family-name:var(--titres)] text-[1.9rem] leading-tight">{q.question}</legend>
                      <div className="flex flex-wrap gap-2">
                        {q.reponses.map((r) => {
                          const actif = reponses[q.id] === r;
                          return (
                            <button
                              key={r}
                              type="button"
                              aria-pressed={actif}
                              data-film={`${q.id}-${r}`}
                              onClick={() => setReponses({ ...reponses, [q.id]: r })}
                              className={`min-h-11 rounded-full border-2 px-4 text-[15px] font-semibold transition-all duration-300 ${
                                actif ? "scale-[1.04] border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"
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

                <div id="trente-minutes" data-film="creneaux" className="scroll-mt-24 space-y-4 rounded-[1.8rem] bg-[var(--fond)] p-5 text-[var(--encre)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] sm:p-7">
                  {reserve && c ? (
                    <div role="status" className="space-y-4">
                      <BarreOnglets nombre={onglets} />
                      <p className="text-sm font-semibold tabular-nums text-[var(--accent-texte)]" aria-hidden="true">
                        {onglets > 1 ? `${onglets} onglets ouverts` : "1 onglet : ton voyage"}
                      </p>
                      <p className="font-[family-name:var(--titres)] text-[2.2rem] leading-tight">
                        Rendez-vous {c.jour.toLowerCase()} {c.heure}.
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
                      <p className="font-[family-name:var(--titres)] text-[1.9rem] leading-tight">Trente minutes avec un conseiller</p>
                      <div className="grid grid-cols-3 gap-2" role="group" aria-label="Créneaux de trente minutes">
                        {CRENEAUX.map((x, i) => (
                          <button
                            key={x.jour + x.heure}
                            type="button"
                            disabled={x.pris}
                            aria-pressed={creneau === i}
                            onClick={() => setCreneau(i)}
                            data-film={`creneau-${x.jour.toLowerCase()}-${x.heure.replace(/\s/g, "")}`}
                            className={`min-h-16 rounded-2xl border-2 px-1 text-[14px] leading-tight transition-all duration-300 ${
                              x.pris
                                ? "border-transparent bg-[#EFE6D6] text-[var(--doux)] line-through decoration-1"
                                : creneau === i
                                  ? "scale-[1.04] border-[var(--encre)] bg-[var(--accent)] text-[var(--sur-accent)]"
                                  : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"
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
                        className="flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--encre)] text-lg font-semibold text-[var(--fond)] transition-transform enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:bg-[var(--doux)]"
                      >
                        {creneau === null ? "Choisis un créneau" : "Réserver 30 minutes"}
                      </button>
                      <p className="text-[13px] text-[var(--doux)]">Créneaux pris : exemple. Gratuit, sans engagement. En visio jusqu&apos;à 21 h.</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
