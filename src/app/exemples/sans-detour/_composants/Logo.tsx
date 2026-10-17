/**
 * Le logo de Sans Détour : le nom, et une ligne droite qui file vers la droite —
 * le plus court chemin d'un point à un autre.
 */
export default function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg aria-hidden="true" viewBox="0 0 40 16" className="w-9 h-4 shrink-0">
        <circle cx="4" cy="8" r="3.2" fill={clair ? "#E8835F" : "#B5401F"} />
        <path d="M8 8h26m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="leading-none">
        <span className="block text-[19px] font-extrabold tracking-[-0.03em]">Sans Détour</span>
        <span className={`block text-[10px] font-semibold uppercase tracking-[0.2em] mt-1 ${clair ? "text-[#B9C2BD]" : "text-[var(--doux)]"}`}>
          Ostéopathie
        </span>
      </span>
    </span>
  );
}
