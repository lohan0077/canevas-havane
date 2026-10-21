import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais créer une maison de traiteur de zéro ».
// Mise en page inspirée du modèle « Book Hero » de MotionSites (un nom immense au
// centre, des volumes en éventail dessous, des pastilles de catégories), transposée à
// des fiches de recettes de famille, sur un papier de cahier. Le `noindex` vient du
// layout de /exemples.
export default function TransmisLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Transmis"
      titres="playfair"
      texte="workSans"
      autres={["caveat"]}
      couleurs={{
        fond: "#FBF6EC",
        encre: "#1F3B2D",
        doux: "#4E5F54",
        accent: "#C8452F",
        surAccent: "#FFFFFF",
        accentTexte: "#B23B26",
        carte: "#FFFFFF",
        trait: "#E3D9C6",
        sombre: "#1F3B2D",
        surSombre: "#FBF6EC",
      }}
    >
      {/* Playfair a des chiffres « bas de casse » : partout ici, on les veut alignés. */}
      <div className="[font-variant-numeric:lining-nums]">
        <EnTete />
        {children}
        <PiedDeSite />
      </div>
    </Cadre>
  );
}
