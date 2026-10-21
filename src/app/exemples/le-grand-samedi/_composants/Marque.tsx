// La marque du Grand Samedi : un « S » d'italique dans un cercle doré, comme un cachet.
export default function Marque({ taille = 36 }: { taille?: number }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
      <circle cx="20" cy="20" r="18.5" fill="none" stroke="#C69C5D" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="15" fill="#7A2E3B" />
      <text x="20" y="27" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="20" fill="#FAF5EF">S</text>
    </svg>
  );
}
