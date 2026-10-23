import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import BarreMobile from "./_composants/BarreMobile";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit du site Neuf Étés, la marque de piscines imaginée dans les deux vidéos
// des piscinistes. Polices : Arvo (l'égyptienne franche qui tient le rôle du Rockwell
// de la marque) pour les titres, DM Sans pour lire. Couleurs de la marque : le bleu
// profond, le bleu d'eau, le jaune soleil et la crème.
//
// Chaque page s'ouvre sur un écran sombre (la vidéo de l'accueil, la photo des pages
// intérieures) : l'en-tête flottant y est clair. Sur téléphone, la barre d'action du
// bas garde « Appeler » et « Ma date » sous le pouce ; le fond sombre qui l'entoure
// laisse voir la fin du pied de page au-dessus d'elle.
export default function NeufEtesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0D3446] pb-[76px] lg:pb-0">
      <Cadre
        entreprise="Neuf Étés"
        titres="arvo"
        texte="dmSans"
        couleurs={{
          fond: "#FFF8EC",
          encre: "#12445A",
          doux: "#46677A",
          accent: "#F6C445",
          surAccent: "#12445A",
          accentTexte: "#0E6582",
          carte: "#FFFFFF",
          trait: "#E8DCC4",
          sombre: "#0D3446",
          surSombre: "#FFF8EC",
        }}
      >
        <NavVerre
          accueil={DOSSIER}
          marque={<Marque />}
          liens={NAVIGATION}
          action={{ href: `${DOSSIER}/ma-date`, libelle: "Ma date" }}
          surSombre
        />
        {/* Les blocs qui entrent par le côté ne doivent pas élargir la page sur
            téléphone : `clip` coupe sans créer de zone de défilement (le récit
            collé continue de coller). */}
        <div className="overflow-x-clip">{children}</div>
        <Pied />
        <BarreMobile />
      </Cadre>
    </div>
  );
}
