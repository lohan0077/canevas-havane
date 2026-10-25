import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit du site Cinquante Minutes, cabinet de psychologue imaginaire filmé dans
// les deux vidéos des psychologues. Bodoni Moda pour la Didot de la marque, Work Sans
// pour lire ; prune, caramel, sauge et crème. Chaque page s'ouvre sur la nuit prune :
// l'en-tête flottant est donc clair sur sombre tant qu'on n'a pas défilé.
export default function CinquanteMinutesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Cinquante Minutes"
      titres="bodoni"
      texte="workSans"
      couleurs={{
        fond: "#F4ECE2",
        encre: "#3B2440",
        doux: "#66525F",
        accent: "#C9A27E",
        surAccent: "#2A1830",
        accentTexte: "#86542A",
        carte: "#FBF6EF",
        trait: "#E2D5C6",
        sombre: "#2A1830",
        surSombre: "#F4ECE2",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
