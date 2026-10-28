// La marque d'« Et s'il pleut » : un parapluie jaune, fermé sur sa poignée, dans un cercle.
export default function Marque({ taille = 36, clair = false }: { taille?: number; clair?: boolean }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
      <circle cx="20" cy="20" r="19" fill={clair ? "#FBF6EC" : "#2F3B4C"} />
      <path d="M8 19c0-6.6 5.4-11 12-11s12 4.4 12 11c-1.6-1.4-3.2-1.4-4 0-.8-1.4-3.2-1.4-4 0-.8-1.4-3.2-1.4-4 0-.8-1.4-3.2-1.4-4 0-.8-1.4-2.4-1.4-4 0z" fill="#F2C230" />
      <path d="M20 19v9.5a2.5 2.5 0 0 1-5 0" fill="none" stroke={clair ? "#2F3B4C" : "#FBF6EC"} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
