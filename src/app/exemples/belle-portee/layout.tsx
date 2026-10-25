import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de Belle Portée, bureau d'études structure et géomètre-expert imaginaires :
// le site des deux vidéos du métier (« Créer une marque » et « Remplir l'agenda », qui
// imaginait « La Bonne Limite », fondue ici). La palette de la marque (encre #1E2A38,
// jaune #F2B134, brique, plâtre #F3EEE4), le quadrillage d'un plan, des filets de 2 px et
// des angles droits ; Archivo en capitales pour les titres, DM Sans pour lire. Les pages
// s'ouvrent sur le plâtre : l'en-tête flottant reste clair.
export default function BellePorteeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Belle Portée"
      titres="archivo"
      texte="dmSans"
      couleurs={{
        fond: "#F3EEE4",
        encre: "#1E2A38",
        doux: "#4D5866",
        accent: "#F2B134",
        surAccent: "#1E2A38",
        accentTexte: "#A63F2A",
        carte: "#FBF8F2",
        trait: "#D9D0BF",
        sombre: "#1E2A38",
        surSombre: "#F3EEE4",
      }}
    >
      <NavVerre accueil={DOSSIER} marque={<Marque />} liens={NAVIGATION} action={{ href: `${DOSSIER}/mon-mur`, libelle: "Mon mur" }} />
      {children}
      <Pied />
    </Cadre>
  );
}
