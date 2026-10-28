import Link from "next/link";
import Paraphe from "./Paraphe";
import { DOSSIER, LECTEURS, QUESTIONS, type NomLecteur } from "./donnees";

/** Le libellé au-dessus des titres : un petit trait d'encre et des capitales espacées. */
export function Libelle({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`text-[12px] font-semibold uppercase tracking-[0.2em] ${clair ? "text-[#E9C46A]" : "text-[var(--accent-texte)]"}`}>
      {children}
    </p>
  );
}

/** Les quatre lecteurs de la boutique, chacun avec son paraphe. */
export function Lecteurs() {
  return (
    <ul className="grid gap-px border border-[var(--trait)] bg-[var(--trait)] sm:grid-cols-2 lg:grid-cols-4">
      {(Object.keys(LECTEURS) as NomLecteur[]).map((n) => (
        <li key={n} className="space-y-2 bg-[var(--carte)] p-6">
          <Paraphe lecteur={n} anime={false} className="h-14 w-36 text-[#2B4C8C]" />
          <h3 className="text-[28px]">{n}</h3>
          <p className="leading-relaxed text-[var(--doux)]">{LECTEURS[n].lit}</p>
        </li>
      ))}
    </ul>
  );
}

/** Le port d'un livre neuf, dit simplement. */
export function Port() {
  return (
    <dl className="grid gap-px border border-[var(--trait)] bg-[var(--trait)] sm:grid-cols-2">
      <div className="space-y-1 bg-[var(--carte)] p-6">
        <dt className="text-[12px] font-semibold uppercase tracking-[0.16em]">Retiré en boutique</dt>
        <dd className="font-[family-name:var(--titres)] text-[56px] leading-none">0 €</dd>
        <dd className="text-[var(--doux)]">de port : c&apos;est la seule exception que la loi prévoit.</dd>
      </div>
      <div className="space-y-1 bg-[var(--carte)] p-6">
        <dt className="text-[12px] font-semibold uppercase tracking-[0.16em]">Par la poste</dt>
        <dd className="font-[family-name:var(--titres)] text-[56px] leading-none">3 €</dd>
        <dd className="text-[var(--doux)]">au moins, sous 35 € de livres neufs ; jamais gratuit au-delà.</dd>
      </div>
      <p className="bg-[var(--fond)] p-4 text-[13px] text-[var(--doux)] sm:col-span-2">Loi n° 81-766 du 10 août 1981, art. 1 ; arrêté du 4 avril 2023, art. 1. Paraphe n&apos;expédie pas encore : on réserve, on retire.</p>
    </dl>
  );
}

/** Questions et réponses dépliables, sans JavaScript. */
export function Faq() {
  return (
    <div className="divide-y divide-dashed divide-[var(--trait)] border-y border-[var(--trait)]">
      {QUESTIONS.map((x) => (
        <details key={x.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-[family-name:var(--titres)] text-[26px] leading-snug [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="shrink-0 font-[family-name:var(--titres)] text-3xl italic text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}

/** Le lien qui renvoie vers la commande à l'unité. */
export function LienCommande() {
  return (
    <Link href={`${DOSSIER}/commander`} className="font-semibold underline underline-offset-4">
      Commander un livre à l&apos;unité
    </Link>
  );
}
