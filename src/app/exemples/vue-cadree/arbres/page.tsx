import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { ARBRES, DOSSIER } from "../_composants/donnees";
import { Note, Surtitre } from "../_composants/Elements";

export const metadata: Metadata = {
  title: "Vue Cadrée — site de démonstration",
  description: "Quand tailler un olivier, un cerisier, une haie : la réponse d'un paysagiste imaginaire en trois lignes, et un bouton pour réserver la taille.",
  ...adressesDeLaPage("/exemples/vue-cadree/arbres"),
};

export default function Arbres() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <Surtitre>Une page par arbre</Surtitre>
      <h1 className="mt-5 max-w-3xl text-[50px] font-bold leading-[0.98] sm:text-7xl">Quand tailler&nbsp;?</h1>
      <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-[var(--doux)]">
        La question qu&apos;on tape tous un jour. Notre réponse, en trois lignes, arbre par arbre, et un bouton pour
        réserver la taille.
      </p>
      <ul className="mt-12 divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
        {ARBRES.map((a) => (
          <li key={a.slug}>
            <Link href={`${DOSSIER}/arbres/${a.slug}`} className="grid gap-2 py-7 sm:grid-cols-[1fr_auto] sm:items-center">
              <span>
                <span className="block font-[family-name:var(--titres)] text-[32px] font-bold leading-tight">{a.question}</span>
                <span className="mt-1 block text-[16px] text-[var(--doux)]">{a.reponse[0]}</span>
              </span>
              <Note className="sm:text-right">{a.saison} →</Note>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
