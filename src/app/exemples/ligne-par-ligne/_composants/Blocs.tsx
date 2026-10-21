import Image from "next/image";
import Link from "next/link";
import { Logo } from "./EnTete";
import { DOSSIER, NAVIGATION, STATUT, cabinet, photos, questions } from "./donnees";

/** Un titre de section : petit libellé, titre en Newsreader, chapeau. */
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
      <p className={`text-[12px] font-semibold tracking-[0.2em] uppercase ${clair ? "text-[#E9B36B]" : "text-[var(--accent-texte)]"}`}>{libelle}</p>
      <Balise className={`text-[40px] leading-[1.05] font-normal tracking-[-0.02em] sm:text-[58px] ${clair ? "text-[var(--sur-sombre)]" : ""}`}>{titre}</Balise>
      {children && <div className={`text-[17px] leading-relaxed ${clair ? "text-[#BFD3C6]" : "text-[var(--doux)]"}`}>{children}</div>}
    </div>
  );
}

export function Photo({ photo, sizes, className = "", priorite = false }: { photo: (typeof photos)[keyof typeof photos]; sizes: string; className?: string; priorite?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-[var(--trait)] ${className}`}>
      <Image src={photo.src} alt={photo.alt} width={photo.largeur} height={photo.hauteur} sizes={sizes} priority={priorite} className="h-full w-full object-cover" />
    </div>
  );
}

export function Faq() {
  return (
    <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((q) => (
        <details key={q.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-[18px] leading-snug font-semibold [&::-webkit-details-marker]:hidden">
            {q.q}
            <span aria-hidden="true" className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--encre)] text-[16px] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-6 text-[16px] leading-relaxed text-[var(--doux)]">{q.r}</p>
        </details>
      ))}
    </div>
  );
}

/** Le pied de chaque page : les statuts écrits juste, l'ORIAS, l'association, le médiateur. */
export function PiedDeSite() {
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div data-film="mentions-pied" className="space-y-4 text-[15px] leading-relaxed">
          <Logo clair />
          <p className="font-[family-name:var(--titres)] text-[22px] leading-snug">{STATUT}.</p>
          <p className="text-[#BFD3C6]">
            Courtier en assurance · ORIAS n°&nbsp;{cabinet.orias} (exemple), à vérifier sur le registre de l&apos;ORIAS · Adhérent de
            l&apos;{cabinet.association.toLowerCase()} · Conseil en investissement non indépendant : je peux conserver des
            rémunérations versées par des partenaires, et je te les montre, ligne par ligne · Médiateur de la consommation :{" "}
            {cabinet.mediateur.toLowerCase()} · {cabinet.adresse}.
          </p>
          <p className="text-[13px] text-[#BFD3C6]">
            Aucun rendement n&apos;est promis sur ce site. Placer son épargne comporte un risque de perte en capital.
          </p>
        </div>
        <div className="space-y-5">
          <p className="text-[15px] text-[#BFD3C6]">
            <a href={`tel:${cabinet.telephoneLien}`} className="font-semibold text-[var(--sur-sombre)] underline underline-offset-4">{cabinet.telephone}</a>
            <br />
            {cabinet.horaires}
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
