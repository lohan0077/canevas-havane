/**
 * La pastille ronde qui tourne lentement, comme une étiquette « promo » de marché —
 * sauf qu'elle ne promet rien : « Zéro kilo promis ». Décorative : masquée aux
 * lecteurs d'écran, immobile si le visiteur a demandé moins d'animations.
 */
export default function Pastille({ className = "", id = "rf-cercle" }: { className?: string; id?: string }) {
  return (
    <div aria-hidden="true" className={`grid h-32 w-32 place-items-center rounded-full bg-[#F2C94C] text-[#1F3B24] shadow-[0_16px_30px_-16px_rgba(0,0,0,0.5)] ${className}`}>
      <svg viewBox="0 0 120 120" className="absolute h-32 w-32 motion-safe:animate-[spin_18s_linear_infinite]">
        <defs>
          <path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text fontSize="10" fontWeight="700" fill="#1F3B24" textLength="270" lengthAdjust="spacing">
          <textPath href={`#${id}`} textLength="270" lengthAdjust="spacing">ZÉRO KILO PROMIS · ZÉRO KILO PROMIS ·</textPath>
        </text>
      </svg>
      <span className="font-[family-name:var(--titres)] text-3xl font-bold [font-variant-numeric:lining-nums]">0&nbsp;kg</span>
    </div>
  );
}
