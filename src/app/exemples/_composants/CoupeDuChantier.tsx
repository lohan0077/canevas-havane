/**
 * Coupe schématique d'un chantier de piscine coque, étape par étape. Les entreprises
 * des démonstrations n'existent pas, donc pas de photos de chantier : un schéma qui
 * avance tient leur place, et ne fait croire à rien.
 *
 * Étapes : 0 terrain · 1 terrassement · 2 lit de pose · 3 coque posée ·
 * 4 remblai et remplissage · 5 margelles et plage · 6 mise en eau.
 *
 * Deux palettes : « jour » pour les fonds clairs, « nuit » pour Premier Plongeon.
 */
const PALETTES = {
  jour: {
    terre: "#8B6B4A", strates: "#7A5C3E", herbe: "#79B35E", remblai: "#D9C7A3",
    lit: "#BDB5A6", graviers: "#8F8778", coque: "#EAF6F9", bord: "#FFFFFF",
    margelle: "#EDE3D1", plage: "#A0703F", lames: "#7E5630", remous: "#FFFFFF",
  },
  nuit: {
    terre: "#2E241B", strates: "#3D3024", herbe: "#3F6E4E", remblai: "#5C4C38",
    lit: "#4B5059", graviers: "#6D737D", coque: "#D7EEF4", bord: "#FFFFFF",
    margelle: "#D9CFC0", plage: "#8A5F35", lames: "#5E3F22", remous: "#FFFFFF",
  },
};

const HAUT = 60;    // niveau du terrain
const FOND = 120;   // fond de la coque
const PENTE = 8 / (FOND - HAUT);
const gauche = (y: number) => 76 + (y - HAUT) * PENTE;
const droite = (y: number) => 244 - (y - HAUT) * PENTE;

export default function CoupeDuChantier({
  etape,
  libelle,
  fond = "#F6EFE4",
  eau = "#2BA3C4",
  palette = "jour",
}: {
  etape: number;
  libelle: string;
  fond?: string;
  eau?: string;
  palette?: keyof typeof PALETTES;
}) {
  const c = PALETTES[palette];
  const niveau = etape >= 6 ? HAUT + 5 : etape >= 5 ? HAUT + 14 : etape >= 4 ? HAUT + 32 : null;
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label={libelle} className="w-full h-auto">
      <rect x="0" y={HAUT} width="320" height={150 - HAUT} fill={c.terre} />
      <path d={`M0 ${HAUT + 34} H320 M0 ${HAUT + 62} H320`} stroke={c.strates} strokeWidth="3" />
      <rect x="0" y={HAUT - 5} width="320" height="7" fill={c.herbe} />

      {etape >= 1 && (
        <path
          d={`M70 ${HAUT - 5} H250 L240 128 H80 Z`}
          fill={etape >= 4 ? c.remblai : fond}
        />
      )}
      {etape >= 2 && (
        <g>
          <rect x="80" y={FOND} width="160" height="8" fill={c.lit} />
          {[92, 116, 140, 164, 188, 212, 232].map((x) => (
            <circle key={x} cx={x} cy={FOND + 4} r="1.6" fill={c.graviers} />
          ))}
        </g>
      )}
      {etape >= 3 && (
        <path
          d={`M${gauche(HAUT)} ${HAUT} L84 ${FOND} H236 L${droite(HAUT)} ${HAUT}`}
          fill={c.coque}
          stroke={c.bord}
          strokeWidth="5"
          strokeLinejoin="round"
        />
      )}
      {niveau !== null && (
        <path
          d={`M${gauche(niveau)} ${niveau} H${droite(niveau)} L236 ${FOND - 2} H84 Z`}
          fill={eau}
        />
      )}
      {etape >= 5 && (
        <g>
          <rect x="60" y={HAUT - 9} width="24" height="8" rx="1.5" fill={c.margelle} />
          <rect x="236" y={HAUT - 9} width="24" height="8" rx="1.5" fill={c.margelle} />
          <rect x="260" y={HAUT - 9} width="56" height="7" fill={c.plage} />
          {[274, 288, 302].map((x) => (
            <path key={x} d={`M${x} ${HAUT - 9} v7`} stroke={c.lames} strokeWidth="1.2" />
          ))}
        </g>
      )}
      {etape >= 6 && (
        <g fill="none" stroke={c.remous} strokeWidth="2" strokeLinecap="round">
          <ellipse cx="160" cy={HAUT + 7} rx="26" ry="3" />
          <ellipse cx="160" cy={HAUT + 7} rx="12" ry="1.5" />
          <path d={`M152 ${HAUT - 2} l-6 -12 M160 ${HAUT - 4} v-14 M168 ${HAUT - 2} l6 -12`} stroke={eau} />
        </g>
      )}
    </svg>
  );
}
