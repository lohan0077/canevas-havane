import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'un coach ». Mise en
// page inspirée du modèle « Mindora » de MotionSites (panneau clair aux grands rayons
// posé sur un fond doux, barre en pilule, cartes en mosaïque), transposée à un cabinet
// de coaching qui ne promet rien. Le `noindex` vient du layout de /exemples.
export default function FranchementLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Franchement"
      titres="bricolage"
      texte="inter"
      couleurs={{
        fond: "#E9EDE4",
        encre: "#17251C",
        doux: "#4A5A4E",
        accent: "#2F5D45",
        surAccent: "#FFFFFF",
        accentTexte: "#2F5D45",
        carte: "#FFFFFF",
        trait: "#CBD5C6",
        sombre: "#17251C",
        surSombre: "#E9EDE4",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
