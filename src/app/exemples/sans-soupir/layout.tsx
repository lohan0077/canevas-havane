import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { NomMarque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de Sans Soupir, l'informaticien à domicile des deux vidéos du dépannage
// informatique : la crème, l'ardoise et le jaune de la marque, le corail de la porte
// « C'est cassé » et le vert d'eau de « Je veux apprendre ». De gros caractères partout
// (le texte courant est en 18 px). Sora pour les titres, Figtree pour le texte.
export default function SansSoupirLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Sans Soupir"
      titres="sora"
      texte="figtree"
      couleurs={{
        fond: "#FDF6EC",
        encre: "#22323D",
        doux: "#4A5A66",
        accent: "#F6AE2D",
        surAccent: "#22323D",
        accentTexte: "#8A5A00",
        carte: "#FFFFFF",
        trait: "#EADFCC",
        sombre: "#2F4858",
        surSombre: "#FDF6EC",
      }}
    >
      <div className="text-[18px]">
        <NavVerre accueil={DOSSIER} marque={<NomMarque />} liens={NAVIGATION} action={{ href: `${DOSSIER}/fiches`, libelle: "Les fiches" }} />
        {children}
        <Pied />
      </div>
    </Cadre>
  );
}
