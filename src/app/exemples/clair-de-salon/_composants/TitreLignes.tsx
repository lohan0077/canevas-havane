"use client";

import { useEffect, useRef } from "react";

/**
 * Le grand titre du premier écran, en deux lignes qui ne se recoupent jamais : le
 * piano qui dort, le chapitre qui bloque. Les mots montent l'un après l'autre comme
 * dans `TitreRevele` du kit (mêmes classes `kit-mot`, même réglage « animations
 * réduites ») ; le kit n'a pas de titre en plusieurs lignes imposées, d'où ce
 * composant. `*mot*` met un mot en relief.
 */
export default function TitreLignes({
  lignes,
  className = "",
  classeLignes = [],
  classeAccent = "",
}: {
  lignes: string[];
  className?: string;
  classeLignes?: string[];
  classeAccent?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = requestAnimationFrame(() => { el.dataset.vu = ""; });
    return () => cancelAnimationFrame(t);
  }, []);

  const decoupees = lignes.map((l) => l.split(/ +/));
  const departs = decoupees.map((_, k) => decoupees.slice(0, k).reduce((n, mots) => n + mots.length, 0));

  return (
    <h1 ref={ref} className={className}>
      {decoupees.map((mots, k) => (
        <span key={k} className={`block ${classeLignes[k] ?? ""}`}>
          {mots.map((brut, j) => {
            const accent = brut.includes("*");
            return (
              <span key={j}>
                <span className={`kit-mot ${accent ? classeAccent : ""}`} style={{ "--kit-i": departs[k] + j } as React.CSSProperties}>
                  {brut.replace(/\*/g, "")}
                </span>
                {j < mots.length - 1 ? " " : null}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
