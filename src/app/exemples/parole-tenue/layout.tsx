import Cadre from "../_kit/Cadre";
import { variablePolice } from "../_kit/polices";
import EnTete from "./_composants/EnTete";
import PiedDePage from "./_composants/PiedDePage";

// Parole Tenue : vert sapin, sable, corail et crème, titres en Playfair, billets
// écrits à la main en Caveat. Premier écran inspiré du modèle « Vintage Care » de
// MotionSites (un grand titre centré à empattements, une image au milieu, de courts
// textes de part et d'autre), transposé en carte d'embarquement.
export default function ParoleTenueLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Parole Tenue"
      titres="playfair"
      texte="workSans"
      autres={["caveat"]}
      couleurs={{
        fond: "#FBF6EC",
        encre: "#1F3D36",
        doux: "#56655F",
        accent: "#1F3D36",
        surAccent: "#FBF6EC",
        accentTexte: "#B4432A",
        carte: "#FFFFFF",
        trait: "#E4D8C0",
        sombre: "#1F3D36",
        surSombre: "#FBF6EC",
      }}
    >
      <div style={{ "--manuscrit": `var(${variablePolice("caveat")})` } as React.CSSProperties}>
        <EnTete />
        {children}
        <PiedDePage />
      </div>
    </Cadre>
  );
}
