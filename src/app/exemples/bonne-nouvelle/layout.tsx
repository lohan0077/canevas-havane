import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Bonne Nouvelle, cabinet de courtage fictif de la vidéo « Si je devais créer un cabinet de
// courtage de zéro ». Les couleurs de la marque (bleu nuit, vert, jaune, crème) ; mise en
// page transposée du modèle « TrustFlow » de MotionSites (un grand titre à empattements
// centré, un dessin au trait très pâle, une carte qui le chevauche avec des onglets
// numérotés), sans texte ni code repris. Le `noindex` vient du layout de /exemples.
export default function BonneNouvelleLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Bonne Nouvelle"
      titres="fraunces"
      texte="dmSans"
      couleurs={{
        fond: "#FFF8EC",
        encre: "#1B2A41",
        doux: "#4F5B6D",
        accent: "#F2C14E",
        surAccent: "#1B2A41",
        accentTexte: "#2E7D52",
        carte: "#FFFFFF",
        trait: "#EADFC9",
        sombre: "#1B2A41",
        surSombre: "#FFF8EC",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
