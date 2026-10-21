"use client";

import { useState } from "react";
import { aApporter } from "./donnees";

/**
 * La seule question de l'accueil : qu'y a-t-il dans votre frigo ? On ne téléverse
 * rien — la photo reste sur le téléphone du patient, il la montre en séance. Le bouton
 * « Je l'apporterai » coche la liste de ce qu'on apporte mardi. Rien n'est envoyé.
 */
export default function Frigo() {
  const [coches, setCoches] = useState<string[]>([]);
  const note = coches.includes("photo");
  const basculer = (id: string) => setCoches((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-6 sm:p-9 space-y-6" data-film="frigo">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#F2C14E]/25 blur-2xl" />
      <div className="relative space-y-3">
        <p className="text-sm font-semibold text-[#F2C14E]">Avant la première séance</p>
        <h2 className="text-[38px] sm:text-5xl leading-[1.05]">Qu&apos;y a-t-il dans votre frigo&nbsp;?</h2>
        <p className="text-lg leading-relaxed text-[#D6E2DC]">Prenez-le en photo. Montrez-la-moi en séance. On part de là.</p>
      </div>

      {note ? (
        <div role="status" className="relative rounded-2xl bg-[#F2C14E] text-[#173B33] p-5 space-y-1" data-film="note">
          <p className="font-[family-name:var(--titres)] text-2xl">Noté · on en parle mardi</p>
          <p className="text-[15px]">La photo reste sur votre téléphone : le site ne la reçoit pas. Démonstration : rien n&apos;est envoyé.</p>
        </div>
      ) : (
        <button
          type="button"
          id="je-l-apporterai"
          onClick={() => basculer("photo")}
          className="relative w-full min-h-14 rounded-full bg-[#F2C14E] text-[#173B33] text-lg font-semibold"
        >
          Je l&apos;apporterai
        </button>
      )}

      <div className="relative space-y-2">
        <p className="text-sm font-semibold text-[#B8CBC3]">Ma liste pour mardi</p>
        <ul className="space-y-2">
          {aApporter.map((a) => {
            const fait = coches.includes(a.id);
            return (
              <li key={a.id}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={fait}
                  onClick={() => basculer(a.id)}
                  className="flex w-full items-start gap-3 rounded-2xl bg-white/[0.07] px-4 py-3 text-left"
                >
                  <span aria-hidden="true" className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 border-[#F2C14E] text-sm font-bold ${fait ? "bg-[#F2C14E] text-[#173B33]" : ""}`}>
                    {fait ? "✓" : ""}
                  </span>
                  <span>
                    <span className="block font-semibold">{a.libelle}</span>
                    <span className="block text-sm text-[#B8CBC3]">{a.detail}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
