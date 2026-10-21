import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Relue : Instrument Serif pour les titres (le Didot de la marque, en
// plus souple), DM Sans pour le texte. Papier crème, encre bleu nuit, rouge cachet.
// Mise en page inspirée du modèle « Editorial Collection CTA » de MotionSites — grand
// titre romain et italique, beaucoup d'air, l'objet posé à côté —, transposée à une
// papeterie.
export default function RelueLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Relue"
      titres="instrument"
      texte="dmSans"
      couleurs={{
        fond: "#FBF6EC",
        encre: "#1E2B4A",
        doux: "#585F70",
        accent: "#B5452F",
        surAccent: "#FFFFFF",
        accentTexte: "#A13D29",
        carte: "#FFFDF8",
        trait: "#E6DCC8",
        sombre: "#1E2B4A",
        surSombre: "#FBF6EC",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
