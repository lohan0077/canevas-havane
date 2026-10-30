import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import SamedisLibres from "./_composants/SamedisLibres";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le site de Lundi d'Après, agence d'événements imaginaire (soirées d'entreprise et
// mariages, DJ compris), filmé dans les deux vidéos de l'événementiel.
//
// L'identité (30/10/2026) tient en deux temps, comme la marque : la nuit de la soirée et
// le lundi matin. La nuit (#0E0C1D, un noir d'encre à peine violet) porte le premier
// écran, les bandes sombres et le pied ; le lundi est un blanc de papier froid (#F4F3F8),
// jamais crème. Une seule couleur vive, le rose néon des projecteurs (#FF3D7F), réservée
// aux aplats et aux boutons ; en texte sur le blanc, sa version profonde (#C4124F). Syne,
// large et affichiste, pour les titres en bas de casse ; Space Grotesk pour lire, avec
// ses chiffres de compteur. Chaque page se termine sur les samedis encore libres.
export default function LundiDApresLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      calme
      entreprise="Lundi d'Après"
      titres="syne"
      texte="spaceGrotesk"
      couleurs={{
        fond: "#F4F3F8",
        encre: "#0E0C1D",
        doux: "#55526A",
        accent: "#FF3D7F",
        surAccent: "#0E0C1D",
        accentTexte: "#C4124F",
        carte: "#FFFFFF",
        trait: "#DEDCE8",
        sombre: "#0E0C1D",
        surSombre: "#F4F3F8",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/samedis-libres`, libelle: "Samedis libres" }}
        surSombre
      />
      <div className="overflow-x-clip">{children}</div>
      <SamedisLibres />
      <Pied />
    </Cadre>
  );
}
