/** Le logo de Premier Plongeon : deux vagues dans un rond. */
export default function Logo() {
  return (
    <span className="flex items-center gap-2.5 text-[#0F3442]">
      <svg viewBox="0 0 32 32" aria-hidden="true" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0">
        <circle cx="16" cy="16" r="15" fill="#0F3442" />
        <path d="M6 18c3 0 3-2.5 5-2.5S14 18 16 18s3-2.5 5-2.5 2 2.5 5 2.5" fill="none" stroke="#6FD3E8" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M6 23c3 0 3-2.5 5-2.5S14 23 16 23s3-2.5 5-2.5 2 2.5 5 2.5" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="font-[family-name:var(--pp-titres)] text-lg sm:text-xl font-semibold tracking-tight whitespace-nowrap">Premier Plongeon</span>
    </span>
  );
}
