import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit du site Le Pourquoi, cabinet d'ostéopathie imaginaire filmé dans les deux
// vidéos des ostéopathes. Identité du 30/10/2026 : le bleu de nuit d'un studio photo,
// la porcelaine d'un cabinet net, et le bois clair du mannequin du premier écran comme
// seule chaleur. Newsreader pour les titres (son italique fait la mise en relief,
// et la voix du patient), Manrope pour lire. Le bleu outremer ne sert qu'au bouton
// principal et à de petits détails ; sur fond sombre, il cède la place à la pervenche.
// Chaque page s'ouvre sur un écran sombre : l'en-tête flottant y est clair.
export default function LePourquoiLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Le Pourquoi"
      titres="newsreader"
      texte="manrope"
      couleurs={{
        fond: "#F4F5FA",
        encre: "#0B1038",
        doux: "#4A5274",
        accent: "#3446F5",
        surAccent: "#FFFFFF",
        accentTexte: "#2F3FDB",
        carte: "#FFFFFF",
        trait: "#DADDEB",
        sombre: "#0B1038",
        surSombre: "#F4F5FA",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" }}
        surSombre
      />
      <div className="overflow-x-clip">{children}</div>
      <Pied />
    </Cadre>
  );
}
