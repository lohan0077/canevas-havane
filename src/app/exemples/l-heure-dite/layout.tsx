import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { BandeauRenov, Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit de L'Heure Dite, installateur de pompes à chaleur et de panneaux solaires
// imaginaire, filmé dans les deux vidéos du métier « solaire-pac ». Identité « faïence et
// émail » (30/10/2026), tirée de la photo de l'horloge verte : le blanc des carreaux
// (#F5F6F3), le noir des chiffres (#101512), le vert d'émail du cadre (#2E7A32), le rouge
// de la trotteuse en touche. Archivo, grotesque de plaque émaillée, pour les titres ; Work
// Sans pour lire. Le vert clair (#8FD18A) ne sert qu'en relief sur le noir ; le jaune du
// soleil (#F7B73E) ne sert qu'aux courbes et à la jauge, jamais au texte. Le lien France
// Rénov' passe avant tout le reste, sur chaque page. Le `noindex` vient du layout de
// /exemples.
export default function LHeureDiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="L'Heure Dite"
      titres="archivo"
      texte="workSans"
      couleurs={{
        fond: "#F5F6F3",
        encre: "#101512",
        doux: "#4A544E",
        accent: "#2E7A32",
        surAccent: "#FFFFFF",
        accentTexte: "#1E6B29",
        carte: "#FFFFFF",
        trait: "#D6DCD6",
        sombre: "#101512",
        surSombre: "#F5F6F3",
      }}
    >
      <div className="[--soleil:#F7B73E] [--vert-clair:#8FD18A]">
        <BandeauRenov />
        <NavVerre
          accueil={DOSSIER}
          marque={<Marque />}
          liens={NAVIGATION.filter((l) => !l.href.endsWith("/rendez-vous"))}
          action={{ href: `${DOSSIER}/rendez-vous`, libelle: "Choisir mon heure" }}
        />
        <div className="lining-nums">{children}</div>
        <Pied />
      </div>
    </Cadre>
  );
}
