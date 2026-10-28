/**
 * Le nom de l'entreprise en lettres géantes, d'un bord à l'autre, en bas de page.
 * Décoratif (le nom est écrit ailleurs) : masqué aux lecteurs d'écran, et donc
 * exempté de la mesure de contraste. `chasse` corrige la largeur selon la police
 * (plus grand = lettres plus grosses).
 */
export default function MotGeant({ texte, chasse = 1.75, className = "" }: { texte: string; chasse?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={`kit-mot-geant select-none ${className}`}>
      <span style={{ "--kit-lettres": texte.length, "--kit-chasse": chasse } as React.CSSProperties}>{texte}</span>
    </div>
  );
}
