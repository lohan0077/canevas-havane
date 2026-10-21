import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { Libelle } from "../_composants/Blocs";
import { Registre } from "../_composants/Interactions";

export const metadata: Metadata = {
  title: "Jamais Deux — site de démonstration",
  description: "Toutes les pièces numérotées d'une créatrice de bijoux imaginaire : celles qui sont encore là, et celles qui sont parties, dont la page reste.",
  ...adressesDeLaPage("/exemples/jamais-deux/pieces"),
};

export default function Pieces() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 lg:py-20">
      <div className="max-w-2xl space-y-5">
        <Libelle>Le registre des pièces</Libelle>
        <h1 className="text-[56px] sm:text-[80px]">
          Treize numéros, <em className="text-[var(--accent-texte)]">treize pièces.</em>
        </h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          Les dernières sorties de l&apos;atelier, de la plus récente à la plus ancienne. Celles qui sont parties gardent leur page : leur fabrication, leur date, jamais le nom de qui les porte.
        </p>
      </div>
      <div className="mt-12">
        <Registre />
      </div>
    </div>
  );
}
