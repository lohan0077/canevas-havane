import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais créer une agence événementielle de
// zéro ». Mise en page inspirée du modèle « Playful Idea » de MotionSites (un fond
// pastel, de petits titres gras en bas de casse posés dans les coins, une grande forme
// douce au centre), transposée à une agence d'événements d'entreprise : le crème, le
// corail, le ciel et le café de la marque. Le `noindex` vient du layout de /exemples.
export default function LundiDApresLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Lundi d'Après"
      titres="outfit"
      texte="inter"
      couleurs={{
        fond: "#FFF4E6",
        encre: "#3B2416",
        doux: "#6B5040",
        accent: "#FF6B4A",
        surAccent: "#3B2416",
        accentTexte: "#B8381F",
        carte: "#FFFFFF",
        trait: "#EADBC6",
        sombre: "#3B2416",
        surSombre: "#FFF4E6",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
