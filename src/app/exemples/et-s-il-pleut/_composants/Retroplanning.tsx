"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ETAPES } from "./donnees";

const MOIS = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
const MOIS_COURTS = ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."];
const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

/** Lit « 11 septembre 2027 », « samedi 11 septembre 2027 » ou « 11/09/2027 » : une date, ou null. */
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

/** Le nombre de samedis qui défile jusqu'à sa valeur ; tout de suite si on limite les animations. */
function Compteur({ valeur }: { valeur: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = String(valeur);
      return;
    }
    const debut = performance.now();
    let image = 0;
    const pas = (t: number) => {
      const x = Math.min(1, (t - debut) / 900);
      el.textContent = String(Math.round(valeur * (1 - (1 - x) ** 3)));
      if (x < 1) image = requestAnimationFrame(pas);
    };
    image = requestAnimationFrame(pas);
    return () => cancelAnimationFrame(image);
  }, [valeur]);
  return (
    <>
      <span ref={ref} aria-hidden="true" className="font-[family-name:var(--titres)] text-6xl leading-none tabular-nums text-[var(--accent)]">
        {valeur}
      </span>
      <span className="sr-only">{valeur}</span>
    </>
  );
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
    <div data-film="retroplanning" className="space-y-5 rounded-[1.75rem] border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_40px_80px_-50px_rgba(0,0,0,0.6)] sm:p-8">
      <label htmlFor="esp-date" className="block space-y-2">
        <span className="block text-[15px] font-semibold text-[var(--doux)]">Date du mariage</span>
        <input
          id="esp-date"
          type="text"
          inputMode="text"
          autoComplete="off"
          placeholder="ex. 11 septembre 2027"
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          className="w-full rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 py-3.5 font-[family-name:var(--titres)] text-[21px] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[var(--doux)] focus:border-[var(--encre)] focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_55%,transparent)] sm:text-[26px]"
        />
      </label>

      {!calcul && (
        <div className="space-y-4">
          <p className="text-[15px] text-[var(--doux)]">
            {saisie.trim() ? "Écris la date en entier : « 11 septembre 2027 » ou « 11/09/2027 »." : "Le rétroplanning se remplit dès que la date est complète."}
          </p>
          {/* L'ossature du rétroplanning, en attente de la date. */}
          <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {ETAPES.map((e) => (
              <li key={e.mois} className="flex items-baseline justify-between gap-4 py-2.5">
                <span className="font-[family-name:var(--titres)] text-[20px] leading-tight text-[var(--doux)]">{e.titre}</span>
                <span className="shrink-0 text-sm text-[var(--doux)]">{e.mois} mois avant</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {calcul?.passe && <p role="status" className="esp-ligne rounded-2xl bg-[#E2E0EE] px-4 py-3 font-medium">Cette date est déjà passée : on te souhaite que c'était beau.</p>}

      {calcul && !calcul.passe && (
        <div role="status" className="space-y-5">
          <div id="esp-samedis" className="esp-ligne flex items-baseline gap-3 rounded-2xl bg-[var(--sombre)] px-5 py-4 text-[var(--sur-sombre)]">
            <Compteur valeur={calcul.samedis} />
            <span className="leading-snug">
              samedi{calcul.samedis > 1 ? "s" : ""} avant le jour J
              <span className="block text-sm text-[#C9C8D8]">{calcul.jour === "samedi" ? "Un samedi : le plus demandé." : `C'est un ${calcul.jour} : très bien aussi.`}</span>
            </span>
          </div>
          {/* La liste entre ligne après ligne ; une nouvelle date la rejoue. */}
          <ol key={jourJ?.toDateString()} id="esp-etapes" className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {calcul.etapes.map((e, i) => (
              <li key={e.mois} className="esp-ligne flex items-baseline justify-between gap-4 py-2.5" style={{ "--i": i + 1 } as React.CSSProperties}>
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
