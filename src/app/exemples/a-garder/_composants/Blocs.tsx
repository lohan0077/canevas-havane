import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, atelier, type Photo } from "./donnees";
import styles from "./Papier.module.css";

/** Le nom, en italique, et le métier en petites capitales. */
export function Marque() {
  return (
    <span className="flex items-baseline gap-2">
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[27px] italic leading-none">À Garder</span>
      <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)] sm:inline">imprimerie</span>
    </span>
  );
}

/** L'intitulé au-dessus d'un titre : un filet rouge, des capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.2em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className={`h-px w-10 ${clair ? "bg-[#F5C76A]" : "bg-[var(--accent)]"}`} />
      {children}
    </p>
  );
}

/** Un bouton-lien. Plein (rouge), contour, ou clair (sur fond sombre). */
export function Bouton({ href, children, variante = "plein", id }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "clair"; id?: string }) {
  const style = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)] shadow-[0_14px_30px_-16px_rgba(194,56,31,.8)]",
    contour: "border-2 border-current",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link id={id} href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-7 py-3 text-[17px] font-bold transition-transform hover:-translate-y-0.5 ${style}`}>
      {children}
      <span aria-hidden="true" className="font-[family-name:var(--titres)] text-xl italic transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le faire-part d'exemple : papier coton, bord déchiré, sur une enveloppe kraft. */
export function FairePart({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className={`absolute inset-0 translate-x-5 translate-y-4 rotate-[7deg] rounded-[6px] ${styles.kraft}`} />
      <div className={`relative rotate-[-4deg] px-7 py-10 text-center text-[#1E2A5A] shadow-[0_24px_40px_-24px_rgba(30,42,90,.6)] ${styles.coton} ${styles.deckle}`}>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em]">Faire-part · exemple</p>
        <p className="mt-4 font-[family-name:var(--titres)] text-5xl italic leading-none">Léa &amp; Tom</p>
        <p className="mt-3 text-sm">se marient</p>
        <p className="font-[family-name:var(--titres)] text-2xl">le 12 juin</p>
        <p aria-hidden="true" className="mx-auto mt-4 h-px w-16 bg-[#C2381F]" />
      </div>
    </div>
  );
}

/** Le menu du restaurant d'en face : aucun vrai restaurant, aucun prix. */
export function MenuResto({ className = "" }: { className?: string }) {
  const plats = [
    ["Entrée", "Velouté de potimarron"],
    ["Plat", "Paleron confit, purée de céleri"],
    ["Dessert", "Tarte fine aux pommes"],
  ];
  return (
    <div className={`mx-auto w-full max-w-[320px] rotate-[2deg] px-7 py-8 text-center text-[#1E2A5A] shadow-[0_30px_50px_-24px_rgba(30,42,90,.55)] ${styles.verge} ${className}`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.24em]">Menu du jour · exemple</p>
      <p className="mt-2 font-[family-name:var(--titres)] text-3xl italic">Restaurant d&apos;exemple</p>
      <p aria-hidden="true" className="mx-auto my-4 h-px w-12 bg-[#1E2A5A]" />
      <ul className="space-y-3">
        {plats.map(([c, p]) => (
          <li key={c}>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em]">{c}</span>
            <span className="block font-[family-name:var(--titres)] text-lg italic">{p}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-dashed border-[rgba(30,42,90,.35)] pt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#B2321C]">Imprimé par À Garder</p>
    </div>
  );
}

/**
 * Le haut de chaque page intérieure. « papier » : le crème de l'atelier, un titre
 * italique immense et une photo posée de biais. « nuit » : la rue le soir, sur le
 * fond vivant, pour les pages des enseignes.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  nuit = false,
  aside,
}: {
  surtitre: string;
  titre: string;
  children?: React.ReactNode;
  photo?: Photo;
  nuit?: boolean;
  aside?: React.ReactNode;
}) {
  return (
    <section
      className={`relative isolate overflow-hidden ${nuit ? "kit-grain bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--fond)]"}`}
    >
      {nuit && (
        <>
          <FondVivant couleurs={["#0F1533", "#1E2A5A", "#7A4A1C"]} vitesse={0.7} />
          <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        </>
      )}
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="space-y-7">
          <Apparition><Surtitre clair={nuit}>{surtitre}</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={titre}
            className="max-w-4xl text-[clamp(3.4rem,9vw,8.5rem)] font-normal italic leading-[0.9] tracking-[-0.035em]"
            classeAccent={nuit ? "not-italic text-[#F5C76A]" : "not-italic text-[var(--accent-texte)]"}
          />
          {children && (
            <Apparition delai={350} className={`max-w-xl text-xl leading-relaxed ${nuit ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
              {children}
            </Apparition>
          )}
        </div>
        {aside ??
          (photo && (
            <Apparition de="rideau" delai={250} className="relative mx-auto aspect-[4/5] w-full max-w-[420px] rotate-[2deg] overflow-hidden rounded-[6px] shadow-[0_40px_80px_-40px_rgba(30,42,90,.7)]">
              <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 420px, 90vw" className="kit-cinema-img object-cover" />
            </Apparition>
          ))}
      </div>
    </section>
  );
}

/** Le dernier écran de chaque page : sur le fond vivant, deux portes d'entrée. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="kit-grain relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#141B3A", "#1E2A5A", "#9A3A22"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/40" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Par la poste, offert</Surtitre>
            <TitreRevele
              texte="Commence par *toucher.*"
              className="text-[clamp(3.4rem,9vw,8rem)] font-normal italic leading-[0.9] tracking-[-0.035em]"
              classeAccent="text-[#F5C76A]"
            />
            <p className="max-w-xl text-xl leading-relaxed">
              Quatre papiers dans une enveloppe, avant ta commande. Et pour ta boutique, ta façade
              avec son enseigne posée dessus, avant qu&apos;on la fabrique.
            </p>
          </div>
          <Apparition delai={200} className="flex flex-col items-start gap-3 lg:items-end">
            <Bouton href={`${DOSSIER}/echantillons`} variante="clair">Recevoir mes échantillons</Bouton>
            <Bouton href={`${DOSSIER}#boutique`} variante="contour">Envoyer ma façade</Bouton>
            <p className="pt-2 text-[15px]">
              Ou à l&apos;atelier : <span className="font-bold">{atelier.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
