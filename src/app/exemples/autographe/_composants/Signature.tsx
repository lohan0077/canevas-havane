import styles from "./Autographe.module.css";

// Quatre signatures dessinées, attribuées aux auteurs fictifs. Ce ne sont les
// signatures de personne : des tracés libres, comme une main pressée.
const TRACES = [
  "M20 78 C60 10 90 10 96 52 C100 84 70 92 74 60 C80 20 130 24 132 60 C134 88 160 70 170 46 C180 22 196 30 192 58 C190 82 214 84 230 56 C246 28 266 36 262 64 C258 92 300 80 320 52 C340 26 372 34 400 40",
  "M18 70 C40 20 70 16 66 60 C62 96 40 80 60 52 C84 20 110 40 112 66 C114 86 136 76 150 52 L160 70 C170 86 196 70 204 48 C210 30 232 36 228 62 C226 80 252 78 272 54 C292 30 330 40 352 58 C366 70 384 60 402 44",
  "M24 60 C30 24 64 18 70 46 C76 74 50 92 46 70 C42 46 92 30 118 56 C136 74 148 40 168 44 C190 48 176 84 200 82 C226 80 232 40 258 42 C284 44 270 82 300 78 C330 74 344 36 372 46 C388 52 394 62 404 58",
  "M16 82 C46 74 58 22 84 24 C108 26 84 86 104 84 C124 82 130 44 150 46 C172 48 160 82 182 80 C206 78 214 36 236 40 C262 44 246 86 274 80 C300 74 312 46 334 50 C356 54 360 72 400 62",
];

export default function Signature({ variante = 0, couleur = "currentColor", className = "", animee = false }: { variante?: number; couleur?: string; className?: string; animee?: boolean }) {
  return (
    <svg viewBox="0 0 420 110" aria-hidden="true" className={className}>
      <path
        d={TRACES[variante % TRACES.length]}
        pathLength={1000}
        className={animee ? styles.trait : undefined}
        fill="none"
        stroke={couleur}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
