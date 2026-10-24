import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { BarreStatut, Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Dimanche Midi, cabinet de gestion de patrimoine fictif filmé dans les deux vidéos des
// CGP (« Créer une marque » et « Remplir l'agenda », dont le site Ligne par Ligne est
// fondu ici). Les couleurs de la marque : vert, terre cuite, moutarde, crème. Instrument
// Serif pour les titres, Figtree pour lire, Caveat pour l'écriture du carnet. En haut de
// chaque page, avant la navigation : le statut, écrit juste.
export default function DimancheMidiLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Dimanche Midi"
      titres="instrument"
      texte="figtree"
      autres={["caveat"]}
      couleurs={{
        fond: "#FBF5EA",
        encre: "#22382C",
        doux: "#55604F",
        accent: "#A94A33",
        surAccent: "#FBF5EA",
        accentTexte: "#A3442E",
        carte: "#FFFDF8",
        trait: "#E6DCC6",
        sombre: "#2F4A3A",
        surSombre: "#FBF5EA",
      }}
    >
      <BarreStatut />
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}#rendez-vous`, libelle: "Rendez-vous" }}
      />
      {/* La marge du menu flottant (kit) laisse une bande de 12 px : le contenu remonte d'autant. */}
      <div>{children}</div>
      <Pied />
    </Cadre>
  );
}
