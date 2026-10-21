import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit d'Après Nous : le lin pour le papier, le noyer pour l'encre et les bandes
// sombres, le chêne pour l'accent — la palette de la vidéo. Bodoni Moda pour les
// titres (le Big Caslon de la vidéo, en plus contrasté), Figtree pour le texte, et
// Caveat pour les lignes qu'on écrit soi-même dans le registre.
export default function ApresNousLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Après Nous"
      titres="bodoni"
      texte="figtree"
      autres={["caveat"]}
      couleurs={{
        fond: "#F3EDE2",
        encre: "#3B2416",
        doux: "#5F4C3B",
        accent: "#C8955A",
        surAccent: "#2A190E",
        accentTexte: "#7A5226",
        carte: "#FAF6EE",
        trait: "#D8CCB9",
        sombre: "#3B2416",
        surSombre: "#F3EDE2",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
