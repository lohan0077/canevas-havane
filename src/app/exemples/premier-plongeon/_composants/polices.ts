import { Chakra_Petch, Fraunces, Inter, Manrope } from "next/font/google";

// Les polices de Premier Plongeon, servies depuis notre domaine comme celles du site
// (voir le layout racine) : aucune requête vers Google au chargement.
export const titres = Fraunces({ subsets: ["latin"], display: "swap", variable: "--pp-titres" });
export const texte = Manrope({ subsets: ["latin"], display: "swap", variable: "--pp-texte" });

// L'ouverture de l'accueil, reprise du modèle « Monolith Hero » de MotionSites :
// Inter pour le titre et le paragraphe, Chakra Petch pour chaque libellé. Le modèle
// livre des sous-ensembles limités à l'ASCII — sans « é » ni « à », inutilisables
// en français — d'où les fichiers complets du jeu latin.
export const ouverture = Inter({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--pp-ouverture" });
export const libelles = Chakra_Petch({ subsets: ["latin"], weight: "700", display: "swap", variable: "--pp-libelles" });
