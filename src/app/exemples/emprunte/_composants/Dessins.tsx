import type { Voleur } from "./donnees";

/** Un pull col rond, à plat, dessiné : le corps, les manches, les côtes du col et des poignets. */
export function Pull({ teinte, className = "", titre }: { teinte: string; className?: string; titre?: string }) {
  return (
    <svg viewBox="0 0 200 170" className={className} role={titre ? "img" : undefined} aria-label={titre} aria-hidden={titre ? undefined : true}>
      <path d="M62 18 C74 28 126 28 138 18 L176 36 C186 41 192 52 194 64 L198 152 L174 156 L166 80 L160 160 L40 160 L34 80 L26 156 L2 152 L6 64 C8 52 14 41 24 36 Z" fill={teinte} stroke="#1E2A44" strokeOpacity=".25" strokeWidth="2" />
      <path d="M66 20 C80 34 120 34 134 20" fill="none" stroke="#000" strokeOpacity=".22" strokeWidth="8" strokeLinecap="round" />
      {[46, 60, 74, 88, 102, 116, 130, 144, 158].map((x) => (
        <line key={x} x1={x - 4} y1="150" x2={x - 4} y2="160" stroke="#000" strokeOpacity=".2" strokeWidth="2" />
      ))}
      <line x1="3" y1="144" x2="26" y2="148" stroke="#000" strokeOpacity=".2" strokeWidth="6" />
      <line x1="174" y1="148" x2="197" y2="144" stroke="#000" strokeOpacity=".2" strokeWidth="6" />
    </svg>
  );
}

/**
 * Un voleur, dessiné comme dans la vidéo : un pull, une tête sans visage, un cadre de
 * photo instantanée. Aucune vraie personne — sur le vrai site, de vraies photos, chacune
 * avec l'accord écrit de la personne photographiée.
 */
export function Voleur({ v }: { v: Voleur }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[6px]" style={{ background: v.chien ? "#E8DFCC" : "#DCE3EC" }} aria-hidden="true">
      {v.chien ? (
        <>
          <span className="absolute left-1/2 top-[22%] h-[30%] w-[40%] -translate-x-1/2 rounded-[45%]" style={{ background: v.peau }} />
          <span className="absolute left-[24%] top-[18%] h-[18%] w-[13%] rotate-[-20deg] rounded-[50%]" style={{ background: "#5E4630" }} />
          <span className="absolute right-[24%] top-[18%] h-[18%] w-[13%] rotate-[20deg] rounded-[50%]" style={{ background: "#5E4630" }} />
        </>
      ) : (
        <span className="absolute left-1/2 top-[14%] h-[30%] w-[30%] -translate-x-1/2 rounded-full" style={{ background: v.peau }} />
      )}
      <span className="absolute -bottom-[6%] left-1/2 h-[52%] w-[84%] -translate-x-1/2 rounded-t-[42%]" style={{ background: v.pull }} />
      <span className="absolute bottom-[38%] left-1/2 h-[6%] w-[26%] -translate-x-1/2 rounded-b-full bg-black/20" />
    </div>
  );
}
