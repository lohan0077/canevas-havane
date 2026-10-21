"use client";

import { useState } from "react";
import { MONTURES } from "./donnees";
import Visage from "./Visage";

const CINQ = MONTURES.slice(0, 5);

/**
 * Le miroir et l'écran, côte à côte dans le même cadre : un bouton retourne le
 * visage comme le ferait un miroir. On peut aussi lui poser l'une des cinq
 * premières montures. Rien n'est filmé : c'est un dessin.
 */
export default function Miroir() {
  const [miroir, setMiroir] = useState(true);
  const [monture, setMonture] = useState(0);
  const m = CINQ[monture];

  return (
    <div className="space-y-6" data-film="miroir">
      <div className="grid grid-cols-2 gap-2 rounded-full border border-[#3A4A5C] p-1.5" role="group" aria-label="Comment te voir">
        {[
          { valeur: true, libelle: "Le miroir" },
          { valeur: false, libelle: "À l'endroit" },
        ].map((b) => (
          <button
            key={b.libelle}
            type="button"
            aria-pressed={miroir === b.valeur}
            onClick={() => setMiroir(b.valeur)}
            data-film={b.valeur ? "voir-miroir" : "voir-endroit"}
            className={`min-h-12 rounded-full text-base font-semibold transition-colors ${miroir === b.valeur ? "bg-[var(--sur-sombre)] text-[var(--sombre)]" : "text-[var(--sur-sombre)]"}`}
          >
            {b.libelle}
          </button>
        ))}
      </div>

      <figure className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-full border-[10px] border-[#C9CED6] bg-[#E9EDF1]">
        <Visage
          monture={{ forme: m.forme, couleur: m.couleur }}
          inverse={miroir}
          titre={miroir ? "Ton visage dans le miroir : la raie à droite, le grain de beauté à gauche, le pull à l'envers" : "Ton visage à l'endroit : la raie à gauche, le grain de beauté à droite, comme les autres te voient"}
          className="absolute inset-x-[12%] bottom-0 w-[76%]"
        />
        <figcaption className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-[var(--sombre)] px-4 py-1.5 text-sm font-bold text-[var(--sur-sombre)]" aria-live="polite">
          {miroir ? "À l'envers" : "À l'endroit"}
        </figcaption>
      </figure>

      <p className="text-center text-[15px] leading-relaxed text-[#C9CED6]" aria-live="polite">
        {miroir
          ? "Dans le miroir, la raie passe à droite, le grain de beauté à gauche, et le pull dit « RUOJNOB »."
          : "Voilà ce que voient les autres. Et ce que montrent les photos."}
      </p>

      <div className="space-y-2">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[#C9CED6]">Essayer une monture</p>
        <div className="flex flex-wrap justify-center gap-2">
          {CINQ.map((x, i) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={monture === i}
              onClick={() => setMonture(i)}
              className={`min-h-10 rounded-full border px-4 text-sm font-semibold ${monture === i ? "border-[#F29A84] bg-[#F29A84] text-[var(--sombre)]" : "border-[#3A4A5C] text-[var(--sur-sombre)]"}`}
            >
              {x.nom}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
