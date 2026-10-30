import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, agence } from "./donnees";

/**
 * Les classes d'un mot en relief dans un titre : l'italique de DM Serif Display, la voix
 * de la « deuxième version », en vermillon foncé (sur fond clair) ou en vermillon clair (sur
 * l'anthracite). Un peu plus grand que la grotesque, dont l'œil est plus haut.
 */
export const ACCENT_CLAIR = "font-[family-name:var(--serif)] italic font-normal tracking-[-0.01em] text-[1.08em] leading-[0.9] text-[var(--accent-texte)]";
export const ACCENT_SOMBRE = "font-[family-name:var(--serif)] italic font-normal tracking-[-0.01em] text-[1.08em] leading-[0.9] text-[var(--accent-clair)]";

/**
 * La marque : un pignon dessiné en deux moitiés — à gauche le trait de la maison d'hier,
 * à droite l'aplat vermillon de sa deuxième version — et le nom, « bis » en italique.
 */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <svg aria-hidden="true" viewBox="0 0 28 28" className="h-8 w-8 shrink-0">
        <path d="M14 3 L3 12 V25 H14 Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 3 L25 12 V25 H14 Z" fill="var(--accent)" />
        <path d="M14 3 V25" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      <span className="whitespace-nowrap font-[family-name:var(--texte)] text-[19px] font-semibold tracking-[-0.03em]">
        Pavillon <span className="font-[family-name:var(--serif)] text-[1.15em] font-normal italic tracking-normal">bis</span>
      </span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : une ligne discrète, en capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`font-[family-name:var(--texte)] text-[12px] font-medium uppercase tracking-[0.2em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      {children}
    </p>
  );
}

/** Le titre d'un écran, révélé mot à mot : Sora, l'italique pour ce qui change. */
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
    geant: "text-[clamp(2.75rem,6vw,5.25rem)] leading-[1]",
    grand: "text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05]",
    moyen: "text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.1]",
  }[taille];
  return (
    <TitreRevele
      as={as}
      texte={texte}
      className={`font-[family-name:var(--titres)] font-medium tracking-[-0.04em] text-balance ${tailles} ${className}`}
      classeAccent={clair ? ACCENT_SOMBRE : ACCENT_CLAIR}
    />
  );
}

/** Un bouton-lien en pilule ; la flèche avance au survol. Un plein (le vermillon), un en contour fin. */
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
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    sombre: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link
      href={href}
      className={`group inline-flex h-12 items-center gap-3 rounded-full px-6 font-[family-name:var(--texte)] text-[15px] font-semibold transition-colors ${styles}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * Le haut de chaque page intérieure : anthracite, comme l'accueil (l'en-tête flottant
 * l'attend), une photo sous un voile si on en donne une, et un titre serré.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  apres,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  apres?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[64svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo && (
        <>
          <Image src={photo.src} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,24,28,0.6)_0%,rgba(21,24,28,0.78)_55%,rgba(21,24,28,0.96)_100%)]" />
        </>
      )}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-14 pt-36 md:pb-20">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as="h1"
          auChargement
          texte={titre}
          className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.75rem,6vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.045em] text-balance"
          classeAccent={ACCENT_SOMBRE}
        />
        {children && (
          <Apparition delai={400} className="max-w-xl text-lg leading-relaxed">
            {children}
          </Apparition>
        )}
        {apres}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : le samedi matin, clair et centré. */
export function AppelFinal() {
  return (
    <section className="border-t border-[var(--trait)]">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-28 text-center md:py-36">
        <Apparition><Surtitre>Un samedi matin par mois</Surtitre></Apparition>
        <Titre texte={"On passe voir *la tienne ?*"} />
        <Apparition as="p" delai={150} className="mx-auto max-w-lg text-lg leading-relaxed text-[var(--doux)]">
          Trente minutes, à l&apos;agence ou en visio : ta maison, ton terrain, ton budget. Tu repars en
          sachant si ton projet tient — et s&apos;il a besoin d&apos;un architecte.
        </Apparition>
        <Apparition delai={250} className="flex flex-col items-center gap-4">
          <Bouton href={`${DOSSIER}/rendez-vous`}>Réserver mes 30 minutes</Bouton>
          <p className="text-[15px] text-[var(--doux)]">
            Ou par téléphone : <span className="font-medium tabular-nums text-[var(--encre)]">{agence.telephone}</span>
          </p>
        </Apparition>
      </div>
    </section>
  );
}
