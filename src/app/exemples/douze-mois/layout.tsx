import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";

// Le site de la boutique imaginée dans la vidéo « Si je devais créer une boutique de
// fleurs » : le calendrier des fleurs, mois par mois. Ambiance transposée du modèle
// « Neo Museum » de MotionSites : un nom immense en travers de la page, des légendes
// en petites capitales, des planches de spécimens et leurs repères.
export default function DouzeMoisLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Douze Mois"
      titres="bodoni"
      texte="spaceGrotesk"
      couleurs={{
        fond: "#F4EFE8",
        encre: "#2E1620",
        doux: "#6B4A55",
        accent: "#5A2A3A",
        surAccent: "#FBF5EE",
        accentTexte: "#5A2A3A",
        carte: "#FFFFFF",
        trait: "#DDD0C6",
        sombre: "#2E1620",
        surSombre: "#FBF5EE",
      }}
    >
      <EnTete />
      {children}
    </Cadre>
  );
}
