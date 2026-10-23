"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Le film d'un chantier : une vidéo muette qui tourne en boucle quand elle est à
 * l'écran, avec un vrai bouton lecture / pause. Elle ne démarre pas d'elle-même si le
 * visiteur a demandé moins d'animations. Servie depuis notre domaine.
 */
export default function VideoChantier({ src, poster, libelle }: { src: string; poster: string; libelle: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [lecture, setLecture] = useState(false);
  const voulue = useRef<boolean | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(([e]) => {
      const jouer = voulue.current ?? !reduit;
      if (e.isIntersecting && jouer) {
        v.muted = true;
        v.play().then(() => setLecture(true)).catch(() => undefined);
      } else {
        v.pause();
        setLecture(false);
      }
    });
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

  const basculer = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      voulue.current = true;
      v.muted = true;
      v.play().then(() => setLecture(true)).catch(() => undefined);
    } else {
      voulue.current = false;
      v.pause();
      setLecture(false);
    }
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-[var(--sombre)]">
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={libelle} className="h-full w-full object-cover" />
      <button
        type="button"
        onClick={basculer}
        className="absolute bottom-4 left-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--sombre)] px-4 font-[family-name:var(--titres)] text-[15px] font-bold text-[var(--sur-sombre)]"
      >
        <span aria-hidden="true">{lecture ? "❚❚" : "▶"}</span>
        {lecture ? "Pause" : "Lecture"}
      </button>
      <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-[var(--sombre)] px-3 py-1.5 text-[13px] font-bold text-[var(--sur-sombre)]">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#E5484D]" />
        Film du chantier
      </span>
    </div>
  );
}
