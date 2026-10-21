// La marque de Sans Soupir : un « S » posé dans une bulle de parole, qui ne soupire pas.
export default function Marque({ taille = 38, inverse = false }: { taille?: number; inverse?: boolean }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
      <path d="M20 4c9.4 0 16 6 16 14s-6.6 14-16 14c-1.8 0-3.5-.2-5-.6L7 36l1.6-7.1C5.7 26.4 4 22.4 4 18 4 10 10.6 4 20 4z" fill={inverse ? "#F6AE2D" : "#2F4858"} />
      <path d="M25 13.5c-1.2-1.4-3-2-4.9-2-2.7 0-4.6 1.4-4.6 3.4 0 4.6 9.6 2.6 9.6 7.4 0 2.2-2.1 3.8-5 3.8-2.1 0-4-.8-5.2-2.3" fill="none" stroke={inverse ? "#2F4858" : "#F6AE2D"} strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}
