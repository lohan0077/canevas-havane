import Image from "next/image";
import { photos } from "./donnees";
import styles from "./Limite.module.css";

/** Les questions, en accordéon natif. */
export function Faq({ questions }: { questions: { question: string; reponse: string }[] }) {
  return (
    <div className="space-y-3">
      {questions.map((q) => (
        <details key={q.question} className="group rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] px-5 py-4">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {q.question}
            <span aria-hidden="true" className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--fond)] text-lg leading-none text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pt-3 leading-relaxed text-[var(--doux)]">{q.reponse}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * La prairie pleine largeur et ses cartes de verre : un bornage d'exemple, résumé
 * comme sur un relevé. Le fond sombre sous la photo garde le texte lisible.
 */
export function Releve() {
  const cartes = [
    { titre: "Limite fixée", valeur: "38,40 m", note: "de la borne A à la borne D" },
    { titre: "Bornes posées", valeur: "4", note: "repérées par des mesures" },
    { titre: "Procès-verbal", valeur: "2 signatures", note: "toi et ton voisin, d'accord" },
  ];
  return (
    <section aria-label="Un bornage d'exemple" className="px-3 sm:px-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[var(--sombre)]">
        <Image src={photos.prairie.src} alt={photos.prairie.alt} width={photos.prairie.largeur} height={photos.prairie.hauteur} sizes="100vw" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path className={styles.trace} d="M40 170 L140 60 L270 90 L360 30" fill="none" stroke="#F7F6F1" strokeWidth="2" strokeDasharray="6 5" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="relative flex min-h-[460px] flex-col justify-end gap-3 p-4 sm:min-h-[560px] sm:flex-row sm:items-end sm:p-8">
          {cartes.map((c) => (
            <div key={c.titre} className="rounded-[20px] border border-[rgba(247,246,241,.25)] bg-[rgba(24,40,20,.82)] p-4 text-[#F7F6F1] backdrop-blur-md sm:w-56">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#C8D8BE]">{c.titre}</p>
              <p className="font-[family-name:var(--titres)] text-3xl font-bold tabular-nums">{c.valeur}</p>
              <p className="text-sm text-[#DCE6D4]">{c.note}</p>
            </div>
          ))}
          <p className="text-xs text-[#DCE6D4] sm:ml-auto sm:self-end">Relevé d&apos;exemple</p>
        </div>
      </div>
    </section>
  );
}
