import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, STATUT, cabinet, type Photo } from "./donnees";

/** L'emblème : un cadran rond, « 12 » en haut, l'aiguille sur midi. */
export function Embleme({ taille = 40, clair = false }: { taille?: number; clair?: boolean }) {
  const trait = clair ? "#FBF5EA" : "#2F4A3A";
  return (
    <svg viewBox="0 0 48 48" width={taille} height={taille} aria-hidden="true" className="shrink-0">
      <circle cx="24" cy="24" r="22" fill="none" stroke={trait} strokeWidth="1.6" />
      <circle cx="24" cy="24" r="18.5" fill="none" stroke={trait} strokeWidth="0.7" />
      <text x="24" y="17" textAnchor="middle" fontSize="9.5" fontFamily="var(--titres)" fill={trait}>12</text>
      <path d="M24 34V22" stroke="#B5523B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="34" r="1.8" fill="#B5523B" />
    </svg>
  );
}

/** L'emblème et le nom, pour l'en-tête. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Embleme taille={36} />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[25px] leading-none tracking-[-0.01em]">Dimanche Midi</span>
    </span>
  );
}

/**
 * En haut de chaque page, avant la navigation : le statut, écrit juste. Jamais « agréé
 * AMF » : « adhérent d'une association agréée par l'AMF » (position AMF DOC-2006-23,
 * q. 4.6), avec l'autre statut et l'ORIAS.
 */
export function BarreStatut() {
  return (
    <p data-film="statut" className="bg-[var(--sombre)] px-4 py-2 text-center text-[12px] leading-snug text-[#E9DDC2] sm:px-6">
      <span className="text-[var(--sur-sombre)]">{STATUT}</span> · Courtier en assurance · ORIAS n°&nbsp;{cabinet.orias} (exemple)
    </p>
  );
}

/** Le petit intitulé au-dessus d'un titre : un point terre cuite, des capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.24em] ${clair ? "text-[#E3C374]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${clair ? "bg-[#E3C374]" : "bg-[#B5523B]"}`} />
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "vert" | "contour" | "clair" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    vert: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
    contour: "border border-current/40 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[#FBF5EA] text-[#22382C]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 text-[16px] font-semibold transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Classes des grands titres : Instrument Serif, l'italique en terre cuite. */
export const TITRE = "font-normal leading-[0.92] tracking-[-0.025em]";
export const ACCENT = "italic text-[var(--accent-texte)]";
export const ACCENT_CLAIR = "italic text-[#E3C374]";

/**
 * Le haut de chaque page intérieure : moitié texte, moitié photo qui respire (partagé en
 * deux, comme l'accueil). Le titre est très grand et révélé à l'arrivée.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  origine,
}: {
  surtitre: string;
  titre: string;
  children?: React.ReactNode;
  photo: Photo;
  origine?: string;
}) {
  return (
    <section className="grid grid-cols-1 min-h-[78svh] lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex flex-col justify-end gap-7 px-5 pb-14 pt-32 sm:px-10 md:pb-20 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2rem))]">
        <Apparition><Surtitre>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as="h1"
          auChargement
          texte={titre}
          className={`max-w-3xl text-[clamp(3.4rem,8vw,7.6rem)] ${TITRE}`}
          classeAccent={ACCENT}
        />
        {children && (
          <Apparition delai={350} className="max-w-xl text-[19px] leading-relaxed text-[var(--doux)]">
            {children}
          </Apparition>
        )}
      </div>
      <div className="relative min-h-[42svh] overflow-hidden bg-[var(--sombre)] lg:min-h-0 lg:rounded-bl-[3rem]">
        <PhotoCinema src={photo.src} alt={photo.alt} priority sizes="(min-width: 1024px) 45vw, 100vw" origine={origine} />
      </div>
    </section>
  );
}

/** L'affiche de lancement, en vrai : la question, la signature, les mentions lisibles. */
export function Affiche({ className = "" }: { className?: string }) {
  return (
    <figure data-film="affiche" className={`border border-[#E6DCC6] bg-[#FBF5EA] p-7 shadow-[0_50px_80px_-40px_rgba(34,56,44,0.75)] sm:p-10 ${className}`}>
      <Embleme taille={54} />
      <p className="mt-6 font-[family-name:var(--titres)] text-[44px] leading-[1.02] text-[#2F4A3A] sm:text-[52px]">
        Tes enfants savent où est ton <em className="text-[#A3442E]">assurance vie&nbsp;?</em>
      </p>
      <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#2F4A3A]">Dimanche Midi · conseil en patrimoine</p>
      <p className="mt-5 border-t border-[#E6DCC6] pt-4 text-[11px] leading-relaxed text-[#55604F]">
        {cabinet.nom}, {cabinet.adresse} · {STATUT} · Courtier en assurance · ORIAS n°&nbsp;{cabinet.orias} (exemple)
      </p>
      <figcaption className="sr-only">L&apos;affiche de lancement de Dimanche Midi, avec ses mentions</figcaption>
    </figure>
  );
}

/** Le cadre d'un téléphone, pour montrer un outil comme une application. */
export function Telephone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[400px] rounded-[3rem] border-[10px] border-[#22382C] bg-[#22382C] shadow-[0_60px_100px_-50px_rgba(34,56,44,0.8)] ${className}`}>
      <span aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#22382C]" />
      <div className="overflow-hidden rounded-[2.3rem] bg-[var(--fond)] pt-6">{children}</div>
    </div>
  );
}

/** Le lien du bas des pages : rendez-vous, pris par la famille. */
export function VersRendezVous() {
  return (
    <section data-film="en-parler" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-8 px-6 py-16 sm:px-10 md:py-20">
          <p className="max-w-3xl font-[family-name:var(--titres)] text-[clamp(2.4rem,5vw,4.2rem)] leading-[1]">
            Et si tu veux en parler, <em className="text-[#E3C374]">c&apos;est toi qui prends rendez-vous.</em>
          </p>
          <Bouton href={`${DOSSIER}#rendez-vous`} variante="clair">Prendre rendez-vous</Bouton>
        </div>
      </div>
    </section>
  );
}
