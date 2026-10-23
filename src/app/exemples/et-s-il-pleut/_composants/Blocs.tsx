import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import Marque from "./Marque";
import { DOSSIER, entreprise, type Photo } from "./donnees";

/** Le parapluie fermé dans son cercle, et le nom en Didot. */
export function NomMarque() {
  return (
    <span className="flex items-center gap-2.5">
      <Marque taille={34} />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] italic">Et s&apos;il pleut</span>
    </span>
  );
}

/** L'intitulé au-dessus d'un titre : petites capitales espacées, une goutte jaune. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.3em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      <span aria-hidden="true" className="h-2.5 w-2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[var(--accent)]" />
      {children}
    </p>
  );
}

/** Un bouton-lien. Plein (jaune parapluie), contour fin, ou ardoise. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "ardoise" }) {
  const style = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current",
    ardoise: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center justify-center gap-3 rounded-full px-7 py-3 text-[16px] font-medium tracking-[0.02em] transition-transform hover:-translate-y-0.5 ${style}`}>
      {children}
      <span aria-hidden="true" className="font-[family-name:var(--titres)] text-xl italic transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * Le haut de chaque page intérieure : un ciel d'ardoise, une photo qui respire derrière
 * un voile, un titre en Didot immense. Toutes les pages s'ouvrent sur ce ciel : l'en-tête
 * flottant l'attend sombre.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  origine,
  aside,
}: {
  surtitre: string;
  titre: string;
  children?: React.ReactNode;
  photo?: Photo;
  origine?: string;
  aside?: React.ReactNode;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,59,76,0.6)_0%,rgba(47,59,76,0.55)_45%,rgba(47,59,76,0.96)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#26313F", "#3E4E63", "#8C7A3A"]} vitesse={0.6} />
          <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        </>
      )}
      <div className={`relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-44 ${aside ? "lg:grid-cols-[0.95fr_1.05fr] lg:items-end" : ""}`}>
        <div className="space-y-7">
          <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="max-w-5xl text-[clamp(3.4rem,9vw,8.4rem)] font-normal leading-[0.92] tracking-[-0.03em]"
            classeAccent="italic text-[var(--accent)]"
          />
          {children && (
            <Apparition delai={400} className="max-w-xl text-xl leading-relaxed">
              {children}
            </Apparition>
          )}
        </div>
        {aside}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : sur le fond vivant, « c'est prévu ». */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="kit-grain relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#26313F", "#45566C", "#A88A2A"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/40" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Premier rendez-vous, gratuit</Surtitre>
            <TitreRevele
              texte={"Et s'il pleut ? *C'est prévu.*"}
              className="text-[clamp(3.2rem,8vw,7rem)] font-normal leading-[0.94] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent)]"
            />
            <p className="max-w-xl text-xl leading-relaxed">
              Ta date, tes deux versions, ton devis — le plan B chiffré dedans. Et le jour J, tu n&apos;as
              plus qu&apos;à être invité à ton propre mariage.
            </p>
            <p className="max-w-xl text-[15px] leading-relaxed">
              Une promesse de méthode, vraie dès le premier jour. Pas de « il a plu, c&apos;était
              parfait » : celle-là, on l&apos;écrira après un vrai mariage sous la pluie, avec l&apos;accord
              des mariés.
            </p>
          </div>
          <Apparition delai={200} className="flex flex-col items-start gap-3 lg:items-end">
            <Bouton href={`${DOSSIER}#ma-date`}>Tu te maries quand&nbsp;?</Bouton>
            <Bouton href={`${DOSSIER}/deux-versions`} variante="contour">Voir les deux versions</Bouton>
            <p className="pt-2 text-[15px]">
              Ou au téléphone : <span className="whitespace-nowrap font-medium">{entreprise.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
