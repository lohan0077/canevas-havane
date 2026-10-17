"use client";

import { useState } from "react";
import { DECOUPE, PRIX_KILO, euros } from "./donnees";
import Prevenir from "./Prevenir";

/**
 * Les vingt colis de la découpe, un par case : ceux qui sont réservés, ceux qui
 * restent. On touche une case libre, on la met de côté, le compteur baisse d'un.
 * Quand le dernier part, la case laisse la place à la découpe suivante.
 * Le point de départ (14 sur 20) est un exemple ; rien ne quitte le navigateur.
 */
export default function Compteur() {
  const [reserves, setReserves] = useState<number[]>(DECOUPE.reserves);
  const [miens, setMiens] = useState<number[]>([]);
  const [choisi, setChoisi] = useState<number | null>(null);
  const restent = DECOUPE.total - reserves.length;

  const reserver = () => {
    if (choisi === null) return;
    setReserves([...reserves, choisi]);
    setMiens([...miens, choisi]);
    setChoisi(null);
  };

  return (
    <div id="colis-restants" className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7 space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Colis de 10 kg</p>
          <p className="font-[family-name:var(--titres)] text-4xl leading-none tabular-nums" aria-live="polite">
            {restent > 0 ? <>{restent} <span className="italic">{restent > 1 ? "restent" : "reste"}</span></> : <span className="italic">Tout est parti</span>}
          </p>
        </div>
        <p className="text-right text-sm text-[var(--doux)] tabular-nums">
          <strong className="block text-2xl font-semibold text-[var(--encre)]">{reserves.length} / {DECOUPE.total}</strong>
          réservés
        </p>
      </div>

      <ol className="grid grid-cols-5 gap-2" aria-label="Les vingt colis de la découpe">
        {Array.from({ length: DECOUPE.total }, (_, k) => k + 1).map((n) => {
          const pris = reserves.includes(n);
          const mien = miens.includes(n);
          const actif = choisi === n;
          return (
            <li key={n}>
              <button
                type="button"
                disabled={pris}
                aria-pressed={actif}
                aria-label={`Colis n° ${n}, ${mien ? "réservé pour toi" : pris ? "déjà réservé" : "libre"}`}
                onClick={() => setChoisi(actif ? null : n)}
                className={`grid aspect-square w-full place-items-center rounded-xl border text-sm font-semibold tabular-nums transition-colors ${
                  mien
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]"
                    : pris
                      ? "border-[var(--trait)] bg-[var(--sombre)] text-[var(--doux)] [background-image:repeating-linear-gradient(135deg,transparent_0_6px,rgba(255,255,255,0.05)_6px_8px)]"
                      : actif
                        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)] ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--carte)]"
                        : "border-[var(--accent)] bg-[var(--fond)] text-[var(--encre)] hover:bg-[var(--carte)]"
                }`}
              >
                {mien ? "✓" : n}
              </button>
            </li>
          );
        })}
      </ol>

      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-[var(--doux)]" aria-hidden="true">
        <li className="flex items-center gap-1.5"><i className="h-3 w-3 rounded-sm border border-[var(--trait)] bg-[var(--sombre)]" />Réservé</li>
        <li className="flex items-center gap-1.5"><i className="h-3 w-3 rounded-sm border border-[var(--accent)]" />Libre</li>
        <li className="flex items-center gap-1.5"><i className="h-3 w-3 rounded-sm bg-[var(--accent)]" />Le tien</li>
      </ul>

      {restent === 0 ? (
        <Prevenir detail={`Découpe du ${DECOUPE.date}`} />
      ) : choisi !== null ? (
        <div className="rounded-2xl border border-[var(--trait)] bg-[var(--fond)] p-4 space-y-3">
          <p className="text-lg">
            <strong className="font-semibold">Colis n° {choisi}</strong> · 10 kg · <span className="tabular-nums">{euros(10 * PRIX_KILO)}</span> TTC
          </p>
          <p className="text-sm text-[var(--doux)]">Retrait le {DECOUPE.retrait}. Paiement sur place.</p>
          <button type="button" onClick={reserver} className="w-full rounded-full bg-[var(--accent)] px-6 py-3.5 text-lg font-semibold text-[var(--sur-accent)]">
            Mettre ce colis de côté
          </button>
        </div>
      ) : miens.length > 0 ? (
        <div role="status" className="rounded-2xl border-2 border-[var(--accent)] p-4 space-y-1">
          <p className="font-semibold">
            {miens.length > 1 ? `Colis n° ${miens.join(", n° ")} mis de côté pour toi.` : `Colis n° ${miens[0]} mis de côté pour toi.`} À samedi.
          </p>
          <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        </div>
      ) : (
        <p className="text-sm">Touche un colis libre pour le mettre de côté.</p>
      )}

      <p className="text-xs leading-relaxed text-[var(--doux)]">
        Compteur et prix d&apos;exemple (TTC). Sur un vrai site, ce sont les vrais colis : le compteur suit les réservations de la ferme, une par une.
      </p>
    </div>
  );
}
