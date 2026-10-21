import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Commande from "../_composants/Commande";
import { Libelle, Port } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Paraphe — site de démonstration",
  description: "Commander un livre dans une librairie imaginaire : à l'unité, sans frais de commande, au prix de l'éditeur, retiré en boutique.",
  ...adressesDeLaPage("/exemples/paraphe/commander"),
};

export default function PageCommander() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-8 lg:pt-14">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-5">
          <Libelle>Commander</Libelle>
          <h1 className="text-[48px] leading-[1.02] sm:text-[72px]">
            Pas lu par nous&nbsp;? <em>On le commande quand même.</em>
          </h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Tout libraire doit offrir la commande à l&apos;unité, gratuitement : c&apos;est la loi (loi n° 81-766, art. 1), et c&apos;est bien normal. N&apos;importe quel livre disponible chez son éditeur, au prix de l&apos;éditeur. Il arrivera sans paraphe : on ne signe que ce qu&apos;on a lu.
          </p>
        </div>
        <div className="border border-[var(--trait)] bg-[var(--fond)] p-5 sm:p-7">
          <Commande />
        </div>
      </div>
      <div className="mt-14">
        <Port />
      </div>
    </div>
  );
}
