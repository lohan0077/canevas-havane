import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, cabinet, type Photo } from "./donnees";

// Version « carrée » (24/10/2026) : une échelle de texte, une grille, des boutons fins ;
// ni grain, ni fond animé, ni lueur. Titres en Newsreader, en graisse normale ; la mise
// en relief est son italique, à la couleur d'accent.

/** Les classes d'un mot en relief dans un titre : l'italique de Newsreader, à l'accent. */
export const ACCENT_CLAIR = "italic font-normal text-[var(--accent-texte)]";
export const ACCENT_SOMBRE = "italic font-normal text-[#F0A07A]";

/** Le monogramme « ? » dans un rond, et le nom, dans la géométrique de la marque. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--f-outfit)] text-lg font-medium text-[var(--sur-accent)]">
        ?
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--f-outfit)] text-[19px] font-medium tracking-[-0.02em]">Le Pourquoi</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : une ligne discrète, en capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`text-[12px] font-medium uppercase tracking-[0.2em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule : un plein (l'accent), un en contour fin. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex h-12 items-center gap-3 rounded-full px-6 text-[15px] font-medium transition-colors ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le titre d'un écran, révélé mot à mot. */
export function Titre({
  texte,
  clair = false,
  as = "h2",
  className = "",
}: {
  texte: string;
  clair?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  return (
    <TitreRevele
      as={as}
      texte={texte}
      className={`text-[clamp(2.25rem,4.4vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.02em] text-balance ${className}`}
      classeAccent={clair ? ACCENT_SOMBRE : ACCENT_CLAIR}
    />
  );
}

/** Le haut de chaque écran de l'accueil : un numéro, un titre, une phrase. Toujours le même gabarit. */
export function Intitule({ numero, surtitre, titre, texte, clair = false }: { numero?: string; surtitre: string; titre: string; texte?: React.ReactNode; clair?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
      <div className="space-y-5">
        <Apparition><Surtitre clair={clair}>{numero ? `${numero} — ${surtitre}` : surtitre}</Surtitre></Apparition>
        <Titre texte={titre} clair={clair} />
      </div>
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
        <Apparition><Surtitre>Rendez-vous en ligne</Surtitre></Apparition>
        <TitreRevele
          texte={"Dès 7 h. Jusqu'à *20 h 45.*"}
          className="text-[clamp(2.25rem,4.4vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.02em] text-balance"
          classeAccent={ACCENT_CLAIR}
        />
        <Apparition as="p" delai={150} className="mx-auto max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
          Un nom, un téléphone, un créneau. On ne vous demande pas pourquoi vous venez : vous le
          direz au cabinet.
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
 * au-delà de sa taille.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  titreBalise = "h1",
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: Photo;
  titreBalise?: "h1" | "p";
}) {
  return (
    <section className="relative flex min-h-[64svh] flex-col bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className={`mx-auto grid w-full max-w-6xl flex-1 items-end gap-12 px-6 pb-16 pt-36 md:pb-24 ${photo ? "lg:grid-cols-[1.25fr_0.75fr]" : ""}`}>
        <div className="space-y-7">
          <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as={titreBalise}
            auChargement
            texte={titre}
            className="max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)] font-normal leading-[1] tracking-[-0.02em] text-balance"
            classeAccent={ACCENT_SOMBRE}
          />
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
