"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, QUESTIONS, SELON, diagnostics, euros, type Bien, type Permis, type Projet } from "./donnees";

const SIGNES = { oui: "✓", non: "✕", peut: "?" } as const;
const LIBELLES = { oui: "à faire", non: "pas pour ce bien", peut: "selon ton bien" } as const;

/**
 * Les trois questions de l'accueil, puis la liste des diagnostics et le prix du pack.
 * La règle vient des fiches Service-Public F10798 (vente) et F33463 (location) ; tout se
 * calcule dans le navigateur, rien n'est envoyé.
 */
export default function Diagnostics() {
  const [bien, setBien] = useState<Bien | null>(null);
  const [permis, setPermis] = useState<Permis | null>(null);
  const [projet, setProjet] = useState<Projet | null>(null);
  const [detail, setDetail] = useState(false);
  const pret = bien && permis && projet;
  const lignes = pret ? diagnostics(bien, permis, projet) : [];
  const pack = lignes.reduce((t, l) => t + (l.statut === "oui" ? l.prix ?? 0 : 0), 0);
  const entete = pret
    ? `${bien === "maison" ? "Maison" : "Appartement"} · permis ${QUESTIONS.permis.options.find((o) => o.id === permis)?.libelle.toLowerCase()} · ${projet === "vente" ? "vente" : "location"}`
    : "";

  const groupe = <T extends string>(cle: "bien" | "permis" | "projet", valeur: T | null, choisir: (v: T) => void) => {
    const q = QUESTIONS[cle];
    return (
      <div role="group" aria-labelledby={`dag-q-${cle}`} className="space-y-2">
        <p id={`dag-q-${cle}`} className="text-[14px] font-semibold text-[var(--doux)]">{q.titre}</p>
        <div className={`grid gap-2 ${q.options.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
          {q.options.map((o) => {
            const actif = valeur === o.id;
            return (
              <button
                key={o.id}
                type="button"
                data-film={`q-${cle}-${o.id}`}
                aria-pressed={actif}
                onClick={() => choisir(o.id as T)}
                className={`min-h-[52px] rounded-[16px] px-2 text-[15px] font-semibold leading-tight transition-colors ${actif ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--carte)] ring-1 ring-[var(--trait)]"}`}
              >
                {o.libelle}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div data-film="questions" className="space-y-4 rounded-[28px] bg-[#E3F1E7] p-5 ring-1 ring-[var(--trait)] sm:p-6">
        {groupe<Bien>("bien", bien, setBien)}
        {groupe<Permis>("permis", permis, setPermis)}
        {groupe<Projet>("projet", projet, setProjet)}
      </div>

      <div data-film="liste" aria-live="polite" className="rounded-[28px] bg-[var(--carte)] p-5 ring-1 ring-[var(--trait)] sm:p-6">
        {!pret ? (
          <p className="py-6 text-center text-[16px] text-[var(--doux)]">Réponds aux trois questions : la liste de tes diagnostics s&apos;affiche ici, avec le prix.</p>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-texte)]">Tes diagnostics</p>
              <p className="font-[family-name:var(--titres)] text-[22px] font-bold leading-tight tracking-[-0.02em]">{entete}</p>
            </div>
            <ul className="divide-y divide-[var(--trait)]">
              {lignes.map((l) => (
                <li key={l.nom} className="flex items-start gap-3 py-3">
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[14px] font-bold ${l.statut === "oui" ? "bg-[var(--accent)] text-[var(--sur-accent)]" : l.statut === "non" ? "bg-[var(--fond)] text-[var(--doux)] ring-1 ring-[var(--trait)]" : "bg-[#FBF4D6] text-[var(--encre)] ring-1 ring-[#E9D98F]"}`}
                  >
                    {SIGNES[l.statut]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[16px] font-semibold ${l.statut === "non" ? "text-[var(--doux)] line-through decoration-1" : ""}`}>{l.nom}</span>
                    <span className="block text-[14px] text-[var(--doux)]">{l.condition}</span>
                    <span className="sr-only"> : {LIBELLES[l.statut]}</span>
                  </span>
                  {l.statut === "oui" && l.prix && <span className="shrink-0 text-[15px] font-semibold tabular-nums">{euros(l.prix)}</span>}
                </li>
              ))}
            </ul>
            <div data-film="pack" className="flex flex-wrap items-baseline justify-between gap-2 rounded-[20px] bg-[var(--sombre)] px-5 py-4 text-[var(--sur-sombre)]">
              <p className="font-[family-name:var(--titres)] text-[26px] font-bold tracking-[-0.02em]">Le pack : {euros(pack)} TTC</p>
              <p className="text-[13px]">prix : exemple</p>
            </div>
            <button type="button" onClick={() => setDetail((d) => !d)} aria-expanded={detail} className="text-[14px] font-semibold underline decoration-[var(--accent)] decoration-2 underline-offset-4">
              {detail ? "Refermer" : "« Selon ton bien », ça veut dire quoi\u00A0?"}
            </button>
            {detail && (
              <ul className="space-y-2 rounded-[18px] bg-[var(--fond)] p-4 text-[14px] leading-relaxed">
                {SELON[projet].map((s) => (
                  <li key={s.nom}><b>{s.nom}</b> : {s.condition}.</li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[12px] text-[var(--doux)]">
                Service-Public, {projet === "vente" ? "diagnostics pour vendre (fiche F10798, vérifiée le 07/03/2025)" : "diagnostics pour louer (fiche F33463, vérifiée le 20/02/2026)"}
              </p>
              <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex h-12 items-center rounded-[14px] bg-[var(--accent)] px-5 text-[15px] font-semibold text-[var(--sur-accent)]">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
