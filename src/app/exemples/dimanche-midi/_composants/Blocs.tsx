import Image from "next/image";
import Link from "next/link";
import { Logo } from "./EnTete";
import { DOSSIER, NAVIGATION, STATUT, cabinet, photos, questions } from "./donnees";

/** Un titre de section : petit libellé terre cuite, titre en Lora (italique pour l'accent). */
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
      <p className={`text-[12px] font-semibold tracking-[0.22em] uppercase ${clair ? "text-[#D9B45A]" : "text-[var(--accent-texte)]"}`}>{libelle}</p>
      <Balise className={`text-[38px] leading-[1.08] font-normal tracking-[-0.015em] sm:text-[54px] ${clair ? "text-[var(--sur-sombre)]" : ""}`}>{titre}</Balise>
      {children && <div className={`text-[17px] leading-relaxed ${clair ? "text-[#E9D8B4]" : "text-[var(--doux)]"}`}>{children}</div>}
    </div>
  );
}

export function Photo({ photo, sizes, className = "" }: { photo: (typeof photos)[keyof typeof photos]; sizes: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[var(--trait)] ${className}`}>
      <Image src={photo.src} alt={photo.alt} width={photo.largeur} height={photo.hauteur} sizes={sizes} className="h-full w-full object-cover" />
    </div>
  );
}

/** L'affiche de lancement, en vrai : la question, la signature, les mentions lisibles. */
export function Affiche() {
  return (
    <figure data-film="affiche" className="mx-auto max-w-sm rotate-[-1deg] border border-[#E6DCC6] bg-[#FBF5EA] p-7 shadow-[0_40px_70px_-40px_rgba(34,56,44,0.7)] sm:p-9">
      <p className="font-[family-name:var(--titres)] text-[40px] leading-[1.08] text-[#2F4A3A]">
        Tes enfants savent où est ton <em className="text-[#A3442E]">assurance vie&nbsp;?</em>
      </p>
      <p className="mt-6 text-[13px] font-semibold tracking-[0.14em] text-[#2F4A3A] uppercase">Dimanche Midi · conseil en patrimoine</p>
      <p className="mt-5 border-t border-[#E6DCC6] pt-4 text-[11px] leading-relaxed text-[#55604F]">
        {cabinet.nom}, {cabinet.adresse} · {STATUT}
      </p>
      <figcaption className="sr-only">L&apos;affiche de lancement de Dimanche Midi, avec ses mentions</figcaption>
    </figure>
  );
}

export function Faq() {
  return (
    <div className="space-y-3">
      {questions.map((q) => (
        <details key={q.q} className="group rounded-[18px] border border-[var(--trait)] bg-[var(--carte)] px-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-[18px] leading-snug font-semibold [&::-webkit-details-marker]:hidden">
            {q.q}
            <span aria-hidden="true" className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[16px] text-[var(--sur-accent)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-5 text-[16px] leading-relaxed text-[var(--doux)]">{q.r}</p>
        </details>
      ))}
    </div>
  );
}

/** Le pied de chaque page : le statut écrit juste, l'ORIAS, l'association, le médiateur. */
export function PiedDeSite() {
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div data-film="mentions-pied" className="space-y-4 text-[15px] leading-relaxed">
          <Logo clair />
          <p className="font-[family-name:var(--titres)] text-[22px] leading-snug italic">On en parle à table.</p>
          <p className="text-[#E9D8B4]">
            {cabinet.nom}, {cabinet.adresse} · {STATUT}, à vérifier sur le registre de l&apos;ORIAS · Adhérent de
            l&apos;{cabinet.association} · Conseil non indépendant · Médiateur de la consommation : {cabinet.mediateur}.
          </p>
          <p className="text-[13px] text-[#C9D3C4]">Aucun placement, aucun rendement, aucune réduction d&apos;impôt n&apos;est promis sur ce site.</p>
        </div>
        <div className="space-y-5">
          <p className="text-[15px] text-[#E9D8B4]">
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
