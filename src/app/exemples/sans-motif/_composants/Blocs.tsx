import Image from "next/image";
import Link from "next/link";
import type { Photo } from "./donnees";
import { DOSSIER, questions } from "./donnees";

/** Le trait souple souligné sous un mot, comme un coup de crayon. */
export function Trait({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 14" className={`h-3 ${className}`} preserveAspectRatio="none">
      <path d="M2 9c18-6 30 4 48-1s28-6 46 0 30 5 48-1 30-6 46 0 18 4 28 1" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Surtitre({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold text-[var(--accent-texte)]">{children}</p>;
}

export function Photographie({ photo, sizes, className = "", priority = false }: { photo: Photo; sizes: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[30px] bg-[#D9DDE3] ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}

export function Questions() {
  return (
    <div className="space-y-2">
      {questions.map((q) => (
        <details key={q.q} className="group rounded-[22px] bg-[var(--carte)] px-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-[family-name:var(--titres)] text-lg font-medium [&::-webkit-details-marker]:hidden">
            {q.q}
            <span aria-hidden="true" className="text-2xl leading-none text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-6 pr-6 leading-relaxed text-[var(--doux)]">{q.r}</p>
        </details>
      ))}
    </div>
  );
}

/** Le bouton foncé à flèche ronde, comme une pastille. */
export function BoutonRdv({ children = "Prendre rendez-vous" }: { children?: React.ReactNode }) {
  return (
    <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex items-center gap-3 min-h-14 rounded-full bg-[var(--encre)] pl-6 pr-2 text-[17px] font-semibold text-[var(--fond)]">
      {children}
      <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-[var(--fond)] text-[var(--encre)]">→</span>
    </Link>
  );
}
