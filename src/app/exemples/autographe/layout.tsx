import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit du site Autographe, l'épicerie fine imaginaire des deux vidéos des
// épiceries fines. Bodoni Moda pour les titres (la Bodoni 72 de la marque), Newsreader
// pour lire, Caveat pour la carte écrite à la main. Papier, encre bleue, cachet rouge :
// une maison d'édition plus qu'une épicerie. Le `noindex` vient du layout de /exemples.
export default function AutographeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Autographe"
      titres="bodoni"
      texte="newsreader"
      autres={["caveat"]}
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
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}#composer`, libelle: "On apporte quoi\u00a0?" }}
      />
      {children}
      <Pied />
    </Cadre>
  );
}
