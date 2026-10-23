import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Situation from "../../_composants/Situation";

export const metadata: Metadata = {
  title: "Prêt immobilier en CDD — Bonne Nouvelle, site de démonstration",
  description: "Prêt immobilier en CDD, chez un courtier imaginaire : ce que regardent les banques, les pièces à réunir, un dossier d'exemple, et le créneau qu'on choisit soi-même.",
  ...adressesDeLaPage("/exemples/bonne-nouvelle/situations/pret-cdd"),
};

export default function Page() {
  return <Situation initiale="pret-cdd" />;
}
