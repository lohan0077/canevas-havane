import Link from "next/link";
import { Marque } from "./EnTete";
import { DOSSIER, NAVIGATION, QUESTIONS, SOMBRE, agence, type Projet } from "./donnees";

export function Intitule({ surtitre, titre, children, niveau = 2 }: { surtitre: string; titre: React.ReactNode; children?: React.ReactNode; niveau?: 1 | 2 }) {
  const Titre = niveau === 1 ? "h1" : "h2";
  return (
    <div className="max-w-2xl space-y-4">
      <p className="flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border-2 border-[var(--encre)] bg-[var(--accent)]" />
        {surtitre}
      </p>
      <Titre className={`font-bold tracking-[-0.03em] ${niveau === 1 ? "text-[44px] sm:text-7xl" : "text-[36px] sm:text-[52px]"}`}>{titre}</Titre>
      {children && <div className="text-[17px] leading-relaxed text-[var(--doux)]">{children}</div>}
    </div>
  );
}

export function Section({ id, className = "", sombre = false, children }: { id?: string; className?: string; sombre?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} style={sombre ? SOMBRE : undefined} className={`scroll-mt-20 ${sombre ? "bg-[var(--fond)] text-[var(--encre)]" : ""}`}>
      <div className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 ${className}`}>{children}</div>
    </section>
  );
}

const HACHURE = "bg-[repeating-linear-gradient(45deg,transparent_0_4px,rgba(42,75,141,0.4)_4px_6px)]";

/** Les volumes d'un projet, en élévation : l'existant au trait, le neuf hachuré. */
export function Volumes({ projet, echelle = 1.2 }: { projet: Projet; echelle?: number }) {
  const l1 = projet.existant * echelle;
  const l2 = projet.cree * echelle;
  if (projet.slug.startsWith("surelevation")) {
    return (
      <span className="flex flex-col">
        <span className={`block h-10 border-2 border-b-0 border-[var(--accent-texte)] ${HACHURE}`} style={{ width: `${l1}px` }} />
        <span className="block h-12 border-2 border-[var(--encre)] bg-[var(--carte)]" style={{ width: `${l1}px` }} />
      </span>
    );
  }
  if (projet.slug.startsWith("garage")) {
    return (
      <span className="flex items-end">
        <span className="block h-16 border-2 border-r-0 border-[var(--encre)] bg-[var(--carte)]" style={{ width: `${l1 - l2}px` }} />
        <span className={`block h-16 border-2 border-[var(--accent-texte)] ${HACHURE}`} style={{ width: `${l2}px` }} />
      </span>
    );
  }
  return (
    <span className="flex items-end">
      <span className="block h-16 border-2 border-[var(--encre)] bg-[var(--carte)]" style={{ width: `${l1}px` }} />
      <span className={`block h-11 border-2 border-l-0 border-[var(--accent-texte)] ${HACHURE}`} style={{ width: `${l2}px` }} />
    </span>
  );
}

/** Une carte de projet : le dessin de la surface, le titre, le budget, la durée. */
export function CarteProjet({ projet }: { projet: Projet }) {
  return (
    <Link href={`${DOSSIER}/projets/${projet.slug}`} className="group block h-full overflow-hidden rounded-[20px] border border-[var(--trait)] bg-[var(--carte)]">
      <div className="flex h-[120px] items-end bg-[var(--fond)] px-5 pb-4" aria-hidden="true">
        <Volumes projet={projet} />
      </div>
      <div className="space-y-2 p-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Projet n°&nbsp;{projet.numero}</p>
        <h3 className="text-[22px] font-bold leading-snug group-hover:underline">{projet.titre}</h3>
        <p className="text-[15px] text-[var(--doux)]">{projet.budget} (exemple) · {projet.duree} · {projet.autorisation.toLowerCase()}</p>
      </div>
    </Link>
  );
}

export function Faq({ questions = QUESTIONS }: { questions?: { q: string; r: string }[] }) {
  return (
    <ul className="space-y-2.5">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group rounded-[16px] border border-[var(--trait)] bg-[var(--carte)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function PiedDeSite() {
  return (
    <footer style={SOMBRE} className="bg-[var(--fond)] text-[var(--encre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <Marque />
          <p className="text-[var(--doux)]">{agence.accroche}</p>
          <p>
            {agence.adresse.join(", ")}
            <br />
            <span className="font-semibold tabular-nums">{agence.telephone}</span>
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Le site</p>
          <ul className="space-y-1.5">
            {NAVIGATION.map((l) => (
              <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
            ))}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
        <div className="space-y-3 text-sm leading-relaxed text-[var(--doux)]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Profession réglementée</p>
          <p>
            Architecte inscrite au tableau régional de l&apos;Ordre des architectes · numéro
            d&apos;exemple : 000000. Assurance de responsabilité professionnelle : exemple. Règles
            professionnelles : code de déontologie des architectes.
          </p>
        </div>
      </div>
    </footer>
  );
}
