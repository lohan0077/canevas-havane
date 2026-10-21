import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'un
// traiteur ». Mise en page inspirée du modèle « Luxury Ecommerce Design » de
// MotionSites (titres en bas de casse, bouton en pilule, cartes hautes à l'intitulé
// couché le long du bord), transposée à un traiteur de mariage sur un fond d'ardoise.
// Le `noindex` vient du layout de /exemples.
export default function SilenceATableLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Silence à Table"
      titres="instrument"
      texte="figtree"
      couleurs={{
        fond: "#151918",
        encre: "#EFE9DF",
        doux: "#B5AEA2",
        accent: "#D6A06C",
        surAccent: "#151918",
        accentTexte: "#E2B07E",
        carte: "#1E2422",
        trait: "#3A4240",
        sombre: "#0D100F",
        surSombre: "#EFE9DF",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
