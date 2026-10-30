import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import Marque from "./Marque";
import { DOSSIER, entreprise, type Photo } from "./donnees";

/** Les classes d'un mot en relief : l'italique du Didot, violet d'orage sur clair, jaune sur sombre. */
export const ACCENT_CLAIR = "italic font-normal text-[var(--accent-texte)]";
export const ACCENT_SOMBRE = "italic font-normal text-[var(--accent)]";

/** Le parapluie dans son cercle, et le nom en italique. */
export function NomMarque() {
  return (
    <span className="flex items-center gap-2.5">
      <Marque taille={34} />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[20px] font-normal italic">Et s&apos;il pleut</span>
    </span>
  );
}

/**
 * La petite ombrelle jaune devant chaque intitulé, l'écho des parapluies du premier
 * écran : fermée, elle s'ouvre quand son intitulé apparaît (pluie.css). Décorative.
 */
export function Ombrelle({ clair = false }: { clair?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" className="esp-ombrelle">
      <path d="M12 3.6V1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12.4v6.4a2 2 0 0 1-4 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        className="esp-toile"
        d="M3 12.4a9 9 0 0 1 18 0c-1.1-1-2.4-1-3 0-.6-1-2.4-1-3 0-.6-1-2.4-1-3 0-.6-1-2.4-1-3 0-.6-1-2.4-1-3 0-.6-1-1.9-1-3 0z"
        fill="var(--accent)"
        stroke={clair ? "none" : "var(--encre)"}
        strokeWidth={clair ? 0 : 0.7}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Le petit intitulé au-dessus d'un titre : l'ombrelle, puis une ligne en capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      <Ombrelle clair={clair} />
      <span>{children}</span>
    </p>
  );
}

/** Un bouton-lien en pilule : plein (le jaune parapluie), contour fin, ou couleur d'orage. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "ardoise" }) {
  const style = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    ardoise: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  }[variante];
  return (
    <Link href={href} data-variante={variante} className={`esp-bouton inline-flex h-[3.25rem] items-center gap-3 rounded-full pl-6 pr-5 text-[15px] font-semibold ${style}`}>
      {children}
      <span aria-hidden="true" className="esp-fleche">→</span>
    </Link>
  );
}

/** Le titre d'un écran, révélé mot à mot. Toujours la même échelle, jamais en gras. */
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
    geant: "text-[clamp(2.85rem,6.2vw,5.5rem)] leading-[1]",
    grand: "text-[clamp(2.35rem,4.6vw,4rem)] leading-[1.04]",
    moyen: "text-[clamp(1.95rem,3.3vw,2.85rem)] leading-[1.08]",
  }[taille];
  return (
    <TitreRevele
      as={as}
      texte={texte}
      className={`font-normal tracking-[-0.02em] text-balance ${tailles} ${className}`}
      classeAccent={clair ? ACCENT_SOMBRE : ACCENT_CLAIR}
    />
  );
}

/**
 * Le haut de chaque page intérieure : un ciel d'orage, une photo qui respire sous un
 * voile et sous une averse fine, un titre fin. Toutes les pages s'ouvrent sur ce ciel :
 * l'en-tête flottant l'attend sombre.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  origine,
  aside,
}: {
  surtitre: string;
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
          <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-60" />
          <div aria-hidden="true" className="esp-averse opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--sombre)_62%,transparent)_0%,color-mix(in_oklab,var(--sombre)_38%,transparent)_38%,color-mix(in_oklab,var(--sombre)_94%,transparent)_100%)]" />
        </>
      )}
      <div className={`relative mx-auto grid w-full max-w-6xl flex-1 gap-12 px-6 pb-14 pt-36 md:pb-20 ${aside ? "lg:grid-cols-[1fr_1fr] lg:items-end" : "content-end"}`}>
        <div className="space-y-7 self-end">
          <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="max-w-4xl text-[clamp(2.85rem,6.2vw,5.5rem)] font-normal leading-[1] tracking-[-0.02em] text-balance"
            classeAccent={ACCENT_SOMBRE}
          />
          {children && (
            <Apparition delai={400} className="max-w-[28rem] text-lg leading-relaxed">
              {children}
            </Apparition>
          )}
        </div>
        {aside}
      </div>
    </section>
  );
}

/** Le grand parapluie de la fin de page : fermé, il s'ouvre en entrant à l'écran, et la pluie tombe dessus. */
function GrandParapluie() {
  // le bord festonné : sept arcs entre les pointes des baleines
  const festons = Array.from({ length: 7 }, () => "c-4.4-4.2-8.8-4.2-13.14 0").join("");
  const pointes = Array.from({ length: 8 }, (_, i) => 14 + i * 13.14);
  return (
    <svg viewBox="0 0 120 112" width="112" height="104" aria-hidden="true" className="esp-grand-parapluie mx-auto overflow-visible">
      {[22, 44, 76, 98, 60].map((x, i) => (
        <path key={x} className="esp-goutte" style={{ "--i": i } as React.CSSProperties} d={`M${x} ${i % 2 ? 2 : 6}v7`} stroke="var(--accent-texte)" strokeWidth="1.6" strokeLinecap="round" />
      ))}
      <path d="M60 58v36a8 8 0 0 1-16 0" fill="none" stroke="var(--encre)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M60 12V4" stroke="var(--encre)" strokeWidth="2.6" strokeLinecap="round" />
      <g className="esp-toile">
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
        <Apparition><GrandParapluie /></Apparition>
        <Apparition className="flex justify-center"><Surtitre>Premier rendez-vous, gratuit</Surtitre></Apparition>
        <Titre texte={"Et s'il pleut ? *C'est prévu.*"} />
        <Apparition as="p" delai={150} className="mx-auto max-w-[27rem] text-lg leading-relaxed text-[var(--doux)]">
          Ta date, tes deux versions, ton devis — le plan B chiffré dedans. Pas de « il a plu,
          c&apos;était parfait » : celle-là, on l&apos;écrira après un vrai mariage sous la pluie.
        </Apparition>
        <Apparition delai={250} className="flex flex-col items-center gap-4">
          <Bouton href={`${DOSSIER}#ma-date`}>Tu te maries quand&nbsp;?</Bouton>
          <p className="text-[15px] text-[var(--doux)]">
            Ou par téléphone : <a href={`tel:${entreprise.telephoneLien}`} className="esp-trait font-semibold tabular-nums text-[var(--encre)]">{entreprise.telephone}</a>
          </p>
        </Apparition>
      </div>
    </section>
  );
}
