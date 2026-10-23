import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, RECETTES, entreprise, type Menu, type Plat, type Question } from "./donnees";

/** Le nom : un « T » dans un rond de sauce tomate, et Transmis en italique. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-[20px] italic text-[var(--sur-accent)]">T</span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[24px] italic leading-none">Transmis</span>
    </span>
  );
}

/** Une note manuscrite, à l'encre bleue, dans la marge. */
export function Note({ children, className = "", clair = false }: { children: React.ReactNode; className?: string; clair?: boolean }) {
  return (
    <p className={`origin-left -rotate-2 font-[family-name:var(--f-caveat)] text-[28px] leading-tight ${clair ? "text-[#E9C46A]" : "text-[#1E3A6E]"} ${className}`}>
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule, sauce tomate, au trait ou crème. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "trait" | "creme" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    trait: "border border-current/40 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    creme: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 text-[16px] font-semibold transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** L'italique de Playfair, sauce tomate sur la crème, moutarde sur le vert. */
export const SAUCE = "italic text-[var(--accent-texte)]";
export const MOUTARDE = "italic text-[#E9C46A]";

/** Une photo posée comme un tirage : un bord blanc, de travers. */
export function Tirage({ photo, angle = -2, className = "", sizes = "320px" }: { photo: { src: string; alt: string }; angle?: number; className?: string; sizes?: string }) {
  return (
    <figure className={`bg-white p-2.5 pb-8 shadow-[0_30px_50px_-28px_rgba(31,59,45,.75)] ${className}`} style={{ rotate: `${angle}deg` }}>
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
      </div>
    </figure>
  );
}

/**
 * Les fiches de recettes en éventail : chacune un plat, un prénom, une année. Dessinées ;
 * les prénoms sont inventés. Décor : masqué aux lecteurs d'écran, la liste qui suit dit
 * la même chose en texte.
 */
export function Eventail() {
  const n = RECETTES.length;
  return (
    <div aria-hidden="true" className="relative mx-auto h-[220px] w-full max-w-4xl overflow-hidden sm:h-[300px]">
      {RECETTES.map((r, i) => {
        const k = i - (n - 1) / 2;
        return (
          <Apparition
            key={r.plat}
            de="flou"
            delai={500 + Math.abs(k) * 120}
            className="absolute bottom-0 left-1/2 w-[112px] origin-bottom rounded-[6px] border border-[var(--trait)] bg-[#FFFCF3] px-3 py-3 shadow-[0_16px_30px_-18px_rgba(31,59,45,.6)] [transform:translateX(-50%)_translateX(calc(var(--k)*22px))_rotate(calc(var(--k)*6deg))] sm:w-[180px] sm:[transform:translateX(-50%)_translateX(calc(var(--k)*44px))_rotate(calc(var(--k)*9deg))]"
            style={{ "--k": k, zIndex: 10 - Math.abs(Math.round(k)) } as React.CSSProperties}
          >
            <p className="font-[family-name:var(--f-caveat)] text-[19px] leading-tight text-[#1E3A6E] sm:text-[26px]">{r.plat}</p>
            <p className="font-[family-name:var(--f-caveat)] text-[15px] text-[#4E5F54] sm:text-[19px]">de {r.de}, {r.annee}</p>
            <div className="mt-2 space-y-[7px]">
              {[0, 1, 2, 3, 4].map((l) => <span key={l} className="block h-px bg-[#C9D6E3]" />)}
            </div>
            <div className="mt-2 h-[60px] sm:h-[120px]" />
          </Apparition>
        );
      })}
    </div>
  );
}

export function Allergenes({ liste }: { liste: string[] }) {
  return (
    <p className="text-[13px] leading-relaxed text-[var(--doux)]">
      <span className="font-semibold text-[var(--encre)]">Allergènes&nbsp;: </span>
      {liste.length ? liste.join(", ") : "aucun des quatorze"}
    </p>
  );
}

/**
 * Le menu en trois cartes hautes, l'intitulé couché le long du bord (entrée, le plat de
 * ta famille, dessert), le plat, sa description, ses allergènes.
 */
export function CartesMenu({ menu }: { menu: Menu }) {
  const plats: [string, Plat, boolean][] = [["entrée", menu.entree, false], ["ta famille", menu.plat, true], ["dessert", menu.dessert, false]];
  return (
    <ol className="grid gap-3 md:grid-cols-3">
      {plats.map(([titre, p, famille], i) => (
        <Apparition as="li" key={titre} delai={i * 120} de="zoom" className={`relative flex min-h-[230px] overflow-hidden rounded-[22px] border ${famille ? "border-[var(--accent)] bg-[#FFFCF3]" : "border-[var(--trait)] bg-[var(--carte)]"}`}>
          <p aria-hidden="true" className="flex w-14 shrink-0 rotate-180 items-center justify-center border-r border-[var(--trait)] font-[family-name:var(--titres)] text-[26px] italic text-[var(--accent-texte)] [writing-mode:vertical-rl]">
            {titre}
          </p>
          <div className="flex flex-col gap-2 p-5">
            <p className="sr-only">{famille ? "Le plat de ta famille" : titre}</p>
            {famille && <p className="font-[family-name:var(--f-caveat)] text-[22px] leading-none text-[#1E3A6E]">le plat de ta famille</p>}
            <h3 className="font-[family-name:var(--titres)] text-[25px] font-normal leading-tight">{p.nom}</h3>
            <p className="leading-relaxed text-[var(--doux)]">{p.detail}</p>
            <div className="mt-auto pt-2">
              <Allergenes liste={p.allergenes} />
            </div>
          </div>
        </Apparition>
      ))}
    </ol>
  );
}

/**
 * Le haut de chaque page intérieure : sur le papier, un grand titre révélé, une note dans
 * la marge, et à droite une photo posée comme un tirage.
 */
export function EnTetePage({
  note,
  titre,
  children,
  photo,
  niveau = "h1",
}: {
  note: string;
  titre: string;
  children?: React.ReactNode;
  photo?: { src: string; alt: string };
  niveau?: "h1" | "p";
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--trait)] bg-[var(--fond)] [background-image:repeating-linear-gradient(180deg,transparent_0_39px,rgba(201,214,227,.45)_39px_40px)]">
      <div aria-hidden="true" className="absolute inset-y-0 left-[8%] hidden w-px bg-[#E3A39A] md:block" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-44 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div className="space-y-6">
          <Apparition><Note>{note}</Note></Apparition>
          <TitreRevele
            as={niveau}
            auChargement
            texte={titre}
            className="font-[family-name:var(--titres)] text-[clamp(3.4rem,8vw,7.4rem)] font-normal leading-[0.95] tracking-[-0.02em]"
            classeAccent={SAUCE}
          />
          {children && (
            <Apparition delai={450} className="max-w-2xl text-lg leading-relaxed text-[var(--doux)] md:text-xl">
              {children}
            </Apparition>
          )}
        </div>
        {photo && (
          <Apparition de="droite" delai={300} className="mx-auto hidden w-full max-w-[300px] [clip-path:none] lg:block">
            <Tirage photo={photo} angle={3} />
          </Apparition>
        )}
      </div>
    </section>
  );
}

export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="kit-accordeon group">
            <summary className="flex items-center justify-between gap-4 py-5 font-[family-name:var(--titres)] text-[22px] italic leading-snug">
              {x.q}
              <span aria-hidden="true" className="kit-plus font-[family-name:var(--f-caveat)] text-[34px] not-italic text-[var(--accent-texte)]">+</span>
            </summary>
            <p className="pb-5 pr-8 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

/** Le dernier écran de chaque page : l'affiche du lancement, sur le fond animé de la cuisine. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="kit-grain relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#16291F", "#2E5440", "#A8442E"]} />
        <div className="absolute inset-0 bg-[#16291F]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Note clair>Notre affiche de lancement</Note>
            <TitreRevele
              texte={"Ta grand-mère a une *recette ?*"}
              className="font-[family-name:var(--titres)] text-[clamp(3rem,8vw,7rem)] font-normal leading-[0.95] tracking-[-0.02em]"
              classeAccent={MOUTARDE}
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              On la sert à cent vingt. Envoie la page du cahier, telle qu&apos;elle est&nbsp;: on la refait en cuisine, et tu viens goûter.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}#recette`}>Envoyer ma recette</Bouton>
            <Bouton href={`${DOSSIER}/degustation`} variante="creme">Réserver une dégustation</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/90">
              Ou par téléphone : <span className="font-semibold tabular-nums">{entreprise.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
