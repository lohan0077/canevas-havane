/**
 * L'anneau d'or vu de face, et, gravé à l'intérieur, son numéro. `id` distingue les
 * définitions SVG quand deux anneaux sont sur la même page.
 */
export default function Anneau({ numero = "0112", id = "a", className = "", titre }: { numero?: string; id?: string; className?: string; titre?: string }) {
  const texte = `N° ${numero} · À LA PROCHAINE · N° ${numero} · À LA PROCHAINE ·`;
  return (
    <svg viewBox="0 0 600 600" className={className} role={titre ? "img" : undefined} aria-label={titre} aria-hidden={titre ? undefined : true}>
      <defs>
        <linearGradient id={`or-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6E3A8" />
          <stop offset="0.45" stopColor="#D4B064" />
          <stop offset="1" stopColor="#9C7A34" />
        </linearGradient>
        <path id={`cercle-${id}`} d="M 300 300 m -212 0 a 212 212 0 1 1 424 0 a 212 212 0 1 1 -424 0" />
      </defs>
      <circle cx="300" cy="300" r="270" fill={`url(#or-${id})`} />
      <circle cx="300" cy="300" r="186" fill="#5E4520" />
      <circle cx="300" cy="300" r="180" fill="#152B26" />
      <circle cx="300" cy="300" r="250" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="4" />
      <text fill="#5E4520" fontSize="27" fontWeight="700" letterSpacing="6" style={{ fontFamily: "var(--texte)" }}>
        <textPath href={`#cercle-${id}`}>{texte}</textPath>
      </text>
    </svg>
  );
}
