import Link from "next/link";
import PhotoCinema from "../../_kit/PhotoCinema";
import { DOSSIER, boutique } from "./donnees";

// La langue visuelle de Douze Mois, version « carrée » (24/10/2026), et son identité du
// 30/10/2026 : le jardin à l'heure bleue. Instrument Serif pour les titres, d'un seul
// tenant (30/10/2026 : plus aucun mot mis en relief) ; son italique pour les noms de
// fleurs et le nom de la boutique ; Bricolage Grotesque pour lire ; la nuit d'iris, le
// papier glycine, le rose pivoine en texte, et le vert tige seulement pour le bouton
// principal et quelques détails. Une échelle de texte, une grille, partout.

/** « Mois », dans le nom de la boutique en grand : l'italique, en vert tige sur la nuit (c'est le logo, pas un relief de titre). */
export const ACCENT_SOMBRE = "italic font-normal text-[var(--accent)]";

/** Le monogramme « 12 » dans un cercle, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full border border-current font-[family-name:var(--titres)] text-[15px] italic leading-none">
        12
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] leading-none tracking-[-0.01em]">
        Douze <span className="italic">Mois</span>
      </span>
    </span>
  );
}

/** Une petite ligne au-dessus d'un titre, quand elle apprend quelque chose (quand, où) : en casse normale. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`text-[15px] font-medium leading-snug ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      {children}
    </p>
  );
}

/**
 * Les outils du kit (CalculPalier) écrivent leurs petits intitulés en capitales espacées.
 * Posée sur leur enveloppe, cette classe les remet en casse normale, un peu plus grands,
 * sans toucher au kit partagé par les autres sites.
 */
export const KIT_EN_CASSE_NORMALE = "[&_.uppercase]:normal-case [&_.uppercase]:tracking-normal [&_.uppercase]:text-[15px]";

/** Un bouton-lien en pilule : plein (le mimosa) ou en contour fin. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
  }[variante];
  return (
    <Link href={href} className={`inline-flex h-12 items-center gap-3 rounded-full px-6 text-[15px] font-medium transition-colors ${styles}`}>
      {children}
    </Link>
  );
}

/** Le titre d'un écran, d'un seul tenant : toujours la même échelle. */
export function Titre({
  texte,
  as: Balise = "h2",
  className = "",
}: {
  texte: string;
  /** Sur la nuit : le titre prend simplement la couleur de sa section. */
  clair?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  return (
    <Balise className={`font-[family-name:var(--titres)] text-[clamp(2.25rem,4.4vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.02em] text-balance ${className}`}>
      {sansCesure(texte)}
    </Balise>
  );
}

/** « mois-ci », « 14 février » : un mot composé ne se coupe pas à son trait d'union, en bout de ligne. */
export function sansCesure(texte: string) {
  return texte.split(/(\S+-\S+)/).map((morceau, i) =>
    i % 2 ? <span key={i} className="whitespace-nowrap">{morceau}</span> : morceau,
  );
}

/** Le haut d'un écran de l'accueil : un titre, une phrase. */
export function Intitule({ titre, texte, clair = false }: { titre: string; texte: string; clair?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
      <Titre texte={titre} clair={clair} />
      <p className={`text-lg leading-relaxed ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>{texte}</p>
    </div>
  );
}

/**
 * L'heure limite, écrite en gros : « c'est une promesse, alors on la tient ». Sur la
 * page de livraison, un écran à elle ; sur l'accueil, elle est dans le premier écran.
 */
export function HeureLimite({ niveau = 2 }: { niveau?: 1 | 2 }) {
  const Balise = niveau === 1 ? "h1" : "p";
  return (
    <section id="heure" aria-label="L'heure limite" className="scroll-mt-20 border-b border-[var(--trait)]">
      <div className="mx-auto max-w-6xl space-y-6 px-6 py-28 md:py-40">
        <Surtitre>Livraison dans la ville, du mardi au samedi</Surtitre>
        <Balise className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.75rem,6vw,5.25rem)] font-normal leading-[1] tracking-[-0.02em] text-balance [font-variant-numeric:lining-nums]">
          Commandé avant 14&nbsp;h, livré aujourd&apos;hui.
        </Balise>
        <p className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
          Après 14&nbsp;h&nbsp;: livré demain matin. Retrait en boutique&nbsp;: gratuit. C&apos;est une
          promesse, alors on la tient — et si un jour on ne peut pas, le site le dit dès le matin.
        </p>
      </div>
    </section>
  );
}

/**
 * Le haut de chaque page intérieure : sombre, comme l'accueil (l'en-tête flottant
 * l'attend), une photo qui respire, le titre en grand et en graisse normale.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  origine,
}: {
  surtitre?: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo: { src: string };
  origine?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[64svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,18,48,0.55)_0%,rgba(25,18,48,0.35)_38%,rgba(25,18,48,0.94)_100%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-14 pt-36 md:pb-20">
        {surtitre && <Surtitre clair>{surtitre}</Surtitre>}
        <h1 className="max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] font-normal leading-[1] tracking-[-0.02em] text-balance">{sansCesure(titre)}</h1>
        {children && <div className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">{children}</div>}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : clair et centré, l'heure limite et un bouton. */
export function AppelFinal() {
  return (
    <section className="border-t border-[var(--trait)]">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-28 text-center md:py-36">
        <Titre texte={"Avant 14\u00a0h, c'est aujourd'hui."} />
        <p className="mx-auto max-w-lg text-lg leading-relaxed text-[var(--doux)]">
          Dis ce que tu veux dire. On compose avec ce qui fleurit, on écrit la carte à la main.
          Tu n&apos;as qu&apos;à signer.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Bouton href={`${DOSSIER}#choix`}>Commander un bouquet</Bouton>
          <p className="text-[15px] text-[var(--doux)]">
            Ou par téléphone : <span className="whitespace-nowrap font-medium tabular-nums text-[var(--encre)]">{boutique.telephone}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
