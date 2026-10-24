import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import SamedisLibres from "./_composants/SamedisLibres";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le site de Lundi d'Après, agence d'événements imaginaire (soirées d'entreprise et
// mariages, DJ compris), filmé dans les deux vidéos de l'événementiel. Version « carrée »
// (24/10/2026) : DM Sans en graisse normale et en bas de casse pour les titres, son italique
// pour le mot en relief (la Futura de la marque, en plus douce), Inter pour lire ; le crème et le café de la
// marque alternent, le corail est réservé au bouton principal et aux petits détails.
// Chaque page se termine sur les samedis encore libres (« sur chaque page »).
export default function LundiDApresLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Lundi d'Après"
      titres="dmSans"
      texte="inter"
      couleurs={{
        fond: "#FFF4E6",
        encre: "#3B2416",
        doux: "#6B5040",
        accent: "#FF6B4A",
        surAccent: "#2A190F",
        accentTexte: "#B8381F",
        carte: "#FFFFFF",
        trait: "#EADBC6",
        sombre: "#2A190F",
        surSombre: "#FFF4E6",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/samedis-libres`, libelle: "Samedis libres" }}
        surSombre
      />
      <div className="overflow-x-clip">{children}</div>
      <SamedisLibres />
      <Pied />
    </Cadre>
  );
}
