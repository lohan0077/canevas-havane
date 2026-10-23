import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import Logo from "./Logo";
import { DOSSIER, maison } from "./donnees";

/** L'assiette au 7, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Logo taille={34} />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[19px] italic tracking-[-0.01em]">Sept Mille Dîners</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : un filet, puis les capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.24em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className={`h-px w-10 ${clair ? "bg-[var(--sur-sombre)]/60" : "bg-[var(--accent)]"}`} />
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule ; la flèche avance au survol. */
export function Bouton({ href, children, variante = "plein", className = "" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair"; className?: string }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/35 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-7 py-3 text-[16px] font-semibold transition-transform hover:scale-[1.02] ${styles} ${className}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * Une fenêtre d'application : la barre du haut (trois points, l'adresse, l'étape), et
 * l'outil dedans. C'est ainsi que les deux outils du site sont mis en scène.
 */
export function Appli({ adresse, etape, children, className = "", id }: { adresse: string; etape: string; children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`overflow-hidden rounded-[1.75rem] border border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] shadow-[0_40px_90px_-45px_rgba(36,31,27,0.65)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-[var(--trait)] bg-[var(--fond)] px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#D9A35B]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#5B6B4E]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-[var(--carte)] px-3 py-1 text-center text-[13px] text-[var(--doux)]">{adresse}</span>
        <span className="hidden text-[13px] font-semibold text-[var(--doux)] sm:inline">{etape}</span>
      </div>
      <div className="p-4 sm:p-7">{children}</div>
    </div>
  );
}

/**
 * Le haut de chaque page intérieure : une photo qui respire sous un voile brun, le titre
 * en très grand, et une arche (la forme de la marque) qui découpe le bas.
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
  photo: { src: string; alt: string };
  origine?: string;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,31,27,0.55)_0%,rgba(36,31,27,0.72)_55%,rgba(36,31,27,0.96)_100%)]" />
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-20 pt-40 sm:px-8 md:pb-28 md:pt-52">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as="h1"
          auChargement
          texte={titre}
          className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3.3rem,8.5vw,8rem)] leading-[0.92] tracking-[-0.035em]"
          classeAccent="italic text-[#F0B49B]"
        />
        {children && (
          <Apparition delai={400} className="max-w-2xl text-xl leading-relaxed text-[var(--sur-sombre)]/90">
            {children}
          </Apparition>
        )}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : sur le fond vivant, aux couleurs d'une table le soir. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#241F1B", "#5A2C20", "#8C6A3A"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Le premier, c&apos;est nous</Surtitre>
            <TitreRevele
              texte={"Les 7\u00a0299 autres *sont à toi.*"}
              className="font-[family-name:var(--titres)] text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[-0.035em] [font-variant-numeric:lining-nums]"
              classeAccent="italic text-[#F0B49B]"
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Trois questions sur ta vie, la longueur de tes murs, et Mathieu vient prendre les cotes.
              Le soir de la pose, on cuisine le premier dîner.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/tes-murs#cotes`}>Réserver la prise de cotes</Bouton>
            <Bouton href={`${DOSSIER}/ta-vie`} variante="contour">Trois questions sur ma vie</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/90">
              Ou par téléphone : <span className="font-semibold lining-nums tabular-nums">{maison.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
