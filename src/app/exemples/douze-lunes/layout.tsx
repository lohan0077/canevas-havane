import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import Moment from "./_composants/Moment";
import { PiedDeSite } from "./_composants/Blocs";

// Douze Lunes, cabinet vétérinaire fictif de la vidéo « Si je devais remplir l'agenda
// d'un vétérinaire ». Le site a deux visages : de jour quand le cabinet est ouvert,
// du soir quand il est fermé (le composant Moment change la palette). Le `noindex`
// vient du layout de /exemples.
export default function DouzeLunesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Douze Lunes"
      titres="dmSerif"
      texte="figtree"
      couleurs={{
        fond: "#F6F1E9",
        encre: "#1B2340",
        doux: "#4A5470",
        accent: "#E9A86B",
        surAccent: "#1B2340",
        accentTexte: "#A2501E",
        carte: "#FFFFFF",
        trait: "#DDD5C8",
        sombre: "#121A36",
        surSombre: "#F3EBDB",
      }}
    >
      <Moment>
        <EnTete />
        {children}
        <PiedDeSite />
      </Moment>
    </Cadre>
  );
}
