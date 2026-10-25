import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, depot } from "./donnees";

// Les pièces communes du site Reviens. : la langue d'un atelier — angles à peine
// arrondis, filets en pointillé comme sur un plan, étiquettes en capitales numérotées.

/** Le monogramme « R » gravé dans un carré brique, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-[8px] bg-[var(--accent)] font-[family-name:var(--titres)] text-[19px] font-black text-[var(--sur-accent)]">
        R
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[20px] font-extrabold uppercase tracking-[-0.02em]">Reviens.</span>
    </span>
  );
}

/** L'étiquette au-dessus d'un titre : un numéro entre crochets, un libellé en capitales. */
export function Surtitre({ children, n, clair = false }: { children: React.ReactNode; n?: string; clair?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-3 font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.2em] ${
        clair ? "text-[#E9D8B4]" : "text-[var(--accent-texte)]"
      }`}
    >
      {n && <span className={`whitespace-nowrap rounded-[4px] border px-1.5 py-0.5 tabular-nums tracking-[0.08em] ${clair ? "border-[#E9D8B4]/60" : "border-[var(--accent-texte)]/50"}`}>{n}</span>}
      {children}
    </p>
  );
}

/** Un bouton-lien rectangulaire, en capitales, avec sa flèche qui avance au survol. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair" | "sombre" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border-2 border-current/40 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    clair: "bg-[#F2EEE6] text-[#1F2B35]",
    sombre: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
  }[variante];
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-13 items-center gap-3 rounded-[10px] px-6 py-3 font-[family-name:var(--titres)] text-[15px] font-extrabold uppercase tracking-[0.06em] transition-transform hover:-translate-y-0.5 ${styles}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le dernier écran de chaque page : le comptoir du samedi soir, sur le fond animé. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[18px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#1F2B35", "#3A4C5A", "#9C3F2C"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div aria-hidden="true" className="absolute inset-4 rounded-[12px] border border-dashed border-[#E9D8B4]/30" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-7 py-24 sm:px-12 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair n="23 h">Le comptoir du samedi soir</Surtitre>
            <TitreRevele
              texte={"Samedi, 22 h. *Le comptoir est ouvert.*"}
              className="font-[family-name:var(--titres)] text-[clamp(2.6rem,6vw,5.4rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]"
              classeAccent="text-[#E9D8B4]"
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">
              Une photo de la plaque, et la pièce t&apos;attend. Ou passe graver ton outil : on te le
              rend à ton prénom.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/en-panne`}>En panne</Bouton>
            <Bouton href={`${DOSSIER}/graver`} variante="contour">Graver mon outil</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]">
              Comptoir : <span className="font-semibold tabular-nums">{depot.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}

/**
 * Le haut de chaque page intérieure : sombre comme l'accueil (l'en-tête flottant
 * l'attend), une photo qui respire derrière le titre si on en donne une, sinon le fond
 * animé ; et le cadre en pointillé de l'atelier.
 */
export function EnTetePage({
  surtitre,
  n,
  titre,
  children,
  photo,
  balise = "h1",
}: {
  surtitre: React.ReactNode;
  n?: string;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  balise?: "h1" | "p";
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo ? (
        <>
          <PhotoCinema src={photo.src} alt="" priority className="opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,43,53,0.55)_0%,rgba(31,43,53,0.75)_55%,rgba(31,43,53,0.96)_100%)]" />
        </>
      ) : (
        <>
          <FondVivant couleurs={["#1F2B35", "#2E3E4B", "#7E3526"]} />
          <div className="absolute inset-0 bg-[var(--sombre)]/50" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-48">
        <Apparition><Surtitre clair n={n}>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as={balise}
          auChargement
          texte={titre}
          className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(2.9rem,7.5vw,7rem)] font-black uppercase leading-[0.9] tracking-[-0.045em]"
          classeAccent="text-[#E9D8B4]"
        />
        {children && (
          <Apparition delai={400} className="max-w-2xl text-xl leading-relaxed text-[var(--sur-sombre)]">
            {children}
          </Apparition>
        )}
      </div>
      <div aria-hidden="true" className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="h-px border-t border-dashed border-[#E9D8B4]/40" />
      </div>
    </section>
  );
}
