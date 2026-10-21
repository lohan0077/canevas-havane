import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Situation from "../../_composants/Situation";

export const metadata: Metadata = {
  title: "Prêt immobilier auto-entrepreneur — Mot pour Mot, site de démonstration",
  description: "Prêt immobilier quand on est auto-entrepreneur, chez un courtier imaginaire : années de déclarations, revenu retenu, pièces à réunir, dossier d'exemple.",
  ...adressesDeLaPage("/exemples/mot-pour-mot/situations/auto-entrepreneur"),
};

export default function PageAutoEntrepreneur() {
  return <Situation initiale="auto-entrepreneur" />;
}
