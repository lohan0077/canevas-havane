import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER } from "../_composants/donnees";
import { Surtitre } from "../_composants/Elements";
import { Film } from "../_composants/Interactifs";

export const metadata: Metadata = {
  title: "Ombre Lente — site de démonstration",
  description: "Une photo de son arbre par an, du même endroit, à la même date : au bout de vingt ans, une pépinière imaginaire en fait un film.",
  ...adressesDeLaPage("/exemples/ombre-lente/vingt-ans"),
};

const REGLES = [
  ["Le même endroit", "Repère-le le jour de la plantation : une marche, un coin de fenêtre. Toutes les photos se prennent de là."],
  ["La même date", "La date anniversaire de ta plantation. On te la rappelle chaque année, si tu le veux."],
  ["Ton accord", "Le film reste chez toi. On ne publie une image que si tu nous le dis, sans adresse ni visage."],
];

export default function VingtAns() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-5 pb-10 pt-14 text-center sm:px-8">
        <Surtitre>Une photo par an</Surtitre>
        <h1 className="mt-5 text-[56px] font-normal leading-[1] sm:text-7xl">Dans vingt ans, ça fait <span className="italic text-[var(--accent-texte)]">un film.</span></h1>
        <p className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-[var(--doux)]">
          Chaque année, à la même date, la photo de ton arbre. Au bout de vingt ans, on monte le film : du bâton à
          l&apos;ombre.
        </p>
      </section>
      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
        <Film />
      </section>
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-5xl space-y-8 px-5 py-16 sm:px-8">
          <h2 className="text-[42px] font-normal sm:text-5xl">Trois règles, pas plus.</h2>
          <ol className="grid gap-4 sm:grid-cols-3">
            {REGLES.map(([t, d], i) => (
              <li key={t} className="space-y-2 rounded-[24px] border border-[var(--trait)] bg-[var(--fond)] p-6">
                <p className="font-[family-name:var(--titres)] text-[44px] leading-none text-[var(--accent-texte)]">{i + 1}</p>
                <h3 className="text-[26px] font-normal">{t}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{d}</p>
              </li>
            ))}
          </ol>
          <Link href={`${DOSSIER}/arbres`} className="inline-block rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-[var(--sur-accent)]">Choisir mon arbre</Link>
        </div>
      </section>
    </main>
  );
}
