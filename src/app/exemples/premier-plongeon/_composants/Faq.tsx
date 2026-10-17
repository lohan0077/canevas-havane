import type { Question } from "./donnees";
import { styles as s } from "./Habillage";

/** Questions et réponses dépliables, sans JavaScript : `<details>` fait tout. */
export default function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="border-y border-[rgba(255,255,255,0.13)] divide-y divide-[rgba(255,255,255,0.13)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold text-white [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className={`${s.technique} grid h-9 w-9 shrink-0 place-items-center text-xl text-[#e8d1cb] transition-transform group-open:rotate-45`}>
                +
              </span>
            </summary>
            <p className="pb-7 pr-12 max-w-3xl leading-relaxed text-[#b9c0cc]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
