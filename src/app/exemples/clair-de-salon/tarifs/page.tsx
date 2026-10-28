import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, PrixCours, Surtitre } from "../_composants/Blocs";
import { CalculMois } from "../_composants/Outils";
import { entreprise } from "../_composants/donnees";

// Les tarifs, comme l'arrêté du 17 mars 2015 le demande pour les cours à domicile. La
// vidéo « Remplir l'agenda » : « Et le prix, en grand. Le crédit d'impôt, à part, en plus
// petit. C'est la règle, pour les cours à domicile. »
export const metadata: Metadata = {
  title: "Tarifs — Clair de Salon, site de démonstration",
  description: "Le prix d'un cours de piano ou de maths à domicile, à l'heure, HT et TTC, frais compris, et l'avantage fiscal à part (exemple). Site de démonstration.",
  ...adressesDeLaPage("/exemples/clair-de-salon/tarifs"),
};

const PRESTATIONS = [
  { nom: "Cours de piano à domicile", detail: `Adultes et enfants, sur ton piano, avec ${entreprise.pianiste}. Services à la personne : cours à domicile.` },
  { nom: "Cours de maths à domicile", detail: `Du collège à la seconde, à ta table, avec ${entreprise.mathematicienne}. Services à la personne : soutien scolaire à domicile.` },
  { nom: "Concert de salon", detail: "Une fois par mois, chez un élève. Gratuit pour les élèves et pour leurs invités." },
];

export default function Tarifs() {
  return (
    <main>
      <EnTetePage surtitre="Tarifs" titre="Le prix, *en grand.*">
        Le même pour le piano et pour les maths : à l&apos;heure, hors taxes et toutes taxes
        comprises, déplacement compris. Et le crédit d&apos;impôt à part, en plus petit, parce que
        c&apos;est la règle pour les cours à domicile.
      </EnTetePage>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <Apparition de="zoom">
          <PrixCours />
        </Apparition>
        <div className="space-y-8">
          <div className="space-y-5">
            <Apparition><Surtitre>Les prestations</Surtitre></Apparition>
            <TitreRevele
              texte="Trois choses, *un prix.*"
              className="text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.98] tracking-[-0.02em]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <ul className="border-t border-[var(--trait)]">
              {PRESTATIONS.map((p, i) => (
                <Apparition as="li" key={p.nom} delai={i * 100} className="space-y-1 border-b border-[var(--trait)] py-4">
                  <h2 className="text-2xl">{p.nom}</h2>
                  <p className="text-[var(--doux)]">{p.detail}</p>
                </Apparition>
              ))}
            </ul>
          </div>
          <CalculMois />
          <p className="text-sm text-[var(--doux)]">Arrêté du 17 mars 2015, art. 2, 4, 5 et 6 · prix d&apos;exemple.</p>
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
