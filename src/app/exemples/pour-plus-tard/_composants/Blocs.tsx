import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, studio } from "./donnees";

/** Le monogramme « PT », comme un tampon sur une boîte kraft, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-[3px] border border-current/40 bg-[#C9A27E] font-[family-name:var(--titres)] text-[15px] font-semibold italic text-[#2A211D]">
        PT
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[20px] font-medium tracking-[-0.01em]">Pour Plus Tard</span>
    </span>
  );
}

/** Le cartel au-dessus d'un titre, comme sous un tirage exposé : un filet, un numéro, un texte. */
export function Surtitre({ children, numero, className = "" }: { children: React.ReactNode; numero?: string; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] ${className}`}>
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-current" />
      {numero && <span className="shrink-0 whitespace-nowrap font-[family-name:var(--titres)] text-[15px] normal-case italic tracking-normal">n°&nbsp;{numero}</span>}
      {children}
    </p>
  );
}

/** Un bouton-lien à angles vifs, comme une étiquette ; la flèche avance au survol. */
export function Bouton({
  href,
  children,
  variante = "plein",
}: {
  href: string;
  children: React.ReactNode;
  variante?: "plein" | "contour" | "clair";
}) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/45 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-[3px] px-6 py-3 text-[16px] font-semibold transition-transform hover:-translate-y-0.5 ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * Un tirage : la photo dans son bord blanc, légèrement de travers, et une légende
 * écrite au crayon (Caveat), comme au dos des vieilles photos.
 */
export function Tirage({
  src,
  alt,
  legende,
  angle = 0,
  sizes = "260px",
  priority = false,
  className = "",
  ratio = "aspect-[4/5]",
}: {
  src: string;
  alt: string;
  legende?: string;
  angle?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  ratio?: string;
}) {
  return (
    <figure className={`bg-[#FBF7EF] p-2.5 pb-1 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.75)] sm:p-3 sm:pb-1.5 ${className}`} style={{ rotate: `${angle}deg` }}>
      <div className={`relative overflow-hidden ${ratio}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {legende && <figcaption className="py-1 text-center font-[family-name:var(--f-caveat)] text-[22px] leading-tight text-[#3B2F2A]">{legende}</figcaption>}
    </figure>
  );
}

/** Le haut de chaque page intérieure : brun foncé, comme une chambre noire, avec ses tirages. */
export function EnTetePage({
  surtitre,
  titre,
  children,
  tirages = [],
  apres,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  tirages?: { src: string; alt: string; legende?: string }[];
  apres?: React.ReactNode;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-44 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div className="space-y-7">
          <Apparition>
            <Surtitre>{surtitre}</Surtitre>
          </Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6.6rem)] font-medium leading-[0.95] tracking-[-0.03em]"
            classeAccent="italic text-[#E0B48C]"
          />
          {children && (
            <Apparition delai={400} className="max-w-2xl text-[19px] leading-relaxed">
              {children}
            </Apparition>
          )}
          {apres}
        </div>
        {tirages.length > 0 && (
          <div className="relative mx-auto h-[300px] w-full max-w-[380px] sm:h-[360px]">
            {tirages.slice(0, 3).map((t, i) => (
              <Apparition key={t.src} de="zoom" delai={250 + i * 180} className={`absolute w-[56%] ${["left-0 top-6", "right-0 top-0", "left-[22%] bottom-0"][i]}`}>
                <Tirage src={t.src} alt={t.alt} legende={t.legende} angle={[-6, 5, -2][i]} sizes="220px" priority={i === 0} />
              </Apparition>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : réserver, sur le fond animé, couleurs de chambre noire. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[6px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#2A211D", "#5A2A20", "#9C7350"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre>Novembre 2026</Surtitre>
            <TitreRevele
              texte="Une heure aujourd'hui. *Vingt tirages pour plus tard.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,7vw,6.2rem)] font-medium leading-[0.95] tracking-[-0.03em]"
              classeAccent="italic text-[#E0B48C]"
            />
            <p className="max-w-xl text-lg leading-relaxed">
              Choisis un samedi ou un dimanche : on marche une heure ensemble, et trois semaines plus
              tard, la boîte arrive chez toi.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/reserver`}>Choisir ma date</Bouton>
            <p className="text-[15px]">
              Ou par téléphone : <span className="font-semibold tabular-nums">{studio.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
