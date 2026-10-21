// La marque de Veilleuse : une petite lumière dans un croissant de nuit. Ni bouclier,
// ni aigle, ni étoile : rien qui rappelle un service de police (CSI, art. R631-12).
export default function Marque({ taille = 36, halo = true }: { taille?: number; halo?: boolean }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
      {halo && <circle cx="20" cy="20" r="19" fill="#F4C95D" opacity=".16" />}
      <path d="M26 7a14 14 0 1 0 7 22A12 12 0 0 1 26 7z" fill="#F6EFE3" />
      <circle cx="17" cy="20" r="4.2" fill="#F4C95D" />
    </svg>
  );
}
