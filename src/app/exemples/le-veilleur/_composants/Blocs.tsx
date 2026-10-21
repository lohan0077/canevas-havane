import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION, carte, entreprise, photos, questions } from "./donnees";

/** Le petit libellé au-dessus d'un titre : un trait de laiton et des capitales espacées. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] ${clair ? "text-[#E2B65C]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

/** Un titre de section : surtitre, titre en Instrument Serif, chapeau. */
export function Intitule({
  surtitre,
  titre,
  children,
  clair = false,
  niveau = 2,
}: {
  surtitre: string;
  titre: React.ReactNode;
  children?: React.ReactNode;
  clair?: boolean;
  niveau?: 1 | 2;
}) {
  const Balise = niveau === 1 ? "h1" : "h2";
  return (
    <div className="max-w-2xl space-y-4">
      <Surtitre clair={clair}>{surtitre}</Surtitre>
      <Balise className={`text-[44px] font-normal sm:text-6xl ${clair ? "text-[var(--sur-sombre)]" : ""}`}>{titre}</Balise>
      {children && <div className={`text-[17px] leading-relaxed sm:text-lg ${clair ? "text-[#C9D0DB]" : "text-[var(--doux)]"}`}>{children}</div>}
    </div>
  );
}

/** Une photo de la conciergerie, servie depuis notre domaine, dans un cadre arrondi. */
export function Photo({
  photo,
  sizes,
  className = "",
  priority = false,
}: {
  photo: (typeof photos)[keyof typeof photos];
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[22px] bg-[var(--sombre)] ${className}`}>
      <Image src={photo.src} alt={photo.alt} width={photo.largeur} height={photo.hauteur} sizes={sizes} priority={priority} className="h-full w-full object-cover" />
    </div>
  );
}

/** Les questions fréquentes, en accordéons natifs (aucun script). */
export function Faq({ nombre }: { nombre?: number }) {
  return (
    <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.slice(0, nombre).map((q) => (
        <details key={q.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-[18px] font-bold leading-snug [&::-webkit-details-marker]:hidden">
            {q.q}
            <span aria-hidden="true" className="mt-0.5 font-[family-name:var(--titres)] text-[28px] leading-none text-[var(--accent-texte)] transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="pb-5 text-[16px] leading-relaxed text-[var(--doux)]">{q.r}</p>
        </details>
      ))}
    </div>
  );
}

/** L'appel de fin de page : confier son logement, ou lire le barème d'abord. */
export function AppelFinal() {
  return (
    <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-5">
          <Surtitre clair>Propriétaires</Surtitre>
          <h2 className="text-[46px] font-normal sm:text-7xl">
            Pas des revenus. <em className="text-[#E2B65C]">Tes nuits.</em>
          </h2>
          <p className="max-w-xl text-[17px] leading-relaxed text-[#C9D0DB]">
            Une visite d&apos;une heure, un mandat écrit, le barème recopié dedans. Ensuite, c&apos;est
            notre téléphone qui sonne.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link href={`${DOSSIER}/proprietaires#estimation`} className="rounded-full bg-[#E2B65C] px-6 py-4 text-center text-[17px] font-bold text-[#162132]">
            Demander la visite
          </Link>
          <Link href={`${DOSSIER}/bareme`} className="rounded-full border border-[#5A6A82] px-6 py-4 text-center text-[17px] font-bold">
            Lire le barème d&apos;abord
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Le pied du site : coordonnées, la carte en abrégé sur chaque page, les liens. */
export function PiedDeSite() {
  return (
    <footer className="border-t border-[var(--trait)] bg-[var(--carte)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">
            Conciergerie de location courte durée, {entreprise.zone}.
          </p>
          <p className="text-[15px] leading-relaxed">
            {entreprise.adresse.join(", ")}
            <br />
            <a href={`tel:${entreprise.telephoneLien}`} className="font-bold underline underline-offset-4">{entreprise.telephone}</a>
            <br />
            <span className="text-[var(--doux)]">Bureau : {entreprise.bureau.toLowerCase()}.</span>
          </p>
        </div>
        <div className="space-y-3 text-[14px] leading-relaxed text-[var(--doux)]">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Carte professionnelle</p>
          <p>
            <span className="font-bold text-[var(--encre)]">{carte[2].valeur}</span> · n° {carte[0].valeur} (exemple), délivrée par la{" "}
            {carte[1].valeur}. Garant : {carte[3].valeur}.
          </p>
          <p>Médiateur de la consommation : médiateur d&apos;exemple, ses coordonnées et l&apos;adresse de son site.</p>
        </div>
        <ul className="space-y-2.5 text-[15px] font-semibold">
          <li><Link href={DOSSIER} className="underline-offset-4 hover:underline">Accueil</Link></li>
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
        </ul>
      </div>
    </footer>
  );
}
