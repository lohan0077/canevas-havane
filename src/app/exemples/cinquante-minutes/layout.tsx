import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDeSite from "./_composants/PiedDeSite";

// Le gabarit du site Cinquante Minutes, cabinet de psychologue imaginé dans la vidéo
// « Si je devais créer un cabinet de psychologue de zéro ». Bodoni Moda pour la Didot
// de la marque, Work Sans pour lire ; prune, caramel et crème.
export default function CinquanteMinutesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Cinquante Minutes"
      titres="bodoni"
      texte="workSans"
      couleurs={{
        fond: "#F4ECE2",
        encre: "#3B2440",
        doux: "#66525F",
        accent: "#C9A27E",
        surAccent: "#2A1830",
        accentTexte: "#86542A",
        carte: "#FBF6EF",
        trait: "#E2D5C6",
        sombre: "#2A1830",
        surSombre: "#F4ECE2",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
