import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Premier Billet, cabinet d'expertise comptable fictif de la vidéo « Si je devais créer
// un cabinet d'expertise comptable ». Gravure de billet, vert profond et or, transposée
// du modèle « Heritage Grove » de MotionSites. Vouvoiement et retenue (décret
// n° 2012-432, art. 152). Le `noindex` vient du layout de /exemples.
export default function PremierBilletLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Premier Billet"
      titres="bodoni"
      texte="dmSans"
      autres={["caveat"]}
      couleurs={{
        fond: "#F3EBD8",
        encre: "#1E3B32",
        doux: "#4E5E55",
        accent: "#C9A227",
        surAccent: "#1E3B32",
        accentTexte: "#7A5C0C",
        carte: "#FBF6EA",
        trait: "#DCCFB0",
        sombre: "#1E3B32",
        surSombre: "#F3EBD8",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
