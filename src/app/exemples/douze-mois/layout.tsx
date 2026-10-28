import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de Douze Mois, la boutique de fleurs imaginaire des deux vidéos des
// fleuristes. Polices : Bodoni Moda (la cousine libre du Didot de la marque, en graisse normale) pour les
// titres et leur italique, Inter pour lire, Caveat pour la carte écrite à la main.
// Couleurs de la marque : prune, mimosa, rose. Chaque page s'ouvre sur un écran sombre.
export default function DouzeMoisLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Douze Mois"
      titres="bodoni"
      texte="inter"
      autres={["caveat"]}
      couleurs={{
        fond: "#FBF5EE",
        encre: "#2A1520",
        doux: "#6B4A55",
        accent: "#F2C94C",
        surAccent: "#2A1520",
        accentTexte: "#9B2C4B",
        carte: "#FFFFFF",
        trait: "#E6D7CC",
        sombre: "#2A1520",
        surSombre: "#FBF5EE",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}#choix`, libelle: "Commander" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
