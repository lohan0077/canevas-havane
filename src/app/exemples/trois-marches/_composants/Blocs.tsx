import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import MotGeant from "../../_kit/MotGeant";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, NAVIGATION, agence, euros, pourcent, prixHonorairesInclus, type Classe, type Maison, type Photo } from "./donnees";

/** La feuille de la marque : trois traits, comme trois marches. Décoratif. */
export function Marches({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 18" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 4 H24 M8 9 H28 M4 14 H32" />
    </svg>
  );
}

/* ---------- Classes énergie et climat (CCH L126-33) ---------- */

const LETTRES: Classe[] = ["A", "B", "C", "D", "E", "F", "G"];
const ENERGIE: Record<Classe, [string, string]> = {
  A: ["#009C6D", "#111111"], B: ["#52B153", "#111111"], C: ["#78BD76", "#111111"], D: ["#F4E70F", "#111111"],
  E: ["#F0B50F", "#111111"], F: ["#EB8235", "#111111"], G: ["#D7221F", "#FFFFFF"],
};
const CLIMAT: Record<Classe, [string, string]> = {
  A: ["#A3DBF8", "#111111"], B: ["#8DB5D4", "#111111"], C: ["#7893B2", "#111111"], D: ["#637290", "#FFFFFF"],
  E: ["#4F5370", "#FFFFFF"], F: ["#3B3651", "#FFFFFF"], G: ["#281B35", "#FFFFFF"],
};

/** Une échelle de A à G en couleur, en escalier : la classe du logement sort du rang. */
export function Echelle({ genre, classe }: { genre: "energie" | "climat"; classe: Classe }) {
  const couleurs = genre === "energie" ? ENERGIE : CLIMAT;
  return (
    <figure className="space-y-2">
      <figcaption className="text-[13px] font-semibold">
        {genre === "energie" ? "Classe énergie" : "Classe climat"} : {classe}
      </figcaption>
      <div className="flex items-end gap-1" aria-hidden="true">
        {LETTRES.map((l, i) => {
          const [fond, encre] = couleurs[l];
          const elle = l === classe;
          return (
            <span
              key={l}
              className={`flex flex-1 items-start justify-center rounded-t-[4px] pt-1 text-[12px] font-bold ${elle ? "outline outline-2 outline-offset-2 outline-[var(--encre)]" : ""}`}
              style={{ background: fond, color: encre, height: `${18 + i * 4 + (elle ? 14 : 0)}px` }}
            >
              {l}
            </span>
          );
        })}
      </div>
    </figure>
  );
}

/** Ce que l'arrêté du 10/01/2017 impose sur l'annonce : prix honoraires inclus en plus gros, le reste en dessous. */
export function PrixMaison({ maison, grand = false }: { maison: Maison; grand?: boolean }) {
  return (
    <div className="space-y-1.5">
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className={`font-[family-name:var(--titres)] leading-none tabular-nums ${grand ? "text-[50px]" : "text-[34px]"}`}>{euros(prixHonorairesInclus(maison))}</span>
        <span className="text-[14px] font-semibold">honoraires inclus</span>
      </p>
      <p className="text-[15px] tabular-nums">{euros(maison.horsHonoraires)} hors honoraires</p>
      <p className="text-[15px] font-semibold">Honoraires : {pourcent(maison.taux)} TTC à la charge de l&apos;acquéreur</p>
    </div>
  );
}

export function Depenses({ maison }: { maison: Maison }) {
  return (
    <p className="text-[14px] leading-relaxed">
      Montant estimé des dépenses annuelles d&apos;énergie pour un usage standard : entre {euros(maison.depenses[0])} et{" "}
      {euros(maison.depenses[1])} par an. Année de référence des prix de l&apos;énergie : 2025.
    </p>
  );
}

/** Une maison en vignette : l'histoire d'abord, le prix légal ensuite. */
export function CarteMaison({ maison }: { maison: Maison }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_30px_60px_-45px_rgba(62,58,54,0.6)]">
      <div className="relative aspect-[4/5] overflow-hidden border-b border-[var(--trait)]">
        <Image src={maison.photo.src} alt={maison.photo.alt} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]" />
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--carte)] px-3 py-1 text-[12px] font-semibold">Annonce : exemple</span>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <blockquote className="space-y-2">
          <p className="font-[family-name:var(--titres)] text-[24px] italic leading-snug">«&nbsp;{maison.histoire.citation}&nbsp;»</p>
          <footer className="text-[14px] text-[var(--doux)]">{maison.histoire.auteur} · exemple</footer>
        </blockquote>
        <div className="space-y-4 border-t border-[var(--trait)] pt-5">
          <h3 className="text-[22px] font-normal">{maison.titre} · {maison.surface}&nbsp;m²</h3>
          <PrixMaison maison={maison} />
          <div className="grid grid-cols-2 gap-4">
            <Echelle genre="energie" classe={maison.energie} />
            <Echelle genre="climat" classe={maison.climat} />
          </div>
          <p className="text-[14px] text-[var(--doux)]">Énergie estimée : {euros(maison.depenses[0])} à {euros(maison.depenses[1])} par an (prix 2025).</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-semibold">
          <Link href={`${DOSSIER}/maisons/${maison.slug}`} className="underline decoration-[var(--accent)] underline-offset-[6px]">Lire son histoire</Link>
          <Link href={`${DOSSIER}/bareme`} className="underline decoration-[var(--trait)] underline-offset-[6px]">Notre barème</Link>
        </div>
      </div>
    </article>
  );
}

/** Les mentions du décret n° 72-678 (art. 92 à 94), toutes d'exemple. */
export function MentionsAgence() {
  return (
    <div className="space-y-1.5 text-[14px] leading-relaxed">
      <p>{agence.nom}, agence immobilière · {agence.adresse} (exemple).</p>
      <p>
        Carte professionnelle « Transactions sur immeubles et fonds de commerce » n°&nbsp;{agence.carte.replace(/ /g, " ")}, délivrée par la {agence.cci} (exemple).
      </p>
      <p>Garant : {agence.garant} (exemple).</p>
      <p>
        <Link href={`${DOSSIER}/bareme`} className="font-semibold underline underline-offset-4">Barème d&apos;honoraires</Link> en ligne, en vitrine et à l&apos;entrée de l&apos;agence.
      </p>
    </div>
  );
}

/** Le monogramme « III » dans un rond, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current font-[family-name:var(--titres)] text-[14px] tracking-[0.1em]">III</span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[22px]">Trois Marches</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : les trois marches, des petites capitales. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.28em] ${clair ? "text-[#F2C3A6]" : "text-[var(--accent-texte)]"}`}>
      <Marches className={`h-3.5 w-8 ${clair ? "text-[#E8A27C]" : "text-[var(--accent)]"}`} />
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule, petites capitales. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "encre" | "contour" | "clair" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    encre: "bg-[var(--encre)] text-[var(--fond)]",
    contour: "border border-current/40 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[#F7F2E8] text-[#3E3A36]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-7 py-3 text-[14px] font-semibold uppercase tracking-[0.16em] transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Classes des grands titres : Playfair, l'italique en relief. */
export const TITRE = "font-normal leading-[0.96] tracking-[-0.02em]";
export const ACCENT = "italic text-[var(--accent-texte)]";
export const ACCENT_CLAIR = "italic text-[#F2C3A6]";

/** Une photo dans une arche, comme une porte ou une fenêtre haute. */
export function Arche({ photo, className = "", priority = false, sizes = "(min-width: 1024px) 40vw, 100vw" }: { photo: Photo; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-t-[999px] ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill priority={priority} sizes={sizes} className="kit-cinema-img object-cover" />
    </div>
  );
}

/** Le haut de chaque page intérieure : un titre très grand sur le papier, une photo dans une arche. */
export function EnTetePage({ surtitre, titre, children, photo, aCote }: { surtitre: string; titre: string; children?: React.ReactNode; photo?: Photo; aCote?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--trait)]">
      <div className="mx-auto grid grid-cols-1 max-w-7xl gap-12 px-5 pb-16 pt-32 sm:px-8 md:pb-20 md:pt-40 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-7">
          <Apparition><Surtitre>{surtitre}</Surtitre></Apparition>
          <TitreRevele as="h1" auChargement texte={titre} className={`max-w-4xl text-[clamp(3.2rem,8vw,7.4rem)] ${TITRE}`} classeAccent={ACCENT} />
          {children && (
            <Apparition delai={350} className="max-w-2xl text-[19px] leading-relaxed text-[var(--doux)]">
              {children}
            </Apparition>
          )}
        </div>
        {aCote ?? (photo && (
          <Apparition de="rideau" delai={200}>
            <Arche photo={photo} priority className="mx-auto aspect-[3/4] w-full max-w-[380px]" />
          </Apparition>
        ))}
      </div>
    </section>
  );
}

/** Le dernier écran : la phrase de la marque, sur le fond vivant, et l'estimation. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[#3E3A36] text-[#F7F2E8]">
        <FondVivant couleurs={["#2E2B28", "#5A4636", "#B4532C"]} vitesse={0.7} />
        <div className="absolute inset-0 bg-[#3E3A36]/50" />
        <div className="relative mx-auto grid grid-cols-1 max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-7">
            <Surtitre clair>Vous vendez</Surtitre>
            <TitreRevele texte="Une agence ne vend pas des murs. *Elle vend ce qu'on y a vécu.*" className={`text-[clamp(2.8rem,6.4vw,6rem)] ${TITRE}`} classeAccent={ACCENT_CLAIR} />
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}/estimation`} variante="clair">Faire estimer ma maison</Bouton>
            <p className="text-[15px] text-[#F7F2E8]/90">Ou par téléphone : <span className="font-semibold tabular-nums">{agence.telephone}</span></p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}

/** Le pied de chaque page : les mentions de l'agence, ses pages, et le nom en grand. */
export function Pied() {
  return (
    <footer className="overflow-hidden bg-[#3E3A36] text-[#F7F2E8]">
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-[1fr_1.3fr_0.7fr]">
        <div className="space-y-3">
          <Marque />
          <p className="font-[family-name:var(--titres)] text-[19px] italic text-[#F2C3A6]">Chaque maison a son histoire.</p>
          <p className="text-[15px] tabular-nums">{agence.telephone} <span className="text-[#F7F2E8]/90">· numéro de fiction</span></p>
        </div>
        <div className="text-[#F7F2E8]/90 [&_a]:text-[#F7F2E8]">
          <MentionsAgence />
        </div>
        <ul className="space-y-2 text-[15px] font-semibold">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/estimation`, libelle: "Faire estimer" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Trois Marches" chasse={1.85} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[#E8A27C]" />
    </footer>
  );
}
