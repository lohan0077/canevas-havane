import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de Sept Mille Dîners, marque de cuisines imaginaire filmée dans les deux
// vidéos des cuisinistes. Playfair Display (le Big Caslon de la marque), en italique
// pour les nombres et les mots qui comptent ; DM Sans pour lire. Nappe crème, encre
// brun-noir, terre cuite ; la forme de la marque est l'arche, comme le bord d'une
// assiette. L'accueil s'ouvre sur un écran clair : l'en-tête flottant reste clair.
export default function SeptMilleDinersLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Sept Mille Dîners"
      titres="playfair"
      texte="dmSans"
      couleurs={{
        fond: "#F7F2EA",
        encre: "#2E2A26",
        doux: "#5E574F",
        accent: "#B5523B",
        surAccent: "#FFFFFF",
        accentTexte: "#9C4430",
        carte: "#FFFCF6",
        trait: "#E3D6C3",
        sombre: "#241F1B",
        surSombre: "#F7F2EA",
      }}
    >
      {/* Playfair écrit les chiffres en bas de casse (« 11 ooo ») : on veut des capitales. */}
      <div className="lining-nums">
        <NavVerre
          accueil={DOSSIER}
          marque={<Marque />}
          liens={NAVIGATION}
          action={{ href: `${DOSSIER}/tes-murs#cotes`, libelle: "Prise de cotes" }}
        />
        {children}
        <Pied />
      </div>
    </Cadre>
  );
}
