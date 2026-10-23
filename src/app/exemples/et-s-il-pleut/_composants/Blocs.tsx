import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import Marque from "./Marque";
import { DOSSIER, entreprise, type Photo } from "./donnees";

/** Les classes d'un mot en relief : l'italique du Didot, en or sur clair, en jaune sur sombre. */
export const ACCENT_CLAIR = "italic font-normal text-[var(--accent-texte)]";
export const ACCENT_SOMBRE = "italic font-normal text-[var(--accent)]";

/** Le parapluie fermé dans son cercle, et le nom en Didot. */
export function NomMarque() {
  return (
    <span className="flex items-center gap-2.5">
      <Marque taille={34} />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[20px] font-normal italic">Et s&apos;il pleut</span>
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

/** Un bouton-lien en pilule : plein (le jaune parapluie), contour fin, ou ardoise. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "ardoise" }) {
  const style = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    ardoise: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex h-12 items-center gap-3 rounded-full px-6 text-[15px] font-medium transition-colors ${style}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le titre d'un écran, révélé mot à mot. Toujours la même échelle, jamais en gras. */
export function Titre({
  texte,
  clair = false,
  taille = "grand",
  as = "h2",
  className = "",
}: {
  texte: string;
  clair?: boolean;
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
    <TitreRevele
      as={as}
      texte={texte}
      className={`font-normal tracking-[-0.02em] text-balance ${tailles} ${className}`}
      classeAccent={clair ? ACCENT_SOMBRE : ACCENT_CLAIR}
    />
  );
}

/**
 * Le haut de chaque page intérieure : un ciel d'ardoise, une photo qui respire sous un
 * voile, un titre fin. Toutes les pages s'ouvrent sur ce ciel : l'en-tête flottant
 * l'attend sombre.
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
    <section className="relative isolate flex min-h-[64svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo && (
        <>
          <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-60" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,59,76,0.6)_0%,rgba(47,59,76,0.4)_40%,rgba(47,59,76,0.95)_100%)]" />
        </>
      )}
      <div className={`relative mx-auto grid w-full max-w-6xl flex-1 gap-12 px-6 pb-14 pt-36 md:pb-20 ${aside ? "lg:grid-cols-[1fr_1fr] lg:items-end" : "content-end"}`}>
        <div className="space-y-7 self-end">
          <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] font-normal leading-[1] tracking-[-0.02em] text-balance"
            classeAccent={ACCENT_SOMBRE}
          />
          {children && (
            <Apparition delai={400} className="max-w-[26rem] text-lg leading-relaxed">
              {children}
            </Apparition>
          )}
        </div>
        {aside}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : clair, centré, une question et un bouton. */
export function AppelFinal() {
  return (
    <section className="border-t border-[var(--trait)]">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-28 text-center md:py-36">
        <Apparition><Surtitre>Premier rendez-vous, gratuit</Surtitre></Apparition>
        <Titre texte={"Et s'il pleut ? *C'est prévu.*"} />
        <Apparition as="p" delai={150} className="mx-auto max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
          Ta date, tes deux versions, ton devis — le plan B chiffré dedans. Pas de « il a plu,
          c&apos;était parfait » : celle-là, on l&apos;écrira après un vrai mariage sous la pluie.
        </Apparition>
        <Apparition delai={250} className="flex flex-col items-center gap-4">
          <Bouton href={`${DOSSIER}#ma-date`}>Tu te maries quand&nbsp;?</Bouton>
          <p className="text-[15px] text-[var(--doux)]">
            Ou par téléphone : <span className="font-medium tabular-nums text-[var(--encre)]">{entreprise.telephone}</span>
          </p>
        </Apparition>
      </div>
    </section>
  );
}
