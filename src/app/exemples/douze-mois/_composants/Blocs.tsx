import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, boutique } from "./donnees";

// La langue visuelle de Douze Mois, version « carrée » (24/10/2026) : un herbier de
// musée, tenu court. Le romain et l'italique de Bodoni pour les titres, en graisse
// normale ; Inter pour lire ; la prune, la crème, et le jaune mimosa seulement pour le
// bouton principal et quelques détails. Une échelle de texte, une grille, partout.

/** Le relief d'un titre : l'italique de Bodoni, en berry sur fond clair, en mimosa sur fond sombre. */
export const ACCENT_CLAIR = "italic font-normal text-[var(--accent-texte)]";
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

/** Le petit intitulé au-dessus d'un titre : une ligne discrète, en capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`text-[12px] font-medium uppercase tracking-[0.2em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule : plein (le mimosa) ou en contour fin. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex h-12 items-center gap-3 rounded-full px-6 text-[15px] font-medium transition-colors ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le titre d'un écran, révélé mot à mot : toujours la même échelle. */
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

/** Le haut de chaque écran de l'accueil : un numéro, un titre, une phrase. */
export function Intitule({ numero, surtitre, titre, texte, clair = false }: { numero: string; surtitre: string; titre: string; texte: string; clair?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
      <div className="space-y-5">
        <Apparition><Surtitre clair={clair}>{numero} — {surtitre}</Surtitre></Apparition>
        <Titre texte={titre} clair={clair} />
      </div>
      <Apparition as="p" delai={150} className={`text-lg leading-relaxed ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
        {texte}
      </Apparition>
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
        <Surtitre>Livraison dans la ville · du mardi au samedi</Surtitre>
        <Balise className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.75rem,6vw,5.25rem)] font-normal leading-[1] tracking-[-0.02em] text-balance [font-variant-numeric:lining-nums]">
          Commandé avant 14&nbsp;h, <span className={ACCENT_CLAIR}>livré aujourd&apos;hui.</span>
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
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo: { src: string };
  origine?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[64svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,21,32,0.55)_0%,rgba(42,21,32,0.35)_38%,rgba(42,21,32,0.94)_100%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-14 pt-36 md:pb-20">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as="h1"
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
    </section>
  );
}

/** Le dernier écran de chaque page : clair et centré, l'heure limite et un bouton. */
export function AppelFinal() {
  return (
    <section className="border-t border-[var(--trait)]">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-28 text-center md:py-36">
        <Apparition><Surtitre>Ce mois-ci, pas un autre</Surtitre></Apparition>
        <Titre texte={"Avant 14 h, c'est *aujourd'hui.*"} />
        <Apparition as="p" delai={150} className="mx-auto max-w-lg text-lg leading-relaxed text-[var(--doux)]">
          Dis ce que tu veux dire. On compose avec ce qui fleurit, on écrit la carte à la main.
          Tu n&apos;as qu&apos;à signer.
        </Apparition>
        <Apparition delai={250} className="flex flex-col items-center gap-4">
          <Bouton href={`${DOSSIER}#choix`}>C&apos;est pour dire quoi&nbsp;?</Bouton>
          <p className="text-[15px] text-[var(--doux)]">
            Ou par téléphone : <span className="font-medium tabular-nums text-[var(--encre)]">{boutique.telephone}</span>
          </p>
        </Apparition>
      </div>
    </section>
  );
}
