import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import Logo from "./Logo";
import { DOSSIER, maison } from "./donnees";

// Les pièces communes de Relue : la langue du papier — l'arche d'une enveloppe ouverte
// pour les photos, des filets fins, le cachet de cire, le Bodoni de la marque (le Didot
// de la vidéo) en romain et en italique.

/** Le cachet de cire et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Logo taille={34} />
      <span className="font-[family-name:var(--titres)] text-[24px] italic leading-none tracking-[-0.01em]">Relue</span>
    </span>
  );
}

/** L'intitulé au-dessus d'un titre : un filet, un libellé en petites capitales. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.24em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className={`h-px w-10 ${clair ? "bg-[var(--sur-sombre)]" : "bg-[var(--accent-texte)]"}`} />
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule. */
export function Bouton({ href, children, variante = "sombre" }: { href: string; children: React.ReactNode; variante?: "sombre" | "contour" | "clair" | "cachet" }) {
  const styles = {
    sombre: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
    contour: "border border-current/40 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
    cachet: "bg-[var(--accent)] text-[var(--sur-accent)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-7 py-3 text-[16px] font-medium transition-transform hover:-translate-y-0.5 ${styles}`}>
      {children}
      <span aria-hidden="true" className="font-[family-name:var(--titres)] text-xl italic transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Une photo dans une arche : le rabat d'une enveloppe ouverte. */
export function Arche({ photo, className = "", sizes = "(min-width: 1024px) 40vw, 90vw", priority = false }: { photo: { src: string; alt: string }; className?: string; sizes?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-t-[999px] rounded-b-[18px] bg-[var(--sombre)] ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="kit-cinema-img object-cover" />
    </div>
  );
}

/** Le dernier écran de chaque page : l'affiche, sur le fond animé aux couleurs du papier. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#1E2B4A", "#2C3E63", "#8E3524"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Une seule affiche, partout</Surtitre>
            <TitreRevele
              texte="Personne n'encadre *un texto.*"
              className="font-[family-name:var(--titres)] text-[clamp(3.2rem,8.5vw,7.5rem)] font-normal leading-[0.92] tracking-[-0.03em]"
              classeAccent="italic text-[#F2C9A8]"
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">
              Écris-toi une lettre : on te la poste dans un an, jour pour jour. Ou viens jouer, un jeudi
              par mois, à la soirée découverte.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/dans-un-an`} variante="clair">Écrire ma lettre</Bouton>
            <Bouton href={`${DOSSIER}/soiree-decouverte`} variante="contour">Réserver ma place</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]">
              Ou à la boutique : <span className="font-semibold tabular-nums">{maison.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}

/**
 * Le haut de chaque page intérieure : clair, éditorial, un très grand titre en Bodoni à
 * gauche et sa photo dans une arche à droite.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  balise = "h1",
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  balise?: "h1" | "p";
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--trait)]">
      <div className={`mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-44 ${photo ? "lg:grid-cols-[1.25fr_0.75fr] lg:items-end" : ""}`}>
        <div className="space-y-8">
          <Apparition><Surtitre>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as={balise}
            auChargement
            texte={titre}
            className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3.2rem,8vw,7.6rem)] font-normal leading-[0.92] tracking-[-0.035em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          {children && (
            <Apparition delai={400} className="max-w-2xl text-xl leading-relaxed text-[var(--doux)]">
              {children}
            </Apparition>
          )}
        </div>
        {photo && (
          <Apparition de="rideau" delai={200} className="hidden lg:block">
            <Arche photo={photo} priority className="aspect-[3/4] w-full" />
          </Apparition>
        )}
      </div>
    </section>
  );
}
