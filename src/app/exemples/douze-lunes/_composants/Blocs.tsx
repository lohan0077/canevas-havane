import Link from "next/link";
import { Croissant } from "./EnTete";
import { DOSSIER, NAVIGATION, QUESTIONS, SOIR, cabinet } from "./donnees";

/** Les douze lunes : la petite frise qui coiffe chaque section. */
export function Lunes({ pleines = 12 }: { pleines?: number }) {
  return (
    <span aria-hidden="true" className="flex gap-1.5">
      {Array.from({ length: 12 }, (_, k) => (
        <span key={k} className={`h-2 w-2 rounded-full ${k < pleines ? "bg-[var(--accent)]" : "border border-[var(--trait)]"}`} />
      ))}
    </span>
  );
}

export function Intitule({
  surtitre,
  titre,
  children,
  niveau = 2,
  pleines,
}: {
  surtitre: string;
  titre: React.ReactNode;
  children?: React.ReactNode;
  niveau?: 1 | 2;
  pleines?: number;
}) {
  const Titre = niveau === 1 ? "h1" : "h2";
  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center gap-4">
        <Lunes pleines={pleines} />
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{surtitre}</p>
      </div>
      <Titre className={niveau === 1 ? "text-[44px] sm:text-6xl" : "text-[38px] sm:text-5xl"}>{titre}</Titre>
      {children && <div className="text-lg leading-relaxed text-[var(--doux)]">{children}</div>}
    </div>
  );
}

export function Section({ id, className = "", children, sombre = false }: { id?: string; className?: string; children: React.ReactNode; sombre?: boolean }) {
  return (
    <section id={id} style={sombre ? SOIR : undefined} className={`scroll-mt-20 ${sombre ? "relative bg-[var(--fond)] text-[var(--encre)]" : ""}`}>
      <div className={`mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24 ${className}`}>{children}</div>
    </section>
  );
}

export function Faq({ questions = QUESTIONS }: { questions?: { q: string; r: string }[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--trait)] text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-3xl pb-6 pr-10 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

/** Le pied du site lui-même (le pied « démonstration » du Cadre vient après). */
export function PiedDeSite() {
  return (
    <footer className="border-t border-[var(--trait)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="flex items-center gap-2.5">
            <Croissant className="h-8 w-8 text-[var(--accent-texte)]" />
            <span className="font-[family-name:var(--titres)] text-3xl">Douze Lunes</span>
          </p>
          <p className="text-[var(--doux)]">{cabinet.accroche}</p>
          <p>
            {cabinet.adresse.join(", ")}
            <br />
            <span className="font-bold tabular-nums">{cabinet.telephone}</span>
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Horaires</p>
          <ul className="space-y-1.5">
            {cabinet.horaires.map((h) => (
              <li key={h.jours} className="flex justify-between gap-4">
                <span>{h.jours}</span>
                <span className="text-right text-[var(--doux)]">{h.heures}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Le site</p>
          <ul className="space-y-1.5">
            {NAVIGATION.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
              </li>
            ))}
            <li>
              <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-10 text-sm text-[var(--doux)] sm:px-6">
        Vétérinaires inscrits au tableau de l&apos;Ordre des vétérinaires · numéros ordinaux d&apos;exemple : 00000 et 00000.
        Prix TTC d&apos;exemple, datés au 1er octobre 2026.
      </p>
    </footer>
  );
}
