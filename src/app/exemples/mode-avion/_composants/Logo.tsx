/** Le signe de Mode Avion : un avion dans un cercle, comme l'icône du téléphone. */
export default function Logo({ taille = 32 }: { taille?: number }) {
  return (
    <svg aria-hidden="true" width={taille} height={taille} viewBox="0 0 32 32" className="shrink-0">
      <circle cx="16" cy="16" r="15" fill="var(--accent)" />
      <path d="M16 6.5 c1 0 1.5 1 1.5 2.2 V13 l7 4 v2.2 l-7 -2.2 v4.6 l2 1.6 v1.8 l-3.5 -1 -3.5 1 v-1.8 l2 -1.6 v-4.6 l-7 2.2 V17 l7 -4 V8.7 c0 -1.2 .5 -2.2 1.5 -2.2 z" fill="#FFFFFF" />
    </svg>
  );
}
