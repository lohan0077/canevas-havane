import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, boutique } from "./donnees";

// La langue visuelle de Gâteaux Perdus : la cuisine de quelqu'un. Un grand romain gras
// (DM Serif), l'écriture à la main des fiches (Caveat), du papier ligné, du ruban
// adhésif sur les photos, des pilules couleur beurre et rose dragée.

/** Le monogramme « GP » sur une étiquette de bocal, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-11 place-items-center rounded-[10px] border border-current font-[family-name:var(--titres)] text-[15px] leading-none">
        GP
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[20px] leading-none">Gâteaux Perdus</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : écrit à la main, souligné d'un trait. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`inline-block -rotate-2 font-[family-name:var(--f-caveat)] text-[26px] leading-none ${clair ? "text-[#F3D88A]" : "text-[var(--accent-texte)]"}`}>
      {children}
      <svg aria-hidden="true" viewBox="0 0 120 8" preserveAspectRatio="none" className="mt-1 block h-2 w-full">
        <path d="M2 5 C 30 1, 60 8, 118 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </p>
  );
}

/** Un bouton-lien en pilule. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "beurre" | "contour" }) {
  const styles = {
    plein: "bg-[var(--encre)] text-[var(--fond)]",
    beurre: "bg-[#F3D88A] text-[var(--encre)]",
    contour: "border-2 border-current",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-7 py-3 text-[16px] font-bold transition-transform hover:-rotate-1 hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Un morceau de ruban adhésif, posé sur le coin d'une photo ou d'une fiche. */
export function Ruban({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`absolute z-10 h-7 w-24 bg-[#F3D88A]/80 shadow-[0_1px_2px_rgba(61,29,19,0.2)] ${className}`} />;
}

/**
 * Le haut de chaque page intérieure : clair, en deux moitiés — le titre à gauche, une
 * photo qui respire à droite, tenue par un ruban.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  origine,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo: { src: string };
  origine?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-7">
          <Apparition><Surtitre>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="max-w-4xl text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          {children && (
            <Apparition delai={400} className="max-w-xl text-xl leading-relaxed text-[var(--doux)]">
              {children}
            </Apparition>
          )}
        </div>
        <Apparition de="zoom" delai={200} className="relative mx-auto w-full max-w-md">
          <Ruban className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
          <div className="relative aspect-[4/5] rotate-2 overflow-hidden rounded-[1.75rem] bg-[var(--sombre)] shadow-[0_40px_80px_-40px_rgba(61,29,19,0.7)]">
            <PhotoCinema src={photo.src} alt="" priority origine={origine} sizes="(min-width: 1024px) 420px, 90vw" />
          </div>
        </Apparition>
      </div>
    </section>
  );
}

/** Le dernier écran : l'affiche du lancement, sur le fond animé de la pâtisserie. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#3D1D13", "#7A3E2A", "#C98A6E"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>L&apos;affiche du quartier</Surtitre>
            <TitreRevele
              texte={"Le gâteau de ta grand\u2011mère. *Encore une fois.*"}
              className="text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[#F3D88A]"
            />
            <p className="max-w-xl text-lg leading-relaxed">
              Une photo de sa fiche suffit. Même tachée. Le pâtissier t&apos;appelle, il la refait, et
              c&apos;est toi qui goûtes en premier.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}#envoyer`} variante="beurre">Envoie-nous sa recette</Bouton>
            <p className="text-[15px]">
              Ou par téléphone : <span className="font-bold tabular-nums">{boutique.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
