"use client";

import { useState } from "react";
import Link from "next/link";
import { PotMini } from "./Pot";
import { AUTEURS, DOSSIER, plat } from "./donnees";

const METIERS = [...new Set(AUTEURS.map((a) => a.metier))];
const POTS = AUTEURS.reduce((n, a) => n + a.oeuvres.length, 0);

/**
 * La recherche du site, celle de la vidéo « Créer une marque » : on ne cherche pas un
 * produit, on cherche quelqu'un — un prénom, un métier, un lieu. Présentée comme le
 * fichier d'une bibliothèque : les réponses sont des auteurs, chacun avec sa page.
 * Tout se passe dans le navigateur.
 */
export default function Recherche() {
  const [texte, setTexte] = useState("");
  const q = plat(texte.trim());
  const trouves = q
    ? AUTEURS.filter((a) => [a.prenom, a.metier, a.lieu, ...a.oeuvres.map((o) => o.nom)].some((x) => plat(x).includes(q)))
    : [];

  return (
    <div data-film="recherche" className="relative">
      <div aria-hidden="true" className="absolute inset-0 translate-x-2.5 translate-y-2.5 border-2 border-[var(--encre)] bg-[var(--accent)]" />
      <div className="relative border-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="flex items-center justify-between gap-4 border-b-2 border-[var(--encre)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em]">
          <span>Fichier des auteurs</span>
          <span className="hidden text-[var(--doux)] sm:inline [font-variant-numeric:lining-nums]">{AUTEURS.length} auteurs · {POTS} pots</span>
        </div>
        <div className="space-y-5 p-5 sm:p-6">
          <label className="block space-y-2">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Tu cherches quelqu&apos;un&nbsp;?</span>
            <span className="flex items-center gap-3 border-b-2 border-[var(--encre)] focus-within:border-[var(--accent)]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m15.5 15.5 5 5" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                name="auteur"
                value={texte}
                onChange={(e) => setTexte(e.target.value)}
                placeholder="Un prénom, un métier, un lieu…"
                autoComplete="off"
                className="min-h-14 w-full min-w-0 bg-transparent font-[family-name:var(--titres)] text-[1.9rem] outline-none placeholder:text-[var(--doux)]"
              />
            </span>
          </label>
          {!q && (
            <ul className="flex flex-wrap gap-2" aria-label="Métiers">
              {METIERS.map((m) => (
                <li key={m}>
                  <button type="button" onClick={() => setTexte(m)} className="min-h-10 border border-[var(--trait)] bg-[var(--fond)] px-3.5 text-[15px] transition-colors hover:border-[var(--encre)]">
                    {m}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {q && (
            <ul data-film="suggestions" aria-live="polite" className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {trouves.length === 0 && <li className="py-4">Personne pour l&apos;instant. Essaie un métier : apicultrice, arboriculteur…</li>}
              {trouves.map((a) => (
                <li key={a.slug}>
                  <Link href={`${DOSSIER}/auteurs/${a.slug}`} className="group flex items-center gap-4 py-3">
                    <span className="hidden sm:block"><PotMini auteur={a} oeuvre={a.oeuvres[0]} petit /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-[family-name:var(--titres)] text-[2rem] font-semibold leading-tight group-hover:italic">{a.prenom}</span>
                      <span className="block text-[15px] text-[var(--doux)]">{a.metier} · {a.chiffre} {a.lieu}</span>
                    </span>
                    <span className="shrink-0 bg-[var(--encre)] px-2.5 py-1 text-sm font-semibold text-[var(--fond)] [font-variant-numeric:lining-nums]">n° {a.numero} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
