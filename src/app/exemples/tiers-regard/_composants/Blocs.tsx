import Link from "next/link";
import { DOSSIER, cabinet } from "./donnees";

/** Le monogramme : un tiers, dans un carré jaune. */
export function Monogramme({ className = "h-9 w-9 text-[17px]" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-[6px] bg-[var(--accent)] font-[family-name:var(--titres)] font-bold text-[var(--sur-accent)] ${className}`}>
      ⅓
    </span>
  );
}

/** Une étiquette technique : petites capitales espacées, un trait jaune devant. */
export function Etiquette({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)] ${className}`}>
      <span aria-hidden="true" className="h-px w-6 bg-[var(--accent)]" />
      {children}
    </p>
  );
}

/** Le titre d'une section, numéroté comme la page d'un rapport. */
export function Intitule({ numero, etiquette, titre, children, niveau = 2 }: { numero: string; etiquette: string; titre: React.ReactNode; children?: React.ReactNode; niveau?: 1 | 2 }) {
  const Titre = niveau === 1 ? "h1" : "h2";
  return (
    <div className="max-w-3xl space-y-4">
      <p className="flex items-baseline gap-3 text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">
        <span className="text-[var(--accent-texte)]">{numero}</span>
        <span aria-hidden="true" className="h-px flex-1 max-w-16 translate-y-[-3px] bg-[var(--trait)]" />
        {etiquette}
      </p>
      <Titre className="font-[family-name:var(--titres)] text-[36px] font-semibold leading-[1.02] tracking-[-0.025em] sm:text-[54px]">{titre}</Titre>
      {children && <div className="max-w-2xl text-[17px] leading-relaxed text-[var(--doux)]">{children}</div>}
    </div>
  );
}

export function Section({ id, className = "", children, label }: { id?: string; className?: string; children: React.ReactNode; label?: string }) {
  return (
    <section id={id} aria-label={label} className="scroll-mt-20 border-t border-[var(--trait)]">
      <div className={`mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24 ${className}`}>{children}</div>
    </section>
  );
}

/** Comme tout diagnostiqueur : la phrase qui accompagne chaque mention de l'indépendance. */
export function CommeTous({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[15px] leading-relaxed text-[var(--doux)] ${className}`}>
      Comme tout diagnostiqueur : aucun lien avec ton agence, ni avec une entreprise de travaux
      (code de la construction et de l&apos;habitation, art.&nbsp;L271-6).
    </p>
  );
}

/** La certification, domaine par domaine. Numéros d'exemple. */
export function Certification() {
  const domaines = ["DPE", "Amiante", "Électricité", "Gaz", "Plomb", "Termites"];
  return (
    <div className="space-y-4" data-film="certification">
      <p className="text-[16px] font-medium leading-snug">
        {cabinet.diagnostiqueuse}, certifiée par un organisme accrédité · certificat n°&nbsp;0000 (exemple) ·
        assurance de responsabilité civile professionnelle (exemple)
      </p>
      <ul className="flex flex-wrap gap-2">
        {domaines.map((d) => (
          <li key={d} className="rounded-[6px] border border-[var(--trait)] px-3 py-1.5 text-[13px] font-medium uppercase tracking-[0.12em]">
            <span aria-hidden="true" className="mr-1.5 text-[var(--accent-texte)]">■</span>
            {d}
          </li>
        ))}
      </ul>
      <p className="text-[14px] leading-relaxed text-[var(--doux)]">
        La certification se délivre domaine par domaine, pour une durée limitée. Elle se vérifie
        dans l&apos;annuaire officiel des diagnostiqueurs certifiés du ministère.
      </p>
    </div>
  );
}

export function PiedDeSite() {
  return (
    <div className="border-t border-[var(--trait)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-[1fr_1.3fr]">
        <div className="space-y-3">
          <p className="flex items-center gap-3">
            <Monogramme />
            <span className="font-[family-name:var(--titres)] text-[24px] font-semibold tracking-[-0.02em]">Tiers Regard</span>
          </p>
          <p className="font-[family-name:var(--titres)] text-[19px]">Je dis ce que je vois.</p>
          <p className="text-[15px]">
            <a href={`tel:${cabinet.telephone.replace(/ /g, "")}`} className="font-medium underline underline-offset-4">{cabinet.telephone}</a>
            <span className="text-[var(--doux)]"> · numéro de fiction</span>
          </p>
          <p className="text-[15px]">
            <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link>
          </p>
        </div>
        <div className="space-y-2 text-[14px] leading-relaxed text-[var(--doux)]">
          <p>{cabinet.nom}, diagnostic immobilier · {cabinet.adresse} (exemple).</p>
          <p>Certifiée DPE, amiante, électricité, gaz, plomb et termites par un organisme accrédité · certificat n° 0000 (exemple). Assurance de responsabilité civile professionnelle : assureur d&apos;exemple.</p>
          <p>Comme tout diagnostiqueur : aucun lien avec ton agence, ni avec une entreprise de travaux (CCH, art. L271-6), et aucun avantage accordé à quiconque pour être recommandé (art. R271-3). Aucune entreprise de travaux n&apos;est recommandée sur ce site.</p>
        </div>
      </div>
    </div>
  );
}
