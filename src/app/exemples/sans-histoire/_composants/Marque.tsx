// La marque de Sans Histoire : un soleil qui se lève sur une ligne d'horizon. Rien
// qui rappelle un service public (Code de la sécurité intérieure, art. R631-12) :
// ni écusson, ni étoile, ni bleu-blanc-rouge.
export default function Marque({ taille = 34 }: { taille?: number }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
      <circle cx="20" cy="20" r="19" fill="var(--carte)" stroke="var(--encre)" strokeWidth="1.5" />
      <path d="M9 25 A11 11 0 0 1 31 25 Z" fill="var(--accent)" />
      <path d="M6 25 H34" stroke="var(--encre)" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 30 H28" stroke="var(--encre)" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
    </svg>
  );
}
