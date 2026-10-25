import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Vert en Août, le paysagiste imaginé dans les deux vidéos des paysagistes : le
// jardin qui tient en août. Polices : Figtree (la cousine libre de l'Avenir Next de la
// marque) pour les titres, Lora pour lire — un carnet de jardinier —, et Caveat pour
// les notes au crayon du croquis. Couleurs de la marque : le vert profond, la paille,
// la terre cuite, la sauge, sur un fond de lin. Chaque page s'ouvre sur un écran
// sombre : l'en-tête flottant y est clair. Le `noindex` vient du layout de /exemples.
export default function VertEnAoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Vert en Août"
      titres="figtree"
      texte="lora"
      autres={["caveat"]}
      couleurs={{
        fond: "#EFE8D8",
        encre: "#2F4A2C",
        doux: "#55573F",
        accent: "#E0B85C",
        surAccent: "#22341F",
        accentTexte: "#84432C",
        carte: "#F8F4EA",
        trait: "#DCD2BC",
        sombre: "#22341F",
        surSombre: "#EFE8D8",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}#photos`, libelle: "Trois photos" }}
        surSombre
      />
      {/* Les blocs qui entrent par le côté ne doivent pas élargir la page sur téléphone. */}
      <div className="overflow-x-clip">{children}</div>
      <Pied />
    </Cadre>
  );
}
