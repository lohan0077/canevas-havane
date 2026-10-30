import Image from "next/image";
import Link from "next/link";
import { ANNEE, DOSSIER, entreprise, lundi, premiereSemaineLibre, type Chantier, type Photo } from "./donnees";

/** Le monogramme « 9 » dans son rond, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Monogramme className="h-9 w-9 text-lg" />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[19px] font-normal tracking-[-0.01em]">Neuf Étés</span>
    </span>
  );
}

export function Monogramme({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] font-normal text-[var(--sur-accent)] ${className}`}>
      9
    </span>
  );
}

/** Un petit soleil : le rond jaune et ses rayons. Purement décoratif. */
export function Soleil({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`}>
      <circle cx="12" cy="12" r="5.5" fill="#F6C445" />
      <g stroke="#F6C445" strokeWidth="2.2" strokeLinecap="round">
        <path d="M12 1.8v2.6M12 19.6v2.6M1.8 12h2.6M19.6 12h2.6M4.8 4.8l1.8 1.8M17.4 17.4l1.8 1.8M4.8 19.2l1.8-1.8M17.4 6.6l1.8-1.8" />
      </g>
    </svg>
  );
}

/** Une ligne d'eau : la vague qui sépare deux bandes. Décorative. */
export function Vague({ couleur, className = "" }: { couleur: string; className?: string }) {
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" className={`block h-8 w-full md:h-14 ${className}`}>
      <path d="M0 34c120-26 240-26 360 0s240 26 360 0 240-26 360 0 240 26 360 0V60H0z" fill={couleur} />
    </svg>
  );
}

/** Un bouton-lien en pilule. Son libellé dit ce qui se passe : un verbe, pas de flèche. */
export function Bouton({
  href,
  children,
  variante = "plein",
  film,
}: {
  href: string;
  children: React.ReactNode;
  variante?: "plein" | "contour" | "clair" | "sombre";
  film?: string;
}) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
    sombre: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  }[variante];
  return (
    <Link
      href={href}
      data-film={film}
      className={`inline-flex h-12 items-center rounded-full px-6 text-[15px] font-medium transition-colors ${styles}`}
    >
      {children}
    </Link>
  );
}

/**
 * Le titre d'une section : un seul tenant, en Fraunces romain. Aucun mot mis en
 * relief, aucune révélation mot à mot ; c'est la taille qui fait la hiérarchie.
 */
export function Titre({
  texte,
  taille = "grand",
  as = "h2",
  className = "",
}: {
  texte: string;
  taille?: "geant" | "grand" | "moyen";
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  const tailles = {
    geant: "text-[clamp(2.75rem,6vw,5.25rem)] leading-[1]",
    grand: "text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05]",
    moyen: "text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.1]",
  }[taille];
  const Balise = as;
  return <Balise className={`font-normal tracking-[-0.02em] text-balance ${tailles} ${className}`}>{texte}</Balise>;
}

/**
 * Le haut de chaque page intérieure : sombre, comme l'accueil (l'en-tête flottant
 * l'attend), une photo fixe sous un voile bleu nuit, un titre en très grand. Le seul
 * moment animé du site reste la piscine de l'accueil : ici, rien ne bouge seul.
 */
export function EnTetePage({
  titre,
  children,
  photo,
  actions,
  origine,
}: {
  titre: string;
  children?: React.ReactNode;
  photo?: Photo;
  actions?: React.ReactNode;
  origine?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[64svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <Image src={photo.src} alt="" fill priority sizes="100vw" className="object-cover opacity-70" style={{ objectPosition: origine }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,52,70,0.55)_0%,rgba(13,52,70,0.35)_38%,rgba(13,52,70,0.94)_100%)]" />
        </>
      ) : (
        // Sans photo : la lumière d'un bassin le soir, peinte une fois pour toutes.
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(110%_80%_at_88%_0%,rgba(23,111,140,0.85)_0%,transparent_60%),radial-gradient(80%_60%_at_0%_100%,rgba(201,154,46,0.3)_0%,transparent_65%)]"
        />
      )}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end gap-7 px-5 pb-14 pt-36 sm:px-8 md:pb-20">
        <h1 className="max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] font-normal leading-[1] tracking-[-0.02em] text-balance">{titre}</h1>
        {children && <div className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">{children}</div>}
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}

/** La carte d'un chantier : sa photo, son numéro, son lieu, sa durée. */
export function CarteChantier({ chantier, titre = "h3" }: { chantier: Chantier; titre?: "h2" | "h3" }) {
  const Balise = titre;
  return (
    <Link
      href={`${DOSSIER}/chantiers/${chantier.slug}`}
      data-chantier={chantier.slug}
      className="group block h-full overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)]"
    >
      <span className="relative block aspect-[4/3] overflow-hidden">
        <Image src={chantier.photo.src} alt={chantier.photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-[var(--carte)] px-3 py-1.5 font-[family-name:var(--titres)] text-sm font-normal text-[var(--encre)]">
          Chantier n° {chantier.numero}
        </span>
      </span>
      <span className="block space-y-2 p-6">
        <span className="flex items-center justify-between gap-3 text-[15px] text-[var(--doux)]">
          <span>{chantier.lieu}</span>
          <span className="whitespace-nowrap font-[family-name:var(--titres)] font-normal">{chantier.duree}</span>
        </span>
        <Balise className="text-[1.75rem] font-bold leading-tight tracking-[-0.02em]">{chantier.titre}</Balise>
        <span className="block pt-1 font-[family-name:var(--titres)] text-[15px] font-normal text-[var(--accent-texte)] underline decoration-1 underline-offset-4 group-hover:decoration-2">
          Voir le film du chantier
        </span>
      </span>
    </Link>
  );
}

/** Le dernier écran de chaque page : la prochaine semaine libre. */
export function AppelFinal() {
  const date = lundi(ANNEE, premiereSemaineLibre).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <section className="border-t border-[var(--trait)]">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-28 text-center md:py-36">
        <h2 className="text-[clamp(2.25rem,4.4vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.02em] text-balance">
          Prochaine semaine libre&nbsp;: semaine {premiereSemaineLibre}.
        </h2>
        <p className="mx-auto max-w-lg text-lg leading-relaxed text-[var(--doux)]">
          À partir du {date}. Les semaines de printemps partent les premières : ce sont
          celles qui mènent au premier dimanche de juillet.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Bouton href={`${DOSSIER}/ma-date`}>Choisir ma semaine</Bouton>
          <p className="text-[15px] text-[var(--doux)]">
            Ou par téléphone : <span className="font-medium tabular-nums text-[var(--encre)]">{entreprise.telephone}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
