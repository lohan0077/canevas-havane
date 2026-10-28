import Link from "next/link";
import { APPORTS, DECLARATION, DOSSIER, SEUIL, verdict } from "./donnees";

export const MAX_MAISON = 250;
export const MAX_AJOUT = 100;

/** Un curseur : un rail épais aux couleurs de la marque, un bouton rond cerclé de sapin. */
export function Curseur({ etiquette, valeur, min, max, pas, changer, film }: { etiquette: string; valeur: number; min: number; max: number; pas: number; changer: (v: number) => void; film: string }) {
  const rempli = ((valeur - min) / (max - min)) * 100;
  return (
    <label className="block space-y-3">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-[16px] font-medium">{etiquette}</span>
        <span className="font-[family-name:var(--titres)] text-[30px] font-normal tabular-nums leading-none">{valeur}&nbsp;m²</span>
      </span>
      <input
        type="range"
        data-film={film}
        min={min}
        max={max}
        step={pas}
        value={valeur}
        onChange={(e) => changer(Number(e.target.value))}
        className="h-2.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[4px] [&::-moz-range-thumb]:border-[var(--encre)] [&::-moz-range-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[4px] [&::-webkit-slider-thumb]:border-[var(--encre)] [&::-webkit-slider-thumb]:bg-[var(--accent)]"
        style={{ background: `linear-gradient(90deg, #C8553D ${rempli}%, var(--trait) ${rempli}%)` }}
      />
    </label>
  );
}

/** La maison, en élévation : l'existant, l'extension hachurée, et le seuil de 150 m² sur l'échelle. */
export function Elevation({ maison, ajout }: { maison: number; ajout: number }) {
  const total = maison + ajout;
  const l1 = 40 + (maison / MAX_MAISON) * 150;
  const l2 = (ajout / MAX_AJOUT) * 90;
  const x0 = 16;
  const sol = 118;
  const echelle = (m: number) => 16 + (m / 350) * 288;
  return (
    <svg viewBox="0 0 320 172" role="img" aria-label={`Une maison de ${maison} m² et une extension de ${ajout} m² : ${total} m² au total`} className="block h-auto w-full">
      <defs>
        <pattern id="pb-hachures" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V6" stroke="#B24A2E" strokeWidth="1.8" />
        </pattern>
      </defs>
      <circle cx="270" cy="40" r="20" fill="#E3B04B" opacity="0.85" />
      <path d={`M0 ${sol}H320`} stroke="var(--encre)" strokeWidth="1.5" />
      <rect x={x0} y={sol - 52} width={l1} height="52" fill="#F1E6CF" stroke="var(--encre)" strokeWidth="1.5" />
      <path d={`M${x0 - 6} ${sol - 52}L${x0 + l1 / 2} ${sol - 80}L${x0 + l1 + 6} ${sol - 52}Z`} fill="#B24A2E" stroke="var(--encre)" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x={x0 + l1 * 0.18} y={sol - 30} width="14" height="30" fill="#6B4A2F" stroke="var(--encre)" strokeWidth="1.2" />
      <rect x={x0 + l1 * 0.55} y={sol - 40} width="18" height="14" fill="#A9CBD0" stroke="var(--encre)" strokeWidth="1.2" />
      {ajout > 0 && (
        <rect x={x0 + l1} y={sol - 40} width={l2} height="40" fill="url(#pb-hachures)" stroke="#B24A2E" strokeWidth="2" />
      )}
      <rect x="16" y="140" width="288" height="9" rx="4.5" fill="var(--trait)" />
      <rect x="16" y="140" width={Math.max(0, echelle(total) - 16)} height="9" rx="4.5" fill={total > SEUIL ? "#B24A2E" : "var(--encre)"} />
      <path d={`M${echelle(SEUIL)} 133V156`} stroke="var(--encre)" strokeWidth="2" strokeDasharray="3 2" />
    </svg>
  );
}

/** La réponse : obligatoire, pas obligatoire (et ce qu'un architecte changerait), ou l'invitation à glisser. */
export function Reponse({ maison, ajout }: { maison: number; ajout: number }) {
  const total = maison + ajout;
  const v = verdict(maison, ajout);
  return (
    <div data-film="verdict" aria-live="polite" className="space-y-3">
      {v === "obligatoire" && (
        <div className="space-y-2 rounded-2xl bg-[#A63F2A] p-5 text-[#F4EFE6] sm:p-6">
          <p className="text-[14px] font-medium">Au-delà de {SEUIL}&nbsp;m², avec permis de construire</p>
          <p className="font-[family-name:var(--titres)] text-[clamp(2rem,4vw,2.6rem)] font-normal leading-[1.02]">Architecte obligatoire</p>
          <p className="text-[13px]">Code de l&apos;urbanisme, art. R431-2 · pour un particulier qui construit pour lui-même</p>
        </div>
      )}
      {(v === "libre" || v === "declaration") && (
        <div className="space-y-3 rounded-2xl bg-[var(--fond)] p-5 sm:p-6">
          <p className="text-[14px] font-medium text-[var(--doux)]">
            {v === "declaration" ? `Jusqu'à ${DECLARATION} m² créés : une déclaration préalable suffit` : `${total} m² au total`}
          </p>
          <p className="font-[family-name:var(--titres)] text-[clamp(2rem,4vw,2.6rem)] font-normal leading-[1.02]">Pas obligatoire.</p>
          {v === "declaration" && total > SEUIL && (
            <p className="text-[14px] text-[var(--doux)]">Sans permis de construire, pas d&apos;architecte imposé, même au-delà de {SEUIL}&nbsp;m² au total.</p>
          )}
          <p className="font-medium">Mais voilà ce qu&apos;un architecte changerait&nbsp;:</p>
          <ul className="space-y-1.5">
            {APPORTS.map((a) => (
              <li key={a} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C8553D]" />
                {a}
              </li>
            ))}
          </ul>
          <Link href={`${DOSSIER}/rendez-vous`} className="mt-1 inline-flex min-h-[50px] items-center rounded-full bg-[var(--encre)] px-6 font-medium text-[var(--fond)]">
            En parler 30 minutes, un samedi
          </Link>
        </div>
      )}
      {v === "aucune" && (
        <div className="space-y-2 rounded-2xl bg-[var(--fond)] p-5 sm:p-6">
          <p className="font-[family-name:var(--titres)] text-[26px] font-normal leading-tight">Glisse jusqu&apos;à la surface que tu ajoutes.</p>
          <p className="text-[14px] text-[var(--doux)]">Sans surface créée, l&apos;architecte n&apos;est pas imposé pour la surface. Une façade, un changement d&apos;usage : parlons-en le samedi.</p>
        </div>
      )}
    </div>
  );
}
