"use client";

import { useEffect, useState } from "react";

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/** Le dernier mardi passé (ou aujourd'hui, si c'est mardi) : le jour de la dernière torréfaction. */
const dernierMardi = (d: Date) => {
  const r = new Date(d);
  r.setDate(r.getDate() - ((r.getDay() - 2 + 7) % 7));
  return r;
};

/**
 * La date de torréfaction du sachet en vente, calculée chez le visiteur : toujours
 * un vrai mardi, jamais une date figée qui vieillirait sur la page.
 */
export default function DateTorrefaction({ className = "" }: { className?: string }) {
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => setDate(dernierMardi(new Date())));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <span className={className} suppressHydrationWarning>
      {date ? `${JOURS[date.getDay()]} ${date.getDate()} ${MOIS[date.getMonth()]}` : "mardi"}
    </span>
  );
}
