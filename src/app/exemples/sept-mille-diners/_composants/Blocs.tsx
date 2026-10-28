import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import Logo from "./Logo";
import { DOSSIER, maison } from "./donnees";

// Les pièces communes de Sept Mille Dîners, version « carrée » (24/10/2026) : une seule
// échelle de texte, une grille, deux fonds qui alternent, l'accent réservé au bouton
// principal et aux mots en relief.

/** Le mot en relief dans un titre : l'italique de Playfair, en terre cuite. */
export const ACCENT_CLAIR = "italic text-[var(--accent-texte)]";
export const ACCENT_SOMBRE = "italic text-[#F0B49B]";

/** L'assiette au 7, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Logo taille={32} />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[19px] italic tracking-[-0.01em]">Sept Mille Dîners</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : une ligne discrète, en capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`text-[12px] font-medium uppercase tracking-[0.2em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      {children}
    </p>
  );
}

/** Le titre d'un écran, révélé mot à mot ; `*mot*` passe en italique, couleur d'accent. */
export function Titre({
  texte,
  clair = false,
  taille = "grand",
  as = "h2",
  id,
  className = "",
}: {
  texte: string;
  clair?: boolean;
  taille?: "geant" | "grand" | "moyen";
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
}) {
  const tailles = {
    geant: "text-[clamp(2.75rem,6vw,5.25rem)] leading-[1]",
    grand: "text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05]",
    moyen: "text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.1]",
  }[taille];
  return (
    <TitreRevele
      as={as}
      id={id}
      texte={texte}
      className={`font-[family-name:var(--titres)] font-normal tracking-[-0.02em] text-balance ${tailles} ${className}`}
      classeAccent={clair ? ACCENT_SOMBRE : ACCENT_CLAIR}
    />
  );
}

/** Un bouton-lien en pilule : plein (l'accent) ou en contour fin ; la flèche avance au survol. */
export function Bouton({ href, children, variante = "plein", className = "" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair"; className?: string }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex h-12 items-center gap-3 rounded-full px-6 text-[15px] font-medium transition-colors ${styles} ${className}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * Une fenêtre d'application : la barre du haut (trois points, le nom de l'écran,
 * l'étape), et l'outil dedans. C'est ainsi que les deux outils du site sont présentés.
 */
export function Appli({ adresse, etape, children, className = "", id }: { adresse: string; etape: string; children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`overflow-hidden rounded-2xl border border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] shadow-[0_40px_90px_-50px_rgba(36,31,27,0.55)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-[var(--trait)] bg-[var(--fond)] px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--trait)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--trait)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center text-[13px] text-[var(--doux)]">{adresse}</span>
        <span className="hidden text-[13px] font-medium text-[var(--doux)] sm:inline">{etape}</span>
      </div>
      <div className="p-4 sm:p-7">{children}</div>
    </div>
  );
}

/**
 * Le haut de chaque page intérieure : sombre, un titre fin, et derrière lui une photo
 * assez large pour le plein cadre (jamais agrandie) sous un voile brun ; sans photo, le
 * fond sombre seul.
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
    <section data-film={film} className="relative isolate flex min-h-[64svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo && (
        <>
          <Image src={photo.src} alt="" fill priority sizes="100vw" className="object-cover opacity-60" style={{ objectPosition: origine }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,31,27,0.55)_0%,rgba(36,31,27,0.45)_40%,rgba(36,31,27,0.94)_100%)]" />
        </>
      )}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-14 pt-36 md:pb-20">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <Titre as="h1" texte={titre} clair taille="geant" id={id} className="max-w-4xl" />
        {children && (
          <Apparition delai={400} className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">
            {children}
          </Apparition>
        )}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : clair, centré, un bouton. */
export function AppelFinal() {
  return (
    <section className="border-t border-[var(--trait)]">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-28 text-center md:py-40">
        <Apparition><Surtitre>Le premier, c&apos;est nous</Surtitre></Apparition>
        <Titre texte={"Les 7 299 autres *sont à toi.*"} />
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
