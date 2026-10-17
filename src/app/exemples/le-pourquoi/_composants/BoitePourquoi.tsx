"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, gestes, questionsHebdo } from "./donnees";

const VIDES = ["pourquoi", "osteopathe", "osteo", "est", "que", "les", "sur", "des", "vos", "vous", "une", "pas", "fait", "il", "elle"];
const plat = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " ");

/**
 * Une boîte de recherche, comme celle de Google, mais qui ne cherche que dans les
 * pages du cabinet. La saisie reste dans le navigateur : rien n'est envoyé, rien
 * n'est enregistré.
 */
export default function BoitePourquoi() {
  const [saisie, setSaisie] = useState("");
  const pages = [
    ...gestes.map((g) => ({ titre: g.question, cherche: `${g.question} ${g.recherche}`, href: `${DOSSIER}/gestes/${g.slug}`, prete: true })),
    ...questionsHebdo.filter((q) => !q.geste).map((q) => ({ titre: q.q, cherche: q.q, href: `${DOSSIER}#questions`, prete: false })),
  ];
  const mots = plat(saisie).split(/\s+/).filter((m) => m.length > 2 && !VIDES.includes(m));
  // Les pages qui contiennent le plus de mots de la question, et elles seules.
  const notes = pages.map((p) => ({ p, n: mots.filter((m) => plat(p.cherche).includes(m)).length }));
  const meilleure = Math.max(0, ...notes.map((x) => x.n));
  const trouves = mots.length ? notes.filter((x) => x.n > 0 && x.n === meilleure).map((x) => x.p) : pages.slice(0, 3);

  return (
    <div className="rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] p-5 sm:p-7 space-y-4" data-film="boite">
      <label className="block space-y-2">
        <span className="font-[family-name:var(--titres)] text-sm font-semibold">Votre question</span>
        <span className="flex items-center gap-3 rounded-full border-2 border-[var(--encre)] bg-[var(--fond)] px-5 min-h-14">
          <span aria-hidden="true" className="font-[family-name:var(--titres)] text-xl font-bold text-[var(--accent-texte)]">?</span>
          <input
            id="lp-question"
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
            placeholder="pourquoi l'ostéopathe…"
            autoComplete="off"
            className="w-full bg-transparent text-lg outline-none placeholder:text-[var(--doux)]"
          />
        </span>
      </label>
      <ul aria-live="polite" className="divide-y divide-[var(--trait)]">
        {trouves.map((p) => (
          <li key={p.titre}>
            <Link href={p.href} className="flex items-center justify-between gap-4 py-3.5">
              <span className="font-[family-name:var(--titres)] text-lg font-medium">{p.titre}</span>
              <span className="shrink-0 text-sm text-[var(--doux)]">{p.prete ? "Lire →" : "Bientôt"}</span>
            </Link>
          </li>
        ))}
        {trouves.length === 0 && (
          <li className="py-3.5 text-[var(--doux)]">
            Pas encore de page pour cette question. Posez-la en séance : elle deviendra peut-être la question de la semaine.
          </li>
        )}
      </ul>
      <p className="text-sm text-[var(--doux)]">La recherche se fait sur votre téléphone : rien n&apos;est envoyé.</p>
    </div>
  );
}
