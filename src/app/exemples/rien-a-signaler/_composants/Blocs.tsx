import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import Logo from "./Logo";
import { DOSSIER, maison } from "./donnees";

/** L'accent des titres : l'italique d'Instrument Serif, en sauge sur fond sombre. */
export const ACCENT_SOMBRE = "font-[family-name:var(--f-instrument)] italic font-normal tracking-[-0.01em] text-[#A9D3AE]";
export const ACCENT_CLAIR = "font-[family-name:var(--f-instrument)] italic font-normal tracking-[-0.01em] text-[var(--accent-texte)]";

/** La coche, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Logo taille={34} />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[17px] font-semibold tracking-[-0.02em]">Rien à Signaler</span>
    </span>
  );
}

/** Le petit intitulé : un point sauge qui clignote doucement, comme un voyant « tout va bien ». */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2.5 font-[family-name:var(--titres)] text-[13px] font-medium uppercase tracking-[0.18em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      <span aria-hidden="true" className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-60 motion-reduce:animate-none" />
        <span className="relative h-2 w-2 rounded-full bg-[var(--accent)]" />
      </span>
      {children}
    </p>
  );
}

/** Un bouton-lien : un rectangle aux angles doux, la flèche avance au survol. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair" | "nuit" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
    nuit: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-2xl px-6 py-3 font-[family-name:var(--titres)] text-[16px] font-semibold transition-transform hover:-translate-y-0.5 ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * Le cadre d'une application : la barre du haut, sombre, avec le voyant « en ligne » et
 * le nom de l'écran. Les deux outils de l'accueil y sont posés comme sur un téléphone.
 */
export function Appli({ titre, etat, children, className = "" }: { titre: string; etat: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[1.75rem] border border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] shadow-[0_40px_90px_-45px_rgba(16,26,49,0.7)] ${className}`}>
      <div className="flex items-center justify-between gap-3 bg-[var(--sombre)] px-5 py-3.5 text-[var(--sur-sombre)]">
        <span className="flex items-center gap-2.5 font-[family-name:var(--titres)] text-[15px] font-semibold">
          <Logo taille={22} />
          {titre}
        </span>
        <span className="flex items-center gap-2 text-[13px]">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          {etat}
        </span>
      </div>
      <div className="p-4 sm:p-7">{children}</div>
    </div>
  );
}

/** Le haut de chaque page intérieure : la nuit, une photo qui respire, un titre très grand. */
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
  photo?: { src: string; alt: string };
  origine?: string;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,26,49,0.6)_0%,rgba(16,26,49,0.75)_55%,rgba(16,26,49,0.96)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#0E1730", "#1E3A5F", "#2F5A4A"]} vitesse={0.6} />
          <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-20 pt-36 sm:px-8 md:pb-28 md:pt-48">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as="h1"
          auChargement
          texte={titre}
          className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3rem,7.5vw,7rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
          classeAccent={ACCENT_SOMBRE}
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

/** Le dernier écran de chaque page : la nuit qui bouge, et le message qu'on aime lire. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#0E1730", "#24466B", "#4F8A68"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/40" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Pas de nouvelles</Surtitre>
            <TitreRevele
              texte="Bonnes *nouvelles.*"
              className="font-[family-name:var(--titres)] text-[clamp(3.2rem,9vw,8rem)] font-semibold leading-[0.9] tracking-[-0.055em]"
              classeAccent={ACCENT_SOMBRE}
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Une alarme qui ne vend pas la peur, une clim qui vend la première nuit où tu dors en août.
              Et le dimanche matin, un seul message.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/ma-date`}>Réserver ma date de pose</Bouton>
            <Bouton href={`${DOSSIER}/mon-alarme`} variante="contour">Composer mon alarme</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/90">
              Ou par téléphone : <span className="font-semibold tabular-nums">{maison.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
