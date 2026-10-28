import { AUTORISATION, AVANTAGE, HEURE_HT, PHRASE_DEVIS, TVA, euros } from "./donnees";

/** La tasse et ses deux sucres, dessinées. */
export function Tasse({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 700 620" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="350" cy="560" rx="300" ry="46" fill="#E9DCCB" stroke="#5A3E2B" strokeWidth="8" />
      <path d="M545 330 C650 330 650 470 535 470" fill="none" stroke="#5A3E2B" strokeWidth="30" strokeLinecap="round" />
      <path d="M140 280 L560 280 L540 470 C530 530 470 556 350 556 C230 556 170 530 160 470 Z" fill="#FFFBF4" stroke="#5A3E2B" strokeWidth="10" strokeLinejoin="round" />
      <path d="M168 400 C260 420 440 420 532 400" fill="none" stroke="#D98E73" strokeWidth="16" strokeLinecap="round" />
      <ellipse cx="350" cy="282" rx="210" ry="40" fill="#6B4226" stroke="#5A3E2B" strokeWidth="10" />
      <g fill="none" stroke="#B9A48C" strokeWidth="9" strokeLinecap="round">
        <path d="M290 220 C260 180 320 150 290 100" />
        <path d="M410 220 C380 180 440 150 410 100" />
      </g>
      <rect x="250" y="40" width="74" height="74" rx="12" fill="#FFFFFF" stroke="#5A3E2B" strokeWidth="7" transform="rotate(-12 287 77)" />
      <rect x="376" y="10" width="74" height="74" rx="12" fill="#FFFFFF" stroke="#5A3E2B" strokeWidth="7" transform="rotate(14 413 47)" />
    </svg>
  );
}

/**
 * Le tarif : le prix en gros, HT et TTC ; à part et plus petit, l'avantage fiscal,
 * la phrase du devis et ce qui exige une autorisation (arrêté du 17 mars 2015, art. 4 à 6).
 */
export function Tarif() {
  const ttc = HEURE_HT * (1 + TVA);
  return (
    <div data-film="tarif" className="space-y-4">
      <div className="rounded-[36px] bg-[var(--carte)] p-7 text-center shadow-[0_30px_70px_-45px_rgba(59,42,30,.6)] sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Deux Sucres · ménage et courses</p>
        <p className="mt-3 whitespace-nowrap font-[family-name:var(--titres)] text-7xl font-semibold sm:text-8xl">{euros(ttc)}</p>
        <p className="mt-1 text-xl">TTC de l&apos;heure</p>
        <p className="mt-2 text-[var(--doux)]">soit {euros(HEURE_HT)} HT · exemple</p>
      </div>
      <div id="ds-a-part" className="space-y-2.5 rounded-[28px] border border-dashed border-[var(--trait)] p-5 text-[13px] leading-relaxed text-[var(--doux)]">
        <p className="font-semibold text-[var(--encre)]">{AVANTAGE}</p>
        <p>{PHRASE_DEVIS}</p>
        <p>{AUTORISATION}</p>
        <p className="text-[12px]">Arrêté du 17 mars 2015, art. 4, 5 et 6 · prix d&apos;exemple.</p>
      </div>
    </div>
  );
}

/** L'affiche du lancement, dans les boulangeries du quartier. */
export function Affiche() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[300px] rotate-[-3deg] rounded-[6px] bg-[#5A3E2B] p-8 text-[#F6EDE0] shadow-[0_30px_50px_-30px_rgba(59,42,30,.8)]">
      <p className="font-[family-name:var(--titres)] text-4xl leading-tight">
        Elle sait que ta mère prend <span className="italic text-[#F0B36A]">deux sucres.</span>
      </p>
      <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.18em]">Deux Sucres · aide à domicile</p>
    </div>
  );
}

/** Les questions, en accordéon natif. */
export function Faq({ questions }: { questions: { question: string; reponse: string }[] }) {
  return (
    <div className="divide-y divide-[var(--trait)] rounded-[32px] bg-[var(--carte)] px-6">
      {questions.map((q) => (
        <details key={q.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {q.question}
            <span aria-hidden="true" className="font-[family-name:var(--titres)] text-2xl leading-none text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pt-3 leading-relaxed text-[var(--doux)]">{q.reponse}</p>
        </details>
      ))}
    </div>
  );
}
