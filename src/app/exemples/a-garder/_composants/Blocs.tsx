import styles from "./Papier.module.css";

/** Les questions, en accordéon natif. */
export function Faq({ questions }: { questions: { question: string; reponse: string }[] }) {
  return (
    <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((q) => (
        <details key={q.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {q.question}
            <span aria-hidden="true" className="font-[family-name:var(--titres)] text-3xl leading-none text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pt-3 leading-relaxed text-[var(--doux)] [font-variant-numeric:lining-nums]">{q.reponse}</p>
        </details>
      ))}
    </div>
  );
}

/** Le faire-part d'exemple de l'ouverture : papier coton, bord déchiré. */
export function FairePart({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className={`absolute inset-0 translate-x-5 translate-y-4 rotate-[7deg] rounded-[6px] ${styles.kraft}`} />
      <div className={`relative rotate-[-4deg] px-7 py-10 text-center text-[#1E2A5A] shadow-[0_24px_40px_-24px_rgba(30,42,90,.6)] ${styles.coton} ${styles.deckle}`}>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em]">Faire-part · exemple</p>
        <p className="mt-4 font-[family-name:var(--titres)] text-5xl italic leading-none">Léa &amp; Tom</p>
        <p className="mt-3 text-sm">se marient</p>
        <p className="font-[family-name:var(--titres)] text-2xl [font-variant-numeric:lining-nums]">le 12 juin</p>
        <p aria-hidden="true" className="mx-auto mt-4 h-px w-16 bg-[#C2381F]" />
      </div>
    </div>
  );
}

/** Le menu du restaurant d'en face : aucun vrai restaurant, aucun prix. */
export function MenuResto() {
  const plats = [
    ["Entrée", "Velouté de potimarron"],
    ["Plat", "Paleron confit, purée de céleri"],
    ["Dessert", "Tarte fine aux pommes"],
  ];
  return (
    <div className={`mx-auto w-full max-w-[320px] rotate-[2deg] px-7 py-8 text-center text-[#1E2A5A] shadow-[0_24px_40px_-24px_rgba(30,42,90,.6)] ${styles.verge}`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.24em]">Menu du jour · exemple</p>
      <p className="mt-2 font-[family-name:var(--titres)] text-3xl italic">Restaurant d&apos;exemple</p>
      <p aria-hidden="true" className="mx-auto my-4 h-px w-12 bg-[#1E2A5A]" />
      <ul className="space-y-3">
        {plats.map(([c, p]) => (
          <li key={c}>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em]">{c}</span>
            <span className="block font-[family-name:var(--titres)] text-lg italic">{p}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-dashed border-[rgba(30,42,90,.35)] pt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#B2321C]">Imprimé par À Garder</p>
    </div>
  );
}
