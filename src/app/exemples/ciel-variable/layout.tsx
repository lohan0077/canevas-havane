import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";

// Le site de la ferme imaginée dans la vidéo « Si je devais créer une ferme » : pas de
// catalogue, le bulletin météo de la semaine et le panier qui va avec. Ambiance
// transposée du modèle « Vectrus Energy » de MotionSites : paysage dans la brume,
// grands titres en capitales fines, libellés espacés, beaucoup d'air.
export default function CielVariableLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Ciel Variable"
      titres="sora"
      texte="newsreader"
      couleurs={{
        fond: "#EEF3F5",
        encre: "#1C2E3A",
        doux: "#4A5E6B",
        accent: "#2F4858",
        surAccent: "#F3F6F4",
        accentTexte: "#2F4858",
        carte: "#FFFFFF",
        trait: "#C9D5DC",
        sombre: "#1C2E3A",
        surSombre: "#EEF3F5",
      }}
    >
      <EnTete />
      {children}
    </Cadre>
  );
}
