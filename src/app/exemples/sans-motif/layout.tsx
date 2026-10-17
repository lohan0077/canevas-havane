import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDeSite from "./_composants/PiedDeSite";

// Le gabarit du site Sans Motif, cabinet de psychologue imaginé dans la vidéo « Si je
// devais remplir l'agenda d'un psychologue ». « Sans motif » : on vient sans avoir à
// dire pourquoi — et un tissu sans motif, c'est un tissu uni. D'où des aplats, pas un
// ornement. Les numéros d'urgence (15, 3114) sont en tête de chaque page.
export default function SansMotifLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Sans Motif"
      titres="sora"
      texte="inter"
      couleurs={{
        fond: "#EEF0F2",
        encre: "#1B2230",
        doux: "#525B6B",
        accent: "#3552C7",
        surAccent: "#FFFFFF",
        accentTexte: "#2F49B3",
        carte: "#FFFFFF",
        trait: "#D9DDE3",
        sombre: "#1B2230",
        surSombre: "#EEF0F2",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
