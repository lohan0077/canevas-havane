"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, PROJETS, euros, machine, prixMachine } from "./donnees";
import { Picto } from "./Pictos";

/**
 * L'accueil sans catalogue : « Tu veux faire quoi ? ». On touche un chantier ; la
 * réponse arrive juste dessous — la machine, les jours, le prix TTC livré — avec
 * l'option « avec chauffeur » et la DT-DICT avant le bouton. Tout se calcule ici,
 * dans le navigateur, sur des prix d'exemple.
 */
export default function QuoiFaire() {
  const [id, setId] = useState<string | null>(null);
  const [quantites, setQuantites] = useState<Record<string, number>>(() =>
    Object.fromEntries(PROJETS.map((p) => [p.id, p.quantite.depart])),
  );
  const [chauffeur, setChauffeur] = useState(false);
  const projet = PROJETS.find((p) => p.id === id) ?? null;

  return (
    <div className="min-w-0 space-y-5">
      <div
        role="radiogroup"
        aria-label="Ton chantier"
        data-film="projets"
        className={projet ? "grid grid-cols-4 gap-1.5" : "grid grid-cols-2 gap-3"}
      >
        {PROJETS.map((p) => {
          const choisi = p.id === id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={choisi}
              onClick={() => setId(p.id)}
              className={
                projet
                  ? `flex h-[68px] flex-col items-center justify-center gap-1 rounded-[12px] border text-[13px] font-bold transition-colors ${
                      choisi ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--encre)] bg-[var(--fond)]"
                    }`
                  : "group flex min-h-[112px] flex-col justify-between rounded-[14px] border border-[var(--encre)] bg-[var(--fond)] p-4 text-left transition-transform active:scale-[0.98] hover:bg-[var(--carte)]"
              }
            >
              <Picto id={p.id} className={projet ? "h-6 w-6" : "h-10 w-10"} />
              {projet ? (
                <span>
                  {p.court}
                  <span className="sr-only"> : {p.libelle}</span>
                </span>
              ) : (
                <span className="text-[17px] font-bold leading-tight">{p.libelle}</span>
              )}
            </button>
          );
        })}
      </div>

      {projet && (
        <Reponse
          key={projet.id}
          projetId={projet.id}
          quantite={quantites[projet.id]}
          changerQuantite={(q) => setQuantites({ ...quantites, [projet.id]: q })}
          chauffeur={chauffeur}
          changerChauffeur={setChauffeur}
        />
      )}
    </div>
  );
}

function Reponse({
  projetId,
  quantite,
  changerQuantite,
  chauffeur,
  changerChauffeur,
}: {
  projetId: string;
  quantite: number;
  changerQuantite: (q: number) => void;
  chauffeur: boolean;
  changerChauffeur: (c: boolean) => void;
}) {
  const projet = PROJETS.find((p) => p.id === projetId)!;
  const { min, max, pas, etiquette, unite } = projet.quantite;
  const lignes = projet.lignes(quantite);
  const principale = machine(lignes[0].id);
  const total = lignes.reduce((t, l) => t + prixMachine(machine(l.id), l.jours, chauffeur), 0);
  const rempli = ((quantite - min) / (max - min)) * 100;

  return (
    <div id="reponse" className="scroll-mt-20 rounded-[18px] border border-[var(--encre)] bg-[var(--carte)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--encre)] bg-[var(--encre)] px-5 py-2.5 text-[var(--fond)]">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em]">{projet.surtitre(quantite)}</p>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Réponse</p>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        <label className="block space-y-2.5">
          <span className="flex items-baseline justify-between gap-3 text-sm font-semibold">
            <span className="uppercase tracking-[0.12em] text-[var(--doux)]">{etiquette}</span>
            <span className="font-[family-name:var(--titres)] text-2xl font-black tabular-nums">{quantite} {unite}</span>
          </span>
          <input
            type="range"
            min={min}
            max={max}
            step={pas}
            value={quantite}
            onChange={(e) => changerQuantite(Number(e.target.value))}
            className="w-full h-2.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[var(--encre)] [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--accent)] [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[var(--encre)]"
            style={{ background: `linear-gradient(90deg, var(--encre) ${rempli}%, var(--trait) ${rempli}%)` }}
          />
        </label>

        <div className="space-y-1">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--doux)]">La machine</p>
          <p className="font-[family-name:var(--titres)] text-[34px] sm:text-[42px] font-black uppercase leading-[0.95] tracking-[-0.02em]">
            {principale.nom}
          </p>
          {lignes.length > 1 && (
            <p className="text-[15px] text-[var(--doux)]">
              + {lignes.slice(1).map((l) => machine(l.id).nom.toLowerCase()).join(", + ")}
            </p>
          )}
        </div>

        <ul aria-live="polite" className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          <li className="flex items-baseline justify-between gap-3 py-3">
            <span className="font-semibold">{projet.duree(quantite)}</span>
            <span className="text-[13px] text-[var(--doux)]">exemple</span>
          </li>
          <li className="flex items-baseline justify-between gap-3 py-3">
            <span className="font-semibold">
              {chauffeur ? "Avec chauffeur" : "Livrée chez toi"} ·{" "}
              <span data-film="prix" className="font-[family-name:var(--titres)] font-black tabular-nums">{euros(total)} TTC</span>
            </span>
            <span className="text-[13px] text-[var(--doux)]">exemple</span>
          </li>
          <li className="py-3">
            <Link href={`${DOSSIER}/dt-dict`} className="flex items-baseline justify-between gap-3 font-semibold underline decoration-[var(--accent)] decoration-[3px] underline-offset-4">
              <span>Avant de creuser : ta DT-DICT, on t&apos;aide</span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        </ul>

        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <span>
            <span className="block font-bold">Avec chauffeur</span>
            <span className="block text-[13px] text-[var(--doux)]">Il conduit, tu regardes. Carburant compris.</span>
          </span>
          <input
            type="checkbox"
            role="switch"
            checked={chauffeur}
            onChange={(e) => changerChauffeur(e.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className="relative h-8 w-14 shrink-0 rounded-full border border-[var(--encre)] bg-[var(--fond)] transition-colors peer-checked:bg-[var(--accent)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 after:absolute after:top-[3px] after:left-[3px] after:h-6 after:w-6 after:rounded-full after:bg-[var(--encre)] after:transition-transform peer-checked:after:translate-x-6"
          />
        </label>

        <Link
          href={`${DOSSIER}/disponibilites`}
          className="flex h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] text-[17px] font-black uppercase tracking-[0.04em] text-[var(--sur-accent)] border border-[var(--encre)]"
        >
          Réserver mon samedi
        </Link>

        <p className="text-[13px] leading-relaxed text-[var(--doux)]">
          Estimation d&apos;exemple : {projet.hypothese.charAt(0).toLowerCase() + projet.hypothese.slice(1)} Ton terrain peut
          changer la donne : on en parle au téléphone. Prix TTC, livraison et reprise comprises à 20 km.
        </p>
      </div>
    </div>
  );
}
