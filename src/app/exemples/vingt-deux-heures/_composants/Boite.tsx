/**
 * Une boîte de jeu vue de face : un aplat, un motif, un bandeau de titre muet. Aucune
 * boîte ne reproduit un jeu réel — c'est volontaire, et la vidéo fait de même.
 */
export default function Boite({ teinte, motif, className = "" }: { teinte: string; motif: 0 | 1 | 2 | 3; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`block rounded-[14%] shadow-[0_6px_0_rgba(0,0,0,0.18)] ${className}`} aria-hidden="true">
      <rect width="100" height="100" rx="12" fill={teinte} />
      {motif === 0 && (
        <g fill="#FFFFFF" opacity="0.9">
          <circle cx="30" cy="38" r="12" />
          <circle cx="70" cy="38" r="12" fillOpacity="0.55" />
          <circle cx="50" cy="66" r="12" fillOpacity="0.75" />
        </g>
      )}
      {motif === 1 && (
        <g stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.85">
          <path d="M18 30 H82" />
          <path d="M18 48 H64" />
          <path d="M18 66 H74" />
        </g>
      )}
      {motif === 2 && (
        <g fill="#FFFFFF" opacity="0.88">
          <path d="M50 18 L80 70 H20 Z" />
          <circle cx="50" cy="56" r="7" fill={teinte} />
        </g>
      )}
      {motif === 3 && (
        <g fill="#FFFFFF" opacity="0.88">
          <rect x="20" y="20" width="26" height="26" rx="5" />
          <rect x="54" y="20" width="26" height="26" rx="5" fillOpacity="0.6" />
          <rect x="20" y="54" width="26" height="26" rx="5" fillOpacity="0.6" />
          <rect x="54" y="54" width="26" height="26" rx="5" />
        </g>
      )}
      <rect x="12" y="84" width="76" height="8" rx="4" fill="#FFFFFF" opacity="0.55" />
    </svg>
  );
}
