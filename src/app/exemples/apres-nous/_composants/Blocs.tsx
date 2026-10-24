import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, atelier, ouvertures } from "./donnees";

/** Les coins coupés de l'atelier : un chanfrein, comme sur l'arête d'un plateau. */
export const CHANFREIN = "[clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]";
export const CHANFREIN_GRAND = "[clip-path:polygon(28px_0,100%_0,100%_calc(100%-28px),calc(100%-28px)_100%,0_100%,0_28px)]";

/** Le monogramme : A et N, gravés dans un cartouche, comme sous les plateaux. */
export function Monogramme({ taille = 34 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={taille} height={taille} aria-hidden="true">
      <path d="M6 1.5 H38.5 V34 L34 38.5 H1.5 V6 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="20" y="26.5" textAnchor="middle" fontSize="15" fill="currentColor" className="font-[family-name:var(--titres)]">AN</text>
    </svg>
  );
}

export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <Monogramme />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[20px] tracking-[0.02em]">Après Nous</span>
    </span>
  );
}

/** Un intitulé, numéroté comme les chapitres d'un registre. */
export function Chapitre({ numero, children, clair = false }: { numero?: string; children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.24em] ${clair ? "text-[#E0B36A]" : "text-[var(--accent-texte)]"}`}>
      {numero && <span className="font-[family-name:var(--titres)] text-base normal-case italic tracking-normal">{numero}.</span>}
      <span>{children}</span>
      <span aria-hidden="true" className="h-px w-12 bg-current opacity-60" />
    </p>
  );
}

/** Un bouton-lien aux coins coupés. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "encre" | "clair" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    encre: "bg-[var(--encre)] text-[var(--fond)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 px-7 py-3 text-[14px] font-semibold uppercase tracking-[0.16em] transition-transform hover:scale-[1.02] ${CHANFREIN} ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le dernier écran de chaque page : le four et la table, sur la lueur du bois. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className={`relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]`}>
        <FondVivant couleurs={["#2A190E", "#5A3A22", "#B4562E"]} vitesse={0.8} />
        <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Chapitre clair>La prochaine ouverture du four</Chapitre>
            <TitreRevele
              texte={`Le four s'ouvre *${ouvertures.prochaine.date.replace(" 2026", "")}.*`}
              className="font-[family-name:var(--titres)] text-[clamp(3rem,7.5vw,6.8rem)] leading-[0.95] tracking-[-0.02em]"
              classeAccent="italic text-[#E0B36A]"
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              À {ouvertures.prochaine.heure}, en direct. Les pièces sont en ligne le soir même — une seule de chaque. Et
              pour une table, on commence par le dessin, chez toi.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/ouverture-du-four`}>Noter la date</Bouton>
            <Bouton href={`${DOSSIER}/meubles`} variante="clair">Dessiner ta table</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/90">
              À l&apos;atelier : <span className="font-semibold tabular-nums">{atelier.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}

/**
 * Le haut de chaque page intérieure : sombre comme le noyer, une photo qui respire
 * derrière le titre, ou la lueur du four. `titreEnParagraphe` : quand la page a déjà son h1.
 */
export function EnTetePage({
  numero,
  surtitre,
  titre,
  children,
  photo,
  titreEnParagraphe = false,
}: {
  numero?: string;
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  titreEnParagraphe?: boolean;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority className="opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,25,14,0.55)_0%,rgba(42,25,14,0.72)_55%,rgba(42,25,14,0.96)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#2A190E", "#4A2E1A", "#9C4A26"]} vitesse={0.7} />
          <div className="absolute inset-0 bg-[var(--sombre)]/55" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-48">
        <Apparition><Chapitre numero={numero} clair>{surtitre}</Chapitre></Apparition>
        <TitreRevele
          as={titreEnParagraphe ? "p" : "h1"}
          auChargement
          texte={titre}
          className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3.2rem,8vw,7.4rem)] leading-[0.94] tracking-[-0.02em]"
          classeAccent="italic text-[#E0B36A]"
        />
        {children && (
          <Apparition delai={400} className="max-w-2xl text-xl leading-relaxed text-[var(--sur-sombre)]/90">
            {children}
          </Apparition>
        )}
      </div>
    </section>
  );
}
