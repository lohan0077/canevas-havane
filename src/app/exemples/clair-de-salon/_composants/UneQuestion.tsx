"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CHAPITRES, DOSSIER, MORCEAUX, entreprise } from "./donnees";
import { styleCahier } from "./cahier";

type Onglet = "piano" | "maths";

/**
 * L'outil de l'accueil, au cœur des deux vidéos : pas de CV, pas de solfège, une seule
 * question. Pour soi, au piano : « Tu rêves de jouer quoi ? » — le morceau touché
 * écrit son chemin. Pour son enfant, en maths : « Quel chapitre bloque ? » — le
 * chapitre touché écrit la première séance, minute par minute. Rien n'est envoyé.
 * Les boutons du premier écran mènent à #question-piano ou #question-maths.
 */
export default function UneQuestion() {
  const [onglet, setOnglet] = useState<Onglet>("piano");
  const [morceauId, setMorceauId] = useState<string | null>(null);
  const [chapitreId, setChapitreId] = useState<string | null>(null);
  const morceau = MORCEAUX.find((m) => m.id === morceauId) ?? null;
  const chapitre = CHAPITRES.find((c) => c.id === chapitreId) ?? null;

  useEffect(() => {
    const suivre = () => {
      if (location.hash === "#question-maths") setOnglet("maths");
      if (location.hash === "#question-piano") setOnglet("piano");
    };
    addEventListener("hashchange", suivre);
    return () => removeEventListener("hashchange", suivre);
  }, []);

  return (
    <div className="space-y-5">
      <div role="tablist" aria-label="Pour qui ?" className="mx-auto grid max-w-xl grid-cols-2 gap-1.5 rounded-full border border-[var(--trait)] bg-[var(--carte)] p-1.5 shadow-[0_20px_50px_-30px_rgba(30,42,68,0.5)]">
        {([
          ["piano", "♪", "Le piano", "pour moi"],
          ["maths", "✎", "Les maths", "pour mon enfant"],
        ] as const).map(([id, signe, titre, sous]) => {
          const actif = onglet === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              data-onglet={id}
              aria-selected={actif}
              aria-controls={`panneau-${id}`}
              onClick={() => setOnglet(id)}
              className={`flex min-h-14 items-center justify-center gap-2.5 rounded-full px-3 transition-colors duration-300 ${
                actif ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "text-[var(--encre)] hover:bg-[var(--fond)]"
              }`}
            >
              <span aria-hidden="true" className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-base ${actif ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--trait)]"}`}>{signe}</span>
              <span className="text-left leading-tight">
                <span className="block text-[15px] font-bold">{titre}</span>
                <span className={`block text-[12px] ${actif ? "text-[var(--sur-sombre)]/90" : "text-[var(--doux)]"}`}>{sous}</span>
              </span>
            </button>
          );
        })}
      </div>

      {onglet === "piano" ? (
        <div id="panneau-piano" role="tabpanel" className="kit-grain relative overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div id="morceau" className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#E7C774]">Au piano · avec {entreprise.pianiste}</p>
                <h3 data-film="question" className="text-[40px] leading-[1] sm:text-6xl">Tu rêves de jouer <span className="italic text-[#E7C774]">quoi&nbsp;?</span></h3>
              </div>
              <ul role="radiogroup" aria-label="Le morceau dont tu rêves" className="border-t border-white/20">
                {MORCEAUX.map((m) => {
                  const actif = m.id === morceauId;
                  return (
                    <li key={m.id} className="border-b border-white/20">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={actif}
                        data-morceau={m.id}
                        onClick={() => setMorceauId(m.id)}
                        className={`flex w-full items-center gap-4 rounded-2xl px-3 py-3.5 text-left transition-all duration-300 ${actif ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "hover:bg-white/5"}`}
                      >
                        <span aria-hidden="true" className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border text-xl ${actif ? "border-[var(--sur-accent)]" : "border-white/40"}`}>♪</span>
                        <span className="min-w-0">
                          <span className="block font-[family-name:var(--titres)] text-[26px] leading-tight">{m.titre}</span>
                          <span className={`block text-sm ${actif ? "" : "text-[var(--sur-sombre)]/85"}`}>{m.compositeur} · {m.annee}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div id="apercu-chemin" aria-live="polite" className="flex min-h-[18rem] flex-col justify-center rounded-[1.5rem] border border-white/15 bg-[#26334F] p-6 sm:p-8">
              {morceau ? (
                <div className="space-y-5">
                  <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#E7C774]">Ton chemin · {morceau.titre}</p>
                  <p className="font-[family-name:var(--titres)] text-xl italic leading-snug">{morceau.mot}</p>
                  <ol className="space-y-3">
                    {morceau.etapes.map((e, i) => (
                      <li key={e} className="kit-apparait flex items-baseline gap-4" data-vu="" style={{ "--kit-delai": `${i * 120}ms` } as React.CSSProperties}>
                        <span className="font-[family-name:var(--titres)] text-3xl italic text-[#E7C774] [font-variant-numeric:lining-nums]">{i + 1}</span>
                        <span className="text-lg">{e}</span>
                      </li>
                    ))}
                  </ol>
                  <Link href={`${DOSSIER}/ton-chemin`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--fond)] px-5 font-semibold text-[var(--encre)]">
                    Voir le chemin en entier <span aria-hidden="true">→</span>
                  </Link>
                </div>
              ) : (
                <p className="font-[family-name:var(--titres)] text-3xl italic leading-snug text-[var(--sur-sombre)]/90">
                  Touche un morceau : le chemin s&apos;écrit ici, étape par étape.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div id="panneau-maths" role="tabpanel" className="overflow-hidden rounded-[2rem] border border-[var(--trait)] shadow-[0_30px_70px_-40px_rgba(30,42,68,0.5)]" style={styleCahier}>
          <div id="chapitre" data-film="chapitre" className="space-y-6 py-8 pl-12 pr-5 sm:py-10 sm:pl-16 sm:pr-10">
            <div className="space-y-1">
              <p className="origin-left -rotate-2 font-[family-name:var(--f-caveat)] text-[26px] text-[var(--accent-texte)]">Maths · collège · avec {entreprise.mathematicienne}</p>
              <h3 className="text-[40px] leading-[1] sm:text-6xl">Quel chapitre <span className="italic text-[var(--accent-texte)]">bloque&nbsp;?</span></h3>
            </div>
            <div role="radiogroup" aria-label="Le chapitre qui bloque" className="flex flex-wrap gap-2.5">
              {CHAPITRES.map((c) => {
                const actif = c.id === chapitreId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={actif}
                    data-chapitre={c.id}
                    onClick={() => setChapitreId(c.id)}
                    className={`min-h-12 rounded-full border-2 px-4 py-2 text-[17px] font-semibold transition-transform duration-300 ${
                      actif ? "scale-105 border-[var(--accent-texte)] bg-[var(--accent-texte)] text-white" : "border-[var(--encre)] bg-[var(--carte)]"
                    }`}
                  >
                    {c.nom}
                  </button>
                );
              })}
            </div>
            <div id="premiere-seance" aria-live="polite" className="min-h-[19rem] scroll-mt-24">
              {chapitre ? (
                <div className="space-y-4">
                  <p className="text-sm font-bold uppercase tracking-[0.16em]">{chapitre.nom} · {chapitre.classe}</p>
                  <h4 className="font-[family-name:var(--titres)] text-3xl leading-tight sm:text-4xl">
                    La première <span className="italic text-[var(--accent-texte)]">séance</span>, minute par minute
                  </h4>
                  <ol className="space-y-3">
                    {chapitre.etapes.map((e, i) => (
                      <li key={e.minute} className="kit-apparait grid grid-cols-[56px_1fr] items-baseline gap-2" data-vu="" style={{ "--kit-delai": `${i * 140}ms` } as React.CSSProperties}>
                        <span className="font-[family-name:var(--f-caveat)] text-[34px] leading-none text-[var(--accent-texte)]">{e.minute}</span>
                        <span className="text-[17px] leading-snug">{e.titre}</span>
                      </li>
                    ))}
                  </ol>
                  <Link href={`${DOSSIER}/reserver`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--sombre)] px-6 font-semibold text-[var(--sur-sombre)]">
                    Voir les créneaux <span aria-hidden="true">→</span>
                  </Link>
                </div>
              ) : (
                <p className="-rotate-1 pt-4 font-[family-name:var(--f-caveat)] text-[32px] text-[var(--doux)]">
                  ↑ Touchez un chapitre : la première séance s&apos;écrit ici.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
