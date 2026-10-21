import Link from "next/link";
import { Cadran } from "./EnTete";
import { DOSSIER, NAVIGATION, QUESTIONS, SOMBRE, cabinet } from "./donnees";

export function Intitule({
  numero,
  surtitre,
  titre,
  children,
  niveau = 2,
}: {
  numero?: string;
  surtitre: string;
  titre: React.ReactNode;
  children?: React.ReactNode;
  niveau?: 1 | 2;
}) {
  const Titre = niveau === 1 ? "h1" : "h2";
  return (
    <div className="max-w-2xl space-y-5">
      <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em]">
        {numero && <span className="border border-[var(--encre)] px-1.5 py-0.5 tabular-nums">{numero}</span>}
        <span className="text-[var(--accent-texte)]">{surtitre}</span>
      </p>
      <Titre className={`font-semibold tracking-[-0.02em] ${niveau === 1 ? "text-[46px] sm:text-7xl" : "text-[36px] sm:text-[52px]"}`}>{titre}</Titre>
      {children && <div className="text-[17px] leading-relaxed text-[var(--doux)]">{children}</div>}
    </div>
  );
}

export function Section({ id, className = "", sombre = false, children }: { id?: string; className?: string; sombre?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={sombre ? SOMBRE : undefined} className={`scroll-mt-20 border-b border-[var(--trait)] ${sombre ? "bg-[var(--fond)] text-[var(--encre)]" : ""}`}>
      <div className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 ${className}`}>{children}</div>
    </section>
  );
}

export function Faq({ questions = QUESTIONS }: { questions?: { q: string; r: string }[] }) {
  return (
    <ul className="border-t border-[var(--trait)]">
      {questions.map((x, i) => (
        <li key={x.q} className="border-b border-[var(--trait)]">
          <details className="group">
            <summary className="grid cursor-pointer list-none grid-cols-[2.2rem_1fr_auto] items-start gap-3 py-5 text-[18px] font-semibold [&::-webkit-details-marker]:hidden">
              <span className="text-[13px] tabular-nums text-[var(--doux)] pt-1">{String(i + 1).padStart(2, "0")}</span>
              {x.q}
              <span aria-hidden="true" className="text-xl leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-6 pl-[2.95rem] pr-6 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function PiedDeSite() {
  return (
    <footer style={SOMBRE} className="bg-[var(--fond)] text-[var(--encre)]">
      <div className="mx-auto grid max-w-6xl md:grid-cols-3">
        <div className="space-y-3 border-b border-[var(--trait)] px-4 py-10 sm:px-6 md:border-b-0 md:border-r">
          <p className="flex items-center gap-2.5">
            <Cadran className="h-7 w-7" />
            <span className="font-[family-name:var(--titres)] text-3xl font-semibold">Heure Claire</span>
          </p>
          <p className="text-[var(--doux)]">{cabinet.accroche}</p>
          <p>
            {cabinet.adresse.join(", ")}
            <br />
            <span className="font-semibold tabular-nums">{cabinet.telephone}</span>
            <br />
            <span className="text-[var(--doux)]">{cabinet.horaires}</span>
          </p>
        </div>
        <div className="space-y-3 border-b border-[var(--trait)] px-4 py-10 sm:px-6 md:border-b-0 md:border-r">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Le site</p>
          <ul className="space-y-1.5">
            {NAVIGATION.map((l) => (
              <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
            ))}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
        <div className="space-y-3 px-4 py-10 text-sm leading-relaxed text-[var(--doux)] sm:px-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Profession réglementée</p>
          <p>
            Société d&apos;expertise comptable inscrite au tableau de l&apos;Ordre des
            experts-comptables · numéro d&apos;exemple : 00&nbsp;000&nbsp;000. Règles professionnelles :
            décret n° 2012-432 du 30 mars 2012. Honoraires d&apos;exemple, hors taxes.
          </p>
        </div>
      </div>
    </footer>
  );
}
