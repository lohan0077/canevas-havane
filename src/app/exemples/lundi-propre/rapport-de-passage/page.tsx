import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { AppelFinal, Pastille, Section } from "../_composants/Blocs";
import Rapport from "../_composants/Rapport";

export const metadata: Metadata = {
  title: "Le rapport du soir · Lundi Propre — site de démonstration",
  description: "Le rapport de passage que nos clients reçoivent chaque soir : heure d'arrivée et de départ, bureaux, sanitaires, poubelles, et ce qu'on a remarqué en passant.",
  ...adressesDeLaPage("/exemples/lundi-propre/rapport-de-passage"),
};

const REGLES = [
  ["Ce qui a été fait", "Les heures, les pièces, les tâches. De quoi savoir, avant lundi matin, que tout est fait."],
  ["Ce qu'on a remarqué", "Un store, une fuite, une fenêtre ouverte : ce qui n'est pas à nous, mais que vous voulez savoir avant vos équipes."],
  ["Personne n'est nommé", "« Équipe du soir · 2 agents ». Nos agents connaissent le rapport avant d'y travailler ; le CSE est consulté quand l'entreprise en a un."],
];

export default function RapportDePassage() {
  return (
    <>
      <Section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-5 lg:sticky lg:top-28">
          <Pastille>Un rapport d'exemple</Pastille>
          <h1 className="text-[40px] sm:text-7xl font-black leading-[0.95] tracking-[-0.04em]">Le rapport du soir.</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Chaque soir, avant 21 h 30, le rapport de passage arrive chez la personne que vous avez
            désignée. Touchez une ligne pour le détail, changez de soir pour voir la semaine.
          </p>
        </div>
        <Rapport />
      </Section>

      <div className="bg-[var(--carte)]">
        <Section className="grid gap-4 md:grid-cols-3">
          {REGLES.map(([t, d]) => (
            <article key={t} className="rounded-[24px] bg-[var(--fond)] p-6 space-y-2">
              <h2 className="text-2xl font-black leading-tight">{t}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{d}</p>
            </article>
          ))}
        </Section>
      </div>

      <AppelFinal />
    </>
  );
}
