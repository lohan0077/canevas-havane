import Image from "next/image";
import Link from "next/link";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import PhotoCinema from "../../_kit/PhotoCinema";
import TitreRevele from "../../_kit/TitreRevele";
import { DOSSIER, entreprise, euros, photos, type Question, type Tente } from "./donnees";

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

/** Le surtitre d'une section : petit, espacé, avec un brin d'herbe. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.18em] ${clair ? "text-[#F2C98A]" : "text-[var(--accent-texte)]"}`}>
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
        <path d="M3 15c0-5 2-9 5-12M8 15c0-4 1-7 4-9M8 15c-1-3-3-5-6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      {children}
    </p>
  );
}

/** Un bouton-lien en pilule, terre cuite ou au trait. */
export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "trait" | "creme" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    trait: "border border-current/40 hover:bg-[color-mix(in_oklab,currentColor_10%,transparent)]",
    creme: "bg-[var(--fond)] text-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`group inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 text-[16px] font-semibold transition-transform hover:scale-[1.02] ${styles}`}>
      {children}
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** L'italique de Fraunces, couleur de blé sur le vert, terre cuite sur la crème. */
export const BLE = "italic font-light text-[#F2C98A]";
export const TERRE = "italic font-light text-[var(--accent-texte)]";

/**
 * Le haut de chaque page intérieure : une photo qui respire derrière un voile vert, le
 * titre révélé à l'arrivée, et une ligne d'herbe dessinée qui ferme le bloc.
 */
export function EnTetePage({
  surtitre,
  titre,
  children,
  photo,
  origine,
}: {
  surtitre: string;
  titre: string;
  children?: React.ReactNode;
  photo: { src: string };
  origine?: string;
}) {
  return (
    <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <PhotoCinema src={photo.src} alt="" priority origine={origine} className="opacity-60" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,48,21,0.72)_0%,rgba(30,48,21,0.45)_45%,rgba(30,48,21,0.92)_100%)]" />
      <div className="relative mx-auto max-w-7xl space-y-7 px-5 pb-20 pt-40 sm:px-8 md:pb-28 md:pt-52">
        <Apparition><Surtitre clair>{surtitre}</Surtitre></Apparition>
        <TitreRevele
          as="h1"
          auChargement
          texte={titre}
          className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3.2rem,8.5vw,7.6rem)] font-normal leading-[0.92] tracking-[-0.035em]"
          classeAccent={BLE}
        />
        {children && (
          <Apparition delai={450} className="max-w-2xl text-lg leading-relaxed text-[var(--sur-sombre)]/90 md:text-xl">
            {children}
          </Apparition>
        )}
      </div>
      <Herbe />
    </section>
  );
}

/** Une frange d'herbe dessinée, au bas d'un bloc vert. */
export function Herbe({ couleur = "var(--fond)" }: { couleur?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1200 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-6 w-full md:h-9">
      <path
        d="M0 40V26c20-8 30 6 50-4s30 8 55-2 30 6 50-6 35 10 60 0 30 6 50-4 40 8 60-2 30 6 55-4 35 8 60-2 30 4 50-6 40 10 60 0 30 6 55-4 35 8 55-2 30 6 60-4 35 8 55-2 30 6 50-6 40 10 60 0 30 6 50-4 30 6 45-2V40Z"
        fill={couleur}
      />
    </svg>
  );
}

export function CarteTente({ t, photo }: { t: Tente; photo?: { src: string; alt: string } }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[26px] border border-[var(--trait)] bg-[var(--carte)]">
      {photo && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <svg viewBox="0 0 120 70" className="h-16 w-auto self-start" aria-hidden="true">
          <path d={`M10 60 L${60 - t.longueur * 1.6} 22 L60 8 L${60 + t.longueur * 1.6} 22 L110 60 Z`} fill="var(--fond)" stroke="var(--encre)" strokeWidth="2" strokeLinejoin="round" />
          <path d="M60 8V60" stroke="var(--accent)" strokeWidth="2" />
          <path d="M2 62c10-3 18 2 30-1s20 2 30-1 22 2 30-1 18 2 26-1" fill="none" stroke="#7FAE5C" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <div className="space-y-1">
          <p className="text-[13px] uppercase tracking-[0.16em] text-[var(--doux)]">{t.surnom}</p>
          <h3 className="font-[family-name:var(--titres)] text-[36px] font-normal leading-none tracking-[-0.02em]">{t.largeur} × {t.longueur} m</h3>
        </div>
        <p className="leading-relaxed text-[var(--doux)]">{t.pour}</p>
        <dl className="mt-auto divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-[15px]">
          <div className="flex items-baseline justify-between gap-3 py-2.5">
            <dt>Invités assis</dt>
            <dd className="text-right"><span className="font-semibold">{t.invites}</span> <span className="text-[12px] text-[var(--doux)]">capacité du fabricant</span></dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 py-2.5">
            <dt>Le week-end</dt>
            <dd className="text-right"><span className="font-semibold">{euros(t.prix)} TTC</span> <span className="text-[12px] text-[var(--doux)]">exemple</span></dd>
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
            <summary className="flex items-center justify-between gap-4 py-5 font-[family-name:var(--titres)] text-[22px] leading-snug">
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

/** Le dernier écran de chaque page : « chez toi », sur le fond animé du pré au couchant. */
export function AppelFinal() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="kit-grain relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <FondVivant couleurs={["#1E3015", "#3E6A2A", "#B04E2F"]} />
        <div className="absolute inset-0 bg-[#1E3015]/50" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-10 md:py-32 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-6">
            <Surtitre clair>Ton samedi, chez toi</Surtitre>
            <TitreRevele
              texte={"Et si on la faisait *chez toi ?*"}
              className="font-[family-name:var(--titres)] text-[clamp(3rem,8vw,7rem)] font-normal leading-[0.92] tracking-[-0.035em]"
              classeAccent={BLE}
            />
            <p className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]/90">
              Une tente pour la fête, une machine pour le chantier d&apos;avant. On vient voir le pré, trois semaines avant,
              gratuitement.
            </p>
          </div>
          <Apparition className="flex flex-col items-start gap-4 lg:items-end" delai={200}>
            <Bouton href={`${DOSSIER}#pre`}>Poser une tente sur mon pré</Bouton>
            <Bouton href={`${DOSSIER}/disponibilites`} variante="creme">Voir les samedis libres</Bouton>
            <p className="text-[15px] text-[var(--sur-sombre)]/90">
              Ou par téléphone : <span className="font-semibold tabular-nums">{entreprise.telephone}</span>
            </p>
          </Apparition>
        </div>
      </div>
    </section>
  );
}

export const PHOTO_TENTE: Record<string, { src: string; alt: string }> = {
  "6x12": photos.tenteJardin,
  "10x15": photos.tenteNuit,
  "12x25": photos.village,
};
