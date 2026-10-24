import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { CreneauEnBas, Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Bonne Nouvelle, cabinet de courtage en crédit immobilier fictif filmé dans les deux
// vidéos des courtiers (« Créer une marque » et « Remplir l'agenda », dont le site Mot
// pour Mot est fondu ici). Les couleurs de la marque : bleu nuit, vert, jaune, crème ;
// Fraunces pour les titres, Manrope pour lire. Chaque page s'ouvre sur la nuit (d'où
// `surSombre`), et finit par le créneau que le client choisit lui-même, puis par les
// mentions que la loi impose, lisibles.
export default function BonneNouvelleLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Bonne Nouvelle"
      titres="fraunces"
      texte="manrope"
      couleurs={{
        fond: "#FFF8EC",
        encre: "#1B2A41",
        doux: "#4F5B6D",
        accent: "#F2C14E",
        surAccent: "#1B2A41",
        accentTexte: "#2B7650",
        carte: "#FFFFFF",
        trait: "#EADFC9",
        sombre: "#1B2A41",
        surSombre: "#FFF8EC",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}#rendez-vous`, libelle: "Rendez-vous" }}
        surSombre
      />
      {/* La marge du menu flottant (kit) laisse une bande de 12 px : le contenu remonte d'autant. */}
      <div>{children}</div>
      <CreneauEnBas />
      <Pied />
    </Cadre>
  );
}
