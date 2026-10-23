"use client";

import { MOIS } from "./donnees";
import { useMoisCourant } from "./mois";

/** « Octobre · l'aster » : le mois en cours et sa fleur, chez le visiteur. */
export default function MoisCourant({ forme = "complet" }: { forme?: "complet" | "nom" | "fleur" }) {
  const m = MOIS[useMoisCourant() - 1];
  if (forme === "nom") return <>{m.nom}</>;
  if (forme === "fleur") return <>{m.fleur}</>;
  return (
    <>
      {m.nom} · {m.fleur.toLowerCase()}
    </>
  );
}
