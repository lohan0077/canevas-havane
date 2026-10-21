import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Voix Basse, cabinet vétérinaire fictif de la vidéo « Si je devais créer une clinique
// vétérinaire ». Le site dit « cabinet » (Code rural, R242-54). Le `noindex` vient du
// layout de /exemples.
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
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
