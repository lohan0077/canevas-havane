import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Bulletins from "../_composants/Bulletins";
import { Libelle, Titre } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Les lundis — Ciel Variable — site de démonstration",
  description: "Les bulletins météo des semaines passées d'une ferme imaginaire, et le panier qui allait avec chacun.",
  ...adressesDeLaPage("/exemples/ciel-variable/bulletins"),
};

export default function LesLundis() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-20">
      <div className="max-w-3xl space-y-5">
        <Libelle>Les lundis</Libelle>
        <Titre niveau={1} className="text-[44px] sm:text-7xl">Le ciel, semaine après semaine</Titre>
        <p className="text-xl leading-snug">
          Chaque lundi, trente secondes de vidéo : le ciel de la semaine, et le panier qui va
          avec. Voici leur version écrite, les trois derniers lundis.
        </p>
      </div>
      <div className="mt-12">
        <Bulletins />
      </div>
      <p className="mt-10 text-sm text-[var(--doux)]">Relevés et paniers d&apos;exemple : la ferme est fictive.</p>
    </main>
  );
}
