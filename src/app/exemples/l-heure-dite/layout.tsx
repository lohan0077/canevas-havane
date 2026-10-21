import Cadre from "../_kit/Cadre";
import EnTete, { BandeauRenov } from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais créer une entreprise de pompes à chaleur ».
// Premier écran inspiré du modèle « Book Hero » de MotionSites (un nom en didone, un
// éventail d'objets inclinés), transposé à une marque qui vend l'heure de l'appel. Le
// lien France Rénov' passe avant tout le reste. Le `noindex` vient du layout de /exemples.
export default function LHeureDiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="L'Heure Dite"
      titres="bodoni"
      texte="workSans"
      couleurs={{
        fond: "#F2E8D5",
        encre: "#1F3D2B",
        doux: "#4A5A4C",
        accent: "#C2703D",
        surAccent: "#1F3D2B",
        accentTexte: "#9A4F22",
        carte: "#FBF6EC",
        trait: "#DCCDB2",
        sombre: "#1F3D2B",
        surSombre: "#F2E8D5",
      }}
    >
      <BandeauRenov />
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
