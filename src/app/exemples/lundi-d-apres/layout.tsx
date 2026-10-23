import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import SamedisLibres from "./_composants/SamedisLibres";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le site de Lundi d'Après, agence d'événements imaginaire (soirées d'entreprise et
// mariages, DJ compris), filmé dans les deux vidéos de l'événementiel. Le crème, le corail,
// le ciel et le café de la marque ; Bricolage Grotesque en bas de casse, gras et serré,
// pour les titres (la Futura de la marque, en plus joueuse), Inter pour lire. Sur chaque
// page, avant le pied, les samedis encore libres. Le `noindex` vient du layout de /exemples.
export default function LundiDApresLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Lundi d'Après"
      titres="bricolage"
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
      {children}
      <SamedisLibres />
      <Pied />
    </Cadre>
  );
}
