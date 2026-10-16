import { Arvo, DM_Sans } from "next/font/google";

// Les polices de Neuf Étés, servies depuis notre domaine. Arvo tient le rôle du
// Rockwell de la vidéo : une égyptienne franche, lisible par un enfant.
export const titres = Arvo({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], display: "swap", variable: "--ne-titres" });
export const texte = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--ne-texte" });
