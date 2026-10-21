import Link from "next/link";
import { CONTACT, DOSSIER, NAVIGATION, QUESTIONS, type Savon } from "./donnees";

/** Un surtitre en petites capitales, espacé. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return <p className={`text-[12px] font-semibold uppercase tracking-[0.28em] ${clair ? "text-[#E8C4BC]" : "text-[var(--accent-texte)]"}`}>{children}</p>;
}

/** Un pain de savon dessiné, avec sa bande au nom du souvenir (ornement + nom lisible). */
export function Pain({ savon, className = "", incline = 0 }: { savon: Savon; className?: string; incline?: number }) {
  return (
    <div
      className={`relative mx-auto aspect-[4/3] w-full max-w-[300px] rounded-[26px] shadow-[0_26px_40px_-26px_rgba(42,24,32,0.55)] ${className}`}
      style={{ background: `linear-gradient(160deg, ${savon.fond}, ${savon.bord})`, transform: `rotate(${incline}deg)` }}
    >
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-[#FFFBF5] px-4 py-3 text-center shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6E5560]">Souvenance</p>
        <p className="font-[family-name:var(--titres)] text-[22px] italic leading-tight text-[#4A2E3A]">{savon.nom}</p>
      </div>
    </div>
  );
}

/**
 * L'étiquette d'un savon, avec ce que demande l'article 19 du règlement (CE)
 * n° 1223/2009. Une information, pas un argument : toutes les marques y sont tenues.
 */
export function Etiquette({ savon }: { savon: Savon }) {
  return (
    <div className="rounded-[18px] border border-[var(--trait)] bg-[var(--carte)] p-5 text-[14px] leading-snug space-y-2" data-film="etiquette">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--doux)]">L&apos;étiquette</p>
      <p>Savon pour les mains et le corps · 100 g</p>
      <p>À utiliser de préférence avant fin {savon.ddm}</p>
      <p>Lot {savon.lot}</p>
      <p><span className="font-semibold">Ingredients :</span> {savon.inci}</p>
      <p>Éviter le contact avec les yeux.</p>
      <p className="text-[var(--doux)]">Personne responsable : Souvenance, 12 rue de l&apos;Exemple · exemple</p>
    </div>
  );
}

/** Les questions fréquentes, dépliables sans script. */
export function Faq() {
  return (
    <div className="space-y-3">
      {QUESTIONS.map((x) => (
        <details key={x.q} className="group rounded-[20px] border border-[var(--trait)] bg-[var(--carte)] px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-[family-name:var(--titres)] text-[22px] leading-snug">{x.q}</span>
            <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-5 text-[17px] leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}

/** Le pied du site Souvenance (avant celui, commun, de la démonstration). */
export function Pied() {
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8">
        <p className="font-[family-name:var(--titres)] text-[44px] leading-none">Souvenance</p>
        <p className="mt-3 font-[family-name:var(--titres)] text-[20px] italic text-[#E8C4BC]">Ça sentait comme ça, chez toi.</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px]">
          {NAVIGATION.map((l) => <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>)}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
        </ul>
        <p className="mt-8 text-[14px] text-[#D9C3BE]">Personne responsable : Souvenance · {CONTACT.adresse} · exemple · {CONTACT.telephone}</p>
      </div>
    </footer>
  );
}
