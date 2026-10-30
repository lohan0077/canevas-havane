import Image from "next/image";
import Link from "next/link";
import type { Photo } from "./donnees";

/** Le signe du rembobinage, deux pointes vers la gauche : la soirée se construit à l'envers. */
export function Rembobine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M11.5 5.2v13.6L2.6 12z" />
      <path d="M21.4 5.2v13.6L12.5 12z" />
    </svg>
  );
}

/** Le nom : le signe du rembobinage dans un rond rose, et « lundi d'après » en bas de casse. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)]">
        <Rembobine className="h-[15px] w-[15px] -translate-x-px" />
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[19px] font-semibold lowercase leading-none tracking-[-0.03em]">lundi d&apos;après</span>
    </span>
  );
}

/** Une petite ligne au-dessus d'un titre, quand elle apprend quelque chose (pour qui, quand) : en casse normale. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`text-[15px] font-medium leading-snug ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      {children}
    </p>
  );
}

/**
 * Les outils du kit (CalculPalier, Questionnaire) écrivent leurs petits intitulés en
 * capitales espacées. Posée sur leur enveloppe, cette classe les remet en casse normale,
 * un peu plus grands, sans toucher au kit partagé par les autres sites.
 */
export const KIT_EN_CASSE_NORMALE = "[&_.uppercase]:normal-case [&_.uppercase]:tracking-normal [&_.uppercase]:text-[15px]";

/** Un bouton-lien en pilule : plein (le rose), au trait fin, nuit ou blanc. */
export function Bouton({
  href,
  children,
  variante = "plein",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variante?: "plein" | "contour" | "cafe" | "clair";
  className?: string;
}) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    // Le bouton nuit, pour un fond clair où le rose ne suffirait pas à le détacher.
    cafe: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
    // Le bouton blanc, posé sur la nuit.
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`inline-flex h-12 items-center gap-3 rounded-full px-6 text-[15px] font-medium transition-colors ${styles} ${className}`}>
      {children}
    </Link>
  );
}

/**
 * Le titre d'un écran, en bas de casse et d'un seul tenant : Syne affichiste, toujours la
 * même échelle et la même graisse, aucun mot mis en relief.
 */
export function Titre({
  texte,
  taille = "grand",
  as: Balise = "h2",
  className = "",
}: {
  texte: string;
  /** Sur la nuit : le titre prend simplement la couleur de sa section. */
  clair?: boolean;
  taille?: "grand" | "moyen";
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  const tailles = {
    grand: "text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05]",
    moyen: "text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.1]",
  }[taille];
  return (
    <Balise className={`font-[family-name:var(--titres)] font-semibold lowercase tracking-[-0.035em] text-balance ${tailles} ${className}`}>
      {texte}
    </Balise>
  );
}

/** Le haut d'un écran de l'accueil : un titre, une phrase. Toujours le même gabarit. */
export function Intitule({ titre, texte, clair = false }: { titre: string; texte?: React.ReactNode; clair?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
      <Titre texte={titre} clair={clair} />
      {texte && (
        <p className={`text-lg leading-relaxed ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
          {texte}
        </p>
      )}
    </div>
  );
}

/**
 * Le haut de chaque page intérieure : la nuit de la marque, une photo sous un voile qui
 * la laisse respirer, un titre en très grand.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  niveau: Niveau = "h1",
  origine = "50% 50%",
}: {
  surtitre?: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: Photo;
  niveau?: "h1" | "p";
  origine?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[64svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo && (
        <>
          <Image src={photo.src} alt="" fill priority sizes="(max-width: 1023px) 100vh, 100vw" className="object-cover opacity-70" style={{ objectPosition: origine }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,12,29,0.6)_0%,rgba(14,12,29,0.35)_40%,rgba(14,12,29,0.94)_100%)]" />
        </>
      )}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-14 pt-36 md:pb-20">
        {surtitre && <Surtitre clair>{surtitre}</Surtitre>}
        <Niveau className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.6rem,6vw,5.25rem)] font-semibold lowercase leading-[1] tracking-[-0.045em] text-balance">
          {titre}
        </Niveau>
        {children && <div className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">{children}</div>}
      </div>
    </section>
  );
}

/** Une section de page, bornée et aérée. */
export function Section({ children, id, className = "", fond = "" }: { children: React.ReactNode; id?: string; className?: string; fond?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 ${fond}`}>
      <div className={`mx-auto max-w-6xl px-6 py-28 md:py-40 ${className}`}>{children}</div>
    </section>
  );
}
