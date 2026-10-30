/**
 * Le monogramme de Sept Mille Dîners : une assiette vue de dessus — le bord, le filet de
 * laiton, le 7 en italique au fond. Il prend la couleur du texte autour (nuit ou porcelaine).
 */
export default function Logo({ taille = 36 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={taille} height={taille} aria-hidden="true" className="shrink-0">
      <circle cx="20" cy="20" r="18.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="20" cy="20" r="14.4" fill="none" stroke="var(--accent)" strokeWidth="0.9" />
      <text x="20.4" y="27" textAnchor="middle" fontSize="20" fontStyle="italic" fill="currentColor" style={{ fontFamily: "var(--titres)" }}>7</text>
    </svg>
  );
}
