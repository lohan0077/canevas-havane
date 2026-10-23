"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CIELS, ORIENTATIONS, SAISONS, depart, enMots, forme, heure, niveau, type Forme } from "./soleil";

// Le cadre du graphique : de 6 h à 22 h.
const L = 340, H = 188, G = 12, D = 328, HAUT = 18, BAS = 150;
const X = (h: number) => G + ((h - 6) / 16) * (D - G);
const Y = (n: number) => BAS - n * (BAS - HAUT);
const ETIQUETTES = [6, 9, 12, 15, 18, 21];

const melange = (a: Forme, b: Forme, p: number): Forme => ({
  pic: a.pic + (b.pic - a.pic) * p,
  largeur: a.largeur + (b.largeur - a.largeur) * p,
  ampleur: a.ampleur + (b.ampleur - a.ampleur) * p,
  lever: a.lever + (b.lever - a.lever) * p,
  coucher: a.coucher + (b.coucher - a.coucher) * p,
});

function trace(f: Forme) {
  const pts: string[] = [];
  for (let h = 6; h <= 22.001; h += 0.125) pts.push(`${X(h).toFixed(1)} ${Y(niveau(f, h)).toFixed(1)}`);
  const ligne = `M${pts.join(" L")}`;
  return { ligne, aire: `${ligne} L${X(22)} ${BAS} L${X(6)} ${BAS} Z` };
}

function Choix<T extends { id: string }>({
  legende,
  options,
  valeur,
  libelle,
  surChoix,
  prefixe,
  colonnes,
}: {
  legende: string;
  options: T[];
  valeur: string;
  libelle: (o: T) => string;
  surChoix: (id: string) => void;
  prefixe: string;
  colonnes: string;
}) {
  return (
    <fieldset className="space-y-2 min-w-0">
      <legend className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--doux)] mb-2">{legende}</legend>
      <div className={`grid ${colonnes} gap-1.5 rounded-2xl bg-[var(--fond)] p-1.5`}>
        {options.map((o) => {
          const actif = o.id === valeur;
          return (
            <button
              key={o.id}
              id={`${prefixe}-${o.id}`}
              type="button"
              aria-pressed={actif}
              onClick={() => surChoix(o.id)}
              className={`h-11 rounded-xl px-1 text-[15px] font-semibold transition-colors ${actif ? "bg-[var(--sombre)] text-[var(--sur-sombre)] shadow-sm" : "text-[var(--encre)] hover:bg-[var(--carte)]"}`}
            >
              {libelle(o)}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * « Ton toit, heure par heure » : l'orientation, la saison et le ciel, et la forme de
 * la journée qui en sort. Le curseur promène l'heure ; le conseil dit quand lancer un
 * appareil qui tourne deux heures. Tout se calcule dans le navigateur. Posé dans le
 * cadre `Appli` ; les `id` (toit-*, courbe, heure, conseil) servent au tournage de la
 * vidéo « Remplir l'agenda ».
 */
export default function Journee({ titre = true }: { titre?: boolean }) {
  const [orientation, setOrientation] = useState("sud");
  const [saison, setSaison] = useState("ete");
  const [ciel, setCiel] = useState("soleil");
  const [h, setH] = useState(13.5);
  const o = ORIENTATIONS.find((x) => x.id === orientation) ?? ORIENTATIONS[2];
  const s = SAISONS.find((x) => x.id === saison) ?? SAISONS[0];
  const c = CIELS.find((x) => x.id === ciel) ?? CIELS[0];
  const cible = useMemo(() => forme(o, s, c), [o, s, c]);

  // La courbe glisse d'un réglage à l'autre au lieu de sauter.
  const [vue, setVue] = useState<Forme>(cible);
  const affichee = useRef<Forme>(cible);
  useEffect(() => {
    const de = affichee.current;
    let id = 0;
    let t0 = -1;
    const pas = (t: number) => {
      if (t0 < 0) t0 = t;
      const p = Math.min(1, (t - t0) / 700);
      const f = melange(de, cible, 1 - (1 - p) ** 3);
      affichee.current = f;
      setVue(f);
      if (p < 1) id = requestAnimationFrame(pas);
    };
    id = requestAnimationFrame(pas);
    return () => cancelAnimationFrame(id);
  }, [cible]);

  // La courbe se dessine la première fois qu'elle entre à l'écran — sans animation si
  // elle y est déjà à l'ouverture de la page.
  const graphe = useRef<HTMLDivElement>(null);
  const [dessinee, setDessinee] = useState(false);
  const [sansAnimation, setSansAnimation] = useState(false);
  useEffect(() => {
    const el = graphe.current;
    if (!el) return;
    const ouverture = performance.now();
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (performance.now() - ouverture < 400) setSansAnimation(true);
        setDessinee(true);
        obs.disconnect();
      }
    }, { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { ligne, aire } = trace(vue);
  const n = niveau(vue, h);
  const soleilY = Y(niveau(vue, vue.pic));
  const conseil = depart(cible);
  const gris = ciel === "gris";

  return (
    <div data-film="journee" className="space-y-6">
      {titre && (
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-[family-name:var(--titres)] text-xl font-semibold">Ta journée</p>
          <p className="text-sm text-[var(--doux)]">forme indicative</p>
        </div>
      )}
      <Choix legende="Ton toit regarde" options={ORIENTATIONS} valeur={orientation} libelle={(x) => x.court} surChoix={setOrientation} prefixe="toit" colonnes="grid-cols-5" />
      <div className="grid grid-cols-2 gap-3">
        <Choix legende="Saison" options={SAISONS} valeur={saison} libelle={(x) => x.nom} surChoix={setSaison} prefixe="saison" colonnes="grid-cols-2" />
        <Choix legende="Ciel" options={CIELS} valeur={ciel} libelle={(x) => x.nom} surChoix={setCiel} prefixe="ciel" colonnes="grid-cols-2" />
      </div>

      <div ref={graphe} id="courbe" className={`relative ${sansAnimation ? "[&_*]:!transition-none" : ""}`}>
        <svg viewBox={`0 0 ${L} ${H}`} className="w-full h-auto block" role="img" aria-label={`Courbe de production d'une journée, toit ${o.nom}, ${s.nom.toLowerCase()}, ciel ${c.nom.toLowerCase()} : pic vers ${heure(cible.pic)}.`}>
          <defs>
            <linearGradient id="mp-aire" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--accent)" stopOpacity="0.95" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          {ETIQUETTES.map((e) => (
            <line key={e} x1={X(e)} x2={X(e)} y1={HAUT - 6} y2={BAS} stroke="var(--trait)" strokeDasharray="2 4" />
          ))}
          <line x1={G} x2={D} y1={BAS} y2={BAS} stroke="var(--encre)" strokeWidth="1.5" />
          <path d={aire} fill="url(#mp-aire)" style={{ opacity: dessinee ? 1 : 0, transition: "opacity 900ms ease 500ms" }} />
          <path
            d={ligne}
            fill="none"
            stroke="var(--encre)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            style={{ strokeDashoffset: dessinee ? 0 : 1, transition: "stroke-dashoffset 1400ms cubic-bezier(.3,.7,.2,1)" }}
          />
          {/* Le soleil, au-dessus du pic. */}
          <g transform={`translate(${X(vue.pic)} ${Math.min(soleilY, BAS) - 16})`} style={{ opacity: dessinee ? 1 : 0, transition: "opacity 500ms ease 1100ms" }}>
            {Array.from({ length: 8 }, (_, k) => (
              <line key={k} x1="0" y1="-13" x2="0" y2="-17" stroke="var(--accent-texte)" strokeWidth="2" strokeLinecap="round" transform={`rotate(${k * 45})`} />
            ))}
            <circle r="9" fill={gris ? "var(--doux)" : "var(--accent)"} stroke="var(--encre)" strokeWidth="1.5" />
          </g>
          {/* L'heure que promène le curseur. */}
          <line x1={X(h)} x2={X(h)} y1={HAUT - 6} y2={BAS} stroke="var(--accent-texte)" strokeWidth="1.5" />
          <circle cx={X(h)} cy={Y(n)} r="5" fill="var(--carte)" stroke="var(--accent-texte)" strokeWidth="2.5" />
          {ETIQUETTES.map((e) => (
            <text key={e} x={X(e)} y={H - 14} textAnchor="middle" fontSize="12" fill="var(--doux)" className="tabular-nums">{e} h</text>
          ))}
        </svg>
      </div>

      <label className="block space-y-2.5">
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--doux)]">Glisse l'heure</span>
          <span className="text-lg font-bold tabular-nums">{heure(h)}</span>
        </span>
        <input
          id="heure"
          type="range"
          min={6}
          max={22}
          step={0.25}
          value={h}
          onChange={(e) => setH(Number(e.target.value))}
          className="w-full h-2.5 rounded-full appearance-none cursor-pointer bg-[var(--trait)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[var(--encre)] [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--accent)] [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[var(--encre)]"
        />
        <span className="block text-[15px]" aria-live="polite">
          À {heure(h)}, ton toit donne <strong>{enMots(n, cible.ampleur)}</strong>.
        </span>
      </label>

      <div id="conseil" role="status" className="rounded-[22px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-5 space-y-1.5">
        <p className="text-xs font-bold uppercase tracking-[0.16em]">Le conseil du jour</p>
        <p className="font-[family-name:var(--titres)] text-[28px] leading-tight">
          Lance la machine vers <span className="text-[var(--accent)] whitespace-nowrap">{heure(conseil)}</span>
        </p>
        <p className="text-sm">
          {gris
            ? `Par temps gris, ton toit donne beaucoup moins, sans s'arrêter : si tu peux, garde la machine pour un jour clair. Sinon, ${heure(conseil)} reste le meilleur moment.`
            : `Ton toit ${o.nom} donne le plus vers ${heure(cible.pic)} en ${s.nom.toLowerCase()}. Une machine de deux heures lancée à ${heure(conseil)} tourne pendant ton pic.`}
        </p>
        <p className="text-xs pt-1">Exemple · selon ton toit · forme indicative, pas une mesure</p>
      </div>
    </div>
  );
}
