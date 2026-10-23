"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, GATEAUX, SAMEDI, TAILLES, euros, prix } from "./donnees";

const HEURES = ["10 h", "11 h", "12 h", "15 h", "17 h"];

/** Les douze gâteaux du samedi, un par case : commandés, ou encore libres. */
function Grille({ commandes, miens }: { commandes: number[]; miens: number[] }) {
  return (
    <ol className="grid grid-cols-6 gap-2 sm:gap-3" aria-label={`Les ${SAMEDI.capacite} gâteaux du ${SAMEDI.date}`}>
      {Array.from({ length: SAMEDI.capacite }, (_, k) => k + 1).map((n) => {
        const pris = commandes.includes(n);
        const mien = miens.includes(n);
        return (
          <li
            key={n}
            aria-label={`Gâteau ${n} : ${mien ? "le vôtre" : pris ? "commandé" : "libre"}`}
            className={`grid aspect-square place-items-center rounded-full border-2 font-[family-name:var(--titres)] text-lg tabular-nums transition-colors duration-500 ${
              mien ? "border-[var(--encre)] bg-[#F3D88A] text-[var(--encre)]" : pris ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-dashed border-[var(--encre)] bg-[var(--carte)] text-[var(--encre)]"
            }`}
          >
            {mien ? "★" : n}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Le samedi se commande en ligne, dans la limite de ce que le labo sort vraiment :
 * douze gâteaux. Le compteur part d'un exemple (neuf commandés) et suit les commandes
 * passées ici. Complet, il renvoie au samedi suivant. En mode `complet`, le
 * formulaire de commande, avec les allergènes du gâteau choisi juste avant le bouton.
 */
export default function Samedi({ complet = false }: { complet?: boolean }) {
  const [commandes, setCommandes] = useState<number[]>(SAMEDI.commandes);
  const [miens, setMiens] = useState<number[]>([]);
  const [gateauId, setGateauId] = useState(GATEAUX[0].id);
  const [parts, setParts] = useState(20);
  const [plaque, setPlaque] = useState("");
  const [heure, setHeure] = useState(HEURES[0]);
  const [lu, setLu] = useState(false);
  const [confirme, setConfirme] = useState<string | null>(null);
  const restent = SAMEDI.capacite - commandes.length;
  const gateau = GATEAUX.find((g) => g.id === gateauId) ?? GATEAUX[0];

  const commander = () => {
    const libre = Array.from({ length: SAMEDI.capacite }, (_, k) => k + 1).find((n) => !commandes.includes(n));
    if (!libre || !lu) return;
    setCommandes([...commandes, libre]);
    setMiens([...miens, libre]);
    setConfirme(`${gateau.nom}, ${parts} parts${plaque ? `, plaque « ${plaque} »` : ""} : à retirer le ${SAMEDI.date} à ${heure}.`);
    setLu(false);
  };

  return (
    <div className="space-y-6">
      <div id="compteur-samedi" className="scroll-mt-24 space-y-5 rounded-[2rem] bg-[var(--carte)] p-5 text-[var(--encre)] shadow-[0_40px_80px_-40px_rgba(61,29,19,0.6)] sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <p className="whitespace-nowrap font-[family-name:var(--titres)] text-[4.5rem] leading-none tabular-nums" aria-live="polite">
            {commandes.length}<span className="text-[var(--doux)]">&thinsp;/&thinsp;{SAMEDI.capacite}</span>
          </p>
          <p className="text-right text-[15px] font-bold">
            {restent > 0 ? `${restent} gâteau${restent > 1 ? "x" : ""} encore possible${restent > 1 ? "s" : ""}` : "Complet"}
            <span className="block font-normal text-[var(--doux)]">{SAMEDI.date}</span>
          </p>
        </div>
        <Grille commandes={commandes} miens={miens} />
        <p className="text-[13px] leading-relaxed text-[var(--doux)]">
          Douze, c&apos;est la vraie capacité du labo un samedi. Compteur d&apos;exemple : sur un vrai site, il suit les vraies commandes.
        </p>
        {restent === 0 && (
          <p role="status" className="rounded-2xl bg-[var(--encre)] p-4 font-bold text-[var(--fond)]">
            Ce samedi est complet. Le {SAMEDI.suivant} est ouvert.
          </p>
        )}
        {!complet && restent > 0 && (
          <Link href={`${DOSSIER}/samedi`} className="inline-flex min-h-13 items-center gap-3 rounded-full bg-[var(--encre)] px-7 py-3 font-bold text-[var(--fond)]">
            Commander pour samedi <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>

      {complet && restent > 0 && (
        <form
          className="space-y-5 rounded-[2rem] border-2 border-[var(--encre)] bg-[var(--carte)] p-5 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            commander();
          }}
        >
          <fieldset className="space-y-2">
            <legend className="text-[12px] font-bold uppercase tracking-[0.16em]">Le gâteau</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {GATEAUX.map((g) => (
                <label key={g.id} className={`cursor-pointer rounded-2xl border-2 px-2 py-3 text-center font-bold ${g.id === gateauId ? "border-[var(--encre)] bg-[#E9B7C0]" : "border-[var(--trait)]"}`}>
                  <input type="radio" name="gateau" value={g.id} checked={g.id === gateauId} onChange={() => { setGateauId(g.id); setLu(false); }} className="sr-only" />
                  {g.court}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1">
              <span className="block text-[12px] font-bold uppercase tracking-[0.16em]">Parts</span>
              <select value={parts} onChange={(e) => setParts(Number(e.target.value))} className="w-full rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-3 py-2.5 text-lg">
                {TAILLES.map((t) => <option key={t} value={t}>{t} parts</option>)}
              </select>
            </label>
            <label className="space-y-1">
              <span className="block text-[12px] font-bold uppercase tracking-[0.16em]">Retrait</span>
              <select value={heure} onChange={(e) => setHeure(e.target.value)} className="w-full rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-3 py-2.5 text-lg">
                {HEURES.map((h) => <option key={h}>{h}</option>)}
              </select>
            </label>
          </div>
          <label className="block space-y-1">
            <span className="block text-[12px] font-bold uppercase tracking-[0.16em]">Prénom sur la plaque <span className="font-normal normal-case tracking-normal text-[var(--doux)]">(facultatif)</span></span>
            <input value={plaque} onChange={(e) => setPlaque(e.target.value.slice(0, 16))} placeholder="Léo" className="w-full rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-3 py-2.5 text-lg outline-none placeholder:text-[var(--doux)] focus:border-[var(--encre)]" />
          </label>

          <div id="allergenes-commande" className="space-y-2 rounded-2xl bg-[#E9B7C0] p-4">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em]">Avant de commander : les allergènes</p>
            <p className="text-lg font-bold">{gateau.nom} : {gateau.allergenes.join(", ").toLowerCase()}.</p>
            {gateau.precision && <p className="text-sm">{gateau.precision}</p>}
            <label className="flex items-start gap-3 pt-1">
              <input type="checkbox" checked={lu} onChange={(e) => setLu(e.target.checked)} className="mt-1 h-5 w-5 accent-[#3D1D13]" />
              <span className="text-sm">J&apos;ai lu la liste des allergènes de ce gâteau.</span>
            </label>
          </div>

          <p className="flex items-baseline justify-between font-[family-name:var(--titres)] text-2xl">
            <span>Total TTC</span>
            <span className="tabular-nums">{euros(prix(gateau, parts) + (plaque ? 3 : 0))}</span>
          </p>
          <button type="submit" disabled={!lu} className="w-full rounded-full bg-[var(--encre)] px-6 py-4 text-lg font-bold text-[var(--fond)] disabled:cursor-not-allowed disabled:opacity-60">
            Commander pour le {SAMEDI.date}
          </button>
          {!lu && <p className="text-[13px] text-[var(--doux)]">Coche la case des allergènes pour pouvoir commander.</p>}
          {confirme && (
            <div role="status" className="space-y-1 rounded-2xl bg-[#F3D88A] p-4">
              <p className="font-bold">{confirme}</p>
              <p className="text-sm">Démonstration : rien n&apos;est envoyé, rien n&apos;est payé. Prix TTC d&apos;exemple, plaque en chocolat 3&nbsp;€.</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
