"use client";

import { useRef } from "react";

/**
 * Une carte dont une lueur de la couleur d'accent suit le pointeur. Le contenu,
 * lien compris, va dedans ; `className` porte le fond, la bordure et l'arrondi.
 */
export default function CarteLueur({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`kit-lueur ${className}`}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--kit-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--kit-y", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
