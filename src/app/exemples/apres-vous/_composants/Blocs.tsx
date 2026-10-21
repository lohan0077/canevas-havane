import Link from "next/link";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";
import { Logo } from "./EnTete";

export function Surtitre({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-texte)]">
      <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
      {children}
    </p>
  );
}

export function Section({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-28 scroll-mt-20 ${className}`}>
      {children}
    </section>
  );
}

/** Le petit mot laissé chaque matin sur le bureau de l'accueil. Signé : l'équipe du soir. */
export function PetitMot() {
  return (
    <figure data-film="petit-mot" className="mx-auto w-full max-w-[340px] rotate-[-3deg] border-t-[12px] border-[#6FB7A8] bg-[#FFFDF6] p-7 text-[#121C33] shadow-[0_30px_50px_-20px_rgba(0,0,0,.6)]">
      <p className="text-[13px] font-semibold uppercase tracking-[0.28em]">Après Vous</p>
      <p className="mt-6 font-[family-name:var(--titres)] italic text-[34px] leading-tight">Passé à 20&nbsp;h&nbsp;12.<br />Bonne journée&nbsp;!</p>
      <figcaption className="mt-6 text-right font-[family-name:var(--titres)] italic text-2xl">— L'équipe du soir</figcaption>
    </figure>
  );
}

/** L'affiche du lancement, pour les halls de bureaux. */
export function Affiche() {
  return (
    <figure className="mx-auto w-full max-w-[340px] rotate-[3deg] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)] shadow-[0_40px_60px_-30px_rgba(0,0,0,.8)] border border-[var(--trait)]">
      <p className="font-[family-name:var(--titres)] text-[46px] leading-[1.02]">
        Vous ne nous verrez <span className="italic text-[var(--accent-texte)]">jamais.</span>
      </p>
      <p className="mt-14 text-xs font-semibold uppercase tracking-[0.24em]">Après Vous · nettoyage de bureaux</p>
    </figure>
  );
}

export function AppelFinal() {
  return (
    <Section className="text-center space-y-7">
      <p className="font-[family-name:var(--titres)] text-[46px] sm:text-8xl leading-[0.98]">
        Vous nous confieriez <span className="italic text-[var(--accent-texte)]">vos clés</span>&nbsp;?
      </p>
      <p className="mx-auto max-w-md text-lg text-[var(--doux)]">Une visite de vos bureaux, un soir ou un matin, et un devis avec le prix ferme, hors taxes.</p>
      <p className="font-[family-name:var(--titres)] text-3xl tabular-nums">{entreprise.telephone}</p>
      <p className="text-sm text-[var(--doux)]">Du lundi au vendredi, 9 h – 18 h. Le soir, on travaille.</p>
    </Section>
  );
}

export function PiedDeSite() {
  return (
    <div className="border-t border-[var(--trait)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="font-[family-name:var(--titres)] italic text-2xl">{entreprise.signature}</p>
          <p className="text-[15px] leading-relaxed text-[var(--doux)] max-w-sm">Nettoyage de bureaux, Exemple-Ville (exemple). Prix hors taxes pour les professionnels.</p>
        </div>
        <ul className="space-y-2.5">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:text-[var(--accent-texte)]">Mentions légales et crédits</Link></li>
        </ul>
        <div className="space-y-2 text-[15px]">
          <p className="font-semibold">Nous joindre</p>
          <p className="tabular-nums">{entreprise.telephone}</p>
          <p className="text-[var(--doux)]">12 rue de l'Exemple, 00000 Exemple-Ville</p>
        </div>
      </div>
    </div>
  );
}
