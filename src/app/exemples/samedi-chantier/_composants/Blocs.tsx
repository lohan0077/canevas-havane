import Link from "next/link";
import { DOSSIER, NAVIGATION, entreprise, euros, type Machine, type Question } from "./donnees";
import { Logo } from "./Pictos";

/** Le repère technique d'une section : « 03 — Les machines ». */
export function Repere({ numero, children, clair = false }: { numero: string; children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.16em] ${clair ? "" : "text-[var(--doux)]"}`}>
      <span className="tabular-nums">{numero}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

/** Un grand titre de section, en capitales serrées. */
export function Titre({ children, niveau = 2, className = "" }: { children: React.ReactNode; niveau?: 1 | 2; className?: string }) {
  const Balise = niveau === 1 ? "h1" : "h2";
  return (
    <Balise className={`font-black uppercase tracking-[-0.03em] ${niveau === 1 ? "text-[44px] sm:text-7xl" : "text-[36px] sm:text-6xl"} ${className}`}>
      {children}
    </Balise>
  );
}

export function CarteMachine({ m, lien }: { m: Machine; lien?: string }) {
  const corps = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[22px] font-black uppercase tracking-[-0.01em]">{m.nom}</h3>
        {lien && <span aria-hidden="true" className="text-2xl leading-none">→</span>}
      </div>
      <p className="leading-relaxed text-[var(--doux)]">{m.usage}</p>
      <p>
        <span className="block font-[family-name:var(--titres)] text-3xl font-black tabular-nums">{euros(m.jour)}</span>
        <span className="block text-[12px] font-bold uppercase tracking-[0.12em]">TTC la journée · exemple</span>
      </p>
      {m.chauffeur && <p className="text-sm font-semibold">Avec chauffeur : {euros(m.chauffeur)} la journée</p>}
      <div className="border-t border-[var(--trait)] pt-3 space-y-1.5">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--doux)]">Capacité du fabricant</p>
        <ul className="flex flex-wrap gap-1.5">
          {m.fabricant.map((f) => (
            <li key={f} className="rounded-full border border-[var(--trait)] px-2.5 py-1 text-[13px]">{f}</li>
          ))}
        </ul>
      </div>
    </>
  );
  const classes = "flex h-full flex-col gap-3 rounded-[18px] border border-[var(--encre)] bg-[var(--carte)] p-5";
  return lien ? (
    <Link href={lien} className={`${classes} hover:bg-[var(--fond)] transition-colors`}>{corps}</Link>
  ) : (
    <div className={classes}>{corps}</div>
  );
}

export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="border-t border-[var(--encre)]">
      {questions.map((x, i) => (
        <li key={x.q} className="border-b border-[var(--encre)]">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
              <span className="pt-1 text-[12px] font-bold tabular-nums text-[var(--doux)]">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-lg font-bold leading-snug">{x.q}</span>
              <span aria-hidden="true" className="text-2xl leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-5 pl-9 pr-8 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function AppelFinal() {
  return (
    <section className="bg-[var(--accent)] text-[var(--sur-accent)] border-y border-[var(--encre)]">
      <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
        <div className="space-y-4">
          <Repere numero="→" clair>Ton samedi</Repere>
          <Titre>Le client ne demande plus un prix. Il réserve son samedi.</Titre>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Link href={`${DOSSIER}/disponibilites`} className="inline-flex h-14 items-center rounded-full bg-[var(--encre)] px-7 font-black uppercase tracking-[0.04em] text-[var(--fond)]">
              Voir les samedis libres
            </Link>
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex h-14 items-center rounded-full border border-[var(--encre)] px-6 font-bold tabular-nums">
              {entreprise.telephone}
            </a>
          </div>
          <p className="text-sm font-medium">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</p>
        </div>
      </div>
    </section>
  );
}

export function PiedDeSite() {
  return (
    <footer className="border-t border-[var(--encre)]">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-8 sm:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-[var(--doux)]">Location de mini-pelles et de petit matériel, livrés chez toi le vendredi soir.</p>
        </div>
        <ul className="space-y-2 font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>
          ))}
        </ul>
        <ul className="space-y-2 font-semibold">
          <li><a href={`tel:${entreprise.telephoneLien}`} className="tabular-nums hover:underline underline-offset-4">{entreprise.telephone}</a></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:underline underline-offset-4">Mentions légales et crédits</Link></li>
          <li className="text-sm font-normal text-[var(--doux)]">Prix TTC d&apos;exemple · capacités : données du fabricant</li>
        </ul>
      </div>
    </footer>
  );
}
