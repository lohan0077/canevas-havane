import Image from "next/image";
import Link from "next/link";
import Marque from "./Marque";
import { DOSSIER, entreprise, type Photo } from "./donnees";

/** Le parapluie dans son cercle, et le nom en italique. */
export function NomMarque() {
  return (
    <span className="flex items-center gap-2.5">
      <Marque taille={34} />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[20px] font-normal italic">Et s&apos;il pleut</span>
    </span>
  );
}

/** Un bouton-lien en pilule : plein (le jaune parapluie), contour fin, ou couleur d'orage. Son libellé est un verbe, sans flèche. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "ardoise" }) {
  const style = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    ardoise: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  }[variante];
  return (
    <Link href={href} data-variante={variante} className={`esp-bouton inline-flex h-[3.25rem] items-center rounded-full px-6 text-[15px] font-semibold ${style}`}>
      {children}
    </Link>
  );
}

/** Le titre d'un écran : un seul tenant, en Didot romain, jamais en gras. Toujours la même échelle. */
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
    geant: "text-[clamp(2.85rem,6.2vw,5.5rem)] leading-[1]",
    grand: "text-[clamp(2.35rem,4.6vw,4rem)] leading-[1.04]",
    moyen: "text-[clamp(1.95rem,3.3vw,2.85rem)] leading-[1.08]",
  }[taille];
  const Balise = as;
  return <Balise className={`font-normal tracking-[-0.02em] text-balance ${tailles} ${className}`}>{texte}</Balise>;
}

/**
 * Le haut de chaque page intérieure : un ciel d'orage, une photo sous un voile et sous
 * une averse fine, figée (la seule pluie qui tombe est celle du premier écran), un titre
 * fin. Toutes les pages s'ouvrent sur ce ciel : l'en-tête flottant l'attend sombre.
 */
export function EnTetePage({
  titre,
  children,
  photo,
  origine,
  aside,
}: {
  titre: string;
  children?: React.ReactNode;
  photo?: Photo;
  origine?: string;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[68svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo && (
        <>
          <Image src={photo.src} alt="" fill priority sizes="100vw" className="object-cover opacity-60" style={{ objectPosition: origine }} />
          <div aria-hidden="true" data-fixe className="esp-averse opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--sombre)_62%,transparent)_0%,color-mix(in_oklab,var(--sombre)_38%,transparent)_38%,color-mix(in_oklab,var(--sombre)_94%,transparent)_100%)]" />
        </>
      )}
      <div className={`relative mx-auto grid w-full max-w-6xl flex-1 gap-12 px-6 pb-14 pt-36 md:pb-20 ${aside ? "lg:grid-cols-[1fr_1fr] lg:items-end" : "content-end"}`}>
        <div className="space-y-7 self-end">
          <h1 className="max-w-4xl text-[clamp(2.85rem,6.2vw,5.5rem)] font-normal leading-[1] tracking-[-0.02em] text-balance">{titre}</h1>
          {children && <div className="max-w-[28rem] text-lg leading-relaxed">{children}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}

/** Le grand parapluie de la fin de page, ouvert sous quelques gouttes. Immobile : un dessin, pas une animation. */
function GrandParapluie() {
  // le bord festonné : sept arcs entre les pointes des baleines
  const festons = Array.from({ length: 7 }, () => "c-4.4-4.2-8.8-4.2-13.14 0").join("");
  const pointes = Array.from({ length: 8 }, (_, i) => 14 + i * 13.14);
  return (
    <svg viewBox="0 0 120 112" width="112" height="104" aria-hidden="true" className="mx-auto overflow-visible">
      {[22, 44, 76, 98, 60].map((x, i) => (
        <path key={x} d={`M${x} ${i % 2 ? 2 : 6}v7`} stroke="var(--accent-texte)" strokeWidth="1.6" strokeLinecap="round" />
      ))}
      <path d="M60 58v36a8 8 0 0 1-16 0" fill="none" stroke="var(--encre)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M60 12V4" stroke="var(--encre)" strokeWidth="2.6" strokeLinecap="round" />
      <g>
        <path d={`M14 58a46 46 0 0 1 92 0${festons}z`} fill="var(--accent)" />
        {pointes.slice(1, -1).map((x) => (
          <path key={x} d={`M60 12Q${60 + (x - 60) * 0.55} ${26} ${x} 58`} fill="none" stroke="#C99500" strokeWidth="1" />
        ))}
      </g>
    </svg>
  );
}

/** Le dernier écran de chaque page : clair, centré, le grand parapluie, une question et un bouton. */
export function AppelFinal() {
  return (
    <section className="border-t border-[var(--trait)]">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-28 text-center md:py-36">
        <GrandParapluie />
        <Titre texte={"Et s'il pleut\u00a0? C'est prévu."} />
        <p className="mx-auto max-w-[27rem] text-lg leading-relaxed text-[var(--doux)]">
          Ta date, tes deux versions, ton devis — le plan B chiffré dedans. Le premier rendez-vous
          est gratuit. Pas de « il a plu,
          c&apos;était parfait » : celle-là, on l&apos;écrira après un vrai mariage sous la pluie.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Bouton href={`${DOSSIER}#ma-date`}>Entrer ma date de mariage</Bouton>
          <p className="text-[15px] text-[var(--doux)]">
            Ou par téléphone :{" "}
            <a href={`tel:${entreprise.telephoneLien}`} className="esp-trait font-semibold tabular-nums text-[var(--encre)]">{entreprise.telephone}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
