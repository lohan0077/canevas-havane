import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import type { Photo } from "./donnees";

/** Le mot en relief dans un titre : l’italique de la police des titres, en corail (plus clair sur le café). */
export const ACCENT_CLAIR = "italic text-[var(--accent-texte)]";
export const ACCENT_SOMBRE = "italic text-[#FF8A6E]";

/** Le nom : un « l » dans un rond corail, et « lundi d'après » en bas de casse. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-[19px] text-[var(--sur-accent)]">l</span>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] lowercase leading-none tracking-[-0.02em]">lundi d&apos;après</span>
    </span>
  );
}

/** Le petit intitulé au-dessus d'un titre : une ligne discrète, en capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`text-[12px] font-medium uppercase tracking-[0.2em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule : plein (le corail) ou au trait fin. */
export function Bouton({
  href,
  children,
  variante = "plein",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variante?: "plein" | "contour" | "cafe" | "clair";
  className?: string;
}) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    // Sur le mur orange du premier écran, le corail se fondrait : le bouton principal y est café.
    cafe: "bg-[var(--sombre)] text-[var(--sur-sombre)]",
    // Le second bouton du premier écran : plein crème sur téléphone, où il se pose sur le bas sombre
    // de la photo ; au trait fin sur grand écran, où le mur est clair derrière lui.
    clair: "bg-[var(--fond)] text-[var(--encre)] lg:border lg:border-current/30 lg:bg-transparent lg:text-current",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex h-12 items-center gap-3 rounded-full px-6 text-[15px] font-medium transition-colors ${styles} ${className}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le titre d'un écran, révélé mot à mot, en bas de casse : toujours la même échelle, jamais en gras. */
export function Titre({
  texte,
  clair = false,
  taille = "grand",
  as = "h2",
  className = "",
}: {
  texte: string;
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
    <TitreRevele
      as={as}
      texte={texte}
      className={`font-[family-name:var(--titres)] font-normal lowercase tracking-[-0.03em] text-balance ${tailles} ${className}`}
      classeAccent={clair ? ACCENT_SOMBRE : ACCENT_CLAIR}
    />
  );
}

/** Le haut de chaque écran de l'accueil : un numéro, un titre, une phrase. Toujours le même gabarit. */
export function Intitule({ numero, surtitre, titre, texte, clair = false }: { numero?: string; surtitre: string; titre: string; texte?: React.ReactNode; clair?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
      <div className="space-y-5">
        <Apparition><Surtitre clair={clair}>{numero ? `${numero} — ${surtitre}` : surtitre}</Surtitre></Apparition>
        <Titre texte={titre} clair={clair} />
      </div>
      {texte && (
        <Apparition as="p" delai={150} className={`text-lg leading-relaxed ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
          {texte}
        </Apparition>
      )}
    </div>
  );
}

/**
 * Le haut de chaque page intérieure : le café de la marque, une photo sous un voile qui
 * la laisse respirer, un titre fin en très grand.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  niveau = "h1",
  origine = "50% 50%",
}: {
  surtitre: React.ReactNode;
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
          <Image src={photo.src} alt="" fill priority sizes="(max-width: 1023px) 100vh, 100vw" className="object-cover opacity-70" style={{ objectPosition: origine }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(42,25,15,0.55)_0%,rgba(42,25,15,0.3)_40%,rgba(42,25,15,0.92)_100%)]" />
        </>
      )}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-14 pt-36 md:pb-20">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as={niveau}
          auChargement
          texte={titre}
          className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.75rem,6vw,5.25rem)] font-normal lowercase leading-[1] tracking-[-0.035em] text-balance"
          classeAccent={ACCENT_SOMBRE}
        />
        {children && (
          <Apparition delai={400} className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">
            {children}
          </Apparition>
        )}
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
