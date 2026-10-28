import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Premier Trajet : polices et couleurs (Cadre du kit), la barre de
// navigation en pilules, et le pied qui porte les mentions de l'arrêté du 19 juin
// 1987 (nom, adresse, agrément). Le `noindex` vient du layout de /exemples.
export default function PremierTrajetLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Premier Trajet"
      titres="archivo"
      texte="inter"
      couleurs={{
        fond: "#F1F1EC",
        encre: "#15191C",
        doux: "#4D565C",
        accent: "#F5B400",
        surAccent: "#15191C",
        accentTexte: "#8A5A00",
        carte: "#FFFFFF",
        trait: "#D9DCD5",
        sombre: "#15191C",
        surSombre: "#F1F1EC",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
