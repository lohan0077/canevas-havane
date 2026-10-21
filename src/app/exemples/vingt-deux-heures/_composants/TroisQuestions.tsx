"use client";

import { useState } from "react";
import LigneJeu from "./LigneJeu";
import { CHOIX, JEUX, QUESTIONS, boutique, euros } from "./donnees";

/**
 * L'accueil en trois questions — combien, combien de temps, rire ou réfléchir — et
 * les trois jeux que Léa a choisis pour cette soirée-là. On peut en mettre de côté :
 * rien n'est payé en ligne, rien n'est envoyé. Tout se passe dans le navigateur.
 */
export default function TroisQuestions() {
  const [reponses, setReponses] = useState<(string | null)[]>([null, null, null]);
  const [deCote, setDeCote] = useState<string[]>([]);
  const [confirme, setConfirme] = useState(false);

  const complet = reponses.every(Boolean);
  const cle = reponses.join("-");
  const choisis = complet ? CHOIX[cle].map((r) => JEUX[r]) : [];
  const libelles = QUESTIONS.map((q, i) => q.options.find((o) => o.v === reponses[i])?.libelle);
  const total = deCote.reduce((t, r) => t + JEUX[r].prix, 0);

  const repondre = (i: number, v: string) => {
    setReponses(reponses.map((r, j) => (j === i ? v : r)));
    setDeCote([]);
    setConfirme(false);
  };
  const basculer = (ref: string) => {
    setConfirme(false);
    setDeCote(deCote.includes(ref) ? deCote.filter((r) => r !== ref) : [...deCote, ref]);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3" data-film="questions">
        {QUESTIONS.map((q, i) => (
          <fieldset key={q.id} className="rounded-[22px] bg-[var(--carte)] border-2 border-[var(--encre)] p-4 sm:p-5">
            <legend className="sr-only">{q.question}</legend>
            <p aria-hidden="true" className="flex items-baseline gap-2 text-xl font-black tracking-[-0.02em]">
              <span className="text-[var(--accent-texte)] tabular-nums">{i + 1}.</span> {q.question}
            </p>
            <div className="mt-3 flex gap-2">
              {q.options.map((o) => {
                const actif = reponses[i] === o.v;
                return (
                  <button
                    key={o.v}
                    type="button"
                    data-reponse={`${q.id}-${o.v}`}
                    aria-pressed={actif}
                    onClick={() => repondre(i, o.v)}
                    className={`flex-1 min-h-12 rounded-full border-2 px-3 text-lg font-bold transition-colors ${
                      actif ? "bg-[var(--encre)] border-[var(--encre)] text-[var(--fond)]" : "bg-[var(--fond)] border-[var(--trait)] text-[var(--encre)] hover:border-[var(--encre)]"
                    }`}
                  >
                    {o.libelle}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div role="status" aria-live="polite">
        {!complet ? (
          <p className="text-[var(--doux)] text-lg">
            Réponds aux trois questions : {boutique.vendeuse} te sort trois jeux. Pas deux mille.
          </p>
        ) : (
          <div className="space-y-4" data-film="trois-jeux">
            <div className="rounded-[22px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-5 space-y-2">
              <p className="text-sm font-bold uppercase tracking-[0.16em]">Pour ta soirée</p>
              <p className="text-3xl font-[family-name:var(--titres)] font-black tracking-[-0.03em] leading-tight">
                {{ "2": "2 joueurs", "4": "3 – 4 joueurs", "6": "5 joueurs et +" }[reponses[0] as string]} · {libelles[1]} · {libelles[2]?.toLowerCase()}
              </p>
              <p className="inline-flex items-center gap-2 rounded-full bg-[#F2B33D] text-[var(--encre)] px-3 py-1 text-sm font-bold" data-film="choisis">
                <span aria-hidden="true">✓</span> Trois jeux, choisis par {boutique.vendeuse}, en boutique
              </p>
            </div>
            <div className="grid gap-3 lg:grid-cols-3">
              {choisis.map((j) => {
                const pris = deCote.includes(j.ref);
                return (
                  <LigneJeu
                    key={j.ref}
                    jeu={j}
                    action={
                      <button
                        type="button"
                        aria-pressed={pris}
                        onClick={() => basculer(j.ref)}
                        className={`w-full min-h-12 rounded-full px-5 text-lg font-bold border-2 ${
                          pris ? "bg-[var(--fond)] border-[var(--encre)] text-[var(--encre)]" : "bg-[var(--accent)] border-[var(--accent)] text-[var(--sur-accent)]"
                        }`}
                      >
                        {pris ? "Mis de côté ✓" : "Mettre de côté"}
                      </button>
                    }
                  />
                );
              })}
            </div>
            {deCote.length > 0 && (
              <div className="rounded-[22px] border-2 border-[var(--encre)] bg-[var(--carte)] p-5 space-y-3">
                <p className="flex items-baseline justify-between gap-4 text-xl font-black">
                  <span>
                    {deCote.length} jeu{deCote.length > 1 ? "x" : ""} de côté
                  </span>
                  <span className="tabular-nums">{euros(total)} TTC</span>
                </p>
                <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple. Rien n&apos;est payé en ligne : tu règles en boutique, en venant le chercher.</p>
                {confirme ? (
                  <div className="rounded-2xl bg-[var(--fond)] border-2 border-[var(--accent)] p-4 space-y-1">
                    <p className="font-bold">C&apos;est noté : ta pile t&apos;attend trois jours à la caisse.</p>
                    <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
                  </div>
                ) : (
                  <button type="button" onClick={() => setConfirme(true)} className="w-full min-h-12 rounded-full bg-[var(--encre)] text-[var(--fond)] px-5 text-lg font-bold">
                    Je passe les chercher
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
