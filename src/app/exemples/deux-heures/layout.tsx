import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de réservations d'un
// DJ ». Mise en page inspirée du modèle « DJ ZakDerdan » de MotionSites (un nom immense
// en deux graisses, des étiquettes techniques entre crochets, des pilules blanches, des
// traînées de lumière chaude sur le noir), transposée à un DJ de mariage. Le `noindex`
// vient du layout de /exemples.
export default function DeuxHeuresLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Deux Heures"
      titres="unbounded"
      texte="manrope"
      couleurs={{
        fond: "#0E0B0A",
        encre: "#F4EEE8",
        doux: "#BDB2A7",
        accent: "#FF7A2F",
        surAccent: "#0E0B0A",
        accentTexte: "#FF9A5C",
        carte: "#1A1513",
        trait: "#3A302B",
        sombre: "#070505",
        surSombre: "#F4EEE8",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
