import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, QUESTIONS_GUIDE } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Comment choisir un bon cuisiniste · Jusqu'au Café — site de démonstration",
  description: "Les questions à poser à tous les cuisinistes que vous verrez, même si ce n'est pas nous : qui prend les cotes, qui pose, qui revient. Site de démonstration.",
  ...adressesDeLaPage("/exemples/jusqu-au-cafe/choisir-son-cuisiniste"),
};

export default function ChoisirSonCuisiniste() {
  return (
    <div>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-12 space-y-6" data-film="guide">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent-texte)]">Le guide</p>
        <h1 className="text-[2.9rem] sm:text-7xl font-light tracking-[-0.02em]">Comment choisir un bon cuisiniste.</h1>
        <p className="font-[family-name:var(--titres)] text-3xl sm:text-4xl italic text-[var(--accent-texte)]" data-film="meme-si">Même si ce n&apos;est pas nous.</p>
        <p className="text-xl leading-relaxed text-[var(--doux)]">
          Vous verrez peut-être trois magasins, et vous repartirez avec trois plans. Pour les comparer,
          posez les mêmes questions à tous ceux que vous verrez. Nous compris. On ne dit rien des
          autres : on dit seulement ce que, nous, on répond.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <ol className="space-y-4">
          {QUESTIONS_GUIDE.map((q, i) => (
            <li key={q.id} id={q.id} data-film={q.id} className="scroll-mt-24 rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8 space-y-4">
              <p className="flex items-baseline gap-4">
                <span className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)] tabular-nums">{i + 1}</span>
                <span className="font-[family-name:var(--titres)] text-3xl sm:text-4xl leading-tight">{q.question}</span>
              </p>
              <p className="text-lg leading-relaxed">{q.pourquoi}</p>
              <p className="rounded-2xl bg-[var(--fond)] border-l-4 border-[var(--accent)] px-4 py-3 text-lg">
                <span className="font-bold text-[var(--accent-texte)]">Notre réponse :</span> {q.nous}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-5">
          <h2 className="text-4xl sm:text-5xl font-light">Ce qu&apos;on ne fera pas : <span className="italic text-[#7A4E22]">dire du mal des autres.</span></h2>
          <p className="text-xl leading-relaxed">
            Ce guide ne compare personne, et ne nomme aucune enseigne. Les questions sont bonnes partout ;
            à vous de juger les réponses.
          </p>
          <Link href={`${DOSSIER}/ma-cuisine`} className="inline-flex rounded-full bg-[var(--sur-sombre)] text-[var(--sombre)] px-7 py-3.5 text-lg font-bold">
            Dessiner ma cuisine
          </Link>
        </div>
      </section>
    </div>
  );
}
