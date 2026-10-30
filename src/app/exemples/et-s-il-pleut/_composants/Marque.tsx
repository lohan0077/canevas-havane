// La marque d'« Et s'il pleut » : un parapluie jaune, ouvert, sa poignée en canne, dans
// un cercle couleur d'orage. Les deux baleines tracées rappellent celles du premier écran.
export default function Marque({ taille = 36, clair = false }: { taille?: number; clair?: boolean }) {
  const fond = clair ? "#ECEBF2" : "#191A28";
  const trait = clair ? "#191A28" : "#ECEBF2";
  return (
    <svg width={taille} height={taille} viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
      <circle cx="20" cy="20" r="19.5" fill={fond} />
      <path d="M20 8.6v-1.8" stroke={trait} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7.5 20c0-6.8 5.6-11.4 12.5-11.4S32.5 13.2 32.5 20c-1.6-1.5-3.6-1.5-4.2 0-.7-1.5-3.5-1.5-4.2 0-.7-1.5-3.5-1.5-4.1 0-.7-1.5-3.5-1.5-4.2 0-.7-1.5-3.5-1.5-4.2 0-.6-1.5-2.6-1.5-4.1 0z" fill="#FFC61A" />
      <path d="M20 8.6c-2.6 2.6-4 6.6-4.1 11.4M20 8.6c2.6 2.6 4 6.6 4.1 11.4" fill="none" stroke="#C99500" strokeWidth="0.9" />
      <path d="M20 20v8.6a2.4 2.4 0 0 1-4.8 0" fill="none" stroke={trait} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
