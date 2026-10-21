import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit du site On Apporte Quoi : Fraunces pour les titres, Figtree pour le
// texte, Caveat pour le petit mot écrit à la main. Papier crème, olive, kraft.
// Le `noindex` vient du layout de /exemples.
export default function OnApporteQuoiLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="On Apporte Quoi"
      titres="fraunces"
      texte="figtree"
      autres={["caveat"]}
      couleurs={{
        fond: "#F7F1E6",
        encre: "#2A2118",
        doux: "#6A5B4B",
        accent: "#5E6B2E",
        surAccent: "#FBF6EC",
        accentTexte: "#4C5724",
        carte: "#FFFDF8",
        trait: "#E3D8C4",
        sombre: "#33391A",
        surSombre: "#F7F1E6",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
