/**
 * Le premier repas vu d'en haut, comme la caméra le filme : la table n° 31, huit
 * assiettes, un plat au milieu. Un dessin, sans aucun visage — la famille est fictive.
 */
const PLACES: [number, number][] = [[18, 22], [40, 18], [62, 18], [84, 22], [18, 78], [40, 82], [62, 82], [84, 78]];

export default function Repas() {
  return (
    <figure className="space-y-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-[#2A190E] p-[6%]" aria-hidden="true">
        <div className="relative h-full w-full rounded-[4px] bg-[linear-gradient(100deg,#B98549,#D9AE78_40%,#C8955A_70%,#A97440)] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]">
          {[22, 48, 74].map((y) => (
            <span key={y} className="absolute left-0 right-0 h-px bg-[#8E5E2E]/40" style={{ top: `${y}%` }} />
          ))}
          {PLACES.map(([x, y]) => (
            <span
              key={`${x}-${y}`}
              className="absolute h-[22%] w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#E8DFD0] bg-[#F6F1E8] shadow-[0_3px_6px_rgba(0,0,0,0.25)]"
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          ))}
          <span className="absolute left-1/2 top-1/2 h-[34%] w-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7A8B6F] shadow-[0_4px_8px_rgba(0,0,0,0.3)]" />
          <span className="absolute left-1/2 top-1/2 h-[22%] w-[13%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C8553D]/80" />
        </div>
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#2A190E]/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F3EDE2]">
          <span className="h-2 w-2 rounded-full bg-[#E5533D]" />
          Premier repas
        </span>
      </div>
      <figcaption className="text-sm text-[var(--doux)]">Table n° 31, filmée d&apos;en haut · dessin d&apos;exemple : la famille M. est fictive.</figcaption>
    </figure>
  );
}
