import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { NomMarque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";
import "./pluie.css";

// Le gabarit d'« Et s'il pleut », la wedding planner des deux vidéos des wedding
// planners. La marque tient en trois couleurs : le gris lavande d'un ciel de pluie
// (le fond), l'encre d'orage (le texte et les bandes sombres), et le jaune d'un
// parapluie, réservé aux boutons et aux marques. Deux complémentaires : c'est pour ça
// que le jaune chante. Bodoni Moda pour les titres, le Didot de la marque inventée dans
// la vidéo, et son italique pour le mot qui compte ; DM Sans pour lire. Chaque page
// s'ouvre sur le ciel d'orage : l'en-tête flottant l'attend sombre.
export default function EtSilPleutLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      calme
      entreprise="Et s'il pleut"
      titres="bodoni"
      texte="dmSans"
      couleurs={{
        fond: "#E9E8EE",
        encre: "#1A1A2A",
        doux: "#545368",
        accent: "#FFC61A",
        surAccent: "#1A1A2A",
        accentTexte: "#4A3F86",
        carte: "#F7F6FA",
        trait: "#CFCDD9",
        sombre: "#191A28",
        surSombre: "#ECEBF2",
      }}
    >
      <NavVerre accueil={DOSSIER} marque={<NomMarque />} liens={NAVIGATION} action={{ href: `${DOSSIER}#ma-date`, libelle: "Ma date" }} surSombre />
      {children}
      <Pied />
    </Cadre>
  );
}
