import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, maison } from "./donnees";

/** Le cadran aux trois quarts (le quart qui manque, c'est « moins le quart »), et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="h-8 w-8 rounded-full bg-[conic-gradient(var(--accent)_0deg_270deg,transparent_270deg)] ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-transparent" />
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[19px] font-medium tracking-[-0.02em]">Moins le Quart</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : une heure en chiffres fins, ou un mot. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2.5 font-[family-name:var(--titres)] text-[13px] font-medium uppercase tracking-[0.22em] ${clair ? "text-[#E8A24B]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className="h-3 w-3 rounded-full bg-[conic-gradient(currentColor_0deg_270deg,transparent_270deg)]" />
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule, avec sa flèche qui avance au survol. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair" | "encre" }) {
  const styles = {
    plein: "bg-[#E8A24B] text-[#2B1B12]",
    contour: "border border-current/40 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
    encre: "bg-[var(--encre)] text-[var(--fond)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 font-[family-name:var(--titres)] text-[16px] font-medium transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * Le haut de chaque page intérieure : sombre comme l'aube (l'en-tête flottant
 * l'attend), une photo qui respire derrière un voile, et le titre révélé mot à mot.
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
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,27,18,0.55)_0%,rgba(43,27,18,0.72)_55%,rgba(43,27,18,0.96)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#2B1B12", "#7A3E14", "#3E5C76"]} />
          <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-48">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as={balise}
          auChargement
          texte={titre}
          className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3rem,7.5vw,7rem)] font-extralight leading-[0.95] tracking-[-0.045em]"
          classeAccent="font-[family-name:var(--texte)] italic font-normal text-[#E8A24B]"
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

/** Le dernier écran de chaque page : il est bientôt moins le quart, sur le fond animé. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[#14202C] text-[#F2E3C9]">
        <FondVivant couleurs={["#0E1822", "#26384A", "#C8742F"]} />
        <div className="absolute inset-0 bg-[#14202C]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Le comptoir</Surtitre>
            <TitreRevele
              texte="Il est bientôt *moins le quart.*"
              className="font-[family-name:var(--titres)] text-[clamp(3rem,7.5vw,6.8rem)] font-extralight leading-[0.95] tracking-[-0.045em]"
              classeAccent="font-[family-name:var(--texte)] italic font-normal text-[#E8A24B]"
            />
            <p className="max-w-xl text-lg leading-relaxed text-[#F2E3C9]/90">
              Dis comment tu fais ton café : on te donne la mouture, et les deux cafés faits pour ta
              cafetière. Torréfiés mardi, au comptoir dès mercredi 6 h 45.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}#cafetiere`}>{"Tu fais ton café comment ?"}</Bouton>
            <p className="text-[15px] text-[#F2E3C9]/90 lg:text-right">
              {maison.adresse}, {maison.ville}
              <br />
              <span className="font-semibold tabular-nums">{maison.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
