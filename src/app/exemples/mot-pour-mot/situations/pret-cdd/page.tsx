import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Situation from "../../_composants/Situation";

export const metadata: Metadata = {
  title: "Prêt immobilier en CDD — Mot pour Mot, site de démonstration",
  description: "Prêt immobilier en CDD, chez un courtier imaginaire : ce que regardent les banques, les pièces à réunir, un dossier d'exemple, et le rendez-vous qu'on choisit soi-même.",
  ...adressesDeLaPage("/exemples/mot-pour-mot/situations/pret-cdd"),
};

export default function PagePretCdd() {
  return <Situation initiale="pret-cdd" />;
}
