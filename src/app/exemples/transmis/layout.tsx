import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le site de Transmis, maison de traiteur imaginaire, filmé dans les deux vidéos des
// traiteurs. L'identité (30/10/2026) : l'aubergine et le cuivre, la porcelaine pour lire.
// L'aubergine presque noire des premiers écrans fait briller les plats ; le cuivre, celui
// des casseroles, est réservé au bouton principal et aux petits détails ; la porcelaine
// (un blanc à peine rosé, pas une crème) porte la lecture. DM Serif Display pour les
// titres, un serif de livre de recettes aux terminaisons rondes, et son italique pour les
// noms de plats ; Outfit pour lire ; l'encre bleue de Caveat seulement dans les cahiers
// et les carnets.
// Chaque page s'ouvre sur un écran sombre : l'en-tête flottant y est clair.
export default function TransmisLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      calme
      entreprise="Transmis"
      titres="dmSerif"
      texte="outfit"
      autres={["caveat"]}
      couleurs={{
        fond: "#F4F0EF",
        encre: "#24131E",
        doux: "#5F4C58",
        accent: "#C77A45",
        surAccent: "#1F1019",
        accentTexte: "#9A4A1F",
        carte: "#FFFFFF",
        trait: "#E3D8DB",
        sombre: "#1F1019",
        surSombre: "#F4F0EF",
      }}
    >
      {/* Des chiffres alignés partout, pour les prix comme pour les années. */}
      <div className="[font-variant-numeric:lining-nums]">
        <NavVerre
          accueil={DOSSIER}
          marque={<Marque />}
          liens={NAVIGATION}
          action={{ href: `${DOSSIER}/degustation`, libelle: "Venir goûter" }}
          surSombre
        />
        <div className="overflow-x-clip">{children}</div>
        <Pied />
      </div>
    </Cadre>
  );
}
