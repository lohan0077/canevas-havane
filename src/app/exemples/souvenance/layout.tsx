import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { Pied } from "./_composants/Elements";

// Souvenance, la marque imaginée dans la vidéo « Si je devais créer une marque de
// cosmétiques de zéro ». Le `noindex` vient du layout de /exemples.
export default function SouvenanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Souvenance"
      titres="bodoni"
      texte="lora"
      couleurs={{
        fond: "#F7F1E8",
        encre: "#4A2E3A",
        doux: "#6E5560",
        accent: "#4A2E3A",
        surAccent: "#F7F1E8",
        accentTexte: "#8A4A5C",
        carte: "#FFFBF5",
        trait: "#E6D9CB",
        sombre: "#2A1820",
        surSombre: "#F7F1E8",
      }}
    >
      <EnTete />
      {children}
      <Pied />
    </Cadre>
  );
}
