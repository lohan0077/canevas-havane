import type { Auteur, Oeuvre } from "./donnees";
import Signature from "./Signature";
import styles from "./Autographe.module.css";

/**
 * Le pot signé : la collerette d'Autographe, où le prénom de l'auteur est écrit plus
 * gros que le produit. Dessiné, pas photographié : aucun vrai pot ne porte ces noms.
 * L'étiquette légale du producteur (ingrédients, allergènes, poids) reste au dos.
 */
export default function Pot({ auteur, oeuvre, animee = false, className = "" }: { auteur: Auteur; oeuvre: Oeuvre; animee?: boolean; className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[19rem] ${className}`} aria-hidden="true">
      <div className="mx-auto h-9 w-[78%] rounded-t-xl rounded-b-sm bg-[#1E2A4A]" />
      <div className="relative -mt-1 overflow-hidden rounded-b-[3rem] rounded-t-[1.6rem] px-4 pb-10 pt-12" style={{ background: oeuvre.teinte }}>
        <div className="absolute inset-y-0 left-5 w-5 rounded-full bg-white/20" />
        <div className="relative space-y-1 rounded-[6px] border-[3px] border-[#1E2A4A] bg-[#FFFCF6] px-4 pb-4 pt-3 text-center text-[#1E2A4A] shadow-[0_8px_20px_-12px_rgba(0,0,0,0.6)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">Autographe · n° {auteur.numero} · exemple</p>
          <p className="font-[family-name:var(--titres)] text-[3.4rem] font-semibold leading-none">{auteur.prenom}</p>
          <Signature variante={auteur.signature} couleur="#1E2A4A" animee={animee} className="mx-auto -mt-1 h-10 w-[85%]" />
          <p className="text-sm italic">{oeuvre.nom.toLowerCase()}</p>
          <p className="text-[11px] uppercase tracking-[0.16em]">{auteur.chiffre} · {auteur.lieu.replace(/^(en|dans le|dans la|à) /, "")}</p>
        </div>
      </div>
      <span className={`absolute right-1 bottom-3 grid h-16 w-16 place-items-center rounded-full bg-[#B43A2E] font-[family-name:var(--titres)] text-3xl text-[#FBF7EF] shadow-lg ${animee ? styles.tampon : "-rotate-[14deg]"}`}>
        A
      </span>
    </div>
  );
}

/** Le même pot, en vignette : le couvercle, la teinte du produit, le prénom sur la collerette. */
export function PotMini({ auteur, oeuvre, petit = false }: { auteur: Auteur; oeuvre: Oeuvre; petit?: boolean }) {
  return (
    <div className={petit ? "w-[4.2rem]" : "w-[5.5rem]"} aria-hidden="true">
      <div className="mx-auto h-3 w-[76%] rounded-t-md bg-[#1E2A4A]" />
      <div className="overflow-hidden rounded-b-[1.4rem] rounded-t-lg px-1.5 pb-4 pt-4" style={{ background: oeuvre.teinte }}>
        <div className="rounded-[3px] border-2 border-[#1E2A4A] bg-[#FFFCF6] px-1 py-1.5 text-center text-[#1E2A4A]">
          <p className={`font-[family-name:var(--titres)] font-semibold leading-none ${petit ? (auteur.prenom.length > 6 ? "text-[10px]" : "text-[13px]") : auteur.prenom.length > 6 ? "text-[15px]" : "text-lg"}`}>{auteur.prenom}</p>
          <Signature variante={auteur.signature} couleur="#1E2A4A" className="mx-auto h-3 w-[80%]" />
        </div>
      </div>
    </div>
  );
}
