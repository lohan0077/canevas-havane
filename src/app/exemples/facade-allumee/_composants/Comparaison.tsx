"use client";

import { useState } from "react";

// La position du trait, alignée sur celle du pouce d'un curseur natif (16 px de
// marge de chaque côté) : le doigt qui glisse et le trait restent l'un sur l'autre.
const position = (x: number) => `calc(16px + (100% - 32px) * ${x / 100})`;

/**
 * Avant / après : deux images superposées et un curseur qui découvre la seconde.
 * Le curseur est un vrai `<input type="range">`, invisible, étendu sur toute
 * l'image : au doigt comme au clavier, on fait glisser le trait.
 */
export default function Comparaison({
  id,
  avant,
  apres,
  depart = 50,
  etiquette,
}: {
  id: string;
  avant: React.ReactNode;
  apres: React.ReactNode;
  depart?: number;
  etiquette: string;
}) {
  const [x, setX] = useState(depart);
  return (
    <div className="relative select-none overflow-hidden rounded-[18px] border border-[var(--trait)]">
      <div>{avant}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position(x)})` }}>
        {apres}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-[var(--accent)]" style={{ left: position(x) }}>
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--accent)] text-lg font-bold text-[var(--sur-accent)] shadow-lg">
          ⟷
        </span>
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-[var(--sombre)] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--sur-sombre)]">Avant</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--sur-accent)]">Après</span>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={x}
        onChange={(e) => setX(Number(e.target.value))}
        aria-label={etiquette}
        aria-valuetext={x >= 98 ? "Tout avant" : x <= 2 ? "Tout après" : `Après visible sur ${100 - x} %`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
