"use client";

import { useState } from "react";
import { AUTORISATION, AVANTAGE, HEURE_HT, PHRASE_DEVIS, TVA, euros } from "./donnees";

const JOURS = [
  { id: "lun", court: "Lun", long: "lundi" },
  { id: "mar", court: "Mar", long: "mardi" },
  { id: "mer", court: "Mer", long: "mercredi" },
  { id: "jeu", court: "Jeu", long: "jeudi" },
  { id: "ven", court: "Ven", long: "vendredi" },
  { id: "sam", court: "Sam", long: "samedi" },
];

const POUR = [
  { id: "moi", libelle: "Pour moi", resume: "pour toi" },
  { id: "parent", libelle: "Pour ma mère ou mon père", resume: "pour ton parent" },
  { id: "proche", libelle: "Pour un proche", resume: "pour un proche" },
];

const liste = (mots: string[]) => (mots.length < 2 ? mots.join("") : `${mots.slice(0, -1).join(", ")} et ${mots.at(-1)}`);

/**
 * Le devis en trois questions : combien d'heures, quels jours, pour qui. Le résumé se
 * met à jour en haut de la carte ; l'estimation suit, en HT et TTC, et l'avantage
 * fiscal reste à part, en plus petit. Rien n'est envoyé.
 */
export default function Devis() {
  const [heures, setHeures] = useState(2);
  const [jours, setJours] = useState<string[]>([]);
  const [pour, setPour] = useState<string | null>(null);
  const [demande, setDemande] = useState(false);
  const joursChoisis = JOURS.filter((j) => jours.includes(j.id));
  const ht = heures * HEURE_HT;
  const choixPour = POUR.find((p) => p.id === pour);
  const complet = joursChoisis.length > 0 && choixPour;

  return (
    <div data-film="devis" className="overflow-hidden rounded-[32px] bg-[var(--carte)] shadow-[0_30px_60px_-40px_rgba(31,45,39,.5)]">
      <div className="bg-[var(--sombre)] px-6 py-4 text-[var(--sur-sombre)]" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C9D8CC]">Devis gratuit · ton résumé</p>
        <p className="mt-1 text-lg leading-snug">
          {heures} h par semaine
          {joursChoisis.length > 0 ? `, le ${liste(joursChoisis.map((j) => j.long))}` : ""}
          {choixPour ? `, ${choixPour.resume}` : ""}
        </p>
      </div>
      <div className="space-y-6 p-6">
        <label className="block space-y-2">
          <span className="flex items-baseline justify-between gap-4">
            <span className="font-semibold">1 · Combien d&apos;heures par semaine&nbsp;?</span>
            <span className="shrink-0 whitespace-nowrap font-[family-name:var(--titres)] text-2xl font-semibold tabular-nums">{heures}&nbsp;h</span>
          </span>
          <input id="ndj-heures" type="range" min={2} max={20} value={heures} onChange={(e) => setHeures(Number(e.target.value))} className="w-full accent-[#4A6E5A]" />
        </label>
        <fieldset className="space-y-2">
          <legend className="font-semibold">2 · Quels jours&nbsp;?</legend>
          <div className="grid grid-cols-6 gap-1.5">
            {JOURS.map((j) => {
              const actif = jours.includes(j.id);
              return (
                <button
                  key={j.id}
                  id={`ndj-jour-${j.id}`}
                  type="button"
                  aria-pressed={actif}
                  aria-label={j.long}
                  onClick={() => setJours(actif ? jours.filter((x) => x !== j.id) : [...jours, j.id])}
                  className={`min-h-[46px] rounded-full text-sm font-semibold transition-colors ${actif ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "bg-[#E6EDE4] text-[var(--encre)]"}`}
                >
                  {j.court}
                </button>
              );
            })}
          </div>
        </fieldset>
        <fieldset className="space-y-2">
          <legend className="font-semibold">3 · Pour qui&nbsp;?</legend>
          <div className="grid gap-2">
            {POUR.map((p) => (
              <button
                key={p.id}
                id={`ndj-pour-${p.id}`}
                type="button"
                aria-pressed={pour === p.id}
                onClick={() => setPour(p.id)}
                className={`min-h-[48px] rounded-full border-2 px-5 text-left font-semibold transition-colors ${pour === p.id ? "border-[var(--accent)] bg-[#E6EDE4]" : "border-[var(--trait)]"}`}
              >
                {p.libelle}
              </button>
            ))}
          </div>
        </fieldset>

        {complet && (
          <div className="rounded-[24px] bg-[#E6EDE4] p-5 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Estimation par semaine</p>
            <p className="font-[family-name:var(--titres)] text-5xl font-semibold tabular-nums">{euros(ht * (1 + TVA))}</p>
            <p className="text-lg">TTC, soit {euros(ht)} HT · exemple</p>
          </div>
        )}
        {pour === "parent" && <p className="rounded-2xl border border-[var(--trait)] p-4 text-sm text-[var(--doux)]">{AUTORISATION} Nous t&apos;indiquons les services qui l&apos;ont.</p>}

        {demande ? (
          <div role="status" className="rounded-[24px] border-2 border-[var(--accent)] p-5 space-y-1">
            <p className="font-semibold">Demande de devis prête : on te rappellerait pour venir faire connaissance.</p>
            <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
          </div>
        ) : (
          <button
            id="ndj-recevoir"
            type="button"
            disabled={!complet}
            onClick={() => setDemande(true)}
            className="w-full min-h-[56px] rounded-full bg-[var(--accent)] px-6 text-lg font-semibold text-[var(--sur-accent)] disabled:bg-[var(--trait)] disabled:text-[var(--encre)]"
          >
            {complet ? "Recevoir mon devis" : "Réponds aux trois questions"}
          </button>
        )}

        <div className="space-y-2 border-t border-dashed border-[var(--trait)] pt-4 text-[13px] leading-relaxed text-[var(--doux)]">
          <p>{AVANTAGE}</p>
          <p>{PHRASE_DEVIS}</p>
        </div>
      </div>
    </div>
  );
}
