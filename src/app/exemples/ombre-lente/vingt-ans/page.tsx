import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import Film from "../_composants/Film";
import { DOSSIER, PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le film de vingt ans — Ombre Lente, site de démonstration",
  description: "Chaque 25 novembre, la photo de ton arbre, au même endroit. Au bout de vingt ans, une pépinière imaginaire en fait un film : du bâton à l'ombre.",
  ...adressesDeLaPage("/exemples/ombre-lente/vingt-ans"),
};

const REGLES = [
  ["Le même endroit", "Repère-le le jour de la plantation : une marche, un coin de fenêtre. Toutes les photos se prennent de là."],
  ["La même date", "Le 25 novembre, jour de la plantation de tout le monde. On te le rappelle chaque année, si tu le veux."],
  ["Ton accord", "Le film reste chez toi. On ne publie une image que si tu nous le dis, sans adresse ni visage."],
];

export default function VingtAns() {
  return (
    <main>
      <EnTetePage surtitre="Une photo par an" titre="Dans vingt ans, ça fait *un film.*" photo={PHOTOS.jeuneArbre} origine="50% 60%">
        Chaque année, à la même date, la photo de ton arbre. Au bout de vingt ans, on monte le
        film : du bâton à l&apos;ombre.
      </EnTetePage>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="space-y-6">
            <Apparition><Surtitre annee="2026 → 2046">Le film</Surtitre></Apparition>
            <TitreRevele texte="Vingt ans *en cinq secondes.*" className="text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.92]" classeAccent="italic text-[var(--accent-texte)]" />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Ici, des dessins à la place des photos : appuie, et le tilleul grandit d&apos;un 25 novembre
              à l&apos;autre.
            </Apparition>
          </div>
          <Apparition de="zoom"><Film /></Apparition>
        </div>
      </section>
      <section className="bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl space-y-10 px-5 py-20 sm:px-8 md:py-28">
          <TitreRevele texte="Trois règles, *pas plus.*" className="text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[0.95]" classeAccent="italic text-[var(--accent-texte)]" />
          <ol className="grid gap-4 sm:grid-cols-3">
            {REGLES.map(([t, d], i) => (
              <Apparition as="li" key={t} delai={i * 120} className="space-y-2 rounded-[2rem] border border-[var(--trait)] bg-[var(--fond)] p-7">
                <p className="font-[family-name:var(--titres)] text-[52px] leading-none italic text-[var(--accent-texte)]">{i + 1}</p>
                <h2 className="text-[28px]">{t}</h2>
                <p className="leading-relaxed text-[var(--doux)]">{d}</p>
              </Apparition>
            ))}
          </ol>
          <Apparition><Bouton href={`${DOSSIER}/arbres`} variante="vert">Choisir mon arbre</Bouton></Apparition>
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
