"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, QUESTIONS, SELON, diagnostics, euros, type Bien, type Permis, type Projet } from "./donnees";

const SIGNES = { oui: "✓", non: "✕", peut: "?" } as const;
const LIBELLES = { oui: "à faire", non: "pas pour ce bien", peut: "selon ton bien" } as const;

/**
 * L'outil de l'accueil (vidéo « Remplir l'agenda ») : trois questions, puis la liste des
 * diagnostics et le prix du pack, comme une fiche imprimée. La règle vient des fiches
 * Service-Public F10798 (vente) et F33463 (location) ; tout se calcule dans le
 * navigateur, rien n'est envoyé.
 */
export default function Diagnostics() {
  const [bien, setBien] = useState<Bien | null>(null);
  const [permis, setPermis] = useState<Permis | null>(null);
  const [projet, setProjet] = useState<Projet | null>(null);
  const [detail, setDetail] = useState(false);
  const pret = bien && permis && projet;
  const lignes = pret ? diagnostics(bien, permis, projet) : [];
  const pack = lignes.reduce((t, l) => t + (l.statut === "oui" ? l.prix ?? 0 : 0), 0);
  const repondues = [bien, permis, projet].filter(Boolean).length;
  const entete = pret
    ? `${bien === "maison" ? "Maison" : "Appartement"} · permis ${QUESTIONS.permis.options.find((o) => o.id === permis)?.libelle.toLowerCase()} · ${projet === "vente" ? "vente" : "location"}`
    : "";

  const groupe = <T extends string>(cle: "bien" | "permis" | "projet", n: number, valeur: T | null, choisir: (v: T) => void) => {
    const q = QUESTIONS[cle];
    return (
      <div role="group" aria-labelledby={`tr-q-${cle}`} className="space-y-2.5">
        <p id={`tr-q-${cle}`} className="flex items-center gap-2.5 text-[15px] font-semibold">
          <span aria-hidden="true" className={`grid h-6 w-6 place-items-center rounded-[6px] text-[12px] font-bold transition-colors ${valeur ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--trait)] text-[var(--doux)]"}`}>{valeur ? "✓" : n}</span>
          {q.titre}
        </p>
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
                className={`min-h-[52px] rounded-[10px] px-2 text-[15px] font-semibold leading-tight transition-all duration-300 ${actif ? "scale-[1.03] bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--trait)] bg-[var(--fond)] hover:border-[var(--doux)]"}`}
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
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div data-film="questions" className="space-y-5 rounded-[1.25rem] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--doux)]">Trois questions</p>
          <p className="text-[12px] font-semibold tabular-nums text-[var(--accent-texte)]">{repondues} / 3</p>
        </div>
        <div aria-hidden="true" className="flex gap-1.5">
          {[0, 1, 2].map((i) => <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i < repondues ? "bg-[var(--accent)]" : "bg-[var(--trait)]"}`} />)}
        </div>
        {groupe<Bien>("bien", 1, bien, setBien)}
        {groupe<Permis>("permis", 2, permis, setPermis)}
        {groupe<Projet>("projet", 3, projet, setProjet)}
      </div>

      <div data-film="liste" aria-live="polite" className="rounded-[1.25rem] bg-[#F3F2EC] p-5 text-[#111827] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] sm:p-6">
        {!pret ? (
          <div className="flex min-h-[18rem] flex-col justify-center gap-3 text-center">
            <p className="font-[family-name:var(--titres)] text-[26px] font-semibold leading-tight tracking-[-0.03em]">Ta liste s&apos;écrit ici.</p>
            <p className="text-[15px] text-[#4B5563]">Réponds aux trois questions : tes diagnostics s&apos;affichent, avec le prix. Sans appeler personne.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-[#111827] pb-3">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#4B5563]">Tes diagnostics</p>
                <p className="font-[family-name:var(--titres)] text-[20px] font-semibold leading-tight tracking-[-0.02em]">{entete}</p>
              </div>
              <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-[#F5D90A] font-[family-name:var(--titres)] font-bold">⅓</span>
            </div>
            <ul className="divide-y divide-[#D9D6CB]">
              {lignes.map((l, i) => (
                <li key={l.nom} className="kit-apparait flex items-start gap-3 py-2.5" data-vu="" style={{ "--kit-delai": `${i * 90}ms` } as React.CSSProperties}>
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[14px] font-bold ${l.statut === "oui" ? "bg-[#111827] text-[#F5D90A]" : l.statut === "non" ? "border border-[#B8B4A6] text-[#4B5563]" : "bg-[#F5D90A] text-[#111827]"}`}
                  >
                    {SIGNES[l.statut]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[16px] font-semibold ${l.statut === "non" ? "text-[#4B5563] line-through decoration-1" : ""}`}>{l.nom}</span>
                    <span className="block text-[14px] text-[#4B5563]">{l.condition}</span>
                    <span className="sr-only"> : {LIBELLES[l.statut]}</span>
                  </span>
                  {l.statut === "oui" && l.prix && <span className="shrink-0 text-[15px] font-semibold tabular-nums">{euros(l.prix)}</span>}
                </li>
              ))}
            </ul>
            <div data-film="pack" className="flex flex-wrap items-baseline justify-between gap-2 rounded-[12px] bg-[#111827] px-5 py-4 text-[#F3F4F6]">
              <p className="font-[family-name:var(--titres)] text-[26px] font-semibold tracking-[-0.03em]">Le pack : <span className="text-[#F5D90A]">{euros(pack)} TTC</span></p>
              <p className="text-[13px]">prix : exemple</p>
            </div>
            <button type="button" onClick={() => setDetail((d) => !d)} aria-expanded={detail} className="text-[14px] font-semibold underline decoration-[#111827] decoration-2 underline-offset-4">
              {detail ? "Refermer" : "« Selon ton bien », ça veut dire quoi ?"}
            </button>
            {detail && (
              <ul className="space-y-2 rounded-[10px] bg-white p-4 text-[14px] leading-relaxed">
                {SELON[projet].map((s) => (
                  <li key={s.nom}><b>{s.nom}</b> : {s.condition}.</li>
                ))}
              </ul>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[12px] text-[#4B5563]">
                Service-Public, {projet === "vente" ? "diagnostics pour vendre (fiche F10798, vérifiée le 07/03/2025)" : "diagnostics pour louer (fiche F33463, vérifiée le 20/02/2026)"}
              </p>
              <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex min-h-12 items-center rounded-[10px] bg-[#111827] px-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#F5D90A]">
                Prendre rendez-vous →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
