import type { Bulletin, Temps } from "./donnees";

/** Les pictogrammes du bulletin, dessinés ici : un trait, comme sur une carte météo. */
export function Picto({ temps, className = "h-10 w-10" }: { temps: Temps; className?: string }) {
  const trait = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const nuage = "M13 30h17a6 6 0 0 0 .6-12 8 8 0 0 0-15.4-1.6A6.5 6.5 0 0 0 13 30Z";
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true" className={className}>
      {temps === "soleil" && (
        <g {...trait}>
          <circle cx="22" cy="22" r="7" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path key={a} d="M22 6v5" transform={`rotate(${a} 22 22)`} />
          ))}
        </g>
      )}
      {temps === "gel" && (
        <g {...trait}>
          {[0, 60, 120].map((a) => (
            <g key={a} transform={`rotate(${a} 22 22)`}>
              <path d="M22 6v32M18 9l4 4 4-4M18 35l4-4 4 4" />
            </g>
          ))}
        </g>
      )}
      {temps === "pluie" && (
        <g {...trait}>
          <path d={nuage} />
          <path d="M15 34l-2 4M22 34l-2 4M29 34l-2 4" />
        </g>
      )}
      {temps === "nuage" && (
        <g {...trait}>
          <path d={nuage} transform="translate(0 3)" />
        </g>
      )}
      {temps === "eclaircie" && (
        <g {...trait}>
          <circle cx="28" cy="15" r="5" />
          <path d="M28 5v2.5M36.5 8.5l-1.8 1.8M38 15h-2.5" />
          <path d={nuage} transform="translate(-3 4)" />
        </g>
      )}
      {temps === "vent" && (
        <g {...trait}>
          <path d="M6 17h22a5 5 0 1 0-5-5M6 24h30a5 5 0 1 1-5 5M6 31h14" />
        </g>
      )}
    </svg>
  );
}

/** Les sept jours de la semaine, en bande : le temps, la température, la pluie. */
export function Semaine({ bulletin }: { bulletin: Bulletin }) {
  return (
    <ol className="grid grid-cols-7 border-y border-[var(--trait)]" aria-label={`Le temps, jour par jour, semaine ${bulletin.numero}`}>
      {bulletin.jours.map((j) => (
        <li key={j.jour} className="flex flex-col items-center gap-1.5 py-4 text-center">
          <span className="font-[family-name:var(--titres)] text-[11px] uppercase tracking-[0.14em]">{j.jour}</span>
          <Picto temps={j.temps} className={`h-8 w-8 ${j.temps === "gel" ? "text-[#2B6CA3]" : ""}`} />
          <span className="font-[family-name:var(--titres)] text-sm tabular-nums">{j.degres}</span>
          <span className="text-xs tabular-nums text-[var(--doux)]">{j.pluie ? `${j.pluie} mm` : "—"}</span>
        </li>
      ))}
    </ol>
  );
}

/** Les trois faits de la semaine, en grand : ce que le ciel a fait. */
export function Faits({ bulletin }: { bulletin: Bulletin }) {
  return (
    <ul className="divide-y divide-[var(--trait)]">
      {bulletin.faits.map((f) => (
        <li key={f.titre} className="flex items-center gap-5 py-5">
          <Picto temps={f.temps} className="h-12 w-12 shrink-0" />
          <div>
            <p className="font-[family-name:var(--titres)] text-2xl font-light uppercase leading-tight">{f.titre}</p>
            <p className="text-lg text-[var(--doux)]">{f.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
