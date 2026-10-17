"use client";

import { useCallback, useMemo, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import { Plaque, styles as s } from "./Habillage";
import { COTES, FORMES, RECUL, calculerJardin, metres, type CoteMaison, type Forme, type Jardin as Geometrie } from "./jardin-geometrie";

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
      style={{ fontFamily: "var(--pp-libelles), sans-serif" }}
    >
      <defs>
        <pattern id="pp-pelouse" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="5" height="10" fill="#1E3B2C" />
          <rect x="5" width="5" height="10" fill="#1A3427" />
        </pattern>
      </defs>
      <rect {...rect(jardin.maison)} fill="#2a3340" stroke="#8F98A8" strokeWidth="0.8" />
      <rect {...rect({ x: 0, z: 0, largeur: jardin.largeur, profondeur: jardin.profondeur })} fill="url(#pp-pelouse)" stroke="#5E9A70" strokeWidth="1" />
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
      <legend className={`${s.technique} text-xs text-[#e8d1cb]`}>{libelle}</legend>
      <div className="grid grid-cols-3 gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={valeur === o.id}
            onClick={() => onChange(o.id)}
            className={`${s.technique} min-h-[44px] px-2 text-[11px] border transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 ${
              valeur === o.id
                ? "bg-[#e8d1cb] border-[#e8d1cb] text-[#15131b]"
                : "bg-[#070b13] border-[rgba(255,255,255,0.2)] text-[#e6eaf5] hover:border-[rgba(255,255,255,0.5)]"
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
  const indisponible = useCallback(() => setSans3D(true), []);

  const jardin = useMemo(() => calculerJardin({ surface, forme, maison, terrasse }), [surface, forme, maison, terrasse]);
  const coque = jardin.coque;
  const remplissage = ((surface - MIN) / (MAX - MIN)) * 100;

  return (
    <Plaque coupe={22}>
      <div className={`${s.quadrillage} relative aspect-[320/196]`}>
        <Plan jardin={jardin} surface={surface} />
        {!sans3D && (
          <div className="absolute inset-0" aria-hidden="true">
            <Jardin3D jardin={jardin} onIndisponible={indisponible} />
          </div>
        )}
        <p className={`${s.technique} pointer-events-none absolute left-3 top-3 bg-[#04070d]/85 px-2.5 py-1.5 text-[10px] text-[#e6eaf5]`}>
          Jardin {metres(jardin.largeur)} × {metres(jardin.profondeur)}{" "}m
        </p>
        {!sans3D && (
          <p className={`${s.technique} pointer-events-none absolute right-3 bottom-3 bg-[#04070d]/85 px-2.5 py-1.5 text-[10px] text-[#b9c0cc]`}>
            Glisse pour tourner
          </p>
        )}
      </div>

      <div className="p-6 sm:p-8 space-y-7">
        <label className="block space-y-4">
          <span className="flex items-baseline justify-between gap-4">
            <span className={`${s.technique} text-xs text-[#e8d1cb]`}>Surface du jardin</span>
            <span className="text-2xl font-bold tabular-nums text-white">{surface}{" "}m²</span>
          </span>
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={5}
            value={surface}
            onChange={(e) => setSurface(Number(e.target.value))}
            className={s.curseur}
            style={{ "--rempli": `${remplissage}%` } as CSSProperties}
          />
        </label>

        <Choix libelle="Forme du terrain" options={FORMES} valeur={forme} onChange={setForme} />
        <Choix libelle="La maison" options={COTES} valeur={maison} onChange={setMaison} />

        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <span className={`${s.technique} text-xs text-[#e8d1cb]`}>Une terrasse contre la maison</span>
          <input
            type="checkbox"
            checked={terrasse}
            onChange={(e) => setTerrasse(e.target.checked)}
            className="h-6 w-6 accent-[#e8d1cb] cursor-pointer"
          />
        </label>

        <Plaque fond="#0e1522" coupe={14}>
          <div className="p-5 sm:p-6 space-y-2" aria-live="polite">
            {coque ? (
              <>
                <p className={`${s.technique} text-xs text-[#e8d1cb]`}>La piscine qui rentre · gamme {coque.nom}</p>
                <p className={`${s.titre} text-[26px] sm:text-3xl`}>Coque {coque.coque}{" "}m</p>
                <p className="text-lg font-bold tabular-nums text-[#7edbee]">{coque.prix} TTC</p>
                <p className={`${s.technique} text-[11px] text-[#8f98a8]`}>Pose comprise · prix d&apos;exemple</p>
              </>
            ) : (
              <>
                <p className={`${s.technique} text-xs text-[#e8d1cb]`}>Trop juste pour une coque</p>
                <p className="text-[#e6eaf5]">
                  À {metres(RECUL)}{" "}m des limites{terrasse ? " et de la terrasse" : ""}, aucune coque ne
                  tient. {terrasse ? "Sans la terrasse, une 5 × 2,5 rentre peut-être : " : ""}la visite technique le
                  dira, mètre en main.
                </p>
              </>
            )}
          </div>
        </Plaque>

        <p className="text-sm leading-relaxed text-[#8f98a8]">
          Ce qui fait bouger le prix : l&apos;accès au terrain pour la grue, la nature du
          sol, et la plage autour du bassin. On le vérifie à la visite technique, avant
          tout devis.
        </p>
      </div>
    </Plaque>
  );
}
