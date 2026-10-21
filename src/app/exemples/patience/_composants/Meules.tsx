"use client";

import { useState } from "react";
import { MEULES, euros } from "./donnees";

/**
 * Réserver sa meule, comme dans la vidéo : trente grandes tommes entrées en cave le
 * 14 octobre, prêtes le 14 avril. On choisit son numéro, on la réserve ; elle reste
 * en cave six mois, photographiée chaque mois. Rien n'est envoyé, rien n'est payé.
 */
export default function Meules() {
  const [choisie, setChoisie] = useState<number | null>(null);
  const [reservee, setReservee] = useState(false);
  const prix = parseFloat(MEULES.poids) * MEULES.prixKg;

  return (
    <div className="space-y-5">
      <div data-film="numeros" className="grid grid-cols-6 gap-2">
        {Array.from({ length: MEULES.nombre }, (_, i) => i + 1).map((n) => {
          const prise = MEULES.reservees.includes(n);
          const active = choisie === n;
          return (
            <button
              key={n}
              type="button"
              data-meule={n}
              disabled={prise || reservee}
              aria-pressed={active}
              aria-label={`Meule n° ${n}${prise ? ", déjà réservée" : ""}`}
              onClick={() => setChoisie(n)}
              className={`aspect-square rounded-full border text-sm font-semibold [font-variant-numeric:lining-nums] transition-colors ${
                prise
                  ? "border-[var(--trait)] text-[var(--doux)] line-through"
                  : active
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]"
                    : "border-[var(--accent)] text-[var(--encre)] hover:bg-[var(--carte)]"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-[var(--doux)]">
        Trente meules, pas une de plus : c&apos;est ce que tient la planche. Les numéros barrés
        sont déjà réservés — un exemple, la fromagerie est fictive.
      </p>

      <div data-film="meule" aria-live="polite" className="space-y-4 rounded-[20px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Réserver une meule</p>
        <p className="font-[family-name:var(--titres)] text-[2rem] leading-tight">
          {choisie ? <>Meule n° <span className="[font-variant-numeric:lining-nums]">{choisie}</span>, prête en <em>avril</em></> : <>Prête en <em>avril</em></>}
        </p>
        <ul className="space-y-1.5">
          <li>{MEULES.nom} · {MEULES.poids}</li>
          <li>Une photo d&apos;elle chaque mois</li>
          <li>Retrait en boutique, le {MEULES.pret}</li>
        </ul>
        <p className="rounded-[12px] bg-[var(--fond)] p-3 text-sm">
          <span className="font-semibold">{MEULES.lait}.</span> Allergène : <strong>lait</strong>.
        </p>
        <p className="[font-variant-numeric:lining-nums]">
          {euros(prix)} TTC <span className="text-sm text-[var(--doux)]">({euros(MEULES.prixKg)} le kg · exemple) · payée au retrait</span>
        </p>
        {reservee && choisie ? (
          <div role="status" className="space-y-1 rounded-[12px] border border-[var(--accent)] p-4">
            <p className="font-[family-name:var(--titres)] text-2xl">Meule n° <span className="[font-variant-numeric:lining-nums]">{choisie}</span> : réservée</p>
            <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
          </div>
        ) : (
          <button
            type="button"
            disabled={!choisie}
            onClick={() => setReservee(true)}
            className="w-full min-h-14 rounded-full bg-[var(--accent)] px-6 text-lg font-semibold text-[var(--sur-accent)] disabled:cursor-not-allowed disabled:bg-[var(--trait)] disabled:text-[var(--encre)]"
          >
            {choisie ? "Réserver ma meule" : "Choisis ton numéro"}
          </button>
        )}
      </div>
    </div>
  );
}
