import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de Reviens., dépôt de matériel professionnel imaginaire filmé dans les deux
// vidéos du métier. La palette de la marque — anthracite, sable, brique — sur un blanc de
// plâtre ; Archivo très gras, en capitales, pour les titres (des lettres de plaque
// gravée), Work Sans pour lire. Chaque page s'ouvre sur un écran sombre : l'en-tête
// flottant est réglé pour lui.
export default function ReviensLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Reviens."
      titres="archivo"
      texte="workSans"
      couleurs={{
        fond: "#F2EEE6",
        encre: "#1F2B35",
        doux: "#56616B",
        accent: "#B34A34",
        surAccent: "#FFFFFF",
        accentTexte: "#A8432E",
        carte: "#FAF7F1",
        trait: "#D9D0BF",
        sombre: "#1F2B35",
        surSombre: "#F2EEE6",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION.slice(1)}
        action={{ href: `${DOSSIER}/en-panne`, libelle: "En panne" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
