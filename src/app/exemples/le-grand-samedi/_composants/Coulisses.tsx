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
        className="relative block aspect-[9/16] w-full overflow-hidden rounded-[28px] bg-[var(--sombre)] text-left text-[var(--sur-sombre)]"
      >
        <span aria-hidden="true" className="absolute inset-x-4 top-4 flex gap-1.5">
          {PLANS.map((_, i) => <span key={i} className={`h-1 flex-1 rounded-full ${i <= plan ? "bg-[#D9B98A]" : "bg-[#5B4349]"}`} />)}
        </span>
        <span className="absolute left-5 top-10 text-xs font-semibold uppercase tracking-[0.18em] text-[#CDBDB5]">Épisode d&apos;exemple</span>
        {/* L'arche, dessinée : absente, puis montée moitié par moitié, puis fleurie. */}
        <svg aria-hidden="true" viewBox="0 0 200 170" className="absolute left-1/2 top-[68px] w-[62%] -translate-x-1/2">
          <path d="M40 165 V80 A60 60 0 0 1 160 80 V165" fill="none" stroke="#5B4349" strokeWidth="3" strokeDasharray="6 7" />
          <path d="M40 165 V80 A60 60 0 0 1 100 20" fill="none" stroke="#D9B98A" strokeWidth="4" strokeLinecap="round" className="transition-opacity duration-500" style={{ opacity: plan >= 1 ? 1 : 0 }} />
          <path d="M100 20 A60 60 0 0 1 160 80 V165" fill="none" stroke="#D9B98A" strokeWidth="4" strokeLinecap="round" className="transition-opacity duration-500" style={{ opacity: plan >= 2 ? 1 : 0 }} />
          <g className="transition-opacity duration-500" style={{ opacity: plan >= 2 ? 1 : 0 }}>
            {[[40, 120], [44, 70], [62, 38], [100, 20], [138, 38], [156, 70], [160, 120]].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <circle cx={x - 5} cy={y} r="6" fill="#B85C6B" />
                <circle cx={x + 5} cy={y + 3} r="5" fill="#F3E7DD" />
                <circle cx={x} cy={y - 5} r="4" fill="#D9B98A" />
              </g>
            ))}
          </g>
          <line x1="20" y1="166" x2="180" y2="166" stroke="#5B4349" strokeWidth="2" />
        </svg>
        <span className="absolute inset-x-5 bottom-20 space-y-3">
          <span className="block font-[family-name:var(--titres)] text-5xl italic text-[#D9B98A] tabular-nums">{p.heure}</span>
          <span className="block font-[family-name:var(--titres)] text-[34px] leading-[1.05]">{p.texte}</span>
          <span className="block text-[15px] text-[#CDBDB5]">{p.note}</span>
        </span>
        <span className="absolute inset-x-5 bottom-5 flex items-center justify-between text-sm">
          <span className="font-semibold">Le Grand Samedi · coulisses</span>
          <span className="text-[#CDBDB5]">touche pour la suite →</span>
        </span>
      </button>
      <figcaption className="text-sm leading-relaxed text-[var(--doux)]">
        Exemple écrit pour la démonstration : aucun vrai mariage, aucun prestataire nommé. Les vrais épisodes ne se publient qu&apos;avec l&apos;accord écrit des mariés.
      </figcaption>
    </figure>
  );
}
