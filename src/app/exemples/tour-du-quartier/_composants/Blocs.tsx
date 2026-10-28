import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import Velo from "./Velo";
import { DOSSIER, entreprise, euros, type Occasion } from "./donnees";

// Les pièces communes de Tour du Quartier : des formes douces — pastilles, grands
// arrondis, ronds de couleur —, le vert du parc, le jaune d'un mur au soleil, et
// Unbounded, large et franche, pour les titres.

/** Le monogramme « TQ » dans un rond jaune, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[#F2C14E] font-[family-name:var(--titres)] text-[13px] font-bold text-[#1F3A2C]">
        TQ
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[16px] font-semibold tracking-[-0.02em]">Tour du Quartier</span>
    </span>
  );
}

/** Une pastille : un rond de couleur et un libellé. */
export function Pastille({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[14px] font-semibold ${
        clair ? "text-[var(--sur-sombre)] ring-1 ring-white/30" : "bg-[#FCEFD3] text-[var(--encre)]"
      }`}
    >
      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#E8553D]" />
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule, bien rond. */
export function Bouton({ href, children, variante = "jaune" }: { href: string; children: React.ReactNode; variante?: "jaune" | "vert" | "contour" | "creme" }) {
  const styles = {
    jaune: "bg-[#F2C14E] text-[#1F3A2C]",
    vert: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
    contour: "border-2 border-current/40 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    creme: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-14 items-center gap-3 rounded-full px-7 py-3 text-[17px] font-bold transition-transform hover:-translate-y-0.5 ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Un vélo d'occasion dans une liste : dessin, nom, batterie testée, prix d'exemple. */
export function CarteOccasion({ o }: { o: Occasion }) {
  return (
    <Link href={`${DOSSIER}/occasion/${o.id}`} data-occasion={o.id} className="group block overflow-hidden rounded-[32px] bg-[var(--carte)] shadow-[0_24px_50px_-34px_rgba(31,58,44,0.6)]">
      <span className="block bg-[#E3EFD9] p-5">
        <Velo couleur={o.couleur} batterie={!!o.batterie} roues="#1F3A2C" className="mx-auto h-24 w-auto transition-transform duration-500 group-hover:-translate-y-1" />
      </span>
      <span className="block space-y-1 p-5">
        <span className="block font-[family-name:var(--titres)] text-[18px] font-semibold leading-tight">{o.nom}</span>
        <span className="block text-[14px] text-[var(--doux)]">{o.annee} · {o.km.toLocaleString("fr-FR")} km · taille {o.taille.split(" ·")[0]}</span>
        <span className="flex items-center justify-between gap-3 pt-2">
          <span className="rounded-full bg-[var(--sombre)] px-3 py-1 text-[13px] font-bold text-[#F2C14E]">{o.batterie ? `Batterie ${o.batterie.capacite} %` : "Sans batterie"}</span>
          <span className="font-[family-name:var(--titres)] text-[18px] font-semibold tabular-nums">{euros(o.prix)}</span>
        </span>
      </span>
    </Link>
  );
}

/** Le dernier écran de chaque page : l'affiche du lancement, sur le fond animé du parc. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[40px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#1F4A36", "#2E6B4F", "#C9962E"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div className="space-y-6">
            <Pastille clair>L&apos;affiche du lancement</Pastille>
            <TitreRevele
              texte="Pas de cuissard. *Pas de chrono.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,6.4vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.04em]"
              classeAccent="text-[#F2C14E]"
            />
            <p className="max-w-xl text-lg leading-relaxed">
              La première heure est offerte, sur le parking, vélo et casque prêtés. Et le jour où tu
              y retournes pour de bon, on essaie ton vrai trajet.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/premiere-heure`}>Ma première heure</Bouton>
            <Bouton href={`${DOSSIER}/lundi-matin`} variante="contour">Mon trajet de lundi</Bouton>
            <p className="text-[15px]">
              Ou au magasin : <span className="font-semibold tabular-nums">{entreprise.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}

/**
 * Le haut de chaque page intérieure : vert sombre, comme l'accueil (l'en-tête flottant
 * l'attend), une photo qui respire derrière, et un grand titre.
 */
export function EnTetePage({
  pastille,
  titre,
  children,
  photo,
  balise = "h1",
}: {
  pastille: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  balise?: "h1" | "p";
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority className="opacity-60" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,74,54,0.5)_0%,rgba(31,74,54,0.78)_55%,rgba(31,74,54,0.97)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#1F4A36", "#2A5E45", "#8C6A1E"]} />
          <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-48">
        <Apparition><Pastille clair>{pastille}</Pastille></Apparition>
        <TitreRevele
          as={balise}
          auChargement
          texte={titre}
          className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(2.4rem,6.6vw,6rem)] font-bold leading-[0.98] tracking-[-0.045em]"
          classeAccent="text-[#F2C14E]"
        />
        {children && (
          <Apparition delai={400} className="max-w-2xl text-xl leading-relaxed">
            {children}
          </Apparition>
        )}
      </div>
    </section>
  );
}
