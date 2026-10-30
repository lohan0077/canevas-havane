"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import MannequinPlan from "./MannequinPlan";
import type { Pilote } from "./Mannequin3D";
import type { IdZone } from "./mannequin-forme";
import { zonesCorps } from "./donnees";

// Le premier écran du Pourquoi : un mannequin de bois d'atelier de dessin, dans un studio
// bleu nuit. On le fait tourner ; on touche une zone, elle s'éclaire, et la page répond
// comme au cabinet : la question telle qu'on la pose, ce que je fais, ce que je ne fais
// pas, et la page du geste. Toutes les réponses viennent des pages du site.
//
// La 3D (three.js) n'arrive qu'ici, à la demande. En attendant, ou sans WebGL, le même
// mannequin est dessiné en plan, et la liste des zones fait tout ce que fait le doigt.

const Mannequin3D = dynamic(() => import("./Mannequin3D"), { ssr: false, loading: () => null });

const DE_DOS: IdZone[] = ["dos", "basDuDos"];
const PAS = Math.PI / 6;

/** L'angle du mannequin, dit avec des mots (pour le curseur accessible). */
function orientation(radians: number) {
  const a = ((((radians * 180) / Math.PI) % 360) + 360) % 360;
  const ecart = Math.min(a, 360 - a);
  if (ecart < 25) return "de face";
  if (ecart < 65) return "de trois quarts, face";
  if (ecart < 115) return "de profil";
  if (ecart < 155) return "de trois quarts, dos";
  return "de dos";
}

/** Les deux boutons qui font tourner le mannequin d'un douzième de tour. */
function BoutonsTourner({ pilote }: { pilote: React.RefObject<Pilote | null> }) {
  return (
    <div className="flex gap-2">
      {([[-PAS, "Tourner le mannequin vers la gauche", "M15 7a6 6 0 1 0 2.6 4.9M15 7h-4M15 7V3"], [PAS, "Tourner le mannequin vers la droite", "M9 7a6 6 0 1 1-2.6 4.9M9 7h4M9 7V3"]] as const).map(([pas, libelle, d]) => (
        <button
          key={libelle}
          type="button"
          aria-label={libelle}
          onClick={() => pilote.current?.tourner(pas)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-[var(--sombre)] text-[var(--sur-sombre)] transition-colors hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AEB8FF]"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-[1.6]" strokeLinecap="round" strokeLinejoin="round">
            <path d={d} />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function Mannequin({ entete }: { entete: React.ReactNode }) {
  const [zoneId, setZoneId] = useState<IdZone>("epaules");
  const [etat3D, setEtat3D] = useState<"attente" | "pret" | "absent">("attente");
  const [angle, setAngle] = useState(0);
  const pilote = useRef<Pilote | null>(null);
  const reponse = useRef<HTMLDivElement>(null);
  const premier = useRef(true);
  const zone = zonesCorps.find((z) => z.id === zoneId)!;

  const choisir = useCallback((z: IdZone) => setZoneId(z), []);
  const pret = useCallback(() => setEtat3D("pret"), []);
  const indisponible = useCallback(() => setEtat3D("absent"), []);
  const surAngle = useCallback((a: number) => setAngle(a), []);
  const surPilote = useCallback((p: Pilote | null) => {
    pilote.current = p;
  }, []);

  // La réponse change : elle entre doucement (sauf au premier rendu, et sans animations).
  useEffect(() => {
    if (premier.current) {
      premier.current = false;
      return;
    }
    const el = reponse.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.animate(
      [
        { opacity: 0, transform: "translate3d(0, 12px, 0)", filter: "blur(6px)" },
        { opacity: 1, transform: "none", filter: "none" },
      ],
      { duration: 560, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
    );
  }, [zoneId]);

  const touche = (e: React.KeyboardEvent) => {
    if (!pilote.current) return;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") pilote.current.tourner(-PAS);
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") pilote.current.tourner(PAS);
    else if (e.key === "Home") pilote.current.tourner(-angle);
    else return;
    e.preventDefault();
  };
  const actif = etat3D === "pret";

  return (
    // Téléphone : le texte, le mannequin, la réponse, l'un sous l'autre. Ordinateur : le
    // texte et la réponse à gauche, le mannequin à droite ; au-delà de 1280 px, trois
    // colonnes, comme une planche d'anatomie annotée des deux côtés.
    <div className="relative mx-auto grid w-full max-w-6xl px-6 pb-20 pt-[6.25rem] sm:pt-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:pb-20 xl:min-h-[100svh] xl:max-w-7xl xl:grid-cols-[minmax(0,0.98fr)_minmax(0,1.12fr)_minmax(0,0.9fr)] xl:grid-rows-1 xl:items-center xl:gap-x-10 xl:pb-12 xl:pt-28">
      <div className="lg:col-start-1 lg:row-start-1 lg:self-end xl:self-center">{entete}</div>

      {/* ---------- Le studio ---------- */}
      <div className="relative -mx-6 mt-1 flex flex-col sm:mx-0 sm:mt-10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:h-[min(48rem,calc(100svh-9.5rem))] xl:row-span-1 xl:h-[min(50rem,calc(100svh-10.5rem))]">
        {/* Le fond de studio : une lumière sur le papier bleu, et sa flaque au sol. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[-30%] top-[-12%] bottom-[-8%] -z-10 bg-[radial-gradient(closest-side,#2D3DB8_0%,#1A2585_42%,rgba(11,16,56,0)_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[6%] bottom-[3%] -z-10 h-[16%] bg-[radial-gradient(closest-side,rgba(92,108,240,0.5),rgba(11,16,56,0))]" />

        <div className="relative h-[min(108vw,26rem)] sm:h-[34rem] lg:h-auto lg:flex-1">
          <div
            data-film="mannequin"
            {...(actif
              ? {
                  role: "slider",
                  tabIndex: 0,
                  "aria-label": "Faire tourner le mannequin (flèches gauche et droite)",
                  "aria-valuemin": 0,
                  "aria-valuemax": 359,
                  "aria-valuenow": Math.round(((((angle * 180) / Math.PI) % 360) + 360) % 360),
                  "aria-valuetext": orientation(angle),
                  onKeyDown: touche,
                }
              : {})}
            className="absolute inset-0 rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-[#AEB8FF] focus-visible:ring-offset-0"
          >
            <div className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${actif ? "opacity-0" : "opacity-100"}`}>
              <MannequinPlan zone={zoneId} deDos={DE_DOS.includes(zoneId)} />
            </div>
            {etat3D !== "absent" && (
              // Les bords de la toile s'effacent : une ombre au sol ne s'arrête jamais net.
              <div
                className={`absolute inset-0 transition-opacity duration-1000 [mask-image:radial-gradient(ellipse_72%_70%_at_50%_48%,#000_62%,transparent_100%)] motion-reduce:transition-none ${actif ? "opacity-100" : "opacity-0"}`}
              >
                <Mannequin3D zone={zoneId} onChoisir={choisir} onPret={pret} onIndisponible={indisponible} onAngle={surAngle} onPilote={surPilote} />
              </div>
            )}
          </div>
        </div>

        {/* Sous le mannequin, jamais par-dessus : la consigne et les deux boutons pour tourner
            (sur téléphone, ils sont au-dessus des zones). */}
        <div className="flex min-h-11 items-center justify-between gap-3 pt-1 max-lg:hidden">
          <p className="text-[13px] font-medium text-[#B9C0E0]">{actif ? "Glissez pour tourner · touchez une zone" : "Touchez une zone"}</p>
          {actif && <BoutonsTourner pilote={pilote} />}
        </div>
      </div>

      {/* ---------- Les zones, et la réponse ---------- */}
      <div className="mt-6 space-y-6 lg:col-start-1 lg:row-start-2 lg:mt-12 lg:self-start xl:col-start-3 xl:row-start-1 xl:mt-0 xl:self-center">
        <div className="space-y-3">
          <div className="flex min-h-11 items-center justify-between gap-3">
            <p id="lp-zones" className="text-[12px] font-semibold uppercase tracking-[0.2em]">Touchez une zone</p>
            {/* Sur téléphone, les boutons pour tourner sont ici, au-dessus des zones. */}
            {actif && (
              <div className="lg:hidden">
                <BoutonsTourner pilote={pilote} />
              </div>
            )}
          </div>
          <div role="group" aria-labelledby="lp-zones" data-film="zones" className="flex flex-wrap gap-2">
            {zonesCorps.map((z) => {
              const choisie = z.id === zoneId;
              return (
                <button
                  key={z.id}
                  type="button"
                  data-zone={z.id}
                  aria-pressed={choisie}
                  aria-controls="lp-reponse"
                  onClick={() => setZoneId(z.id)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[15px] font-medium transition-[background-color,border-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AEB8FF] ${
                    choisie
                      ? "border-[var(--sur-sombre)] bg-[var(--sur-sombre)] text-[var(--sombre)]"
                      : "border-white/25 text-[var(--sur-sombre)] hover:border-white/60"
                  }`}
                >
                  <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full transition-colors ${choisie ? "bg-[var(--accent)]" : "bg-[#AEB8FF]"}`} />
                  {z.libelle}
                </button>
              );
            })}
          </div>
        </div>

        <div id="lp-reponse" aria-live="polite" data-film="reponse" className="border-t border-white/15 pt-6">
          <div ref={reponse} className="space-y-6">
            <p className="font-[family-name:var(--titres)] text-[clamp(1.75rem,3vw,2.4rem)] italic leading-[1.1] text-balance">
              {`«\u202f${zone.question.replace(/ ([?!:;])/g, "\u202f$1")}\u202f»`}
            </p>
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-8 xl:grid-cols-1 xl:gap-5">
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#AEB8FF]">
                  <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full bg-[#AEB8FF] text-[10px] text-[var(--sombre)]">✓</span>
                  Ce que je fais
                </p>
                <p className="text-[16px] leading-relaxed">{zone.fais}</p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#AEB8FF]">
                  <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full border border-[#AEB8FF] text-[9px]">✕</span>
                  Ce que je ne fais pas
                </p>
                <p className="text-[16px] leading-relaxed">{zone.pasFais}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[15px]">
              <Link href={zone.lien.href} className="group inline-flex items-baseline gap-2 font-semibold underline decoration-white/40 underline-offset-[5px] transition-colors hover:decoration-current">
                {zone.aVenir ? zone.lien.libelle : `Lire : ${zone.lien.libelle}`}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              {zone.aVenir && <span>{zone.aVenir}</span>}
            </div>
          </div>
        </div>
        <p className="text-[13px] leading-relaxed text-[#B9C0E0]">
          Ces réponses décrivent des gestes ; elles ne disent pas s&apos;ils vous conviennent — ça, on en parle au cabinet.
        </p>
      </div>
    </div>
  );
}
