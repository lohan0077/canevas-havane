import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, PORCELAINE, Titre } from "../_composants/Blocs";
import { DOSSIER, QUESTIONS_GUIDE } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Comment choisir un bon cuisiniste — Sept Mille Dîners, site de démonstration",
  description:
    "Les questions à poser à tous les cuisinistes que vous verrez, même si ce n'est pas nous : qui prend les cotes, qui pose, qui revient. Site de démonstration.",
  ...adressesDeLaPage("/exemples/sept-mille-diners/choisir-son-cuisiniste"),
};

// Le guide « comment choisir un bon cuisiniste » (vraie recherche, voir SOURCES.md de la
// vidéo « Remplir l'agenda ») : des questions à poser à tous, nous compris. Il ne nomme,
// ne compare et ne dénigre personne. `data-film="guide"`, `#meme-si` et les `data-film`
// des questions servent au tournage.
export default function ChoisirSonCuisiniste() {
  return (
    <main>
      <section data-film="guide" className="relative isolate flex min-h-[64svh] flex-col bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-14 pt-36 md:pb-20">
          <Titre as="h1" texte="Comment choisir un bon cuisiniste." taille="geant" className="max-w-4xl" />
          {/* La ligne entière en italique de laiton : un parti pris sur toute la phrase, pas sur un mot. */}
          <Titre as="p" id="meme-si" texte="Même si ce n'est pas nous." taille="moyen" className="italic text-[var(--accent-texte)]" />
          <Apparition delai={500} className="max-w-xl text-lg leading-relaxed text-[var(--sur-sombre)]">
            Vous verrez peut-être trois magasins, et vous repartirez avec trois plans. Pour les comparer, posez les mêmes
            questions à tous ceux que vous verrez. Nous compris. On ne dit rien des autres : on dit seulement ce que, nous,
            on répond.
          </Apparition>
        </div>
      </section>

      <section className={PORCELAINE}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {QUESTIONS_GUIDE.map((q, i) => (
            <Apparition as="li" key={q.id} id={q.id} data-film={q.id} className="scroll-mt-24 grid gap-5 py-10 md:grid-cols-[4rem_1fr_minmax(0,22rem)] md:gap-10">
              <span aria-hidden="true" className="font-[family-name:var(--titres)] text-5xl italic leading-none">{i + 1}</span>
              <div className="space-y-3">
                <h2 className="font-[family-name:var(--titres)] text-[clamp(1.9rem,3.2vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.02em]">{q.question}</h2>
                <p className="text-lg leading-relaxed text-[var(--doux)]">{q.pourquoi}</p>
              </div>
              <p className="self-end rounded-2xl border border-[var(--trait)] bg-[var(--carte)] px-5 py-4 text-[17px] leading-relaxed">
                <span className="font-semibold">Notre réponse :</span> {q.nous}
              </p>
            </Apparition>
          ))}
        </ol>
      </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-28 md:py-40 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Titre texte={"Ce qu'on ne fera pas : dire du mal des autres."} />
          <div className="space-y-6">
            <p className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">
              Ce guide ne compare personne, et ne nomme aucune enseigne. Les questions sont bonnes partout ; à vous de juger
              les réponses.
            </p>
            <Bouton href={`${DOSSIER}/tes-murs`}>Dessiner ma cuisine</Bouton>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
