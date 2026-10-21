/**
 * Le logo de Tel Quel : le monogramme « TQ » dans un carré plein (jamais un cercle à
 * double filet : un sceau ferait croire à un agrément, décret n° 72-678, art. 92), et
 * le nom en DM Serif Display. Décoratif, le nom suit en texte.
 */
export default function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`grid h-9 w-9 place-items-center rounded-[10px] font-[family-name:var(--titres)] text-[15px] leading-none tracking-[0.04em] ${
          clair ? "bg-[#E3C88E] text-[#23413A]" : "bg-[var(--sombre)] text-[#E3C88E]"
        }`}
      >
        TQ
      </span>
      <span className={`font-[family-name:var(--titres)] text-[26px] leading-none ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--encre)]"}`}>
        Tel Quel
      </span>
    </span>
  );
}
