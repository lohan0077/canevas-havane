"use client";

import { useEffect, useRef } from "react";

/**
 * Un mot du titre de l'accueil, révélé à l'arrivée comme ceux de TitreRevele, mais en
 * `span` : il se pose dans le `h1`, entre deux photos en arche.
 */
export default function MotRevele({ texte, delai = 0, className = "" }: { texte: string; delai?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const t = requestAnimationFrame(() => {
      if (ref.current) ref.current.dataset.vu = "";
    });
    return () => cancelAnimationFrame(t);
  }, []);
  return (
    <span ref={ref} className={className} style={{ "--kit-delai": `${delai}ms` } as React.CSSProperties}>
      <span className="kit-mot" style={{ "--kit-i": 0 } as React.CSSProperties}>{texte}</span>
    </span>
  );
}
