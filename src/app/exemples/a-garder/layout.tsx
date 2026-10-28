import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Le gabarit d'À Garder, l'imprimerie des deux vidéos des imprimeurs : les couleurs de
// la marque (encre #1E2A5A, rouge, kraft, crème), Instrument Serif en italique pour
// les titres et Zilla Slab pour le texte (la machine à écrire de la vidéo). Le soir,
// pour les enseignes, l'ambre d'une lettre allumée.
export default function AGarderLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="À Garder"
      titres="instrument"
      texte="zilla"
      couleurs={{
        fond: "#F5EFE3",
        encre: "#1E2A5A",
        doux: "#4A5275",
        accent: "#C2381F",
        surAccent: "#FFFDF8",
        accentTexte: "#B2321C",
        carte: "#FFFDF8",
        trait: "#E2D8C4",
        sombre: "#161E44",
        surSombre: "#F5EFE3",
      }}
    >
      {/* Zilla Slab dessine des chiffres bas de casse : partout, les chiffres alignés. */}
      <div className="[font-variant-numeric:lining-nums]">
        <NavVerre
          accueil={DOSSIER}
          marque={<Marque />}
          liens={NAVIGATION}
          action={{ href: `${DOSSIER}/echantillons`, libelle: "Échantillons" }}
        />
        {children}
        <Pied />
      </div>
    </Cadre>
  );
}
