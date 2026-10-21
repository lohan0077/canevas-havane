"use client";

import { useMemo, useState } from "react";
import { ETAPES } from "./donnees";

const MOIS = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
const MOIS_COURTS = ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."];
const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

/** « 11 septembre 2027 », « samedi 11 septembre 2027 » ou « 11/09/2027 » → une date, ou null. */
function lire(saisie: string): Date | null {
  const n = saisie.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/^(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\s+/, "").trim();
  let j: number, m: number, a: number;
  const enLettres = n.match(/^(\d{1,2})(?:er)?\s+([a-z]+)\s+(\d{4})$/);
  const enChiffres = n.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (enLettres) {
    j = Number(enLettres[1]);
    m = MOIS.indexOf(enLettres[2]);
    a = Number(enLettres[3]);
  } else if (enChiffres) {
    j = Number(enChiffres[1]);
    m = Number(enChiffres[2]) - 1;
    a = Number(enChiffres[3]);
  } else return null;
  if (m < 0 || m > 11) return null;
  const d = new Date(a, m, j);
  return d.getDate() === j && d.getMonth() === m ? d : null;
}

/** Les samedis d'aujourd'hui (compris) à la veille du mariage. */
function samedisAvant(jourJ: Date, aujourdhui: Date) {
  const d = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), aujourdhui.getDate());
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7));
  let n = 0;
  for (; d < jourJ; d.setDate(d.getDate() + 7)) n++;
  return n;
}

/**
 * Une seule question : tu te maries quand ? La date tapée, le site compte les samedis
 * qui restent et sort le rétroplanning, mois par mois. Tout se calcule ici, à partir
 * de la date du jour : rien n'est envoyé, et rien n'est inventé (pas de fausse urgence).
 */
export default function Retroplanning() {
  const [saisie, setSaisie] = useState("");
  const jourJ = useMemo(() => lire(saisie), [saisie]);
  const calcul = useMemo(() => {
    if (!jourJ) return null;
    const aujourdhui = new Date();
    if (jourJ <= aujourdhui) return { passe: true as const };
    const moisCourant = aujourdhui.getFullYear() * 12 + aujourdhui.getMonth();
    const etapes = ETAPES.map((e) => {
      const d = new Date(jourJ.getFullYear(), jourJ.getMonth() - e.mois, 1);
      const enRetard = d.getFullYear() * 12 + d.getMonth() < moisCourant;
      return { ...e, quand: enRetard ? "Dès maintenant" : `${MOIS_COURTS[d.getMonth()]} ${d.getFullYear()}`, enRetard };
    });
    return { passe: false as const, samedis: samedisAvant(jourJ, aujourdhui), jour: JOURS[jourJ.getDay()], etapes };
  }, [jourJ]);

  return (
    <div data-film="retroplanning" className="rounded-[30px] bg-[var(--carte)] border border-[var(--trait)] p-5 sm:p-8 space-y-5">
      <label htmlFor="lgs-date" className="block space-y-2">
        <span className="block text-sm font-medium uppercase tracking-[0.16em] text-[var(--doux)]">Date du mariage</span>
        <input
          id="lgs-date"
          type="text"
          inputMode="text"
          autoComplete="off"
          placeholder="ex. 11 septembre 2027"
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          className="w-full rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 py-3.5 font-[family-name:var(--titres)] text-[26px] placeholder:text-[var(--doux)] focus:border-[var(--accent)] outline-none"
        />
      </label>

      {!calcul && (
        <p className="text-[15px] text-[var(--doux)]">
          {saisie.trim() ? "Écris la date en entier : « 11 septembre 2027 » ou « 11/09/2027 »." : "Le rétroplanning s'affiche dès que la date est complète."}
        </p>
      )}

      {calcul?.passe && <p role="status" className="rounded-2xl bg-[#F1E4DA] px-4 py-3 font-medium">Cette date est déjà passée : on te souhaite que c'était beau.</p>}

      {calcul && !calcul.passe && (
        <div role="status" className="space-y-5">
          <div id="lgs-samedis" className="flex items-baseline gap-3 rounded-2xl bg-[var(--sombre)] text-[var(--sur-sombre)] px-5 py-4">
            <span className="font-[family-name:var(--titres)] text-6xl leading-none tabular-nums text-[#D9B98A]">{calcul.samedis}</span>
            <span className="leading-snug">
              samedi{calcul.samedis > 1 ? "s" : ""} avant le jour J
              <span className="block text-sm text-[#CDBDB5]">{calcul.jour === "samedi" ? "Un samedi : le plus demandé." : `C'est un ${calcul.jour} : très bien aussi.`}</span>
            </span>
          </div>
          <ol id="lgs-etapes" className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {calcul.etapes.map((e) => (
              <li key={e.mois} className="flex items-baseline justify-between gap-4 py-2.5">
                <span className="font-[family-name:var(--titres)] text-[22px] leading-tight">{e.titre}</span>
                <span className={`shrink-0 text-sm font-semibold tabular-nums ${e.enRetard ? "text-[var(--accent-texte)]" : "text-[var(--doux)]"}`}>{e.quand.replace(" ", " ")}</span>
              </li>
            ))}
          </ol>
          <p className="text-xs text-[var(--doux)]">Rétroplanning d&apos;exemple : un ordre courant, pas une règle. Calculé sur ton téléphone, rien n&apos;est envoyé.</p>
        </div>
      )}
    </div>
  );
}
