import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de Sept Mille Dîners, marque de cuisines imaginaire filmée dans les deux
// vidéos des cuisinistes. Identité du 30/10/2026 : la marque vit le soir, puisque c'est
// l'heure du dîner. Deux mondes qui alternent, la nuit (#121315, le noir de fonte) et la
// porcelaine (#F3F2EF, le blanc de l'assiette) ; un seul accent, le laiton (#C8A574),
// comme le filet d'une assiette ou une poignée de cuisine : boutons, filets, mots en
// italique sur la nuit. Playfair Display pour les titres, le nom de marque et les
// légendes en italique — le contraste des pleins et des déliés —, Figtree pour lire
// (le 30/10, Bodoni Moda et DM Sans sont allés à « Et s'il pleut » : chaque site garde
// son couple). Playfair écrit les chiffres en bas de casse : `lining-nums` les redresse.
// Le monde « porcelaine » se pose section par section
// (PORCELAINE, dans Blocs) : les outils et le kit suivent les variables.
export default function SeptMilleDinersLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Sept Mille Dîners"
      titres="playfair"
      texte="figtree"
      couleurs={{
        fond: "#121315",
        encre: "#F0EDE7",
        doux: "#A3A09A",
        accent: "#C8A574",
        surAccent: "#121315",
        accentTexte: "#D2B48A",
        carte: "#1A1B1E",
        trait: "#2E3034",
        sombre: "#0B0B0C",
        surSombre: "#F0EDE7",
      }}
    >
      <div className="lining-nums">
        <NavVerre
          accueil={DOSSIER}
          marque={<Marque />}
          liens={NAVIGATION.filter((l) => !l.href.endsWith("/tes-murs"))}
          action={{ href: `${DOSSIER}/tes-murs#cotes`, libelle: "Prise de cotes" }}
          surSombre
        />
        {children}
        <Pied />
      </div>
    </Cadre>
  );
}
