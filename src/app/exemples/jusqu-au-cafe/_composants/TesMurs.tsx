"use client";

import { useState } from "react";
import s from "./Cuisine.module.css";
import { GAMMES, euros, type IdGamme } from "./donnees";

const lire = (v: string) => {
  const n = Number(v.replace(",", ".").replace(/\s/g, ""));
  return v.trim() === "" || Number.isNaN(n) ? null : n;
};
const metres = (n: number) => `${n.toFixed(2).replace(".", ",")} m`;
const arrondi = (n: number) => Math.round(n / 500) * 500;
const MODULE = 0.6; // largeur d'un meuble bas, en mètres

/**
 * « Tes murs, en mètres » : deux longueurs, et le site dessine la cuisine — droite si
 * le second mur est vide, en L sinon — avec une fourchette TTC, pose comprise, selon la
 * gamme. Une fourchette d'exemple : le prix ferme vient au devis, après la prise de
 * cotes. Tout se calcule dans le navigateur.
 */
export default function TesMurs() {
  const [mur1, setMur1] = useState("");
  const [mur2, setMur2] = useState("");
  const [gamme, setGamme] = useState<IdGamme>("laque");
  const [dessine, setDessine] = useState(false);

  const l1 = lire(mur1);
  const l2 = lire(mur2) ?? 0;
  const erreur =
    l1 === null ? "Indique la longueur du premier mur, en mètres." :
    l1 < 1.2 || l1 > 8 ? "Le premier mur doit mesurer entre 1,20 m et 8 m." :
    lire(mur2) === null && mur2.trim() !== "" ? "Le second mur se donne en mètres, par exemple 2,40." :
    l2 !== 0 && (l2 < 1.2 || l2 > 6) ? "Le second mur doit mesurer entre 1,20 m et 6 m (ou rester vide)." : null;

  const valide = erreur === null && l1 !== null;
  const g = GAMMES.find((x) => x.id === gamme)!;
  const lineaire = valide ? l1 + l2 : 0;
  const n1 = valide ? Math.floor(l1 / MODULE + 1e-9) : 0;
  const n2 = valide && l2 > 0 ? Math.floor((l2 - MODULE) / MODULE + 1e-9) : 0;

  // Le plan, à l'échelle : 1 m = E unités de dessin.
  const E = Math.min(272 / Math.max(l1 ?? 1, 1), 190 / Math.max(l2 || 1, 1), 82);
  const X0 = 30, Y0 = 26, P = MODULE * E;
  const meubles: { x: number; y: number; w: number; h: number; type?: "evier" | "plaque" | "frigo" }[] = [];
  for (let i = 0; i < n1; i++) meubles.push({ x: X0 + i * P, y: Y0, w: P - 2, h: P - 2, type: i === Math.floor(n1 / 2) ? "evier" : i === n1 - 2 && n2 === 0 ? "plaque" : undefined });
  for (let j = 0; j < n2; j++) meubles.push({ x: X0, y: Y0 + (j + 1) * P, w: P - 2, h: P - 2, type: j === n2 - 1 ? "frigo" : j === Math.floor((n2 - 1) / 2) ? "plaque" : undefined });

  return (
    <div className="space-y-5" data-film="murs">
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: "mur-1", libelle: "Mur 1", valeur: mur1, changer: setMur1, aide: "ex. 3,20" },
          { id: "mur-2", libelle: "Mur 2", valeur: mur2, changer: setMur2, aide: "vide si droite" },
        ].map((c) => (
          <label key={c.id} className="block rounded-2xl bg-[var(--carte)] border border-[var(--trait)] px-4 py-3">
            <span className="block text-xs font-bold uppercase tracking-[0.16em] text-[var(--doux)]">{c.libelle}</span>
            <span className="flex items-baseline gap-1">
              <input
                id={c.id}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={c.valeur}
                placeholder={c.aide}
                onChange={(e) => c.changer(e.target.value)}
                className="min-w-0 w-full bg-transparent py-1 font-[family-name:var(--titres)] text-3xl text-[var(--encre)] placeholder:text-base placeholder:text-[var(--doux)] placeholder:font-[family-name:var(--texte)] focus:outline-none tabular-nums"
              />
              <span className="text-lg text-[var(--doux)]">m</span>
            </span>
          </label>
        ))}
      </div>

      <fieldset className="space-y-2">
        <legend className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--doux)] mb-2">La gamme</legend>
        <div className="grid grid-cols-3 gap-2">
          {GAMMES.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={gamme === x.id}
              onClick={() => setGamme(x.id)}
              className={`rounded-xl border px-2 py-2.5 text-sm font-semibold leading-tight ${
                gamme === x.id ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)]"
              }`}
            >
              {x.nom}
            </button>
          ))}
        </div>
      </fieldset>

      {!dessine && (
        <button
          type="button"
          data-film="dessiner"
          onClick={() => setDessine(true)}
          className="w-full min-h-14 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 text-lg font-bold"
        >
          Dessiner ma cuisine
        </button>
      )}

      {dessine && erreur && (
        <p role="alert" className="rounded-2xl border border-[var(--accent)] px-4 py-3 text-[var(--accent-texte)]">{erreur}</p>
      )}

      {dessine && valide && (
        <div role="status" className="space-y-4" data-film="plan">
          <div className="rounded-[22px] bg-[#EDE5D8] p-3">
            <svg key={`${mur1}|${mur2}`} viewBox="0 0 320 230" className="w-full" role="img" aria-label={`Plan de la cuisine ${l2 > 0 ? "en L" : "droite"} : ${metres(l1!)}${l2 > 0 ? ` et ${metres(l2)}` : ""}, ${n1 + n2} meubles bas`}>
              <path d={`M${X0 - 6} ${Y0 - 6} H${X0 + l1! * E + 6}`} stroke="#171512" strokeWidth="5" strokeLinecap="round" />
              {l2 > 0 && <path d={`M${X0 - 6} ${Y0 - 6} V${Y0 + l2 * E + 6}`} stroke="#171512" strokeWidth="5" strokeLinecap="round" />}
              {l2 > 0 && <rect x={X0} y={Y0} width={P - 2} height={P - 2} fill="#CDBFA8" />}
              {meubles.map((m, i) => (
                <g key={i} className={s.meuble} style={{ animationDelay: `${0.12 + i * 0.07}s` }}>
                  <rect x={m.x} y={m.y} width={m.w} height={m.h} rx="2" fill={m.type === "frigo" ? "#7A4E22" : "#D9A35B"} />
                  {m.type === "evier" && <rect x={m.x + m.w * 0.18} y={m.y + m.h * 0.2} width={m.w * 0.64} height={m.h * 0.55} rx="4" fill="none" stroke="#171512" strokeWidth="2" />}
                  {m.type === "plaque" &&
                    [[0.3, 0.3], [0.7, 0.3], [0.3, 0.7], [0.7, 0.7]].map(([fx, fy]) => (
                      <circle key={`${fx}${fy}`} cx={m.x + m.w * fx} cy={m.y + m.h * fy} r={m.w * 0.12} fill="none" stroke="#171512" strokeWidth="1.8" />
                    ))}
                </g>
              ))}
              <text x={X0 + (l1! * E) / 2} y={Y0 + P + 22} textAnchor="middle" fontSize="15" fontWeight="700" fill="#171512">{metres(l1!)}</text>
              {l2 > 0 && <text x={X0 + P + 12} y={Y0 + (l2 * E) / 2 + 20} fontSize="15" fontWeight="700" fill="#171512">{metres(l2)}</text>}
            </svg>
          </div>
          <p className="text-lg">
            Une cuisine {l2 > 0 ? "en L" : "droite"} · {metres(lineaire)} linéaires · {n1 + n2} meubles bas
          </p>
          <div className="rounded-[22px] border border-[var(--accent)] bg-[var(--carte)] p-5 space-y-1" data-film="fourchette">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Fourchette TTC · pose comprise</p>
            <p className="font-[family-name:var(--titres)] text-[1.65rem] sm:text-4xl tabular-nums whitespace-nowrap">
              {euros(arrondi(lineaire * g.min))} – {euros(arrondi(lineaire * g.max))}
            </p>
            <p className="text-sm text-[var(--doux)]">
              Exemple, en {g.nom.toLowerCase()} · hors électroménager. Le prix ferme vient au devis, après la prise de cotes chez toi.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
