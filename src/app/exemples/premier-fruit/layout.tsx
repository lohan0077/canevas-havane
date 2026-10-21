import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import Pied from "./_composants/Pied";

// Premier Fruit, la pépinière imaginée dans la vidéo « Si je devais remplir le carnet
// de commandes d'une jardinerie ». Le `noindex` vient du layout de /exemples.
export default function PremierFruitLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Premier Fruit"
      titres="dmSerif"
      texte="figtree"
      couleurs={{
        fond: "#F8F1E6",
        encre: "#2A1A14",
        doux: "#6B5446",
        accent: "#B3202E",
        surAccent: "#FFFFFF",
        accentTexte: "#A11D2A",
        carte: "#FFFBF4",
        trait: "#E6D6C1",
        sombre: "#2E1A16",
        surSombre: "#F8EDE0",
      }}
    >
      <EnTete />
      {children}
      <Pied />
    </Cadre>
  );
}
