import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT, AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Rapport from "../_composants/Rapport";
import { photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le rapport du soir — Après Vous, site de démonstration",
  description: "Le rapport de passage que nos clients reçoivent chaque soir : heure d'arrivée et de départ, bureaux, sanitaires, poubelles, et ce qu'on a remarqué en passant.",
  ...adressesDeLaPage("/exemples/apres-vous/rapport-de-passage"),
};

const REGLES = [
  ["Ce qui a été fait", "Les heures, les pièces, les tâches. De quoi savoir, avant lundi matin, que tout est fait."],
  ["Ce qu'on a remarqué", "Un store, une fuite, une fenêtre ouverte : ce qui n'est pas à nous, mais que vous voulez savoir avant vos équipes."],
  ["Personne n'est nommé", "« L'équipe du soir · 2 agents ». Nos agents connaissent le rapport avant d'y travailler ; le CSE est consulté quand l'entreprise en a un."],
];

export default function RapportDePassage() {
  return (
    <main>
      <EnTetePage surtitre="Chaque soir, avant 21 h 30" titre="Le rapport *du soir.*" photo={photos.plateau}>
        Arrivée, départ, ce qui a été fait, et ce qu&apos;on a remarqué en passant&nbsp;: dans la boîte de la personne que vous
        avez désignée, le soir même.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Surtitre>Un rapport d&apos;exemple</Surtitre></Apparition>
          <TitreRevele texte="Mardi, *2e étage.*" className="font-[family-name:var(--titres)] text-[clamp(3rem,6vw,5.2rem)] font-normal leading-[0.95]" classeAccent={ACCENT} />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Touchez une ligne pour le détail, changez de soir pour voir la semaine. Le store et la fuite de mardi ont été signalés
            à 21 h 05&nbsp;: avant que quiconque les voie.
          </Apparition>
        </div>
        <Apparition de="zoom"><Rapport /></Apparition>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--sombre)]">
        <ul className="mx-auto grid max-w-6xl gap-px px-5 py-20 sm:px-8 md:grid-cols-3">
          {REGLES.map(([t, d], i) => (
            <Apparition as="li" key={t} delai={i * 120} className="space-y-3 border-t border-[var(--accent)] pt-6 md:pr-8">
              <h2 className="font-[family-name:var(--titres)] text-[34px] font-normal leading-tight">{t}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{d}</p>
            </Apparition>
          ))}
        </ul>
      </section>

      <div className="pt-24 md:pt-32">
        <AppelFinal />
      </div>
    </main>
  );
}
