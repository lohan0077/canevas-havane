import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Situation from "../../_composants/Situation";

export const metadata: Metadata = {
  title: "Premier achat — Bonne Nouvelle, site de démonstration",
  description: "Premier achat immobilier, chez un courtier imaginaire : ce que regardent les banques, les pièces à réunir, un dossier d'exemple, et le créneau qu'on choisit soi-même.",
  ...adressesDeLaPage("/exemples/bonne-nouvelle/situations/primo-accedant"),
};

export default function Page() {
  return <Situation initiale="primo-accedant" />;
}
