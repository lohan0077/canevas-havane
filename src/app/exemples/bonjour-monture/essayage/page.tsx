import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { QUESTIONS, type Choix } from "../_composants/donnees";
import Essayage from "../_composants/Essayage";
import { Surtitre } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Réserver un essayage · Bonjour Monture — site de démonstration",
  description: "Trois questions, ton prénom, un créneau : douze montures t'attendront sur un plateau. Démonstration, rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/bonjour-monture/essayage"),
};

// Les réponses données sur l'accueil arrivent dans l'adresse ; on ne garde que
// celles qui existent (une adresse se modifie à la main).
export default async function PageEssayage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const depart: Choix = {};
  for (const q of QUESTIONS) {
    const v = params[q.id];
    if (typeof v === "string" && q.reponses.some((r) => r.id === v)) depart[q.id] = v;
  }

  return (
    <main className="mx-auto max-w-6xl space-y-14 px-5 py-12 sm:py-20">
      <header className="max-w-3xl space-y-5">
        <Surtitre>Essayage préparé · 45 minutes</Surtitre>
        <h1 className="text-[2.9rem] sm:text-7xl">
          Réserve ton <em className="text-[var(--accent-texte)]">plateau.</em>
        </h1>
        <p className="text-lg leading-relaxed">
          Trois réponses, ton prénom si tu veux, un créneau. La veille, on choisit douze
          montures de la boutique pour toi.
        </p>
      </header>
      <Essayage depart={depart} />
    </main>
  );
}
