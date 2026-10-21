import Link from "next/link";
import { DEVIS_EXEMPLE, DOSSIER, NAVIGATION, entreprise } from "./donnees";
import { euros } from "./calendrier";
import { Logo } from "./EnTete";

export function Etiquette({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--encre)] bg-[var(--carte)] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]">
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

/**
 * Un devis d'exemple, tel que l'arrêté du 27 avril 2010 le veut : remis gratuitement
 * avant tout contrat, la prestation exacte, le montant HT et TTC, et la mention que ce
 * prix est définitif.
 */
export function DevisExemple() {
  const d = DEVIS_EXEMPLE;
  return (
    <figure className="rounded-[20px] bg-[var(--carte)] border-2 border-[var(--encre)] shadow-[8px_8px_0_var(--encre)] p-5 sm:p-7 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em]">Devis gratuit · exemple</p>
          <p className="font-[family-name:var(--titres)] text-2xl font-extrabold">N° 0000-000</p>
        </div>
        <Logo />
      </div>
      <p className="text-[15px] leading-relaxed">{d.prestation}</p>
      <dl className="divide-y divide-[var(--trait)] border-y-2 border-[var(--encre)] tabular-nums">
        <div className="flex justify-between py-2"><dt>Montant HT</dt><dd>{euros(d.ht, true)}</dd></div>
        <div className="flex justify-between py-2"><dt>TVA 20&nbsp;%</dt><dd>{euros(d.tva, true)}</dd></div>
        <div className="flex justify-between py-2 text-lg font-extrabold"><dt>Montant TTC</dt><dd>{euros(d.ttc, true)}</dd></div>
      </dl>
      <p className="font-bold">Ce prix est définitif.</p>
      <figcaption className="text-xs text-[var(--doux)]">Devis d'exemple : entreprise fictive, numéro et montants inventés.</figcaption>
    </figure>
  );
}

export function AppelFinal() {
  return (
    <Section>
      <div className="rounded-[32px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-7 sm:p-14 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-[44px] sm:text-7xl font-extrabold leading-[0.95] tracking-[-0.03em]">
            Et si c'était un <span className="text-[var(--accent)]">mardi&nbsp;?</span>
          </p>
          <p className="text-lg">Choisis ta date dans le calendrier : le prix s'affiche, le devis est gratuit.</p>
        </div>
        <div className="space-y-3 md:justify-self-end">
          <Link href={`${DOSSIER}#calendrier`} className="flex h-14 items-center justify-center rounded-full bg-[var(--accent)] px-8 text-lg font-extrabold text-[var(--sur-accent)]">
            Voir les prix par date
          </Link>
          <p className="text-center text-[15px]">Ou appelle-nous&nbsp;: <span className="font-bold tabular-nums whitespace-nowrap">{entreprise.telephone}</span></p>
        </div>
      </div>
    </Section>
  );
}

export function PiedDeSite() {
  return (
    <div className="border-t-2 border-[var(--encre)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4 pl-1.5">
          <Logo />
          <p className="text-[15px] leading-relaxed text-[var(--doux)] max-w-sm">
            Déménagements, {entreprise.zone} (exemple). Le mardi, le camion est libre : c'est le
            jour le moins cher.
          </p>
        </div>
        <ul className="space-y-2.5 font-bold">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:underline underline-offset-4">Mentions légales et crédits</Link></li>
        </ul>
        <div className="space-y-2 text-[15px]">
          <p className="font-bold">Nous joindre</p>
          <p className="tabular-nums">{entreprise.telephone}</p>
          <p className="text-[var(--doux)]">Du lundi au samedi, 8 h – 19 h</p>
          <p className="text-[var(--doux)]">12 rue de l'Exemple, 00000 Exemple-Ville</p>
        </div>
      </div>
    </div>
  );
}
