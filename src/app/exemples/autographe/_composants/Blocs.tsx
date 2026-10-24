import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import Signature from "./Signature";
import { DOSSIER, boutique } from "./donnees";

/** Le cachet rouge « A » et le nom, comme sur la collerette des pots. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 -rotate-[10deg] place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-xl font-semibold text-[var(--sur-accent)] ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-transparent">
        A
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] font-semibold tracking-[-0.01em]">Autographe</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : un filet, des capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.22em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className={`h-px w-10 ${clair ? "bg-[var(--sur-sombre)]" : "bg-[var(--accent)]"}`} />
      {children}
    </p>
  );
}

/** Un bouton-lien rectangulaire, comme un ex-libris : coins droits, flèche qui avance. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "encre" | "contour" | "clair" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    encre: "bg-[var(--encre)] text-[var(--fond)]",
    contour: "border-2 border-current",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 px-6 py-3 text-[17px] font-semibold transition-transform hover:-translate-y-0.5 ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * Le haut de chaque page intérieure : papier, grand titre en Bodoni révélé mot à mot,
 * une signature qui se trace, et une photo qui respire dans un cadre à filet décalé.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  signature = 1,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo: { src: string; alt: string };
  signature?: number;
}) {
  return (
    <section className="kit-grain relative overflow-hidden border-b-2 border-[var(--encre)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-32 sm:px-8 md:pt-40 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:pb-20">
        <div className="space-y-7">
          <Apparition><Surtitre>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="text-[clamp(3.4rem,8.5vw,8rem)] font-semibold leading-[0.9] tracking-[-0.035em]"
            classeAccent="font-normal italic text-[var(--accent-texte)]"
          />
          <Signature variante={signature} animee className="h-12 w-64 text-[var(--accent)] sm:h-16 sm:w-80" />
          {children && (
            <Apparition delai={350} className="max-w-xl text-xl leading-relaxed">
              {children}
            </Apparition>
          )}
        </div>
        <Apparition de="rideau" delai={200} className="relative mx-auto w-full max-w-sm">
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-[var(--encre)]" />
          <div className="relative aspect-[4/5] overflow-hidden bg-[var(--sombre)]">
            <PhotoCinema src={photo.src} alt={photo.alt} priority sizes="(min-width: 1024px) 384px, 90vw" />
          </div>
        </Apparition>
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : le coffret du soir, sur le fond animé de l'épicerie. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#1E2A4A", "#3A2A55", "#B43A2E"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-7">
            <Surtitre clair>Invité ce soir&nbsp;?</Surtitre>
            <TitreRevele
              texte="Il est encore *temps.*"
              className="text-[clamp(3.2rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.035em]"
              classeAccent="font-normal italic"
            />
            <p className="max-w-xl text-xl leading-relaxed text-[var(--sur-sombre)]/90">
              Trois questions, un coffret signé par ses auteurs. Commandé avant {boutique.limite}, prêt à{" "}
              {boutique.retrait} au comptoir, avec ta carte sous la ficelle.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-5 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}#composer`}>Composer mon coffret</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/90 lg:text-right">
              {boutique.adresse}, {boutique.ville}
              <br />
              <span className="font-semibold tabular-nums">{boutique.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
