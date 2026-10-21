import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDeSite from "./_composants/PiedDeSite";

// Le gabarit du site Sans Détour, cabinet d'ostéopathie imaginé dans la vidéo
// « Si je devais remplir l'agenda d'un ostéopathe ». Le Cadre pose les polices, les
// couleurs, le bandeau de démonstration et le pied commun ; le `noindex` vient du
// layout de /exemples.
export default function SansDetourLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Sans Détour"
      titres="manrope"
      texte="manrope"
      autres={["instrument"]}
      couleurs={{
        fond: "#F1EFEA",
        encre: "#1C2321",
        doux: "#545C58",
        accent: "#B5401F",
        surAccent: "#FFFFFF",
        accentTexte: "#A8391B",
        carte: "#FFFFFF",
        trait: "#D9D5CC",
        sombre: "#1F2A27",
        surSombre: "#EDEAE3",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
