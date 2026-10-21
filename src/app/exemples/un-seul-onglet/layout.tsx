import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDePage from "./_composants/PiedDePage";

// Un Seul Onglet : bleu ciel, blanc et bleu profond, titres en Newsreader. Premier
// écran inspiré du modèle « Northstar » de MotionSites (un grand titre à
// empattements posé sur le ciel, un seul bouton), transposé en navigateur : des
// onglets à fermer.
export default function UnSeulOngletLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Un Seul Onglet"
      titres="newsreader"
      texte="figtree"
      couleurs={{
        fond: "#EAF3FA",
        encre: "#0F2A43",
        doux: "#4A6175",
        accent: "#1F5FA8",
        surAccent: "#FFFFFF",
        accentTexte: "#1F5FA8",
        carte: "#FFFFFF",
        trait: "#C9DBEA",
        sombre: "#0F2A43",
        surSombre: "#EAF3FA",
      }}
    >
      <EnTete />
      {children}
      <PiedDePage />
    </Cadre>
  );
}
