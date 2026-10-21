"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { MOIS, PHOTOS, type Mois } from "./donnees";
import styles from "./Calendrier.module.css";

const rienAEcouter = () => () => {};

/** La planche d'un mois sans photo : l'initiale de la fleur, tracée comme une gravure. */
function Planche({ mois }: { mois: Mois }) {
  return (
    <div className="relative grid h-full w-full place-items-center bg-[#E8E8E8]" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full text-[var(--trait)]" preserveAspectRatio="none">
        <path d="M0 100H200M100 0V200" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>
      <span className="relative font-[family-name:var(--titres)] text-[140px] italic leading-none text-[var(--accent-texte)]">{mois.fleur.charAt(0)}</span>
    </div>
  );
}

/**
 * Le calendrier des fleurs : douze onglets, une page par mois. On tourne les pages
 * — la page s'abaisse, la suivante apparaît. La fleur du mois, celles qui
 * l'accompagnent, celle qui arrive et celle qui s'en va. Rien n'est envoyé.
 */
export default function Calendrier({ depart = 10 }: { depart?: number }) {
  // Ouvert sur le mois en cours, lu chez le visiteur (la page est générée d'avance :
  // côté serveur, `depart`). Puis le mois que le visiteur choisit.
  const courant = useSyncExternalStore(rienAEcouter, () => new Date().getMonth() + 1, () => depart);
  const [choisi, setN] = useState<number | null>(null);
  const n = choisi ?? courant;
  const mois = MOIS[n - 1];
  const photo = mois.photo ? PHOTOS[mois.photo] : null;
  const aller = (k: number) => setN(((k - 1 + 12) % 12) + 1);

  return (
    <div className="space-y-4">
      <ol className="grid grid-cols-6 gap-1.5 sm:grid-cols-12" aria-label="Choisir un mois">
        {MOIS.map((m) => (
          <li key={m.n}>
            <button
              type="button"
              data-mois={m.n}
              aria-pressed={m.n === n}
              onClick={() => setN(m.n)}
              className={`w-full border py-2 text-center text-xs uppercase tracking-[0.08em] transition-colors ${
                m.n === n ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--accent)]"
              }`}
            >
              <span className="block font-[family-name:var(--titres)] text-lg normal-case tracking-normal">{String(m.n).padStart(2, "0")}</span>
              {m.court}
            </button>
          </li>
        ))}
      </ol>

      <div className="relative [perspective:1600px]">
        <div aria-hidden="true" className="absolute -top-2 left-0 right-0 z-10 flex justify-around px-8">
          {Array.from({ length: 9 }, (_, k) => <i key={k} className="h-4 w-1.5 rounded-full bg-[var(--encre)]" />)}
        </div>
        <article
          key={n}
          id="page-du-mois"
          aria-live="polite"
          className={`${styles.page} border border-[var(--trait)] bg-[var(--carte)] shadow-[0_30px_60px_-40px_rgba(46,22,32,0.6)]`}
        >
          <div className="grid gap-0 sm:grid-cols-[1fr_1fr]">
            <div className="relative h-56 overflow-hidden sm:h-auto sm:min-h-[420px]">
              {photo ? (
                <Image src={photo.src} alt={photo.alt} width={photo.largeur} height={photo.hauteur} sizes="(min-width: 640px) 360px, 100vw" className="h-full w-full object-cover bg-[#E8E8E8]" />
              ) : (
                <Planche mois={mois} />
              )}
              <p className="absolute bottom-2 left-3 text-[10px] uppercase tracking-[0.2em] text-[#4A3A40]">Fig. {String(n).padStart(2, "0")} — {mois.fleur}</p>
            </div>
            <div className="space-y-4 p-5 sm:p-8">
              <p className="flex items-baseline justify-between text-xs uppercase tracking-[0.22em] text-[var(--doux)]">
                <span>Ce qui fleurit en</span>
                <span>{String(n).padStart(2, "0")} / 12</span>
              </p>
              <h3 className="text-5xl sm:text-6xl">{mois.nom}</h3>
              <p className="font-[family-name:var(--titres)] text-3xl italic text-[var(--accent-texte)]">{mois.fleur}</p>
              <p className="text-sm leading-relaxed">{mois.mot}</p>
              <dl className="grid grid-cols-2 gap-3 border-t border-[var(--trait)] pt-4 text-sm">
                <div className="col-span-2">
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-[var(--doux)]">Aussi</dt>
                  <dd>{mois.aussi.join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-[var(--doux)]">Arrive</dt>
                  <dd>{mois.arrive}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-[var(--doux)]">S&apos;en va</dt>
                  <dd>{mois.part}</dd>
                </div>
              </dl>
            </div>
          </div>
        </article>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={() => aller(n - 1)} className="border border-[var(--encre)] px-4 py-3 text-xs uppercase tracking-[0.18em]">
          ← {MOIS[(n + 10) % 12].nom}
        </button>
        <button type="button" onClick={() => aller(n + 1)} className="border border-[var(--encre)] bg-[var(--encre)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[var(--fond)]">
          {MOIS[n % 12].nom} →
        </button>
      </div>
      <p className="text-xs leading-relaxed text-[var(--doux)]">
        Calendrier indicatif : une saison avance ou recule selon la région et l&apos;année. Chaque mois, il est confirmé avec les producteurs.
      </p>
    </div>
  );
}
