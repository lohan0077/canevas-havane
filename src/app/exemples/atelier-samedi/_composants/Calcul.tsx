"use client";

import { useState } from "react";
import Link from "next/link";
import { APPORTS, DECLARATION, DOSSIER, SEUIL, verdict } from "./donnees";

const MAX_MAISON = 250;
const MAX_AJOUT = 100;

/** Un curseur sobre : un rail fin, un bouton carré cerclé de bleu de plan. */
function Curseur({ etiquette, valeur, min, max, pas, changer, film }: { etiquette: string; valeur: number; min: number; max: number; pas: number; changer: (v: number) => void; film: string }) {
  const rempli = ((valeur - min) / (max - min)) * 100;
  return (
    <label className="block space-y-2.5">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-[15px] font-medium text-[var(--doux)]">{etiquette}</span>
        <span className="font-[family-name:var(--titres)] text-[26px] font-semibold tabular-nums">{valeur}&nbsp;m²</span>
      </span>
      <input
        type="range"
        data-film={film}
        min={min}
        max={max}
        step={pas}
        value={valeur}
        onChange={(e) => changer(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-md [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[var(--accent-texte)] [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-md [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[var(--accent-texte)] [&::-webkit-slider-thumb]:bg-white"
        style={{ background: `linear-gradient(90deg, var(--accent-texte) ${rempli}%, var(--trait) ${rempli}%)` }}
      />
    </label>
  );
}

/** La maison, en élévation : l'existant, l'extension, et le seuil de 150 m² sur l'échelle. */
function Elevation({ maison, ajout }: { maison: number; ajout: number }) {
  const total = maison + ajout;
  const l1 = 40 + (maison / MAX_MAISON) * 150;
  const l2 = (ajout / MAX_AJOUT) * 90;
  const x0 = 16;
  const sol = 118;
  const echelle = (m: number) => 16 + (m / 350) * 288;
  return (
    <svg viewBox="0 0 320 172" role="img" aria-label={`Une maison de ${maison} m² et une extension de ${ajout} m² : ${total} m² au total`} className="block h-auto w-full">
      <defs>
        <pattern id="as-hachures" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V6" stroke="var(--accent-texte)" strokeWidth="1.6" />
        </pattern>
      </defs>
      <path d={`M0 ${sol}H320`} stroke="var(--encre)" strokeWidth="1.5" />
      {/* La maison existante, et son toit à deux pentes. */}
      <rect x={x0} y={sol - 52} width={l1} height="52" fill="var(--carte)" stroke="var(--encre)" strokeWidth="1.5" />
      <path d={`M${x0 - 6} ${sol - 52}L${x0 + l1 / 2} ${sol - 84}L${x0 + l1 + 6} ${sol - 52}Z`} fill="var(--carte)" stroke="var(--encre)" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x={x0 + l1 * 0.18} y={sol - 30} width="14" height="30" fill="none" stroke="var(--encre)" strokeWidth="1.2" />
      <rect x={x0 + l1 * 0.55} y={sol - 40} width="18" height="14" fill="none" stroke="var(--encre)" strokeWidth="1.2" />
      {/* L'extension, toit plat, hachurée. */}
      {ajout > 0 && (
        <g>
          <rect x={x0 + l1} y={sol - 40} width={l2} height="40" fill="url(#as-hachures)" stroke="var(--accent-texte)" strokeWidth="1.8" />
          <circle cx={x0 + l1 + l2 / 2} cy={sol - 48} r="5" fill="var(--accent)" stroke="var(--encre)" strokeWidth="1.2" />
        </g>
      )}
      {/* L'échelle des surfaces : le total, et le seuil. */}
      <rect x="16" y="140" width="288" height="8" rx="4" fill="var(--trait)" />
      <rect x="16" y="140" width={Math.max(0, echelle(total) - 16)} height="8" rx="4" fill={total > SEUIL ? "var(--accent-texte)" : "var(--encre)"} />
      <path d={`M${echelle(SEUIL)} 134V154`} stroke="var(--encre)" strokeWidth="2" strokeDasharray="3 2" />
    </svg>
  );
}

export default function Calcul() {
  const [maison, setMaison] = useState(90);
  const [ajout, setAjout] = useState(0);
  const total = maison + ajout;
  const v = verdict(maison, ajout);

  return (
    <div data-film="calcul" className="overflow-hidden rounded-[22px] border border-[var(--trait)] bg-[var(--carte)]">
      <div className="space-y-1 border-b border-[var(--trait)] px-5 pb-4 pt-5 sm:px-7">
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Architecte ou pas&nbsp;?</p>
        <p className="font-[family-name:var(--titres)] text-[30px] font-semibold leading-tight">Ton projet fait combien&nbsp;?</p>
      </div>

      <div className="relative bg-[var(--fond)] px-3 pt-3">
        <Elevation maison={maison} ajout={ajout} />
        <p className="pointer-events-none absolute left-4 top-3 rounded-full bg-[var(--carte)] px-2.5 py-1 text-[12px] font-semibold">Existant · {maison}&nbsp;m²</p>
        {ajout > 0 && <p className="pointer-events-none absolute right-4 top-3 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[12px] font-semibold text-[var(--sur-accent)]">Extension · {ajout}&nbsp;m²</p>}
        <p className="pointer-events-none absolute bottom-1.5 text-[11px] font-semibold" style={{ left: `calc(${(16 + (SEUIL / 350) * 288) / 320 * 100}% - 18px)` }}>150&nbsp;m²</p>
      </div>

      <div className="space-y-5 px-5 py-5 sm:px-7">
        <Curseur etiquette="Ta maison aujourd'hui" valeur={maison} min={30} max={MAX_MAISON} pas={5} changer={setMaison} film="maison" />
        <Curseur etiquette="Tu agrandis de" valeur={ajout} min={0} max={MAX_AJOUT} pas={1} changer={setAjout} film="ajout" />
        <p className={`flex items-baseline justify-between rounded-xl px-4 py-3 ${total > SEUIL ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--fond)]"}`}>
          <span className="font-medium">Au total</span>
          <span data-film="total" className="font-[family-name:var(--titres)] text-[28px] font-semibold tabular-nums">{total}&nbsp;m²</span>
        </p>
      </div>

      <div data-film="verdict" aria-live="polite" className="border-t border-[var(--trait)] px-5 py-5 sm:px-7">
        {v === "obligatoire" && (
          <div className="space-y-1.5">
            <p className="text-[14px] font-medium text-[var(--doux)]">Au-delà de {SEUIL}&nbsp;m², avec permis de construire</p>
            <p className="font-[family-name:var(--titres)] text-[32px] font-bold leading-tight text-[var(--accent-texte)]">Architecte obligatoire</p>
            <p className="text-[13px] text-[var(--doux)]">Code de l&apos;urbanisme, art. R431-2 · pour un particulier qui construit pour lui-même</p>
          </div>
        )}
        {(v === "libre" || v === "declaration") && (
          <div className="space-y-3">
            <p className="text-[14px] font-medium text-[var(--doux)]">
              {v === "declaration" ? `Jusqu'à ${DECLARATION} m² créés : une déclaration préalable suffit` : `${total} m² au total`}
            </p>
            <p className="font-[family-name:var(--titres)] text-[32px] font-bold leading-tight">Pas obligatoire.</p>
            {v === "declaration" && total > SEUIL && (
              <p className="text-[14px] text-[var(--doux)]">Sans permis de construire, pas d&apos;architecte imposé, même au-delà de {SEUIL}&nbsp;m² au total.</p>
            )}
            <p className="font-medium">Mais voilà ce qu&apos;un architecte changerait&nbsp;:</p>
            <ul className="space-y-1.5">
              {APPORTS.map((a) => (
                <li key={a} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-sm bg-[var(--accent-texte)]" />
                  {a}
                </li>
              ))}
            </ul>
            <Link href={`${DOSSIER}/rendez-vous`} className="mt-1 inline-flex min-h-[50px] items-center rounded-full bg-[var(--encre)] px-6 font-semibold text-[var(--fond)]">
              En parler 30 minutes
            </Link>
          </div>
        )}
        {v === "aucune" && (
          <div className="space-y-1.5">
            <p className="font-[family-name:var(--titres)] text-[26px] font-semibold leading-tight">Glisse jusqu&apos;à la surface que tu ajoutes.</p>
            <p className="text-[14px] text-[var(--doux)]">Sans surface créée, l&apos;architecte n&apos;est pas imposé pour la surface. Une façade, un changement d&apos;usage : parlons-en le samedi.</p>
          </div>
        )}
      </div>
      <p className="border-t border-[var(--trait)] px-5 py-3 text-[12px] leading-relaxed text-[var(--doux)] sm:px-7">
        Surface de plancher, pour un particulier qui construit pour lui-même. Une société (SCI comprise)
        n&apos;a pas la dispense. Première réponse : ton PLU peut changer la donne.
      </p>
    </div>
  );
}
