import Link from "next/link";
import { entreprise, type Question } from "./donnees";

/** Le petit surtitre de chaque section, numéroté comme une planche contact. */
export function Surtitre({ numero, children }: { numero?: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]">
      {numero && <span className="tabular-nums text-[var(--accent-texte)]">{numero}</span>}
      <span>{children}</span>
    </p>
  );
}

export function Bouton({ href, children, clair = false }: { href: string; children: React.ReactNode; clair?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 min-h-[52px] text-base font-bold ${
        clair ? "bg-[var(--fond)] text-[var(--encre)]" : "bg-[var(--accent)] text-[var(--sur-accent)]"
      }`}
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

/** Questions et réponses dépliables, sans JavaScript : `<details>` fait tout. */
export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="border-y border-[var(--trait)] divide-y divide-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[var(--encre)] text-lg leading-none transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="pb-6 pr-10 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

/** La dernière bande de chaque page : le téléphone, et la date à bloquer. */
export function AppelFinal() {
  return (
    <section className="bg-[var(--sombre)] text-[var(--sur-sombre)] [--accent-texte:#E8A27F]">
      <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
        <h2 className="text-[44px] sm:text-6xl font-medium tracking-[-0.02em]">
          On se voit à la <span className="italic">minute 1</span>&nbsp;?
        </h2>
        <div className="space-y-5">
          <p className="leading-relaxed">
            {entreprise.zone}. Appelle, ou choisis directement ta date : la séance est
            bloquée, je te rappelle pour le lieu.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/exemples/minute-quarante/reserver" className="inline-flex items-center rounded-full bg-[var(--fond)] text-[var(--encre)] px-6 min-h-[52px] font-bold">
              Choisir ma date
            </Link>
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex items-center rounded-full border-2 border-[var(--sur-sombre)] px-6 min-h-[52px] font-bold tabular-nums">
              {entreprise.telephone}
            </a>
          </div>
          <p className="text-sm">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</p>
        </div>
      </div>
    </section>
  );
}

/** Le pied du site lui-même, avant celui de la démonstration. */
export function PiedDeSite() {
  return (
    <footer className="border-t border-[var(--trait)]">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-8 sm:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="inline-flex items-baseline gap-1.5 text-2xl leading-none">
            <span className="font-extrabold tracking-[-0.04em]">Minute</span>
            <span className="font-[family-name:var(--titres)] italic text-[var(--accent-texte)]">Quarante</span>
          </p>
          <p className="leading-relaxed text-[var(--doux)]">{entreprise.metier}. {entreprise.zone}.</p>
        </div>
        <ul className="space-y-2 font-semibold">
          <li><Link href="/exemples/minute-quarante/seance-famille" className="hover:underline">La séance famille</Link></li>
          <li><Link href="/exemples/minute-quarante/s-habiller" className="hover:underline">S&apos;habiller</Link></li>
          <li><Link href="/exemples/minute-quarante/reserver" className="hover:underline">Réserver</Link></li>
        </ul>
        <ul className="space-y-2 font-semibold">
          <li><a href={`tel:${entreprise.telephoneLien}`} className="tabular-nums hover:underline">{entreprise.telephone}</a></li>
          <li><Link href="/exemples/minute-quarante/mentions-legales" className="hover:underline">Mentions légales et crédits</Link></li>
        </ul>
      </div>
    </footer>
  );
}
