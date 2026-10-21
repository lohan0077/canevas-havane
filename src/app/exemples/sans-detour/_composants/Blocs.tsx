import Image from "next/image";
import Link from "next/link";
import type { Photo } from "./donnees";
import { DOSSIER, cabinet, nonFais, questions } from "./donnees";

/** La partie d'un titre écrite en italique serif (Instrument Serif). */
export function Serif({ children }: { children: React.ReactNode }) {
  return <span className="font-[family-name:var(--f-instrument)] italic font-normal tracking-normal">{children}</span>;
}

/** Surtitre + titre de section, à la manière d'un sommaire : un petit numéro, un trait. */
export function Intitule({
  numero,
  surtitre,
  titre,
  children,
  niveau = 2,
  clair = false,
}: {
  numero?: string;
  surtitre: string;
  titre: React.ReactNode;
  children?: React.ReactNode;
  niveau?: 1 | 2;
  clair?: boolean;
}) {
  const Balise = niveau === 1 ? "h1" : "h2";
  return (
    <div className="space-y-5 max-w-2xl">
      <p className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${clair ? "text-[#B9C2BD]" : "text-[var(--doux)]"}`}>
        {numero && <span className={`tabular-nums ${clair ? "text-[#E8835F]" : "text-[var(--accent-texte)]"}`}>{numero}</span>}
        <span aria-hidden="true" className={`h-px w-8 ${clair ? "bg-white/30" : "bg-[var(--trait)]"}`} />
        {surtitre}
      </p>
      <Balise className={`${niveau === 1 ? "text-[44px] sm:text-6xl" : "text-[38px] sm:text-5xl"} font-extrabold tracking-[-0.035em]`}>
        {titre}
      </Balise>
      {children && <div className={`text-lg leading-relaxed ${clair ? "text-[#B9C2BD]" : "text-[var(--doux)]"}`}>{children}</div>}
    </div>
  );
}

export function Photographie({ photo, sizes, className = "", priority = false }: { photo: Photo; sizes: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-[#D9D5CC] ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}

/** Les trois lignes « Ce que je ne fais pas » : une croix, la phrase, la source. */
export function ListeNon({ detail = false }: { detail?: boolean }) {
  return (
    <ol className="border-t border-white/15" data-film="liste-non">
      {nonFais.map((n) => (
        <li key={n.id} id={`non-${n.id}`} className="border-b border-white/15 py-6 scroll-mt-24">
          {detail ? (
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden">
                <Croix />
                <span className="flex-1 text-[26px] sm:text-3xl font-extrabold leading-[1.12] tracking-[-0.025em]">{n.titre}</span>
                <span aria-hidden="true" className="mt-1.5 text-2xl leading-none text-[#E8835F] transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="pl-14 pt-4 space-y-3">
                <p className="text-lg leading-relaxed text-[#D5DBD7]">{n.texte}</p>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B9C2BD]">{n.source}</p>
              </div>
            </details>
          ) : (
            <div className="flex items-start gap-4">
              <Croix />
              <p className="text-[26px] sm:text-3xl font-extrabold leading-[1.12] tracking-[-0.025em]">{n.titre}</p>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

function Croix() {
  return (
    <span aria-hidden="true" className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-white">
      <svg viewBox="0 0 16 16" className="h-4 w-4"><path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
    </span>
  );
}

export function Questions({ max }: { max?: number }) {
  return (
    <div className="border-t border-[var(--trait)]">
      {questions.slice(0, max).map((q) => (
        <details key={q.q} className="group border-b border-[var(--trait)]">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
            {q.q}
            <span aria-hidden="true" className="text-2xl leading-none text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-6 pr-8 text-[17px] leading-relaxed text-[var(--doux)]">{q.r}</p>
        </details>
      ))}
    </div>
  );
}

/** Le dernier écran de chaque page : réserver, ou appeler. */
export function AppelFinal() {
  return (
    <section className="px-4 sm:px-6 pb-16">
      <div className="max-w-6xl mx-auto rounded-[32px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-14 sm:px-12 sm:py-20 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
        <h2 className="text-[40px] sm:text-6xl font-extrabold tracking-[-0.035em]">
          Vous savez tout. <Serif>Il reste l&apos;heure.</Serif>
        </h2>
        <div className="space-y-4">
          <Link href={`${DOSSIER}/reserver`} className="flex items-center justify-center min-h-14 rounded-full bg-[#F1EFEA] text-[#1C2321] text-lg font-extrabold">
            Choisir un créneau
          </Link>
          <p className="text-center text-[#B9C2BD]">
            ou par téléphone : <span className="font-bold text-[var(--sur-sombre)] tabular-nums whitespace-nowrap">{cabinet.telephone}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
