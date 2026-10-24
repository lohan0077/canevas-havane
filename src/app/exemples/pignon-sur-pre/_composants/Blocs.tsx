import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, entreprise, euros, photos, type Photo, type Question, type Tente } from "./donnees";

/** Le mot en relief dans un titre : l'italique de Fraunces, terre cuite sur la crème, blé sur le vert. */
export const ACCENT_CLAIR = "italic font-normal text-[var(--accent-texte)]";
export const ACCENT_SOMBRE = "italic font-normal text-[#F2C98A]";

/** Le logo : un pignon de maison posé dans l'herbe, et le nom, « sur » en italique. */
export function Marque() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 40 32" className="h-8 w-10 shrink-0" aria-hidden="true">
        <path d="M6 26V14L20 4l14 10v12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M16 26v-7h8v7" fill="none" stroke="#D9764F" strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M1 27c4-2 6 1 10-1s6 1 9-1 6 1 10-1 6 1 9-1" fill="none" stroke="#7FAE5C" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[22px] leading-none tracking-[-0.01em]">
        Pignon <span className="italic">sur</span> Pré
      </span>
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

/**
 * Un bouton-lien en pilule : plein (la terre cuite), au trait fin, ou crème. « nuit » est le
 * second bouton du premier écran : plein vert sur téléphone, où il se pose sur la toile
 * éclairée de la tente ; au trait fin sur grand écran, où il se pose sur le ciel.
 */
export function Bouton({
  href,
  children,
  variante = "plein",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variante?: "plein" | "contour" | "clair" | "nuit";
  className?: string;
}) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    contour: "border border-current/30 hover:bg-[color-mix(in_oklab,currentColor_8%,transparent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
    nuit: "bg-[var(--sombre)] text-[var(--sur-sombre)] lg:border lg:border-current/30 lg:bg-transparent",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex h-12 items-center gap-3 rounded-full px-6 text-[15px] font-medium transition-colors ${styles} ${className}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Le titre d'un écran, révélé mot à mot : toujours la même échelle, jamais en gras. */
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
      className={`font-[family-name:var(--titres)] font-normal tracking-[-0.02em] text-balance ${tailles} ${className}`}
      classeAccent={clair ? ACCENT_SOMBRE : ACCENT_CLAIR}
    />
  );
}

/** Le haut d'un écran : « 01 — Libellé », un titre, une phrase. Toujours le même gabarit. */
export function Intitule({
  numero,
  surtitre,
  titre,
  texte,
  clair = false,
}: {
  numero?: string;
  surtitre: string;
  titre: string;
  texte?: React.ReactNode;
  clair?: boolean;
}) {
  return (
    <div className="space-y-6">
      <Apparition><Surtitre clair={clair}>{numero ? `${numero} — ${surtitre}` : surtitre}</Surtitre></Apparition>
      <Titre texte={titre} clair={clair} />
      {texte && (
        <Apparition as="p" delai={150} className={`max-w-[26rem] text-lg leading-relaxed ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--doux)]"}`}>
          {texte}
        </Apparition>
      )}
    </div>
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

/**
 * Le haut de chaque page intérieure : le titre sur le vert, la photo à côté, entière et sans
 * voile (sur téléphone, au-dessus). Les photos du chantier sont claires partout (le sable, le
 * ciel, la pierre) : aucun texte ne s'y lirait sans les éteindre. Sans photo, le vert seul.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  origine,
  niveau = "h1",
}: {
  surtitre: string;
  titre: string;
  children?: React.ReactNode;
  photo?: Photo;
  origine?: string;
  niveau?: "h1" | "p";
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {photo && (
        <div className="relative h-[44svh] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2">
          <Image src={photo.src} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: origine }} />
        </div>
      )}
      <div className={`relative mx-auto flex w-full max-w-6xl flex-col justify-end gap-7 px-6 pb-14 md:pb-20 lg:min-h-[64svh] lg:pt-36 ${photo ? "pt-10" : "min-h-[52svh] pt-36"}`}>
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as={niveau}
          auChargement
          texte={titre}
          className={`font-[family-name:var(--titres)] font-normal leading-[1] tracking-[-0.02em] text-balance ${photo ? "text-[clamp(2.75rem,5vw,4.5rem)] lg:max-w-[calc(50%-3rem)]" : "max-w-4xl text-[clamp(2.75rem,6vw,5.25rem)]"}`}
          classeAccent={ACCENT_SOMBRE}
        />
        {children && (
          <Apparition delai={400} className={`max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)] ${photo ? "lg:max-w-[calc(50%-3rem)]" : ""}`}>
            {children}
          </Apparition>
        )}
      </div>
    </section>
  );
}

/** Une tente : sa photo, ses dimensions, sa capacité (celle du fabricant), son prix d'exemple. */
export function CarteTente({ t, photo }: { t: Tente; photo?: { src: string; alt: string } }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--trait)] bg-[var(--carte)]">
      {photo && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{t.surnom}</p>
          <h3 className="font-[family-name:var(--titres)] text-[34px] font-normal leading-none tracking-[-0.02em]">{t.largeur} × {t.longueur} m</h3>
        </div>
        <p className="leading-relaxed text-[var(--doux)]">{t.pour}</p>
        <dl className="mt-auto divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-[15px]">
          <div className="flex items-baseline justify-between gap-3 py-2.5">
            <dt>Invités assis</dt>
            <dd className="text-right"><span className="font-medium">{t.invites}</span> <span className="text-[12px] text-[var(--doux)]">capacité du fabricant</span></dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 py-2.5">
            <dt>Le week-end</dt>
            <dd className="text-right"><span className="font-medium">{euros(t.prix)} TTC</span> <span className="text-[12px] text-[var(--doux)]">exemple</span></dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/** Les questions d'une page, en accordéon simple (celui du kit sert sur l'accueil). */
export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="kit-accordeon group">
            <summary className="flex items-center justify-between gap-4 py-5 text-[17px] font-medium leading-snug">
              {x.q}
              <span aria-hidden="true" className="kit-plus grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--trait)] text-lg">+</span>
            </summary>
            <p className="pb-5 pr-10 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

/** Le dernier écran de chaque page : « chez toi », clair et centré. */
export function AppelFinal() {
  return (
    <section className="border-t border-[var(--trait)]">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-28 text-center md:py-36">
        <Apparition><Surtitre>Ton samedi, chez toi</Surtitre></Apparition>
        <Titre texte="Et si on la faisait *chez toi ?*" />
        <Apparition as="p" delai={150} className="mx-auto max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
          Une tente pour la fête, une machine pour le chantier d&apos;avant. On vient voir le pré, trois semaines avant,
          gratuitement.
        </Apparition>
        <Apparition delai={250} className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            <Bouton href={`${DOSSIER}#pre`}>Poser une tente sur mon pré</Bouton>
            <Bouton href={`${DOSSIER}/disponibilites`} variante="contour">Voir les samedis libres</Bouton>
          </div>
          <p className="text-[15px] text-[var(--doux)]">
            Ou par téléphone : <span className="font-medium tabular-nums text-[var(--encre)]">{entreprise.telephone}</span>
          </p>
        </Apparition>
      </div>
    </section>
  );
}

export const PHOTO_TENTE: Record<string, { src: string; alt: string }> = {
  "6x12": photos.tenteJardin,
  "10x15": photos.tenteNuit,
  "12x25": photos.village,
};
