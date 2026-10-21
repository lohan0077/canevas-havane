import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { Pied } from "./_composants/Elements";

// Vue Cadrée, le paysagiste imaginé dans la vidéo « Si je devais remplir le carnet de
// chantiers d'un paysagiste » (qui l'appelle « Ton entreprise »). Le `noindex` vient
// du layout de /exemples.
export default function VueCadreeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Vue Cadrée"
      titres="zilla"
      texte="workSans"
      autres={["caveat"]}
      couleurs={{
        fond: "#F3F1EA",
        encre: "#1E2A22",
        doux: "#4F5B52",
        accent: "#2F5D3A",
        surAccent: "#FFFFFF",
        accentTexte: "#2F5D3A",
        carte: "#FFFFFF",
        trait: "#DAD6CA",
        sombre: "#1E2A22",
        surSombre: "#F3F1EA",
      }}
    >
      <EnTete />
      {children}
      <Pied />
    </Cadre>
  );
}
