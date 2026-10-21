import Image from "next/image";
import Link from "next/link";
import { Logo } from "./EnTete";
import { DOSSIER, NAVIGATION, PHRASE_L313_3, PHRASE_L322_2, entreprise, photos, questions } from "./donnees";

/** Un titre de section : petit libellé bleu, titre en capitales très grasses. */
export function Intitule({
  libelle,
  titre,
  children,
  clair = false,
  niveau = 2,
}: {
  libelle: string;
  titre: React.ReactNode;
  children?: React.ReactNode;
  clair?: boolean;
  niveau?: 1 | 2;
}) {
  const Balise = niveau === 1 ? "h1" : "h2";
  return (
    <div className="max-w-3xl space-y-4">
      <p className={`text-[12px] font-semibold tracking-[0.18em] uppercase ${clair ? "text-[#A9B8FF]" : "text-[var(--accent-texte)]"}`}>{libelle}</p>
      <Balise className={`text-[38px] font-black tracking-[-0.035em] uppercase sm:text-6xl ${clair ? "text-[var(--sur-sombre)]" : ""}`}>{titre}</Balise>
      {children && <div className={`text-[17px] leading-relaxed ${clair ? "text-[#B9B9BE]" : "text-[var(--doux)]"}`}>{children}</div>}
    </div>
  );
}

export function Photo({ photo, sizes, className = "" }: { photo: (typeof photos)[keyof typeof photos]; sizes: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[24px] bg-[var(--carte)] ${className}`}>
      <Image src={photo.src} alt={photo.alt} width={photo.largeur} height={photo.hauteur} sizes={sizes} className="h-full w-full object-cover grayscale" />
    </div>
  );
}

export function Faq() {
  return (
    <div className="border-t-2 border-[var(--encre)]">
      {questions.map((q) => (
        <details key={q.q} className="group border-b border-[var(--trait)]">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-[19px] leading-snug font-semibold [&::-webkit-details-marker]:hidden">
            {q.q}
            <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[var(--encre)] text-[18px] leading-none transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-6 text-[16px] leading-relaxed text-[var(--doux)]">{q.r}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * Le pied de chaque page : les mentions que la loi impose à toute publicité d'un
 * intermédiaire en crédit immobilier, en vrai et lisibles — nom, adresse, ORIAS,
 * catégorie (CMF R519-24), établissements (L322-2, al. 2), la phrase de L322-2, celle de
 * L313-3, le médiateur (R616-1). Puis le nom, immense, comme une signature.
 */
export function PiedDeSite() {
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-16 pb-10 sm:px-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div data-film="mentions-pied" className="space-y-5 text-[15px] leading-relaxed">
          <p className="text-[12px] font-semibold tracking-[0.18em] text-[#A9B8FF] uppercase">Ce que la loi nous fait écrire, et que nous écrivons en grand</p>
          <p className="text-[20px] leading-snug font-semibold">« {PHRASE_L322_2} »</p>
          <p className="text-[#E4E4E7]">{PHRASE_L313_3}</p>
          <p className="text-[#B9B9BE]">
            {entreprise.nom}, {entreprise.adresse} · {entreprise.categorie} · ORIAS n°&nbsp;{entreprise.orias} (exemple), à vérifier sur le
            registre de l&apos;ORIAS · Nous exerçons pour le compte de : {entreprise.banques.join(" ; ")} (exemples) · Médiateur de la
            consommation : médiateur d&apos;exemple, ses coordonnées et l&apos;adresse de son site.
          </p>
        </div>
        <div className="space-y-5">
          <ul className="space-y-2.5 text-[15px] font-semibold">
            <li><Link href={DOSSIER} className="hover:underline">Accueil</Link></li>
            {NAVIGATION.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:underline">{l.libelle}</Link></li>
            ))}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
          <p className="text-[15px] text-[#B9B9BE]">
            <a href={`tel:${entreprise.telephoneLien}`} className="font-semibold text-[var(--sur-sombre)] underline underline-offset-4">{entreprise.telephone}</a>
            <br />
            {entreprise.horaires}
          </p>
          <Logo clair />
        </div>
      </div>
      <p aria-hidden="true" className="overflow-hidden px-2 pb-4 text-center font-[family-name:var(--titres)] text-[11.6vw] leading-[0.8] font-black tracking-[-0.05em] whitespace-nowrap text-[#2E2E34] uppercase lg:text-[150px]">
        Mot pour Mot
      </p>
    </footer>
  );
}
