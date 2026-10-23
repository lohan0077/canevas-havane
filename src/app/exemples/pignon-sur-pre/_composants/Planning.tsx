"use client";

import { useState } from "react";
import { PLANNING, SAMEDIS, euros } from "./donnees";

type Choix = { article: string; samedi: number };

const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const SEMAINE = SAMEDIS.slice(0, 4);

/**
 * Les vraies disponibilités, article par article — les tentes et chaque machine —,
 * samedi par samedi, comme les chambres d'un hôtel. On touche un samedi libre ; la barre
 * du bas récapitule (l'article, la date, le prix TTC) et « Réserver ce samedi » le bloque.
 * Les cases « Pris » sont un exemple, et rien n'est envoyé : la page le dit.
 */
export default function Planning() {
  const [choix, setChoix] = useState<Choix | null>(null);
  const [reserve, setReserve] = useState<Choix | null>(null);
  const [chauffeur, setChauffeur] = useState(false);
  const estReserve = (a: string, s: number) => reserve?.article === a && reserve.samedi === s;
  const art = choix ? PLANNING.find((p) => p.id === choix.article) ?? null : null;
  const prix = art ? (chauffeur && art.chauffeur ? art.chauffeur : art.prix) : 0;

  return (
    <div id="planning" className="relative">
      <div className="overflow-hidden rounded-[22px] border border-[var(--encre)] bg-[var(--carte)]">
        <div className="flex items-center justify-between gap-3 bg-[var(--sombre)] px-4 py-3 text-[var(--sur-sombre)]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em]">Disponibilités · juin 2027</p>
          <p className="font-[family-name:var(--titres)] text-[15px] italic text-[#F2C98A]">les samedis</p>
        </div>
        <ul className="divide-y divide-[var(--trait)]">
          {PLANNING.map((ligne) => (
            <li key={ligne.id} className="space-y-2.5 px-4 py-3.5">
              <p className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] leading-tight">{ligne.court}</span>
                <span className="whitespace-nowrap text-[13px] font-medium tabular-nums text-[var(--doux)]">
                  {euros(ligne.prix)} TTC {ligne.unite === "jour" ? "/ jour" : "le week-end"} · exemple
                </span>
              </p>
              <div className="grid grid-cols-4 gap-2">
                {SEMAINE.map((s, i) => {
                  const pris = ligne.etats[i] === "pris";
                  const actif = choix?.article === ligne.id && choix.samedi === i;
                  const fait = estReserve(ligne.id, i);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      data-film={`${ligne.id}-${s.id}`}
                      disabled={pris || fait}
                      aria-pressed={actif}
                      aria-label={`${ligne.nom}, ${s.long} : ${pris ? "pris" : fait ? "réservé" : "libre"}`}
                      onClick={() => {
                        setChoix({ article: ligne.id, samedi: i });
                        setReserve(null);
                      }}
                      className={`flex h-[60px] flex-col items-center justify-center rounded-[12px] border text-center transition-all duration-300 ${
                        fait
                          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]"
                          : pris
                            ? "cursor-not-allowed border-[var(--trait)] bg-[var(--fond)] text-[var(--doux)]"
                            : actif
                              ? "scale-[1.04] border-[var(--sombre)] bg-[var(--sombre)] text-[var(--sur-sombre)]"
                              : "border-[var(--encre)]/40 bg-[var(--carte)] hover:border-[var(--encre)]"
                      }`}
                    >
                      <span className="text-[13px] font-semibold leading-tight">{s.court}</span>
                      <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.06em]">{fait ? "Réservé ✓" : pris ? "Pris" : "Libre"}</span>
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
        <p className="border-t border-[var(--trait)] px-4 py-3 text-[13px] text-[var(--doux)]">
          Disponibilités d&apos;exemple : l&apos;entreprise est fictive. Sur un vrai site, elles bougent à chaque réservation.
        </p>
      </div>

      {/* Le récapitulatif, collé au bas de l'écran tant que la grille est en vue. */}
      <div className="sticky bottom-3 z-10 mt-4" aria-live="polite">
        {art && choix && (
          <div data-film="recap" className="space-y-3 rounded-[22px] border border-[var(--sombre)] bg-[var(--sombre)] p-4 text-[var(--sur-sombre)] shadow-[0_18px_40px_-18px_rgba(30,48,21,.8)]">
            {reserve ? (
              <div role="status" className="space-y-1.5">
                <p className="font-[family-name:var(--titres)] text-[26px] leading-tight text-[#F2C98A]">Réservé ✓</p>
                <p className="font-semibold">
                  {art.nom}, {SEMAINE[reserve.samedi].long}
                  {chauffeur && art.chauffeur ? ", avec chauffeur" : ""}.
                </p>
                <p className="text-[13px]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
                <button type="button" onClick={() => { setReserve(null); setChoix(null); }} className="text-[13px] font-semibold underline underline-offset-4">
                  Choisir un autre samedi
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-semibold leading-snug">
                    {art.court}
                    <br />
                    {majuscule(SEMAINE[choix.samedi].long)}
                  </p>
                  <p className="text-right">
                    <span className="block font-[family-name:var(--titres)] text-[26px] tabular-nums">{euros(prix)}</span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.1em]">TTC · exemple</span>
                  </p>
                </div>
                {art.chauffeur && (
                  <label className="flex cursor-pointer items-center gap-3 text-[14px] font-semibold">
                    <input type="checkbox" checked={chauffeur} onChange={(e) => setChauffeur(e.target.checked)} className="h-5 w-5 accent-[var(--accent)]" />
                    Avec chauffeur ({euros(art.chauffeur)} la journée)
                  </label>
                )}
                <button
                  type="button"
                  onClick={() => setReserve(choix)}
                  className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] text-[16px] font-semibold text-[var(--sur-accent)]"
                >
                  Réserver ce samedi
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
