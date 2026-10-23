"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { Surtitre } from "./Blocs";
import { CRENEAUX, DOSSIER, HEURES_SEMAINE, cabinet } from "./donnees";

const pluriel = (n: number, mot: string) => `${n} ${mot}${n > 1 ? "s" : ""}`;

/**
 * Le premier écran et le bloc juste en dessous, qui partagent leur état. En haut, la
 * seule question de l'accueil : « Ton poste est vide depuis combien de semaines ? ». Un
 * curseur, les semaines qui se remplissent, puis « Voir ce que ça fait » : les heures de
 * travail en attente (35 h par semaine, durée légale). Juste en dessous, vingt minutes
 * pour définir le poste, et les honoraires écrits avant de signer. Rien ne quitte le
 * navigateur.
 */
export default function ChaiseVide() {
  const id = useId();
  const [semaines, setSemaines] = useState(1);
  const [montre, setMontre] = useState(false);
  const [affiche, setAffiche] = useState(0);
  const [creneau, setCreneau] = useState<number | null>(null);
  const [reserve, setReserve] = useState(false);
  const heures = semaines * HEURES_SEMAINE;

  // Le chiffre monte jusqu'au total, en un peu plus d'une seconde.
  useEffect(() => {
    if (!montre || affiche === heures) return;
    const pas = Math.max(5, Math.round(Math.abs(heures - affiche) / 8));
    const minuteur = setTimeout(() => setAffiche((a) => (a < heures ? Math.min(heures, a + pas) : Math.max(heures, a - pas))), 60);
    return () => clearTimeout(minuteur);
  }, [montre, affiche, heures]);

  const c = creneau === null ? null : CRENEAUX[creneau];
  const rempli = ((semaines - 1) / 25) * 100;

  return (
    <>
      {/* ---------- Premier écran : une seule question ---------- */}
      <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#1B1B30", "#2E2E52", "#8A5326"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/40" />
        <div className="relative mx-auto grid min-h-[100svh] max-w-7xl content-center gap-10 px-5 pb-12 pt-28 sm:px-8 sm:pt-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
          <div className="space-y-7">
            <Apparition>
              <Surtitre>{cabinet.nom} · {cabinet.metier}</Surtitre>
            </Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte={"Ton poste est vide depuis *combien de semaines ?*"}
              className="font-[family-name:var(--titres)] text-[clamp(3rem,7vw,7rem)] leading-[0.92] tracking-[-0.025em]"
              classeAccent="italic text-[var(--accent)]"
            />
            <Apparition as="p" delai={500} className="hidden max-w-xl text-[clamp(1.1rem,1.6vw,1.3rem)] leading-relaxed sm:block">
              On ne vend pas des CV. On vend la fin de la chaise vide — et on compte, un an après, si la
              personne est toujours là.
            </Apparition>
          </div>

          <Apparition de="zoom" delai={250}>
            <div data-film="question" className="space-y-5 rounded-[2rem] bg-[var(--fond)] p-5 text-[var(--encre)] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] sm:p-7">
              <label htmlFor={id} className="flex items-baseline justify-between gap-4">
                <span className="text-[15px] font-semibold text-[var(--doux)]">Vide depuis</span>
                <span className="font-[family-name:var(--titres)] text-[2.6rem] leading-none tabular-nums">{pluriel(semaines, "semaine")}</span>
              </label>
              <input
                id={id}
                type="range"
                min={1}
                max={26}
                value={semaines}
                onChange={(e) => setSemaines(Number(e.target.value))}
                data-film="curseur"
                className="h-3 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[6px] [&::-moz-range-thumb]:border-[var(--encre)] [&::-moz-range-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[6px] [&::-webkit-slider-thumb]:border-[var(--encre)] [&::-webkit-slider-thumb]:bg-[var(--accent)]"
                style={{ background: `linear-gradient(90deg, #E5674B ${rempli}%, var(--trait) ${rempli}%)` }}
              />
              <ol aria-hidden="true" className="grid grid-cols-9 gap-1.5">
                {Array.from({ length: 9 }, (_, k) => (
                  <li key={k} className={`grid h-9 place-items-center rounded-lg text-[11px] font-bold transition-colors duration-300 ${k < semaines ? "bg-[var(--sombre)] text-[var(--accent)]" : "bg-[#F1E6D2] text-[var(--doux)]"}`}>
                    {k === 8 && semaines > 9 ? `+${semaines - 8}` : `S${k + 1}`}
                  </li>
                ))}
              </ol>
              {montre ? (
                <div data-film="heures" aria-live="polite" className="rounded-[1.4rem] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
                  <p className="font-[family-name:var(--titres)] text-[clamp(3.6rem,8vw,5rem)] leading-none tabular-nums text-[var(--accent)]">
                    {affiche}&nbsp;h
                  </p>
                  <p className="mt-1 text-lg font-semibold">de travail, sur une chaise vide.</p>
                  <p className="mt-2 text-[13px]">
                    Calcul : {HEURES_SEMAINE} heures par semaine (durée légale à temps complet), pendant {pluriel(semaines, "semaine")}.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => { setAffiche(0); setMontre(true); }}
                  data-film="voir"
                  className="flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[var(--accent)] text-lg font-bold text-[var(--sur-accent)] transition-transform hover:scale-[1.01]"
                >
                  Voir ce que ça fait <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </Apparition>
        </div>
      </section>

      {/* ---------- Juste en dessous : vingt minutes ---------- */}
      <section id="vingt-minutes" className="scroll-mt-20 mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-6">
          <Apparition><Surtitre className="text-[var(--doux)]">Juste en dessous</Surtitre></Apparition>
          <TitreRevele
            texte={"On en parle *20 minutes ?*"}
            className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <ul className="space-y-3 text-lg">
            {["Le poste, défini ensemble : ce qui fera rester quelqu'un", "Les honoraires, écrits avant de signer", "Placement gratuit pour les candidats"].map((l, i) => (
              <Apparition as="li" key={l} delai={i * 100} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#E5674B]" />
                {l}
              </Apparition>
            ))}
          </ul>
        </div>

        <div data-film="rdv" className="space-y-5 rounded-[2rem] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)] shadow-[0_40px_90px_-45px_rgba(27,27,48,0.9)] sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-[family-name:var(--titres)] text-[2rem] leading-tight">Vingt minutes au téléphone</p>
            <p className="rounded-full bg-[#2E2E52] px-3 py-1 text-[13px] font-bold text-[var(--accent)]">Vide depuis {pluriel(semaines, "semaine")}</p>
          </div>
          {reserve && c ? (
            <div role="status" className="space-y-2 rounded-[1.4rem] bg-[var(--fond)] p-5 text-[var(--encre)]">
              <p className="font-[family-name:var(--titres)] text-[1.8rem] leading-tight">Rendez-vous : {c.jour.toLowerCase()} {c.heure}</p>
              <p className="text-[15px]">Vingt minutes pour définir le poste. Les honoraires te sont envoyés par écrit, ligne par ligne, avant de signer quoi que ce soit.</p>
              <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
              <button type="button" onClick={() => { setReserve(false); setCreneau(null); }} className="text-sm font-bold underline underline-offset-4">Choisir un autre créneau</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Créneaux de vingt minutes">
                {CRENEAUX.map((x, i) => (
                  <button
                    key={x.jour + x.heure}
                    type="button"
                    disabled={x.pris}
                    aria-pressed={creneau === i}
                    onClick={() => setCreneau(i)}
                    data-film={`creneau-${x.jour.toLowerCase()}-${x.heure.replace(/\s/g, "")}`}
                    className={`min-h-16 rounded-2xl border-2 px-1 text-[15px] leading-tight transition-all duration-300 ${
                      x.pris ? "border-[#3A3A5C] text-[#C9C9DA] line-through decoration-1" : creneau === i ? "scale-[1.04] border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[#4A4A70] hover:border-[var(--accent)]"
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
                data-film="reserver-20"
                className="flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] text-lg font-bold text-[var(--sur-accent)] transition-transform enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:bg-[#C9C9DA]"
              >
                {creneau === null ? "Choisis un créneau" : "Réserver 20 minutes"}
              </button>
              <p className="text-[14px] text-[#C9C9DA]">
                Créneaux pris : exemple. Combien ça coûte ?{" "}
                <Link href={`${DOSSIER}/honoraires`} className="font-bold text-[var(--sur-sombre)] underline underline-offset-4">Les honoraires, ligne par ligne</Link>.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
