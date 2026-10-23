"use client";

import { useState } from "react";
import { entreprise } from "./donnees";

const ELEMENTS = [
  { id: "adresse", titre: "L'adresse exacte du terrain", detail: "Avec la commune : la déclaration se fait par emplacement." },
  { id: "plan", titre: "Le tracé de ta tranchée", detail: "Un trait sur une vue du ciel suffit : d'où elle part, où elle arrive." },
  { id: "profondeur", titre: "La profondeur et la largeur", detail: "Par exemple 50 cm de profondeur, la largeur du godet de 30 cm." },
  { id: "dates", titre: "Les dates des travaux", detail: "Le samedi que tu vises, et une date de repli." },
  { id: "machine", titre: "La machine utilisée", detail: "Une mini-pelle de 1,5 tonne : on te donne le libellé exact." },
];

/**
 * Ce qu'il faut avoir sous la main pour remplir sa DT-DICT : on coche, on voit ce qui
 * manque, et quand tout y est, on propose de la remplir ensemble au téléphone.
 * Rien n'est enregistré : les cases vivent dans la page.
 */
export default function ChecklistDict() {
  const [coches, setCoches] = useState<string[]>([]);
  const fait = coches.length;
  const pret = fait === ELEMENTS.length;

  return (
    <div className="rounded-[22px] border border-[var(--encre)] bg-[var(--carte)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 bg-[var(--sombre)] px-5 py-3 text-[var(--sur-sombre)]">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em]">Ce qu&apos;il te faut</p>
        <p className="text-[13px] font-bold tabular-nums text-[#F2C98A]">{fait} / {ELEMENTS.length}</p>
      </div>
      <ul className="divide-y divide-[var(--trait)]">
        {ELEMENTS.map((e) => {
          const coche = coches.includes(e.id);
          return (
            <li key={e.id}>
              <label className="flex cursor-pointer items-start gap-4 px-5 py-4">
                <input
                  type="checkbox"
                  checked={coche}
                  onChange={() => setCoches(coche ? coches.filter((c) => c !== e.id) : [...coches, e.id])}
                  className="mt-1 h-6 w-6 shrink-0 accent-[var(--accent)]"
                />
                <span>
                  <span className={`block font-bold ${coche ? "line-through decoration-2" : ""}`}>{e.titre}</span>
                  <span className="block text-[15px] text-[var(--doux)]">{e.detail}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <div aria-live="polite" className={`px-5 py-4 border-t border-[var(--encre)] ${pret ? "bg-[var(--accent)] text-[var(--sur-accent)]" : ""}`}>
        {pret ? (
          <p className="font-bold">
            Tout y est. Appelle-nous au <span className="tabular-nums">{entreprise.telephone}</span> : on la remplit ensemble, en un quart d&apos;heure.
            <span className="block text-[13px] font-medium">Démonstration : numéro fictif, rien n&apos;est envoyé.</span>
          </p>
        ) : (
          <p className="text-[15px] text-[var(--doux)]">Coche ce que tu as déjà. Ce qui manque, on le trouve ensemble.</p>
        )}
      </div>
    </div>
  );
}
