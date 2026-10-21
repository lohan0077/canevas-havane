import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDeSite from "./_composants/PiedDeSite";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'un
// libraire » : une seule question (le dernier livre que t'as adoré), la réponse d'un
// libraire, la réservation retirée en boutique avec un marque-page écrit à la main.
// Inspiration : le modèle « Editorial Eyewear » de MotionSites (nom manuscrit, petites
// colonnes de texte, un titre où un seul mot passe en italique), transposé sur du
// papier blanc, de l'encre et un bleu de stylo.
// Le `noindex` vient du layout de /exemples.
export default function TuVasVoirLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Tu Vas Voir"
      titres="fraunces"
      texte="dmSans"
      autres={["caveat"]}
      couleurs={{
        fond: "#FBF8F1",
        encre: "#16130F",
        doux: "#5A544B",
        accent: "#2340C8",
        surAccent: "#FFFFFF",
        accentTexte: "#2340C8",
        carte: "#FFFFFF",
        trait: "#E2DCCF",
        sombre: "#16130F",
        surSombre: "#FBF8F1",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
