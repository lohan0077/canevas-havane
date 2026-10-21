import { TEINTES, type Arbre } from "./donnees";

/** Le monogramme : deux cerises sur une même queue. */
export function Monogramme({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 6 C 18 14, 13 18, 12 25" fill="none" stroke="#3F5B2C" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 6 C 22 14, 27 19, 28 24" fill="none" stroke="#3F5B2C" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 6 C 25 3, 31 5, 33 9 C 28 10, 23 9, 20 6 Z" fill="#3F5B2C" />
      <circle cx="12" cy="29" r="7" fill="#B3202E" />
      <circle cx="28" cy="28" r="7" fill="#9E1B2A" />
      <circle cx="9.5" cy="26.5" r="1.8" fill="#F8F1E6" opacity="0.7" />
      <circle cx="25.5" cy="25.5" r="1.8" fill="#F8F1E6" opacity="0.7" />
    </svg>
  );
}

/** Un fruit dessiné, pour les cartes du catalogue (ornement). */
export function Fruit({ fruit, className = "w-24 h-24" }: { fruit: Arbre["fruit"]; className?: string }) {
  const t = TEINTES[fruit];
  const feuille = <path d="M50 22 C 60 10, 76 10, 82 16 C 72 24, 60 26, 50 22 Z" fill="#4E6B34" />;
  const queue = <path d="M50 34 C 50 26, 48 20, 46 14" fill="none" stroke="#5A4030" strokeWidth="3" strokeLinecap="round" />;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {fruit === "cerise" && (
        <>
          <path d="M52 12 C 46 30, 34 40, 30 56" fill="none" stroke="#5A4030" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M52 12 C 58 30, 66 42, 68 54" fill="none" stroke="#5A4030" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M52 12 C 62 4, 76 6, 80 12 C 70 16, 60 16, 52 12 Z" fill="#4E6B34" />
          <circle cx="30" cy="66" r="15" fill={t.fruit} />
          <circle cx="68" cy="64" r="15" fill={t.fruit} />
          <circle cx="25" cy="60" r="4" fill={t.reflet} />
          <circle cx="63" cy="58" r="4" fill={t.reflet} />
        </>
      )}
      {(fruit === "pomme" || fruit === "abricot" || fruit === "prune") && (
        <>
          {queue}
          {feuille}
          <path
            d={fruit === "prune" ? "M50 34 C 74 32, 80 52, 74 70 C 68 86, 32 88, 26 70 C 20 52, 28 34, 50 34 Z" : "M50 38 C 62 28, 86 34, 84 58 C 82 80, 64 90, 50 84 C 36 90, 18 80, 16 58 C 14 34, 38 28, 50 38 Z"}
            fill={t.fruit}
          />
          <ellipse cx="34" cy="54" rx="7" ry="10" fill={t.reflet} opacity="0.75" />
          {fruit === "abricot" && <path d="M52 42 C 48 56, 48 70, 52 82" fill="none" stroke="#C1661A" strokeWidth="2" />}
        </>
      )}
      {fruit === "poire" && (
        <>
          {queue}
          {feuille}
          <path d="M50 32 C 60 32, 62 46, 66 54 C 76 64, 74 88, 50 88 C 26 88, 24 64, 34 54 C 38 46, 40 32, 50 32 Z" fill={t.fruit} />
          <ellipse cx="40" cy="66" rx="6" ry="10" fill={t.reflet} opacity="0.8" />
        </>
      )}
      {fruit === "figue" && (
        <>
          {queue}
          {feuille}
          <path d="M50 30 C 58 30, 60 40, 66 48 C 80 60, 74 88, 50 88 C 26 88, 20 60, 34 48 C 40 40, 42 30, 50 30 Z" fill={t.fruit} />
          <path d="M44 84 C 46 70, 46 56, 48 44" fill="none" stroke={t.reflet} strokeWidth="2" />
          <path d="M56 84 C 56 72, 58 60, 58 48" fill="none" stroke={t.reflet} strokeWidth="2" />
        </>
      )}
    </svg>
  );
}
