/** Une bougie dessinée : allumée (la personne est toujours là) ou éteinte (partie). */
export default function Bougie({ allumee, className = "" }: { allumee: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 60" className={className} aria-hidden="true">
      {allumee ? (
        <>
          <ellipse cx="12" cy="12" rx="9" ry="12" fill="#F2C14E" opacity="0.25" />
          <path d="M12 2 Q18 11 15 17 Q12 21 9 17 Q6 11 12 2 Z" fill="#F2A33C" />
          <path d="M12 9 Q15 13 13.5 16 Q12 18 10.5 16 Q9 13 12 9 Z" fill="#FFE08A" />
        </>
      ) : (
        <path d="M12 18 Q10 14 12 11 Q14 8 12 5" stroke="#8C8CA3" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}
      <rect x="11.2" y="17" width="1.6" height="5" fill="#22223B" />
      <rect x="7" y="21" width="10" height="38" rx="2" fill={allumee ? "#F2C14E" : "#C9C9DA"} />
      <path d="M7 28 L17 24 M7 38 L17 34 M7 48 L17 44" stroke={allumee ? "#E5674B" : "#A8A8BC"} strokeWidth="2.5" />
    </svg>
  );
}
