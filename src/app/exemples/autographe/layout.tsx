import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit du site Autographe : Bodoni Moda pour les titres, Newsreader pour le
// texte — une maison d'édition plus qu'une épicerie. Papier, encre bleue, cachet
// rouge. Le `noindex` vient du layout de /exemples.
export default function AutographeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Autographe"
      titres="bodoni"
      texte="newsreader"
      couleurs={{
        fond: "#F6EFE3",
        encre: "#1E2A4A",
        doux: "#56607A",
        accent: "#B43A2E",
        surAccent: "#FBF7EF",
        accentTexte: "#A23327",
        carte: "#FFFCF6",
        trait: "#DCCFB8",
        sombre: "#1E2A4A",
        surSombre: "#F6EFE3",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
