import Cadre from "../_kit/Cadre";
import NavVerre from "../_kit/NavVerre";
import { Marque } from "./_composants/Blocs";
import Pied from "./_composants/Pied";
import { DOSSIER, NAVIGATION } from "./_composants/donnees";

// Pavillon Bis, agence d'architecture imaginaire filmée dans les deux vidéos des
// architectes : uniquement les pavillons des années 70 (« Créer une marque »), et
// « architecte ou pas ? », une page par projet, trente minutes un samedi matin
// (« Remplir l'agenda », ancien site Atelier Samedi).
//
// L'identité (30/10/2026) : celle d'une agence d'aujourd'hui qui reprend des maisons
// d'hier. Le béton clair et l'anthracite des menuiseries neuves, un seul vermillon
// franc — le rouge du crayon d'architecte, celui des corrections sur le calque —
// réservé au geste principal ; Sora, une
// géométrique d'architecte, pour les titres et le texte, et l'italique de DM Serif Display
// pour la « deuxième version ». Les couleurs des années 70 (tuiles, crépi, volets
// bruns) n'appartiennent qu'aux maisons d'avant, dans les dessins et la maquette.
export default function PavillonBisLayout({ children }: { children: React.ReactNode }) {
  return (
    <Cadre
      entreprise="Pavillon Bis"
      titres="sora"
      texte="sora"
      autres={["dmSerif"]}
      couleurs={{
        fond: "#EEF0EF",
        encre: "#121417",
        doux: "#4F565C",
        accent: "#D63F28",
        surAccent: "#FFFFFF",
        accentTexte: "#B5321C",
        carte: "#F8F9F8",
        trait: "#D2D7D6",
        sombre: "#15181C",
        surSombre: "#EEF0EF",
      }}
    >
      {/* Les trois couleurs que le kit ne connaît pas : le vermillon clair et le gris doux,
          lisibles sur l'anthracite, et l'italique de la deuxième version. */}
      <div
        className="contents"
        style={{ "--accent-clair": "#FF907A", "--doux-sombre": "#A3AAB0", "--serif": "var(--f-dmserif)" } as React.CSSProperties}
      >
        <NavVerre
          accueil={DOSSIER}
          marque={<Marque />}
          liens={NAVIGATION}
          action={{ href: `${DOSSIER}/rendez-vous`, libelle: "Réserver 30 min" }}
          surSombre
        />
        {children}
        <Pied />
      </div>
    </Cadre>
  );
}
