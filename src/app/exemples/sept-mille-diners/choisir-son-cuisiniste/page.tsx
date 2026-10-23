import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import FondVivant from "../../_kit/FondVivant";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, Surtitre } from "../_composants/Blocs";
import { DOSSIER, QUESTIONS_GUIDE } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Comment choisir un bon cuisiniste — Sept Mille Dîners, site de démonstration",
  description:
    "Les questions à poser à tous les cuisinistes que vous verrez, même si ce n'est pas nous : qui prend les cotes, qui pose, qui revient. Site de démonstration.",
  ...adressesDeLaPage("/exemples/sept-mille-diners/choisir-son-cuisiniste"),
};

// Le guide « comment choisir un bon cuisiniste » (vraie recherche, voir SOURCES.md de la
// vidéo « Remplir l'agenda ») : des questions à poser à tous, nous compris. Il ne nomme,
// ne compare et ne dénigre personne. Les `data-film` servent au tournage.
export default function ChoisirSonCuisiniste() {
  return (
    <main>
      <section className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]" data-film="guide">
        <FondVivant couleurs={["#241F1B", "#3A2A22", "#7A3B28"]} vitesse={0.7} />
        <div className="absolute inset-0 bg-[var(--sombre)]/40" />
        <div className="relative mx-auto max-w-6xl space-y-8 px-5 pb-20 pt-40 sm:px-8 md:pb-28 md:pt-52">
          <Apparition><Surtitre clair>Le guide</Surtitre></Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte="Comment choisir un bon cuisiniste."
            className="max-w-5xl font-[family-name:var(--titres)] text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.035em]"
          />
          <TitreRevele
            as="p"
            auChargement
            delai={500}
            id="meme-si"
            texte="*Même si ce n'est pas nous.*"
            className="font-[family-name:var(--titres)] text-[clamp(2rem,4.5vw,3.6rem)] leading-tight"
            classeAccent="italic text-[#F0B49B]"
          />
          <Apparition as="p" delai={800} className="max-w-2xl text-xl leading-relaxed text-[var(--sur-sombre)]/90">
            Vous verrez peut-être trois magasins, et vous repartirez avec trois plans. Pour les comparer, posez
            les mêmes questions à tous ceux que vous verrez. Nous compris. On ne dit rien des autres : on dit
            seulement ce que, nous, on répond.
          </Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8 md:py-24">
        <ol className="space-y-5">
          {QUESTIONS_GUIDE.map((q, i) => (
            <Apparition
              as="li"
              key={q.id}
              id={q.id}
              data-film={q.id}
              de="zoom"
              className="scroll-mt-24 overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)]"
            >
              <div className="grid gap-5 p-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-10">
                <span aria-hidden="true" className="font-[family-name:var(--titres)] text-7xl italic leading-[0.8] text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}</span>
                <div className="space-y-4">
                  <h2 className="font-[family-name:var(--titres)] text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em]">{q.question}</h2>
                  <p className="text-lg leading-relaxed text-[var(--doux)]">{q.pourquoi}</p>
                </div>
              </div>
              <p className="border-t border-[var(--trait)] bg-[var(--fond)] px-6 py-4 text-lg sm:px-10">
                <span className="font-semibold text-[var(--accent-texte)]">Notre réponse :</span> {q.nous}
              </p>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-[var(--trait)] bg-[var(--carte)] px-6 py-16 sm:px-12 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <TitreRevele
              texte={"Ce qu'on ne fera pas\u00a0: *dire du mal des autres.*"}
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98] tracking-[-0.03em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <div className="space-y-5">
              <p className="text-lg leading-relaxed text-[var(--doux)]">
                Ce guide ne compare personne, et ne nomme aucune enseigne. Les questions sont bonnes partout ;
                à vous de juger les réponses.
              </p>
              <Bouton href={`${DOSSIER}/tes-murs`}>Dessiner ma cuisine</Bouton>
            </div>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
