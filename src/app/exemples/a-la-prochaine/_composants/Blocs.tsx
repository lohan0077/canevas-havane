import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, PROCHAINE, entreprise } from "./donnees";

/** Un anneau d'or, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="h-7 w-7 rounded-full border-[5px] border-[#C9A86A] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]" />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[23px] leading-none">À la Prochaine</span>
    </span>
  );
}

/** Le petit libellé au-dessus d'un titre : capitales espacées, entre crochets. */
export function Libelle({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`text-[12px] font-semibold uppercase tracking-[0.24em] ${clair ? "text-[#C9A86A]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true">[ </span>
      {children}
      <span aria-hidden="true"> ]</span>
    </p>
  );
}

/** Un bouton-lien à angles droits, sa flèche dans un carré d'or. */
export function Bouton({ href, children, variante = "encre" }: { href: string; children: React.ReactNode; variante?: "encre" | "clair" | "contour" }) {
  const styles = {
    encre: "bg-[var(--encre)] text-[var(--fond)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
    contour: "border border-current/40",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-stretch text-[13px] font-semibold uppercase tracking-[0.16em] ${styles}`}>
      <span className="flex items-center px-6">{children}</span>
      <span aria-hidden="true" className="grid w-13 place-items-center bg-[var(--accent)] text-lg text-[var(--sur-accent)] transition-[width] duration-300 group-hover:w-16">→</span>
    </Link>
  );
}

/** Le dernier écran de chaque page : la sortie du vendredi, sur le fond animé de l'écrin. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#152B26", "#24463D", "#8C6D2E"]} vitesse={0.8} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div aria-hidden="true" className="absolute inset-4 border border-[#C9A86A]/40 sm:inset-6" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-8 py-24 sm:px-12 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Libelle clair>La prochaine sortie</Libelle>
            <TitreRevele
              texte={`${PROCHAINE.date.replace("vendredi", "Vendredi")}, *${PROCHAINE.heure}.*`}
              className="font-[family-name:var(--titres)] text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.02em]"
              classeAccent="italic text-[#C9A86A]"
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Six pièces, les n° {PROCHAINE.numeros}, encore à l&apos;établi. Une de chaque. Les abonnées à la lettre les
              voient à 17 h.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}#vendredi`} variante="clair">La sortie du vendredi</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/90">
              Ou à l&apos;atelier : <span className="font-semibold tabular-nums">{entreprise.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}

/**
 * Le haut de chaque page intérieure : l'écrin vert, le fond animé ou une photo qui
 * respire, un titre immense. `titreEnParagraphe` : quand la page a déjà son h1.
 */
export function EnTetePage({
  libelle,
  titre,
  children,
  photo,
  titreEnParagraphe = false,
}: {
  libelle: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  titreEnParagraphe?: boolean;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority className="opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,43,38,0.55)_0%,rgba(21,43,38,0.75)_55%,rgba(21,43,38,0.96)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#152B26", "#1F3D35", "#6E5524"]} vitesse={0.7} />
          <div className="absolute inset-0 bg-[var(--sombre)]/55" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-48">
        <Apparition><Libelle clair>{libelle}</Libelle></Apparition>
        <TitreRevele
          as={titreEnParagraphe ? "p" : "h1"}
          auChargement
          texte={titre}
          className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3.4rem,8.5vw,8rem)] leading-[0.92] tracking-[-0.02em]"
          classeAccent="italic text-[#C9A86A]"
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
