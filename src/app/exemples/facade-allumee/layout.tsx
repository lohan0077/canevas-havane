import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Façade Allumée : la rue la nuit (bleu nuit de la vidéo), l'ambre
// d'une enseigne allumée, Bodoni Moda pour les titres (le Didot des lettres de la
// vidéo) et Archivo pour le texte. Mise en page transposée du modèle « Menuchi »
// de MotionSites : fond noir, un objet qui brille au centre, le nom en très grand.
export default function FacadeAllumeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Façade Allumée"
      titres="bodoni"
      texte="archivo"
      couleurs={{
        fond: "#0E1424",
        encre: "#F4F1EA",
        doux: "#AEB4C6",
        accent: "#F2B544",
        surAccent: "#0E1424",
        accentTexte: "#F5C76A",
        carte: "#161D33",
        trait: "#2A3350",
        sombre: "#070A14",
        surSombre: "#F4F1EA",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
