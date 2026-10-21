import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit de Dimanche Libre : un lavande de dimanche matin, un corail pour « C'est
// cassé », un vert menthe pour « Je veux apprendre ». Bricolage Grotesque pour les
// titres, DM Sans pour le texte.
export default function DimancheLibreLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Dimanche Libre"
      titres="bricolage"
      texte="dmSans"
      couleurs={{
        fond: "#F3EFFA",
        encre: "#221B33",
        doux: "#564D6B",
        accent: "#FF7A59",
        surAccent: "#221B33",
        accentTexte: "#A8391B",
        carte: "#FFFFFF",
        trait: "#DDD5EC",
        sombre: "#2B2340",
        surSombre: "#F3EFFA",
      }}
    >
      <EnTete />
      {children}
      <PiedDuSite />
    </Cadre>
  );
}
