import styles from "./Cadran.module.css";

// Cinquante graduations, arrondies : le serveur et le navigateur écrivent la même valeur.
const GRADUATIONS = Array.from({ length: 50 }, (_, i) => {
  const a = (i / 50) * 2 * Math.PI - Math.PI / 2;
  const r1 = i % 5 === 0 ? 452 : 466;
  return {
    i,
    x1: (500 + r1 * Math.cos(a)).toFixed(2),
    y1: (500 + r1 * Math.sin(a)).toFixed(2),
    x2: (500 + 480 * Math.cos(a)).toFixed(2),
    y2: (500 + 480 * Math.sin(a)).toFixed(2),
  };
});

/**
 * Le grand cadran décoratif, derrière le titre du premier écran : cinquante
 * graduations, l'arc des cinquante minutes qui se dessine, et un point qui tourne.
 */
export default function Cadran({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 1000" aria-hidden="true" className={`pointer-events-none ${className}`}>
      <circle cx="500" cy="500" r="420" fill="none" stroke="#F4ECE2" strokeOpacity="0.08" strokeWidth="1.5" />
      {GRADUATIONS.map((g) => (
        <line key={g.i} x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} stroke="#F4ECE2" strokeOpacity={g.i % 5 === 0 ? 0.42 : 0.2} strokeWidth={g.i % 5 === 0 ? 3 : 1.5} strokeLinecap="round" />
      ))}
      <circle
        cx="500"
        cy="500"
        r="436"
        transform="rotate(-90 500 500)"
        fill="none"
        stroke="#C9A27E"
        strokeOpacity="0.55"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={100}
        className={styles.arc}
      />
      <g className={styles.tour}>
        <circle cx="500" cy="80" r="9" fill="#C9A27E" />
      </g>
    </svg>
  );
}
