import { Fraunces, Manrope } from "next/font/google";

// Les polices de Premier Plongeon, servies depuis notre domaine comme celles du site
// (voir le layout racine) : aucune requête vers Google au chargement.
export const titres = Fraunces({ subsets: ["latin"], display: "swap", variable: "--pp-titres" });
export const texte = Manrope({ subsets: ["latin"], display: "swap", variable: "--pp-texte" });
