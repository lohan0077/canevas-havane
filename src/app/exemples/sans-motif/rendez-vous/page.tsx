import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import TroisClics from "../_composants/TroisClics";
import { Surtitre, Trait } from "../_composants/Blocs";
import { cabinet } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Rendez-vous — Sans Motif, site de démonstration",
  description:
    "Le rendez-vous en trois clics d'une psychologue imaginaire : la séance, le jour, l'heure — et jamais le motif de consultation.",
  ...adressesDeLaPage("/exemples/sans-motif/rendez-vous"),
};

export default function RendezVous() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-20 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-5 px-1">
        <Surtitre>Rendez-vous · {cabinet.psychologue}, psychologue</Surtitre>
        <h1 className="text-[42px] sm:text-6xl font-normal tracking-[-0.045em]">
          <span className="font-bold">Trois clics.</span> Rien à expliquer.
          <Trait className="mt-2 w-44 text-[var(--accent)]" />
        </h1>
        <p className="text-lg leading-relaxed text-[var(--doux)] hidden sm:block">
          La séance, le jour, l&apos;heure. Puis un nom et un téléphone — jamais ce qui vous amène.
        </p>
      </div>
      <TroisClics />
    </main>
  );
}
