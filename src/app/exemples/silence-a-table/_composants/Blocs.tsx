import Link from "next/link";
import { DOSSIER, NAVIGATION, entreprise, type Menu, type Plat, type Question } from "./donnees";
import { Logo } from "./EnTete";

/** Le petit surtitre, en capitales espacées, cuivre. */
export function Surtitre({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--accent-texte)]">{children}</p>;
}

export function Allergenes({ liste }: { liste: string[] }) {
  return (
    <p className="text-[13px] leading-relaxed text-[var(--doux)]">
      <span className="font-semibold text-[var(--encre)]">Allergènes&nbsp;: </span>
      {liste.length ? liste.join(", ") : "aucun des quatorze"}
    </p>
  );
}

/**
 * Le menu en trois cartes hautes, l'intitulé couché le long du bord (entrée, plat,
 * dessert), le plat, sa description, ses allergènes.
 */
export function CartesMenu({ menu }: { menu: Menu }) {
  const plats: [string, Plat][] = [["entrée", menu.entree], ["plat", menu.plat], ["dessert", menu.dessert]];
  return (
    <ol className="grid gap-3 md:grid-cols-3">
      {plats.map(([titre, p]) => (
        <li key={titre} className="relative flex min-h-[220px] rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] overflow-hidden">
          <p aria-hidden="true" className="flex w-14 shrink-0 items-center justify-center border-r border-[var(--trait)] font-[family-name:var(--titres)] text-[30px] text-[var(--accent-texte)] [writing-mode:vertical-rl] rotate-180">
            {titre}
          </p>
          <div className="flex flex-col gap-2 p-5">
            <p className="sr-only">{titre}</p>
            <h3 className="text-[26px] leading-tight">{p.nom}</h3>
            <p className="leading-relaxed text-[var(--doux)]">{p.detail}</p>
            <div className="mt-auto pt-2">
              <Allergenes liste={p.allergenes} />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[family-name:var(--titres)] text-[24px] leading-snug [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="text-[var(--accent-texte)] text-2xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-5 pr-8 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function PiedDeSite() {
  return (
    <footer className="border-t border-[var(--trait)]">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-8 sm:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-[var(--doux)]">Traiteur de mariage. Le prix par personne sur la page, la dégustation en ligne.</p>
        </div>
        <ul className="space-y-2">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>
          ))}
        </ul>
        <ul className="space-y-2">
          <li><a href={`tel:${entreprise.telephoneLien}`} className="tabular-nums hover:underline underline-offset-4">{entreprise.telephone}</a></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:underline underline-offset-4">Mentions légales et crédits</Link></li>
          <li className="text-sm text-[var(--doux)]">Prix TTC par personne, d&apos;exemple · allergènes plat par plat</li>
        </ul>
      </div>
    </footer>
  );
}
