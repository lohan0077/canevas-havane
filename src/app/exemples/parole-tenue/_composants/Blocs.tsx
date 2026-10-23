import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, agence } from "./donnees";

/** Le monogramme : un « P » sur un talon de billet perforé, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="relative grid h-9 w-9 place-items-center rounded-[10px] bg-[var(--accent)] font-[family-name:var(--titres)] text-[22px] italic leading-none text-[var(--sur-accent)]">
        P
        <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-current opacity-25" />
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[23px] leading-none tracking-[-0.01em]">Parole Tenue</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : un avion, un pointillé, le texte. */
export function Surtitre({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] ${className}`}>
      <span aria-hidden="true" className="text-[15px] leading-none">✈</span>
      <span aria-hidden="true" className="w-8 shrink-0 border-t-2 border-dotted border-current opacity-70" />
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule ; la flèche avance au survol. */
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
    contour: "border-2 border-current/35 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 text-[16px] font-semibold transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le haut de chaque page intérieure : sapin, une photo qui respire, un grand titre. */
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
          <PhotoCinema src={photo.src} alt="" priority className="opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,48,42,0.6)_0%,rgba(22,48,42,0.78)_55%,rgba(22,48,42,0.97)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#16302A", "#2B5247", "#A8553F"]} vitesse={0.7} />
          <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-44">
        <Apparition>
          <Surtitre>{surtitre}</Surtitre>
        </Apparition>
        <TitreRevele
          as="h1"
          auChargement
          texte={titre}
          className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3.4rem,8vw,7.6rem)] leading-[0.92] tracking-[-0.02em]"
          classeAccent="italic text-[var(--accent)]"
        />
        {children && (
          <Apparition delai={400} className="max-w-2xl text-[19px] leading-relaxed">
            {children}
          </Apparition>
        )}
        {apres}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : l'affiche du lancement, sur le fond animé. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#16302A", "#2E5A4E", "#B65A44"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre>{agence.baseline}</Surtitre>
            <TitreRevele
              texte={"Tu avais dit « un jour ». *C'est quand ?*"}
              className="font-[family-name:var(--titres)] text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent)]"
            />
            <p className="max-w-xl text-lg leading-relaxed">
              Trente minutes avec un conseiller, en visio ou à l&apos;agence. Il ferme les quarante onglets à ta
              place, et revient avec une date.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}#ferme`}>Ferme tes onglets</Bouton>
            <p className="text-[15px]">
              Ou par téléphone : <span className="font-semibold tabular-nums">{agence.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
