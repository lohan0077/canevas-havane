import Link from "next/link";
import { DOSSIER, NAVIGATION, QUESTIONS, SOMBRE, cabinet } from "./donnees";
import { Medaillon, Rosace } from "./Ornements";

export function Intitule({ surtitre, titre, children, niveau = 2, centre = false }: { surtitre: string; titre: React.ReactNode; children?: React.ReactNode; niveau?: 1 | 2; centre?: boolean }) {
  const Titre = niveau === 1 ? "h1" : "h2";
  return (
    <div className={`max-w-2xl space-y-5 ${centre ? "mx-auto text-center" : ""}`}>
      <p className={`flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-texte)] ${centre ? "justify-center" : ""}`}>
        <span aria-hidden="true" className="h-px w-8 bg-current" />
        {surtitre}
        {centre && <span aria-hidden="true" className="h-px w-8 bg-current" />}
      </p>
      <Titre className={`font-semibold tracking-[-0.01em] ${niveau === 1 ? "text-[48px] sm:text-7xl" : "text-[38px] sm:text-[54px]"}`}>{titre}</Titre>
      {children && <div className="text-[17px] leading-relaxed text-[var(--doux)]">{children}</div>}
    </div>
  );
}

export function Section({ id, className = "", sombre = false, children }: { id?: string; className?: string; sombre?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={sombre ? SOMBRE : undefined} className={`relative scroll-mt-20 ${sombre ? "overflow-hidden bg-[var(--fond)] text-[var(--encre)]" : ""}`}>
      {sombre && <Rosace className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] text-[var(--accent)] opacity-25" />}
      <div className={`relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24 ${className}`}>{children}</div>
    </section>
  );
}

export function Faq({ questions = QUESTIONS }: { questions?: { q: string; r: string }[] }) {
  return (
    <ul className="border-t-[3px] border-double border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q} className="border-b border-[var(--trait)]">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 font-[family-name:var(--titres)] text-[23px] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="mt-0.5 font-[family-name:var(--texte)] text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-3xl pb-6 pr-8 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function PiedDeSite() {
  return (
    <footer style={SOMBRE} className="relative overflow-hidden bg-[var(--fond)] text-[var(--encre)]">
      <Rosace className="pointer-events-none absolute -right-36 -top-36 h-80 w-80 text-[var(--accent)] opacity-20" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="flex items-center gap-3">
            <Medaillon className="text-[var(--accent-texte)]" />
            <span className="font-[family-name:var(--titres)] text-3xl font-semibold">Premier Billet</span>
          </p>
          <p className="font-[family-name:var(--titres)] text-xl italic text-[var(--accent-texte)]">{cabinet.signature}</p>
          <p className="text-[var(--doux)]">
            Expertise comptable · créateurs d&apos;entreprise
            <br />
            {cabinet.adresse.join(", ")}
            <br />
            <span className="font-semibold text-[var(--encre)] tabular-nums">{cabinet.telephone}</span>
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Le site</p>
          <ul className="space-y-1.5">
            {NAVIGATION.map((l) => (
              <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
            ))}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
        <div className="space-y-3 text-sm leading-relaxed text-[var(--doux)]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Profession réglementée</p>
          <p>
            Société d&apos;expertise comptable inscrite au tableau de l&apos;Ordre des
            experts-comptables · numéro d&apos;exemple : 00&nbsp;000&nbsp;000. Règles
            professionnelles : décret n° 2012-432 du 30 mars 2012. Honoraires d&apos;exemple, hors taxes.
          </p>
        </div>
      </div>
    </footer>
  );
}
