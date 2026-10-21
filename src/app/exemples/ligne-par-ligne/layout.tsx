import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import { PiedDeSite } from "./_composants/Blocs";

// Ligne par Ligne, cabinet de conseil en gestion de patrimoine fictif de la vidéo « Si je
// devais remplir l'agenda d'un conseiller en gestion de patrimoine ». Vert forêt et papier
// ; mise en page transposée du modèle « Evergreen Finance » de MotionSites (grand titre à
// empattements centré sur fond clair, un paysage qui s'y fond, des cartes blanches qui en
// chevauchent le bas, puis des cartes sombres), sans texte ni code repris : ici, la carte
// est un ticket de caisse. Le `noindex` vient du layout de /exemples.
export default function LigneParLigneLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Ligne par Ligne"
      titres="newsreader"
      texte="figtree"
      couleurs={{
        fond: "#F4F2EA",
        encre: "#17251E",
        doux: "#4C5A52",
        accent: "#24443A",
        surAccent: "#F4F2EA",
        accentTexte: "#2B6249",
        carte: "#FFFFFF",
        trait: "#DAD5C6",
        sombre: "#1B3329",
        surSombre: "#F4F2EA",
      }}
    >
      <EnTete />
      {children}
      <PiedDeSite />
    </Cadre>
  );
}
