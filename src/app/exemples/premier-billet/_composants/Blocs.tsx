import Link from "next/link";
import type { CSSProperties } from "react";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { DELAI_DU_MOIS, DOSSIER, MOIS_DU_CHIFFRE, cabinet, heures } from "./donnees";
import { Medaillon, Rosace } from "./Ornements";
import m from "./Mouvements.module.css";

/**
 * Les bandes vert profond : mêmes variables que le Cadre, autres valeurs, pour que les
 * outils (simulateur, chiffre du mois) s'y posent sans changer. Chaque couple tient 4,5:1.
 */
export const SOMBRE = {
  "--fond": "#17302A",
  "--encre": "#F3EBD8",
  "--doux": "#D3CBB5",
  "--accent": "#C9A227",
  "--sur-accent": "#17302A",
  "--accent-texte": "#E0C25A",
  "--carte": "#1F3D35",
  "--trait": "#3A5B50",
} as CSSProperties;

/** Le médaillon et le nom, pour l'en-tête. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Medaillon className="text-[var(--accent-texte)]" />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] font-semibold tracking-[-0.01em]">Premier Billet</span>
    </span>
  );
}

/**
 * En haut de chaque page, avant tout le reste : le délai de réponse du mois. Mis à jour
 * le 1er de chaque mois — d'où « Chiffre du mois », jamais « en direct ».
 */
export function BarreDuDelai() {
  return (
    <Link href={`${DOSSIER}/delai`} data-film="barre-delai" className="block bg-[var(--accent)] text-[var(--sur-accent)]">
      <span className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[13px] sm:px-8">
        <span>
          <span className="font-semibold uppercase tracking-[0.12em]">Chiffre du mois</span>
          <span aria-hidden="true"> · </span>
          <span className="max-sm:sr-only">délai moyen de réponse en {MOIS_DU_CHIFFRE} : </span>
          <span className="sm:hidden">notre délai de réponse : </span>
          <strong className="tabular-nums">{heures(DELAI_DU_MOIS)}</strong>
        </span>
        <span className="shrink-0 font-semibold underline underline-offset-2">exemple</span>
      </span>
    </Link>
  );
}

/** Le petit intitulé au-dessus d'un titre : deux filets, comme sur un billet. */
export function Surtitre({ children, clair = false, centre = false }: { children: React.ReactNode; clair?: boolean; centre?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.22em] ${centre ? "justify-center" : ""} ${
        clair ? "text-[#E0C25A]" : "text-[var(--accent-texte)]"
      }`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
      {centre && <span aria-hidden="true" className="h-px w-8 bg-current" />}
    </p>
  );
}

/** Un bouton-lien rectangulaire, la flèche avance au survol. */
export function Bouton({ href, children, variante = "plein", ...reste }: { href: string; children: React.ReactNode; variante?: "plein" | "or" | "contour" | "clair" } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const styles = {
    plein: "bg-[var(--encre)] text-[var(--fond)]",
    or: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/40 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[#F3EBD8] text-[#17302A]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 px-6 py-3 text-[16px] font-semibold tracking-[0.01em] transition-transform hover:-translate-y-0.5 ${styles}`} {...reste}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le cadre d'une application : barre de titre, trois points, une adresse. */
export function FenetreApp({ titre, children, className = "", ...reste }: { titre: string; children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`overflow-hidden border border-[var(--trait)] bg-[var(--carte)] shadow-[0_50px_100px_-50px_rgba(10,25,20,0.7)] ${className}`} {...reste}>
      <div className="flex items-center gap-3 border-b border-[var(--trait)] bg-[var(--fond)] px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#C9A227]" />
          <span className="h-2.5 w-2.5 rounded-full border border-[var(--doux)]" />
          <span className="h-2.5 w-2.5 rounded-full border border-[var(--doux)]" />
        </span>
        <span className="flex-1 truncate text-center text-[12px] font-medium text-[var(--doux)]">{titre}</span>
        <span aria-hidden="true" className="w-10" />
      </div>
      {children}
    </div>
  );
}

/** Classes communes des grands titres : Bodoni très grand, l'italique en relief. */
export const TITRE = "font-semibold leading-[0.95] tracking-[-0.02em]";
export const ACCENT = "italic font-normal text-[var(--accent-texte)]";
export const ACCENT_CLAIR = "italic font-normal text-[#E0C25A]";

/**
 * Le haut de chaque page intérieure : un titre très grand, révélé à l'arrivée, sur la
 * crème et sa rosace, ou sur le vert profond (`vert`).
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  vert = false,
  aCote,
  ...reste
}: {
  surtitre: string;
  titre: string;
  children?: React.ReactNode;
  vert?: boolean;
  aCote?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      style={vert ? SOMBRE : undefined}
      className={`relative isolate overflow-hidden ${vert ? "kit-grain bg-[var(--fond)] text-[var(--encre)]" : "border-b-[3px] border-double border-[var(--trait)]"}`}
      {...reste}
    >
      <Rosace className={`${m.tourne} pointer-events-none absolute -right-[18rem] -top-[14rem] h-[46rem] w-[46rem] text-[var(--accent)] ${vert ? "opacity-30" : "opacity-40"}`} />
      <div className={`relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40 ${aCote ? "lg:grid-cols-[1.2fr_0.8fr] lg:items-end" : ""}`}>
        <div className="space-y-7">
          <Apparition><Surtitre clair={vert}>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className={`max-w-5xl text-[clamp(3.1rem,8.5vw,8rem)] ${TITRE}`}
            classeAccent={vert ? ACCENT_CLAIR : ACCENT}
          />
          {children && (
            <Apparition delai={350} className="max-w-2xl text-[19px] leading-relaxed text-[var(--doux)]">
              {children}
            </Apparition>
          )}
        </div>
        {aCote && <Apparition de="zoom" delai={300}>{aCote}</Apparition>}
      </div>
    </section>
  );
}

/** Le dernier écran : le premier rendez-vous, sur le fond vivant vert et or. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#17302A] text-[#F3EBD8]">
        <FondVivant couleurs={["#122822", "#2B5446", "#9C7A16"]} vitesse={0.8} />
        <div className="absolute inset-0 bg-[#17302A]/50" />
        <Rosace className={`${m.tourneInverse} pointer-events-none absolute -left-40 -bottom-56 h-[36rem] w-[36rem] text-[#C9A227] opacity-30`} />
        <div className="relative mx-auto grid grid-cols-1 max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-7">
            <Surtitre clair>Premier rendez-vous</Surtitre>
            <TitreRevele
              texte="Une heure, *pour votre projet.*"
              className={`text-[clamp(3rem,8vw,7rem)] ${TITRE}`}
              classeAccent={ACCENT_CLAIR}
            />
            <p className="max-w-xl text-lg leading-relaxed text-[#F3EBD8]/90">
              Au cabinet ou par téléphone. Votre statut, votre activité, et ce dont vous avez
              réellement besoin. Le premier rendez-vous n&apos;engage à rien.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/rendez-vous`} variante="or">Choisir un créneau</Bouton>
            <p className="text-[15px] text-[#F3EBD8]/90">
              Ou par téléphone : <span className="font-semibold tabular-nums">{cabinet.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
