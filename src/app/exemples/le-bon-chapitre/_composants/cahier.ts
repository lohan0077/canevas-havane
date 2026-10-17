import type { CSSProperties } from "react";

/**
 * Une page de cahier à grands carreaux (réglure Seyès) : une ligne violette tous les
 * 32 px, trois lignes pâles entre elles, des verticales, et la marge rouge à gauche.
 * Dessinée en CSS : aucune image.
 */
export const styleCahier: CSSProperties = {
  backgroundColor: "#FFFFFF",
  backgroundImage: [
    "linear-gradient(90deg, transparent 30px, #E39A90 30px, #E39A90 32px, transparent 32px)",
    "linear-gradient(#C3CDEB 1px, transparent 1px)",
    "linear-gradient(#E9EDF8 1px, transparent 1px)",
    "linear-gradient(90deg, #E9EDF8 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "100% 100%, 100% 32px, 100% 8px, 32px 100%",
};
