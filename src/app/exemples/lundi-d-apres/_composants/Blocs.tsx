import Link from "next/link";
import { DOSSIER, NAVIGATION, entreprise, type Question } from "./donnees";
import { Logo } from "./EnTete";
import s from "./Lundi.module.css";

/** Le petit titre en bas de casse et en gras, posé dans un coin, comme sur un post-it. */
export function Coin({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[13px] font-bold lowercase leading-tight ${className}`}>{children}</p>;
}

/**
 * La machine à café du lundi, dessinée : une grande tasse, sa vapeur, et trois bulles
 * de conversation. Les phrases sont des exemples, sans personne derrière. Décor : la
 * légende dit la même chose en texte.
 */
export function MachineACafe() {
  const bulles = [
    { texte: "T'as vu la compta danser ?", x: "left-0 top-2", angle: "-4deg" },
    { texte: "On refait ça quand ?", x: "right-0 top-20", angle: "3deg" },
    { texte: "Le karaoké, sérieux…", x: "left-4 top-40", angle: "-2deg" },
  ];
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[360px]">
      <div aria-hidden="true">
        {bulles.map((b, i) => (
          <p
            key={b.texte}
            className={`${s.bulle} absolute ${b.x} z-10 rounded-[22px] rounded-bl-[6px] bg-[var(--carte)] px-4 py-2.5 font-[family-name:var(--titres)] text-[17px] font-semibold shadow-[0_14px_30px_-18px_rgba(59,36,22,.6)]`}
            style={{ "--rang": i, "--angle": b.angle } as React.CSSProperties}
          >
            {b.texte}
          </p>
        ))}
        <svg viewBox="0 0 240 220" className="absolute bottom-0 left-1/2 w-[250px] -translate-x-1/2">
          <path className={s.vapeur} d="M95 40c-12-14 12-22 0-38" stroke="#3B2416" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".5" />
          <path className={s.vapeur} d="M125 44c-12-14 12-22 0-38" stroke="#3B2416" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".5" style={{ animationDelay: "-1.1s" }} />
          <path className={s.vapeur} d="M155 40c-12-14 12-22 0-38" stroke="#3B2416" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".5" style={{ animationDelay: "-2.2s" }} />
          <path d="M40 70h160l-14 110a24 24 0 0 1-24 21H78a24 24 0 0 1-24-21z" fill="#FF6B4A" />
          <path d="M198 92h10a24 24 0 0 1 0 48h-16" stroke="#FF6B4A" strokeWidth="14" fill="none" />
          <ellipse cx="120" cy="70" rx="80" ry="12" fill="#3B2416" />
          <ellipse cx="120" cy="212" rx="96" ry="8" fill="#3B2416" opacity=".15" />
          <text x="120" y="150" textAnchor="middle" fontSize="40" fontWeight="700" fill="#3B2416" style={{ fontFamily: "var(--titres)" }}>lundi</text>
        </svg>
      </div>
      <p className="sr-only">Une tasse de café dessinée, et trois phrases d&apos;exemple qu&apos;on entendrait lundi devant la machine à café.</p>
    </div>
  );
}

export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="space-y-2">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group rounded-[24px] bg-[var(--carte)] px-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-[family-name:var(--titres)] text-[19px] font-semibold [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-lg font-bold text-[var(--sur-accent)] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pb-5 pr-6 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

export function PiedDeSite() {
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)] [--doux:#D8C9B4] [--encre:#FFF4E6]">
      <div className="max-w-6xl mx-auto px-5 py-12 grid gap-8 sm:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-[var(--doux)]">Agence d&apos;événements d&apos;entreprise. Ce dont vous parlerez lundi.</p>
        </div>
        <ul className="space-y-2">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>
          ))}
        </ul>
        <ul className="space-y-2">
          <li><a href={`tel:${entreprise.telephoneLien}`} className="tabular-nums hover:underline underline-offset-4">{entreprise.telephone}</a></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="hover:underline underline-offset-4">Mentions légales et crédits</Link></li>
          <li className="text-sm text-[var(--doux)]">Prix HT d&apos;exemple : nos clients sont des entreprises</li>
        </ul>
      </div>
    </footer>
  );
}
