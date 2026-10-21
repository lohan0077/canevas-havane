import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Tiers Regard, diagnostiqueur immobilier fictif de la vidéo « Si je devais créer une
// entreprise de diagnostic immobilier de zéro ». La nuit, le jaune de la marque, des
// étiquettes techniques posées sur une vraie pièce : transposé du modèle « Alethia » de
// MotionSites (un objet annoté de petites étiquettes sur fond nuit, un grand titre),
// sans texte ni code repris. Le `noindex` vient du layout de /exemples.
export default function TiersRegardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Tiers Regard"
      titres="outfit"
      texte="spaceGrotesk"
      couleurs={{
        fond: "#0F141C",
        encre: "#F3F4F6",
        doux: "#B3BAC6",
        accent: "#F5D90A",
        surAccent: "#111827",
        accentTexte: "#F5D90A",
        carte: "#1A2130",
        trait: "#2A3344",
        sombre: "#070A10",
        surSombre: "#F3F4F6",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
