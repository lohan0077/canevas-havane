import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import { DOSSIER, cabinet, type Photo } from "./donnees";

// Version « carrée » (24/10/2026), habillée le 30/10/2026 : une échelle de texte, une
// grille, des boutons fins. Titres en Newsreader romain, d'un seul tenant. Passe
// « frontend-design » (30/10/2026) : plus de mot en italique coloré dans les titres, plus
// de surtitres en capitales ni de flèches dans les boutons. L'italique reste la voix du
// patient (ses questions, citées entières), et la pervenche #AEB8FF (9,7:1 sur le bleu
// de nuit) les petits repères sur fond sombre.

/** Le monogramme : un « ? » italique dans un rond outremer, et le nom en Newsreader. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] pb-0.5 pr-0.5 font-[family-name:var(--titres)] text-[24px] italic leading-none text-[var(--sur-accent)]">
        ?
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[23px] leading-none tracking-[-0.005em]">Le Pourquoi</span>
    </span>
  );
}

/** Un bouton-lien en pilule : un plein (l'accent), un en contour fin, un clair (sur le bleu de nuit). */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)] hover:bg-white",
  }[variante];
  return (
    <Link href={href} className={`inline-flex h-12 items-center rounded-full px-6 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${styles}`}>
      {children}
    </Link>
  );
}

/** Le titre d'un écran : Newsreader romain, d'un seul tenant. */
export function Titre({
  texte,
  as: Balise = "h2",
  className = "",
}: {
  texte: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  return (
    <Balise className={`text-[clamp(2.25rem,4.4vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.02em] text-balance ${className}`}>
      {texte}
    </Balise>
  );
}

/** Le haut de chaque écran de l'accueil : un titre, une phrase. Toujours le même gabarit. */
export function Intitule({ titre, texte, clair = false }: { titre: string; texte?: React.ReactNode; clair?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
      <Titre texte={titre} />
      {texte && (
        <Apparition as="p" delai={150} className={`max-w-[26rem] text-lg leading-relaxed ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
          {texte}
        </Apparition>
      )}
    </div>
  );
}

/** Le dernier écran de chaque page : clair et centré. */
export function AppelFinal() {
  return (
    <section className="border-t border-[var(--trait)]">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-28 text-center md:py-36">
        <Titre texte={"Dès 7 h. Jusqu'à 20 h 45."} />
        <Apparition as="p" delai={150} className="mx-auto max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
          Rendez-vous en ligne : un nom, un téléphone, un créneau. On ne vous demande pas pourquoi
          vous venez : vous le direz au cabinet.
        </Apparition>
        <Apparition delai={250} className="flex flex-col items-center gap-4">
          <Bouton href={`${DOSSIER}/rendez-vous`}>Choisir un créneau</Bouton>
          <p className="text-[15px] text-[var(--doux)]">
            Ou par téléphone : <span className="font-medium tabular-nums text-[var(--encre)]">{cabinet.telephone}</span>
          </p>
        </Apparition>
      </div>
    </section>
  );
}

/**
 * Le haut de chaque page intérieure : sombre, comme l'accueil (l'en-tête flottant
 * l'attend), un titre fin, et la photo de la page dans un cadre — jamais agrandie
 * au-delà de sa taille. Pas d'intitulé au-dessus du titre ; `retour`, s'il est donné,
 * est un lien vers la page parente, en casse ordinaire.
 */
export function EnTetePage({
  retour,
  titre,
  children,
  photo,
  titreBalise: Balise = "h1",
}: {
  retour?: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: Photo;
  titreBalise?: "h1" | "p";
}) {
  return (
    <section className="relative flex min-h-[64svh] flex-col bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className={`mx-auto grid w-full max-w-6xl flex-1 items-end gap-12 px-6 pb-16 pt-36 md:pb-24 ${photo ? "lg:grid-cols-[1.25fr_0.75fr]" : ""}`}>
        <div className="space-y-7">
          {retour && <p className="text-[15px]">{retour}</p>}
          <Balise className="max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] font-normal leading-[1] tracking-[-0.02em] text-balance">{titre}</Balise>
          {children && (
            <Apparition delai={400} className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">
              {children}
            </Apparition>
          )}
        </div>
        {photo && (
          <Apparition delai={250} className="relative hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="380px" className="object-cover" />
          </Apparition>
        )}
      </div>
    </section>
  );
}
