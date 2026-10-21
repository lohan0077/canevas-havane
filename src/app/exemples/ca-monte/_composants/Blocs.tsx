import Link from "next/link";
import Velo from "./Velo";
import { DOSSIER, QUESTIONS, euros, type Occasion } from "./donnees";

/** Le libellé en capitales, précédé d'un petit carré citron. */
export function Libelle({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.14em] ${clair ? "text-[#C3C7CC]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className="h-2.5 w-2.5 bg-[#D7F23C] ring-1 ring-[var(--encre)]/20" />
      {children}
    </p>
  );
}

/** Un vélo d'occasion dans une liste : dessin, nom, batterie testée, prix d'exemple. */
export function CarteOccasion({ o }: { o: Occasion }) {
  return (
    <Link href={`${DOSSIER}/occasion/${o.id}`} className="group block overflow-hidden rounded-[24px] border-2 border-[var(--sombre)] bg-[var(--carte)]">
      <span className="block bg-[#E7E6DF] p-4">
        <Velo couleur={o.couleur} batterie={!!o.batterie} roues="#121417" className="mx-auto h-24 w-auto transition-transform duration-500 group-hover:-translate-y-1" />
      </span>
      <span className="block space-y-1 p-4">
        <span className="block font-[family-name:var(--titres)] text-[22px] font-bold uppercase leading-tight">{o.nom}</span>
        <span className="block text-[14px] text-[var(--doux)]">{o.annee} · {o.km.toLocaleString("fr-FR")} km · taille {o.taille.split(" ·")[0]}</span>
        <span className="flex items-center justify-between gap-3 pt-2">
          <span className="rounded-full bg-[var(--sombre)] px-3 py-1 text-[13px] font-bold text-[#D7F23C]">{o.batterie ? `Batterie ${o.batterie.capacite} %` : "Sans batterie"}</span>
          <span className="font-[family-name:var(--titres)] text-[22px] font-bold tabular-nums">{euros(o.prix)}</span>
        </span>
      </span>
    </Link>
  );
}

/** Questions et réponses dépliables, sans JavaScript. */
export function Faq() {
  return (
    <div className="space-y-2.5">
      {QUESTIONS.map((x) => (
        <details key={x.q} className="group rounded-[20px] border-2 border-[var(--sombre)] bg-[var(--carte)] px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-4 text-[18px] font-bold leading-snug [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#D7F23C] text-xl text-[var(--sombre)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-5 leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}
