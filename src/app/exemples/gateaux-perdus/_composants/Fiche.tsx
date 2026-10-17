import type { FicheRecette } from "./donnees";

/**
 * Une fiche de grand-mère, dessinée : papier ligné, écriture à la main, taches de
 * beurre. Aucune vraie fiche n'est montrée : les recettes sont inventées.
 */
export default function Fiche({ fiche, angle = -2, punaise = false, className = "" }: { fiche: FicheRecette; angle?: number; punaise?: boolean; className?: string }) {
  return (
    <div
      className={`relative rounded-[3px] bg-[#FFFDF2] px-5 pb-6 pt-5 text-[#2E2A4A] shadow-[0_18px_30px_-20px_rgba(61,29,19,0.7)] [background-image:linear-gradient(90deg,transparent_34px,#E8B4B4_34px_35px,transparent_35px),repeating-linear-gradient(transparent_0_29px,#D7DCEB_29px_30px)] ${className}`}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <i aria-hidden="true" className="absolute right-6 top-8 h-16 w-20 rounded-[50%] bg-[radial-gradient(closest-side,rgba(214,170,90,0.35),rgba(214,170,90,0.12)_70%,transparent)]" />
      <i aria-hidden="true" className="absolute bottom-6 left-10 h-10 w-12 rounded-[50%] bg-[radial-gradient(closest-side,rgba(214,170,90,0.3),transparent)]" />
      {punaise && <i aria-hidden="true" className="absolute -top-2 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-[#C0392B] shadow-[0_2px_3px_rgba(0,0,0,0.35)]" />}
      <p className="relative pl-8 font-[family-name:var(--f-caveat)] text-[28px] font-bold leading-[30px]">{fiche.titre}</p>
      {fiche.lignes.map((l) => (
        <p key={l} className="relative pl-8 font-[family-name:var(--f-caveat)] text-[22px] leading-[30px]">{l}</p>
      ))}
    </div>
  );
}
