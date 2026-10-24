"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, TENTES, tente as trouver } from "./donnees";
import s from "./VueDuCiel.module.css";

// La vue du ciel est dessinée en mètres : 1 unité du dessin = 1 m. Le pré fait 48 × 36 m ;
// la zone libre (ni maison, ni arbres, ni allée) va de x = 6 à 44 et de y = 13 à 33.
// Une tente rentre si elle y tient avec un mètre de marge tout autour, pour les piquets.
const LIBRE = { x: 6, y: 13, l: 38, h: 20 };
const CENTRE = { x: 26, y: 23 };
const ARBRES = [
  { x: 40, y: 5, r: 4.2 }, { x: 45.5, y: 11, r: 3.2 }, { x: 22, y: 4, r: 3 },
  { x: 3, y: 31, r: 3.2 }, { x: 45, y: 32.5, r: 3.6 }, { x: 31, y: 3.5, r: 2.4 },
];

/**
 * L'outil de l'accueil : on tape son adresse, la tente se pose sur la vue du ciel du
 * pré, à l'échelle, avec ses tables ; le verdict dit si elle rentre. La vue est
 * dessinée pour la démonstration (un vrai site afficherait la photo aérienne de l'IGN)
 * et l'adresse tapée ne quitte pas le navigateur.
 */
export default function VueDuCiel() {
  const [adresse, setAdresse] = useState("");
  const [cherchee, setCherchee] = useState<string | null>(null);
  const [id, setId] = useState("10x15");
  const [tournee, setTournee] = useState(false);
  const [tables, setTables] = useState(true);
  const t = trouver(id);

  // Dans le dessin, la tente est couchée (sa longueur sur l'axe x) ; tournée, elle se dresse.
  const L = tournee ? t.largeur : t.longueur;
  const H = tournee ? t.longueur : t.largeur;
  const rentre = L + 2 <= LIBRE.l && H + 2 <= LIBRE.h;

  // Les tables rondes, en rangées le long de la tente (dessin, pas un plan de salle).
  const rangs = t.largeur <= 6 ? 2 : 3;
  const colonnes = Math.ceil(t.tables / rangs);
  const positions = Array.from({ length: t.tables }, (_, k) => ({
    x: -t.longueur / 2 + (t.longueur / colonnes) * ((k % colonnes) + 0.5),
    y: -t.largeur / 2 + (t.largeur / rangs) * (Math.floor(k / colonnes) + 0.5),
  }));
  const cle = `${id}-${tournee}`;

  return (
    <div className="space-y-4">
      <form
        className="relative"
        onSubmit={(e) => {
          e.preventDefault();
          setCherchee(adresse.trim() || "ton adresse");
        }}
      >
        <label className="sr-only" htmlFor="psp-adresse">Ton adresse</label>
        <input
          id="psp-adresse"
          name="adresse"
          autoComplete="off"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          placeholder="Ton adresse"
          className="w-full rounded-full border border-[var(--encre)] bg-[var(--carte)] pl-5 pr-16 h-14 text-[17px] placeholder:text-[var(--doux)]"
        />
        <button
          type="submit"
          aria-label="Voir mon pré"
          className="absolute right-1.5 top-1.5 grid h-11 w-11 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)]"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
            <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>

      <div id="vue-du-ciel" className="overflow-hidden rounded-2xl border border-[var(--encre)] bg-[#DCE8C8]">
        <div className="relative">
          <svg viewBox="0 0 48 36" className="block w-full h-auto" role="img" aria-label={cherchee ? `Vue du ciel dessinée du pré, avec une tente de ${t.largeur} × ${t.longueur} m` : "Vue du ciel en attente d'une adresse"}>
            <defs>
              <pattern id="psp-tonte" width="4" height="36" patternUnits="userSpaceOnUse">
                <rect width="2" height="36" fill="#9CC07A" />
                <rect x="2" width="2" height="36" fill="#93B872" />
              </pattern>
            </defs>
            {cherchee ? (
              <>
                <rect width="48" height="36" fill="url(#psp-tonte)" />
                <rect x="0.6" y="0.6" width="46.8" height="34.8" fill="none" stroke="#FBF7EE" strokeWidth="0.25" strokeDasharray="1 0.8" />
                <path d="M6 36 C 6.5 28, 8 19, 9 11" fill="none" stroke="#E8DCC2" strokeWidth="2.2" strokeLinecap="round" />
                <g>
                  <rect x="2.5" y="2.5" width="13" height="8.5" fill="#9A8E80" />
                  <path d="M2.5 6.75h13" stroke="#7D7266" strokeWidth="0.35" />
                  <rect x="5" y="11" width="7" height="2" fill="#D9CBB2" />
                </g>
                {ARBRES.map((a) => (
                  <g key={`${a.x}-${a.y}`}>
                    <circle cx={a.x + 0.6} cy={a.y + 0.8} r={a.r} fill="#2F4A22" opacity="0.25" />
                    <circle cx={a.x} cy={a.y} r={a.r} fill="#4E7A35" />
                    <circle cx={a.x - a.r * 0.3} cy={a.y - a.r * 0.3} r={a.r * 0.45} fill="#6E9A4E" />
                  </g>
                ))}
                <g key={cle} transform={`translate(${CENTRE.x} ${CENTRE.y}) rotate(${tournee ? 90 : 0})`}>
                  <g className={s.pose}>
                    <rect x={-t.longueur / 2 - 0.4} y={-t.largeur / 2 + 0.6} width={t.longueur} height={t.largeur} fill="#2F4A22" opacity="0.22" />
                    <rect
                      x={-t.longueur / 2}
                      y={-t.largeur / 2}
                      width={t.longueur}
                      height={t.largeur}
                      fill="#FFFDF7"
                      stroke={rentre ? "#B04E2F" : "#B3261E"}
                      strokeWidth={rentre ? 0.3 : 0.5}
                      strokeDasharray={rentre ? undefined : "1 0.6"}
                    />
                    <path d={`M${-t.longueur / 2} 0H${t.longueur / 2}`} stroke="#E4D9C4" strokeWidth="0.2" />
                    {tables &&
                      positions.map((p, k) => (
                        <circle
                          key={k}
                          className={s.table}
                          style={{ animationDelay: `${0.7 + k * 0.05}s` }}
                          cx={p.x}
                          cy={p.y}
                          r="0.85"
                          fill="#EAD9BE"
                          stroke="#B04E2F"
                          strokeWidth="0.12"
                        />
                      ))}
                  </g>
                </g>
                <g transform="translate(34.5 33.6)">
                  <rect x="-0.6" y="-1.6" width="11.2" height="2.6" rx="0.5" fill="#FBF7EE" opacity="0.9" />
                  <path d="M0 0h10" stroke="#22311B" strokeWidth="0.3" />
                  <path d="M0 -0.5v1M10 -0.5v1" stroke="#22311B" strokeWidth="0.3" />
                  <text x="5" y="-0.45" textAnchor="middle" fontSize="1.1" fill="#22311B">10 m</text>
                </g>
              </>
            ) : (
              <>
                <rect width="48" height="36" fill="#E7EEDC" />
                <path d="M0 24c8-3 14 2 22-1s14 2 26-2" fill="none" stroke="#C9D8B4" strokeWidth="0.4" />
                <path d="M0 12c10 2 16-3 26 0s14-2 22 1" fill="none" stroke="#C9D8B4" strokeWidth="0.4" />
              </>
            )}
          </svg>

          {cherchee ? (
            <p className="absolute left-3 top-3 max-w-[70%] truncate rounded-full bg-[var(--fond)] px-3 py-1.5 text-[13px] font-medium">
              <span aria-hidden="true">● </span>
              {cherchee}
            </p>
          ) : (
            <p className="absolute inset-0 grid place-items-center px-8 text-center font-[family-name:var(--titres)] text-[22px] text-[var(--encre)]">
              Ton pré, vu du ciel, s&apos;affichera ici.
            </p>
          )}
        </div>
        {cherchee && (
          <div key={`v-${cle}`} role="status" className={`${s.verdict} border-t border-[var(--encre)] bg-[var(--fond)] px-4 py-3`}>
            {rentre ? (
              <>
                <p className="font-[family-name:var(--titres)] text-[24px] leading-tight">{t.invites} invités assis&nbsp;: <em>ça rentre.</em></p>
                <p className="text-[12px] text-[var(--doux)]">Tente {t.largeur} × {t.longueur} m · capacité du fabricant · vue dessinée · exemple</p>
              </>
            ) : (
              <>
                <p className="font-[family-name:var(--titres)] text-[24px] leading-tight">Dans ce sens, <em>elle déborde.</em></p>
                <p className="text-[12px] text-[var(--doux)]">Tourne-la, ou prends une tente plus petite.</p>
              </>
            )}
          </div>
        )}
      </div>

      {cherchee && (
        <div className="space-y-4">
          <div role="radiogroup" aria-label="La tente" className="grid grid-cols-3 gap-2">
            {TENTES.map((x) => (
              <button
                key={x.id}
                type="button"
                role="radio"
                aria-checked={x.id === id}
                onClick={() => setId(x.id)}
                className={`rounded-xl border px-2 py-2.5 text-center transition-colors ${x.id === id ? "border-[var(--encre)] bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
              >
                <span className="block font-[family-name:var(--titres)] text-[19px] leading-tight">{x.largeur} × {x.longueur}</span>
                <span className="block text-[12px]">{x.invites} assis</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setTournee((v) => !v)} className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--encre)] px-4 text-[15px] font-medium">
              <span aria-hidden="true">↻</span> Tourner la tente
            </button>
            <label className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-[var(--trait)] px-4 text-[15px] font-medium">
              <input type="checkbox" checked={tables} onChange={(e) => setTables(e.target.checked)} className="h-5 w-5 accent-[var(--accent)]" />
              Les tables
            </label>
          </div>
          <Link
            href={`${DOSSIER}/reserver#t-${id}`}
            className={`flex h-12 items-center justify-center rounded-full text-[15px] font-medium ${rentre ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--trait)] text-[var(--doux)] pointer-events-none"}`}
            aria-disabled={!rentre}
          >
            Réserver cette tente
          </Link>
        </div>
      )}

      <p className="text-[13px] leading-relaxed text-[var(--doux)]">
        Démonstration : la vue du ciel est dessinée, le vrai site afficherait la photo aérienne de l&apos;IGN. Ton adresse ne
        quitte pas ton téléphone. La capacité est celle du fabricant de chaque tente.
      </p>
    </div>
  );
}
