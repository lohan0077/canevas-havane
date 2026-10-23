import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { BarreDuDelai, Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Premier Billet, cabinet d'expertise comptable fictif filmé dans les deux vidéos des
// experts-comptables (« Créer une marque » et « Remplir l'agenda », dont le site Heure
// Claire est fondu ici). Gravure de billet : crème, vert profond et or, Bodoni Moda pour
// les titres, DM Sans pour lire, Caveat pour le mot écrit à la main. Vouvoiement et
// retenue (décret n° 2012-432, art. 152). En haut de chaque page, avant tout le reste,
// le chiffre du mois : le délai de réponse.
export default function PremierBilletLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Premier Billet"
      titres="bodoni"
      texte="dmSans"
      autres={["caveat"]}
      couleurs={{
        fond: "#F3EBD8",
        encre: "#17302A",
        doux: "#4E5E55",
        accent: "#C9A227",
        surAccent: "#17302A",
        accentTexte: "#7A5C0C",
        carte: "#FBF6EA",
        trait: "#DCCFB0",
        sombre: "#17302A",
        surSombre: "#F3EBD8",
      }}
    >
      <BarreDuDelai />
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" }}
      />
      {/* La marge du menu flottant (kit) laisse une bande de 12 px : le contenu remonte d'autant. */}
      <div>{children}</div>
      <Pied />
    </Cadre>
  );
}
