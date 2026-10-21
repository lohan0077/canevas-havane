import Image from "next/image";
import Link from "next/link";
import { DOSSIER, QUESTIONS, euros, type Bijou } from "./donnees";

/** Le petit libellé au-dessus d'un titre : capitales espacées, entre deux filets d'or. */
export function Libelle({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`text-[12px] font-semibold uppercase tracking-[0.24em] ${clair ? "text-[#C9A86A]" : "text-[var(--accent-texte)]"}`}>
      {children}
    </p>
  );
}

/** Un bijou de la collection : sa photo, son nom, son prix d'exemple. */
export function CarteBijou({ b, sizes }: { b: Bijou; sizes: string }) {
  return (
    <Link href={`${DOSSIER}/bijoux#${b.id}`} className="group block space-y-3">
      <span className="block aspect-[4/5] overflow-hidden bg-[var(--carte)]">
        <Image src={b.image.src} alt={b.image.alt} width={b.image.largeur} height={b.image.hauteur} sizes={sizes} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </span>
      <span className="block">
        <span className="block text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--doux)]">{b.type}</span>
        <span className="block font-[family-name:var(--titres)] text-[28px] italic leading-tight">{b.nom}</span>
        <span className="block text-[15px]">{euros(b.prix)} TTC <span className="text-[var(--doux)]">· exemple</span></span>
      </span>
    </Link>
  );
}

/** Questions et réponses dépliables, sans JavaScript. */
export function Faq() {
  return (
    <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {QUESTIONS.map((x) => (
        <details key={x.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-[family-name:var(--titres)] text-[26px] leading-snug [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--trait)] text-xl transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}
