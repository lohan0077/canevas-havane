"use client";

import { useState } from "react";
import Image from "next/image";
import { photos } from "./donnees";

/**
 * La photo d'avant, celle d'après : on passe de l'une à l'autre. Sur la vraie page,
 * ce sont les photos de ta voiture, prises à l'atelier ; jamais la plaque.
 */
export default function Comparateur() {
  const [vue, setVue] = useState<"avant" | "apres">("avant");
  return (
    <div data-film="comparateur" className="space-y-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] border-[3px] border-[var(--trait)] bg-[var(--sombre)]">
        {(["avant", "apres"] as const).map((v) => (
          <Image
            key={v}
            src={photos[v].src}
            alt={photos[v].alt}
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            className={`object-cover transition-opacity duration-500 ${vue === v ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <p className="absolute left-3 top-3 rounded-md bg-[var(--fond)] px-3 py-1.5 font-[family-name:var(--titres)] text-xl font-bold">
          {vue === "avant" ? "Avant" : "Après"}
        </p>
      </div>
      <div role="group" aria-label="Photo" className="grid grid-cols-2 gap-2">
        {(["avant", "apres"] as const).map((v) => (
          <button
            key={v}
            type="button"
            data-film={v}
            aria-pressed={vue === v}
            onClick={() => setVue(v)}
            className={`h-14 rounded-md border-[3px] border-[var(--trait)] font-[family-name:var(--titres)] text-xl font-bold ${vue === v ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--carte)]"}`}
          >
            {v === "avant" ? "Avant" : "Après"}
          </button>
        ))}
      </div>
    </div>
  );
}
