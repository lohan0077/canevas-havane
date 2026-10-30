"use client";

import { useState } from "react";

const PLANS = [
  { heure: "14 h 10", texte: "L'arche de fleurs n'est pas là.", note: "Le camion a pris la mauvaise route. On appelle, on attend." },
  { heure: "14 h 25", texte: "Plan B : on monte l'arche nous-mêmes.", note: "Les fleurs arrivent, les mains aussi." },
  { heure: "14 h 40", texte: "Arche montée.", note: "Quinze minutes d'avance sur les invités." },
  { heure: "15 h 00", texte: "Les mariés n'ont rien vu.", note: "C'est tout le métier." },
];

/**
 * Un épisode des coulisses, comme on le publierait : quatre plans qu'on fait défiler
 * d'un toucher. C'est un exemple écrit pour la démonstration — aucun vrai mariage,
 * aucun prestataire nommé. Les vrais épisodes ne sortent qu'avec l'accord écrit des mariés.
 */
export default function Coulisses() {
  const [plan, setPlan] = useState(0);
  const p = PLANS[plan];
  return (
    <figure className="mx-auto w-full max-w-[340px] space-y-3">
      <button
        type="button"
        onClick={() => setPlan((plan + 1) % PLANS.length)}
        aria-label={`Plan ${plan + 1} sur ${PLANS.length} : passer au suivant`}
        className="relative block aspect-[9/16] w-full overflow-hidden rounded-[28px] bg-[var(--sombre)] text-left text-[var(--sur-sombre)] shadow-[0_40px_80px_-40px_rgba(25,26,40,0.7)] transition-transform duration-300 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--encre)]"
      >
        <span aria-hidden="true" className="absolute inset-x-4 top-4 flex gap-1.5">
          {PLANS.map((_, i) => <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= plan ? "bg-[#FFC61A]" : "bg-[#45465E]"}`} />)}
        </span>
        <span className="absolute left-5 top-10 text-[13px] font-medium text-[#C9C8D8]">Épisode d&apos;exemple</span>
        {/* L'arche, dessinée : absente, puis montée moitié par moitié, puis fleurie. */}
        <svg aria-hidden="true" viewBox="0 0 200 170" className="absolute left-1/2 top-[68px] w-[62%] -translate-x-1/2">
          <path d="M40 165 V80 A60 60 0 0 1 160 80 V165" fill="none" stroke="#45465E" strokeWidth="3" strokeDasharray="6 7" />
          <path d="M40 165 V80 A60 60 0 0 1 100 20" fill="none" stroke="#FFC61A" strokeWidth="4" strokeLinecap="round" className="transition-opacity duration-500" style={{ opacity: plan >= 1 ? 1 : 0 }} />
          <path d="M100 20 A60 60 0 0 1 160 80 V165" fill="none" stroke="#FFC61A" strokeWidth="4" strokeLinecap="round" className="transition-opacity duration-500" style={{ opacity: plan >= 2 ? 1 : 0 }} />
          <g className="transition-opacity duration-500" style={{ opacity: plan >= 2 ? 1 : 0 }}>
            {[[40, 120], [44, 70], [62, 38], [100, 20], [138, 38], [156, 70], [160, 120]].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <circle cx={x - 5} cy={y} r="6" fill="#B98B95" />
                <circle cx={x + 5} cy={y + 3} r="5" fill="#F2F0F6" />
                <circle cx={x} cy={y - 5} r="4" fill="#FFC61A" />
              </g>
            ))}
          </g>
          <line x1="20" y1="166" x2="180" y2="166" stroke="#45465E" strokeWidth="2" />
        </svg>
        {/* Le texte de chaque plan entre en glissant ; la clé rejoue l'entrée à chaque toucher. */}
        <span key={plan} className="esp-ligne absolute inset-x-5 bottom-20 space-y-3">
          <span className="block font-[family-name:var(--titres)] text-5xl italic text-[#FFC61A] tabular-nums">{p.heure}</span>
          <span className="block font-[family-name:var(--titres)] text-[34px] leading-[1.05]">{p.texte}</span>
          <span className="block text-[15px] text-[#C9C8D8]">{p.note}</span>
        </span>
        <span className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 text-[13px]">
          <span className="font-semibold">Les coulisses d’Et s’il pleut</span>
          <span className="text-[#C9C8D8]">Touche pour la suite</span>
        </span>
      </button>
      <figcaption className="text-sm leading-relaxed text-[var(--doux)]">
        Exemple écrit pour la démonstration : aucun vrai mariage, aucun prestataire nommé. Les vrais épisodes ne se publient qu&apos;avec l&apos;accord écrit des mariés.
      </figcaption>
    </figure>
  );
}
