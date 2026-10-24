import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { ANNEE, CONTACT, DOSSIER, MOIS, NIVEAUX, SAISONS, type Photo } from "./donnees";

/** Les classes d'un mot en relief dans un titre : l'italique de Lora, en terre cuite ou en paille. */
export const ACCENT_CLAIR = "font-[family-name:var(--texte)] italic font-normal text-[var(--accent-texte)]";
export const ACCENT_SOMBRE = "font-[family-name:var(--texte)] italic font-normal text-[var(--accent)]";

export const euros = (n: number) => `${n.toLocaleString("fr-FR")} €`;

/** Le monogramme « 8 », comme la marque de la vidéo. */
export function Huit({ className = "h-9 w-9 text-[17px]" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] font-black text-[var(--sur-accent)] ${className}`}>
      8
    </span>
  );
}

/** Le monogramme et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Huit />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[19px] font-extrabold tracking-[-0.02em]">Vert en Août</span>
    </span>
  );
}

/** Une note au crayon de l'atelier. */
export function Note({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-[family-name:var(--f-caveat)] text-[26px] leading-none ${className}`}>{children}</span>;
}

/** Le petit intitulé au-dessus d'un titre : une feuille, puis le texte. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.14em] ${
        clair ? "border-white/25 text-[var(--sur-sombre)]" : "border-[var(--trait)] bg-[var(--carte)] text-[var(--doux)]"
      }`}
    >
      <Feuille className="h-3.5 w-3.5" />
      {children}
    </p>
  );
}

/** Une feuille d'olivier, décorative. */
export function Feuille({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M3 21C6 11 12 4 21 3c-1 9-8 15-18 18z" fill="#E0B85C" />
      <path d="M3 21C9 15 13 11 18 6" stroke="#22341F" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Un bouton-lien en pilule, avec sa flèche qui avance au survol. */
export function Bouton({
  href,
  children,
  variante = "plein",
}: {
  href: string;
  children: React.ReactNode;
  variante?: "plein" | "contour" | "clair" | "sombre";
}) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border-2 border-current/35 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
    sombre: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 font-[family-name:var(--titres)] text-[16px] font-bold transition-transform hover:scale-[1.02] ${styles}`}>
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
    geant: "text-[clamp(3rem,8vw,7.25rem)] leading-[0.94]",
    grand: "text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.98]",
    moyen: "text-[clamp(2.1rem,4.4vw,3.75rem)] leading-[1.02]",
  }[taille];
  return (
    <TitreRevele
      as={as}
      texte={texte}
      className={`font-extrabold tracking-[-0.035em] ${tailles} ${className}`}
      classeAccent={clair ? ACCENT_SOMBRE : ACCENT_CLAIR}
    />
  );
}

/** Une photo dans une arche : la porte d'un jardin, ou une fenêtre cintrée. */
export function Arche({ photo, className = "", sizes, priority = false, respire = false }: { photo: Photo; className?: string; sizes: string; priority?: boolean; respire?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-[var(--sombre)] ${className}`}>
      {respire ? (
        <PhotoCinema src={photo.src} alt={photo.alt} sizes={sizes} priority={priority} />
      ) : (
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      )}
    </div>
  );
}

/**
 * Le haut de chaque page intérieure : sombre, comme l'accueil (l'en-tête flottant
 * l'attend), une photo qui respire sous un voile vert, ou le fond vivant de la marque.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  actions,
  note,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: Photo;
  actions?: React.ReactNode;
  note?: string;
}) {
  return (
    <section className="kit-grain relative isolate flex min-h-[74svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority className="opacity-65" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,52,31,0.6)_0%,rgba(34,52,31,0.42)_40%,rgba(34,52,31,0.95)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#22341F", "#4E6A3A", "#B98A3A"]} />
          <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        </>
      )}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end gap-7 px-5 pb-14 pt-36 sm:px-8 md:pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
          {note && <Note className="rotate-[-3deg] text-[var(--accent)]">{note}</Note>}
        </div>
        <TitreRevele
          as="h1"
          auChargement
          texte={titre}
          className="max-w-5xl text-[clamp(3rem,8.4vw,7.75rem)] font-extrabold leading-[0.94] tracking-[-0.04em]"
          classeAccent={ACCENT_SOMBRE}
        />
        {children && (
          <Apparition delai={400} className="max-w-2xl text-xl leading-relaxed">
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

/** Les quatre niveaux de restriction d'eau, du plus doux au plus strict. */
export function Niveaux() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-film="niveaux">
      {NIVEAUX.map((n, i) => (
        <Apparition as="li" key={n.nom} delai={i * 110} className="rounded-[1.75rem] bg-[var(--carte)] p-6 text-[var(--encre)]">
          <p className="flex items-center gap-3 font-[family-name:var(--titres)] text-[14px] font-bold uppercase tracking-[0.12em]">
            <span aria-hidden="true" className="flex items-end gap-0.5">
              {Array.from({ length: 4 }, (_, k) => (
                <i key={k} className={`block w-1.5 rounded-sm ${k <= i ? "bg-[#8C4A33]" : "bg-[#2F4A2C]/20"}`} style={{ height: `${8 + k * 4}px` }} />
              ))}
            </span>
            {n.nom}
          </p>
          <p className="mt-3 text-[16px] leading-snug">{n.texte}</p>
        </Apparition>
      ))}
    </ol>
  );
}

/** L'affiche du lancement, l'été, pendant les restrictions. */
export function Affiche({ className = "" }: { className?: string }) {
  return (
    <figure data-film="affiche" className={`rounded-[1.75rem] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)] shadow-[0_40px_80px_-40px_rgba(34,52,31,0.9)] ${className}`}>
      <p className="font-[family-name:var(--titres)] text-[15px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Arrosage restreint&nbsp;?</p>
      <p className="mt-3 font-[family-name:var(--titres)] text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.03em]">
        Ce jardin a <span className="font-[family-name:var(--texte)] font-normal italic text-[var(--accent)]">peu soif.</span>
      </p>
      <figcaption className="mt-7 flex items-center justify-between gap-3 border-t border-white/20 pt-4 font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.14em]">
        <span>Vert en Août · paysagiste</span>
        <Huit className="h-8 w-8 text-[15px]" />
      </figcaption>
    </figure>
  );
}

/** L'année de Vert en Août : le croquis l'hiver, le chantier au printemps, l'été, l'entretien. */
export function Annee() {
  return (
    <div className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7" data-film="annee">
      <ol className="grid grid-cols-12 items-end gap-1.5" aria-label="L'année de Vert en Août">
        {MOIS.map((m, i) => {
          const s = SAISONS[ANNEE[i]];
          return (
            <li key={i} className="flex flex-col items-center gap-2">
              <Apparition de="rideau" delai={i * 60} className="w-full">
                <span aria-hidden="true" className="block h-32 w-full rounded-[10px] sm:h-40" style={{ background: s.couleur }} />
              </Apparition>
              <span className="font-[family-name:var(--titres)] text-[13px] font-bold">{m}</span>
            </li>
          );
        })}
      </ol>
      <ul className="mt-5 grid gap-x-5 gap-y-2 text-[15px] sm:grid-cols-2">
        {Object.values(SAISONS).map((s) => (
          <li key={s.libelle} className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-3.5 w-3.5 shrink-0 rounded-[4px]" style={{ background: s.couleur }} />
            {s.libelle}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Le croquis d'hiver : le plan du jardin dessiné trait après trait, annoté au crayon,
 * et le tampon « chantier : avril ». Un exemple.
 */
export function Croquis() {
  const traits = [
    "M60 70 H300 V250 H60 Z",
    "M300 150 H420 V250 H300",
    "M420 200 C520 210 560 330 640 360 S700 520 690 600",
    "M60 640 H700",
    "M500 120 m-60 0 a60 60 0 1 0 120 0 a60 60 0 1 0 -120 0",
    "M200 470 m-44 0 a44 44 0 1 0 88 0 a44 44 0 1 0 -88 0",
    "M110 330 C200 300 330 330 380 420 S300 580 150 560 S60 400 110 330 Z",
  ];
  return (
    <figure
      className="relative rounded-[1.5rem] bg-[#FBF8EF] p-4 text-[#8C4A33] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] [background-image:linear-gradient(#E9E2CF_1px,transparent_1px),linear-gradient(90deg,#E9E2CF_1px,transparent_1px)] [background-size:24px_24px]"
      data-film="croquis"
    >
      <style>{`@keyframes va-trace { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }`}</style>
      <svg viewBox="0 0 760 680" className="block h-auto w-full" aria-hidden="true">
        {traits.map((d, k) => (
          <path key={k} d={d} pathLength={1} fill="none" stroke="#2F4A2C" strokeWidth="5" strokeLinecap="round" strokeDasharray="1" style={{ animation: `va-trace 900ms ease-out ${k * 260}ms both` }} />
        ))}
      </svg>
      <span className="absolute left-[14%] top-[18%]"><Note>maison</Note></span>
      <span className="absolute left-[56%] top-[38%]"><Note>terrasse</Note></span>
      <span className="absolute left-[72%] top-[24%]"><Note>olivier</Note></span>
      <span className="absolute left-[16%] top-[58%]"><Note>lavandes</Note></span>
      <span className="absolute left-[40%] top-[86%]"><Note>vue de la cuisine</Note></span>
      <figcaption className="absolute right-4 top-4 rotate-[-8deg] rounded-[6px] border-[3px] border-[#8C4A33] bg-[#FBF8EC] px-3 py-1 font-[family-name:var(--titres)] text-[14px] font-bold uppercase tracking-[0.1em]">
        Chantier : avril
      </figcaption>
    </figure>
  );
}

/** Une ligne de prix d'un devis. */
export function LignePrix({ libelle, montant, fort = false }: { libelle: string; montant: number; fort?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 ${fort ? "text-[18px] font-bold" : "text-[15px]"}`}>
      <span>{libelle}</span>
      <span className="whitespace-nowrap tabular-nums">{euros(montant)}</span>
    </div>
  );
}

/**
 * Le prix de l'entretien en gros ; le crédit d'impôt à côté, détaché, en plus petit
 * (arrêté du 17 mars 2015, art. 5). Hors taxes et toutes taxes comprises (art. 4) :
 * micro-entreprise en franchise, HT = TTC, et c'est écrit.
 */
export function PrixEntretien() {
  return (
    <div className="space-y-3" data-film="prix">
      <div className="rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)] sm:p-9">
        <p className="font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Entretien du jardin · à l&apos;année</p>
        <p className="mt-2 text-[16px]">Jardin de 300 à 700 m² · tonte, taille des haies, désherbage</p>
        <p className="mt-5 font-[family-name:var(--titres)] text-[clamp(4.5rem,11vw,7rem)] font-extrabold leading-none tracking-[-0.04em] tabular-nums">1 200 €</p>
        <p className="mt-3 font-[family-name:var(--titres)] text-[18px] font-bold">par an · HT et TTC · exemple</p>
        <p className="mt-1 text-[15px]">TVA non applicable, art. 293 B du CGI : le prix hors taxes est le prix toutes taxes comprises.</p>
      </div>
      <p className="rounded-[1.1rem] bg-[#E7D7B4] px-4 py-3 text-[13px] leading-snug text-[var(--encre)]" data-film="credit-impot">
        Crédit d&apos;impôt possible : 50 % des sommes versées, sous conditions (CGI, art. 199 sexdecies).{" "}
        <Link href={`${DOSSIER}/entretien#conditions`} className="underline underline-offset-2">Les conditions</Link>
      </p>
    </div>
  );
}

/** Le dernier écran de chaque page : la visite, sur le fond vivant de la marque. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 pt-6 sm:px-5 sm:pb-5" id="contact">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#22341F", "#55703F", "#C9963E"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Nous appeler</Surtitre>
            <TitreRevele
              texte="Une visite, *plutôt en été.*"
              className="text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[0.94] tracking-[-0.04em]"
              classeAccent={ACCENT_SOMBRE}
            />
            <p className="max-w-xl text-lg leading-relaxed">
              On voit ce qui souffre, où le soleil tape, où l&apos;eau ruisselle. {CONTACT.zone}.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}#photos`}>Envoyer trois photos</Bouton>
            <p className="text-[15px]">
              Ou par téléphone : <span className="font-bold tabular-nums">{CONTACT.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
