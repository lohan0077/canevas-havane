import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Bouton, EnTetePage, Titre } from "../_composants/Blocs";
import { DOSSIER, entreprise, photos, questions } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Questions — Neuf Étés (démonstration)",
  description: "Déclaration, délais, sécurité, garanties, chantier filmé : les questions posées à une marque de piscines imaginaire avant de signer, et ses réponses.",
  ...adressesDeLaPage("/exemples/neuf-etes/questions"),
};

export default function Questions() {
  return (
    <main>
      <EnTetePage titre="Tout ce qu'on nous demande avant de signer." photo={photos.bouee} origine="50% 60%">
        La déclaration de travaux, les délais, la sécurité, les garanties, le film du chantier.
        Si ta question n&apos;y est pas, pose-la à la visite technique : c&apos;est fait pour ça.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Titre texte={`${questions.length} réponses, avant l'appel.`} taille="moyen" />
          <Apparition as="p" delai={200} className="text-lg leading-relaxed text-[var(--doux)]">
            Une autre question ? Appelle au <span className="font-bold tabular-nums">{entreprise.telephone}</span>, ou
            réserve la visite technique.
          </Apparition>
          <Apparition delai={300}>
            <Bouton href={`${DOSSIER}/ma-date`} variante="sombre">Réserver la visite technique</Bouton>
          </Apparition>
        </div>
        <Apparition delai={150}>
          <Accordeon questions={questions.map((q) => ({ question: q.q, reponse: q.r }))} />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
