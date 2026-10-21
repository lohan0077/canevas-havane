import Image from "next/image";
import Link from "next/link";
import type { Photo } from "./donnees";
import { DOSSIER, cabinet } from "./donnees";

/** Petit surtitre en capitales, avec un point d'interrogation en guise de puce. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 font-[family-name:var(--titres)] text-xs font-semibold uppercase tracking-[0.2em] ${clair ? "text-[#F0A07A]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${clair ? "bg-[#F0A07A] text-[#1E3A34]" : "bg-[var(--accent)] text-[var(--sur-accent)]"}`}>?</span>
      {children}
    </p>
  );
}

export function Arche({ photo, sizes, className = "", priority = false }: { photo: Photo; sizes: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-[#DCCFBC] ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}

/** Le dernier bloc de chaque page : prendre rendez-vous. */
export function AppelFinal() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 text-center space-y-7">
      <p className="font-[family-name:var(--titres)] text-[44px] sm:text-7xl font-semibold leading-[1.02] tracking-[-0.04em]">
        Une question&nbsp;?<br />
        <span className="text-[var(--accent-texte)]">Venez la poser.</span>
      </p>
      <p className="text-lg text-[var(--doux)]">
        {cabinet.duree} · {cabinet.prix} (prix d&apos;exemple) · {cabinet.adresse}, {cabinet.ville}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex items-center justify-center min-h-14 rounded-full bg-[var(--encre)] text-[var(--fond)] px-8 font-[family-name:var(--titres)] text-lg font-medium">
          Prendre rendez-vous
        </Link>
        <p className="inline-flex items-center justify-center min-h-14 rounded-full border border-[var(--encre)] px-8 font-[family-name:var(--titres)] text-lg tabular-nums">
          {cabinet.telephone}
        </p>
      </div>
    </section>
  );
}
