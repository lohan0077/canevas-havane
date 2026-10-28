import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Moment from "./_composants/Moment";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Voix Basse, cabinet vétérinaire fictif filmé dans les deux vidéos des vétérinaires.
// Instrument Serif pour la voix douce de la marque, Manrope pour lire, Caveat pour le
// carnet. Le site a deux visages : de jour quand le cabinet est ouvert, du soir quand il
// est fermé (`Moment` change les couleurs). Le `noindex` vient du layout de /exemples.
export default function VoixBasseLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Voix Basse"
      titres="instrument"
      texte="manrope"
      autres={["caveat"]}
      couleurs={{
        fond: "#FBF7EF",
        encre: "#2F4A3E",
        doux: "#56695F",
        accent: "#C9B6E4",
        surAccent: "#2F4A3E",
        accentTexte: "#62489A",
        carte: "#FFFFFF",
        trait: "#E4DDD0",
        sombre: "#2F4A3E",
        surSombre: "#FBF7EF",
      }}
    >
      <Moment>
        <NavVerre
          accueil={DOSSIER}
          marque={<Marque />}
          liens={NAVIGATION}
          action={{ href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" }}
        />
        {children}
        <Pied />
      </Moment>
    </Cadre>
  );
}
