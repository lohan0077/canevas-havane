import Link from "next/link";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";
import { Logo } from "./EnTete";

export function Surtitre({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">
      <span aria-hidden="true">☾</span>
      {children}
    </p>
  );
}

export function Section({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24 scroll-mt-20 ${className}`}>
      {children}
    </section>
  );
}

/** L'affiche du lancement : la promesse, et sa limite écrite sur l'affiche même. */
export function Affiche() {
  return (
    <figure className="mx-auto max-w-sm rotate-[-3deg] rounded-[6px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-8 shadow-[0_40px_60px_-30px_rgba(29,43,79,.7)]">
      <p aria-hidden="true" className="text-right text-3xl text-[var(--accent)]">☾</p>
      <p className="mt-6 font-[family-name:var(--titres)] text-[44px] leading-[1.02]">
        Ce soir, tu dors <span className="text-[var(--accent)]">dans ton lit.</span>
      </p>
      <p className="mt-10 text-sm leading-relaxed">Premier Soir · déménagements livrés dans la journée · lit coché au devis</p>
    </figure>
  );
}

export function AppelFinal() {
  return (
    <div className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <Section className="text-center space-y-6">
        <p aria-hidden="true" className="text-5xl text-[var(--accent)]">☾</p>
        <p className="font-[family-name:var(--titres)] text-[44px] sm:text-7xl leading-[1.02]">On remonte quoi, ce soir&nbsp;?</p>
        <p className="text-lg max-w-md mx-auto">Coche ce qu'on remonte avant de partir. On le met au devis, gratuit, avec le prix ferme.</p>
        <Link href={`${DOSSIER}/ce-soir`} className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--accent)] px-8 text-lg font-semibold text-[var(--sur-accent)]">
          Cocher mes meubles
        </Link>
        <p className="text-[15px]">Ou appelle-nous&nbsp;: <span className="font-semibold tabular-nums whitespace-nowrap">{entreprise.telephone}</span></p>
      </Section>
    </div>
  );
}

export function PiedDeSite() {
  return (
    <div className="border-t border-[var(--trait)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="font-[family-name:var(--titres)] italic text-xl text-[var(--accent-texte)]">{entreprise.signature}</p>
          <p className="text-[15px] leading-relaxed text-[var(--doux)] max-w-sm">
            Déménagements, Exemple-Ville et alentours (exemple). La promesse vaut pour les
            déménagements livrés dans la journée, et pour ce qui est coché au devis.
          </p>
        </div>
        <ul className="space-y-2.5">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:underline underline-offset-4">Mentions légales et crédits</Link></li>
        </ul>
        <div className="space-y-2 text-[15px]">
          <p className="font-semibold">Nous joindre</p>
          <p className="tabular-nums">{entreprise.telephone}</p>
          <p className="text-[var(--doux)]">Du lundi au samedi, 8 h – 19 h</p>
          <p className="text-[var(--doux)]">12 rue de l'Exemple, 00000 Exemple-Ville</p>
        </div>
      </div>
    </div>
  );
}
