import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Situation from "../../_composants/Situation";

export const metadata: Metadata = {
  title: "Prêt immobilier auto-entrepreneur — Bonne Nouvelle, site de démonstration",
  description: "Prêt immobilier pour un auto-entrepreneur, chez un courtier imaginaire : ce que regardent les banques, les pièces à réunir, un dossier d'exemple, et le créneau qu'on choisit soi-même.",
  ...adressesDeLaPage("/exemples/bonne-nouvelle/situations/auto-entrepreneur"),
};

export default function Page() {
  return <Situation initiale="auto-entrepreneur" />;
}
