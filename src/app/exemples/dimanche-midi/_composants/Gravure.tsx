/**
 * La gravure de l'accueil, à la manière d'une toile de Jouy : une longue table dressée, une
 * fenêtre, une horloge qui marque midi. Un seul trait vert, deux touches (moutarde,
 * terre cuite). Décorative.
 */
export default function Gravure({ className = "" }: { className?: string }) {
  const encre = "#2F4A3A";
  return (
    <svg viewBox="0 0 800 380" className={className} aria-hidden="true" fill="none" stroke={encre} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <pattern id="dm-hachures" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={encre} strokeWidth="0.8" />
        </pattern>
        <pattern id="dm-papier" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M9 4c2 3 2 7 0 10M4 9c3-2 7-2 10 0" stroke={encre} strokeWidth="0.5" opacity="0.35" />
        </pattern>
      </defs>

      {/* Le mur, son papier peint, la plinthe. */}
      <rect x="20" y="10" width="760" height="300" fill="url(#dm-papier)" stroke="none" />
      <path d="M20 310H780" />
      <path d="M20 300H780" strokeWidth="0.8" />

      {/* La fenêtre et ses rideaux. */}
      <rect x="70" y="40" width="130" height="170" fill="#FBF5EA" />
      <path d="M135 40v170M70 125h130" />
      <path d="M80 60c14 20 18 40 6 60M190 60c-14 20-18 40-6 60" strokeWidth="0.8" />
      <path d="M58 32c10 50 4 110-8 190M212 32c-10 50-4 110 8 190" />
      <path d="M62 40c6 44 2 100-6 170M208 40c-6 44-2 100 6 170" strokeWidth="0.8" />
      <path d="M52 32h168" strokeWidth="2.4" />

      {/* L'horloge : midi. */}
      <circle cx="400" cy="78" r="40" fill="#FBF5EA" />
      <circle cx="400" cy="78" r="34" fill="#D9B45A" fillOpacity="0.35" strokeWidth="0.9" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return <line key={i} x1={400 + Math.sin(a) * 29} y1={78 - Math.cos(a) * 29} x2={400 + Math.sin(a) * (i % 3 === 0 ? 23 : 26)} y2={78 - Math.cos(a) * (i % 3 === 0 ? 23 : 26)} strokeWidth={i % 3 === 0 ? 2 : 1} />;
      })}
      <path d="M400 78V54" strokeWidth="2.6" />
      <path d="M400 78V60" strokeWidth="3.4" />
      <circle cx="400" cy="78" r="2.6" fill={encre} />
      <path d="M400 118v28" strokeWidth="0.9" />
      <circle cx="400" cy="150" r="5" fill="#D9B45A" />

      {/* Le tableau. */}
      <rect x="585" y="48" width="140" height="104" fill="#FBF5EA" />
      <rect x="595" y="58" width="120" height="84" strokeWidth="0.9" />
      <path d="M598 128c18-22 30-26 46-12s30 10 44-8 22-12 26-6" strokeWidth="0.9" />
      <path d="M598 138c30-10 60-8 116-4" strokeWidth="0.7" />
      <circle cx="690" cy="80" r="8" strokeWidth="0.8" />

      {/* Les dossiers des chaises, derrière la table. */}
      {[175, 300, 500, 625].map((x) => (
        <g key={x}>
          <path d={`M${x - 30} 232V168c0-20 60-20 60 0v64`} fill="#FBF5EA" />
          <path d={`M${x - 20} 232v-52M${x} 232v-58M${x + 20} 232v-52`} strokeWidth="0.9" />
        </g>
      ))}

      {/* La table, sa nappe et ses plis. */}
      <path d="M100 232h600l20 8H80z" fill="#FBF5EA" />
      <path d={`M80 240h640v58${"c-13 8-27 8-40 0".repeat(16)}z`} fill="#FFFDF8" />
      {[128, 224, 320, 416, 512, 608].map((x) => (
        <path key={x} d={`M${x} 244c4 20 2 38-2 56`} strokeWidth="0.8" />
      ))}
      <path d="M80 248h640" strokeWidth="0.7" />
      <rect x="82" y="270" width="636" height="22" fill="url(#dm-hachures)" stroke="none" opacity="0.5" />

      {/* Les assiettes, les verres d'eau. */}
      {[170, 290, 510, 630].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="234" rx="30" ry="6" fill="#FFFDF8" />
          <ellipse cx={x} cy="234" rx="18" ry="3.4" strokeWidth="0.8" />
          <path d={`M${x + 40} 233v-20h12v20z`} fill="#FFFDF8" strokeWidth="1.1" />
          <path d={`M${x + 40} 220h12`} strokeWidth="0.6" />
        </g>
      ))}

      {/* Le pain, le pichet d'eau, le bouquet. */}
      <path d="M215 232c0-12 40-14 46 0z" fill="#E9D8B4" />
      <path d="M226 226l6-4M236 224l6-4M246 224l6-3" strokeWidth="0.9" />
      <path d="M450 233v-26c0-8-6-10-6-16h22c0 6-6 8-6 16l4 26z" fill="#FFFDF8" />
      <path d="M466 200c10 0 12 14 2 18" />
      <path d="M447 214h17" strokeWidth="0.6" />
      <path d="M385 233l4-26h22l4 26z" fill="#FFFDF8" />
      <path d="M392 207c-6-20-18-28-22-40M400 207v-46M408 207c6-20 16-30 22-38" strokeWidth="1" />
      {[[370, 165], [400, 156], [430, 168], [384, 182], [418, 184]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="#B5523B" fillOpacity="0.75" strokeWidth="1" />
      ))}
      <path d="M380 196c-8-2-12-8-10-12M420 196c8-2 12-8 10-12" strokeWidth="0.9" />

      {/* Les chaises des bouts de table. */}
      <path d="M40 330V180c0-10 26-10 26 0v150M40 250h26M40 330h-6M66 330h6" />
      <path d="M760 330V180c0-10-26-10-26 0v150M760 250h-26" />

      {/* Le sol. */}
      <path d="M20 330H780" />
      <path d="M60 350h120M260 346h160M520 352h200" strokeWidth="0.7" />
    </svg>
  );
}
