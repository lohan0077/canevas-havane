import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { ANNEE, DOSSIER, entreprise, gammes, lundi, premiereSemaineLibre, type Chantier, type Gamme, type Photo } from "./donnees";

/** Les classes d'un mot en relief dans un titre : l'italique d'Arvo, en bleu d'eau ou en soleil. */
export const ACCENT_CLAIR = "italic font-normal text-[var(--accent-texte)]";
export const ACCENT_SOMBRE = "italic font-normal text-[var(--accent)]";

/** Le monogramme « 9 » dans son rond, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Monogramme className="h-9 w-9 text-lg" />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[19px] font-bold tracking-[-0.01em]">Neuf Étés</span>
    </span>
  );
}

export function Monogramme({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] font-bold text-[var(--sur-accent)] ${className}`}>
      9
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : une pastille et un soleil. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.14em] ${
        clair ? "border-white/25 text-[var(--sur-sombre)]" : "border-[var(--trait)] bg-[var(--carte)] text-[var(--doux)]"
      }`}
    >
      <Soleil className="h-3.5 w-3.5" />
      {children}
    </p>
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

/** Un bouton-lien en pilule, avec sa flèche qui avance au survol. */
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
    contour: "border-2 border-current/30 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
    sombre: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  }[variante];
  return (
    <Link
      href={href}
      data-film={film}
      className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 font-[family-name:var(--titres)] text-[16px] font-bold transition-transform hover:scale-[1.02] ${styles}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le titre d'une section, révélé mot à mot. */
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
    geant: "text-[clamp(3rem,8vw,7.5rem)] leading-[0.95]",
    grand: "text-[clamp(2.5rem,6vw,5.25rem)] leading-[1]",
    moyen: "text-[clamp(2.1rem,4.4vw,3.75rem)] leading-[1.04]",
  }[taille];
  return (
    <TitreRevele
      as={as}
      texte={texte}
      className={`font-bold tracking-[-0.03em] ${tailles} ${className}`}
      classeAccent={clair ? ACCENT_SOMBRE : ACCENT_CLAIR}
    />
  );
}

/**
 * Le haut de chaque page intérieure : sombre, comme l'accueil (l'en-tête flottant
 * l'attend), une photo qui respire sous un voile bleu nuit, un titre en très grand.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  actions,
  origine,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: Photo;
  actions?: React.ReactNode;
  origine?: string;
}) {
  return (
    <section className="kit-grain relative isolate -mt-3 flex min-h-[78svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,52,70,0.55)_0%,rgba(13,52,70,0.35)_38%,rgba(13,52,70,0.94)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#0D3446", "#176F8C", "#C99A2E"]} />
          <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        </>
      )}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end gap-7 px-5 pb-14 pt-36 sm:px-8 md:pb-20">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as="h1"
          auChargement
          texte={titre}
          className="max-w-5xl text-[clamp(3rem,8.4vw,8rem)] font-bold leading-[0.95] tracking-[-0.035em]"
          classeAccent={ACCENT_SOMBRE}
        />
        {children && (
          <Apparition delai={400} className="max-w-2xl text-xl leading-relaxed text-[var(--sur-sombre)]">
            {children}
          </Apparition>
        )}
        {actions && (
          <Apparition delai={600} className="flex flex-wrap gap-3">
            {actions}
          </Apparition>
        )}
      </div>
    </section>
  );
}

/** Une section de page, bornée et aérée. */
export function Section({
  children,
  id,
  className = "",
  fond = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  fond?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${fond}`}>
      <div className={`mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32 ${className}`}>{children}</div>
    </section>
  );
}

/** La carte d'une coque : sa photo, son nom, ses dimensions, son prix « à partir de ». */
export function CarteGamme({ gamme, grande = false, titre = "h3" }: { gamme: Gamme; grande?: boolean; titre?: "h2" | "h3" }) {
  const Balise = titre;
  return (
    <Link
      href={`${DOSSIER}/piscines#${gamme.id}`}
      className={`group relative flex h-full flex-col justify-end overflow-hidden rounded-[2rem] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] sm:p-7 ${grande ? "min-h-[420px] md:min-h-[560px]" : "min-h-[300px] md:min-h-[268px]"}`}
    >
      <Image
        src={gamme.photo.src}
        alt={gamme.photo.alt}
        fill
        sizes={grande ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
        className="object-cover opacity-75 transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
      />
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,52,70,0)_25%,rgba(13,52,70,0.93)_100%)]" />
      <span className="absolute right-5 top-5 rounded-full bg-[var(--sombre)]/85 px-3 py-1.5 font-[family-name:var(--titres)] text-sm font-bold backdrop-blur">
        Coque {gamme.coque}{" "}m
      </span>
      <span className="relative space-y-1.5">
        <Balise className={`font-bold leading-none tracking-[-0.02em] ${grande ? "text-5xl md:text-6xl" : "text-3xl"}`}>{gamme.nom}</Balise>
        <span className="block text-[15px] text-[var(--sur-sombre)]">Jardin de {gamme.jardin}</span>
        <span className="flex items-center gap-2 pt-2 font-[family-name:var(--titres)] text-[15px] font-bold text-[var(--accent)]">
          À partir de {gamme.apartir}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </span>
    </Link>
  );
}

/** Les quatre coques en « bento » : la plus demandée en grand, les trois autres autour. */
export function GrilleGammes({ titre = "h3" }: { titre?: "h2" | "h3" }) {
  const [petit, classique, famille, grand] = gammes;
  return (
    <ul className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
      <Apparition as="li" de="zoom" className="md:col-span-2 md:row-span-2">
        <CarteGamme gamme={famille} grande titre={titre} />
      </Apparition>
      <Apparition as="li" de="zoom" delai={120} className="md:col-span-2">
        <CarteGamme gamme={grand} titre={titre} />
      </Apparition>
      <Apparition as="li" de="zoom" delai={220}>
        <CarteGamme gamme={classique} titre={titre} />
      </Apparition>
      <Apparition as="li" de="zoom" delai={320}>
        <CarteGamme gamme={petit} titre={titre} />
      </Apparition>
    </ul>
  );
}

/** La carte d'un chantier : sa photo, son numéro, son lieu, sa durée. */
export function CarteChantier({ chantier, titre = "h3" }: { chantier: Chantier; titre?: "h2" | "h3" }) {
  const Balise = titre;
  return (
    <Link
      href={`${DOSSIER}/chantiers/${chantier.slug}`}
      data-chantier={chantier.slug}
      className="group block h-full overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] transition-shadow hover:shadow-[0_30px_60px_-36px_rgba(18,68,90,0.55)]"
    >
      <span className="relative block aspect-[4/3] overflow-hidden">
        <Image src={chantier.photo.src} alt={chantier.photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]" />
        <span className="absolute left-4 top-4 rounded-full bg-[var(--carte)] px-3 py-1.5 font-[family-name:var(--titres)] text-sm font-bold text-[var(--encre)]">
          Chantier n° {chantier.numero}
        </span>
      </span>
      <span className="block space-y-2 p-6">
        <span className="flex items-center justify-between gap-3 text-[15px] text-[var(--doux)]">
          <span>{chantier.lieu}</span>
          <span className="whitespace-nowrap font-[family-name:var(--titres)] font-bold">{chantier.duree}</span>
        </span>
        <Balise className="text-[1.75rem] font-bold leading-tight tracking-[-0.02em]">{chantier.titre}</Balise>
        <span className="flex items-center gap-2 pt-1 font-[family-name:var(--titres)] text-[15px] font-bold text-[var(--accent-texte)]">
          Le chantier, filmé jour par jour
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </span>
    </Link>
  );
}

/** Le dernier écran de chaque page : la prochaine semaine libre, sur le fond animé de la marque. */
export function AppelFinal() {
  const date = lundi(ANNEE, premiereSemaineLibre).toLocaleDateString("fr-FR", { day: "numeric", month: "long", timeZone: "UTC" });
  return (
    <section className="px-3 pb-3 pt-6 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#0D3446", "#176F8C", "#E0A92C"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Saison {ANNEE}</Surtitre>
            <TitreRevele
              texte={`Prochaine semaine libre : *semaine ${premiereSemaineLibre}.*`}
              className="text-[clamp(2.8rem,7vw,6.25rem)] font-bold leading-[0.95] tracking-[-0.035em]"
              classeAccent={ACCENT_SOMBRE}
            />
            <p className="max-w-xl text-lg leading-relaxed">
              À partir du {date}. Les semaines de printemps partent les premières : ce sont
              celles qui mènent au premier dimanche de juillet.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/ma-date`}>Choisir ma semaine</Bouton>
            <p className="text-[15px]">
              Ou par téléphone : <span className="font-bold tabular-nums">{entreprise.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
