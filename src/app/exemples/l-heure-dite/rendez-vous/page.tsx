import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { entreprise } from "../_composants/donnees";
import { Section, Surtitre } from "../_composants/Blocs";
import Creneau from "../_composants/Creneau";

export const metadata: Metadata = {
  title: "Choisir mon heure · L'Heure Dite — site de démonstration",
  description: "Choisis le jour et l'heure de ton appel parmi les cinq prochains jours ouvrables : on appelle à ce créneau, pas avant, et seulement pour ton devis.",
  ...adressesDeLaPage("/exemples/l-heure-dite/rendez-vous"),
};

const REGLES = [
  {
    titre: "Dans les cinq jours ouvrables",
    texte: "Un professionnel ne peut rappeler un particulier qui l'a demandé que dans les cinq jours ouvrables suivant la demande (C. consom., art. R223-4). Le site ne te propose donc que ces cinq jours-là, recalculés chaque jour, jours fériés retirés.",
  },
  {
    titre: "Seulement pour ton devis",
    texte: "L'appel ne porte que sur ce que tu as demandé (même article). Pas d'autre offre, pas de rappel « au cas où ».",
  },
  {
    titre: "À l'heure que tu as dite",
    texte: "Tu donnes ton accord pour une date et une heure précises, et nous pouvons en attester (art. L223-1). C'est ce créneau, et aucun autre.",
  },
];

export default function RendezVous() {
  return (
    <>
      <Section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-5 lg:sticky lg:top-28">
          <Surtitre>Ta demande de devis</Surtitre>
          <h1 className="text-[52px] sm:text-7xl font-normal tracking-[-0.03em]">
            Quand veux-tu <em className="text-[var(--accent-texte)]">qu'on t'appelle</em>&nbsp;?
          </h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Prends ton créneau, comme chez le coiffeur. On t'appelle à ce moment-là, pas une minute
            avant, et seulement pour ton devis.
          </p>
          <p className="text-[15px]">
            Tu préfères appeler&nbsp;? <span className="font-semibold tabular-nums whitespace-nowrap">{entreprise.telephone}</span>
          </p>
        </div>
        <Creneau />
      </Section>

      <div className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <Section className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <Surtitre>Pourquoi ces règles</Surtitre>
            <h2 className="text-[40px] sm:text-5xl font-normal tracking-[-0.02em]">La loi fixe un cadre. On choisit l'heure dedans.</h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {REGLES.map((r, i) => (
              <li key={r.titre} className="rounded-[26px] border border-[var(--trait)] bg-[var(--fond)] p-6 space-y-2">
                <p className="font-[family-name:var(--titres)] text-4xl text-[var(--accent-texte)] tabular-nums">{i + 1}</p>
                <h3 className="text-2xl">{r.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{r.texte}</p>
              </li>
            ))}
          </ol>
          <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--doux)]">
            Sur un vrai site, ta demande servirait seulement à t'appeler, et sa trace serait gardée
            trois ans, comme l'exige le code de la consommation. Ici, c'est une démonstration&nbsp;: rien
            n'est envoyé, rien n'est enregistré.
          </p>
        </Section>
      </div>
    </>
  );
}
