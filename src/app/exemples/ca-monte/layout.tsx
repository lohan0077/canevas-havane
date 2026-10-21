import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDeSite from "./_composants/PiedDeSite";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'un
// magasin de vélos » : « ton trajet, c'est combien ? », l'essai sur ton vrai trajet
// réservé en ligne, et la fiche de chaque vélo d'occasion (batterie testée, marquage).
// Inspiration : le modèle « Bold Studio » de MotionSites (titre en capitales serrées,
// chiffres en bandeau, bouton plein), transposé sur le bitume et un citron de
// signalisation.
// Le `noindex` vient du layout de /exemples.
export default function CaMonteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Ça Monte"
      titres="spaceGrotesk"
      texte="inter"
      couleurs={{
        fond: "#F2F1EC",
        encre: "#121417",
        doux: "#4E535A",
        accent: "#D7F23C",
        surAccent: "#121417",
        accentTexte: "#4A6B00",
        carte: "#FFFFFF",
        trait: "#D8D7D0",
        sombre: "#121417",
        surSombre: "#F2F1EC",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
