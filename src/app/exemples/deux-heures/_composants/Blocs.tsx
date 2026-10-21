import Link from "next/link";
import { DOSSIER, NAVIGATION, SAMEDIS, entreprise, type Question } from "./donnees";
import { Logo } from "./EnTete";

/** Une étiquette technique entre crochets : « [ MARIAGES // SAMEDIS 2027 ] ». */
export function Crochets({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--doux)] ${className}`}>[ {children} ]</p>;
}

/**
 * Les samedis encore libres, posés sur chaque page. Ce que montre la grille est ce que
 * dit l'agenda : rien ne bascule tout seul à l'écran pour presser le visiteur. Ici,
 * des samedis d'exemple, et la page le dit.
 */
export function SamedisLibres() {
  return (
    <section id="samedis-libres" className="scroll-mt-16 border-y border-[var(--trait)] bg-[var(--carte)]">
      <div className="max-w-6xl mx-auto px-5 py-12 sm:py-16 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <Crochets>Mis à jour à chaque réservation</Crochets>
            <h2 className="text-[30px] sm:text-5xl font-extrabold uppercase tracking-[-0.03em]">Les samedis <span className="font-light">encore libres</span></h2>
          </div>
          <Link href={`${DOSSIER}/samedis-libres`} className="inline-flex h-11 items-center rounded-full bg-[var(--accent)] px-5 text-[14px] font-semibold text-[var(--sur-accent)]">
            Bloquer ma date
          </Link>
        </div>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {SAMEDIS.map((s) => (
            <li key={s.id} className={`rounded-[16px] border p-3 text-center ${s.pris ? "border-[var(--trait)] text-[var(--doux)]" : "border-[var(--accent)]"}`}>
              <span className="block text-[11px] uppercase tracking-[0.14em]">Samedi</span>
              <span className="block font-[family-name:var(--titres)] text-[30px] font-extrabold leading-tight">{s.jour}</span>
              <span className="block text-[13px]">{s.mois}</span>
              <span className={`mt-1 block text-[12px] font-semibold uppercase tracking-[0.1em] ${s.pris ? "" : "text-[var(--accent-texte)]"}`}>{s.pris ? "Pris" : "Libre"}</span>
            </li>
          ))}
        </ul>
        <p className="text-[13px] text-[var(--doux)]">Samedis d&apos;exemple, juin et juillet 2027 : l&apos;entreprise est fictive.</p>
      </div>
    </section>
  );
}

export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[18px] font-semibold [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--trait)] text-lg transition-transform group-open:rotate-45">+</span>
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
          <p className="text-[var(--doux)]">DJ de mariage. La piste encore pleine à deux heures du matin, selon la salle.</p>
        </div>
        <ul className="space-y-2">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>
          ))}
        </ul>
        <ul className="space-y-2">
          <li><a href={`tel:${entreprise.telephoneLien}`} className="tabular-nums hover:underline underline-offset-4">{entreprise.telephone}</a></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:underline underline-offset-4">Mentions légales et crédits</Link></li>
          <li className="text-sm text-[var(--doux)]">Prix TTC d&apos;exemple · heure de fin selon la salle</li>
        </ul>
      </div>
    </footer>
  );
}
