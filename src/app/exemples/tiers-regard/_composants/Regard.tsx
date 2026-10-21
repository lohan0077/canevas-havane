"use client";

import { useState } from "react";
import Image from "next/image";
import { POINTS } from "./donnees";

/**
 * Ce qu'on regarde, sur une vraie pièce : des points numérotés posés sur la photo. On
 * touche un point (ou une ligne de la liste), l'étiquette s'affiche sur la photo et la
 * ligne s'ouvre. Ce sont des endroits qu'un diagnostic examine, pas des défauts : la
 * légende le dit.
 */
export default function Regard() {
  const [actif, setActif] = useState("prises");
  const point = POINTS.find((p) => p.id === actif) ?? POINTS[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
      <figure className="space-y-3">
        <div data-film="photo-regard" className="relative aspect-[3/2] overflow-hidden rounded-[10px] border border-[var(--trait)]">
          <Image
            src="/exemples/tiers-regard/salon-cheminee.webp"
            alt="Un salon ancien et clair : une commode, une lampe, trois fenêtres en rotonde, une cheminée de brique surmontée d'un miroir"
            fill
            priority
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[#0F141C]/25" />
          {POINTS.map((p, i) => {
            const elle = p.id === actif;
            return (
              <button
                key={p.id}
                type="button"
                data-film={`point-${p.id}`}
                aria-pressed={elle}
                aria-label={`${i + 1}. ${p.titre} : ${p.diagnostic}`}
                onClick={() => setActif(p.id)}
                className={`absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[13px] font-bold transition-transform ${elle ? "scale-110 bg-[var(--accent)] text-[var(--sur-accent)] ring-4 ring-[var(--accent)]/30" : "bg-[#0F141C]/85 text-[#F3F4F6] ring-1 ring-[#F3F4F6]/70"}`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                {i + 1}
              </button>
            );
          })}
          <p
            aria-hidden="true"
            className={`pointer-events-none absolute hidden max-w-[55%] -translate-y-1/2 rounded-[4px] bg-[#0F141C]/90 px-2.5 py-1.5 text-[12px] font-medium uppercase leading-tight tracking-[0.12em] text-[#F3F4F6] sm:block ${point.x > 55 ? "-translate-x-[calc(100%+22px)]" : "translate-x-[22px]"}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            <span className="text-[#F5D90A]">{point.diagnostic}</span> · {point.titre}
          </p>
          <p
            data-film="lecture-regard"
            aria-live="polite"
            className="absolute inset-x-2 bottom-2 rounded-[4px] bg-[#0F141C]/90 px-3 py-2 text-[12px] font-medium uppercase leading-tight tracking-[0.12em] text-[#F3F4F6] sm:hidden"
          >
            <span className="text-[#F5D90A]">{POINTS.indexOf(point) + 1} · {point.diagnostic}</span> · {point.titre}
          </p>
        </div>
        <figcaption className="text-[13px] text-[var(--doux)]">Les endroits qu&apos;un diagnostic examine, pas des défauts trouvés dans ce salon.</figcaption>
      </figure>

      <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]" data-film="liste-regard">
        {POINTS.map((p, i) => {
          const elle = p.id === actif;
          return (
            <li key={p.id}>
              <button type="button" aria-expanded={elle} onClick={() => setActif(p.id)} className="flex w-full items-start gap-3 py-3.5 text-left">
                <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[12px] font-bold ${elle ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--trait)] text-[var(--doux)]"}`}>{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className="text-[16px] font-medium">{p.titre}</span>
                    <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--accent-texte)]">{p.diagnostic}</span>
                  </span>
                  {elle && <span className="mt-1.5 block text-[15px] leading-relaxed text-[var(--doux)]">{p.texte}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
