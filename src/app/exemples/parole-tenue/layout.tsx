import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { variablePolice } from "../_kit/polices";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Parole Tenue, agence de voyage imaginaire filmée dans les deux vidéos des agences de
// voyage : elle ne vend que les voyages promis (« Créer une marque ») ; un seul bouton,
// « ferme tes onglets », trente minutes avec un conseiller, des budgets ligne par ligne
// (« Remplir l'agenda », ancien site Un Seul Onglet). Vert sapin, corail et crème ;
// Instrument Serif pour les titres, Work Sans pour lire, et les billets écrits à la main
// en Caveat. Toutes les pages s'ouvrent sur un écran sapin.
export default function ParoleTenueLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Parole Tenue"
      titres="instrument"
      texte="workSans"
      autres={["caveat"]}
      couleurs={{
        fond: "#FBF6EC",
        encre: "#1F3D36",
        doux: "#56655F",
        accent: "#F2A58E",
        surAccent: "#1F3D36",
        accentTexte: "#B4432A",
        carte: "#FFFFFF",
        trait: "#E4DACB",
        sombre: "#16302A",
        surSombre: "#FBF6EC",
      }}
    >
      <div style={{ "--manuscrit": `var(${variablePolice("caveat")})` } as React.CSSProperties}>
        <NavVerre
          accueil={DOSSIER}
          marque={<Marque />}
          liens={NAVIGATION}
          action={{ href: `${DOSSIER}#ferme`, libelle: "Ferme tes onglets" }}
          surSombre
        />
        {children}
        <Pied />
      </div>
    </Cadre>
  );
}
