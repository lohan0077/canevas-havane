import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais créer une entreprise de nettoyage ».
// Mise en page inspirée du modèle « Luxury Botanical » de MotionSites (fond sombre, grand
// titre à empattements fin, filets dorés, beaucoup d'air), transposée à des bureaux la
// nuit. Le `noindex` vient du layout de /exemples.
export default function ApresVousLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Après Vous"
      titres="instrument"
      texte="manrope"
      couleurs={{
        fond: "#121C33",
        encre: "#F5F1E8",
        doux: "#B9C0CF",
        accent: "#E9B44C",
        surAccent: "#121C33",
        accentTexte: "#E9B44C",
        carte: "#1B2A4A",
        trait: "#2E3D5E",
        sombre: "#0B1222",
        surSombre: "#F5F1E8",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
