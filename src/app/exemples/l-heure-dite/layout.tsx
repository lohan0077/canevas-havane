import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { BandeauRenov, Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de L'Heure Dite, installateur de pompes à chaleur et de panneaux solaires
// imaginaire, filmé dans les deux vidéos du métier « solaire-pac ». Version « carrée »
// (24/10/2026) : Bodoni Moda, la didone de la marque (le Didot de la vidéo), en graisse
// normale, et Inter pour lire. Papier crème et vert profond qui alternent ; l'orange du
// soleil de midi seulement pour le bouton principal et les mots en relief. Le lien France
// Rénov' passe avant tout le reste, sur chaque page. Le `noindex` vient du layout de
// /exemples.
export default function LHeureDiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="L'Heure Dite"
      titres="bodoni"
      texte="inter"
      couleurs={{
        fond: "#F2E8D5",
        encre: "#1F3D2B",
        doux: "#4A5A4C",
        accent: "#D98A4E",
        surAccent: "#10241A",
        accentTexte: "#9A4F22",
        carte: "#FBF6EC",
        trait: "#DCCDB2",
        sombre: "#18301F",
        surSombre: "#F2E8D5",
      }}
    >
      <BandeauRenov />
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION.filter((l) => !l.href.endsWith("/rendez-vous"))}
        action={{ href: `${DOSSIER}/rendez-vous`, libelle: "Choisir mon heure" }}
      />
      <div className="lining-nums">{children}</div>
      <Pied />
    </Cadre>
  );
}
