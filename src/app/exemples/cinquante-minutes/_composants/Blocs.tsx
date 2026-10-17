import Link from "next/link";
import { DOSSIER, cabinet } from "./donnees";

/** Petit surtitre espacé, en caramel foncé. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.26em] ${clair ? "text-[#C9A27E]" : "text-[var(--accent-texte)]"}`}>{children}</p>
  );
}

/**
 * La plaque du cabinet : le nom de la marque en petit, le titre protégé en grand.
 * « Psychologue » est un titre réservé par la loi : c'est lui qui rassure.
 */
export function Plaque() {
  return (
    <div className="relative min-w-0 mx-auto w-full max-w-[420px] rounded-[10px] bg-[linear-gradient(145deg,#D8B892,#C9A27E_45%,#B88D63)] px-6 py-10 text-center text-[#2A1830] shadow-[0_30px_60px_-30px_rgba(42,24,48,0.7)]" data-film="plaque">
      {[["left-3", "top-3"], ["right-3", "top-3"], ["left-3", "bottom-3"], ["right-3", "bottom-3"]].map(([x, y]) => (
        <span key={x + y} aria-hidden="true" className={`absolute ${x} ${y} h-2.5 w-2.5 rounded-full bg-[#8E6A47]`} />
      ))}
      <p className="font-[family-name:var(--titres)] text-lg italic">Cinquante Minutes</p>
      <p className="mt-2 font-[family-name:var(--titres)] text-[clamp(28px,9.5vw,54px)] leading-none uppercase">Psychologue</p>
      <p className="mt-3 text-sm">{cabinet.psychologue} · sur rendez-vous</p>
    </div>
  );
}

export function BoutonRdv({ clair = false }: { clair?: boolean }) {
  return (
    <Link
      href={`${DOSSIER}#rendez-vous`}
      className={`inline-flex items-center justify-center min-h-12 rounded-full px-7 text-[15px] font-semibold ${clair ? "bg-[#F4ECE2] text-[#2A1830]" : "bg-[var(--encre)] text-[var(--fond)]"}`}
    >
      Prendre rendez-vous
    </Link>
  );
}
