import styles from "./Anneau.module.css";

/** Les clés autour de l'anneau, de gauche à droite : code, sortie, [permis], nuit, autoroute. */
const POSITIONS: Record<string, { angle: number; numero: string }> = {
  code: { angle: 66, numero: "1" },
  sortie: { angle: 33, numero: "2" },
  permis: { angle: 0, numero: "C" },
  nuit: { angle: -33, numero: "3" },
  autoroute: { angle: -66, numero: "4" },
};

/**
 * Le trousseau dessiné : un anneau, cinq clés. Une clé allumée est moutarde, une clé
 * à venir n'est qu'un contour. La clé du permis, au centre, est plus grande. Purement
 * décoratif : l'état de chaque clé est dit en texte à côté (boutons du trousseau).
 */
export default function Anneau({ allumees, permis }: { allumees: string[]; permis: boolean }) {
  return (
    <svg viewBox="0 0 400 310" className="w-full h-auto" aria-hidden="true">
      <circle cx="200" cy="62" r="54" fill="none" stroke="var(--encre)" strokeWidth="7" />
      {Object.entries(POSITIONS).map(([id, p]) => {
        const grande = id === "permis";
        const allumee = grande ? permis : allumees.includes(id);
        const e = grande ? 1.25 : 1;
        return (
          <g key={id} transform={`translate(200 62) rotate(${p.angle}) translate(0 ${54 + 20 * e})`}>
            <g transform={`scale(${e})`}>
              <g className={`${allumee ? styles.allumee : ""} ${grande && permis ? styles.permis : ""}`}>
                {grande && permis && <circle r="46" className={styles.halo} />}
                <circle r="22" className={styles.corps} />
                <rect x="-5.5" y="19" width="11" height="96" rx="3" className={styles.corps} />
                <rect x="5" y="80" width="13" height="8" rx="1.5" className={styles.corps} />
                <rect x="5" y="97" width="9" height="8" rx="1.5" className={styles.corps} />
                <text y="7" textAnchor="middle" className={styles.numero}>{p.numero}</text>
              </g>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
