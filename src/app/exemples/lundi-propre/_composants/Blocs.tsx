import Link from "next/link";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";
import { Logo } from "./EnTete";

export function Pastille({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center rounded-full bg-[var(--carte)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">
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

/** Le post-it du lundi matin. Celui qu'on ne veut plus recevoir, et celui qu'on vise. */
export function PostIt({ heure, texte, signe, className = "" }: { heure: string; texte: string; signe: string; className?: string }) {
  return (
    <figure className={`bg-[#FFE36E] text-[var(--encre)] shadow-[0_24px_40px_-20px_rgba(11,11,12,.55)] ${className || "w-[230px] p-5"}`}>
      <p className="font-black">{heure}</p>
      <p className="mt-2 text-[17px] leading-snug">{texte}</p>
      <figcaption className="mt-3 text-sm">— {signe}</figcaption>
    </figure>
  );
}

export function AppelFinal() {
  return (
    <Section>
      <div className="rounded-[34px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-7 sm:p-14 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div className="space-y-4">
          <p className="font-[family-name:var(--titres)] text-[36px] sm:text-6xl font-black leading-[0.95] tracking-[-0.03em]">
            Un lundi sans <span className="text-[var(--accent)]">une seule remarque.</span>
          </p>
          <p className="text-lg">Votre surface, vos passages : un prix d'exemple tout de suite, et une visite pour le prix ferme.</p>
        </div>
        <div className="space-y-3 md:justify-self-end">
          <Link href={`${DOSSIER}/tarifs`} className="flex h-14 items-center justify-center rounded-full bg-[var(--accent)] px-8 text-lg font-bold text-[var(--sur-accent)]">
            Votre prix, tout de suite
          </Link>
          <p className="text-center text-[15px]">Ou appelez-nous&nbsp;: <span className="font-bold tabular-nums whitespace-nowrap">{entreprise.telephone}</span></p>
        </div>
      </div>
    </Section>
  );
}

export function PiedDeSite() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] border-t border-[var(--trait)]">
      <div className="space-y-3">
        <Logo />
        <p className="text-[15px] leading-relaxed text-[var(--doux)] max-w-sm">
          Nettoyage de bureaux, {entreprise.zone} (exemple). Un rapport chaque soir, des prix
          hors taxes pour les professionnels.
        </p>
      </div>
      <ul className="space-y-2.5 font-semibold">
        {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
          <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>
        ))}
        <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:underline underline-offset-4">Mentions légales et crédits</Link></li>
      </ul>
      <div className="space-y-2 text-[15px]">
        <p className="font-bold">Nous joindre</p>
        <p className="tabular-nums">{entreprise.telephone}</p>
        <p className="text-[var(--doux)]">Du lundi au vendredi, 9 h – 18 h</p>
        <p className="text-[var(--doux)]">12 rue de l'Exemple, 00000 Exemple-Ville</p>
      </div>
    </div>
  );
}
