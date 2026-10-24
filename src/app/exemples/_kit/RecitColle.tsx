"use client";

import { useEffect, useRef, useState } from "react";

export type Etape = { titre: string; texte: React.ReactNode; visuel: React.ReactNode; surtitre?: string };

/**
 * Un récit en étapes : sur grand écran, l'image reste collée à gauche et change à
 * mesure que les étapes défilent à droite ; sur téléphone, chaque étape porte son
 * image. `visuel` est une image (`fill`) ou un bloc qui remplit son cadre.
 */
export default function RecitColle({ etapes, className = "" }: { etapes: Etape[]; className?: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.etape));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className={`grid gap-10 lg:grid-cols-2 lg:gap-20 ${className}`}>
      <div className="relative hidden lg:block">
        <div className="sticky top-24 h-[72vh] overflow-hidden rounded-[2rem]">
          {etapes.map((e, i) => (
            <div
              key={e.titre}
              aria-hidden={i !== active || undefined}
              className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"}`}
            >
              {e.visuel}
            </div>
          ))}
        </div>
      </div>
      <div>
        {etapes.map((e, i) => (
          <div
            key={e.titre}
            ref={(el) => { refs.current[i] = el; }}
            data-etape={i}
            className="flex flex-col justify-center gap-5 py-10 lg:min-h-[72vh] lg:py-0"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] lg:hidden">{e.visuel}</div>
            {e.surtitre && <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">{e.surtitre}</p>}
            <h3 className={`text-3xl md:text-5xl transition-opacity duration-500 ${i === active ? "lg:opacity-100" : "lg:opacity-60"}`}>{e.titre}</h3>
            <div className="max-w-lg text-lg leading-relaxed text-[var(--doux)]">{e.texte}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
