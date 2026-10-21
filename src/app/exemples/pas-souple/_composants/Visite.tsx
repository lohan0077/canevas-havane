"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { photos } from "./donnees";

const PLANS = [
  { titre: "L'entrée", photo: photos.entree, texte: "Tu poses tes chaussures ici. Les tapis sont dans le panier, prends celui que tu veux.", debut: 0 },
  { titre: "Le vestiaire", photo: photos.vestiaire, texte: "Des casiers qui ferment à clé, des bancs, une douche. Personne ne te regarde te changer.", debut: 10 },
  { titre: "Bonjour !", photo: photos.studio, texte: "« Bonjour, moi c'est Jeanne. Installe-toi où tu veux, on commence dans cinq minutes. »", debut: 20 },
];

/**
 * La visite du studio avant de venir : l'entrée, le vestiaire, la prof qui dit
 * bonjour. Trente secondes en trois plans ; des photos à la place de la vidéo, le
 * studio étant fictif. Lecture automatique, ou un plan après l'autre.
 */
export default function Visite() {
  const [plan, setPlan] = useState(0);
  const [lecture, setLecture] = useState(false);

  useEffect(() => {
    if (!lecture) return;
    const minuteur = setInterval(() => setPlan((p) => Math.min(p + 1, PLANS.length - 1)), 4000);
    return () => clearInterval(minuteur);
  }, [lecture]);
  // Arrivée au dernier plan, la lecture s'arrête d'elle-même.
  const enLecture = lecture && plan < PLANS.length - 1;

  const p = PLANS[plan];
  const avance = ((plan + 1) / PLANS.length) * 100;
  return (
    <div data-film="visite" className="rounded-[30px] bg-[var(--carte)] p-3 space-y-4 scroll-mt-24">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[var(--sombre)]">
        {PLANS.map((x, i) => (
          <Image key={x.titre} src={x.photo.src} alt={x.photo.alt} fill sizes="(min-width: 1024px) 520px, 100vw" className={`object-cover transition-opacity duration-500 ${i === plan ? "opacity-100" : "opacity-0"}`} />
        ))}
        <div className="absolute left-3 right-3 bottom-3 rounded-[20px] bg-[var(--carte)] p-4 space-y-1">
          <p className="font-[family-name:var(--titres)] text-2xl">{p.titre}</p>
          <p className="text-[var(--doux)]">{p.texte}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (enLecture) return setLecture(false);
            if (plan === PLANS.length - 1) setPlan(0);
            setLecture(true);
          }}
          aria-label={enLecture ? "Mettre la visite en pause" : "Lire la visite"}
          className="absolute right-3 top-3 grid h-12 w-12 place-items-center rounded-full bg-[var(--carte)] text-lg"
        >
          <span aria-hidden="true">{enLecture ? "❚❚" : "▶"}</span>
        </button>
      </div>
      <div className="px-2 space-y-2">
        <div className="h-1.5 rounded-full bg-[var(--trait)]" aria-hidden="true">
          <div className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-500" style={{ width: `${avance}%` }} />
        </div>
        <p className="flex justify-between text-sm tabular-nums text-[var(--doux)]"><span>0:{String(p.debut).padStart(2, "0")}</span><span>0:30</span></p>
      </div>
      <div role="group" aria-label="Plans de la visite" className="grid grid-cols-3 gap-2 px-1 pb-1">
        {PLANS.map((x, i) => (
          <button
            key={x.titre}
            type="button"
            data-plan={i}
            aria-pressed={plan === i}
            onClick={() => { setLecture(false); setPlan(i); }}
            className={`rounded-full px-2 py-3 text-sm font-semibold ${plan === i ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "bg-[var(--fond)]"}`}
          >
            {x.titre}
          </button>
        ))}
      </div>
    </div>
  );
}
