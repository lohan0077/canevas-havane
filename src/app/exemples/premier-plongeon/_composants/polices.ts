import { Chakra_Petch, Inter } from "next/font/google";

// Les polices de Premier Plongeon, servies depuis notre domaine comme celles du site
// (voir le layout racine) : aucune requête vers Google au chargement.
//
// Celles du modèle « Monolith Hero » de MotionSites, sur tout le site : Inter pour
// les titres et le texte, Chakra Petch pour chaque libellé. Le modèle livre des
// sous-ensembles limités à l'ASCII — sans « é » ni « à », inutilisables en
// français — d'où les fichiers complets du jeu latin.
export const texte = Inter({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--pp-texte" });
export const libelles = Chakra_Petch({ subsets: ["latin"], weight: "700", display: "swap", variable: "--pp-libelles" });
