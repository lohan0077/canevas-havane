import Link from "next/link";
import { CONTACT, DOSSIER, NAVIGATION, NIVEAUX, QUESTIONS } from "./donnees";

const euros = (n: number) => `${n.toLocaleString("fr-FR")} €`;
export { euros };

/** Le monogramme « 8 », comme la marque de la vidéo. */
export function Huit({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`${className} grid shrink-0 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-[18px] font-bold text-[#E0B85C]`}>8</span>
  );
}

/** Un surtitre en petites capitales. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return <p className={`text-[12px] font-bold uppercase tracking-[0.2em] ${clair ? "text-[#E0B85C]" : "text-[var(--accent-texte)]"}`}>{children}</p>;
}

/** Les quatre niveaux de restriction d'eau, du plus doux au plus strict. */
export function Niveaux() {
  return (
    <ol className="grid gap-2 sm:grid-cols-4" data-film="niveaux">
      {NIVEAUX.map((n, i) => (
        <li key={n.nom} className="rounded-[18px] p-4" style={{ background: ["#F8F4EA", "#F2E3C0", "#E9C99A", "#E4B898"][i] }}>
          <p className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[#2F4A2C]">
            <span aria-hidden="true" className="flex gap-0.5">{Array.from({ length: 4 }, (_, k) => <i key={k} className={`block h-3 w-1.5 rounded-sm ${k <= i ? "bg-[#2F4A2C]" : "bg-[#2F4A2C]/20"}`} />)}</span>
            {n.nom}
          </p>
          <p className="mt-2 text-[15px] leading-snug text-[#2F4A2C]">{n.texte}</p>
        </li>
      ))}
    </ol>
  );
}

/** Les questions fréquentes, dépliables sans script. */
export function Faq() {
  return (
    <div className="space-y-2.5">
      {QUESTIONS.map((x) => (
        <details key={x.q} className="group rounded-[22px] bg-[var(--carte)] px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[18px] font-bold [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-5 text-[16px] leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}

/** Le pied du site Vert en Août (avant celui, commun, de la démonstration). */
export function Pied() {
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="flex items-center gap-3"><Huit /><span className="font-[family-name:var(--titres)] text-[24px] font-bold">Vert en Août</span></p>
          <p className="max-w-xs text-[16px] leading-relaxed">Des jardins qui ont peu soif. On les juge le 15 août, pas en avril.</p>
        </div>
        <div className="space-y-3">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#E0B85C]">Le site</p>
          <ul className="space-y-2 text-[15px]">
            {NAVIGATION.map((l) => <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>)}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
        <div className="space-y-2 text-[15px] leading-relaxed">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#E0B85C]">Nous appeler</p>
          <p>{CONTACT.adresse}</p>
          <p>{CONTACT.zone}</p>
          <p className="font-bold">{CONTACT.telephone}</p>
        </div>
      </div>
    </footer>
  );
}

/** Ligne de prix d'un devis. */
export function LignePrix({ libelle, montant, fort = false }: { libelle: string; montant: number; fort?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 ${fort ? "text-[18px] font-bold" : "text-[15px]"}`}>
      <span>{libelle}</span>
      <span className="whitespace-nowrap tabular-nums">{euros(montant)}</span>
    </div>
  );
}
