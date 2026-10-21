"use client";

import { useState } from "react";
import Link from "next/link";
import Maison from "./Maison";
import { DOSSIER, MODELES, type Modele } from "./donnees";

/**
 * « Ta maison ressemble à laquelle ? » Trois pavillons des années 70 ; on choisit le sien,
 * et l'on voit ce qui a été fait de la même maison. Projets d'exemple, dessinés.
 */
export default function ChoixMaison() {
  const [choix, setChoix] = useState<Modele | null>(null);
  const m = MODELES.find((x) => x.id === choix);

  return (
    <div className="space-y-6">
      <div role="radiogroup" aria-label="Ta maison" data-film="modeles" className="grid grid-cols-3 gap-2.5">
        {MODELES.map((x) => {
          const actif = choix === x.id;
          return (
            <button
              key={x.id}
              type="button"
              role="radio"
              aria-checked={actif}
              data-film={`modele-${x.id}`}
              onClick={() => setChoix(x.id)}
              className={`rounded-[20px] border-2 p-2 pb-3 text-center transition-all ${
                actif ? "border-[var(--encre)] bg-[var(--carte)] shadow-[0_8px_0_var(--accent)]" : choix ? "border-[var(--trait)] bg-[var(--carte)] opacity-80" : "border-[var(--trait)] bg-[var(--carte)]"
              }`}
            >
              <Maison modele={x.id} className="block h-auto w-full" libelle={`Pavillon ${x.nom.toLowerCase()}`} />
              <span className="mt-1.5 block font-[family-name:var(--titres)] text-[15px] font-bold leading-tight">{x.nom}</span>
            </button>
          );
        })}
      </div>

      {m ? (
        <div key={m.id} data-film="avant-apres" className="overflow-hidden rounded-[24px] border-2 border-[var(--encre)] bg-[var(--carte)]">
          <div className="grid grid-cols-2">
            <figure className="border-r-2 border-[var(--encre)] bg-[var(--fond)] p-3">
              <Maison modele={m.id} className="block h-auto w-full" libelle={`La même maison, avant : ${m.avant.texte}`} />
              <figcaption className="mt-2 space-y-0.5">
                <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Avant · {m.avant.annee}</span>
                <span className="block text-[15px] font-semibold leading-snug">{m.avant.texte}</span>
              </figcaption>
            </figure>
            <figure className="p-3">
              <Maison modele={m.id} apres className="block h-auto w-full" libelle={`La même maison, après : ${m.apres}`} />
              <figcaption className="mt-2 space-y-0.5">
                <span className="block text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Après</span>
                <span className="block text-[15px] font-semibold leading-snug">{m.apres}</span>
              </figcaption>
            </figure>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[var(--encre)] px-4 py-3">
            <span className="text-[14px]">{m.budget} · {m.duree} · <strong>projet d&apos;exemple</strong></span>
            <Link href={`${DOSSIER}/maisons#${m.id}`} className="text-[14px] font-bold underline underline-offset-4">Le détail</Link>
          </div>
        </div>
      ) : (
        <p className="rounded-[20px] border-2 border-dashed border-[var(--trait)] px-5 py-6 text-center text-[var(--doux)]">
          Touche la tienne : on te montre ce qu&apos;on a fait de la même.
        </p>
      )}
    </div>
  );
}
