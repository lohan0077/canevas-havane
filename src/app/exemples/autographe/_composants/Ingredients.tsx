import { Fragment } from "react";

/**
 * Une liste d'ingrédients dont les allergènes, écrits entre *astérisques* dans les
 * données, ressortent en gras — comme l'exige l'étiquetage (règlement (UE)
 * n° 1169/2011, art. 21).
 */
export default function Ingredients({ texte, className = "" }: { texte: string; className?: string }) {
  return (
    <span className={className}>
      {texte.split("*").map((morceau, i) => (
        <Fragment key={i}>{i % 2 ? <strong className="font-bold text-[var(--encre)]">{morceau}</strong> : morceau}</Fragment>
      ))}
    </span>
  );
}
