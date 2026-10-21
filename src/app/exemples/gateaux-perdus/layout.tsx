import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";

// Le site de la pâtisserie imaginée dans la vidéo « Si je devais créer une pâtisserie » :
// un seul bouton, « envoie-nous la photo de sa recette ». Ambiance transposée du modèle
// « Vintage Care » de MotionSites : page claire, grand titre de caractère centré, un
// objet au milieu et des annotations autour, une pilule de navigation.
export default function GateauxPerdusLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Gâteaux Perdus"
      titres="dmSerif"
      texte="lora"
      autres={["caveat"]}
      couleurs={{
        fond: "#FFF8EC",
        encre: "#3D1D13",
        doux: "#6E4636",
        accent: "#5B2C1E",
        surAccent: "#FFF8EC",
        accentTexte: "#8E3B22",
        carte: "#FFFDF7",
        trait: "#EAD9C4",
        sombre: "#3D1D13",
        surSombre: "#FFF8EC",
      }}
    >
      <EnTete />
      {children}
    </Cadre>
  );
}
