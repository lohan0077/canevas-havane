import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, boutique } from "./donnees";

/** Le « P » sous une voûte de cave, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-10 w-8 place-items-center rounded-t-full rounded-b-[4px] bg-[var(--accent)] pt-1 font-[family-name:var(--titres)] text-lg italic text-[var(--sur-accent)]">
        P
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[22px] italic tracking-[-0.01em]">Patience</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : capitales espacées, un point d'or. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.3em] ${clair ? "text-[#E3B85C]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-[var(--accent)]" />
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule, avec sa flèche qui avance au survol. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair" | "encre" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/40 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
    encre: "bg-[var(--encre)] text-[var(--fond)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 text-[16px] font-semibold transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * Le haut de chaque page intérieure : la cave, sombre (l'en-tête flottant l'attend),
 * une photo qui respire derrière un voile épais, et le titre révélé mot à mot.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  balise = "h1",
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  balise?: "h1" | "p";
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority className="opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,20,14,0.55)_0%,rgba(28,20,14,0.75)_55%,rgba(28,20,14,0.97)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#1C140E", "#3B2A1E", "#8A6420"]} />
          <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-48">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as={balise}
          auChargement
          texte={titre}
          className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.03em]"
          classeAccent="italic text-[#E3B85C]"
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

/** Le dernier écran de chaque page : le plateau à composer, sur le fond animé de la cave. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-t-[3rem] rounded-b-[1.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)] sm:rounded-t-[8rem]">
        <FondVivant couleurs={["#1C140E", "#4A3420", "#B07A22"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Commandé jeudi, prêt samedi</Surtitre>
            <TitreRevele
              texte={"Vous êtes *combien ?*"}
              className="text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[-0.03em]"
              classeAccent="italic text-[#E3B85C]"
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Dis-le, on compose le plateau : les fromages, le poids, le prix par personne. Chacun
              arrive avec sa carte, et son âge.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}#plateau`}>Composer mon plateau</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/90 lg:text-right">
              {boutique.adresse}, {boutique.ville}
              <br />
              <span className="font-semibold tabular-nums">{boutique.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
