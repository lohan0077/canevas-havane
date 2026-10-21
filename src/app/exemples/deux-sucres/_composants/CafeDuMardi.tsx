"use client";

import { useEffect, useState } from "react";

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/** Le premier mardi d'un mois donné (0 = dimanche, 2 = mardi). */
function premierMardi(annee: number, mois: number) {
  const d = new Date(annee, mois, 1);
  d.setDate(1 + ((2 - d.getDay() + 7) % 7));
  return d;
}

/** Les trois prochains premiers mardis, à partir d'aujourd'hui. */
function prochains(aujourdhui: Date) {
  const dates: Date[] = [];
  let a = aujourdhui.getFullYear();
  let m = aujourdhui.getMonth();
  const debut = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), aujourdhui.getDate());
  while (dates.length < 3) {
    const d = premierMardi(a, m);
    if (d >= debut) dates.push(d);
    m += 1;
    if (m > 11) {
      m = 0;
      a += 1;
    }
  }
  return dates;
}

/**
 * Le café du premier mardi : de vraies dates, calculées le jour de la visite — pas un
 * compte à rebours, pas de places « limitées ». Calculées après le chargement, pour que
 * la page compilée ne fige pas une date passée.
 */
export default function CafeDuMardi() {
  const [dates, setDates] = useState<Date[] | null>(null);
  useEffect(() => {
    // Les dates dépendent du jour de la visite : posées une fois la page chargée.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDates(prochains(new Date()));
  }, []);

  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {(dates ?? [null, null, null]).map((d, i) => (
        <li key={i} className="rounded-[26px] bg-[var(--carte)] p-5 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Mardi</p>
          <p className="font-[family-name:var(--titres)] text-5xl font-semibold">{d ? d.getDate() : "·"}</p>
          <p className="text-lg">{d ? MOIS[d.getMonth()] : "…"}</p>
          <p className="text-sm text-[var(--doux)]">16 h – 17 h 30</p>
        </li>
      ))}
    </ul>
  );
}
