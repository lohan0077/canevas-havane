import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit d'Emprunté : l'écru pour le fond, le marine pour l'encre, la rouille pour
// l'accent — la palette de la vidéo. Sora, géométrique et ronde (le Futura de la
// vidéo), pour les titres ; Manrope pour le texte ; Caveat pour le prénom brodé et les
// légendes du mur, écrites à la main.
export default function EmprunteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Emprunté"
      titres="sora"
      texte="manrope"
      autres={["caveat"]}
      couleurs={{
        fond: "#F2EBDD",
        encre: "#1E2A44",
        doux: "#4A5368",
        accent: "#B5532E",
        surAccent: "#FFFFFF",
        accentTexte: "#9A4423",
        carte: "#FBF7EF",
        trait: "#DCD2C1",
        sombre: "#1E2A44",
        surSombre: "#F2EBDD",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
