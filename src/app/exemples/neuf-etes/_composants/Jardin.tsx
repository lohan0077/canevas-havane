"use client";

import { useCallback, useMemo, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import s from "./Curseur.module.css";
import { COTES, FORMES, RECUL, calculerJardin, metres, type CoteMaison, type Forme, type Jardin as Geometrie } from "./jardin-geometrie";
import type { Ambiance } from "./Jardin3D";

// « Ton jardin fait combien ? » — on entre la surface du jardin et son agencement
// (forme du terrain, côté de la maison, terrasse) ; le jardin apparaît en 3D avec la
// plus grande coque qui y rentre vraiment, et son prix pose comprise. Prix d'exemple.
//
// La 3D (three.js) n'est chargée qu'ici, à la demande. En attendant, ou si le
// navigateur ne sait pas faire de 3D, le plan 2D la remplace : il lit le même calcul.

const Jardin3D = dynamic(() => import("./Jardin3D"), { ssr: false, loading: () => null });

const MIN = 60;
const MAX = 200;

/** Le plan vu du dessus, à l'échelle : la vue de secours, et l'affiche de la 3D. */
function Plan({ jardin, surface }: { jardin: Geometrie; surface: number }) {
  const marge = 14;
  const maisonX = jardin.maison.x === 0 ? 0 : Math.sign(jardin.maison.x);
  const maisonEnHaut = jardin.maison.z < 0;
  const etendueX = jardin.largeur + (maisonX ? jardin.maison.largeur : 0);
  const etendueZ = jardin.profondeur + (maisonEnHaut ? jardin.maison.profondeur : 0);
  const echelle = Math.min((320 - 2 * marge) / etendueX, (196 - 2 * marge) / etendueZ);
  const cx = 160 - (maisonX * jardin.maison.largeur * echelle) / 2;
  const cz = 98 + (maisonEnHaut ? (jardin.maison.profondeur * echelle) / 2 : 0);
  const X = (x: number) => cx + x * echelle;
  const Z = (z: number) => cz + z * echelle;
  const rect = (r: { x: number; z: number; largeur: number; profondeur: number }) => ({
    x: X(r.x - r.largeur / 2),
    y: Z(r.z - r.profondeur / 2),
    width: r.largeur * echelle,
    height: r.profondeur * echelle,
  });
  return (
    <svg
      viewBox="0 0 320 196"
      role="img"
      aria-label={`Plan d'un jardin de ${surface} m²${jardin.coque ? ` avec une piscine coque ${jardin.coque.coque}` : ", trop juste pour une coque"}`}
      className="absolute inset-0 w-full h-full"
      style={{ fontFamily: "var(--titres), serif" }}
    >
      <defs>
        <pattern id="ne-pelouse" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="5" height="10" fill="#1E3B2C" />
          <rect x="5" width="5" height="10" fill="#1A3427" />
        </pattern>
      </defs>
      <rect {...rect(jardin.maison)} fill="#24546A" stroke="#7EA3B3" strokeWidth="0.8" />
      <rect {...rect({ x: 0, z: 0, largeur: jardin.largeur, profondeur: jardin.profondeur })} fill="url(#ne-pelouse)" stroke="#5E9A70" strokeWidth="1" />
      {jardin.terrasse && <rect {...rect(jardin.terrasse)} fill="#6b4f33" />}
      {jardin.bassin && <rect {...rect(jardin.bassin)} rx="3" fill="#2797BA" stroke="#FFFFFF" strokeWidth="2" />}
    </svg>
  );
}

function Choix<T extends string>({
  libelle,
  options,
  valeur,
  onChange,
}: {
  libelle: string;
  options: { id: T; libelle: string }[];
  valeur: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="font-[family-name:var(--titres)] text-sm font-bold">{libelle}</legend>
      <div className="grid grid-cols-3 gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={valeur === o.id}
            onClick={() => onChange(o.id)}
            className={`min-h-11 rounded-full border-2 px-2 text-[14px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
              valeur === o.id
                ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]"
                : "border-white/25 bg-[var(--sombre)] text-[var(--sur-sombre)] hover:border-white/60"
            }`}
          >
            {o.libelle}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function Jardin() {
  const [surface, setSurface] = useState(120);
  const [forme, setForme] = useState<Forme>("rectangle");
  const [maison, setMaison] = useState<CoteMaison>("haut");
  const [terrasse, setTerrasse] = useState(true);
  const [sans3D, setSans3D] = useState(false);
  const [ambiance, setAmbiance] = useState<Ambiance>("jour");
  const indisponible = useCallback(() => setSans3D(true), []);

  const jardin = useMemo(() => calculerJardin({ surface, forme, maison, terrasse }), [surface, forme, maison, terrasse]);
  const coque = jardin.coque;
  const remplissage = ((surface - MIN) / (MAX - MIN)) * 100;

  return (
    <div data-film="jardin" className="overflow-hidden rounded-[2.5rem] bg-[#0A2A39] text-[var(--sur-sombre)] shadow-[0_50px_90px_-50px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0B2E3E]">
        <Plan jardin={jardin} surface={surface} />
        {!sans3D && (
          <div className="absolute inset-0" aria-hidden="true">
            <Jardin3D jardin={jardin} ambiance={ambiance} onIndisponible={indisponible} />
          </div>
        )}
        <p className="pointer-events-none absolute left-3 top-3 rounded-full bg-[var(--sombre)] px-3 py-1.5 text-[13px] font-bold">
          Jardin {metres(jardin.largeur)} × {metres(jardin.profondeur)}{" "}m
        </p>
        {!sans3D && (
          <>
            <div role="group" aria-label="Lumière de la vue 3D" data-film="lumiere" className="absolute right-3 top-3 flex rounded-full bg-[var(--sombre)] p-1">
              {(["jour", "soir"] as const).map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={ambiance === a}
                  data-ambiance={a}
                  onClick={() => setAmbiance(a)}
                  className={`min-h-8 rounded-full px-3.5 text-[13px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
                    ambiance === a ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "text-[var(--sur-sombre)] hover:bg-white/10"
                  }`}
                >
                  {a === "jour" ? "Jour" : "Soir"}
                </button>
              ))}
            </div>
            <p className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-[var(--sombre)] px-3 py-1.5 text-[13px]">
              Glisse pour tourner
            </p>
          </>
        )}
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        <label className="block space-y-4">
          <span className="flex items-baseline justify-between gap-4">
            <span className="font-[family-name:var(--titres)] text-sm font-bold">Surface du jardin</span>
            <span className="font-[family-name:var(--titres)] text-3xl font-bold tabular-nums">{surface}{" "}m²</span>
          </span>
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={5}
            value={surface}
            data-film="surface"
            onChange={(e) => setSurface(Number(e.target.value))}
            className={s.curseur}
            style={{ "--rempli": `${remplissage}%` } as CSSProperties}
          />
        </label>

        <Choix libelle="Forme du terrain" options={FORMES} valeur={forme} onChange={setForme} />
        <Choix libelle="La maison" options={COTES} valeur={maison} onChange={setMaison} />

        <label className="flex cursor-pointer items-center justify-between gap-4">
          <span className="font-[family-name:var(--titres)] text-sm font-bold">Une terrasse contre la maison</span>
          <input
            type="checkbox"
            checked={terrasse}
            onChange={(e) => setTerrasse(e.target.checked)}
            className="h-6 w-6 cursor-pointer accent-[#F6C445]"
          />
        </label>

        <div className="rounded-[1.75rem] bg-[var(--sombre)] p-5 sm:p-6" aria-live="polite" data-film="prix-jardin">
          {coque ? (
            <div className="space-y-1.5">
              <p className="text-[15px]">La piscine qui rentre · gamme {coque.nom}</p>
              <p className="font-[family-name:var(--titres)] text-[1.7rem] font-bold leading-tight sm:text-[2rem]">Coque {coque.coque}{" "}m</p>
              <p className="font-[family-name:var(--titres)] text-2xl font-bold tabular-nums text-[var(--accent)]">{coque.prix} TTC</p>
              <p className="text-[14px]">Pose comprise · prix d&apos;exemple</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              <p className="font-[family-name:var(--titres)] text-xl font-bold text-[var(--accent)]">Trop juste pour une coque</p>
              <p>
                À {metres(RECUL)}{" "}m des limites{terrasse ? " et de la terrasse" : ""}, aucune coque ne
                tient. {terrasse ? "Sans la terrasse, une 5 × 2,5 rentre peut-être : " : ""}la visite technique le
                dira, mètre en main.
              </p>
            </div>
          )}
        </div>

        <p className="text-[15px] leading-relaxed">
          Ce qui fait bouger le prix : l&apos;accès au terrain pour la grue, la nature du
          sol, et la plage autour du bassin. On le vérifie à la visite technique, avant
          tout devis.
        </p>
      </div>
    </div>
  );
}
