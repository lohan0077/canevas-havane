import Link from "next/link";
import { CONTACT, DOSSIER, NAVIGATION, QUESTIONS } from "./donnees";
import { Monogramme } from "./Dessins";

/** Les questions fréquentes, dépliables sans script. */
export function Faq({ nombre = QUESTIONS.length }: { nombre?: number }) {
  return (
    <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {QUESTIONS.slice(0, nombre).map((x) => (
        <details key={x.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[var(--trait)] text-lg transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-5 leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}

/** Le pied du site Premier Fruit (avant celui, commun, de la démonstration). */
export default function Pied() {
  return (
    <footer className="border-t border-[var(--trait)] bg-[#EFE3D0]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-[1.3fr_1fr_1fr] sm:px-6">
        <div className="space-y-4">
          <p className="flex items-center gap-2.5">
            <Monogramme />
            <span className="font-[family-name:var(--titres)] text-2xl">Premier Fruit</span>
          </p>
          <p className="max-w-xs leading-relaxed text-[var(--doux)]">
            Pépinière d&apos;arbres fruitiers. On ne vend pas un arbre : on vend la première cerise.
          </p>
          <p className="text-sm text-[var(--doux)]">
            Inscrite au registre officiel des opérateurs professionnels et autorisée à délivrer le passeport
            phytosanitaire · FR 00000 · exemple
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em]">Le site</p>
          <ul className="space-y-2">
            {NAVIGATION.map((l) => (
              <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
            ))}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em]">La pépinière</p>
          <p className="leading-relaxed">{CONTACT.adresse}</p>
          <p className="text-sm text-[var(--doux)]">{CONTACT.horaires}</p>
          <p className="font-semibold tabular-nums">{CONTACT.telephone}</p>
        </div>
      </div>
    </footer>
  );
}
