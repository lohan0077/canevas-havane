import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import { DOSSIER, agence } from "./donnees";

// Passe « frontend-design » (30/10/2026) : les titres se lisent d'un seul tenant, en Sora,
// sans mot en italique ; plus de surtitres en capitales ni de flèches dans les boutons.
// L'italique de DM Serif Display reste ce qu'il est dans le nom (« bis ») : la deuxième
// version. Il ne nomme plus que l'après, en entier (`APRES`), jamais un bout de titre.

/** Le mot « après » ou « deuxième version », dans l'italique du « bis ». */
export const APRES = "font-[family-name:var(--serif)] italic font-normal tracking-normal";

/**
 * La marque : un pignon dessiné en deux moitiés — à gauche le trait de la maison d'hier,
 * à droite l'aplat vermillon de sa deuxième version — et le nom, « bis » en italique.
 */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <svg aria-hidden="true" viewBox="0 0 28 28" className="h-8 w-8 shrink-0">
        <path d="M14 3 L3 12 V25 H14 Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 3 L25 12 V25 H14 Z" fill="var(--accent)" />
        <path d="M14 3 V25" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      <span className="whitespace-nowrap font-[family-name:var(--texte)] text-[19px] font-semibold tracking-[-0.03em]">
        Pavillon <span className="font-[family-name:var(--serif)] text-[1.15em] font-normal italic tracking-normal">bis</span>
      </span>
    </span>
  );
}

/** Le titre d'un écran : Sora serrée, d'un seul tenant. */
export function Titre({
  texte,
  taille = "grand",
  as: Balise = "h2",
  className = "",
}: {
  texte: string;
  taille?: "geant" | "grand" | "moyen";
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  const tailles = {
    geant: "text-[clamp(2.75rem,6vw,5.25rem)] leading-[1]",
    grand: "text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05]",
    moyen: "text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.1]",
  }[taille];
  return (
    <Balise className={`font-[family-name:var(--titres)] font-medium tracking-[-0.04em] text-balance ${tailles} ${className}`}>
      {texte}
    </Balise>
  );
}

/** Un bouton-lien en pilule : un plein (le vermillon), un sombre, un en contour fin, un clair. */
export function Bouton({
  href,
  children,
  variante = "plein",
}: {
  href: string;
  children: React.ReactNode;
  variante?: "plein" | "sombre" | "contour" | "clair";
}) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    sombre: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center rounded-full px-6 font-[family-name:var(--texte)] text-[15px] font-semibold transition-colors ${styles}`}
    >
      {children}
    </Link>
  );
}

/**
 * Le haut de chaque page intérieure : anthracite, comme l'accueil (l'en-tête flottant
 * l'attend), une photo sous un voile si on en donne une, et un titre serré. Pas
 * d'intitulé au-dessus : le titre et sa phrase disent de quoi parle la page.
 */
export function EnTetePage({
  titre,
  children,
  photo,
  apres,
}: {
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  apres?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[64svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo && (
        <>
          <Image src={photo.src} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,24,28,0.6)_0%,rgba(21,24,28,0.78)_55%,rgba(21,24,28,0.96)_100%)]" />
        </>
      )}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-14 pt-36 md:pb-20">
        <h1 className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.75rem,6vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.045em] text-balance">
          {titre}
        </h1>
        {children && (
          <Apparition delai={400} className="max-w-xl text-lg leading-relaxed">
            {children}
          </Apparition>
        )}
        {apres}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : le samedi matin, clair et centré. */
export function AppelFinal() {
  return (
    <section className="border-t border-[var(--trait)]">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-28 text-center md:py-36">
        <Titre texte={"On passe voir la tienne ?"} />
        <Apparition as="p" delai={150} className="mx-auto max-w-lg text-lg leading-relaxed text-[var(--doux)]">
          Un samedi matin par mois, trente minutes, à l&apos;agence ou en visio : ta maison, ton terrain,
          ton budget. Tu repars en sachant si ton projet tient — et s&apos;il a besoin d&apos;un architecte.
        </Apparition>
        <Apparition delai={250} className="flex flex-col items-center gap-4">
          <Bouton href={`${DOSSIER}/rendez-vous`}>Réserver mes 30 minutes</Bouton>
          <p className="text-[15px] text-[var(--doux)]">
            Ou par téléphone : <span className="font-medium tabular-nums text-[var(--encre)]">{agence.telephone}</span>
          </p>
        </Apparition>
      </div>
    </section>
  );
}
