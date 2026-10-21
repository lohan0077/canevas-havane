import Image from "next/image";
import Link from "next/link";
import { Logo } from "./EnTete";
import { DOSSIER, NAVIGATION, PHRASE_L313_3, PHRASE_L322_2, entreprise, photos, questions } from "./donnees";

/** Un titre de section, centré ou non : petit libellé, titre en Fraunces, chapeau. */
export function Intitule({
  libelle,
  titre,
  children,
  clair = false,
  centre = false,
  niveau = 2,
}: {
  libelle: string;
  titre: React.ReactNode;
  children?: React.ReactNode;
  clair?: boolean;
  centre?: boolean;
  niveau?: 1 | 2;
}) {
  const Balise = niveau === 1 ? "h1" : "h2";
  return (
    <div className={`max-w-2xl space-y-4 ${centre ? "mx-auto text-center" : ""}`}>
      <p className={`text-[12px] font-semibold tracking-[0.2em] uppercase ${clair ? "text-[#F2C14E]" : "text-[var(--accent-texte)]"}`}>{libelle}</p>
      <Balise className={`text-[40px] font-normal tracking-[-0.02em] sm:text-6xl ${clair ? "text-[var(--sur-sombre)]" : ""}`}>{titre}</Balise>
      {children && <div className={`text-[17px] leading-relaxed ${clair ? "text-[#C9D2DF]" : "text-[var(--doux)]"}`}>{children}</div>}
    </div>
  );
}

export function Photo({ photo, sizes, className = "" }: { photo: (typeof photos)[keyof typeof photos]; sizes: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[24px] bg-[var(--carte)] ${className}`}>
      <Image src={photo.src} alt={photo.alt} width={photo.largeur} height={photo.hauteur} sizes={sizes} className="h-full w-full object-cover" />
    </div>
  );
}

/**
 * Un dessin au trait, très pâle, sous le titre de l'accueil : des maisons, un fil de
 * téléphone qui court de l'une à l'autre. Décoratif.
 */
export function Dessin() {
  return (
    <svg viewBox="0 0 800 220" className="h-auto w-full" aria-hidden="true">
      <g fill="none" stroke="#CFC6B3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M0 200 H800" />
        <path d="M40 200 V120 L95 80 L150 120 V200" />
        <path d="M70 200 V160 H100 V200 M110 135 H135 V155 H110 Z M55 135 H80 V155 H55 Z" />
        <path d="M190 200 V100 H300 V200 M190 100 L245 60 L300 100" />
        <path d="M210 125 H235 V150 H210 Z M255 125 H280 V150 H255 Z M232 200 V170 H258 V200" />
        <path d="M520 200 V110 L580 70 L640 110 V200 M545 200 V165 H570 V200 M590 130 H620 V155 H590 Z" />
        <path d="M680 200 V130 H770 V200 M680 130 L725 95 L770 130 M700 150 H720 V170 H700 Z M735 150 H755 V170 H735 Z" />
        <path d="M150 105 C 220 40, 320 40, 360 90 S 470 150, 520 110" strokeDasharray="2 7" />
        <path d="M352 82 c 10 -14 30 -14 40 0 l -6 8 c -8 -8 -20 -8 -28 0 z" fill="#F2C14E" stroke="#B79A53" />
        <path d="M430 60 q 6 -6 12 0 q 6 -6 12 0 M470 45 q 5 -5 10 0 q 5 -5 10 0" />
      </g>
    </svg>
  );
}

/** L'affiche de lancement, en vrai : la phrase, la signature, et les mentions lisibles. */
export function Affiche() {
  return (
    <figure data-film="affiche" className="mx-auto max-w-md -rotate-1 rounded-[10px] bg-[#1B2A41] p-7 text-[#FFF8EC] shadow-[0_40px_80px_-40px_rgba(27,42,65,0.8)] sm:p-9">
      <p className="font-[family-name:var(--titres)] text-[48px] leading-[1.02] tracking-[-0.02em]">
        Oui ou non, <em className="text-[#F2C14E]">on t&apos;appelle.</em>
      </p>
      <p className="mt-6 text-[14px] font-semibold tracking-[0.12em] uppercase">Bonne Nouvelle · courtage en crédit immobilier</p>
      <div className="mt-6 space-y-2 border-t border-[#3A4A63] pt-4 text-[12px] leading-relaxed text-[#C9D2DF]">
        <p>
          {entreprise.nom}, {entreprise.adresse} · {entreprise.categorie} · ORIAS n°&nbsp;{entreprise.orias} (exemple)
        </p>
        <p>{PHRASE_L322_2}</p>
        <p>{PHRASE_L313_3}</p>
      </div>
      <figcaption className="sr-only">L&apos;affiche de lancement de Bonne Nouvelle, avec les mentions que la loi impose</figcaption>
    </figure>
  );
}

export function Faq() {
  return (
    <div className="space-y-3">
      {questions.map((q) => (
        <details key={q.q} className="group rounded-[20px] border border-[var(--trait)] bg-[var(--carte)] px-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-[18px] leading-snug font-semibold [&::-webkit-details-marker]:hidden">
            {q.q}
            <span aria-hidden="true" className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#F2C14E] text-[16px] text-[#1B2A41] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-5 text-[16px] leading-relaxed text-[var(--doux)]">{q.r}</p>
        </details>
      ))}
    </div>
  );
}

/** Le pied de chaque page : les mentions imposées à toute publicité d'un courtier, lisibles. */
export function PiedDeSite() {
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div data-film="mentions-pied" className="space-y-4 text-[15px] leading-relaxed">
          <p className="text-[12px] font-semibold tracking-[0.2em] text-[#F2C14E] uppercase">En vrai, lisibles</p>
          <p className="font-[family-name:var(--titres)] text-[21px] leading-snug">« {PHRASE_L322_2} »</p>
          <p className="text-[#E3E7EE]">{PHRASE_L313_3}</p>
          <p className="text-[#C9D2DF]">
            {entreprise.nom}, {entreprise.adresse} · {entreprise.categorie} · ORIAS n°&nbsp;{entreprise.orias} (exemple) · Nous exerçons pour
            le compte de : {entreprise.banques.join(" ; ")} (exemples) · Médiateur de la consommation : médiateur d&apos;exemple, ses
            coordonnées et l&apos;adresse de son site.
          </p>
        </div>
        <div className="space-y-5">
          <Logo clair />
          <p className="text-[15px] text-[#C9D2DF]">
            <a href={`tel:${entreprise.telephoneLien}`} className="font-semibold text-[var(--sur-sombre)] underline underline-offset-4">{entreprise.telephone}</a>
            <br />
            {entreprise.horaires}
          </p>
          <ul className="space-y-2 text-[15px] font-semibold">
            <li><Link href={DOSSIER} className="hover:underline">Accueil</Link></li>
            {NAVIGATION.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:underline">{l.libelle}</Link></li>
            ))}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
