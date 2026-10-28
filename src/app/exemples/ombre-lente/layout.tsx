import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit d'Ombre Lente, la pépinière imaginaire des deux vidéos des jardineries.
// Polices : Instrument Serif (un romain fin et son italique, à la place de l'Optima de
// la marque) et Manrope pour lire. Couleurs : la nuit verte d'un sous-bois, l'or d'une
// fin de journée, la crème. Chaque page s'ouvre sur un écran sombre.
export default function OmbreLenteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Ombre Lente"
      titres="instrument"
      texte="manrope"
      couleurs={{
        fond: "#F4EFE2",
        encre: "#1B3326",
        doux: "#4E5E4F",
        accent: "#D9A441",
        surAccent: "#16291F",
        accentTexte: "#45602F",
        carte: "#FFFDF7",
        trait: "#E2DACB",
        sombre: "#16291F",
        surSombre: "#F4EFE2",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/arbres`, libelle: "Choisir mon arbre" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
