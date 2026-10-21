import type { Forme } from "./donnees";

// Les verres d'une monture, dans un repère de 160 × 72 (comme les maquettes de la vidéo).
const VERRES: Record<Forme, React.ReactNode> = {
  ronde: (<><circle cx="42" cy="36" r="27" /><circle cx="118" cy="36" r="27" /></>),
  carree: (<><rect x="12" y="12" width="60" height="46" rx="10" /><rect x="88" y="12" width="60" height="46" rx="10" /></>),
  papillon: (<><path d="M10 20 Q40 4 72 16 Q74 48 44 56 Q14 54 10 20 Z" /><path d="M150 20 Q120 4 88 16 Q86 48 116 56 Q146 54 150 20 Z" /></>),
  pilote: (<><path d="M12 16 Q42 8 72 16 Q72 52 46 58 Q14 56 12 16 Z" /><path d="M148 16 Q118 8 88 16 Q88 52 114 58 Q146 56 148 16 Z" /></>),
  hexa: (<><path d="M26 12 H58 L72 36 L58 60 H26 L12 36 Z" /><path d="M102 12 H134 L148 36 L134 60 H102 L88 36 Z" /></>),
};

export function Verres({ forme, couleur, x = 0, y = 0, largeur = 160 }: { forme: Forme; couleur: string; x?: number; y?: number; largeur?: number }) {
  const fin = forme === "pilote" || forme === "hexa";
  return (
    <svg x={x} y={y} width={largeur} height={largeur * 0.45} viewBox="0 0 160 72" fill="rgba(255,255,255,0.25)" stroke={couleur} strokeWidth={fin ? 6 : 8} strokeLinejoin="round" strokeLinecap="round">
      {VERRES[forme]}
      <path d="M70 30 Q80 22 90 30" fill="none" />
    </svg>
  );
}

/**
 * Un visage simple et volontairement asymétrique — raie à gauche, grain de beauté à
 * droite, « BONJOUR » sur le pull : c'est ce qui rend l'inversion du miroir visible.
 * `inverse` le retourne comme un miroir le ferait.
 */
export default function Visage({
  monture,
  inverse = false,
  titre,
  className = "",
}: {
  monture?: { forme: Forme; couleur: string };
  inverse?: boolean;
  titre: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 250"
      role="img"
      aria-label={titre}
      className={`${className} transition-transform duration-500 ease-out`}
      style={{ transform: inverse ? "scaleX(-1)" : "none" }}
    >
      <path d="M20 250 Q24 196 100 192 Q176 196 180 250 Z" fill="#E8664A" />
      <text aria-hidden="true" x="100" y="236" textAnchor="middle" fontFamily="var(--texte), sans-serif" fontWeight="800" fontSize="22" fill="#FAF7F2" letterSpacing="2">BONJOUR</text>
      <rect x="86" y="160" width="28" height="40" fill="#D9B48F" />
      <ellipse cx="100" cy="100" rx="74" ry="80" fill="#3B2A20" />
      <ellipse cx="100" cy="116" rx="58" ry="70" fill="#E9C9A8" />
      <path d="M34 100 Q44 26 118 30 Q172 36 168 104 Q150 62 104 64 Q60 66 34 100 Z" fill="#3B2A20" />
      <circle cx="78" cy="120" r="5" fill="#2C1E16" />
      <circle cx="122" cy="120" r="5" fill="#2C1E16" />
      <path d="M84 160 Q100 172 116 160" stroke="#2C1E16" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="134" cy="146" r="3.5" fill="#6B4430" />
      {monture && <Verres forme={monture.forme} couleur={monture.couleur} x={36} y={104} largeur={128} />}
    </svg>
  );
}
