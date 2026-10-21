// La marque de Dimanche Libre : la page du dimanche d'un calendrier, cochée.
export default function Marque({ taille = 38 }: { taille?: number }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
      <rect x="3" y="6" width="34" height="31" rx="9" fill="#FF7A59" />
      <rect x="3" y="6" width="34" height="10" rx="5" fill="#221B33" />
      <path d="M12 26l5 5 11-12" fill="none" stroke="#221B33" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="4" r="2.5" fill="#221B33" /><circle cx="28" cy="4" r="2.5" fill="#221B33" />
    </svg>
  );
}
