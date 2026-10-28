import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque, Pied } from "./_composants/Blocs";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Trois Marches, agence immobilière fictive filmée dans les deux vidéos des agents
// immobiliers (« Créer une marque » et « Remplir l'agenda », dont le site Le Soir Même
// est fondu ici). Papier crème, terre cuite et brun de la marque ; Playfair Display pour
// les titres, Manrope pour lire, Caveat pour les souvenirs écrits à la main. Les photos
// sont posées dans des arches, comme des portes et des fenêtres hautes.
export default function TroisMarchesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Trois Marches"
      titres="playfair"
      texte="manrope"
      autres={["caveat"]}
      couleurs={{
        fond: "#F7F2E8",
        encre: "#3E3A36",
        doux: "#665D55",
        accent: "#B4532C",
        surAccent: "#FFFFFF",
        accentTexte: "#A04A26",
        carte: "#FFFDF8",
        trait: "#E2D8C6",
        sombre: "#3E3A36",
        surSombre: "#F7F2E8",
      }}
    >
      <NavVerre accueil={DOSSIER} marque={<Marque />} liens={NAVIGATION} action={{ href: `${DOSSIER}/estimation`, libelle: "Faire estimer" }} />
      <div>{children}</div>
      <Pied />
    </Cadre>
  );
}
