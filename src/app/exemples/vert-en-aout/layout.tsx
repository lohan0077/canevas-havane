import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { Pied } from "./_composants/Elements";

// Vert en Août, l'entreprise de paysage imaginée dans la vidéo « Si je devais créer
// une entreprise de paysagiste de zéro ». Le `noindex` vient du layout de /exemples.
export default function VertEnAoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Vert en Août"
      titres="unbounded"
      texte="dmSans"
      couleurs={{
        fond: "#EFE8D8",
        encre: "#2F4A2C",
        doux: "#55573F",
        accent: "#2F4A2C",
        surAccent: "#EFE8D8",
        accentTexte: "#84432C",
        carte: "#F8F4EA",
        trait: "#DCD2BC",
        sombre: "#24361F",
        surSombre: "#EFE8D8",
      }}
    >
      <EnTete />
      {children}
      <Pied />
    </Cadre>
  );
}
