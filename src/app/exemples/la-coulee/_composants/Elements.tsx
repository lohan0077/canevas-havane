import Link from "next/link";
import { CONTACT, DOSSIER, NAVIGATION, QUESTIONS, RECETTES, type Lot } from "./donnees";

/** Quatre équerres aux coins d'un cadre (ornement). Le parent est `relative`. */
export function Coins({ couleur = "var(--encre)" }: { couleur?: string }) {
  const c = "pointer-events-none absolute h-4 w-4 border-[color:var(--c)]";
  return (
    <span aria-hidden="true" style={{ "--c": couleur } as React.CSSProperties}>
      <span className={`${c} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${c} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${c} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${c} bottom-0 right-0 border-b-2 border-r-2`} />
    </span>
  );
}

/** Une petite ligne technique en capitales espacées, façon carnet d'atelier. */
export function Technique({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return <p className={`font-mono text-[12px] uppercase tracking-[0.14em] ${clair ? "text-[#C9BEE3]" : "text-[var(--doux)]"}`}>{children}</p>;
}

/**
 * L'étiquette d'un savon, avec ce que l'article 19 du règlement (CE) n° 1223/2009
 * demande : personne responsable, contenu, durabilité, précautions, lot, fonction,
 * ingrédients précédés de « Ingredients ». Présentée comme une information, jamais
 * comme un mérite : toutes les savonneries y sont tenues.
 */
export function Etiquette({ lot }: { lot: Lot }) {
  const r = RECETTES[lot.recette];
  return (
    <div className="relative mx-auto w-full max-w-[360px] rounded-[4px] border border-[#C9C0B0] bg-[#FBF8F2] p-5 text-[#2B2A33] shadow-[0_18px_40px_-28px_rgba(43,42,51,0.6)]" data-film="etiquette">
      <p className="text-center font-[family-name:var(--titres)] text-[22px] font-bold uppercase tracking-[0.12em]">La Coulée</p>
      <p className="mt-1 text-center text-[15px]">{r.nom}</p>
      <p className="mt-0.5 text-center text-[13px]">Savon pour les mains et le corps · 100 g</p>
      <div className="mt-4 space-y-2 border-t border-[#C9C0B0] pt-3 text-[13px] leading-snug">
        <p>À utiliser de préférence avant fin {lot.ddm}</p>
        <p className="inline-block rounded-[3px] border-2 border-[#2B2A33] px-2 py-0.5 font-mono font-bold">Lot {lot.numero}</p>
        <p><span className="font-semibold">Ingredients :</span> {r.inci}</p>
        <p>Éviter le contact avec les yeux.</p>
        <p>Personne responsable : La Coulée, 12 rue de l&apos;Exemple · exemple</p>
      </div>
    </div>
  );
}

/** Les questions fréquentes, dépliables sans script. */
export function Faq() {
  return (
    <div className="border-t border-[var(--encre)]">
      {QUESTIONS.map((x, i) => (
        <details key={x.q} className="group border-b border-[var(--trait)]">
          <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-mono text-[13px] text-[var(--doux)] pt-1">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1 text-[19px] font-semibold leading-snug">{x.q}</span>
            <span aria-hidden="true" className="font-mono text-xl transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-6 pl-10 text-[17px] leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}

/** Le pied du site La Coulée (avant celui, commun, de la démonstration). */
export function Pied() {
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="font-[family-name:var(--titres)] text-[40px] font-bold uppercase leading-none tracking-[-0.02em]">La Coulée</p>
          <p className="max-w-xs text-[16px] leading-relaxed">Savons coulés à froid, par lots de 96. Chaque savon a un numéro.</p>
        </div>
        <div className="space-y-3">
          <Technique clair>Le site</Technique>
          <ul className="space-y-2 text-[15px]">
            {NAVIGATION.map((l) => <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>)}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
        <div className="space-y-3 text-[15px] leading-relaxed">
          <Technique clair>Personne responsable</Technique>
          <p>La Coulée · {CONTACT.adresse} · exemple</p>
          <p className="font-mono">{CONTACT.telephone}</p>
          <p className="text-[13px] text-[#C9BEE3]">Établissement déclaré auprès de la DGCCRF (code de la santé publique, art. L5131-2) · exemple</p>
        </div>
      </div>
    </footer>
  );
}
