import Link from "next/link";
import { DOSSIER, NAVIGATION, PROGRAMME, entreprise, type Question } from "./donnees";
import { Logo } from "./EnTete";

/** Une horloge dessinée, arrêtée à 22 h : l'heure où la question revient. Décorative. */
export function Horloge() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="w-full max-w-[220px] h-auto">
      <circle cx="100" cy="100" r="92" fill="none" stroke="var(--trait)" strokeWidth="2" />
      {Array.from({ length: 12 }, (_, k) => {
        const a = (k * Math.PI) / 6;
        return <line key={k} x1={100 + 78 * Math.sin(a)} y1={100 - 78 * Math.cos(a)} x2={100 + 86 * Math.sin(a)} y2={100 - 86 * Math.cos(a)} stroke="var(--encre)" strokeWidth={k % 3 ? 2 : 4} strokeLinecap="round" />;
      })}
      {/* Petite aiguille sur le 10 (22 h), grande sur le 12. */}
      <line x1="100" y1="100" x2="60.2" y2="77" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" />
      <line x1="100" y1="100" x2="100" y2="30" stroke="var(--encre)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="100" r="6" fill="var(--accent)" />
    </svg>
  );
}

/** Le programme des trois heures, avec « Ma vie a changé ! » barré au-dessus. */
export function Programme({ titreNiveau = 2 }: { titreNiveau?: 1 | 2 }) {
  const Titre = titreNiveau === 1 ? "h1" : "h2";
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="font-[family-name:var(--titres)] text-3xl sm:text-4xl italic text-[var(--doux)] line-through decoration-[var(--accent)] decoration-[3px]">
          Ma vie a changé&nbsp;!
        </p>
        <Titre className="text-5xl sm:text-7xl">
          Juste le programme <span className="italic text-[var(--accent-texte)]">des trois heures.</span>
        </Titre>
      </div>
      <ol className="grid gap-4 lg:grid-cols-3">
        {PROGRAMME.map((h) => (
          <li key={h.heure} className="rounded-[28px] bg-[var(--carte)] p-6 sm:p-8 space-y-4">
            <p className="flex items-baseline gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] font-[family-name:var(--titres)] text-2xl">{h.heure}</span>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">Heure {h.heure}</span>
            </p>
            <h3 className="text-4xl italic">{h.titre}</h3>
            <p className="leading-relaxed">{h.texte}</p>
            <ul className="space-y-1.5 border-t border-[var(--trait)] pt-4 text-[var(--doux)]">
              {h.dedans.map((d) => (
                <li key={d} className="flex gap-2"><span aria-hidden="true" className="text-[var(--accent-texte)]">—</span>{d}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** L'affiche du lancement, publiée le dimanche à 21 h. */
export function Affiche() {
  return (
    <figure className="mx-auto w-[78%] max-w-[300px] rotate-[-3deg] rounded-[6px] bg-[var(--sombre)] p-7 pb-9 shadow-[0_30px_60px_-25px_rgba(0,0,0,.8)] border border-[var(--trait)]">
      <p className="font-[family-name:var(--titres)] text-5xl leading-[1.02] text-[var(--encre)]">
        Tu y penses <span className="italic text-[var(--accent-texte)]">encore&nbsp;?</span>
      </p>
      <figcaption className="mt-10 text-xs font-semibold uppercase tracking-[0.18em]">Dimanche Soir · coaching</figcaption>
    </figure>
  );
}

export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 font-[family-name:var(--titres)] text-2xl [&::-webkit-details-marker]:hidden">
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
    <section className="relative overflow-hidden bg-[var(--sombre)]">
      <div aria-hidden="true" className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,193,78,.35),transparent_70%)]" />
      <div className="relative max-w-6xl mx-auto px-5 py-16 sm:py-24 text-center space-y-6">
        <h2 className="text-5xl sm:text-7xl">Dimanche prochain, <span className="italic text-[var(--accent-texte)]">elle reviendra.</span></h2>
        <p className="text-lg max-w-xl mx-auto leading-relaxed">Autant lui donner trois heures. Écris-la, réserve les trois séances, ou appelle.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={`${DOSSIER}/reserver`} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 font-semibold">Réserver mes trois séances</Link>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex min-h-[52px] items-center rounded-full border border-[var(--encre)] px-7 font-semibold tabular-nums">{entreprise.telephone}</a>
        </div>
        <p className="text-sm text-[var(--doux)]">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</p>
      </div>
    </section>
  );
}

export function PiedDeSite() {
  return (
    <footer className="border-t border-[var(--trait)]">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-8 sm:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-[var(--doux)]">{entreprise.baseline} Coaching, trois heures pour une question.</p>
        </div>
        <ul className="space-y-2">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
        <ul className="space-y-2">
          <li><a href={`tel:${entreprise.telephoneLien}`} className="tabular-nums hover:underline">{entreprise.telephone}</a></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:underline">Mentions légales et crédits</Link></li>
        </ul>
      </div>
    </footer>
  );
}
