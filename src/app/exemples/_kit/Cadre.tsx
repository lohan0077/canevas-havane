import BandeauDemonstration from "../_composants/BandeauDemonstration";
import PiedDemonstration from "../_composants/PiedDemonstration";
import { POLICES, variablePolice, type NomPolice } from "./polices";

/**
 * Les couleurs d'un site de démonstration. Chaque paire texte / fond doit tenir
 * 4,5:1 — la mesure de contraste de la CI le vérifie sur chaque page.
 */
export type Couleurs = {
  fond: string;        // fond de page
  encre: string;       // texte courant sur `fond`
  doux: string;        // texte secondaire sur `fond` (4,5:1 au moins, lui aussi)
  accent: string;      // aplats, boutons, ornements
  surAccent: string;   // texte posé sur `accent`
  accentTexte: string; // l'accent quand il sert de couleur de texte sur `fond`
  carte: string;       // fond des cartes et des blocs
  trait: string;       // bordures, séparateurs
  sombre: string;      // fond des bandes sombres et du pied de page
  surSombre: string;   // texte sur `sombre`
};

/**
 * L'enveloppe de chaque site de démonstration : ses deux polices, ses couleurs en
 * variables CSS, le bandeau « site de démonstration » en tête et le pied qui dit
 * ce qui est inventé. Dans le site, on écrit `bg-[var(--fond)]`, `text-[var(--encre)]`,
 * `font-[family-name:var(--titres)]`… et les outils du kit suivent les mêmes variables.
 */
export default function Cadre({
  entreprise,
  titres,
  texte,
  autres = [],
  couleurs,
  children,
}: {
  entreprise: string;
  titres: NomPolice;
  texte: NomPolice;
  autres?: NomPolice[];
  couleurs: Couleurs;
  children: React.ReactNode;
}) {
  const polices = [titres, texte, ...autres].map((n) => POLICES[n].variable).join(" ");
  const variables = {
    "--fond": couleurs.fond,
    "--encre": couleurs.encre,
    "--doux": couleurs.doux,
    "--accent": couleurs.accent,
    "--sur-accent": couleurs.surAccent,
    "--accent-texte": couleurs.accentTexte,
    "--carte": couleurs.carte,
    "--trait": couleurs.trait,
    "--sombre": couleurs.sombre,
    "--sur-sombre": couleurs.surSombre,
    "--titres": `var(${variablePolice(titres)})`,
    "--texte": `var(${variablePolice(texte)})`,
  } as React.CSSProperties;

  return (
    <div
      className={`${polices} font-[family-name:var(--texte)] min-h-screen bg-[var(--fond)] text-[var(--encre)] [&_h1]:font-[family-name:var(--titres)] [&_h2]:font-[family-name:var(--titres)] [&_h3]:font-[family-name:var(--titres)] [&_h4]:font-[family-name:var(--titres)] [&_h5]:font-[family-name:var(--titres)] [&_h6]:font-[family-name:var(--titres)] [&_h1]:leading-[1.04] [&_h2]:leading-[1.08] [&_h3]:leading-[1.15]`}
      style={variables}
    >
      <BandeauDemonstration entreprise={entreprise} />
      {children}
      <PiedDemonstration entreprise={entreprise} className="bg-[var(--sombre)] text-[var(--sur-sombre)]" />
    </div>
  );
}
