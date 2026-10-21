import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Ton dépôt : un tableau de bord d'atelier, sur fond graphite, le rouge
// du bouton d'urgence pour l'accent, le vert et l'ambre du stock. Bricolage Grotesque
// pour les titres (des lettres d'outil, un peu brutes), Inter pour le texte et les
// références.
export default function TonDepotLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Ton dépôt"
      titres="bricolage"
      texte="inter"
      couleurs={{
        fond: "#111418",
        encre: "#E8EBEE",
        doux: "#A3ABB5",
        accent: "#C93A2D",
        surAccent: "#FFFFFF",
        accentTexte: "#FF8A7D",
        carte: "#1A1F25",
        trait: "#2C333B",
        sombre: "#0A0C0F",
        surSombre: "#E8EBEE",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
