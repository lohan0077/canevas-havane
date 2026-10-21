import Cadre from "../_kit/Cadre";
import EnTete from "./_composants/EnTete";
import PiedDuSite from "./_composants/PiedDuSite";

// Le gabarit d'À Garder : les couleurs de la marque dans la vidéo (encre #1E2A5A,
// rouge, kraft, crème), Instrument Serif en italique pour les titres et Zilla Slab
// pour le texte (la machine à écrire de la vidéo). Mise en page transposée du modèle
// « Kairo Studio » de MotionSites : fond clair, un titre italique immense qui passe
// derrière et devant l'objet, des ornements dans les coins.
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
        sombre: "#1E2A5A",
        surSombre: "#F5EFE3",
      }}
    >
      {/* Zilla Slab dessine des chiffres bas de casse : partout, les chiffres alignés. */}
      <div className="[font-variant-numeric:lining-nums]">
        <EnTete />
        {children}
        <PiedDuSite />
      </div>
    </Cadre>
  );
}
