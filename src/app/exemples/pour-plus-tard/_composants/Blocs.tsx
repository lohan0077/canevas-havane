import Link from "next/link";
import { DOSSIER, entreprise, type Question } from "./donnees";

/** Un cartel de musée : numéro de fiche, rubrique. */
export function Cartel({ numero, children, className = "" }: { numero: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] ${className}`}>
      <span className="tabular-nums whitespace-nowrap">Fig.&nbsp;{numero}</span>
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-current" />
      <span>{children}</span>
    </p>
  );
}

export function Bouton({ href, children, clair = false }: { href: string; children: React.ReactNode; clair?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 font-bold ${
        clair ? "bg-[var(--fond)] text-[var(--encre)]" : "bg-[var(--accent)] text-[var(--sur-accent)]"
      }`}
    >
      {children}
    </Link>
  );
}

export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="border-t border-[var(--encre)]">
      {questions.map((x, i) => (
        <li key={x.q} className="border-b border-[var(--trait)]">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5 [&::-webkit-details-marker]:hidden">
              <span className="text-xs font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-[family-name:var(--titres)] text-xl leading-snug">{x.q}</span>
              <span aria-hidden="true" className="text-2xl leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-6 pl-9 pr-6 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function AppelFinal() {
  return (
    <section className="bg-[var(--sombre)] text-[var(--sur-sombre)] [--doux:#E3D6C2]">
      <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 text-center space-y-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Pour plus tard</p>
        <h2 className="text-[42px] sm:text-6xl italic font-normal max-w-3xl mx-auto">
          Dans trente ans, quelqu&apos;un ouvrira cette boîte.
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Bouton href={`${DOSSIER}/la-boite#reserver`} clair>Réserver ma séance</Bouton>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex min-h-[52px] items-center rounded-full border border-[var(--sur-sombre)] px-7 font-bold tabular-nums">
            {entreprise.telephone}
          </a>
        </div>
        <p className="text-sm">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</p>
      </div>
    </section>
  );
}

export function PiedDeSite() {
  return (
    <footer className="border-t border-[var(--encre)]">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-8 sm:grid-cols-3">
        <div className="space-y-2">
          <p className="font-[family-name:var(--titres)] text-3xl italic">Pour Plus Tard</p>
          <p className="text-[var(--doux)]">{entreprise.baseline} Studio photo de famille.</p>
        </div>
        <ul className="space-y-2 text-sm font-bold uppercase tracking-[0.14em]">
          <li><Link href={`${DOSSIER}/la-boite`} className="hover:underline">La boîte</Link></li>
          <li><Link href={`${DOSSIER}/la-vitrine`} className="hover:underline">La vitrine</Link></li>
          <li><Link href={`${DOSSIER}/la-boite#reserver`} className="hover:underline">Réserver</Link></li>
        </ul>
        <ul className="space-y-2 text-sm font-bold uppercase tracking-[0.14em]">
          <li><a href={`tel:${entreprise.telephoneLien}`} className="tabular-nums hover:underline">{entreprise.telephone}</a></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:underline">Mentions légales et crédits</Link></li>
        </ul>
      </div>
    </footer>
  );
}
