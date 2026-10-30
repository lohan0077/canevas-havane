import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import { DOSSIER, entreprise, type Menu, type Plat, type Photo, type Question } from "./donnees";

/** La porcelaine teintée des encarts (la page du cahier, les rappels) : un rose à peine gris. */
export const TEINTE = "bg-[#EEE6E6]";

/** Le voile d'aubergine posé sur les photos, du haut vers le bas. */
export const VOILE_HAUT_BAS = "bg-[linear-gradient(180deg,rgba(31,16,25,0.62)_0%,rgba(31,16,25,0.45)_40%,rgba(31,16,25,0.95)_100%)]";

/** Le nom : un « T » de DM Serif dans un rond de cuivre, et Transmis en italique. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] pb-0.5 font-[family-name:var(--titres)] text-[21px] italic text-[var(--sur-accent)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]">T</span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[24px] italic leading-none">Transmis</span>
    </span>
  );
}

/** Une petite ligne au-dessus d'un titre, quand elle apprend quelque chose : en casse normale. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`text-[15px] leading-snug ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule : plein (le cuivre) ou au trait fin. */
export function Bouton({ href, children, variante = "plein", className = "" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour"; className?: string }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
  }[variante];
  return (
    <Link href={href} className={`inline-flex h-12 items-center gap-3 rounded-full px-6 text-[15px] font-medium transition-colors ${styles} ${className}`}>
      {children}
    </Link>
  );
}

/**
 * Le titre d'un écran : DM Serif Display d'un seul tenant, sans mot mis en relief.
 * Toujours la même échelle, jamais en gras.
 */
export function Titre({
  texte,
  taille = "grand",
  as: Balise = "h2",
  className = "",
}: {
  texte: string;
  /** Sur fond sombre : le titre prend simplement la couleur de sa section. */
  clair?: boolean;
  taille?: "grand" | "moyen";
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  const tailles = {
    grand: "text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.05]",
    moyen: "text-[clamp(1.9rem,3.2vw,2.75rem)] leading-[1.1]",
  }[taille];
  return (
    <Balise className={`font-[family-name:var(--titres)] font-normal tracking-[-0.008em] text-balance ${tailles} ${className}`}>
      {sansCesure(texte)}
    </Balise>
  );
}

/** « grand-mère », « pot-au-feu » : un mot composé ne se coupe pas à son trait d'union, en bout de ligne. */
export function sansCesure(texte: string) {
  return texte.split(/(\S+-\S+)/).map((morceau, i) =>
    i % 2 ? <span key={i} className="whitespace-nowrap">{morceau}</span> : morceau,
  );
}

/** Le haut d'un écran de l'accueil : un titre, une phrase. Toujours le même gabarit. */
export function Intitule({ titre, texte, clair = false }: { titre: string; texte?: React.ReactNode; clair?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
      <Titre texte={titre} clair={clair} />
      {texte && (
        <p className={`text-lg leading-relaxed ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
          {texte}
        </p>
      )}
    </div>
  );
}

/**
 * Le haut de chaque page intérieure : sombre, comme l'accueil (l'en-tête flottant
 * l'attend), une photo sous un voile d'aubergine, un titre fin en très grand.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  niveau: Niveau = "h1",
  origine,
}: {
  surtitre?: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo?: Photo;
  niveau?: "h1" | "p";
  origine?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[64svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo && (
        <>
          <Image src={photo.src} alt="" fill preload loading="eager" sizes="100vw" className="object-cover opacity-60" style={{ objectPosition: origine ?? photo.centre ?? "50% 50%" }} />
          <div className={`absolute inset-0 ${VOILE_HAUT_BAS}`} />
        </>
      )}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-14 pt-36 md:pb-20">
        {surtitre && <Surtitre clair>{surtitre}</Surtitre>}
        <Niveau className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.75rem,6vw,5.25rem)] font-normal leading-[1.02] tracking-[-0.01em] text-balance">
          {sansCesure(titre)}
        </Niveau>
        {children && <div className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">{children}</div>}
      </div>
    </section>
  );
}

/** Une section de page, bornée et aérée. */
export function Section({ children, id, className = "", fond = "" }: { children: React.ReactNode; id?: string; className?: string; fond?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 ${fond}`}>
      <div className={`mx-auto max-w-6xl px-6 py-28 md:py-40 ${className}`}>{children}</div>
    </section>
  );
}

export function Allergenes({ liste }: { liste: string[] }) {
  return (
    <p className="text-[13px] leading-relaxed text-[var(--doux)]">
      <span className="font-medium text-[var(--encre)]">Allergènes&nbsp;: </span>
      {liste.length ? liste.join(", ") : "aucun des quatorze"}
    </p>
  );
}

/** Le menu en trois cartes : entrée, le plat de ta famille, dessert, et leurs allergènes. */
export function CartesMenu({ menu, empile = false }: { menu: Menu; empile?: boolean }) {
  const plats: [string, Plat, boolean][] = [["Entrée", menu.entree, false], ["Le plat de ta famille", menu.plat, true], ["Dessert", menu.dessert, false]];
  return (
    <ol className={`grid gap-3 ${empile ? "" : "md:grid-cols-3"}`}>
      {plats.map(([titre, p, famille], i) => (
        <Apparition as="li" key={titre} delai={i * 120} className={`flex flex-col gap-2 rounded-2xl border text-[var(--encre)] ${empile ? "p-5" : "p-6"} ${famille ? "border-[var(--accent)] bg-[#FBF4F0]" : "border-[var(--trait)] bg-[var(--carte)]"}`}>
          <p className={`text-[15px] font-medium ${famille ? "text-[var(--accent-texte)]" : "text-[var(--doux)]"}`}>{titre}</p>
          <h3 className="font-[family-name:var(--titres)] text-[24px] font-normal leading-tight">{p.nom}</h3>
          <p className="leading-relaxed text-[var(--doux)]">{p.detail}</p>
          <div className="mt-auto pt-2">
            <Allergenes liste={p.allergenes} />
          </div>
        </Apparition>
      ))}
    </ol>
  );
}

export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="kit-accordeon group">
            <summary className="flex items-center justify-between gap-4 py-5 font-[family-name:var(--titres)] text-[22px] leading-snug">
              {x.q}
              <span aria-hidden="true" className="kit-plus grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--trait)] text-lg">+</span>
            </summary>
            <p className="pb-5 pr-8 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

/** Le dernier écran de chaque page : clair et centré — viens goûter. */
export function AppelFinal() {
  return (
    <section className="border-t border-[var(--trait)]">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-28 text-center md:py-36">
        <Titre texte="Ta grand-mère a une recette ? Viens la goûter." className="mx-auto" />
        <Apparition as="p" delai={150} className="mx-auto max-w-lg text-lg leading-relaxed text-[var(--doux)]">
          On la sert à cent vingt. La dégustation se réserve en ligne, comme une table au restaurant&nbsp;: un samedi, une
          heure, pour deux.
        </Apparition>
        <Apparition delai={250} className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            <Bouton href={`${DOSSIER}/degustation`}>Réserver une dégustation</Bouton>
            <Bouton href={`${DOSSIER}#recette`} variante="contour">Envoyer ma recette</Bouton>
          </div>
          <p className="text-[15px] text-[var(--doux)]">
            Ou par téléphone : <span className="whitespace-nowrap font-medium tabular-nums text-[var(--encre)]">{entreprise.telephone}</span>
          </p>
        </Apparition>
      </div>
    </section>
  );
}
