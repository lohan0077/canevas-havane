import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'une
// entreprise de nettoyage ». Premier écran inspiré du modèle « Go On, White » de
// MotionSites (un mot géant en capitales, un objet posé dessus, beaucoup de blanc),
// transposé : le mot est LUNDI, l'objet est le post-it qu'on ne reçoit plus. Le
// `noindex` vient du layout de /exemples.
export default function LundiPropreLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Lundi Propre"
      titres="unbounded"
      texte="inter"
      couleurs={{
        fond: "#FFFFFF",
        encre: "#0B0B0C",
        doux: "#55595F",
        accent: "#2FBF9B",
        surAccent: "#0B0B0C",
        accentTexte: "#0F7A62",
        carte: "#F3F4F1",
        trait: "#E2E4DF",
        sombre: "#0B0B0C",
        surSombre: "#FFFFFF",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
