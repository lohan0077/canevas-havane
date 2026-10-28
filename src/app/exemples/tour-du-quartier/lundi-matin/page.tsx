import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, CarteOccasion, EnTetePage, Pastille } from "../_composants/Blocs";
import Essai from "../_composants/Essai";
import Trajet from "../_composants/Trajet";
import { IMAGES, OCCASIONS } from "../_composants/donnees";

// « Je vendrais pas un vélo. Je vendrais le trajet de lundi matin. » La page de la vidéo
// « Remplir l'agenda » : une question (ton trajet, c'est combien ?), le vélo qu'il te
// faut, et l'essai réservé en ligne sur ton vrai trajet, un samedi matin.
export const metadata: Metadata = {
  title: "Lundi matin — Tour du Quartier, site de démonstration",
  description: "Ton trajet, c'est combien ? Glisse la distance, dis s'il y a une côte : le magasin imaginaire te montre le vélo qu'il te faut, et tu réserves l'essai sur ton vrai trajet.",
  ...adressesDeLaPage("/exemples/tour-du-quartier/lundi-matin"),
};

export default function LundiMatin() {
  return (
    <main>
      <EnTetePage pastille="Le trajet de lundi matin" titre="Lundi *matin.*" photo={IMAGES.piste}>
        Pas de fiche technique à rallonge : ton trajet, c&apos;est combien&nbsp;? Tu glisses, tu dis s&apos;il y a
        une côte, et on te montre le vélo qu&apos;il te faut.
      </EnTetePage>

      <section id="trajet" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-7 lg:sticky lg:top-28">
          <Apparition><Pastille>Une question</Pastille></Apparition>
          <TitreRevele
            texte={"Ton trajet, *c'est combien ?*"}
            className="font-[family-name:var(--titres)] text-[clamp(2.3rem,5vw,4.4rem)] font-bold leading-[0.98] tracking-[-0.05em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-xl leading-relaxed text-[var(--doux)]">
            Moteur, couple, wattheures : on en parle au magasin, si tu veux. Ici, la seule chose qui
            compte, c&apos;est la longueur de ton trajet, et sa côte.
          </Apparition>
        </div>
        <div className="rounded-[40px] bg-[var(--sombre)] p-4 text-[var(--sur-sombre)] sm:p-6">
          <Trajet />
        </div>
      </section>

      <section id="essai" className="scroll-mt-20 px-3 sm:px-5">
        <div className="rounded-[40px] bg-[#FCEFD3]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-10 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <Apparition><Pastille>L&apos;essai · deux heures</Pastille></Apparition>
              <TitreRevele
                texte="Sur ton vrai trajet, *un samedi matin.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[0.98] tracking-[-0.05em]"
                classeAccent="text-[var(--accent-texte)]"
              />
              <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
                Tu pars du magasin avec le vélo réglé à ta taille et un casque prêté, tu fais ton vrai
                trajet, tu reviens. Une pièce d&apos;identité est demandée au départ.
              </Apparition>
            </div>
            <Essai />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="mb-10 space-y-5">
          <Apparition><Pastille>Ou d&apos;occasion</Pastille></Apparition>
          <TitreRevele
            texte="Révisés, testés, *marqués.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[0.98] tracking-[-0.05em]"
            classeAccent="text-[var(--accent-texte)]"
          />
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OCCASIONS.map((o, i) => (
            <Apparition as="li" key={o.id} delai={i * 100} de="zoom">
              <CarteOccasion o={o} />
            </Apparition>
          ))}
        </ul>
      </section>

      <AppelFinal />
    </main>
  );
}
