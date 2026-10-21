import Cadre from "../_kit/Cadre";
import EnTete, { BandeauRenov } from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de chantiers d'un
// installateur solaire ». Le lien France Rénov' passe avant tout le reste, juste sous
// le bandeau de démonstration. Premier écran inspiré du modèle « Solar Energy Hero »
// de MotionSites, transposé en plein jour. Le `noindex` vient du layout de /exemples.
export default function MidiPileLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Midi Pile"
      titres="outfit"
      texte="dmSans"
      couleurs={{
        fond: "#FFF8EC",
        encre: "#1A2030",
        doux: "#545B6B",
        accent: "#F4B400",
        surAccent: "#1A2030",
        accentTexte: "#8A5300",
        carte: "#FFFFFF",
        trait: "#EADCC2",
        sombre: "#13213A",
        surSombre: "#FFF4DB",
      }}
    >
      <BandeauRenov />
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
