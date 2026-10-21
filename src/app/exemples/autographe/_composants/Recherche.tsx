"use client";

import { useState } from "react";
import Link from "next/link";
import { AUTEURS, DOSSIER, plat } from "./donnees";

const METIERS = [...new Set(AUTEURS.map((a) => a.metier))];

/**
 * La recherche du site, celle de la vidéo : on ne cherche pas un produit, on
 * cherche quelqu'un — un prénom, un métier, un lieu. Les réponses sont des
 * auteurs, chacun avec sa page. Tout se passe dans le navigateur.
 */
export default function Recherche({ sombre = false }: { sombre?: boolean }) {
  const [texte, setTexte] = useState("");
  const q = plat(texte.trim());
  const trouves = q
    ? AUTEURS.filter((a) => [a.prenom, a.metier, a.lieu, ...a.oeuvres.map((o) => o.nom)].some((x) => plat(x).includes(q)))
    : [];

  return (
    <div data-film="recherche" className="space-y-4">
      <label className="block space-y-2">
        <span className={`text-sm font-semibold uppercase tracking-[0.16em] ${sombre ? "" : "text-[var(--accent-texte)]"}`}>Tu cherches quelqu&apos;un ?</span>
        <input
          type="search"
          name="auteur"
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder="Un prénom, un métier, un lieu…"
          autoComplete="off"
          className="w-full min-h-14 rounded-none border-0 border-b-2 border-current bg-transparent px-0 font-[family-name:var(--titres)] text-3xl outline-none placeholder:text-[var(--doux)] focus:border-[var(--accent)]"
        />
      </label>
      {!q && (
        <ul className="flex flex-wrap gap-2" aria-label="Métiers">
          {METIERS.map((m) => (
            <li key={m}>
              <button type="button" onClick={() => setTexte(m)} className={`min-h-10 rounded-full border px-4 text-[15px] ${sombre ? "border-[#F6EFE3]/50" : "border-[var(--trait)] bg-[var(--carte)]"}`}>
                {m}
              </button>
            </li>
          ))}
        </ul>
      )}
      {q && (
        <ul data-film="suggestions" aria-live="polite" className={`divide-y border-y ${sombre ? "divide-[#F6EFE3]/25 border-[#F6EFE3]/25" : "divide-[var(--trait)] border-[var(--trait)]"}`}>
          {trouves.length === 0 && <li className="py-4">Personne pour l&apos;instant. Essaie un métier : apicultrice, arboriculteur…</li>}
          {trouves.map((a) => (
            <li key={a.slug}>
              <Link href={`${DOSSIER}/auteurs/${a.slug}`} className="flex items-baseline justify-between gap-4 py-4">
                <span>
                  <span className="block font-[family-name:var(--titres)] text-[1.9rem] leading-tight">{a.prenom}</span>
                  <span className="block text-[15px]">{a.metier} · {a.chiffre} {a.lieu}</span>
                </span>
                <span className="shrink-0 text-sm font-semibold">n° {a.numero} →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
