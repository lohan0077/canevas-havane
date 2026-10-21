import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Reviens. : la palette de la vidéo — anthracite, sable, brique — sur un
// blanc de plâtre. Outfit, géométrique (le Futura de la vidéo), pour les titres et les
// gravures ; Work Sans pour le texte.
export default function ReviensLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Reviens."
      titres="outfit"
      texte="workSans"
      couleurs={{
        fond: "#F2EEE6",
        encre: "#2A3A47",
        doux: "#56616B",
        accent: "#B34A34",
        surAccent: "#FFFFFF",
        accentTexte: "#A8432E",
        carte: "#FAF7F1",
        trait: "#D9D0BF",
        sombre: "#2A3A47",
        surSombre: "#F2EEE6",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
