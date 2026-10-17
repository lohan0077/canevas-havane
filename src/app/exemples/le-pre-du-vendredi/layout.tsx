import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";

// Le site de la ferme imaginée dans la vidéo « Si je devais remplir le carnet de
// commandes d'un producteur » : une découpe par mois, sa date, et les colis qui
// restent. Ambiance transposée du modèle « Acreage Farming » de MotionSites : nuit
// de pré, photo plein cadre, titres en romain et italique, filets fins.
export default function LePreDuVendrediLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Le Pré du Vendredi"
      titres="instrument"
      texte="archivo"
      couleurs={{
        fond: "#11160F",
        encre: "#F1EADB",
        doux: "#BDB6A3",
        accent: "#E3B45C",
        surAccent: "#1A1408",
        accentTexte: "#E3B45C",
        carte: "#1B2218",
        trait: "#34402F",
        sombre: "#0A0D09",
        surSombre: "#E9E2D0",
      }}
    >
      <EnTete />
      {children}
    </Cadre>
  );
}
