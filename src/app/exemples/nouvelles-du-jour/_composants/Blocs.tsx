import { AUTORISATION, AVANTAGE, HEURE_HT, PHRASE_DEVIS, TVA, euros } from "./donnees";

/**
 * Le téléphone de l'ouverture : l'écran verrouillé de 18 h, et la notification de
 * Nouvelles du Jour. Le fond sombre est posé en couleur pleine : le texte reste lisible.
 */
export function TelephoneDe18h() {
  return (
    <div className="relative mx-auto w-[260px] rounded-[44px] border-[10px] border-[#1F2D27] bg-[#24362D] px-4 pb-10 pt-8 shadow-[0_40px_80px_-40px_rgba(31,45,39,.7)] sm:w-[290px]">
      <span aria-hidden="true" className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-[#1F2D27]" />
      <p className="text-center text-sm text-[#C9D8CC]">mardi</p>
      <p className="text-center font-[family-name:var(--titres)] text-6xl font-light tabular-nums text-[#F4F1EA]">18:00</p>
      <div data-film="notification" className="mt-8 rounded-[20px] bg-[#F4F1EA] p-3.5 text-[#1F2D27] shadow-lg">
        <p className="flex items-center gap-2 text-xs">
          <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-md bg-[#4A6E5A] text-[11px] font-bold text-white">NJ</span>
          <b className="font-semibold">Nouvelles du Jour</b>
          <span className="ml-auto text-[#52615A]">maintenant</span>
        </p>
        <p className="mt-2 text-[15px] leading-snug">Passage terminé. Courses rangées, linge plié. Elle t&apos;embrasse.</p>
      </div>
      <p className="mt-24 text-center text-[11px] text-[#C9D8CC]">Message d&apos;exemple</p>
    </div>
  );
}

/** Le fil du message à la famille, avec l'accord de la personne aidée. */
export function Conversation() {
  const bulles = ["Passage terminé ✓ 14 h – 16 h", "Ménage, courses, linge.", "Un mot de Jeanne : « Dis à Paul de venir dimanche. »"];
  return (
    <div className="mx-auto w-full max-w-sm rounded-[32px] border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_30px_60px_-40px_rgba(31,45,39,.6)]">
      <div className="flex items-center gap-3 border-b border-[var(--trait)] pb-4">
        <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--sur-accent)]">NJ</span>
        <span>
          <b className="block font-semibold">Nouvelles du Jour</b>
          <span className="block text-sm text-[var(--doux)]">Le passage de mardi</span>
        </span>
      </div>
      <ul className="space-y-2.5 pt-4">
        {bulles.map((b) => (
          <li key={b} className="w-fit max-w-[90%] rounded-[18px] rounded-tl-md bg-[#E6EDE4] px-4 py-2.5 leading-snug">{b}</li>
        ))}
      </ul>
      <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--accent-texte)]">
        <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full bg-[var(--accent)] text-[10px] text-[var(--sur-accent)]">✓</span>
        Envoyé avec l&apos;accord de Jeanne
      </p>
      <p className="mt-1 text-xs text-[var(--doux)]">Prénoms et message d&apos;exemple.</p>
    </div>
  );
}

/**
 * Le prix honnête : en gros, HT et TTC (art. 4) ; puis, à part et plus petit,
 * l'avantage fiscal (art. 5), la phrase du devis (art. 6) et ce qui exige une
 * autorisation. Arrêté du 17 mars 2015.
 */
export function PrixHonnete() {
  const ttc = HEURE_HT * (1 + TVA);
  return (
    <div data-film="prix" className="space-y-4">
      <div className="rounded-[32px] bg-[var(--carte)] p-7 text-center shadow-[0_30px_60px_-40px_rgba(31,45,39,.5)] sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Ménage, linge et courses</p>
        <p className="mt-3 font-[family-name:var(--titres)] text-7xl font-semibold tabular-nums sm:text-8xl">{euros(ttc)}</p>
        <p className="mt-1 text-xl">TTC de l&apos;heure</p>
        <p className="mt-2 text-[var(--doux)]">soit {euros(HEURE_HT)} HT · exemple</p>
        <p className="mt-1 text-sm text-[var(--doux)]">Aucun frais de dossier, aucun frais de déplacement.</p>
      </div>
      <div id="a-part" className="space-y-2.5 rounded-[24px] border border-dashed border-[var(--trait)] p-5 text-[13px] leading-relaxed text-[var(--doux)]">
        <p className="font-semibold text-[var(--encre)]">{AVANTAGE}</p>
        <p>{PHRASE_DEVIS}</p>
        <p>{AUTORISATION}</p>
      </div>
    </div>
  );
}

/** Les questions, en accordéon natif. */
export function Faq({ questions }: { questions: { question: string; reponse: string }[] }) {
  return (
    <div className="space-y-3">
      {questions.map((q) => (
        <details key={q.question} className="group rounded-[24px] bg-[var(--carte)] px-5 py-4">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {q.question}
            <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#E6EDE4] text-lg leading-none text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pt-3 leading-relaxed text-[var(--doux)]">{q.reponse}</p>
        </details>
      ))}
    </div>
  );
}
