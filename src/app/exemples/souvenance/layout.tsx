import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Souvenance, la savonnerie imaginée dans les deux vidéos des cosmétiques : la marque
// de « Créer une marque » (pas de type de peau, un souvenir d'enfance), qui a absorbé
// les idées de « Remplir l'agenda » (le numéro de lot en page d'accueil, le séchoir).
// Bodoni Moda, la cousine libre du Didot de la marque, pour les titres ; Lora pour lire.
// Prune, vieux rose, lin : la palette de la vidéo. Chaque page s'ouvre sur un écran
// sombre : l'en-tête flottant est donc `surSombre`. Le `noindex` vient de /exemples.
export default function SouvenanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Souvenance"
      titres="bodoni"
      texte="lora"
      couleurs={{
        fond: "#F7F1E8",
        encre: "#3E2532",
        doux: "#6A5260",
        accent: "#C9A9A6",
        surAccent: "#3E2532",
        accentTexte: "#8A4A5C",
        carte: "#FFFBF5",
        trait: "#E6D9CB",
        sombre: "#2A1820",
        surSombre: "#F7F1E8",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}#lot`, libelle: "Mon numéro de lot" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
