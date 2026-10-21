import Link from "next/link";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";
import { Logo } from "./EnTete";

/** Le petit libellé au-dessus d'un titre : un point de soleil, puis le mot. */
export function Surtitre({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${clair ? "" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
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

export function Bouton({ href, children, plein = true }: { href: string; children: React.ReactNode; plein?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex h-13 items-center justify-center rounded-full px-6 py-3.5 text-base font-bold ${plein ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border-2 border-[var(--encre)] text-[var(--encre)]"}`}
    >
      {children}
    </Link>
  );
}

/** La règle du secteur, dite comme ce qu'elle est : une loi pour tous, pas un mérite. */
export function LaRegle() {
  return (
    <div className="rounded-[30px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-6 sm:p-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-4">
        <Surtitre clair>La règle, pour tous</Surtitre>
        <h2 className="text-[34px] sm:text-5xl font-semibold tracking-[-0.02em]">
          Personne n'a le droit de te démarcher pour des panneaux solaires.
        </h2>
        <p className="text-lg leading-relaxed">
          Pas plus nous que les autres : c'est la loi, et elle vaut pour tous les professionnels.
          Téléphone, SMS, e-mail, réseaux sociaux — pour ces travaux, la prospection d'un
          particulier est interdite, sauf contrat en cours.
        </p>
        <p className="text-sm">C. consom., art. L223-1 et L223-8.</p>
      </div>
      <ul className="space-y-3 self-end">
        {[
          ["Un appel que tu n'as pas demandé ?", "Tu peux raccrocher. Un contrat conclu à la suite d'un démarchage téléphonique interdit est nul (art. L223-1)."],
          ["Tu as demandé à être rappelé ?", "Le professionnel peut t'appeler dans les cinq jours ouvrables, et seulement au sujet de ta demande (art. R223-4)."],
          ["Avant de signer", "Si une aide dépend d'un label, le professionnel te dit par écrit s'il le détient, et ce que cela change (art. L224-114)."],
        ].map(([t, d]) => (
          <li key={t} className="rounded-2xl border border-[var(--sur-sombre)]/30 p-4 space-y-1">
            <p className="font-bold">{t}</p>
            <p className="text-[15px] leading-relaxed">{d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AppelFinal() {
  return (
    <Section>
      <div className="rounded-[34px] bg-[var(--accent)] text-[var(--sur-accent)] p-7 sm:p-12 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
        <div className="space-y-3">
          <h2 className="text-[38px] sm:text-6xl font-bold tracking-[-0.03em]">On t'appelle si tu le demandes. Pas avant.</h2>
          <p className="text-lg">Une case à cocher, un numéro, et un rappel dans les cinq jours ouvrables.</p>
        </div>
        <div className="space-y-3 md:justify-self-end">
          <Link href={`${DOSSIER}/etre-rappele`} className="flex h-14 items-center justify-center rounded-full bg-[var(--sombre)] px-7 text-lg font-bold text-[var(--sur-sombre)]">
            Être rappelé
          </Link>
          <p className="text-center text-[15px]">
            Ou appelle-nous : <span className="font-bold tabular-nums whitespace-nowrap">{entreprise.telephone}</span>
          </p>
        </div>
      </div>
    </Section>
  );
}

export function PiedDeSite() {
  return (
    <div className="border-t border-[var(--trait)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="text-[15px] leading-relaxed text-[var(--doux)] max-w-sm">
            Panneaux solaires pour les maisons, {entreprise.zone} (exemple). Qualification RGE n° {entreprise.rge} et assurance décennale n° {entreprise.decennale} : numéros d'exemple.
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
          <p className="text-[var(--doux)]">{entreprise.horaires}</p>
          <p className="text-[var(--doux)]">12 rue de l'Exemple, 00000 Exemple-Ville</p>
        </div>
      </div>
    </div>
  );
}
