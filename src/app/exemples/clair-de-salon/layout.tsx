import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de Clair de Salon, cours particuliers à domicile imaginaires : le site des
// deux vidéos des cours particuliers (le piano de « Créer une marque », les maths de
// « Remplir l'agenda »). La nuit d'un salon éclairé : chaque page s'ouvre sur un écran
// sombre, d'où l'en-tête `surSombre`. Polices : Bodoni Moda (le programme de concert),
// Manrope pour lire, Caveat pour les notes dans la marge du cahier.
export default function ClairDeSalonLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Clair de Salon"
      titres="bodoni"
      texte="manrope"
      autres={["caveat"]}
      couleurs={{
        fond: "#F6F0E1",
        encre: "#1E2A44",
        doux: "#535B6E",
        accent: "#C9A24B",
        surAccent: "#1E2A44",
        accentTexte: "#8C3B3B",
        carte: "#FFFCF5",
        trait: "#E3D8BF",
        sombre: "#1E2A44",
        surSombre: "#F6F0E1",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/reserver`, libelle: "Réserver" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
