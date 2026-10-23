import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, cabinet } from "./donnees";

/** Les coins coupés d'une étiquette de prix, en polygone (une encoche à chaque coin). */
// Écrits en entier : Tailwind ne voit que les classes écrites telles quelles dans le code.
export const COINS = "[clip-path:polygon(14px_0,calc(100%-14px)_0,100%_14px,100%_calc(100%-14px),calc(100%-14px)_100%,14px_100%,0_calc(100%-14px),0_14px)]";
export const COINS_PETITS = "[clip-path:polygon(7px_0,calc(100%-7px)_0,100%_7px,100%_calc(100%-7px),calc(100%-7px)_100%,7px_100%,0_calc(100%-7px),0_7px)]";

/** Le monogramme « RF » sur une étiquette, et le nom en machine à écrire. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className={`grid h-9 w-10 place-items-center bg-[var(--accent)] font-[family-name:var(--titres)] text-[15px] font-bold text-white ${COINS_PETITS}`}>
        RF
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] font-bold tracking-[-0.01em]">Rayon Frais</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : une étiquette de marché. */
export function Surtitre({ children, ton = "jaune" }: { children: React.ReactNode; ton?: "jaune" | "creme" | "vert" }) {
  const styles = {
    jaune: "bg-[#F2C94C] text-[#1F3B24]",
    creme: "bg-[var(--fond)] text-[var(--encre)]",
    vert: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  }[ton];
  return (
    <p className={`inline-flex items-center gap-2 px-3.5 py-1.5 font-[family-name:var(--titres)] text-[15px] font-bold ${styles} ${COINS_PETITS}`}>
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-current opacity-60" />
      {children}
    </p>
  );
}

/** Un bouton-lien franc ; la flèche avance au survol. */
export function Bouton({
  href,
  children,
  variante = "tomate",
}: {
  href: string;
  children: React.ReactNode;
  variante?: "tomate" | "vert" | "creme" | "contour";
}) {
  const styles = {
    tomate: "bg-[var(--accent)] text-white",
    vert: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
    creme: "bg-[var(--fond)] text-[var(--encre)]",
    contour: "border-2 border-current",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-7 py-3 font-[family-name:var(--titres)] text-[18px] font-bold transition-transform hover:-rotate-1 hover:scale-[1.03] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Une étiquette de prix, comme au marché : coins coupés, trou de ficelle, prix en gros. */
export function EtiquettePrix({
  nom,
  lieu,
  duree,
  prix,
  detail,
  ton = "creme",
  incline = 0,
}: {
  nom: string;
  lieu: string;
  duree: string;
  prix: string;
  detail: string;
  ton?: "creme" | "jaune" | "tomate" | "vert";
  incline?: number;
}) {
  const styles = {
    creme: "bg-white text-[var(--encre)]",
    jaune: "bg-[#F2C94C] text-[#1F3B24]",
    tomate: "bg-[var(--accent)] text-white",
    vert: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  }[ton];
  return (
    <div className={`relative h-full p-7 pt-9 transition-transform duration-500 hover:rotate-0 ${styles} ${COINS}`} style={{ rotate: `${incline}deg` }}>
      <span aria-hidden="true" className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--fond)] ring-2 ring-current/30" />
      <p className="text-[13px] font-bold uppercase tracking-[0.16em]">{lieu}</p>
      <p className="mt-2 font-[family-name:var(--titres)] text-2xl font-bold leading-tight">{nom}</p>
      <p className="mt-5 flex items-baseline justify-between gap-3 border-t-2 border-dashed border-current/40 pt-4">
        <span className="font-[family-name:var(--titres)] text-[3.6rem] font-bold leading-none [font-variant-numeric:lining-nums]">{prix}</span>
        <span className="text-right text-[15px] font-semibold [font-variant-numeric:lining-nums]">{duree}</span>
      </p>
      <p className="mt-3 text-[15px] leading-relaxed">{detail}</p>
    </div>
  );
}

/** Le dernier écran de chaque page : les soirs, sur le fond vivant vert et tomate. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="kit-grain relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#1A3D21", "#2F6B3A", "#A8321E"]} vitesse={0.9} />
        <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre>Réserver un soir</Surtitre>
            <TitreRevele
              texte={"Mardi, *19 h 30.* Frigo ouvert."}
              className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.92] tracking-[-0.03em]"
              classeAccent="text-[#F2C94C]"
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Les séances vont jusqu&apos;à 20 h 30. Un nom, un téléphone, un soir : ni poids, ni
              objectif à écrire. On en parle au cabinet.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/reserver`}>Choisir mon soir</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/90">
              Ou par téléphone : <span className="whitespace-nowrap font-semibold tabular-nums">{cabinet.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}

/**
 * Le haut de chaque page intérieure : un aplat franc (tomate, vert ou jaune), le titre
 * en très grand, et une photo inclinée comme une étiquette collée.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  ton = "tomate",
  titreBalise = "h1",
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  ton?: "tomate" | "vert" | "jaune";
  titreBalise?: "h1" | "p";
}) {
  const styles = {
    tomate: { fond: "bg-[var(--accent)] text-white", accent: "text-[#F2C94C]" },
    vert: { fond: "bg-[var(--sombre)] text-[var(--sur-sombre)]", accent: "text-[#F2C94C]" },
    jaune: { fond: "bg-[#F2C94C] text-[#1F3B24]", accent: "text-[#A8321E]" },
  }[ton];
  return (
    <section className={`relative overflow-hidden ${styles.fond}`}>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3 bg-[repeating-linear-gradient(90deg,currentColor_0_18px,transparent_18px_30px)] opacity-25" />
      <div className={`relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-32 sm:px-8 md:pb-24 md:pt-40 ${photo ? "lg:grid-cols-[1.3fr_0.7fr] lg:items-center" : ""}`}>
        <div className="space-y-7">
          <Apparition><Surtitre ton={ton === "jaune" ? "vert" : "jaune"}>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as={titreBalise}
            auChargement
            texte={titre}
            className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3rem,8vw,7.2rem)] font-bold leading-[0.92] tracking-[-0.03em]"
            classeAccent={styles.accent}
          />
          {children && (
            <Apparition delai={400} className="max-w-2xl text-xl leading-relaxed">
              {children}
            </Apparition>
          )}
        </div>
        {photo && (
          <Apparition de="zoom" delai={250} className="relative mx-auto aspect-[4/5] w-full max-w-[340px] rotate-[3deg] border-[10px] border-white bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="340px" className="object-cover" />
          </Apparition>
        )}
      </div>
    </section>
  );
}
