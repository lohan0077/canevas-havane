import Link from "next/link";
import { DOSSIER, NAVIGATION, entreprise, euros, type Question, type Tente } from "./donnees";
import { Logo } from "./EnTete";

/** Le surtitre d'une section, petit, espacé, avec un brin d'herbe. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.18em] ${clair ? "text-[#F2C98A]" : "text-[var(--accent-texte)]"}`}>
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
        <path d="M3 15c0-5 2-9 5-12M8 15c0-4 1-7 4-9M8 15c-1-3-3-5-6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      {children}
    </p>
  );
}

export function CarteTente({ t }: { t: Tente }) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-6">
      <svg viewBox="0 0 120 70" className="h-20 w-auto self-start" aria-hidden="true">
        <path d={`M10 60 L${60 - t.longueur * 1.6} 22 L60 8 L${60 + t.longueur * 1.6} 22 L110 60 Z`} fill="var(--fond)" stroke="var(--encre)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M60 8V60" stroke="var(--accent)" strokeWidth="2" />
        <path d="M2 62c10-3 18 2 30-1s20 2 30-1 22 2 30-1 18 2 26-1" fill="none" stroke="#7FAE5C" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <div className="space-y-1">
        <p className="text-[13px] uppercase tracking-[0.16em] text-[var(--doux)]">{t.surnom}</p>
        <h3 className="text-[32px]">{t.largeur} × {t.longueur} m</h3>
      </div>
      <p className="leading-relaxed text-[var(--doux)]">{t.pour}</p>
      <dl className="mt-auto divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-[15px]">
        <div className="flex items-baseline justify-between gap-3 py-2.5">
          <dt>Invités assis</dt>
          <dd className="text-right"><span className="font-semibold">{t.invites}</span> <span className="text-[12px] text-[var(--doux)]">capacité du fabricant</span></dd>
        </div>
        <div className="flex items-baseline justify-between gap-3 py-2.5">
          <dt>Le week-end</dt>
          <dd className="text-right"><span className="font-semibold">{euros(t.prix)} TTC</span> <span className="text-[12px] text-[var(--doux)]">exemple</span></dd>
        </div>
      </dl>
    </div>
  );
}

export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[family-name:var(--titres)] text-[22px] leading-snug [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--trait)] text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-5 pr-10 leading-relaxed text-[var(--doux)]">{x.r}</p>
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
          <p className="text-[var(--doux)]">Ta salle des fêtes, chez toi. Location de tentes de réception, montées la veille.</p>
        </div>
        <ul className="space-y-2">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>
          ))}
        </ul>
        <ul className="space-y-2">
          <li><a href={`tel:${entreprise.telephoneLien}`} className="tabular-nums hover:underline underline-offset-4">{entreprise.telephone}</a></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:underline underline-offset-4">Mentions légales et crédits</Link></li>
          <li className="text-sm text-[var(--doux)]">Prix TTC d&apos;exemple · capacités du fabricant</li>
        </ul>
      </div>
    </footer>
  );
}
