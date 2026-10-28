import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import BandeauDelai from "./_composants/BandeauDelai";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de Rien à Signaler, installateur d'alarmes et de climatisation imaginaire,
// filmé dans les deux vidéos du métier. Sora pour les titres (la cousine libre de la
// Futura de la marque), Manrope pour lire, et l'italique d'Instrument Serif pour les mots
// qui comptent. Bleu nuit, crème, sauge ; le pêche du soir d'été pour le délai de pose,
// affiché tout en haut de chaque page.
export default function RienASignalerLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Rien à Signaler"
      titres="sora"
      texte="manrope"
      autres={["instrument"]}
      couleurs={{
        fond: "#F3EEE4",
        encre: "#14213D",
        doux: "#4A5269",
        accent: "#7FB685",
        surAccent: "#14213D",
        accentTexte: "#2E6B45",
        carte: "#FBF8F2",
        trait: "#DFD6C5",
        sombre: "#101A31",
        surSombre: "#F3EEE4",
      }}
    >
      <BandeauDelai />
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/ma-date`, libelle: "Ma date de pose" }}
      />
      {/* L'en-tête flottant garde sa marge de 12 px dans le flux : on la rattrape, pour que la
          nuit du premier écran touche le bandeau du délai. */}
      <div>{children}</div>
      <Pied />
    </Cadre>
  );
}
