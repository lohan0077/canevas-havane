"use client";

import { useState } from "react";
import Link from "next/link";
import { CHAISES_PRISES, CONCERT, DOSSIER, MORCEAUX } from "./donnees";

/**
 * L'accueil sans solfège : « Tu rêves de jouer quoi ? ». On touche un morceau ; ses
 * quatre étapes s'affichent. Rien n'est envoyé.
 */
export function ChoixMorceau() {
  const [id, setId] = useState<string | null>(null);
  const morceau = MORCEAUX.find((m) => m.id === id) ?? null;

  return (
    <div className="space-y-6">
      <ul role="radiogroup" aria-label="Le morceau dont tu rêves" className="border-t border-[var(--encre)]">
        {MORCEAUX.map((m) => {
          const actif = m.id === id;
          return (
            <li key={m.id} className="border-b border-[var(--trait)]">
              <button
                type="button"
                role="radio"
                aria-checked={actif}
                onClick={() => setId(m.id)}
                className={`flex w-full items-center gap-4 px-2 py-4 text-left transition-colors ${actif ? "bg-[var(--accent)] text-[var(--sur-accent)]" : ""}`}
              >
                <span aria-hidden="true" className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border text-xl ${actif ? "border-[var(--sur-accent)]" : "border-[var(--encre)]"}`}>♪</span>
                <span className="min-w-0">
                  <span className="block font-[family-name:var(--titres)] text-2xl leading-tight">{m.titre}</span>
                  <span className="block text-sm">{m.compositeur} · {m.annee}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div id="apercu-chemin" aria-live="polite" className="min-h-[15rem]">
        {morceau ? (
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Ton chemin · {morceau.titre}</p>
            <ol className="space-y-2.5">
              {morceau.etapes.map((e, i) => (
                <li key={e} className="flex items-baseline gap-3">
                  <span className="font-[family-name:var(--titres)] text-2xl italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}</span>
                  <span className="text-lg">{e}</span>
                </li>
              ))}
            </ol>
            <Link href={`${DOSSIER}/ton-chemin`} className="inline-flex min-h-[50px] items-center rounded-full border border-[var(--encre)] px-6 font-semibold">Voir le chemin en entier</Link>
          </div>
        ) : (
          <p className="font-[family-name:var(--titres)] text-2xl italic text-[var(--doux)]">Touche un morceau : le chemin s&apos;écrit ici.</p>
        )}
      </div>
    </div>
  );
}

/**
 * Le chemin d'un morceau, étape par étape, jusqu'au jour où on le joue en entier. On
 * coche l'étape passée ; la suivante s'allume. Aucune durée n'est promise.
 */
export function Chemin() {
  const [id, setId] = useState(MORCEAUX[0].id);
  const [faites, setFaites] = useState(0);
  const morceau = MORCEAUX.find((m) => m.id === id) ?? MORCEAUX[0];
  const fini = faites >= morceau.etapes.length;

  return (
    <div className="space-y-8">
      <div role="tablist" aria-label="Choisir le morceau" className="flex flex-wrap gap-2">
        {MORCEAUX.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={m.id === id}
            onClick={() => {
              setId(m.id);
              setFaites(0);
            }}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${m.id === id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
          >
            {m.titre}
          </button>
        ))}
      </div>

      <div className="rounded-[2px] border border-[var(--encre)] bg-[var(--carte)] p-6 sm:p-10 space-y-6">
        <div className="space-y-1">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">{morceau.compositeur} · {morceau.annee}</p>
          <h2 className="text-4xl sm:text-5xl">{morceau.titre}</h2>
          <p className="italic text-[var(--doux)]">{morceau.mot}</p>
        </div>
        <ol id="etapes" className="relative space-y-0">
          {morceau.etapes.map((e, i) => {
            const etat = i < faites ? "faite" : i === faites ? "en-cours" : "a-venir";
            return (
              <li key={e} className="relative grid grid-cols-[48px_1fr] gap-4 pb-6 last:pb-0">
                {i < morceau.etapes.length - 1 && (
                  <span aria-hidden="true" className={`absolute left-[23px] top-12 bottom-0 w-0.5 ${i < faites ? "bg-[var(--accent)]" : "bg-[var(--trait)]"}`} />
                )}
                <span
                  aria-hidden="true"
                  className={`relative z-10 grid h-12 w-12 place-items-center rounded-full border-2 font-[family-name:var(--titres)] text-xl [font-variant-numeric:lining-nums] transition-colors ${
                    etat === "faite" ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : etat === "en-cours" ? "border-[var(--accent)] bg-[var(--carte)] text-[var(--accent-texte)]" : "border-[var(--trait)] bg-[var(--carte)] text-[var(--doux)]"
                  }`}
                >
                  {etat === "faite" ? "✓" : i + 1}
                </span>
                <span className="pt-2.5">
                  <span className={`block text-xl ${etat === "a-venir" ? "text-[var(--doux)]" : "font-semibold"}`}>{e}</span>
                  <span className="block text-sm text-[var(--doux)]">{etat === "faite" ? "Passée" : etat === "en-cours" ? "En cours" : "Plus tard"}</span>
                </span>
              </li>
            );
          })}
        </ol>
        <div aria-live="polite">
          {fini ? (
            <div role="status" className="space-y-3 border-t border-[var(--trait)] pt-5">
              <p className="font-[family-name:var(--titres)] text-3xl italic">Tu le joues en entier.</p>
              <p className="text-[var(--doux)]">Le prochain concert de salon t&apos;attend, si tu veux. Démonstration : rien n&apos;est enregistré.</p>
              <button type="button" onClick={() => setFaites(0)} className="text-sm font-semibold underline underline-offset-4">Recommencer le chemin</button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setFaites((f) => f + 1)}
              className="flex min-h-[54px] w-full items-center justify-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] font-semibold"
            >
              {faites === morceau.etapes.length - 1 ? "Je le joue en entier" : "Étape passée"}
            </button>
          )}
        </div>
      </div>
      <p className="text-sm text-[var(--doux)]">Aucune durée promise : le chemin avance au rythme des cours et de tes soirées.</p>
    </div>
  );
}

/** Les douze chaises du concert de salon : on en choisit une. Rien n'est envoyé. */
export function Chaises() {
  const [choisie, setChoisie] = useState<number | null>(null);
  const [reservee, setReservee] = useState(false);

  return (
    <div className="space-y-5">
      <div className="rounded-[2px] border border-[var(--trait)] bg-[var(--carte)] p-5">
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--doux)]">Le piano</p>
        <ul className="grid grid-cols-4 gap-3">
          {Array.from({ length: CONCERT.chaises }, (_, k) => {
            const prise = CHAISES_PRISES.includes(k);
            const active = choisie === k;
            return (
              <li key={k}>
                <button
                  type="button"
                  disabled={prise || reservee}
                  aria-pressed={active}
                  aria-label={`Chaise ${k + 1}${prise ? ", prise" : ""}`}
                  onClick={() => setChoisie(k)}
                  className={`grid aspect-square w-full place-items-center rounded-[2px] border-2 transition-colors ${
                    prise ? "border-[var(--trait)] text-[var(--trait)] cursor-not-allowed" : active ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--encre)] text-[var(--encre)]"
                  }`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
                    <path d="M7 3h10v9H7zM5 12h14v3H5zM7 15v6M17 15v6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="text-sm text-[var(--doux)]">Chaises prises : exemple, l&apos;entreprise est fictive.</p>
      {choisie !== null &&
        (reservee ? (
          <div role="status" className="border-2 border-[var(--accent)] bg-[var(--carte)] p-4 space-y-1">
            <p className="font-semibold">Chaise {choisie + 1} gardée pour toi. Entrée libre, voisins bienvenus.</p>
            <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
          </div>
        ) : (
          <button type="button" onClick={() => setReservee(true)} className="flex min-h-[54px] w-full items-center justify-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] font-semibold">
            Garder la chaise {choisie + 1}
          </button>
        ))}
    </div>
  );
}
