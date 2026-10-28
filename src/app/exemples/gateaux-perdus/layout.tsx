import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de Gâteaux Perdus, la pâtisserie imaginaire des deux vidéos des
// pâtisseries. Polices : DM Serif Display (le cousin libre du Big Caslon de la marque),
// DM Sans pour lire, Caveat pour l'écriture des fiches. Couleurs de la marque : cacao,
// rose dragée, beurre, crème. Les pages s'ouvrent sur un écran clair.
export default function GateauxPerdusLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Gâteaux Perdus"
      titres="dmSerif"
      texte="dmSans"
      autres={["caveat"]}
      couleurs={{
        fond: "#FFF8EC",
        encre: "#3D1D13",
        doux: "#6E4636",
        accent: "#E9B7C0",
        surAccent: "#3D1D13",
        accentTexte: "#9A3B2A",
        carte: "#FFFDF7",
        trait: "#EAD9C4",
        sombre: "#3D1D13",
        surSombre: "#FFF8EC",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}#envoyer`, libelle: "Envoyer la recette" }}
      />
      {children}
      <Pied />
    </Cadre>
  );
}
