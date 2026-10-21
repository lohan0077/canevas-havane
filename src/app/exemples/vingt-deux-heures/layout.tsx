import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Vingt-Deux Heures : Archivo très gras pour les titres, Figtree pour le
// texte. Papier crème, encre noire, et les couleurs d'une boîte de jeu — rouge
// tomate, jaune, bleu, et le vert du tapis de table pour les bandes sombres.
// Mise en page inspirée du modèle « Atrium MTL » de MotionSites (titre massif à
// gauche, mosaïque d'aplats et de photos), transposée à une boutique de jeux.
export default function VingtDeuxHeuresLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Vingt-Deux Heures"
      titres="archivo"
      texte="figtree"
      couleurs={{
        fond: "#F5EFE3",
        encre: "#151311",
        doux: "#55504A",
        accent: "#C93C22",
        surAccent: "#FFFFFF",
        accentTexte: "#A3301A",
        carte: "#FFFBF3",
        trait: "#E2D8C6",
        sombre: "#163D2F",
        surSombre: "#F5EFE3",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
