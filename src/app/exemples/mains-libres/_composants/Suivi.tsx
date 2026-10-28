"use client";

import { useState } from "react";

const ETAPES = [
  { heure: "8 h 02", texte: "Voiture déposée" },
  { heure: "8 h 40", texte: "Au pont, vidange en cours" },
  { heure: "9 h 15", texte: "Vidange faite · contrôle des freins" },
];

/** Les plaquettes, dessinées : la neuve, épaisse ; la tienne, presque au métal. */
function Plaquettes() {
  return (
    <svg viewBox="0 0 320 170" className="w-full h-auto" role="img" aria-label="Photo de l'atelier : une plaquette neuve, épaisse, à côté de la tienne, presque usée jusqu'au métal">
      <rect width="320" height="170" rx="14" fill="#2A2E33" />
      {[{ x: 30, garniture: 34, libelle: "neuve · 12 mm" }, { x: 175, garniture: 7, libelle: "la tienne · 3 mm" }].map((q) => (
        <g key={q.x}>
          <rect x={q.x} y={42} width={115} height={26} rx={6} fill="#8C939B" />
          <rect x={q.x + 6} y={68} width={103} height={q.garniture} rx={4} fill={q.garniture > 10 ? "#5B4A3C" : "#7A3A22"} />
          <text x={q.x + 57} y={140} textAnchor="middle" fill="#EEECE7" fontSize="14" fontFamily="sans-serif">{q.libelle}</text>
        </g>
      ))}
    </svg>
  );
}

/**
 * Le suivi d'une réparation : où en est la voiture, et la question qui arrive avec
 * une photo. Oui, ou non : rien n'est fait sans ton accord. Rien n'est envoyé.
 */
export default function Suivi() {
  const [reponse, setReponse] = useState<"oui" | "non" | null>(null);
  return (
    <div className="space-y-5">
      <ol className="rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-5 space-y-3">
        {ETAPES.map((e) => (
          <li key={e.heure} className="flex gap-3">
            <span aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[var(--accent)]" />
            <span className="w-14 shrink-0 font-[family-name:var(--titres)] font-semibold tabular-nums">{e.heure}</span>
            <span>{e.texte}</span>
          </li>
        ))}
      </ol>

      <div data-film="message" className="rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-4 space-y-3 scroll-mt-24">
        <p className="flex items-center gap-3">
          <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] font-bold text-[var(--sur-accent)]">ML</span>
          <span>
            <span className="block font-[family-name:var(--titres)] font-bold">L'atelier</span>
            <span className="block text-sm text-[var(--doux)]">9 h 18 · message</span>
          </span>
        </p>
        <figure className="rounded-2xl bg-[var(--fond)] p-2 space-y-2">
          <Plaquettes />
          <figcaption className="px-2 pb-1 text-sm text-[var(--doux)]">Plaquettes avant · photo de l'atelier (dessin d'exemple)</figcaption>
        </figure>
        <div className="rounded-2xl bg-[var(--fond)] p-4 space-y-1">
          <p className="text-lg font-semibold">Tes plaquettes avant sont usées. On les change ?</p>
          <p className="text-sm text-[var(--doux)]">Devis joint, à valider : plaquettes avant, pièces et main-d'œuvre, 129&nbsp;€&nbsp;TTC (exemple).</p>
        </div>
        {reponse ? (
          <div role="status" className="rounded-2xl bg-[var(--sombre)] p-4 text-[var(--sur-sombre)] space-y-1">
            <p className="font-[family-name:var(--titres)] text-xl font-bold">
              {reponse === "oui" ? "Tu as dit oui. On les change : voiture prête vers 11 h." : "Compris : on n'y touche pas. Pense à les faire changer bientôt."}
            </p>
            <p className="text-sm">Démonstration : rien n'est envoyé, rien n'est enregistré.</p>
            <button type="button" onClick={() => setReponse(null)} className="text-sm font-semibold underline underline-offset-4">Revenir à la question</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <button type="button" data-film="oui" onClick={() => setReponse("oui")} className="rounded-full bg-[var(--accent)] py-4 font-[family-name:var(--titres)] text-xl font-bold text-[var(--sur-accent)]">Oui</button>
            <button type="button" data-film="non" onClick={() => setReponse("non")} className="rounded-full border-2 border-[var(--encre)] py-4 font-[family-name:var(--titres)] text-xl font-bold">Non</button>
          </div>
        )}
      </div>
    </div>
  );
}
