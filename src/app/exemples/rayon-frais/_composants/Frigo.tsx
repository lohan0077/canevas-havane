"use client";

import { useState } from "react";
import { aApporter } from "./donnees";

/**
 * La seule question de l'accueil : qu'y a-t-il dans votre frigo ? On ne téléverse
 * rien — la photo reste sur le téléphone du patient, il la montre en séance. Le bouton
 * « Je l'apporterai » coche la liste de ce qu'on apporte mardi. Rien n'est envoyé.
 * `data-film=frigo` et `#je-l-apporterai` servent au tournage de la vidéo.
 */
export default function Frigo() {
  const [coches, setCoches] = useState<string[]>([]);
  const note = coches.includes("photo");
  const basculer = (id: string) => setCoches((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  return (
    <div className="overflow-hidden rounded-[2rem] bg-[var(--fond)] text-[var(--encre)] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)]" data-film="frigo">
      <div className="flex items-center justify-between gap-3 border-b-2 border-dashed border-[var(--trait)] px-6 py-3.5 sm:px-8">
        <p className="font-[family-name:var(--titres)] text-[17px] font-bold">Avant la première séance</p>
        <p className="shrink-0 whitespace-nowrap rounded-full bg-[var(--sombre)] px-3 py-1 text-[13px] font-bold text-[var(--sur-sombre)]">1 question</p>
      </div>
      <div className="space-y-6 p-6 sm:p-8">
        <div className="space-y-3">
          <h2 className="font-[family-name:var(--titres)] text-[2.4rem] font-bold leading-[1.02] tracking-[-0.02em] sm:text-[3.2rem]">
            Qu&apos;y a-t-il dans votre frigo&nbsp;?
          </h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Prenez-le en photo. Montrez-la-moi à la première séance. On part de là.</p>
        </div>

        {note ? (
          <div role="status" className="space-y-1 rounded-2xl bg-[#F2C94C] p-5 text-[#1F3B24]" data-film="note">
            <p className="font-[family-name:var(--titres)] text-2xl font-bold">Noté · on en parle mardi</p>
            <p className="text-[15px]">La photo reste sur votre téléphone : le site ne la reçoit pas. Démonstration : rien n&apos;est envoyé.</p>
          </div>
        ) : (
          <button
            type="button"
            id="je-l-apporterai"
            onClick={() => basculer("photo")}
            className="w-full min-h-14 rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-xl font-bold text-white transition-transform hover:scale-[1.01]"
          >
            Je l&apos;apporterai
          </button>
        )}

        <div className="space-y-2">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--doux)]">Ma liste pour mardi</p>
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
                    className={`flex w-full items-start gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-colors ${fait ? "border-[var(--sombre)] bg-white" : "border-[var(--trait)] bg-white"}`}
                  >
                    <span aria-hidden="true" className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 border-[var(--sombre)] text-sm font-bold ${fait ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : ""}`}>
                      {fait ? "✓" : ""}
                    </span>
                    <span>
                      <span className="block font-semibold">{a.libelle}</span>
                      <span className="block text-sm text-[var(--doux)]">{a.detail}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
