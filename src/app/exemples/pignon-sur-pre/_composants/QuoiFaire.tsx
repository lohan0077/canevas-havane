"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, PROJETS, euros, machine, prixMachine, tentePour, type Projet } from "./donnees";
import { Picto } from "./Pictos";

/**
 * L'accueil sans catalogue : « Tu veux faire quoi ? ». On touche un projet ; la réponse
 * arrive juste dessous — la tente ou la machine, les jours, le prix TTC livré — avec
 * l'option « avec chauffeur » pour les engins, la DT-DICT avant le bouton quand on
 * creuse, la mairie quand la fête est ouverte au public. Tout se calcule ici, dans le
 * navigateur, sur des prix d'exemple.
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
        aria-label="Ton projet"
        data-film="projets"
        className={projet ? "grid grid-cols-3 gap-1.5 sm:grid-cols-6" : "grid grid-cols-2 gap-3 lg:grid-cols-3"}
      >
        {PROJETS.map((p) => {
          const choisi = p.id === id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={choisi}
              data-projet={p.id}
              onClick={() => setId(p.id)}
              className={
                projet
                  ? `flex h-[66px] flex-col items-center justify-center gap-1 rounded-[14px] border text-[13px] font-semibold transition-colors ${
                      choisi ? "border-[var(--sombre)] bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"
                    }`
                  : "group flex min-h-[150px] flex-col justify-between rounded-[20px] border border-[var(--trait)] bg-[var(--carte)] p-4 text-left shadow-[0_18px_40px_-30px_rgba(34,49,27,.6)] transition-all hover:-translate-y-0.5 hover:border-[var(--encre)] active:scale-[0.98]"
              }
            >
              <span className={projet ? "" : "grid h-12 w-12 place-items-center rounded-full bg-[var(--fond)] text-[var(--sombre)] transition-colors group-hover:bg-[var(--sombre)] group-hover:text-[var(--sur-sombre)]"}>
                <Picto id={p.id} className={projet ? "h-6 w-6" : "h-8 w-8"} />
              </span>
              {projet ? (
                <span>
                  {p.court}
                  <span className="sr-only"> : {p.libelle}</span>
                </span>
              ) : (
                <span className="font-[family-name:var(--titres)] text-[21px] leading-tight sm:text-[23px]">{p.libelle}</span>
              )}
            </button>
          );
        })}
      </div>

      {projet && (
        <Reponse
          key={projet.id}
          projet={projet}
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
  projet,
  quantite,
  changerQuantite,
  chauffeur,
  changerChauffeur,
}: {
  projet: Projet;
  quantite: number;
  changerQuantite: (q: number) => void;
  chauffeur: boolean;
  changerChauffeur: (c: boolean) => void;
}) {
  const { min, max, pas, etiquette, unite } = projet.quantite;
  const rempli = ((quantite - min) / (max - min)) * 100;

  // Ce que dit la réponse : la tente ou les machines, le prix, la ligne d'avertissement.
  let titre: string;
  let detail: string | null = null;
  let total: number;
  let lienRegle: { href: string; texte: string };
  let reserver: string;
  let avecChauffeur = false;
  if (projet.genre === "tente") {
    const t = tentePour(quantite);
    titre = `Tente ${t.largeur} × ${t.longueur} m`;
    detail = `${t.invites} invités assis · capacité du fabricant`;
    total = t.prix;
    lienRegle = projet.public
      ? { href: `${DOSSIER}/le-bal`, texte: "Fête ouverte au public : la mairie d'abord, on t'aide" }
      : { href: `${DOSSIER}#pre`, texte: "Ça rentre dans ton pré ? Vérifie sur la vue du ciel" };
    reserver = `${DOSSIER}/reserver#t-${t.id}`;
  } else {
    const lignes = projet.lignes(quantite);
    const principale = machine(lignes[0].id);
    titre = principale.nom;
    if (lignes.length > 1) detail = `+ ${lignes.slice(1).map((l) => machine(l.id).nom.toLowerCase()).join(", + ")}`;
    avecChauffeur = chauffeur && Boolean(principale.chauffeur);
    total = lignes.reduce((s, l) => s + prixMachine(machine(l.id), l.jours, chauffeur), 0);
    lienRegle = { href: `${DOSSIER}/dt-dict`, texte: "Avant de creuser : ta DT-DICT, on t'aide" };
    reserver = `${DOSSIER}/disponibilites`;
  }

  return (
    <div id="reponse" className="scroll-mt-24 overflow-hidden rounded-[22px] border border-[var(--encre)] bg-[var(--carte)]">
      <div className="flex items-center justify-between gap-3 bg-[var(--sombre)] px-5 py-3 text-[var(--sur-sombre)]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em]">{projet.surtitre(quantite)}</p>
        <p className="font-[family-name:var(--titres)] text-[15px] italic text-[#F2C98A]">la réponse</p>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <label className="block space-y-2.5">
          <span className="flex items-baseline justify-between gap-3 text-sm font-semibold">
            <span className="uppercase tracking-[0.12em] text-[var(--doux)]">{etiquette}</span>
            <span className="font-[family-name:var(--titres)] text-2xl tabular-nums">{quantite} {unite}</span>
          </span>
          <input
            type="range"
            min={min}
            max={max}
            step={pas}
            value={quantite}
            onChange={(e) => changerQuantite(Number(e.target.value))}
            className="h-2.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[var(--carte)] [&::-moz-range-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[var(--carte)] [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:shadow"
            style={{ background: `linear-gradient(90deg, var(--sombre) ${rempli}%, var(--trait) ${rempli}%)` }}
          />
        </label>

        <div className="space-y-1">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">{projet.genre === "tente" ? "La tente" : "La machine"}</p>
          <p data-film="machine" className="font-[family-name:var(--titres)] text-[36px] leading-[0.98] tracking-[-0.02em] sm:text-[44px]">{titre}</p>
          {detail && <p className="text-[15px] text-[var(--doux)]">{detail}</p>}
        </div>

        <ul aria-live="polite" className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          <li className="flex items-baseline justify-between gap-3 py-3">
            <span className="font-semibold">{projet.duree(quantite)}</span>
            <span className="text-[13px] text-[var(--doux)]">exemple</span>
          </li>
          <li className="flex items-baseline justify-between gap-3 py-3">
            <span className="font-semibold">
              {projet.genre === "tente" ? "Livrée et montée" : avecChauffeur ? "Avec chauffeur" : "Livrée chez toi"} ·{" "}
              <span data-film="prix" className="font-[family-name:var(--titres)] text-[19px] tabular-nums">{euros(total)} TTC</span>
            </span>
            <span className="text-[13px] text-[var(--doux)]">exemple</span>
          </li>
          <li className="py-3">
            <Link href={lienRegle.href} className="flex items-baseline justify-between gap-3 font-semibold underline decoration-[var(--accent)] decoration-2 underline-offset-4">
              <span>{lienRegle.texte}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        </ul>

        {projet.genre === "engin" && (
          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-[16px] bg-[var(--fond)] p-4">
            <span>
              <span className="block text-lg font-semibold">Avec chauffeur</span>
              <span className="block text-[13px] text-[var(--doux)]">Il conduit, tu regardes. Carburant compris.</span>
            </span>
            <input type="checkbox" role="switch" checked={chauffeur} onChange={(e) => changerChauffeur(e.target.checked)} className="peer sr-only" />
            <span
              aria-hidden="true"
              className="relative h-8 w-14 shrink-0 rounded-full border border-[var(--encre)] bg-[var(--carte)] transition-colors after:absolute after:left-[3px] after:top-[3px] after:h-6 after:w-6 after:rounded-full after:bg-[var(--encre)] after:transition-transform peer-checked:bg-[var(--accent)] peer-checked:after:translate-x-6 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2"
            />
          </label>
        )}

        <Link href={reserver} className="flex h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] text-[17px] font-semibold text-[var(--sur-accent)] transition-transform hover:scale-[1.01]">
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
