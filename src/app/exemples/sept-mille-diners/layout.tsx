import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Sept Mille Dîners : Playfair Display pour les titres (le Big Caslon de
// la marque), Outfit pour le texte. Nappe crème, encre brun-noir, terre cuite, lin et
// sauge — la palette de la vidéo. Mise en page inspirée du modèle « Kairo Studio » de
// MotionSites — un mot immense, l'image posée dedans —, transposée à une marque de
// cuisines : le mot, ici, c'est un nombre.
export default function SeptMilleDinersLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Sept Mille Dîners"
      titres="playfair"
      texte="outfit"
      couleurs={{
        fond: "#F7F2EA",
        encre: "#2E2A26",
        doux: "#615A52",
        accent: "#B5523B",
        surAccent: "#FFFFFF",
        accentTexte: "#9C4430",
        carte: "#FFFCF6",
        trait: "#E6DBCB",
        sombre: "#2E2A26",
        surSombre: "#F7F2EA",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
