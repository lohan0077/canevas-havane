import { HISTORIQUE } from "./donnees";

/** Le délai de pose, mois après mois : on le voit grimper au printemps (exemple). */
export default function Historique() {
  return (
    <figure className="space-y-4">
      <div className="flex items-end gap-2 sm:gap-4 h-64 border-b-2 border-[var(--encre)]" aria-hidden="true">
        {HISTORIQUE.map((h) => (
          <div key={h.mois} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
            <span className="text-xs sm:text-sm font-semibold text-center leading-tight">{h.valeur}</span>
            <span className={`w-full rounded-t-[10px] ${h.maintenant ? "bg-[#F2B6A0]" : "bg-[var(--accent)]"}`} style={{ height: `${h.hauteur * 75}%` }} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 sm:gap-4" aria-hidden="true">
        {HISTORIQUE.map((h) => (
          <span key={h.mois} className="flex-1 text-center text-xs sm:text-sm text-[var(--doux)]">{h.mois}</span>
        ))}
      </div>
      <figcaption className="text-sm text-[var(--doux)]">
        Délai de pose, l&apos;an dernier, d&apos;avril à juillet, et cette semaine (exemple) :{" "}
        {HISTORIQUE.map((h) => `${h.mois.toLowerCase()} ${h.valeur}`).join(", ")}. Le délai affiché est le délai réel, jamais gonflé.
      </figcaption>
    </figure>
  );
}
