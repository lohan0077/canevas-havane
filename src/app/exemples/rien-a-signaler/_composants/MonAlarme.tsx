"use client";

import { useState } from "react";
import Link from "next/link";
import s from "./Calme.module.css";
import { ANIMAUX, DOSSIER, KITS, NUANCE, PRIX_OUVERTURE, REPONSES, euros, type Animal } from "./donnees";

/**
 * « Mon alarme » : la première question n'est pas maison ou appartement, c'est « T'as un
 * chat ? ». Sur l'accueil, cette seule question ; sur la page « Mon alarme », la suite —
 * le logement, les portes et fenêtres, le kit et son prix TTC d'exemple. Rien n'est
 * envoyé : tout se passe dans le navigateur.
 */
export default function MonAlarme({ complet = false }: { complet?: boolean }) {
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [logement, setLogement] = useState<keyof typeof KITS | null>(null);
  const [ouvertures, setOuvertures] = useState<number | null>(null);
  const [valide, setValide] = useState(false);

  const kit = logement ? KITS[logement] : null;
  const nbOuvertures = ouvertures ?? kit?.ouvertures ?? 0;
  const supplement = kit ? Math.max(0, nbOuvertures - kit.ouvertures) * PRIX_OUVERTURE : 0;

  return (
    <div className="space-y-4">
      <div className="rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-5 space-y-4" data-film="chat">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Avant tout</p>
        <p className="font-[family-name:var(--titres)] text-3xl font-bold tracking-[-0.02em]">T&apos;as un animal&nbsp;?</p>
        <div className="grid grid-cols-3 gap-2">
          {ANIMAUX.map((a) => (
            <button
              key={a.v}
              type="button"
              data-animal={a.v}
              aria-pressed={animal === a.v}
              onClick={() => {
                setAnimal(a.v);
                setValide(false);
              }}
              className={`min-h-[84px] rounded-[18px] border-2 px-2 py-3 text-base font-semibold transition-colors ${
                animal === a.v ? "border-[var(--encre)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--fond)] text-[var(--encre)]"
              }`}
            >
              <svg viewBox="0 0 32 24" aria-hidden="true" className="mx-auto mb-1.5 h-6 w-8">
                {a.v === "chat" && <path d="M8 22 Q6 22 6 18 V8 L11 2 L13.5 7.5 H18.5 L21 2 L26 8 V18 Q26 22 24 22 Z" fill="currentColor" />}
                {a.v === "chien" && (
                  <g fill="currentColor">
                    <path d="M10 6 Q16 2 22 6 Q25 9 25 15 Q25 22 16 22 Q7 22 7 15 Q7 9 10 6 Z" />
                    <path d="M10 6 Q3 5 3 12 Q3 17 7 17 Z M22 6 Q29 5 29 12 Q29 17 25 17 Z" />
                  </g>
                )}
                {a.v === "aucun" && <path d="M8 12 H24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />}
              </svg>
              {a.libelle}
            </button>
          ))}
        </div>
        {animal && (
          <div key={animal} role="status" className={`${s.reponse} rounded-[18px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-4 space-y-2`} data-film="reponse">
            <p className="flex items-center gap-2 font-[family-name:var(--titres)] text-xl font-bold">
              <span aria-hidden="true" className="grid place-items-center w-7 h-7 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-sm">✓</span>
              C&apos;est noté.
            </p>
            <p className="text-lg leading-snug">{REPONSES[animal]}</p>
            {animal !== "aucun" && <p className="text-sm text-[#B7C3DE]">{NUANCE}</p>}
          </div>
        )}
        {!complet && animal && (
          <Link href={`${DOSSIER}/mon-alarme`} className="inline-flex text-base font-semibold underline underline-offset-4">
            Ensuite : maison ou appartement →
          </Link>
        )}
      </div>

      {complet && animal && (
        <div className={`${s.reponse} rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-5 space-y-4`}>
          <p className="font-[family-name:var(--titres)] text-2xl font-bold tracking-[-0.02em]">Ensuite : maison ou appartement&nbsp;?</p>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(KITS) as (keyof typeof KITS)[]).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={logement === k}
                onClick={() => {
                  setLogement(k);
                  setOuvertures(null);
                  setValide(false);
                }}
                className={`min-h-12 rounded-full border-2 px-4 text-base font-semibold ${
                  logement === k ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--fond)] text-[var(--encre)]"
                }`}
              >
                {KITS[k].nom}
              </button>
            ))}
          </div>
          {kit && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-lg">Portes et fenêtres à équiper</p>
                <span className="flex items-center gap-3">
                  <button type="button" aria-label="Une ouverture de moins" onClick={() => setOuvertures(Math.max(1, nbOuvertures - 1))} className="h-10 w-10 rounded-full border-2 border-[var(--trait)] text-xl font-bold">−</button>
                  <span className="w-6 text-center text-xl font-bold tabular-nums">{nbOuvertures}</span>
                  <button type="button" aria-label="Une ouverture de plus" onClick={() => setOuvertures(Math.min(12, nbOuvertures + 1))} className="h-10 w-10 rounded-full bg-[var(--encre)] text-[var(--fond)] text-xl font-bold">+</button>
                </span>
              </div>
              <ul className="rounded-[18px] bg-[var(--fond)] p-4 space-y-1.5">
                <li>1 centrale et son clavier</li>
                <li>{nbOuvertures} détecteur{nbOuvertures > 1 ? "s" : ""} d&apos;ouverture</li>
                <li>
                  {kit.mouvements} détecteur{kit.mouvements > 1 ? "s" : ""} de mouvement{" "}
                  {animal !== "aucun" ? "« animaux », réglés selon ton animal" : ""}
                </li>
                <li>1 sirène intérieure{kit.exterieure ? ", 1 sirène extérieure" : ""}</li>
                <li>L&apos;application, et le rapport du dimanche</li>
              </ul>
              <div className="rounded-[18px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-5 space-y-1" role="status">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Ton alarme · TTC, pose comprise</p>
                <p className="font-[family-name:var(--titres)] text-4xl font-bold tabular-nums">{euros(kit.prix + supplement)}</p>
                <p className="text-sm text-[#B7C3DE]">
                  Exemple{supplement > 0 ? ` · dont ${euros(supplement)} pour ${nbOuvertures - kit.ouvertures} ouverture${nbOuvertures - kit.ouvertures > 1 ? "s" : ""} de plus` : ""} · sans abonnement · sans télésurveillance.
                </p>
              </div>
              {valide ? (
                <div className="rounded-[18px] border-2 border-[var(--accent-texte)] bg-[var(--fond)] p-4 space-y-1">
                  <p className="font-semibold">C&apos;est noté : on te propose une date de pose.</p>
                  <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
                </div>
              ) : (
                <button type="button" onClick={() => setValide(true)} className="w-full min-h-14 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 text-lg font-bold">
                  Demander ma date de pose
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
