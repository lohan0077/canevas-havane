import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Pavillon Bis, agence d'architecture fictive de la vidéo « Si je devais créer un cabinet
// d'architecture » : uniquement les pavillons des années 70. Accueil conversationnel à
// choix (transposé du modèle « Retro-Futurist » de MotionSites), palette brique, ocre,
// sapin et crème. Le `noindex` vient du layout de /exemples.
export default function PavillonBisLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Pavillon Bis"
      titres="outfit"
      texte="lora"
      couleurs={{
        fond: "#F4EFE6",
        encre: "#2F3B35",
        doux: "#57625B",
        accent: "#E3B04B",
        surAccent: "#2F3B35",
        accentTexte: "#A63F2A",
        carte: "#FBF7F0",
        trait: "#E0D6C4",
        sombre: "#2F3B35",
        surSombre: "#F4EFE6",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
