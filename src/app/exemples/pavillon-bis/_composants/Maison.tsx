import type { Modele } from "./donnees";

/**
 * Un pavillon des années 70, dessiné en façade comme une affiche de l'époque : toit à
 * faible pente débordant, crépi, volets bruns, un soleil ocre derrière. Trois modèles
 * (plain-pied, sur sous-sol, à étage), avant ou après. Des dessins, pas des photos :
 * aucune vraie maison, aucune adresse reconnaissable.
 */
const C = {
  toit: "#B24A2E",
  crepi: "#F1E6CF",
  volet: "#6B4A2F",
  trait: "#1B1F24",
  bois: "#C98F3A",
  boisFonce: "#A9762C",
  vitre: "#A9CBD0",
  vitreSoir: "#FFE7A3",
  herbe: "#7C9A6B",
  haie: "#4F6B4A",
  garage: "#B9AC93",
  soleil: "#F2A896",
};

function Fenetre({ x, y, l = 22, h = 18, volets = true, vitre = C.vitre }: { x: number; y: number; l?: number; h?: number; volets?: boolean; vitre?: string }) {
  return (
    <g>
      {volets && <rect x={x - 7} y={y} width="6" height={h} fill={C.volet} />}
      <rect x={x} y={y} width={l} height={h} fill={vitre} stroke={C.trait} strokeWidth="1.5" />
      <path d={`M${x + l / 2} ${y}V${y + h}`} stroke={C.trait} strokeWidth="1" />
      {volets && <rect x={x + l + 1} y={y} width="6" height={h} fill={C.volet} />}
    </g>
  );
}

function Bardage({ x, y, l, h }: { x: number; y: number; l: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={l} height={h} fill={C.bois} />
      {Array.from({ length: Math.floor(l / 7) }, (_, i) => (
        <path key={i} d={`M${x + 4 + i * 7} ${y}V${y + h}`} stroke={C.boisFonce} strokeWidth="1" />
      ))}
    </g>
  );
}

/** Le décor : un soleil, une haie, un arbre. */
function Decor() {
  return (
    <g>
      <circle cx="152" cy="34" r="22" fill={C.soleil} opacity="0.55" />
      <rect x="0" y="116" width="200" height="14" fill={C.herbe} />
      <rect x="2" y="104" width="26" height="12" rx="6" fill={C.haie} />
      <rect x="176" y="106" width="22" height="10" rx="5" fill={C.haie} />
      <path d="M14 104V86" stroke={C.trait} strokeWidth="2" />
      <circle cx="14" cy="80" r="11" fill={C.haie} />
    </g>
  );
}

export default function Maison({
  modele,
  apres = false,
  decor = false,
  className = "",
  libelle,
}: {
  modele: Modele;
  apres?: boolean;
  decor?: boolean;
  className?: string;
  libelle?: string;
}) {
  const vitre = apres ? C.vitreSoir : C.vitre;
  return (
    <svg viewBox="0 0 200 130" role={libelle ? "img" : undefined} aria-label={libelle} aria-hidden={libelle ? undefined : true} className={className}>
      {decor ? <Decor /> : <rect x="0" y="116" width="200" height="14" fill={C.herbe} />}
      {modele === "plain" && (
        <g>
          <rect x="34" y="62" width="112" height="54" fill={C.crepi} stroke={C.trait} strokeWidth="1.5" />
          <path d="M24 64L90 40L156 64Z" fill={C.toit} stroke={C.trait} strokeWidth="1.5" strokeLinejoin="round" />
          <Fenetre x={48} y={76} vitre={vitre} />
          <rect x="84" y="80" width="16" height="36" fill={C.volet} stroke={C.trait} strokeWidth="1.5" />
          <Fenetre x={114} y={76} vitre={vitre} />
          {apres && (
            <g>
              <Bardage x={146} y={78} l={46} h={38} />
              <rect x="150" y="84" width="38" height="32" fill={C.vitreSoir} stroke={C.trait} strokeWidth="1.5" />
              <path d="M169 84V116" stroke={C.trait} strokeWidth="1" />
              <rect x="143" y="74" width="52" height="5" fill={C.trait} />
            </g>
          )}
        </g>
      )}
      {modele === "sous-sol" && (
        <g>
          <rect x="40" y="82" width="120" height="34" fill={apres ? C.crepi : C.garage} stroke={C.trait} strokeWidth="1.5" />
          <rect x="40" y="38" width="120" height="44" fill={C.crepi} stroke={C.trait} strokeWidth="1.5" />
          <path d="M30 40L100 16L170 40Z" fill={C.toit} stroke={C.trait} strokeWidth="1.5" strokeLinejoin="round" />
          <Fenetre x={56} y={50} vitre={vitre} />
          <Fenetre x={122} y={50} vitre={vitre} />
          <path d="M150 82V60H166" fill="none" stroke={C.trait} strokeWidth="1.5" />
          {apres ? (
            <g>
              <Bardage x={40} y={82} l={120} h={34} />
              <rect x="50" y="86" width="74" height="30" fill={C.vitreSoir} stroke={C.trait} strokeWidth="1.5" />
              <path d="M74.7 86V116M99.3 86V116" stroke={C.trait} strokeWidth="1" />
              <rect x="132" y="88" width="18" height="28" fill={C.volet} stroke={C.trait} strokeWidth="1.5" />
            </g>
          ) : (
            <g>
              <rect x="56" y="88" width="54" height="28" fill="#D9CDB5" stroke={C.trait} strokeWidth="1.5" />
              {[0, 1, 2, 3].map((i) => <path key={i} d={`M56 ${94 + i * 6}H110`} stroke={C.trait} strokeWidth="0.8" />)}
              <rect x="126" y="92" width="14" height="10" fill={C.vitre} stroke={C.trait} strokeWidth="1.2" />
            </g>
          )}
        </g>
      )}
      {modele === "etage" && (
        <g>
          {apres ? <Bardage x={44} y={34} l={112} h={82} /> : <rect x="44" y="34" width="112" height="82" fill={C.crepi} />}
          <rect x="44" y="34" width="112" height="82" fill="none" stroke={C.trait} strokeWidth="1.5" />
          <path d="M34 36L100 10L166 36Z" fill={C.toit} stroke={C.trait} strokeWidth="1.5" strokeLinejoin="round" />
          {apres ? (
            <g>
              <Fenetre x={58} y={44} l={32} h={26} volets={false} vitre={vitre} />
              <Fenetre x={110} y={44} l={32} h={26} volets={false} vitre={vitre} />
            </g>
          ) : (
            <g>
              <Fenetre x={62} y={46} />
              <Fenetre x={116} y={46} />
            </g>
          )}
          <Fenetre x={62} y={84} volets={!apres} vitre={vitre} />
          <rect x="114" y="80" width="16" height="36" fill={C.volet} stroke={C.trait} strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
}
