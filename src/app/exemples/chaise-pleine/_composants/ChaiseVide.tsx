"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { CRENEAUX, DOSSIER, HEURES_SEMAINE } from "./donnees";

const pluriel = (n: number, mot: string) => `${n} ${mot}${n > 1 ? "s" : ""}`;

/**
 * L'outil de l'accueil : « Ton poste est vide depuis combien de semaines ? ». Un
 * curseur, les semaines qui se colorent, puis « Voir ce que ça fait » : les heures de
 * travail en attente (35 h par semaine, durée légale). Juste en dessous, vingt
 * minutes pour définir le poste. Rien ne quitte le navigateur.
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

  return (
    <div className="space-y-5">
      {/* La question */}
      <div className="rounded-2xl bg-[var(--carte)] p-5 text-[var(--encre)] sm:p-7 space-y-5" data-film="question">
        <label htmlFor={id} className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-semibold text-[var(--doux)]">Vide depuis</span>
          <span className="font-[family-name:var(--titres)] text-4xl font-extrabold tabular-nums">{pluriel(semaines, "semaine")}</span>
        </label>
        <input
          id={id}
          type="range"
          min={1}
          max={26}
          value={semaines}
          onChange={(e) => setSemaines(Number(e.target.value))}
          data-film="curseur"
          className="w-full h-3 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--carte)] [&::-webkit-slider-thumb]:border-[6px] [&::-webkit-slider-thumb]:border-[var(--accent)] [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[6px] [&::-moz-range-thumb]:border-[var(--accent)]"
          style={{ background: `linear-gradient(90deg, var(--accent) ${((semaines - 1) / 25) * 100}%, var(--trait) ${((semaines - 1) / 25) * 100}%)` }}
        />
        <ol aria-hidden="true" className="grid grid-cols-9 gap-1.5">
          {Array.from({ length: 9 }, (_, k) => (
            <li key={k} className={`grid h-8 place-items-center rounded-md text-[11px] font-bold ${k < semaines ? "bg-[#2A343D] text-[#F4F1EA]" : "bg-[var(--fond)] text-[var(--doux)]"}`}>
              {k === 8 && semaines > 9 ? `+${semaines - 8}` : `S${k + 1}`}
            </li>
          ))}
        </ol>
        {montre ? (
          <div className="rounded-xl bg-[var(--fond)] p-4" data-film="heures" aria-live="polite">
            <p className="font-[family-name:var(--titres)] text-6xl font-extrabold leading-none tabular-nums text-[var(--accent-texte)]">
              {affiche}&nbsp;h
            </p>
            <p className="mt-1 text-lg font-semibold">de travail, sur une chaise vide.</p>
            <p className="mt-2 text-xs text-[var(--doux)]">
              Calcul : {HEURES_SEMAINE} heures par semaine (durée légale à temps complet), pendant {pluriel(semaines, "semaine")}.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => { setAffiche(0); setMontre(true); }}
            data-film="voir"
            className="flex min-h-14 w-full items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-bold text-[var(--sur-accent)]"
          >
            Voir ce que ça fait
          </button>
        )}
      </div>

      {/* Juste en dessous : vingt minutes */}
      <div id="vingt-minutes" className="scroll-mt-20 rounded-2xl border-2 border-[#F28C6B] bg-[#2A343D] p-5 text-[#F4F1EA] sm:p-7 space-y-4" data-film="rdv">
        <p className="text-sm font-semibold text-[#F28C6B]">Vide depuis {pluriel(semaines, "semaine")}</p>
        <p className="font-[family-name:var(--titres)] text-3xl font-extrabold leading-tight">On en parle 20&nbsp;minutes&nbsp;?</p>
        <ul className="space-y-1.5 text-[15px]">
          {["Le poste, défini ensemble", "Honoraires écrits avant de signer", "Placement gratuit pour les candidats"].map((l) => (
            <li key={l} className="flex items-center gap-2.5"><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#F28C6B]" />{l}</li>
          ))}
        </ul>
        {reserve && c ? (
          <div role="status" className="space-y-2 rounded-xl bg-[#F4F1EA] p-4 text-[#1E2A33]">
            <p className="font-[family-name:var(--titres)] text-2xl font-extrabold">Rendez-vous : {c.jour.toLowerCase()} {c.heure.replace(/ /g, " ")}</p>
            <p className="text-[15px]">Vingt minutes au téléphone pour définir le poste. Les honoraires te sont envoyés par écrit avant de signer quoi que ce soit.</p>
            <p className="text-sm text-[#56636D]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
            <button type="button" onClick={() => { setReserve(false); setCreneau(null); }} className="text-sm font-semibold underline underline-offset-4">Choisir un autre créneau</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Créneaux de vingt minutes">
              {CRENEAUX.map((x, i) => (
                <button
                  key={x.jour + x.heure}
                  type="button"
                  disabled={x.pris}
                  aria-pressed={creneau === i}
                  onClick={() => setCreneau(i)}
                  data-film={`creneau-${x.jour.toLowerCase()}-${x.heure.replace(/\s/g, "")}`}
                  className={`min-h-13 rounded-lg border px-1 text-sm leading-tight ${
                    x.pris ? "border-[#46525C] text-[#C9D2D9]" : creneau === i ? "border-[#F28C6B] bg-[#F28C6B] text-[#2A343D]" : "border-[#5B6873] hover:border-[#F28C6B]"
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
              className="flex min-h-13 w-full items-center justify-center rounded-xl bg-[#F28C6B] text-lg font-bold text-[#2A343D] disabled:cursor-not-allowed"
            >
              {creneau === null ? "Choisis un créneau" : "Réserver 20 minutes"}
            </button>
            <p className="text-xs text-[#C9D2D9]">
              Créneaux pris : exemple. Combien ça coûte ? <Link href={`${DOSSIER}/honoraires`} className="font-semibold text-[#F4F1EA] underline underline-offset-4">Les honoraires, ligne par ligne</Link>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
