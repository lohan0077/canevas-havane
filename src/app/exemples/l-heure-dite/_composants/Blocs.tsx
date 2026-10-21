import Link from "next/link";
import { DOSSIER, FRANCE_RENOV, NAVIGATION, entreprise } from "./donnees";
import { Monogramme } from "./EnTete";

export function Surtitre({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">{children}</p>;
}

export function Section({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24 scroll-mt-20 ${className}`}>
      {children}
    </section>
  );
}

/**
 * La règle du secteur, dite pour ce qu'elle est : une loi qui vaut pour tous. La marque
 * ne s'en fait pas un mérite (C. consom., art. L121-4, 10°) ; elle va plus loin.
 */
export function LaRegle() {
  return (
    <div className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <Section className="grid gap-10 lg:grid-cols-2 lg:items-end">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em]">La règle, pour tous</p>
          <h2 className="text-[40px] sm:text-6xl font-normal tracking-[-0.02em]">
            Pour ces travaux, personne n'a le droit de te démarcher.
          </h2>
          <p className="text-lg leading-relaxed">
            Téléphone, SMS, e-mail, réseaux sociaux : la prospection d'un particulier pour une
            pompe à chaleur est interdite à tous les professionnels, sauf contrat en cours
            (C. consom., art. L223-1 et L223-8). Ce n'est pas notre mérite, c'est la loi.
          </p>
        </div>
        <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-[var(--sur-sombre)]/30 pt-8 lg:pt-0 lg:pl-10">
          <p className="font-[family-name:var(--titres)] text-[34px] sm:text-5xl leading-tight">
            Tout le monde subit cette règle. Nous, on va <em>plus loin qu'elle.</em>
          </p>
          <p className="text-lg leading-relaxed">
            La loi permet de rappeler celui qui l'a demandé, dans les cinq jours ouvrables. Nous,
            on te laisse choisir le jour et l'heure. Et on appelle à cette heure-là.
          </p>
        </div>
      </Section>
    </div>
  );
}

/** L'affiche du lancement, avec, en bas, le message France Rénov' que toute publicité porte depuis le 1er octobre 2026. */
export function Affiche() {
  return (
    <figure className="mx-auto max-w-md rotate-[-2deg] rounded-[6px] bg-[var(--carte)] border border-[var(--trait)] shadow-[0_30px_50px_-30px_rgba(31,61,43,.55)] p-7 sm:p-9 text-left">
      <p className="font-[family-name:var(--titres)] text-[46px] leading-[1.02] tracking-[-0.02em]">
        Vous choisissez <em className="text-[var(--accent-texte)]">l'heure.</em>
      </p>
      <p className="mt-4 text-xl">On appelle à cette heure-là.</p>
      <p className="mt-6 text-sm leading-relaxed text-[var(--doux)]">
        Pour ces travaux, le démarchage est interdit à tous les professionnels (C. consom., art. L223-1 et L223-8).
      </p>
      <p className="mt-6 flex items-center gap-2 text-sm font-semibold">
        <Monogramme className="h-7 w-7" /> L'Heure Dite · pompes à chaleur
      </p>
      <p className="mt-5 -mx-7 sm:-mx-9 -mb-7 sm:-mb-9 rounded-b-[6px] bg-[#E3EEF3] text-[#14324A] px-7 sm:px-9 py-4 text-[13px] leading-snug">
        {FRANCE_RENOV.message}
      </p>
    </figure>
  );
}

export function AppelFinal() {
  return (
    <Section>
      <div className="rounded-[36px] border border-[var(--encre)] p-7 sm:p-14 text-center space-y-6">
        <p className="font-[family-name:var(--titres)] text-[44px] sm:text-7xl leading-none tracking-[-0.02em]">
          À quelle heure&nbsp;?
        </p>
        <p className="text-lg max-w-md mx-auto">Choisis le jour et l'heure de ton appel. On appelle à ce moment-là, et pas avant.</p>
        <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--sombre)] px-8 text-lg font-semibold text-[var(--sur-sombre)]">
          Choisir mon heure
        </Link>
        <p className="text-[15px] text-[var(--doux)]">
          Ou appelle-nous&nbsp;: <span className="font-semibold text-[var(--encre)] tabular-nums whitespace-nowrap">{entreprise.telephone}</span>
        </p>
      </div>
    </Section>
  );
}

export function PiedDeSite() {
  return (
    <div className="border-t border-[var(--trait)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="flex items-center gap-2.5 font-[family-name:var(--titres)] text-3xl"><Monogramme /> L'Heure Dite</p>
          <p className="font-[family-name:var(--titres)] italic text-xl text-[var(--accent-texte)]">{entreprise.signature}</p>
          <p className="text-[15px] leading-relaxed text-[var(--doux)] max-w-sm">
            Pompes à chaleur, {entreprise.zone} (exemple). Qualification RGE n°&nbsp;{entreprise.rge} et
            assurance décennale n°&nbsp;{entreprise.decennale}&nbsp;: numéros d'exemple.
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
          <p className="text-[var(--doux)]">Du lundi au samedi, aux heures dites</p>
          <p className="text-[var(--doux)]">12 rue de l'Exemple, 00000 Exemple-Ville</p>
        </div>
      </div>
    </div>
  );
}
