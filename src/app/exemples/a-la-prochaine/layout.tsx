import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// À la Prochaine, la marque de bijoux des deux vidéos des créatrices : la marque de
// « Créer une marque » (le numéro gravé, le registre, la ligne vide), qui a absorbé
// les idées de « Remplir l'agenda » (une pièce, une page, le film de sa fabrication,
// le tampon « Partie », la sortie du vendredi 18 h). Instrument Serif, une Didone fine
// qui tient dans les très grandes tailles, et Manrope pour lire. Le vert de l'écrin,
// l'or, l'ivoire. Chaque page s'ouvre sur l'écrin sombre : en-tête `surSombre`.
export default function ALaProchaineLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="À la Prochaine"
      titres="instrument"
      texte="manrope"
      couleurs={{
        fond: "#F3EDE2",
        encre: "#1E3A33",
        doux: "#4F5F58",
        accent: "#C9A86A",
        surAccent: "#152B26",
        accentTexte: "#7A5A1E",
        carte: "#FAF6EE",
        trait: "#D8CCB5",
        sombre: "#152B26",
        surSombre: "#F3EDE2",
      }}
    >
      <NavVerre
        accueil={DOSSIER}
        marque={<Marque />}
        liens={NAVIGATION}
        action={{ href: `${DOSSIER}/registre`, libelle: "Mon numéro" }}
        surSombre
      />
      {children}
      <Pied />
    </Cadre>
  );
}
