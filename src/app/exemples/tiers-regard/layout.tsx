import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Tiers Regard, diagnostiqueur immobilier fictif : le site des deux vidéos des
// diagnostiqueurs (« Créer une marque » et « Remplir l'agenda », qui imaginait « De A à
// G », fondu ici). La nuit, le jaune de la marque, et l'échelle de A à G pour seule
// autre couleur. Polices : Sora pour les titres, Space Grotesk pour lire — un ton de
// rapport technique. Toutes les pages s'ouvrent sur un écran sombre : `surSombre`.
export default function TiersRegardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Tiers Regard"
      titres="sora"
      texte="spaceGrotesk"
      couleurs={{
        fond: "#0F141C",
        encre: "#F3F4F6",
        doux: "#B3BAC6",
        accent: "#F5D90A",
        surAccent: "#111827",
        accentTexte: "#F5D90A",
        carte: "#171E2A",
        trait: "#2A3344",
        sombre: "#070A10",
        surSombre: "#F3F4F6",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
