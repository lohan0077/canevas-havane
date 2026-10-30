import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de Douze Mois, la boutique de fleurs imaginaire des deux vidéos des
// fleuristes. L'identité (30/10/2026) : le jardin à l'heure bleue. Une nuit d'iris
// pour les écrans sombres, un papier glycine pour lire, le vert acide d'une tige pour
// le seul bouton qui compte, et le rose pivoine pour les mots en relief. Polices :
// Instrument Serif pour les titres et leur italique (une didone de mode, fine et
// haute), Bricolage Grotesque pour lire, Caveat pour la carte écrite à la main.
// Chaque page s'ouvre sur un écran sombre.
export default function DouzeMoisLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Douze Mois"
      titres="instrument"
      texte="bricolage"
      autres={["caveat"]}
      couleurs={{
        fond: "#EEEAF7",
        encre: "#1D1533",
        doux: "#564C70",
        accent: "#D4F36B",
        surAccent: "#1D1533",
        accentTexte: "#A3175F",
        carte: "#F8F6FC",
        trait: "#D9D1EC",
        sombre: "#191230",
        surSombre: "#EEEAF7",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}#choix`, libelle: "Commander" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
