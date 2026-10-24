import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { NomMarque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de Veilleuse, la société de sécurité privée des deux vidéos de la
// sécurité : le vert nuit, le jaune d'une lampe, la crème des draps. DM Serif Display
// pour les titres (la douceur de l'Optima de la vidéo), Manrope pour le texte. Chaque
// page s'ouvre sur la nuit ; le pied de chaque page porte les mentions du CNAPS
// (CSI, art. L612-15).
export default function VeilleuseLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Veilleuse"
      titres="dmSerif"
      texte="manrope"
      couleurs={{
        fond: "#F6EFE3",
        encre: "#1F2B25",
        doux: "#4E5B53",
        accent: "#F4C95D",
        surAccent: "#23382F",
        accentTexte: "#8A4A33",
        carte: "#FFFBF4",
        trait: "#E4D9C6",
        sombre: "#1A2B24",
        surSombre: "#F6EFE3",
      }}
    >
      <NavVerre accueil={DOSSIER} marque={<NomMarque />} liens={NAVIGATION} action={{ href: `${DOSSIER}/devis`, libelle: "Devis" }} surSombre />
      {children}
      <Pied />
    </Cadre>
  );
}
