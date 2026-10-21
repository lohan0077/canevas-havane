import type { Piece } from "./donnees";

/**
 * Le dessin d'une pièce, posé sur son velours : un trait d'argent et, s'il y en a
 * une, sa pierre. Les pièces de ce site étant fictives, ce sont des dessins, pas des
 * photos. Le dégradé porte le numéro de la pièce : deux dessins de la même pièce sur
 * une page partagent la même définition, identique.
 */
export default function Bijou({ piece, className = "" }: { piece: Piece; className?: string }) {
  const id = `argent-${piece.numero}`;
  const trait = `url(#${id})`;
  const pierre = piece.pierre?.couleur;

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={`${nomForme(piece)} n° ${piece.numero}, « ${piece.nom}\u00a0»`} className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.45" stopColor="#C9C6C8" />
          <stop offset="0.7" stopColor="#8E8A8E" />
          <stop offset="1" stopColor="#E9E6E8" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="172" rx="62" ry="8" fill="#000" opacity="0.28" />
      {piece.forme === "bague" && (
        <g fill="none" strokeLinecap="round">
          <ellipse cx="100" cy="122" rx="56" ry="38" stroke={trait} strokeWidth={pierre ? 11 : 22} />
          {!pierre && (
            // Les coups de marteau : de petites facettes claires sur l'anneau.
            <g stroke="#FFFFFF" strokeWidth="2" opacity="0.7">
              {[-48, -30, -12, 6, 24, 42].map((x) => (
                <path key={x} d={`M ${100 + x} ${150 - Math.abs(x) / 3} l 6 -3`} />
              ))}
            </g>
          )}
          {pierre && (
            <>
              <circle cx="100" cy="80" r="19" stroke={trait} strokeWidth="6" fill="#1B0A0F" />
              <circle cx="100" cy="80" r="13" fill={pierre} />
              <circle cx="95" cy="75" r="4" fill="#FFFFFF" opacity="0.6" />
            </>
          )}
        </g>
      )}
      {piece.forme === "boucles" && (
        <g fill="none" stroke={trait} strokeLinecap="round" strokeWidth="6">
          <path d="M 70 40 q 14 -16 22 4 v 20" />
          <path d="M 92 64 c -18 26 -18 52 0 62 c 18 -10 18 -36 0 -62 z" fill={trait} strokeWidth="2" />
          <path d="M 118 52 q 14 -16 22 4 v 20" />
          <path d="M 140 76 c -16 24 -16 46 0 56 c 16 -10 16 -32 0 -56 z" fill={trait} strokeWidth="2" />
        </g>
      )}
      {piece.forme === "pendentif" && (
        <g fill="none" strokeLinecap="round">
          <path d="M 22 28 Q 100 150 178 28" stroke={trait} strokeWidth="3" strokeDasharray="5 3" />
          <circle cx="100" cy="98" r="5" stroke={trait} strokeWidth="3" />
          {pierre ? (
            // Une demi-lune : un disque d'argent, mordu par le velours.
            <>
              <circle cx="100" cy="128" r="26" fill={trait} />
              <circle cx="112" cy="118" r="22" fill="#2A0E15" />
              <circle cx="88" cy="140" r="6" fill={pierre} />
            </>
          ) : (
            // Une plaque texturée au burin.
            <>
              <rect x="80" y="104" width="40" height="56" rx="6" fill={trait} />
              <path d="M 88 112 v 40 M 97 110 v 44 M 106 114 v 38 M 114 110 v 42" stroke="#6E6A70" strokeWidth="1.5" />
            </>
          )}
        </g>
      )}
      {piece.forme === "jonc" && (
        <g fill="none" strokeLinecap="round">
          <path d="M 64 84 C 20 100 26 150 100 156 C 170 160 182 112 142 88" stroke={trait} strokeWidth="16" />
          <path d="M 150 94 C 172 112 160 140 120 148" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
        </g>
      )}
    </svg>
  );
}

export const nomForme = (p: Piece) =>
  ({ bague: "Bague", boucles: "Boucles d'oreilles", pendentif: "Pendentif", jonc: "Jonc" })[p.forme];
