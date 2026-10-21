"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, GATEAUX, SAMEDI, TAILLES, euros, prix } from "./donnees";

const HEURES = ["10 h", "11 h", "12 h", "15 h", "17 h"];

/** Les douze gâteaux du samedi, un par case : commandés, ou encore libres. */
function Grille({ commandes, miens }: { commandes: number[]; miens: number[] }) {
  return (
    <ol className="grid grid-cols-6 gap-2" aria-label={`Les ${SAMEDI.capacite} gâteaux du ${SAMEDI.date}`}>
      {Array.from({ length: SAMEDI.capacite }, (_, k) => k + 1).map((n) => {
        const pris = commandes.includes(n);
        const mien = miens.includes(n);
        return (
          <li
            key={n}
            aria-label={`Gâteau ${n} : ${mien ? "le vôtre" : pris ? "commandé" : "libre"}`}
            className={`grid aspect-square place-items-center rounded-full border-2 text-sm font-bold tabular-nums ${
              mien ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : pris ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-dashed border-[var(--encre)] bg-[var(--carte)] text-[var(--encre)]"
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
    <div id="compteur-samedi" className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <p className="whitespace-nowrap font-[family-name:var(--titres)] text-5xl font-extrabold leading-none tabular-nums" aria-live="polite">
          {commandes.length}<span className="text-[var(--doux)]"> / {SAMEDI.capacite}</span>
        </p>
        <p className="text-right text-sm font-semibold">
          {restent > 0 ? `${restent} gâteau${restent > 1 ? "x" : ""} encore possible${restent > 1 ? "s" : ""}` : "Complet"}
          <span className="block font-normal text-[var(--doux)]">{SAMEDI.date}</span>
        </p>
      </div>
      <Grille commandes={commandes} miens={miens} />
      <p className="text-xs leading-relaxed text-[var(--doux)]">
        Douze, c&apos;est la vraie capacité du labo un samedi. Compteur d&apos;exemple : sur un vrai site, il suit les vraies commandes.
      </p>

      {restent === 0 && (
        <p role="status" className="rounded-2xl bg-[var(--encre)] p-4 font-semibold text-[var(--fond)]">
          Ce samedi est complet. Le {SAMEDI.suivant} est ouvert.
        </p>
      )}

      {!complet && restent > 0 && (
        <Link href={`${DOSSIER}/samedi`} className="inline-block rounded-full bg-[var(--accent)] px-6 py-3.5 font-bold text-[var(--sur-accent)]">
          Commander pour samedi
        </Link>
      )}

      {complet && restent > 0 && (
        <form
          className="space-y-5 rounded-[28px] border-2 border-[var(--encre)] bg-[var(--carte)] p-5 sm:p-7"
          onSubmit={(e) => {
            e.preventDefault();
            commander();
          }}
        >
          <fieldset className="space-y-2">
            <legend className="text-sm font-bold uppercase tracking-[0.14em]">Le gâteau</legend>
            <div className="grid grid-cols-3 gap-2">
              {GATEAUX.map((g) => (
                <label key={g.id} className={`cursor-pointer rounded-2xl border-2 px-2 py-3 text-center font-bold ${g.id === gateauId ? "border-[var(--accent)] bg-[#FFD9DF]" : "border-[var(--trait)]"}`}>
                  <input type="radio" name="gateau" value={g.id} checked={g.id === gateauId} onChange={() => { setGateauId(g.id); setLu(false); }} className="sr-only" />
                  {g.nom}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1">
              <span className="block text-sm font-bold uppercase tracking-[0.14em]">Parts</span>
              <select value={parts} onChange={(e) => setParts(Number(e.target.value))} className="w-full rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-3 py-2.5 text-lg">
                {TAILLES.map((t) => <option key={t} value={t}>{t} parts</option>)}
              </select>
            </label>
            <label className="space-y-1">
              <span className="block text-sm font-bold uppercase tracking-[0.14em]">Retrait</span>
              <select value={heure} onChange={(e) => setHeure(e.target.value)} className="w-full rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-3 py-2.5 text-lg">
                {HEURES.map((h) => <option key={h}>{h}</option>)}
              </select>
            </label>
          </div>
          <label className="block space-y-1">
            <span className="block text-sm font-bold uppercase tracking-[0.14em]">Prénom sur la plaque <span className="font-normal normal-case tracking-normal text-[var(--doux)]">(facultatif)</span></span>
            <input value={plaque} onChange={(e) => setPlaque(e.target.value.slice(0, 16))} placeholder="Léo" className="w-full rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-3 py-2.5 text-lg outline-none focus:border-[var(--accent)]" />
          </label>

          <div id="allergenes-commande" className="rounded-2xl bg-[#FFD9DF] p-4 space-y-2">
            <p className="text-sm font-bold uppercase tracking-[0.14em]">Avant de commander : les allergènes</p>
            <p className="text-lg font-bold">{gateau.nom} : {gateau.allergenes.join(", ").toLowerCase()}.</p>
            {gateau.precision && <p className="text-sm">{gateau.precision}</p>}
            <label className="flex items-start gap-3 pt-1">
              <input type="checkbox" checked={lu} onChange={(e) => setLu(e.target.checked)} className="mt-1 h-5 w-5 accent-[var(--accent)]" />
              <span className="text-sm">J&apos;ai lu la liste des allergènes de ce gâteau.</span>
            </label>
          </div>

          <p className="flex items-baseline justify-between text-xl font-extrabold">
            <span>Total TTC</span>
            <span className="tabular-nums">{euros(prix(gateau, parts) + (plaque ? 3 : 0))}</span>
          </p>
          <button type="submit" disabled={!lu} className="w-full rounded-full bg-[var(--accent)] px-6 py-4 text-lg font-extrabold text-[var(--sur-accent)] disabled:cursor-not-allowed disabled:bg-[var(--doux)]">
            Commander pour le {SAMEDI.date}
          </button>
          {!lu && <p className="text-xs text-[var(--doux)]">Cochez la case des allergènes pour pouvoir commander.</p>}
          {confirme && (
            <div role="status" className="rounded-2xl border-2 border-[var(--accent)] p-4 space-y-1">
              <p className="font-bold">{confirme}</p>
              <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est payé. Prix TTC d&apos;exemple, plaque en chocolat 3&nbsp;€.</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
