import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import s from "./Nuit.module.css";
import type { Photo } from "./donnees";

/** Une plaque aux coins coupés, cerclée d'un filet d'un pixel. */
export function Plaque({
  children,
  className = "",
  fond,
  coupe = 16,
}: {
  children: ReactNode;
  className?: string;
  fond?: string;
  coupe?: number;
}) {
  return (
    <div className={`${s.plaque} ${className}`} style={{ "--coupe": `${coupe}px` } as CSSProperties}>
      <div className={s.dedans} style={fond ? { background: fond } : undefined}>
        {children}
      </div>
    </div>
  );
}

/** L'en-tête d'une section : le repère, le libellé, le titre, une phrase. */
export function Intitule({
  libelle,
  titre,
  children,
  niveau = 2,
  long = false,
}: {
  libelle: string;
  titre: ReactNode;
  children?: ReactNode;
  niveau?: 1 | 2;
  /** Un titre de plusieurs phrases, un cran plus petit. */
  long?: boolean;
}) {
  const Titre = niveau === 1 ? "h1" : "h2";
  return (
    <div className="space-y-6 max-w-2xl">
      <p className={s.libelle}>
        <span className={s.carre} aria-hidden="true" />
        {libelle}
      </p>
      <Titre className={`${s.titre} text-white ${long ? "text-[28px] sm:text-4xl" : "text-[34px] sm:text-5xl"}`}>{titre}</Titre>
      {children && <p className="text-lg leading-relaxed text-[#b9c0cc]">{children}</p>}
    </div>
  );
}

/**
 * Une photo dans sa plaque. `ratio` fixe le cadrage (la photo est recadrée pour
 * le remplir) ; `decorative` vide le texte alternatif quand l'image n'apporte rien
 * que le texte voisin ne dise déjà.
 */
export function PhotoPlaque({
  photo,
  ratio = "4 / 3",
  sizes,
  coupe = 24,
  className = "",
  decorative = false,
  priority = false,
}: {
  photo: Photo;
  ratio?: string;
  sizes: string;
  coupe?: number;
  className?: string;
  decorative?: boolean;
  priority?: boolean;
}) {
  return (
    <Plaque coupe={coupe} className={`${s.revele} ${className}`}>
      <div className={`${s.zoom} relative overflow-hidden`} style={{ aspectRatio: ratio }}>
        <Image src={photo.src} alt={decorative ? "" : photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </Plaque>
  );
}

export const styles = s;
