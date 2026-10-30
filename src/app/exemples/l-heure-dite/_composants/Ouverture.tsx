"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Lisere, Surtitre, Titre } from "./Blocs";
import nuages from "./Ciel.module.css";
import { DOSSIER } from "./donnees";
import {
  APPELS,
  HEURE_DEPART,
  HEURE_MACHINE,
  angle,
  appelProche,
  auQuart,
  ciel,
  ecart,
  hauteur,
  heureDe,
  production,
  tour,
} from "./horloge";
import { enMots, heure as enHeure } from "./soleil";

// Le premier écran de L'Heure Dite : le toit-horloge. Une maison posée au centre d'une
// grande horloge couchée — celle de la photo du site, son cadre d'émail vert, ses chiffres
// noirs, sa trotteuse rouge. On tourne l'aiguille (en glissant sur le cadran, avec les
// boutons, ou les flèches du clavier) : le soleil fait le tour de la maison, les ombres
// tournent, les panneaux s'allument, la jauge suit, le ciel du cadre change. Et l'heure
// choisie mène à l'heure d'appel la plus proche : l'heure de l'appel et l'heure de la
// machine, dans le même geste.
//
// La 3D (three.js) n'est chargée qu'ici, à la demande. Avant elle, ou si le navigateur
// ne sait pas faire de 3D, le cadran vu du dessus la remplace : il lit le même calcul
// (horloge.ts) et se tourne de la même façon. À l'arrivée, l'aiguille fait une fois le
// tour de la journée ; avec « animations réduites », elle reste à midi et demi.

const ToitHorloge3D = dynamic(() => import("./ToitHorloge3D"), { ssr: false, loading: () => null });

const abonnerReduit = (f: () => void) => {
  const m = window.matchMedia("(prefers-reduced-motion: reduce)");
  m.addEventListener("change", f);
  return () => m.removeEventListener("change", f);
};
const useReduit = () =>
  useSyncExternalStore(abonnerReduit, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);

// Le navigateur sait-il faire de la 3D ? Demandé une fois, avant de monter la scène :
// sans WebGL, three.js n'est jamais démarré (ni ses erreurs en console), et le cadran
// 2D reste.
let webgl: boolean | null = null;
const lireWebgl = () => {
  if (webgl === null) {
    const essai = document.createElement("canvas");
    const gl = essai.getContext("webgl2") ?? essai.getContext("webgl");
    webgl = gl !== null;
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }
  return webgl;
};
const rien = () => () => {};
const useWebgl = () => useSyncExternalStore(rien, lireWebgl, () => false);

/* ---------- le cadran vu du dessus : l'affiche de la 3D, et sa remplaçante ---------- */

const K = 22.5; // pixels par unité du cadran (rayon du cadre : 8)
const C = 200;
// Arrondi au centième : le serveur et le navigateur ne calculent pas les sinus au même
// dernier chiffre, et l'affiche doit être la même des deux côtés.
const arrondi = (v: number) => Math.round(v * 100) / 100;
const pt = (r: number, h: number) => {
  const a = angle(h);
  return [arrondi(C + r * K * Math.sin(a)), arrondi(C + r * K * Math.cos(a))] as const;
};
// La cloche de la journée : un trait par quart d'heure, comme sur le cadran 3D.
const BARRES = Array.from({ length: 96 }, (_, q) => ({ q, n: production(q / 4) })).filter((b) => b.n >= 0.015);

function CadranPlat({ h, surGlisse }: { h: number; surGlisse: (h: number, etape: "debut" | "glisse" | "fin") => void }) {
  const a = (angle(h) * 180) / Math.PI;
  const e = hauteur(h);
  const jour = Math.min(1, Math.max(0, (e + 3) / 9));
  const prod = production(h);
  // L'ombre de la maison, à l'opposé du soleil : longue le matin et le soir.
  const longueur = jour > 0 ? Math.min(3.2, 2.6 / Math.tan((Math.max(e, 8) * Math.PI) / 180)) * K : 0;
  const [sx, sy] = pt(7.52, h);
  const geste = useRef<{ id: number; x: number; actif: boolean } | null>(null);
  const heureSous = (ev: React.PointerEvent<SVGSVGElement>) => {
    const b = ev.currentTarget.getBoundingClientRect();
    const x = ((ev.clientX - b.left) / b.width) * 400 - C;
    const y = ((ev.clientY - b.top) / b.height) * 400 - C;
    const r = Math.hypot(x, y) / K;
    return r < 0.6 || r > 9 ? null : heureDe(x, y);
  };
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      className="absolute inset-0 m-auto h-full w-full max-w-full touch-pan-y select-none"
      style={{ fontFamily: "var(--titres), sans-serif" }}
      onPointerDown={(ev) => {
        const v = heureSous(ev);
        if (v === null) return;
        const doigt = ev.pointerType !== "mouse";
        geste.current = { id: ev.pointerId, x: ev.clientX, actif: !doigt };
        if (!doigt) {
          ev.currentTarget.setPointerCapture(ev.pointerId);
          surGlisse(v, "debut");
        }
      }}
      onPointerMove={(ev) => {
        const g = geste.current;
        if (!g || g.id !== ev.pointerId) return;
        const v = heureSous(ev);
        if (!g.actif) {
          if (Math.abs(ev.clientX - g.x) < 6) return;
          g.actif = true;
          ev.currentTarget.setPointerCapture(ev.pointerId);
          if (v !== null) surGlisse(v, "debut");
          return;
        }
        if (v !== null) surGlisse(v, "glisse");
      }}
      onPointerUp={(ev) => {
        const g = geste.current;
        if (!g || g.id !== ev.pointerId) return;
        const v = heureSous(ev);
        if (!g.actif && v !== null) surGlisse(v, "debut");
        surGlisse(v ?? -1, "fin");
        geste.current = null;
      }}
      onPointerCancel={() => {
        if (geste.current?.actif) surGlisse(-1, "fin");
        geste.current = null;
      }}
    >
      <defs>
        <radialGradient id="hd-email" cx="50%" cy="50%" r="50%">
          <stop offset="0.86" stopColor="#2F6622" />
          <stop offset="0.93" stopColor="#5C9A45" />
          <stop offset="1" stopColor="#285A1C" />
        </radialGradient>
        <radialGradient id="hd-halo">
          <stop offset="0" stopColor="#FFD66E" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFD66E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={C} cy={C + 12} rx={8 * K} ry={8 * K} fill="#0B1220" opacity="0.18" />
      <circle cx={C} cy={C} r={8 * K} fill="url(#hd-email)" />
      <circle cx={C} cy={C} r={7.04 * K} fill="#FBFBF8" stroke="#C9A55B" strokeWidth={0.14 * K} />
      <g strokeLinecap="round">
        {BARRES.map(({ q, n }) => {
          const [x0, y0] = pt(3.28, q / 4);
          const [x1, y1] = pt(3.34 + 1.12 * n, q / 4);
          return <line key={q} x1={x0} y1={y0} x2={x1} y2={y1} stroke={n > 0.6 ? "#EE9325" : "#F6B845"} strokeWidth={q % 4 === 0 ? 2.9 : 2} />;
        })}
      </g>
      <g stroke="#101512" fill="none">
        <circle cx={C} cy={C} r={6.62 * K} strokeWidth={1} />
        <circle cx={C} cy={C} r={4.62 * K} strokeWidth={1} />
        {Array.from({ length: 96 }, (_, q) => {
          const hh = q / 4;
          const pleine = q % 4 === 0;
          const principale = pleine && hh % 3 === 0;
          const [x0, y0] = pt(principale ? 5.95 : pleine ? 6.12 : 6.36, hh);
          const [x1, y1] = pt(6.62, hh);
          return <line key={q} x1={x0} y1={y0} x2={x1} y2={y1} strokeWidth={principale ? 2.6 : pleine ? 1.5 : 0.7} />;
        })}
      </g>
      <g fill="#101512" textAnchor="middle" dominantBaseline="central">
        {Array.from({ length: 8 }, (_, i) => {
          const [x, y] = pt(5.3, i * 3);
          return (
            <text key={i} x={x} y={y} fontSize={0.86 * K} fontWeight={800}>
              {i === 0 ? 24 : i * 3}
            </text>
          );
        })}
      </g>
      {APPELS.map((x) => {
        const [cx, cy] = pt(4.62, x.valeur);
        return <circle key={x.id} cx={cx} cy={cy} r={0.2 * K} fill="#2E7A32" stroke="#FFFFFF" strokeWidth={0.07 * K} />;
      })}
      {/* L'ombre de la maison, puis la pelouse et la maison vue du dessus. */}
      <g transform={`rotate(${-a} ${C} ${C})`}>
        <rect x={C - 1.9 * K} y={C - 1.5 * K - longueur} width={3.8 * K} height={3.0 * K} rx="6" fill="#0B1220" opacity={0.16 * jour} />
        <path d={`M${C - 0.19 * K} ${C} L${C - 0.14 * K} ${C + 4.3 * K} L${C} ${C + 4.78 * K} L${C + 0.14 * K} ${C + 4.3 * K} L${C + 0.19 * K} ${C} Z`} fill="#101512" />
      </g>
      <line x1={C + 1.5 * K} y1={C} x2={C - 6.1 * K} y2={C} stroke="#D8392B" strokeWidth="1.6" />
      <circle cx={C} cy={C} r={3.04 * K} fill="#6FA548" stroke="#C9A55B" strokeWidth="2" />
      <circle cx={C - 2.1 * K} cy={C - 1.7 * K} r={0.66 * K} fill="#4D8B3B" />
      <rect x={C - 1.87 * K} y={C - 1.5 * K} width={3.74 * K} height={3.0 * K} fill="#353B41" />
      <line x1={C - 1.87 * K} y1={C} x2={C + 1.87 * K} y2={C} stroke="#22272B" strokeWidth="2.5" />
      <rect x={C - 1.36 * K} y={C + 0.14 * K} width={2.72 * K} height={1.1 * K} fill="#1A2A44" stroke="#D7DCE0" strokeWidth="1.2" />
      <rect x={C - 1.36 * K} y={C + 0.14 * K} width={2.72 * K} height={1.1 * K} fill="#5AA9FF" opacity={0.5 * prod} />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={C - 1.36 * K + ((i + 1) * 2.72 * K) / 7} y1={C + 0.14 * K} x2={C - 1.36 * K + ((i + 1) * 2.72 * K) / 7} y2={C + 1.24 * K} stroke="#D7DCE0" strokeWidth="0.8" />
      ))}
      <rect x={C + 1.8 * K} y={C + 0.58 * K} width={0.96 * K} height={0.38 * K} fill="#E7EAEA" stroke="#9AA3A3" strokeWidth="1" />
      {/* La nuit tombe sur le cadran. */}
      <circle cx={C} cy={C} r={8 * K} fill="#0A1430" opacity={0.42 * (1 - jour)} />
      {/* Le soleil, au bout de l'aiguille ; la nuit, une perle de lune. */}
      <circle cx={sx} cy={sy} r={1.5 * K} fill="url(#hd-halo)" opacity={jour} />
      <circle cx={sx} cy={sy} r={(0.3 + 0.12 * jour) * K} fill={jour > 0.5 ? "#FFD45A" : "#DDE6FF"} stroke="#101512" strokeOpacity="0.15" />
    </svg>
  );
}

/* ---------- la jauge : ce que le toit donne, en douze crans ---------- */

function Jauge({ n }: { n: number }) {
  const crans = 12;
  const pleins = Math.round(n * crans);
  return (
    <span aria-hidden="true" className="flex h-3 gap-[3px]">
      {Array.from({ length: crans }, (_, i) => (
        <span
          key={i}
          className="flex-1 rounded-[2px] transition-colors duration-200"
          style={{ background: i < pleins ? `color-mix(in oklab, #F7B73E, #E07F12 ${(i / crans) * 100}%)` : "#E3E7E2" }}
        />
      ))}
    </span>
  );
}

/* ---------- le premier écran ---------- */

export default function Ouverture() {
  const reduit = useReduit();
  const webglPresent = useWebgl();
  const [h, setH] = useState(HEURE_DEPART);
  const [panne3D, setSans3D] = useState(false);
  const sans3D = panne3D || !webglPresent;
  const [pret3D, setPret3D] = useState(false);
  const [touche, setTouche] = useState(false);
  const hRef = useRef(HEURE_DEPART);
  const cible = useRef(HEURE_DEPART);
  const image = useRef(0);
  const tourDuJour = useRef<{ debut: number } | null>(null);
  const reduitRef = useRef(reduit);
  useEffect(() => {
    reduitRef.current = reduit;
  }, [reduit]);

  // L'aiguille rejoint sa cible en douceur ; à l'arrivée, elle fait une fois le tour du jour.
  const animer = useCallback(() => {
    if (image.current) return;
    let avant = performance.now();
    const pas = (t: number) => {
      const dt = Math.min(0.05, (t - avant) / 1000);
      avant = t;
      let v = hRef.current;
      const tdj = tourDuJour.current;
      if (tdj) {
        const p = Math.min(1, (t - tdj.debut) / 5200);
        const e = p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
        v = tour(HEURE_DEPART + 24 * e);
        if (p >= 1) {
          tourDuJour.current = null;
          v = cible.current;
        }
      } else {
        const d = ecart(v, cible.current);
        v = Math.abs(d) < 0.003 ? cible.current : tour(v + d * (1 - Math.exp(-dt * 12)));
      }
      hRef.current = v;
      setH(v);
      image.current = tourDuJour.current || v !== cible.current ? requestAnimationFrame(pas) : 0;
    };
    image.current = requestAnimationFrame(pas);
  }, []);
  useEffect(() => () => cancelAnimationFrame(image.current), []);

  const allerA = useCallback(
    (v: number) => {
      tourDuJour.current = null;
      cible.current = tour(v);
      setTouche(true);
      if (reduitRef.current) {
        hRef.current = cible.current;
        setH(cible.current);
      } else animer();
    },
    [animer],
  );

  const surGlisse = useCallback(
    (v: number, etape: "debut" | "glisse" | "fin") => {
      if (etape === "fin") return allerA(auQuart(cible.current));
      allerA(v);
    },
    [allerA],
  );

  // Le tour de la journée, une fois, quand la 3D est là (ou sans elle, un peu plus tard).
  const tourLance = useRef(false);
  const lancerTour = useCallback(() => {
    if (tourLance.current || reduitRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    tourLance.current = true;
    setTimeout(() => {
      if (cible.current !== HEURE_DEPART || hRef.current !== HEURE_DEPART) return; // le visiteur a déjà la main
      tourDuJour.current = { debut: performance.now() };
      animer();
    }, 500);
  }, [animer]);
  useEffect(() => {
    const t = setTimeout(lancerTour, 2600);
    return () => clearTimeout(t);
  }, [lancerTour]);
  const pret = useCallback(() => {
    setPret3D(true);
    lancerTour();
  }, [lancerTour]);
  const indisponible = useCallback(() => setSans3D(true), []);

  const q = auQuart(h);
  const prod = production(h);
  const mots = enMots(production(q), 1);
  const appel = appelProche(q);
  const c = ciel(h);
  const touche_ = (pas: number) => allerA(auQuart(cible.current) + pas);

  return (
    <section aria-labelledby="ouverture-titre" className="relative isolate overflow-hidden bg-[var(--fond)]">
      {/* Le mur de faïence : des carreaux blancs, leurs joints. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(var(--trait)_1px,transparent_1px),linear-gradient(90deg,var(--trait)_1px,transparent_1px)] [background-position:-1px_-1px] [background-size:84px_84px] [mask-image:linear-gradient(180deg,#000_0%,#000_60%,transparent_100%)]"
      />
      <div className="mx-auto grid max-w-6xl gap-x-14 gap-y-6 px-5 pb-14 pt-[5.5rem] [grid-template-areas:'texte'_'cadran'_'appel'] sm:px-6 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:content-center lg:gap-y-10 lg:pb-16 lg:pt-28 lg:[grid-template-areas:'texte_cadran'_'appel_cadran']">
        <div className="space-y-4 [grid-area:texte] lg:space-y-7 lg:self-end">
          <div className="hidden sm:block">
            <Surtitre>Pompes à chaleur et solaire · Exemple-Ville</Surtitre>
          </div>
          <Titre as="h1" id="ouverture-titre" texte="L'Heure *Dite.*" taille="geant" auChargement />
          <p className="max-w-[27rem] text-[15px] leading-relaxed text-[var(--doux)] sm:text-lg">
            Tu choisis l&apos;heure de l&apos;appel, on appelle à cette heure-là. Et ton toit, lui, te dit l&apos;heure de la machine.
          </p>
        </div>

        {/* ---------- Le cadre : le ciel de l'heure, le cadran, la plaque ---------- */}
        <div className="relative -mx-3 overflow-hidden rounded-[1.6rem] shadow-[0_40px_80px_-50px_rgba(16,21,18,0.55)] [grid-area:cadran] sm:mx-0 sm:rounded-[2rem] sm:shadow-[0_50px_100px_-60px_rgba(16,21,18,0.6)]">
          <div aria-hidden="true" className="absolute inset-0 transition-[background] duration-300" style={{ background: `linear-gradient(180deg, ${c.haut} 0%, ${c.bas} 100%)` }} />
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:radial-gradient(1.2px_1.2px_at_12%_18%,#fff_60%,transparent),radial-gradient(1px_1px_at_28%_9%,#fff_60%,transparent),radial-gradient(1.4px_1.4px_at_44%_22%,#fff_60%,transparent),radial-gradient(1px_1px_at_63%_12%,#fff_60%,transparent),radial-gradient(1.3px_1.3px_at_81%_20%,#fff_60%,transparent),radial-gradient(1px_1px_at_90%_6%,#fff_60%,transparent),radial-gradient(1px_1px_at_7%_42%,#fff_60%,transparent),radial-gradient(1.2px_1.2px_at_93%_44%,#fff_60%,transparent),radial-gradient(1px_1px_at_36%_4%,#fff_60%,transparent),radial-gradient(1px_1px_at_72%_31%,#fff_60%,transparent)]"
            style={{ opacity: c.etoiles }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity: Math.max(0, Math.min(1, hauteur(h) / 12)) * 0.9 }}>
            <span className={`${nuages.nuage} top-[9%]`} />
            <span className={`${nuages.nuage} ${nuages.second} top-[22%]`} />
          </div>
          <div
            role="slider"
            tabIndex={0}
            aria-label="L'aiguille du toit-horloge : l'heure de la journée"
            aria-valuemin={0}
            aria-valuemax={23.75}
            aria-valuenow={q}
            aria-valuetext={`${enHeure(q)} : ton toit donne ${mots}`}
            onKeyDown={(e) => {
              const pas = ({ ArrowRight: 0.25, ArrowUp: 0.25, ArrowLeft: -0.25, ArrowDown: -0.25, PageUp: 1, PageDown: -1 } as Record<string, number>)[e.key];
              if (pas !== undefined) {
                e.preventDefault();
                touche_(pas);
              } else if (e.key === "Home" || e.key === "End") {
                e.preventDefault();
                allerA(e.key === "Home" ? 0 : 23.75);
              }
            }}
            className="relative aspect-[10/9] w-full outline-none lg:aspect-[10/8.4] focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[var(--accent)]"
          >
            {/* L'affiche s'efface vite, la 3D monte doucement : jamais les deux l'une sur l'autre. */}
            <div className={`absolute inset-[4%] transition-opacity duration-200 ${pret3D && !sans3D ? "opacity-0" : "opacity-100"}`}>
              <CadranPlat h={h} surGlisse={surGlisse} />
            </div>
            {!sans3D && (
              <div
                aria-hidden="true"
                className={`absolute inset-0 transition-[opacity,transform] delay-150 duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none ${pret3D ? "opacity-100" : "pointer-events-none translate-y-3 scale-[0.97] opacity-0"}`}
              >
                <ToitHorloge3D heure={h} surGlisse={surGlisse} onPret={pret} onIndisponible={indisponible} />
              </div>
            )}
          </div>
          <p
            aria-hidden="true"
            className={`pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-[var(--carte)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--encre)] shadow-sm transition-opacity duration-500 sm:left-5 sm:top-5 ${touche ? "opacity-0" : "opacity-100"}`}
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              <path d="M16 10a6 6 0 1 1-2-4.5M16 3v3.5h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tourne l&apos;aiguille
          </p>

          {/* La plaque : l'heure, ce que donne le toit, et l'appel. */}
          <div className="relative px-3 pb-3 sm:px-5 sm:pb-5">
            <div className="rounded-[1.4rem] bg-[var(--carte)] p-4 text-[var(--encre)] shadow-[0_20px_40px_-28px_rgba(16,21,18,0.55)] sm:p-5">
              <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2.5 sm:grid-cols-[auto_1fr_auto]">
                <p aria-hidden="true" className="font-[family-name:var(--titres)] text-[34px] font-extrabold leading-none tracking-[-0.04em] tabular-nums sm:w-[5.2ch] sm:text-[38px]">
                  {enHeure(q)}
                </p>
                <div className="col-span-2 row-start-2 min-w-0 space-y-1.5 sm:col-span-1 sm:col-start-2 sm:row-start-1">
                  <Jauge n={prod} />
                  <p className="text-[13px] leading-snug text-[var(--doux)] sm:text-sm">
                    Exemple · ton toit donne <strong className="font-semibold text-[var(--encre)]">{mots}</strong>
                  </p>
                </div>
                <div className="flex shrink-0 gap-1.5 sm:col-start-3 sm:row-start-1">
                  <button type="button" onClick={() => touche_(-1)} aria-label="Reculer l'aiguille d'une heure" className="grid h-11 w-11 place-items-center rounded-full border border-[var(--trait)] text-lg transition-colors hover:border-[var(--encre)]">
                    <span aria-hidden="true">‹</span>
                  </button>
                  <button type="button" onClick={() => touche_(1)} aria-label="Avancer l'aiguille d'une heure" className="grid h-11 w-11 place-items-center rounded-full border border-[var(--trait)] text-lg transition-colors hover:border-[var(--encre)]">
                    <span aria-hidden="true">›</span>
                  </button>
                </div>
              </div>
              <Link
                href={`${DOSSIER}/rendez-vous#appel-${appel.id}`}
                className="group mt-4 flex h-12 items-center justify-between gap-3 rounded-full bg-[var(--accent)] pl-5 pr-2 text-[15px] font-semibold text-[var(--sur-accent)] transition-transform active:scale-[0.99]"
              >
                <span>
                  Être appelé à <span className="tabular-nums">{appel.libelle}</span>
                </span>
                <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </Link>
              <p className="mt-2.5 text-[12px] leading-snug text-[var(--doux)]">
                Toit plein sud, en été : lance la machine vers {enHeure(HEURE_MACHINE)}. Forme indicative, pas une mesure.
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Les heures d'appel : un toucher, et l'aiguille y va ---------- */}
        <div className="space-y-3 [grid-area:appel] lg:self-start">
          <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--doux)]">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border-2 border-[var(--carte)] bg-[var(--accent)] ring-1 ring-[var(--accent)]" />
            Nos heures d&apos;appel
          </p>
          <div className="flex flex-wrap gap-2">
            {APPELS.map((x) => {
              const ici = Math.abs(ecart(q, x.valeur)) < 0.01;
              return (
                <button
                  key={x.id}
                  type="button"
                  aria-pressed={ici}
                  aria-label={`Amener l'aiguille à ${x.libelle}`}
                  onClick={() => allerA(x.valeur)}
                  className={`h-11 rounded-full border px-5 text-[15px] font-semibold tabular-nums transition-colors ${ici ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] hover:border-[var(--encre)]"}`}
                >
                  {x.libelle}
                </button>
              );
            })}
          </div>
          <p className="max-w-[26rem] text-[15px] leading-relaxed text-[var(--doux)]">
            Sur les cinq prochains jours ouvrables, à l&apos;heure que tu choisis. Pas une minute avant, et seulement pour ton devis.
          </p>
        </div>
      </div>
      <Lisere />
    </section>
  );
}
