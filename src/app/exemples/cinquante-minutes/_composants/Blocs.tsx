import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, cabinet } from "./donnees";

/** Les trois couleurs du fond vivant : la nuit prune, un violet sourd, le caramel. */
export const FOND_NUIT: [string, string, string] = ["#2A1830", "#4B2D52", "#8C6244"];

/** Le monogramme « 50 » dans un cercle fin, le nom, et le titre dessous. */
export function Marque() {
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full border border-current font-[family-name:var(--titres)] text-[17px] italic">
        50
      </span>
      <span className="leading-none">
        <span className="block whitespace-nowrap font-[family-name:var(--titres)] text-[18px]">Cinquante Minutes</span>
        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.3em]">Psychologue</span>
      </span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : un filet, puis le mot espacé. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.28em] ${clair ? "text-[var(--accent)]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
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
  variante?: "plein" | "contour" | "clair" | "encre";
}) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/40 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
    encre: "bg-[var(--encre)] text-[var(--fond)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-7 py-3 text-[15px] font-semibold tracking-[0.01em] transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * La plaque du cabinet : le nom de la marque en petit, le titre protégé en grand.
 * « Psychologue » est un titre réservé par la loi : c'est lui qu'on lit d'abord.
 */
export function Plaque() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] rounded-[10px] bg-[linear-gradient(145deg,#D9BA94,#C9A27E_45%,#B88D63)] px-6 py-12 text-center text-[#2A1830] shadow-[0_40px_80px_-30px_rgba(42,24,48,0.75)]" data-film="plaque">
      {[["left-3", "top-3"], ["right-3", "top-3"], ["left-3", "bottom-3"], ["right-3", "bottom-3"]].map(([x, y]) => (
        <span key={x + y} aria-hidden="true" className={`absolute ${x} ${y} h-2.5 w-2.5 rounded-full bg-[#8E6A47]`} />
      ))}
      <p className="font-[family-name:var(--titres)] text-lg italic">Cinquante Minutes</p>
      <p className="mt-2 font-[family-name:var(--titres)] text-[clamp(30px,9.6vw,58px)] uppercase leading-none tracking-[0.02em]">Psychologue</p>
      <p className="mt-4 text-sm">{cabinet.psychologue} · sur rendez-vous</p>
    </div>
  );
}

/** Le dernier écran de chaque page, sur la nuit qui bouge. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="kit-grain relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={FOND_NUIT} vitesse={0.8} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:px-10 md:py-36">
          <Apparition className="flex justify-center"><Surtitre clair>Prendre rendez-vous</Surtitre></Apparition>
          <TitreRevele
            texte="La porte, *moins lourde.*"
            className="mt-8 text-[clamp(3.2rem,9vw,8rem)] font-normal leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent)]"
          />
          <Apparition as="p" delai={200} className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
            Trois clics, à l&apos;heure qui vous va, même à minuit. On ne vous demande pas pourquoi
            vous venez : vous le direz en séance.
          </Apparition>
          <Apparition delai={350} className="mt-10 flex flex-wrap justify-center gap-3">
            <Bouton href={`${DOSSIER}/rendez-vous`}>Choisir un créneau</Bouton>
            <Bouton href={`${DOSSIER}/premiere-seance`} variante="contour">La première séance</Bouton>
          </Apparition>
          <p className="mt-8 text-[15px] text-[var(--sur-sombre)]/85">
            Ou par téléphone : <span className="whitespace-nowrap font-semibold tabular-nums">{cabinet.telephone}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Le haut de chaque page intérieure : la nuit prune (l'en-tête flottant l'attend), avec
 * une photo qui respire dans une arche, ou le fond vivant seul.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  titreBalise = "h1",
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  titreBalise?: "h1" | "p";
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <FondVivant couleurs={FOND_NUIT} vitesse={0.6} />
      <div className="absolute inset-0 bg-[var(--sombre)]/55" />
      <div className={`relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-44 ${photo ? "lg:grid-cols-[1.25fr_0.75fr] lg:items-end" : ""}`}>
        <div className="space-y-7">
          <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as={titreBalise}
            auChargement
            texte={titre}
            className="max-w-5xl text-[clamp(3rem,7.5vw,7rem)] font-normal leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent)]"
          />
          {children && (
            <Apparition delai={400} className="max-w-2xl text-xl leading-relaxed text-[var(--sur-sombre)]/90">
              {children}
            </Apparition>
          )}
        </div>
        {photo && (
          <Apparition de="rideau" delai={200} className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-t-[999px] rounded-b-[10px] border border-[var(--accent)]/40">
            <PhotoCinema src={photo.src} alt={photo.alt} priority sizes="320px" />
          </Apparition>
        )}
      </div>
    </section>
  );
}
