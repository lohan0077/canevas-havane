import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Situation from "../../_composants/Situation";

export const metadata: Metadata = {
  title: "Premier achat, primo-accédant — Mot pour Mot, site de démonstration",
  description: "Premier achat immobilier, chez un courtier imaginaire : apport, capacité de remboursement, pièces à réunir, dossier d'exemple.",
  ...adressesDeLaPage("/exemples/mot-pour-mot/situations/primo-accedant"),
};

export default function PagePrimoAccedant() {
  return <Situation initiale="primo-accedant" />;
}
