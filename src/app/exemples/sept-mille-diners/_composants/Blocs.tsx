import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import Logo from "./Logo";
import { DOSSIER, maison } from "./donnees";

// Les pièces communes de Sept Mille Dîners (identité du 30/10/2026) : une échelle de
// texte, une grille, deux mondes qui alternent — la nuit par défaut, la porcelaine posée
// section par section —, le laiton réservé au bouton principal, aux filets et aux mots
// en italique sur la nuit.

/**
 * Le monde « porcelaine » : redéfinit les variables du Cadre sur une section claire.
 * Tout ce qui est dedans (titres, outils, kit) suit. Sur la porcelaine, le bouton
 * principal est noir et les mots en relief restent à l'encre : le laiton y serait
 * trop pâle pour du texte (2,3:1), il n'y garde que les filets.
 */
export const PORCELAINE =
  "[--fond:#F3F2EF] [--encre:#141517] [--doux:#5C5A55] [--carte:#FBFAF8] [--trait:#DAD8D2] [--accent:#141517] [--sur-accent:#F3F2EF] [--accent-texte:#141517] bg-[var(--fond)] text-[var(--encre)]";

/** Le mot en relief dans un titre : l'italique de Playfair, en laiton sur la nuit. */
export const ACCENT = "italic text-[var(--accent-texte)]";

/** L'assiette au 7, et le nom en capitales espacées. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Logo taille={30} />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[13.5px] font-medium uppercase tracking-[0.2em]">Sept Mille Dîners</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : un filet de laiton, puis des capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.24em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      <span aria-hidden="true" className="h-px w-7 shrink-0 bg-[var(--accent)]" />
      <span>{children}</span>
    </p>
  );
}

/** Le titre d'un écran, révélé mot à mot ; `*mot*` passe en italique (laiton sur la nuit). */
export function Titre({
  texte,
  taille = "grand",
  as = "h2",
  id,
  className = "",
  auChargement = false,
}: {
  texte: string;
  clair?: boolean;
  taille?: "ouverture" | "geant" | "grand" | "moyen";
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  auChargement?: boolean;
}) {
  const tailles = {
    ouverture: "text-[clamp(3.4rem,14vw,8.25rem)] leading-[0.9] tracking-[-0.035em]",
    geant: "text-[clamp(2.9rem,6.4vw,5.75rem)] leading-[0.98] tracking-[-0.03em]",
    grand: "text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.03] tracking-[-0.025em]",
    moyen: "text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.1] tracking-[-0.02em]",
  }[taille];
  return (
    <TitreRevele
      as={as}
      id={id}
      texte={texte}
      auChargement={auChargement}
      className={`font-[family-name:var(--titres)] font-normal text-balance ${tailles} ${className}`}
      classeAccent={ACCENT}
    />
  );
}

/**
 * Un bouton-lien en pilule, libellé en capitales espacées : plein (le laiton sur la
 * nuit, l'encre sur la porcelaine) ou en contour fin ; la flèche avance au survol.
 */
export function Bouton({ href, children, variante = "plein", className = "" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair"; className?: string }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)] hover:brightness-110",
    contour: "border border-current/35 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--sur-sombre)] text-[var(--sombre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-[3.25rem] items-center gap-4 rounded-full px-7 text-[13px] font-semibold uppercase tracking-[0.16em] transition-[filter,background-color] duration-300 ${styles} ${className}`}>
      {children}
      <span aria-hidden="true" className="text-base tracking-normal transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * Une fenêtre d'application : la barre du haut (trois points, le nom de l'écran,
 * l'étape), et l'outil dedans. C'est ainsi que les deux outils du site sont présentés.
 */
export function Appli({ adresse, etape, children, className = "", id }: { adresse: string; etape: string; children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`overflow-hidden rounded-2xl border border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] shadow-[0_50px_100px_-60px_rgba(0,0,0,0.7)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-[var(--trait)] bg-[var(--fond)] px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--trait)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--trait)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center text-[13px] text-[var(--doux)]">{adresse}</span>
        <span className="hidden text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--doux)] sm:inline">{etape}</span>
      </div>
      <div className="p-4 sm:p-7">{children}</div>
    </div>
  );
}

/**
 * Le haut de chaque page intérieure : la nuit, un titre fin, et derrière lui une photo
 * assez large pour le plein cadre (jamais agrandie) sous un voile de nuit ; sans photo,
 * la nuit seule, et un filet de laiton.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  origine = "50% 50%",
  id,
  film,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  origine?: string;
  id?: string;
  film?: string;
}) {
  return (
    <section data-film={film} className="relative isolate flex min-h-[66svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo && (
        <>
          <Image src={photo.src} alt="" fill priority sizes="100vw" className="object-cover opacity-55 [filter:saturate(0.85)]" style={{ objectPosition: origine }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.6)_0%,rgba(11,11,12,0.45)_40%,rgba(11,11,12,0.95)_100%)]" />
        </>
      )}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-14 pt-36 md:pb-20">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <Titre as="h1" texte={titre} taille="geant" id={id} className="max-w-4xl" auChargement />
        {children && (
          <Apparition delai={400} className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">
            {children}
          </Apparition>
        )}
      </div>
    </section>
  );
}

/**
 * Le dernier écran de chaque page : centré, l'assiette, un bouton. Porcelaine par défaut ;
 * `monde="nuit"` quand la section d'avant est déjà claire, pour garder l'alternance.
 */
export function AppelFinal({ monde = "porcelaine" }: { monde?: "porcelaine" | "nuit" }) {
  return (
    <section className={monde === "porcelaine" ? PORCELAINE : "border-t border-[var(--trait)]"}>
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-28 text-center md:py-40">
        <Apparition className="flex justify-center"><Logo taille={52} /></Apparition>
        <Apparition className="flex justify-center"><Surtitre>Le premier, c&apos;est nous</Surtitre></Apparition>
        <Titre texte={"Les 7 299 autres *sont à toi.*"} />
        <Apparition as="p" delai={150} className="mx-auto max-w-lg text-lg leading-relaxed text-[var(--doux)]">
          Trois questions sur ta vie, la longueur de tes murs, et Mathieu vient prendre les cotes. Le soir de la pose,
          on cuisine le premier dîner.
        </Apparition>
        <Apparition delai={250} className="flex flex-col items-center gap-4">
          <Bouton href={`${DOSSIER}/tes-murs#cotes`}>Réserver la prise de cotes</Bouton>
          <p className="text-[15px] text-[var(--doux)]">
            Ou par téléphone : <span className="font-medium tabular-nums text-[var(--encre)]">{maison.telephone}</span>
          </p>
        </Apparition>
      </div>
    </section>
  );
}
