import Cadre from "../_kit/Cadre";
import BandeauDelai from "./_composants/BandeauDelai";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Nuit d'Août : la nuit d'été. Bleu nuit, ciel du soir, une touche de
// pêche pour le délai de pose, affiché tout en haut de chaque page. Sora pour les
// titres, Inter pour le texte. Mise en page inspirée du modèle « Mindful Companion »
// de MotionSites — un dégradé de ciel, un grand titre doux, des colonnes —, transposée
// à un installateur de climatisation.
export default function NuitDAoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Nuit d'Août"
      titres="sora"
      texte="inter"
      couleurs={{
        fond: "#F3F5FA",
        encre: "#0F1B33",
        doux: "#4A5672",
        accent: "#3A57B0",
        surAccent: "#FFFFFF",
        accentTexte: "#3149A0",
        carte: "#FFFFFF",
        trait: "#DCE2EE",
        sombre: "#0F1B33",
        surSombre: "#F3F5FA",
      }}
    >
      <BandeauDelai />
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
