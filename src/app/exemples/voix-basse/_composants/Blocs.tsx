import Link from "next/link";
import { Monogramme } from "./EnTete";
import { DOSSIER, NAVIGATION, QUESTIONS, SOMBRE, cabinet } from "./donnees";

/** L'onde qui s'éteint : la signature graphique de Voix Basse. */
export function Onde({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 24" aria-hidden="true" className={`h-5 w-24 ${className}`}>
      <path
        d="M2 12 C10 2 18 22 26 12 S42 4 50 12 S64 18 72 12 S84 9 92 12 S104 13 118 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Intitule({
  surtitre,
  titre,
  children,
  niveau = 2,
}: {
  surtitre: string;
  titre: React.ReactNode;
  children?: React.ReactNode;
  niveau?: 1 | 2;
}) {
  const Titre = niveau === 1 ? "h1" : "h2";
  return (
    <div className="max-w-2xl space-y-5">
      <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">
        <Onde className="h-4 w-14" />
        {surtitre}
      </p>
      <Titre className={niveau === 1 ? "text-[50px] sm:text-7xl" : "text-[42px] sm:text-6xl"}>{titre}</Titre>
      {children && <div className="text-lg leading-relaxed text-[var(--doux)]">{children}</div>}
    </div>
  );
}

export function Section({
  id,
  className = "",
  sombre = false,
  teinte = false,
  children,
}: {
  id?: string;
  className?: string;
  sombre?: boolean;
  /** Un fond lilas pâle, pour une bande qui respire. */
  teinte?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      style={sombre ? SOMBRE : undefined}
      className={`scroll-mt-24 ${sombre ? "bg-[var(--fond)] text-[var(--encre)]" : teinte ? "bg-[#EFE8F7]" : ""}`}
    >
      <div className={`mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-28 ${className}`}>{children}</div>
    </section>
  );
}

export function Faq({ questions = QUESTIONS }: { questions?: { q: string; r: string }[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 font-[family-name:var(--titres)] text-[26px] leading-tight [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="mt-1 font-[family-name:var(--texte)] text-2xl leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-3xl pb-7 pr-8 text-lg leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function PiedDeSite() {
  return (
    <footer style={SOMBRE} className="bg-[var(--fond)] text-[var(--encre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="flex items-center gap-3">
            <Monogramme className="bg-[var(--accent)] text-[var(--sur-accent)]" />
            <span className="font-[family-name:var(--titres)] text-4xl">Voix Basse</span>
          </p>
          <p className="font-[family-name:var(--titres)] text-2xl italic text-[var(--accent-texte)]">{cabinet.signature}</p>
          <p className="text-[var(--doux)]">
            Cabinet vétérinaire · chats et chiens
            <br />
            {cabinet.adresse.join(", ")}
            <br />
            <span className="font-semibold text-[var(--encre)] tabular-nums">{cabinet.telephone}</span>
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Horaires</p>
          <ul className="space-y-2">
            {cabinet.horaires.map((h) => (
              <li key={h.jours}>
                <span className="block">{h.jours}</span>
                <span className="block text-[var(--doux)]">{h.heures}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Le site</p>
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
      <p className="mx-auto max-w-6xl px-5 pb-12 text-sm text-[var(--doux)] sm:px-8">
        Vétérinaires inscrits au tableau de l&apos;Ordre des vétérinaires · numéros ordinaux d&apos;exemple : 00000 et 00000.
        Prix TTC d&apos;exemple, au 1er octobre 2026.
      </p>
    </footer>
  );
}
