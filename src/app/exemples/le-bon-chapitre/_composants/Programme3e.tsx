"use client";

import { useState } from "react";
import { PROGRAMME_3E } from "./donnees";

/** Le programme de 3e : on coche ce qui bloque, le site dit par où commencer. Rien n'est envoyé. */
export default function Programme3e() {
  const [coches, setCoches] = useState<string[]>([]);
  const premier = PROGRAMME_3E.find((p) => coches.includes(p.nom));

  return (
    <div className="space-y-4">
      <ul className="divide-y divide-[var(--trait)] border-y-2 border-[var(--encre)]">
        {PROGRAMME_3E.map((p) => {
          const coche = coches.includes(p.nom);
          return (
            <li key={p.nom}>
              <label className="flex cursor-pointer items-start gap-4 py-4">
                <input
                  type="checkbox"
                  checked={coche}
                  onChange={() => setCoches(coche ? coches.filter((c) => c !== p.nom) : [...coches, p.nom])}
                  className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]"
                />
                <span>
                  <span className="block text-lg font-bold">{p.nom}</span>
                  <span className="block text-[var(--doux)]">{p.detail}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <p aria-live="polite" className="font-[family-name:var(--f-caveat)] text-3xl text-[var(--accent-texte)] -rotate-1 min-h-[2.5rem]">
        {premier ? `On commencerait par : ${premier.nom.toLowerCase()}.` : "Cochez ce qui bloque."}
      </p>
    </div>
  );
}
