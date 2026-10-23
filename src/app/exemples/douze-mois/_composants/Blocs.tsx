import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, boutique } from "./donnees";

// La langue visuelle de Douze Mois : un herbier de musée. Le romain et l'italique de
// Bodoni, des légendes en petites capitales (« Fig. 02 »), des photos en arche, des
// filets d'un pixel, et des boutons droits comme des étiquettes de spécimen.

/** Le monogramme « 12 » dans un cercle, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full border border-current font-[family-name:var(--titres)] text-[15px] italic leading-none">
        12
      </span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] leading-none tracking-[-0.01em]">
        Douze <span className="italic">Mois</span>
      </span>
    </span>
  );
}

/** La légende au-dessus d'un titre : un numéro de planche, un filet, un intitulé. */
export function Surtitre({ children, n, clair = false }: { children: React.ReactNode; n?: string; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.24em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      {n && <span className="font-[family-name:var(--titres)] text-[15px] normal-case italic tracking-normal">N° {n}</span>}
      <span aria-hidden="true" className={`h-px w-10 ${clair ? "bg-[var(--sur-sombre)]/50" : "bg-[var(--encre)]/40"}`} />
      {children}
    </p>
  );
}

/** Un bouton-lien droit, en petites capitales, avec sa flèche. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" | "encre" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)] border-[var(--accent)]",
    contour: "border-current/40 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    encre: "bg-[var(--encre)] text-[var(--fond)] border-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-4 border px-6 py-3 text-[13px] font-bold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/**
 * Une photo en arche, qui respire : la forme des planches de Douze Mois. Tout en
 * `span` et `img`, pour se poser au milieu d'un titre.
 */
export function Arche({ src, className = "", origine = "50% 45%" }: { src: string; className?: string; origine?: string }) {
  return (
    <span aria-hidden="true" className={`relative inline-block overflow-hidden rounded-t-full bg-[var(--sombre)] ${className}`}>
      <span className="absolute -inset-[8%] block">
        <Image src={src} alt="" fill priority sizes="(min-width: 1024px) 240px, 30vw" className="kit-cinema-img object-cover" style={{ "--kit-origine": origine } as React.CSSProperties} />
      </span>
    </span>
  );
}

/**
 * L'heure limite, écrite en gros, en haut de l'accueil et de la page livraison : « c'est
 * une promesse, alors on la tient ». Le tampon qui tourne est un ornement.
 */
export function HeureLimite({ niveau = 2 }: { niveau?: 1 | 2 }) {
  const Balise = niveau === 1 ? "h1" : "p";
  return (
    <section id="heure" aria-label="L'heure limite" className="scroll-mt-20 relative overflow-hidden bg-[var(--accent)] text-[var(--sur-accent)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="space-y-5">
          <p className="text-[12px] font-bold uppercase tracking-[0.24em]">Livraison dans la ville · du mardi au samedi</p>
          <Balise className="font-[family-name:var(--titres)] text-[clamp(3rem,8.4vw,8rem)] leading-[0.92] tracking-[-0.03em] [font-variant-numeric:lining-nums]">
            Commandé avant 14&nbsp;h, <span className="italic">livré aujourd&apos;hui.</span>
          </Balise>
          <p className="max-w-xl text-lg leading-relaxed">
            Après 14&nbsp;h&nbsp;: livré demain matin. Retrait en boutique&nbsp;: gratuit. C&apos;est une
            promesse, alors on la tient — et si un jour on ne peut pas, le site le dit dès le matin.
          </p>
        </div>
        <svg aria-hidden="true" viewBox="0 0 200 200" className="h-40 w-40 shrink-0 justify-self-end md:h-52 md:w-52">
          <defs>
            <path id="dm-cercle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="1" />
          <g className="origin-center animate-[spin_28s_linear_infinite] motion-reduce:animate-none">
            <text fontSize="15" letterSpacing="5.2" fill="currentColor" style={{ textTransform: "uppercase" }}>
              <textPath href="#dm-cercle">livré aujourd&apos;hui · avant 14 h ·</textPath>
            </text>
          </g>
          <text x="100" y="112" textAnchor="middle" fontSize="40" fontStyle="italic" fill="currentColor" style={{ fontFamily: "var(--titres)" }}>14 h</text>
        </svg>
      </div>
    </section>
  );
}

/**
 * Le haut de chaque page intérieure : sombre, comme l'accueil (l'en-tête flottant
 * l'attend), une photo qui respire derrière le titre.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  origine,
}: {
  surtitre: React.ReactNode;
  titre: string;
  children?: React.ReactNode;
  photo: { src: string };
  origine?: string;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-60" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,21,32,0.55)_0%,rgba(42,21,32,0.72)_50%,rgba(42,21,32,0.96)_100%)]" />
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-16 pt-40 sm:px-8 md:pb-24 md:pt-52">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as="h1"
          auChargement
          texte={titre}
          className="max-w-5xl font-normal text-[clamp(3.2rem,8.5vw,8rem)] leading-[0.9] tracking-[-0.035em]"
          classeAccent="italic text-[var(--accent)]"
        />
        {children && (
          <Apparition delai={400} className="max-w-2xl text-xl leading-relaxed text-[var(--sur-sombre)]">
            {children}
          </Apparition>
        )}
      </div>
    </section>
  );
}

/** Le dernier écran : l'heure limite, sur le fond animé aux couleurs de la boutique. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#2A1520", "#5A2A3A", "#B8862A"]} />
        <div className="absolute inset-0 bg-[var(--sombre)]/45" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Ce mois-ci, pas un autre</Surtitre>
            <TitreRevele
              texte={"Avant 14 h, c'est *aujourd'hui.*"}
              className="font-normal text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-[-0.035em]"
              classeAccent="italic text-[var(--accent)]"
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">
              Dis ce que tu veux dire. On compose avec ce qui fleurit, on écrit la carte à la main.
              Tu n&apos;as qu&apos;à signer.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}#choix`}>C&apos;est pour dire quoi&nbsp;?</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]">
              Ou par téléphone : <span className="font-semibold tabular-nums">{boutique.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}
