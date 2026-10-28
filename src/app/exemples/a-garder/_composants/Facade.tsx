import styles from "./Facade.module.css";

export type StyleEnseigne = "dorees" | "caisson" | "blanches";

/**
 * Une façade de boutique, dessinée : l'étage, le bandeau (avec ou sans enseigne),
 * la vitrine, la porte, le trottoir. De jour ou de nuit. Aucune vraie boutique :
 * l'enseigne porte un nom de métier, ou celui que le visiteur tape.
 * Le dessin est décoratif (aria-hidden) : la légende qui l'accompagne dit ce qu'il montre.
 */
export default function Facade({
  id,
  enseigne,
  style = "dorees",
  nuit = false,
  allumage = false,
  teinte = "#2C3A33",
  className = "",
}: {
  id: string;
  enseigne?: string | null;
  style?: StyleEnseigne;
  nuit?: boolean;
  allumage?: boolean;
  teinte?: string;
  className?: string;
}) {
  const texte = (enseigne ?? "").trim().toUpperCase();
  const taille = Math.max(14, Math.min(36, Math.floor(318 / Math.max(1, texte.length) / 0.86)));
  const fondBandeau = !texte
    ? nuit ? "#151A28" : "#EFE6D4"
    : style === "caisson"
      ? "#2A2F3A"
      : nuit ? "#111622" : style === "dorees" ? "#1F3B2D" : teinte;
  const couleurTexte =
    style === "dorees" ? (nuit ? "#FFE3A3" : "#E9C46A")
      : style === "caisson" ? (nuit ? "#3A2A12" : "#1B2433")
        : nuit ? "#F3F6FF" : "#FFFFFF";
  const halo = nuit && texte && style !== "caisson";

  return (
    <svg viewBox="0 0 400 420" className={`block w-full h-auto ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-vitre`} x1="0" y1="0" x2="0" y2="1">
          {nuit ? (
            <>
              <stop offset="0" stopColor="#FFD28A" />
              <stop offset="1" stopColor="#C97A34" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#8DA4B1" />
              <stop offset="1" stopColor="#4A5F6B" />
            </>
          )}
        </linearGradient>
        <radialGradient id={`${id}-flaque`} cx="0.5" cy="0" r="0.8">
          <stop offset="0" stopColor="#FFC873" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFC873" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-halo`} x="-30%" y="-80%" width="160%" height="260%">
          <feGaussianBlur stdDeviation="5" result="flou" />
          <feMerge>
            <feMergeNode in="flou" />
            <feMergeNode in="flou" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* La pierre, et ses joints */}
      <rect x="0" y="0" width="400" height="384" fill={nuit ? "#2B3047" : "#E6DAC6"} />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="0" x2="400" y1={30 * (i + 1)} y2={30 * (i + 1)} stroke={nuit ? "#262A3F" : "#D6C8B0"} strokeWidth="2" />
      ))}

      {/* L'étage */}
      {[48, 160, 272].map((x, i) => (
        <path
          key={x}
          d={`M${x} 132 V64 a40 40 0 0 1 80 0 V132 Z`}
          fill={nuit ? (i === 1 ? "#4A4560" : "#1E2236") : `url(#${id}-vitre)`}
          stroke={nuit ? "#454B66" : "#F4EEE3"}
          strokeWidth="7"
        />
      ))}

      {/* Le bandeau */}
      <rect x="14" y="150" width="372" height="62" rx="5" fill={fondBandeau} stroke={nuit ? "#232A3A" : "#CDBFA6"} strokeWidth="3" />
      {texte && (
        <g className={allumage ? styles.allumage : undefined}>
          {style === "caisson" && (
            <rect x="24" y="158" width="352" height="46" rx="3" fill={nuit ? "#FFF2D2" : "#F7F2E6"} filter={nuit ? `url(#${id}-halo)` : undefined} />
          )}
          <text
            x="200"
            y="182"
            textAnchor="middle"
            dominantBaseline="central"
            fill={couleurTexte}
            filter={halo ? `url(#${id}-halo)` : undefined}
            style={{ fontFamily: "var(--titres)", fontSize: taille, fontWeight: 700, letterSpacing: "0.12em" }}
          >
            {texte}
          </text>
        </g>
      )}

      {/* La devanture : vitrine et porte */}
      <rect x="14" y="220" width="372" height="164" fill={nuit ? "#161B2A" : teinte} />
      <g className={nuit && allumage ? styles.vitrine : undefined}>
        <rect x="28" y="232" width="244" height="152" rx="3" fill={`url(#${id}-vitre)`} />
        {/* Les étagères, en silhouette */}
        {[290, 334].map((y) => (
          <rect key={y} x="44" y={y} width="212" height="5" rx="2" fill={nuit ? "#7A4A22" : "#2E3B42"} opacity=".7" />
        ))}
        {[58, 92, 126, 170, 204, 232].map((x, i) => (
          <circle key={x} cx={x} cy={i % 2 ? 323 : 279} r={i % 3 === 0 ? 12 : 9} fill={nuit ? "#8A5326" : "#33434B"} opacity=".55" />
        ))}
        <polygon points="120,232 160,232 92,384 52,384" fill="#FFFFFF" opacity={nuit ? 0.08 : 0.16} />
      </g>
      <rect x="288" y="232" width="84" height="152" rx="3" fill={nuit ? "#1F2638" : "#4E6157"} stroke={nuit ? "#10151F" : "#24302A"} strokeWidth="6" />
      <circle cx="356" cy="312" r="5" fill="#E9C46A" />

      {/* Le trottoir, et la lumière qui s'y pose la nuit */}
      <rect x="0" y="384" width="400" height="36" fill={nuit ? "#23283A" : "#A29F98"} />
      <rect x="0" y="384" width="400" height="5" fill={nuit ? "#343A52" : "#BDB9B0"} />
      {nuit && <ellipse cx="150" cy="392" rx="170" ry="28" fill={`url(#${id}-flaque)`} />}
    </svg>
  );
}
