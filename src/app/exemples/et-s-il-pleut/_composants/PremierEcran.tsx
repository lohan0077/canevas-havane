"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

// Le premier écran d'« Et s'il pleut » : la cérémonie sous la pluie, en 3D, chargée à
// la demande. En attendant (ou sans WebGL), l'affiche, qui est une image de la même
// scène, tient la place. Le titre et le bouton passent par-dessus, sur un voile qui
// garantit leur contraste quel que soit le moment de l'animation.

const Ceremonie3D = dynamic(() => import("./Ceremonie3D"), { ssr: false, loading: () => null });

const MOINS = "(prefers-reduced-motion: reduce)";
const surveiller = (rappel: () => void) => {
  const mq = window.matchMedia(MOINS);
  mq.addEventListener("change", rappel);
  return () => mq.removeEventListener("change", rappel);
};

export default function PremierEcran({
  affiche,
  afficheFinale,
  children,
  action,
}: {
  /** L'image de la scène au début, parapluies fermés : elle attend la 3D. */
  affiche: React.ReactNode;
  /** La même, parapluies ouverts : elle reste si le navigateur ne sait pas faire de 3D. */
  afficheFinale: React.ReactNode;
  children: React.ReactNode;
  action: React.ReactNode;
}) {
  const [etat, setEtat] = useState<"attente" | "pret" | "indisponible">("attente");
  const [pause, setPause] = useState(false);
  const [rejouer, setRejouer] = useState(0);
  const reduit = useSyncExternalStore(surveiller, () => window.matchMedia(MOINS).matches, () => false);
  const pret = useCallback(() => setEtat("pret"), []);
  const indisponible = useCallback(() => setEtat("indisponible"), []);
  const commandes = etat === "pret" && !reduit;

  return (
    <section data-film="ceremonie" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      {etat === "indisponible" ? afficheFinale : affiche}
      {etat !== "indisponible" && (
        <div aria-hidden="true" className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out motion-reduce:transition-none ${etat === "pret" ? "opacity-100" : "opacity-0"}`}>
          <Ceremonie3D pause={pause} rejouer={rejouer} onPret={pret} onIndisponible={indisponible} />
        </div>
      )}

      {/* Les voiles : le haut sous l'en-tête, le bas sous le titre (plein à l'endroit du texte). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--sombre)_55%,transparent),transparent)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[64%] bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--sombre)_45%,transparent)_24%,color-mix(in_oklab,var(--sombre)_88%,transparent)_46%,var(--sombre)_70%)] lg:h-[72%] lg:bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--sombre)_50%,transparent)_30%,color-mix(in_oklab,var(--sombre)_88%,transparent)_62%,var(--sombre)_100%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden w-[70%] bg-[linear-gradient(90deg,color-mix(in_oklab,var(--sombre)_85%,transparent)_0%,color-mix(in_oklab,var(--sombre)_68%,transparent)_50%,transparent_100%)] lg:block" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-7 px-6 pb-12 pt-36 md:pb-16">
        {children}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {action}
          <div className={`flex gap-1.5 transition-opacity duration-700 ${commandes ? "opacity-100" : "pointer-events-none invisible opacity-0"}`}>
            <button
              type="button"
              data-film="rejouer"
              onClick={() => {
                setPause(false);
                setRejouer((n) => n + 1);
              }}
              aria-label="Rouvrir les parapluies, un à un"
              className="esp-rond"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12a8 8 0 1 0 2.4-5.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M4 4v4.5h4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" aria-pressed={pause} onClick={() => setPause((p) => !p)} aria-label={pause ? "Relancer la pluie" : "Mettre la pluie en pause"} className="esp-rond">
              {pause ? (
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
