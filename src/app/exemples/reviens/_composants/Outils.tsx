import styles from "./reviens.module.css";
import type { IdOutil } from "./donnees";

// Les outils de Reviens., dessinés : aucune marque, aucun logo, seulement le prénom
// gravé sur le corps. La visseuse reprend le dessin de la vidéo (moteur de Canevas
// Havane, visuels.js de « marque-materiel-pro »), pour que le site et la vidéo montrent
// le même outil.

type Zone = { x: number; y: number; w: number; taille: number };
type Dessin = { vue: string; zone: Zone; corps: (c: string) => React.ReactNode };

const NOIR = "#1E1E1E";

const DESSINS: Record<IdOutil, Dessin> = {
  visseuse: {
    vue: "0 0 640 520",
    zone: { x: 290, y: 212, w: 300, taille: 66 },
    corps: (c) => (
      <>
        <rect x="150" y="425" width="230" height="82" rx="16" fill={NOIR} />
        <rect x="170" y="440" width="190" height="10" rx="5" fill="#3A3A3A" />
        <path d="M232 250 L338 250 L320 432 L208 432 Z" fill={c} />
        <path d="M246 300 L326 300 L316 420 L222 420 Z" fill={NOIR} opacity=".35" />
        <rect x="100" y="104" width="380" height="166" rx="76" fill={c} />
        <rect x="100" y="104" width="380" height="58" rx="29" fill="#FFFFFF" opacity=".10" />
        <rect x="466" y="134" width="58" height="112" rx="16" fill={NOIR} />
        <rect x="520" y="154" width="66" height="72" rx="12" fill="#50565C" />
        <g stroke="#2E3236" strokeWidth="5"><path d="M536 158 v64" /><path d="M552 158 v64" /><path d="M568 158 v64" /></g>
        <rect x="584" y="182" width="52" height="16" rx="4" fill="#B3BBC0" />
        <rect x="340" y="272" width="26" height="60" rx="12" fill={NOIR} />
      </>
    ),
  },
  perceuse: {
    vue: "0 0 640 520",
    zone: { x: 270, y: 212, w: 300, taille: 66 },
    corps: (c) => (
      <>
        <rect x="130" y="425" width="230" height="82" rx="16" fill={NOIR} />
        <path d="M212 250 L318 250 L300 432 L188 432 Z" fill={c} />
        <path d="M226 300 L306 300 L296 420 L202 420 Z" fill={NOIR} opacity=".35" />
        <rect x="70" y="104" width="390" height="166" rx="76" fill={c} />
        <rect x="70" y="104" width="390" height="58" rx="29" fill="#FFFFFF" opacity=".10" />
        <rect x="446" y="128" width="64" height="124" rx="16" fill={NOIR} />
        <rect x="506" y="150" width="78" height="80" rx="14" fill="#50565C" />
        <rect x="580" y="184" width="58" height="12" rx="4" fill="#B3BBC0" />
        <rect x="470" y="246" width="34" height="128" rx="14" fill={NOIR} transform="rotate(14 487 246)" />
        <rect x="320" y="272" width="26" height="60" rx="12" fill={NOIR} />
      </>
    ),
  },
  meuleuse: {
    vue: "0 0 640 340",
    zone: { x: 250, y: 196, w: 330, taille: 60 },
    corps: (c) => (
      <>
        <rect x="20" y="138" width="80" height="84" rx="30" fill={NOIR} />
        <rect x="70" y="112" width="400" height="136" rx="62" fill={c} />
        <rect x="70" y="112" width="400" height="44" rx="22" fill="#FFFFFF" opacity=".10" />
        <rect x="450" y="104" width="110" height="140" rx="22" fill="#50565C" />
        <rect x="480" y="40" width="34" height="76" rx="14" fill={NOIR} />
        <ellipse cx="540" cy="282" rx="96" ry="26" fill="#8C939A" />
        <ellipse cx="540" cy="282" rx="96" ry="26" fill="none" stroke="#3A3A3A" strokeWidth="6" />
        <path d="M450 270 Q540 214 630 270" fill="none" stroke={NOIR} strokeWidth="16" strokeLinecap="round" />
      </>
    ),
  },
  niveau: {
    vue: "0 0 640 220",
    zone: { x: 320, y: 128, w: 360, taille: 52 },
    corps: (c) => (
      <>
        <rect x="14" y="60" width="612" height="100" rx="12" fill={c} />
        <rect x="14" y="60" width="612" height="24" rx="12" fill="#FFFFFF" opacity=".12" />
        <rect x="14" y="140" width="612" height="20" rx="8" fill={NOIR} opacity=".35" />
        {[64, 576].map((x) => (
          <g key={x}>
            <rect x={x - 34} y="76" width="68" height="68" rx="10" fill={NOIR} />
            <rect x={x - 22} y="98" width="44" height="24" rx="12" fill="#C9E26B" />
            <circle cx={x} cy="110" r="8" fill="#F4F8D8" />
          </g>
        ))}
      </>
    ),
  },
  marteau: {
    vue: "0 0 640 380",
    zone: { x: 400, y: 214, w: 340, taille: 46 },
    corps: (c) => (
      <>
        <rect x="170" y="164" width="458" height="70" rx="30" fill={c} />
        <rect x="170" y="164" width="458" height="20" rx="10" fill="#FFFFFF" opacity=".12" />
        <path d="M70 40 L150 40 L150 330 Q110 350 70 330 Z" fill="#8C939A" />
        <path d="M150 120 L200 120 L200 270 L150 270 Z" fill="#6E757C" />
        <path d="M70 330 Q20 300 30 250 L70 250 Z" fill="#6E757C" />
        <rect x="58" y="22" width="104" height="34" rx="8" fill="#B3BBC0" />
      </>
    ),
  },
};

/**
 * Un outil, et le prénom gravé sur son corps. Sans prénom, l'emplacement de la gravure
 * est montré en pointillé. Le point du laser (`laser`) s'allume à chaque lettre : sa clé
 * change avec le prénom, l'animation repart.
 */
export function OutilGrave({ id, corps, gravure, prenom, titre, laser = false, className = "" }: {
  id: IdOutil;
  corps: string;
  gravure: string;
  prenom: string;
  titre: string;
  laser?: boolean;
  className?: string;
}) {
  const d = DESSINS[id];
  const { x, y, w, taille } = d.zone;
  const n = Math.max(prenom.length, 1);
  const t = Math.min(taille, w / (n * 0.74 + 0.2));
  const fin = x + (prenom.length * 0.74 * t) / 2;
  return (
    <svg viewBox={d.vue} className={className} role="img" aria-label={titre}>
      {d.corps(corps)}
      {prenom ? (
        <>
          <text aria-hidden="true" x={x} y={y + 3} textAnchor="middle" fontSize={t} fontWeight={800} letterSpacing="0.08em" fill="#000" opacity=".35" className="font-[family-name:var(--titres)]">
            {prenom}
          </text>
          <text aria-hidden="true" x={x} y={y} textAnchor="middle" fontSize={t} fontWeight={800} letterSpacing="0.08em" fill={gravure} className="font-[family-name:var(--titres)]" data-film="grave">
            {prenom}
          </text>
          {laser && <circle key={prenom} cx={fin + 8} cy={y - t * 0.35} r="9" fill="#FFF3C4" className={styles.laser} />}
        </>
      ) : (
        <rect x={x - w / 2} y={y - taille * 0.85} width={w} height={taille} rx="10" fill="none" stroke={gravure} strokeOpacity=".55" strokeWidth="4" strokeDasharray="12 10" />
      )}
    </svg>
  );
}
