import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import { DOSSIER, cabinet } from "./donnees";

/** Le monogramme « ? » dans un rond, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-lg font-bold text-[var(--sur-accent)]">
        ?
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[19px] font-semibold tracking-[-0.02em]">Le Pourquoi</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : une pastille, un point d'accent. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 font-[family-name:var(--titres)] text-[13px] font-medium uppercase tracking-[0.16em] ${
        clair ? "border-white/20 text-[var(--sur-sombre)]" : "border-[var(--trait)] text-[var(--doux)]"
      }`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule, avec sa flèche qui avance au survol. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 font-[family-name:var(--titres)] text-[16px] font-semibold transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le dernier écran de chaque page : les créneaux, sur le fond animé du cabinet. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#132A24", "#2C5248", "#B4593A"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Rendez-vous en ligne</Surtitre>
            <TitreRevele
              texte={"Dès 7\u00a0h. Jusqu'à *20\u00a0h\u00a045.*"}
              className="text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
              classeAccent="font-[family-name:var(--texte)] italic font-normal"
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Un nom, un téléphone, un créneau. On ne vous demande pas pourquoi vous venez : vous le
              direz au cabinet.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/rendez-vous`}>Choisir un créneau</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/85">
              Ou par téléphone : <span className="font-semibold tabular-nums">{cabinet.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}

/**
 * Le haut de chaque page intérieure : sombre, comme l'accueil (l'en-tête flottant
 * l'attend), avec une photo qui respire derrière le titre si on en donne une.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority className="opacity-60" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,42,36,0.45)_0%,rgba(19,42,36,0.7)_55%,rgba(19,42,36,0.95)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#132A24", "#21463D", "#7A3B22"]} />
          <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-48">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as="h1"
          auChargement
          texte={titre}
          className="max-w-5xl text-[clamp(3.2rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
          classeAccent="font-[family-name:var(--texte)] italic font-normal text-[#F0A07A]"
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
