import Link from "next/link";
import { DOSSIER, NAVIGATION, entreprise, type Question } from "./donnees";
import { Logo } from "./EnTete";

/** Une note manuscrite, dans la marge. */
export function Note({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-[family-name:var(--f-caveat)] text-2xl text-[var(--accent-texte)] -rotate-2 origin-left ${className}`}>{children}</p>;
}

export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="space-y-3">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group rounded-[6px] border-2 border-[var(--encre)] bg-[var(--carte)] px-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="font-[family-name:var(--f-caveat)] text-3xl leading-none text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-5 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function AppelFinal() {
  return (
    <section className="bg-[var(--sombre)] text-[var(--sur-sombre)] [--accent-texte:#F2C14E]">
      <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div className="space-y-3">
          <Note>Mercredi, 14 h&nbsp;?</Note>
          <h2 className="text-5xl sm:text-6xl">Le parent ne compare plus des tarifs. <span className="text-[var(--accent-texte)]">Il réserve le mercredi.</span></h2>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Link href={`${DOSSIER}/reserver`} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--sur-sombre)] text-[var(--encre)] px-6 font-bold">Voir les créneaux</Link>
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex min-h-[52px] items-center rounded-full border-2 border-[var(--sur-sombre)] px-6 font-bold tabular-nums">{entreprise.telephone}</a>
          </div>
          <p className="text-sm">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</p>
        </div>
      </div>
    </section>
  );
}

export function PiedDeSite() {
  return (
    <footer className="border-t-2 border-[var(--encre)]">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-8 sm:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-[var(--doux)]">Cours de maths à domicile, du collège au lycée, avec {entreprise.prof}</p>
          <p className="text-sm text-[var(--doux)]">Déclaration de services à la personne n°&nbsp;{entreprise.sap} (exemple).</p>
        </div>
        <ul className="space-y-2 font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
        <ul className="space-y-2 font-semibold">
          <li><a href={`tel:${entreprise.telephoneLien}`} className="tabular-nums hover:underline">{entreprise.telephone}</a></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:underline">Mentions légales et crédits</Link></li>
        </ul>
      </div>
    </footer>
  );
}
