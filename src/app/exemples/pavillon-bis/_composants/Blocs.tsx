import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, agence } from "./donnees";

/** Le monogramme : un « B » dans une arche ocre, et le nom en Outfit (la Futura de la marque). */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-8 place-items-center rounded-t-full rounded-b-md bg-[var(--accent)] pt-1 font-[family-name:var(--texte)] text-[19px] font-bold text-[var(--sur-accent)]">
        B
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--texte)] text-[19px] font-semibold tracking-[-0.02em]">Pavillon Bis</span>
    </span>
  );
}

/** Les trois bandes des années 70 : brique, ocre, crème. */
export function Bandes({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex gap-1 ${className}`}>
      <span className="h-1.5 w-5 rounded-full bg-[#C8553D]" />
      <span className="h-1.5 w-5 rounded-full bg-[var(--accent)]" />
      <span className="h-1.5 w-5 rounded-full bg-current opacity-80" />
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : les trois bandes, puis le texte. */
export function Surtitre({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 font-[family-name:var(--texte)] text-[13px] font-semibold uppercase tracking-[0.18em] ${className}`}>
      <Bandes />
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule, dont la flèche avance au survol. */
export function Bouton({
  href,
  children,
  variante = "plein",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variante?: "plein" | "sombre" | "contour" | "clair";
  className?: string;
}) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    sombre: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
    contour: "border-2 border-current/35 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 font-[family-name:var(--texte)] text-[16px] font-semibold transition-transform hover:scale-[1.02] ${styles} ${className}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * La « supergraphie » des années 70 : des arcs concentriques brique, ocre et crème, comme
 * sur les façades et les pochettes de l'époque. Décoratif.
 */
export function Arcs({ className = "", couleurs = ["#C8553D", "#E3B04B", "#F4EFE6", "#7C9A6B"] }: { className?: string; couleurs?: string[] }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 200" className={className}>
      {couleurs.map((c, i) => {
        const r = 190 - i * 34;
        return <path key={c + i} d={`M${200 - r} 200A${r} ${r} 0 0 1 ${200 + r} 200`} fill="none" stroke={c} strokeWidth="26" />;
      })}
    </svg>
  );
}

/**
 * Le haut de chaque page intérieure : sapin, comme l'accueil (l'en-tête flottant
 * l'attend), avec les arcs des années 70, ou une photo qui respire derrière le titre.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  apres,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  apres?: React.ReactNode;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority className="opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,50,44,0.55)_0%,rgba(38,50,44,0.78)_55%,rgba(38,50,44,0.97)_100%)]" />
        </>
      ) : null}
      <div className="relative mx-auto grid max-w-7xl gap-x-10 px-5 pt-36 sm:px-8 md:pt-44 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className={`space-y-7 ${photo ? "pb-16 md:pb-24" : "pb-10 lg:pb-24"}`}>
          <Apparition>
            <Surtitre>{surtitre}</Surtitre>
          </Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3rem,6.6vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.035em]"
            classeAccent="italic font-normal text-[var(--accent)]"
          />
          {children && (
            <Apparition delai={400} className="max-w-2xl text-[19px] leading-relaxed">
              {children}
            </Apparition>
          )}
          {apres}
        </div>
        {!photo && (
          <Apparition de="rideau" delai={300} className="-mb-px justify-self-end">
            <Arcs className="block w-[min(78vw,400px)] lg:w-[440px]" />
          </Apparition>
        )}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : le samedi, sur le fond animé aux couleurs de la marque. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#26322C", "#3D5A47", "#B24A2E"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre>Un samedi matin par mois</Surtitre>
            <TitreRevele
              texte={"On passe voir *la tienne ?*"}
              className="font-[family-name:var(--titres)] text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.92] tracking-[-0.035em]"
              classeAccent="italic font-normal text-[var(--accent)]"
            />
            <p className="max-w-xl text-lg leading-relaxed">
              Trente minutes, à l&apos;agence ou en visio : ta maison, ton terrain, ton budget. Tu repars
              en sachant si ton projet tient — et s&apos;il a besoin d&apos;un architecte.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/rendez-vous`}>Réserver mes 30 minutes</Bouton>
            <p className="text-[15px]">
              Ou par téléphone : <span className="font-semibold tabular-nums">{agence.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
