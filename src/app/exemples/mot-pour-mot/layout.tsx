import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Mot pour Mot, courtier en crédit immobilier fictif de la vidéo « Si je devais remplir
// l'agenda d'un courtier ». Noir sur blanc, un seul bleu ; mise en page transposée du
// modèle « Go On, White » de MotionSites (capitales noires immenses sur fond blanc,
// boutons en pilule) et de son pied « Stark Minimal Footer » (le nom en très grand),
// sans texte ni code repris. Le titre de l'accueil est la phrase que la loi impose.
// Le `noindex` vient du layout de /exemples.
export default function MotPourMotLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Mot pour Mot"
      titres="archivo"
      texte="spaceGrotesk"
      couleurs={{
        fond: "#FFFFFF",
        encre: "#0B0B0C",
        doux: "#55565B",
        accent: "#1F45E6",
        surAccent: "#FFFFFF",
        accentTexte: "#1F45E6",
        carte: "#F3F3F0",
        trait: "#D9D9D4",
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
