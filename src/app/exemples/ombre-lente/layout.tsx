import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { Pied } from "./_composants/Elements";

// Ombre Lente, la pépinière imaginée dans la vidéo « Si je devais créer une pépinière
// de zéro ». Le `noindex` vient du layout de /exemples.
export default function OmbreLenteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Ombre Lente"
      titres="instrument"
      texte="manrope"
      couleurs={{
        fond: "#F6F1E4",
        encre: "#1F3A2B",
        doux: "#4E5E4F",
        accent: "#1F3A2B",
        surAccent: "#F6F1E4",
        accentTexte: "#4F6B37",
        carte: "#FFFDF7",
        trait: "#E2DACB",
        sombre: "#16291F",
        surSombre: "#F6F1E4",
      }}
    >
      <EnTete />
      {children}
      <Pied />
    </Cadre>
  );
}
