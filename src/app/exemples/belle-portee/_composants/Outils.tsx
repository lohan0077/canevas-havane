"use client";

import { useState } from "react";
import Link from "next/link";
import { FOURCHETTES, SITUATIONS } from "./donnees";
import styles from "./Portee.module.css";

// « 1 100 – 1 500 € », espaces insécables, écrit à la main (Intl varie d'un navigateur à l'autre).
const milliers = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const fourchette = (a: number, b: number) => `${milliers(a)} – ${milliers(b)} €`;

/**
 * L'accueil (vidéo « Remplir l'agenda ») : une seule question, quatre situations. On en
 * touche une, et tout s'explique dessous — en mots simples, avec le texte qui s'applique.
 * Les identifiants `lbl-situation-…` servent au tournage.
 */
export function Situations() {
  const [choisie, setChoisie] = useState<number | null>(null);
  const s = choisie === null ? null : SITUATIONS[choisie];

  return (
    <div data-film="situations" className="w-full space-y-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {SITUATIONS.map((x, i) => (
          <button
            key={x.id}
            id={`lbl-situation-${x.id}`}
            type="button"
            aria-pressed={choisie === i}
            aria-controls="lbl-explication"
            onClick={() => setChoisie(i)}
            className={`group flex min-h-14 w-full items-center justify-between gap-4 border-2 border-[var(--encre)] px-5 py-3 text-left text-[17px] font-semibold transition-colors duration-300 ${
              choisie === i ? "bg-[var(--encre)] text-[var(--accent)]" : "bg-[var(--carte)] hover:bg-[var(--accent)]"
            }`}
          >
            <span className="flex items-center gap-3">
              <span aria-hidden="true" className="font-[family-name:var(--titres)] text-[13px] font-bold tabular-nums opacity-80">0{i + 1}</span>
              {x.choix}
            </span>
            <span aria-hidden="true" className="text-xl leading-none transition-transform group-hover:translate-x-1">→</span>
          </button>
        ))}
      </div>
      <div id="lbl-explication" aria-live="polite">
        {s && (
          <div key={s.id} className={`space-y-3 border-2 border-[var(--encre)] bg-[var(--carte)] p-5 text-left sm:p-6 ${styles.entree}`}>
            <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">
              <span aria-hidden="true" className="grid h-6 w-6 place-items-center bg-[var(--accent)] text-xs text-[var(--sur-accent)]">✓</span>
              {s.choix}
            </p>
            <p className="font-[family-name:var(--titres)] text-[26px] font-bold uppercase leading-[1.02] tracking-[-0.01em]">{s.titre}</p>
            <p className="leading-relaxed text-[var(--doux)]">{s.texte}</p>
            <Link href={s.lien.href} className="inline-flex min-h-11 items-center font-semibold underline decoration-[var(--accent)] decoration-[3px] underline-offset-4">
              {s.lien.libelle} →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Le prix au nombre de bornes (vidéo « Remplir l'agenda ») : − et +, la fourchette TTC
 * qui suit, et la part de chacun si les voisins partagent (le bornage se fait à frais
 * communs, C. civ., art. 646). Les identifiants `lbl-…` servent au tournage.
 */
export function Bornes() {
  const [n, setN] = useState(2);
  const [bas, haut] = FOURCHETTES[n];

  return (
    <div data-film="prix" className="space-y-6 border-2 border-[var(--encre)] bg-[var(--carte)] p-5 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p id="lbl-nb-libelle" className="text-[13px] font-bold uppercase tracking-[0.16em]">Nombre de bornes</p>
        <div className="flex items-center gap-3" role="group" aria-labelledby="lbl-nb-libelle">
          <button id="lbl-moins" type="button" aria-label="Une borne de moins" disabled={n <= 2} onClick={() => setN(n - 1)} className="grid h-12 w-12 place-items-center border-2 border-[var(--encre)] text-2xl font-bold disabled:opacity-40">−</button>
          <output aria-live="polite" className="w-10 text-center font-[family-name:var(--titres)] text-5xl font-bold tabular-nums">{n}</output>
          <button id="lbl-plus" type="button" aria-label="Une borne de plus" disabled={n >= 6} onClick={() => setN(n + 1)} className="grid h-12 w-12 place-items-center border-2 border-[var(--encre)] bg-[var(--accent)] text-2xl font-bold text-[var(--sur-accent)] disabled:opacity-40">+</button>
        </div>
      </div>
      {/* Le terrain, vu de dessus : un bord par borne posée. Décoratif. */}
      <svg aria-hidden="true" viewBox="0 0 300 120" className="h-auto w-full">
        <rect x="6" y="6" width="288" height="108" fill="#EFE8DA" stroke="#1E2A38" strokeWidth="2" strokeDasharray="6 5" />
        {[[6, 6], [294, 6], [294, 114], [6, 114], [150, 6], [150, 114]].map(([x, y], k) => (
          <g key={k} className="transition-opacity duration-300" opacity={k < n ? 1 : 0.18}>
            <rect x={x - 7} y={y - 7} width="14" height="14" fill={k < n ? "#F2B134" : "#FBF8F2"} stroke="#1E2A38" strokeWidth="2" />
          </g>
        ))}
      </svg>
      <div className="space-y-2 bg-[var(--sombre)] p-5 text-[var(--sur-sombre)] sm:p-6" aria-live="polite">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#F2B134]">Fourchette TTC</p>
        <p className="whitespace-nowrap font-[family-name:var(--titres)] text-[30px] font-bold tabular-nums sm:text-[44px]">{fourchette(bas, haut)}</p>
        <p className="text-sm text-[var(--sur-sombre)]/90">Déplacement, recherche des titres et procès-verbal compris · exemple</p>
        <p className="border-t border-white/20 pt-3 text-sm">
          À partager avec ton voisin : le bornage se fait à frais communs. À deux, environ{" "}
          <b className="whitespace-nowrap tabular-nums">{fourchette(bas / 2, haut / 2)}</b> chacun.
        </p>
      </div>
      <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple pour un particulier. Le devis écrit, remis avant toute intervention, tient compte du terrain et des titres.</p>
    </div>
  );
}
