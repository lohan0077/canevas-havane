"use client";

import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { useMoment } from "./Moment";
import { DOSSIER, cabinet } from "./donnees";

/** L'onde qui s'éteint : la signature graphique de Voix Basse. */
export function Onde({ className = "h-5 w-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 24" aria-hidden="true" className={className}>
      <path
        d="M2 12 C10 2 18 22 26 12 S42 4 50 12 S64 18 72 12 S84 9 92 12 S104 13 118 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Le croissant de lune du visage du soir. */
export function Croissant({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path d="M20 3.2A13 13 0 1 0 29 22.4 10.4 10.4 0 0 1 20 3.2Z" fill="currentColor" />
    </svg>
  );
}

/** Le nom, et l'onde qui s'éteint à côté. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)]">
        <Onde className="h-3.5 w-6" />
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[24px] leading-none">Voix Basse</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : l'onde, puis le mot. */
export function Surtitre({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">
      <Onde className="h-4 w-12" />
      {children}
    </p>
  );
}

/** Un bouton-lien doux, en pilule ; la flèche avance au survol. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "encre" | "contour" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    encre: "bg-[var(--encre)] text-[var(--fond)]",
    contour: "border border-current/40 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 text-[15px] font-semibold transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** L'état du cabinet, à l'heure du visiteur. */
export function EtatDuCabinet() {
  const { ouvert, rouvre, apercu, moment } = useMoment();
  if (ouvert === null) return <span>Lun. – ven. 8&nbsp;h&nbsp;30 – 19&nbsp;h · sam. 9&nbsp;h – 12&nbsp;h&nbsp;30</span>;
  if (apercu && moment === "soir") return <span>Aperçu du visage du soir · ouvert en ce moment</span>;
  if (apercu && moment === "jour") return <span>Aperçu du visage du jour · fermé en ce moment</span>;
  return ouvert ? <span>Ouvert · jusqu&apos;à 19&nbsp;h, 12&nbsp;h&nbsp;30 le samedi</span> : <span>Fermé · réouverture {rouvre}</span>;
}

/**
 * L'interrupteur jour / soir. Le site bascule seul à la fermeture ; ici, on regarde
 * l'autre visage. `data-film=bascule` sert au tournage de la vidéo.
 */
export function Interrupteur() {
  const { moment, basculer } = useMoment();
  const soir = moment === "soir";
  return (
    <button
      type="button"
      data-film="bascule"
      onClick={basculer}
      aria-pressed={soir}
      aria-label={soir ? "Afficher le site de jour" : "Afficher le site du soir"}
      className="relative flex h-11 w-[86px] shrink-0 items-center justify-between rounded-full border border-[var(--trait)] bg-[var(--fond)] px-2.5"
    >
      <span
        aria-hidden="true"
        className={`absolute top-1 h-[34px] w-[38px] rounded-full bg-[var(--accent)] transition-transform duration-500 ${soir ? "translate-x-[36px]" : "translate-x-[-4px]"}`}
      />
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`relative h-5 w-5 ${soir ? "text-[var(--doux)]" : "text-[var(--sur-accent)]"}`}>
        <circle cx="12" cy="12" r="4.5" fill="currentColor" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d="M12 2.5v2.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 12 12)`} />
        ))}
      </svg>
      <Croissant className={`relative h-5 w-5 ${soir ? "text-[var(--sur-accent)]" : "text-[var(--doux)]"}`} />
    </button>
  );
}

/** La pastille d'état du cabinet, avec l'interrupteur : en haut de l'accueil, toujours. */
export function PastilleEtat() {
  return (
    <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-[var(--trait)] bg-[var(--carte)] py-1 pl-4 pr-1 text-[14px] font-semibold">
      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent-texte)]" />
      <span className="min-w-0">
        <EtatDuCabinet />
      </span>
      <Interrupteur />
    </div>
  );
}

/** Des étoiles fixes (pas de hasard : le serveur et le navigateur doivent s'accorder). */
const ETOILES = [
  [6, 4, 1.5], [18, 2, 1], [31, 6, 1.5], [47, 3, 1], [62, 7, 1.5], [78, 2.5, 1], [90, 5, 1.5],
  [96, 14, 1], [93, 22, 1.5], [97, 31, 1], [4, 18, 1], [10, 30, 1.5],
];

export function Ciel({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {ETOILES.map(([x, y, r]) => (
        <span key={`${x}-${y}`} className="absolute rounded-full bg-[#F3EEE4] opacity-60" style={{ left: `${x}%`, top: `${y}%`, width: r * 2, height: r * 2 }} />
      ))}
    </div>
  );
}

/** Le dernier écran de chaque page, sur le fond vivant vert et lavande. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[#1F332A] text-[#FBF7EF]">
        <FondVivant couleurs={["#1F332A", "#3D5C4D", "#7E6AA3"]} vitesse={0.7} />
        <div className="absolute inset-0 bg-[#1F332A]/50" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:px-10 md:py-32">
          <div className="flex justify-center text-[#D6C8EE]"><Onde className="h-6 w-28" /></div>
          <TitreRevele
            texte="La caisse redevient *juste une caisse.*"
            className="mt-8 text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[#D6C8EE]"
          />
          <Apparition as="p" delai={200} className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#FBF7EF]/90">
            Avant de réserver, une seule question : ton animal est stressé&nbsp;? Si oui, on te
            propose un créneau calme, avant l&apos;ouverture.
          </Apparition>
          <Apparition delai={350} className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex min-h-13 items-center gap-3 rounded-full bg-[#C9B6E4] px-6 py-3 text-[15px] font-semibold text-[#1F332A]">
              Prendre rendez-vous <span aria-hidden="true">→</span>
            </Link>
            <Link href={`${DOSSIER}/pour-rien`} className="inline-flex min-h-13 items-center gap-3 rounded-full border border-[#FBF7EF]/40 px-6 py-3 text-[15px] font-semibold">
              Viens pour rien <span aria-hidden="true">→</span>
            </Link>
          </Apparition>
          <p className="mt-8 text-[15px] text-[#FBF7EF]/90">
            Ou par téléphone : <span className="whitespace-nowrap font-semibold tabular-nums">{cabinet.telephone}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Le haut de chaque page intérieure : grand titre révélé à gauche, et un visuel à
 * droite, sur le fond du moment (jour ou soir).
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  visuel,
  titreBalise = "h1",
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  visuel?: React.ReactNode;
  titreBalise?: "h1" | "p";
}) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_20%,color-mix(in_oklab,var(--accent)_30%,transparent),transparent_70%)]" />
      <div className={`relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40 ${visuel ? "lg:grid-cols-[1.2fr_0.8fr] lg:items-center" : ""}`}>
        <div className="space-y-7">
          <Apparition><Surtitre>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as={titreBalise}
            auChargement
            texte={titre}
            className="max-w-5xl text-[clamp(3.4rem,8.4vw,8rem)] leading-[0.92] tracking-[-0.025em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          {children && (
            <Apparition delai={400} className="max-w-2xl text-xl leading-relaxed text-[var(--doux)]">
              {children}
            </Apparition>
          )}
        </div>
        {visuel && <Apparition de="zoom" delai={250}>{visuel}</Apparition>}
      </div>
    </section>
  );
}
