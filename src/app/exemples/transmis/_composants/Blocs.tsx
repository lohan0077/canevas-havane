import Link from "next/link";
import { DOSSIER, NAVIGATION, RECETTES, entreprise, type Question } from "./donnees";
import { Logo } from "./EnTete";

/** Une note manuscrite, à l'encre bleue, dans la marge. */
export function Note({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-[family-name:var(--f-caveat)] text-[26px] leading-tight text-[#1E3A6E] -rotate-2 origin-left ${className}`}>{children}</p>;
}

/**
 * Les fiches de recettes en éventail, sous le nom : chacune un plat, un prénom, une
 * année. Dessinées ; les prénoms sont inventés. Décor : masqué aux lecteurs d'écran,
 * la liste qui suit dit la même chose en texte.
 */
export function Eventail() {
  const n = RECETTES.length;
  return (
    <div aria-hidden="true" className="relative mx-auto h-[210px] w-full max-w-3xl overflow-hidden sm:h-[280px]">
      {RECETTES.map((r, i) => {
        const k = i - (n - 1) / 2;
        return (
          <div
            key={r.plat}
            className="absolute bottom-0 left-1/2 w-[112px] sm:w-[170px] origin-bottom rounded-[6px] border border-[var(--trait)] bg-[#FFFCF3] px-3 py-3 shadow-[0_16px_30px_-18px_rgba(31,59,45,.6)] [transform:translateX(-50%)_translateX(calc(var(--k)*22px))_rotate(calc(var(--k)*6deg))] sm:[transform:translateX(-50%)_translateX(calc(var(--k)*40px))_rotate(calc(var(--k)*9deg))]"
            style={{ "--k": k, zIndex: 10 - Math.abs(Math.round(k)) } as React.CSSProperties}
          >
            <p className="font-[family-name:var(--f-caveat)] text-[19px] sm:text-[24px] leading-tight text-[#1E3A6E]">{r.plat}</p>
            <p className="font-[family-name:var(--f-caveat)] text-[15px] sm:text-[18px] text-[#4E5F54]">de {r.de}, {r.annee}</p>
            <div className="mt-2 space-y-[7px]">
              {[0, 1, 2, 3, 4].map((l) => <span key={l} className="block h-px bg-[#C9D6E3]" />)}
            </div>
            <div className="mt-2 h-[60px] sm:h-[110px]" />
          </div>
        );
      })}
    </div>
  );
}

export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[family-name:var(--titres)] text-[22px] italic leading-snug [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="font-[family-name:var(--f-caveat)] text-[32px] not-italic text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
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
          <p className="text-[var(--doux)]">La recette de ta famille, servie à 120. Maison de traiteur.</p>
        </div>
        <ul className="space-y-2">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>
          ))}
        </ul>
        <ul className="space-y-2">
          <li><a href={`tel:${entreprise.telephoneLien}`} className="tabular-nums hover:underline underline-offset-4">{entreprise.telephone}</a></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:underline underline-offset-4">Mentions légales et crédits</Link></li>
          <li className="text-sm text-[var(--doux)]">Prix TTC par personne, d&apos;exemple · allergènes avant commande</li>
        </ul>
      </div>
    </footer>
  );
}
