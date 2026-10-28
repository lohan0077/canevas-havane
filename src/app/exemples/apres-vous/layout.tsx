import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le site d'Après Vous, entreprise de nettoyage de bureaux imaginaire, filmé dans les deux
// vidéos du nettoyage. Tout le site vit la nuit : bleu nuit, or de la lampe de bureau,
// filets fins et grandes capitales d'Instrument Serif (la cousine libre de l'Optima de la
// marque n'existe pas : on garde son élégance, en italique). Le `noindex` vient du layout
// de /exemples.
export default function ApresVousLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Après Vous"
      titres="instrument"
      texte="manrope"
      couleurs={{
        fond: "#0F1830",
        encre: "#F5F1E8",
        doux: "#B9C0CF",
        accent: "#E9B44C",
        surAccent: "#0F1830",
        accentTexte: "#E9B44C",
        carte: "#1B2A4A",
        trait: "#2E3D5E",
        sombre: "#0B1222",
        surSombre: "#F5F1E8",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/prix`, libelle: "Votre prix" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
