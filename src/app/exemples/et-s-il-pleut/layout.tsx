import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { NomMarque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit d'« Et s'il pleut », la wedding planner des deux vidéos des wedding
// planners : l'ivoire, l'ardoise d'un ciel couvert et le jaune d'un parapluie. Bodoni
// Moda en graisse normale pour les titres (le Didot de la marque, dans la vidéo), Inter pour lire.
// Chaque page s'ouvre sur le ciel d'ardoise : l'en-tête flottant l'attend sombre.
export default function EtSilPleutLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Et s'il pleut"
      titres="bodoni"
      texte="inter"
      couleurs={{
        fond: "#FBF6EC",
        encre: "#2F3B4C",
        doux: "#56616F",
        accent: "#F2C230",
        surAccent: "#2F3B4C",
        accentTexte: "#7A5A00",
        carte: "#FFFFFF",
        trait: "#E3DCCB",
        sombre: "#2F3B4C",
        surSombre: "#FBF6EC",
      }}
    >
      <NavVerre accueil={DOSSIER} marque={<NomMarque />} liens={NAVIGATION} action={{ href: `${DOSSIER}#ma-date`, libelle: "Ma date" }} surSombre />
      {children}
      <Pied />
    </Cadre>
  );
}
