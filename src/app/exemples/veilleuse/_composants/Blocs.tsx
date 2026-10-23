import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import Marque from "./Marque";
import { DOSSIER, entreprise, type Photo } from "./donnees";

/** La petite lumière dans son croissant, le nom, et « Sécurité privée » (CSI, art. L612-3). */
export function NomMarque() {
  return (
    <span className="flex items-center gap-2.5">
      <Marque taille={34} />
      <span className="leading-none">
        <span className="block whitespace-nowrap font-[family-name:var(--titres)] text-[22px]">Veilleuse</span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.2em]">Sécurité privée</span>
      </span>
    </span>
  );
}

/** L'intitulé au-dessus d'un titre : un point qui luit, des capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.22em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_4px_rgba(244,201,93,0.55)]" />
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule. Plein (lampe), contour, ou nuit (sur fond clair). */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "nuit" }) {
  const style = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)] shadow-[0_0_40px_-6px_rgba(244,201,93,.55)]",
    contour: "border-2 border-current",
    nuit: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center justify-center gap-3 rounded-full px-7 py-3 text-[16px] font-bold transition-transform hover:scale-[1.02] ${style}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * Le haut de chaque page intérieure : la nuit, toujours (l'en-tête flottant l'attend
 * sombre). Une photo qui respire derrière le titre, ou le fond vivant.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  aside,
}: {
  surtitre: string;
  titre: string;
  children?: React.ReactNode;
  photo?: Photo;
  aside?: React.ReactNode;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority className="opacity-60" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,43,36,0.55)_0%,rgba(26,43,36,0.75)_55%,rgba(26,43,36,0.97)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#10201A", "#23382F", "#7A6022"]} vitesse={0.6} />
          <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        </>
      )}
      <div className={`relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-44 ${aside ? "lg:grid-cols-[0.95fr_1.05fr] lg:items-start" : ""}`}>
        <div className="space-y-7">
          <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="max-w-5xl text-[clamp(3.2rem,8vw,7.5rem)] font-normal leading-[0.95] tracking-[-0.02em]"
            classeAccent="text-[var(--accent)]"
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

/** Le dernier écran de chaque page : bonne nuit, sur le fond vivant. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="kit-grain relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#0E1B16", "#23382F", "#8C6A2A"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/40" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>On passe voir, de jour</Surtitre>
            <TitreRevele
              texte="Bonne *nuit.*"
              className="text-[clamp(4rem,12vw,10rem)] font-normal leading-[0.9] tracking-[-0.02em]"
              classeAccent="text-[var(--accent)]"
            />
            <p className="max-w-xl text-xl leading-relaxed">
              La visite est gratuite. Tu nous dis ce qui compte ; on s&apos;occupe du reste, la nuit.
              Et le matin, le rapport.
            </p>
          </div>
          <Apparition delai={200} className="flex flex-col items-start gap-3 lg:items-end">
            <Bouton href={`${DOSSIER}/devis`}>Mon devis en 3 questions</Bouton>
            <Bouton href={`${DOSSIER}/ce-soir`} variante="contour">Qui vient ce soir&nbsp;?</Bouton>
            <p className="pt-2 text-[15px]">
              Ou au téléphone : <span className="font-bold whitespace-nowrap">{entreprise.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
