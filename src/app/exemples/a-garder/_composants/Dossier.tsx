"use client";

import { useState } from "react";
import styles from "./Facade.module.css";

// Les trois pièces exigées pour tout projet d'enseigne : Code de l'environnement,
// art. R. 581-16, 1°, a), b) et c) (version en vigueur depuis le 01/07/2026).
const PIECES = [
  { lettre: "a", titre: "Mise en situation de l'enseigne", detail: "L'enseigne dessinée à sa place, à l'échelle, sur la façade." },
  { lettre: "b", titre: "Vue de la façade avec et sans l'enseigne", detail: "Ton montage avant / après, celui que tu as reçu." },
  { lettre: "c", titre: "Document graphique d'intégration", detail: "Ce qui permet d'apprécier comment l'enseigne s'intègre à l'immeuble : dimensions, matériaux, couleurs." },
];

/**
 * Le dossier, pièce par pièce : on touche une pièce, elle passe à « préparée ».
 * Les trois prêtes, le bouton « Signer la demande » s'ouvre ; la signature
 * s'écrit, et il ne reste qu'à déposer. Une démonstration : rien n'est envoyé.
 */
export default function Dossier() {
  const [pretes, setPretes] = useState<boolean[]>(PIECES.map(() => false));
  const [signe, setSigne] = useState(false);
  const tout = pretes.every(Boolean);

  return (
    <div data-film="dossier" className="rounded-[26px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8 space-y-5">
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Demande d&apos;autorisation · exemple</p>
        <p className="font-[family-name:var(--titres)] text-3xl">Enseigne · Boulangerie</p>
      </div>
      <ul className="space-y-3">
        {PIECES.map((p, i) => (
          <li key={p.lettre}>
            <button
              type="button"
              id={`fa-piece-${p.lettre}`}
              aria-pressed={pretes[i]}
              disabled={signe}
              onClick={() => setPretes(pretes.map((v, j) => (j === i ? !v : v)))}
              className={`flex w-full items-start gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${pretes[i] ? "border-[var(--accent)] bg-[var(--fond)]" : "border-[var(--trait)]"}`}
            >
              <span
                aria-hidden="true"
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg font-bold ${pretes[i] ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border-2 border-[var(--trait)] text-[var(--doux)]"}`}
              >
                {pretes[i] ? "✓" : p.lettre}
              </span>
              <span className="space-y-1">
                <span className="block font-bold leading-snug">{p.titre}</span>
                <span className="block text-sm text-[var(--doux)]">{p.detail}</span>
                <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">{pretes[i] ? "Préparée par l'atelier" : "À préparer"}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="rounded-2xl border border-dashed border-[var(--trait)] p-4 space-y-3">
        <p className="text-sm font-bold">Signature de l&apos;exploitant</p>
        <div className="h-16">
          {signe && (
            <svg viewBox="0 0 220 60" className={`h-16 w-auto ${styles.signature}`} aria-hidden="true">
              <path d="M8 44 C 24 6, 34 6, 30 40 C 28 54, 44 30, 56 26 C 66 22, 60 46, 74 40 C 90 32, 92 16, 104 20 C 116 24, 104 48, 120 44 C 140 38, 150 26, 168 30 C 182 33, 196 36, 212 28" fill="none" stroke="var(--accent)" strokeWidth="3.2" strokeLinecap="round" />
            </svg>
          )}
        </div>
        {!signe ? (
          <button
            type="button"
            id="fa-signer"
            disabled={!tout}
            onClick={() => setSigne(true)}
            className="w-full min-h-[54px] rounded-full bg-[var(--accent)] px-6 text-lg font-bold text-[var(--sur-accent)] disabled:cursor-not-allowed disabled:bg-[var(--trait)] disabled:text-[var(--encre)]"
          >
            {tout ? "Signer la demande" : `${pretes.filter(Boolean).length}/3 pièces préparées`}
          </button>
        ) : (
          <div role="status" className="space-y-1">
            <p className="font-bold">Signée. Il ne reste qu&apos;à la déposer à la mairie.</p>
            <p className="text-sm text-[var(--doux)]">En trois exemplaires : par lettre recommandée, par voie électronique ou au guichet (art. R. 581-9).</p>
            <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
          </div>
        )}
      </div>
      {signe && (
        <button
          type="button"
          onClick={() => {
            setSigne(false);
            setPretes(PIECES.map(() => false));
          }}
          className="text-sm font-semibold underline underline-offset-4"
        >
          Recommencer
        </button>
      )}
    </div>
  );
}
