import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Clés à Toi : les couleurs de la marque (vert forêt, moutarde,
// crème), Outfit pour les titres (le Futura de la vidéo), Newsreader pour le texte.
// Le pied porte nom, adresse et agrément (arrêté du 19 juin 1987, art. 3).
export default function ClesAToiLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Clés à Toi"
      titres="outfit"
      texte="newsreader"
      couleurs={{
        fond: "#F7F1E3",
        encre: "#1B1B1B",
        doux: "#4F5A52",
        accent: "#E2A72E",
        surAccent: "#1B1B1B",
        accentTexte: "#1F4D3A",
        carte: "#FFFBF2",
        trait: "#E3D9C3",
        sombre: "#173A2B",
        surSombre: "#F7F1E3",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
