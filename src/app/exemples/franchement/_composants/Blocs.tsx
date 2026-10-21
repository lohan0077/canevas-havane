import Link from "next/link";
import { DOSSIER, NAVIGATION, entreprise, type Question } from "./donnees";
import { Logo } from "./EnTete";

export function Pastille({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-[var(--carte)] px-3.5 py-1.5 text-sm font-semibold">
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--accent)]" />
      {children}
    </p>
  );
}

export function Bouton({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "clair" | "contour" }) {
  const styles = {
    plein: "bg-[var(--accent)] text-[var(--sur-accent)]",
    clair: "bg-[var(--fond)] text-[var(--encre)]",
    contour: "border border-[var(--encre)]",
  }[variante];
  return (
    <Link href={href} className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 font-bold ${styles}`}>
      {children}
    </Link>
  );
}

export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="space-y-2.5">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group rounded-[24px] bg-[var(--carte)] px-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--fond)] text-lg transition-transform group-open:rotate-45">+</span>
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
    <section className="px-3 pb-3">
      <div className="max-w-6xl mx-auto rounded-[36px] bg-[var(--sombre)] text-[var(--sur-sombre)] [--accent-texte:#B9D3BF] px-6 py-14 sm:px-12 sm:py-20 grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
        <h2 className="text-[40px] sm:text-6xl font-extrabold tracking-[-0.04em]">
          Vingt minutes pour regarder <span className="text-[var(--accent-texte)]">ta question.</span>
        </h2>
        <div className="space-y-5">
          <p className="text-lg leading-relaxed">Sans frais, sans engagement, sans promesse. Si ce n&apos;est pas pour moi, je te le dis.</p>
          <div className="flex flex-wrap gap-3">
            <Bouton href={`${DOSSIER}/premier-appel`} variante="clair">Réserver l&apos;appel</Bouton>
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex min-h-[52px] items-center rounded-full border border-[var(--sur-sombre)] px-6 font-bold tabular-nums">{entreprise.telephone}</a>
          </div>
          <p className="text-sm">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</p>
        </div>
      </div>
    </section>
  );
}

export function PiedDeSite() {
  return (
    <footer className="max-w-6xl mx-auto px-5 py-12 grid gap-8 sm:grid-cols-3">
      <div className="space-y-3">
        <Logo />
        <p className="text-[var(--doux)]">Coaching, sans promesse. En cabinet ou en visio, avec {entreprise.coach}</p>
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
    </footer>
  );
}
