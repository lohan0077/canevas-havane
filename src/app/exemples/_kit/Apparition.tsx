"use client";

import { useEffect, useRef } from "react";

type Balise = "div" | "section" | "article" | "header" | "figure" | "p" | "span" | "li" | "ul" | "ol" | "h2" | "h3" | "blockquote" | "aside";

/**
 * Fait apparaître son contenu quand il entre à l'écran : fondu, flou qui se lève,
 * léger glissement (`de`). Une fois vu, il le reste. `delai` en millisecondes, pour
 * faire entrer une série l'un après l'autre (`delai={i * 90}`).
 * Avec « animations réduites », le contenu est là d'emblée (mouvement.css).
 */
export default function Apparition({
  as = "div",
  de = "bas",
  delai = 0,
  className = "",
  style,
  children,
  ...reste
}: {
  as?: Balise;
  de?: "bas" | "gauche" | "droite" | "zoom" | "flou" | "rideau";
  delai?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "style" | "children">) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Seuil nul : un bloc plus haut que l'écran n'atteindrait jamais 15 % visibles.
    const obs = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          el.dataset.vu = "";
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -2% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  // Une balise au choix : le type de sa référence serait l'intersection de toutes.
  const Balise = as as React.ElementType;
  return (
    <Balise
      ref={ref}
      className={`kit-apparait ${className}`}
      data-de={de}
      style={{ "--kit-delai": `${delai}ms`, ...style } as React.CSSProperties}
      {...reste}
    >
      {children}
    </Balise>
  );
}
