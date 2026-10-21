import Link from "next/link";
import { Monogramme } from "./EnTete";
import { DOSSIER, NAVIGATION, QUESTIONS, SOMBRE, agence } from "./donnees";

/** Les trois bandes des années 70 : brique, ocre, sapin. */
export function Bandes({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`flex gap-1 ${className}`}>
      <span className="h-2 w-6 rounded-full bg-[#A63F2A]" />
      <span className="h-2 w-6 rounded-full bg-[#E3B04B]" />
      <span className="h-2 w-6 rounded-full bg-[#2F3B35] ring-1 ring-[var(--trait)]" />
    </span>
  );
}

export function Intitule({ surtitre, titre, children, niveau = 2 }: { surtitre: string; titre: React.ReactNode; children?: React.ReactNode; niveau?: 1 | 2 }) {
  const Titre = niveau === 1 ? "h1" : "h2";
  return (
    <div className="max-w-2xl space-y-4">
      <p className="flex items-center gap-3 font-[family-name:var(--titres)] text-[14px] font-bold uppercase tracking-[0.12em] text-[var(--accent-texte)]">
        <Bandes />
        {surtitre}
      </p>
      <Titre className={`font-extrabold tracking-[-0.03em] ${niveau === 1 ? "text-[48px] sm:text-7xl" : "text-[38px] sm:text-[56px]"}`}>{titre}</Titre>
      {children && <div className="text-[18px] leading-relaxed text-[var(--doux)]">{children}</div>}
    </div>
  );
}

export function Section({ id, className = "", sombre = false, children }: { id?: string; className?: string; sombre?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={sombre ? SOMBRE : undefined} className={`scroll-mt-20 ${sombre ? "bg-[var(--fond)] text-[var(--encre)]" : ""}`}>
      <div className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 ${className}`}>{children}</div>
    </section>
  );
}

export function Faq({ questions = QUESTIONS }: { questions?: { q: string; r: string }[] }) {
  return (
    <ul className="space-y-3">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group rounded-[20px] border-2 border-[var(--encre)] bg-[var(--carte)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 font-[family-name:var(--titres)] text-[19px] font-bold leading-snug [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-xl text-[var(--sur-accent)] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function PiedDeSite() {
  return (
    <footer style={SOMBRE} className="bg-[var(--fond)] text-[var(--encre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="flex items-center gap-3">
            <Monogramme className="bg-[#3A4842]" />
            <span className="font-[family-name:var(--titres)] text-3xl font-extrabold">Pavillon Bis</span>
          </p>
          <p className="font-[family-name:var(--titres)] text-xl font-bold text-[var(--accent-texte)]">{agence.signature}</p>
          <p className="text-[var(--doux)]">
            Architecture · pavillons des années 70
            <br />
            {agence.adresse.join(", ")}
            <br />
            <span className="font-semibold text-[var(--encre)] tabular-nums">{agence.telephone}</span>
          </p>
        </div>
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-[14px] font-bold uppercase tracking-[0.12em] text-[var(--accent-texte)]">Le site</p>
          <ul className="space-y-1.5">
            {NAVIGATION.map((l) => (
              <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
            ))}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
        <div className="space-y-3 text-sm leading-relaxed text-[var(--doux)]">
          <p className="font-[family-name:var(--titres)] text-[14px] font-bold uppercase tracking-[0.12em] text-[var(--accent-texte)]">Profession réglementée</p>
          <p>
            Architecte inscrit au tableau régional de l&apos;Ordre des architectes · numéro
            d&apos;exemple : 000000. Assurance de responsabilité professionnelle : exemple. Règles
            professionnelles : code de déontologie des architectes.
          </p>
        </div>
      </div>
    </footer>
  );
}
