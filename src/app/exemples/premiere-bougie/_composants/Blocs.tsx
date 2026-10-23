import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import Bougie from "./Bougie";
import { DOSSIER, cabinet } from "./donnees";

/** Le monogramme : un « 1 » dans un rond couleur de flamme, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-[20px] text-[var(--sur-accent)] shadow-[0_0_18px_rgba(242,193,78,0.55)]">
        1
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] tracking-[-0.01em]">Première Bougie</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : une flamme, puis le texte. */
export function Surtitre({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.18em] ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 12 18" className="h-[18px] w-3 shrink-0">
        <path d="M6 1 Q11 8 9 12 Q6 16 3 12 Q1 8 6 1 Z" fill="#F2A33C" />
        <path d="M6 6 Q8 9 7.2 11 Q6 12.5 4.8 11 Q4 9 6 6 Z" fill="#FFE08A" />
      </svg>
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
    plein: "bg-[var(--accent)] text-[var(--sur-accent)] shadow-[0_10px_30px_-10px_rgba(242,193,78,0.7)]",
    sombre: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
    contour: "border-2 border-current/30 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 text-[16px] font-bold transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le haut de chaque page intérieure : la nuit, le fond animé couleur de flamme, une bougie. */
export function EnTetePage({
  surtitre,
  titre,
  children,
  apres,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  apres?: React.ReactNode;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <FondVivant couleurs={["#1B1B30", "#2E2E52", "#7A4A24"]} vitesse={0.7} />
      <div className="absolute inset-0 bg-[var(--sombre)]/55" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-44 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-7">
          <Apparition>
            <Surtitre>{surtitre}</Surtitre>
          </Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3rem,7vw,6.6rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent)]"
          />
          {children && (
            <Apparition delai={400} className="max-w-2xl text-[19px] leading-relaxed">
              {children}
            </Apparition>
          )}
          {apres}
        </div>
        <Apparition de="zoom" delai={300} className="hidden lg:block">
          <span aria-hidden="true" className="relative grid h-56 w-40 place-items-end">
            <span className="absolute left-1/2 top-2 h-28 w-28 -translate-x-1/2 rounded-full bg-[#F2C14E] opacity-25 blur-2xl" />
            <Bougie allumee className="relative h-52 w-24" />
          </span>
        </Apparition>
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : vingt minutes, sur le fond animé. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#1B1B30", "#33335C", "#9C5A26"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre>Un poste vide&nbsp;?</Surtitre>
            <TitreRevele
              texte="Vingt minutes. *Puis on compte jusqu'à 365.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.8rem,7vw,6.2rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent)]"
            />
            <p className="max-w-xl text-lg leading-relaxed">
              Vingt minutes au téléphone pour définir le poste. Les honoraires te sont envoyés par écrit,
              ligne par ligne, avant de signer quoi que ce soit.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}#vingt-minutes`}>Réserver 20 minutes</Bouton>
            <p className="text-[15px]">
              Ou par téléphone : <span className="font-bold tabular-nums">{cabinet.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
