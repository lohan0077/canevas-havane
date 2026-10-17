import Link from "next/link";
import { DOSSIER, NAVIGATION, PRIX, entreprise, type Question } from "./donnees";
import { Logo } from "./EnTete";

/** Un petit ornement de programme de concert : deux filets et une lune. */
export function Ornement({ className = "" }: { className?: string }) {
  return (
    <p aria-hidden="true" className={`flex items-center justify-center gap-3 text-[var(--accent-texte)] ${className}`}>
      <span className="h-px w-12 bg-current" />☾<span className="h-px w-12 bg-current" />
    </p>
  );
}

export function Surtitre({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--accent-texte)]">{children}</p>;
}

/**
 * Le prix d'un cours de piano à domicile, comme l'arrêté du 17 mars 2015 le demande :
 * à l'heure, HT et TTC, frais annexes, mode d'intervention, devis ; l'avantage fiscal
 * détaché du prix, en caractères plus petits (art. 5).
 */
export function PrixPiano() {
  return (
    <div data-film="prix" className="border border-[var(--encre)] bg-[var(--carte)] p-6 sm:p-10 space-y-6">
      <div className="text-center space-y-1">
        <Surtitre>Cours de piano à domicile</Surtitre>
        <p className="font-[family-name:var(--titres)] text-[88px] sm:text-[112px] leading-none [font-variant-numeric:lining-nums]">{PRIX.heure}&nbsp;€</p>
        <p className="font-[family-name:var(--titres)] text-2xl italic">TTC, l&apos;heure de cours</p>
        <p className="text-sm font-bold uppercase tracking-[0.18em]">Exemple</p>
      </div>
      <dl className="space-y-3 border-t border-[var(--trait)] pt-5 leading-snug">
        <div><dt className="font-bold">Hors taxes</dt><dd>{PRIX.heure},00&nbsp;€ HT l&apos;heure · {PRIX.tva} (exemple) : HT = TTC.</dd></div>
        <div><dt className="font-bold">Cours de 45 minutes</dt><dd>36&nbsp;€ TTC, soit {PRIX.heure}&nbsp;€ TTC rapportés à l&apos;heure.</dd></div>
        <div><dt className="font-bold">Frais annexes</dt><dd>{PRIX.frais}</dd></div>
        <div><dt className="font-bold">Mode d&apos;intervention</dt><dd>Prestataire : {entreprise.prof} donne les cours et les facture elle-même.</dd></div>
        <div><dt className="font-bold">Devis</dt><dd>Gratuit. Remis avant le premier cours dès 100&nbsp;€ TTC par mois, et sur simple demande en dessous.</dd></div>
      </dl>
      <div className="border border-dashed border-[var(--doux)] bg-[var(--fond)] px-4 py-3 text-[13px] leading-snug space-y-1">
        <p className="font-bold">Avantage fiscal, sous conditions</p>
        <p>
          Crédit d&apos;impôt de 50&nbsp;% des sommes versées, dans la limite d&apos;un plafond annuel
          (CGI, art. 199 sexdecies) : {PRIX.heure / 2}&nbsp;€ l&apos;heure après crédit d&apos;impôt. Cours chez
          l&apos;élève, en individuel ; activité déclarée en services à la personne
          (n°&nbsp;{entreprise.sap}, exemple). Ni visio, ni cours en groupe.
        </p>
      </div>
    </div>
  );
}

export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="border-t border-[var(--encre)]">
      {questions.map((x) => (
        <li key={x.q} className="border-b border-[var(--trait)]">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 font-[family-name:var(--titres)] text-[22px] leading-snug [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="mt-1 text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-6 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function AppelFinal() {
  return (
    <section className="bg-[var(--sombre)] text-[var(--sur-sombre)] [--accent-texte:#E7C774]">
      <div className="max-w-4xl mx-auto px-5 py-16 sm:py-24 text-center space-y-7">
        <Ornement />
        <h2 className="text-[44px] sm:text-6xl">Ton piano s&apos;est <span className="italic text-[var(--accent-texte)]">assez reposé.</span></h2>
        <p className="text-lg leading-relaxed">Un premier cours chez toi, sur le morceau que tu choisis. Appelle, ou écris le morceau dont tu rêves.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={`${DOSSIER}/ton-chemin`} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--sur-sombre)] text-[var(--encre)] px-7 font-semibold">Voir ton chemin</Link>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex min-h-[52px] items-center rounded-full border border-[var(--sur-sombre)] px-7 font-semibold tabular-nums">{entreprise.telephone}</a>
        </div>
        <p className="text-sm">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</p>
      </div>
    </section>
  );
}

export function PiedDeSite() {
  return (
    <footer className="border-t border-[var(--encre)]">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-8 sm:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-[var(--doux)]">Cours de piano à domicile, avec {entreprise.prof}</p>
          <p className="text-sm text-[var(--doux)]">Déclaration de services à la personne n°&nbsp;{entreprise.sap} (exemple).</p>
        </div>
        <ul className="space-y-2 text-sm font-semibold uppercase tracking-[0.14em]">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
        <ul className="space-y-2 text-sm font-semibold uppercase tracking-[0.14em]">
          <li><a href={`tel:${entreprise.telephoneLien}`} className="tabular-nums hover:underline">{entreprise.telephone}</a></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:underline">Mentions légales et crédits</Link></li>
        </ul>
      </div>
    </footer>
  );
}
