import type { Forme } from "./donnees";

// Une monture dessinée, vue de face : la forme des verres, le pont, la couleur.
// Les mêmes dessins que les maquettes de la vidéo, en composant.
const VERRES: Record<Forme, React.ReactNode> = {
  ronde: (
    <>
      <circle cx="42" cy="36" r="27" />
      <circle cx="118" cy="36" r="27" />
    </>
  ),
  carree: (
    <>
      <rect x="12" y="12" width="60" height="46" rx="10" />
      <rect x="88" y="12" width="60" height="46" rx="10" />
    </>
  ),
  rectangle: (
    <>
      <rect x="10" y="18" width="62" height="36" rx="7" />
      <rect x="88" y="18" width="62" height="36" rx="7" />
    </>
  ),
  papillon: (
    <>
      <path d="M10 20 Q40 4 72 16 Q74 48 44 56 Q14 54 10 20 Z" />
      <path d="M150 20 Q120 4 88 16 Q86 48 116 56 Q146 54 150 20 Z" />
    </>
  ),
  pilote: (
    <>
      <path d="M12 16 Q42 8 72 16 Q72 52 46 58 Q14 56 12 16 Z" />
      <path d="M148 16 Q118 8 88 16 Q88 52 114 58 Q146 56 148 16 Z" />
    </>
  ),
  hexa: (
    <>
      <path d="M26 12 H58 L72 36 L58 60 H26 L12 36 Z" />
      <path d="M102 12 H134 L148 36 L134 60 H102 L88 36 Z" />
    </>
  ),
};

export default function Lunettes({ forme, couleur, className = "", titre }: { forme: Forme; couleur: string; className?: string; titre?: string }) {
  const fin = forme === "pilote" || forme === "hexa" || forme === "rectangle";
  return (
    <svg
      viewBox="0 0 160 72"
      className={className}
      role={titre ? "img" : undefined}
      aria-label={titre}
      aria-hidden={titre ? undefined : true}
      fill="rgba(255,255,255,0.35)"
      stroke={couleur}
      strokeWidth={fin ? 5 : 8}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {VERRES[forme]}
      <path d="M70 30 Q80 22 90 30" fill="none" />
    </svg>
  );
}
