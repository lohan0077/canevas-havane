import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { Pied } from "./_composants/Elements";

// La Coulée, la savonnerie imaginée dans la vidéo « Si je devais remplir le carnet de
// commandes d'une savonnerie ». Le `noindex` vient du layout de /exemples.
export default function LaCouleeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="La Coulée"
      titres="spaceGrotesk"
      texte="newsreader"
      couleurs={{
        fond: "#EFE9DF",
        encre: "#2B2A33",
        doux: "#5E5A6B",
        accent: "#5B4B8A",
        surAccent: "#FFFFFF",
        accentTexte: "#5B4B8A",
        carte: "#F8F5EF",
        trait: "#DCD4C6",
        sombre: "#2B2A33",
        surSombre: "#EFE9DF",
      }}
    >
      <EnTete />
      {children}
      <Pied />
    </Cadre>
  );
}
