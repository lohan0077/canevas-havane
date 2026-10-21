"use client";

import { useEffect, useState } from "react";
import { PAPIERS, type IdPapier } from "./donnees";
import styles from "./Papier.module.css";

// L'éventail des papiers sortis de l'enveloppe : angle et décalage de chacun.
const EVENTAIL = [
  { r: -14, x: -78, y: 18 },
  { r: -5, x: -26, y: 0 },
  { r: 5, x: 26, y: 2 },
  { r: 14, x: 78, y: 20 },
];

/**
 * La boîte d'échantillons : on touche les papiers qu'on veut recevoir, puis
 * « Recevoir mes échantillons » — l'enveloppe s'ouvre et les papiers sortent en
 * éventail. Rien n'est envoyé, aucune adresse n'est demandée : c'est une
 * démonstration, et la confirmation le dit.
 */
export default function Echantillons() {
  const [choisis, setChoisis] = useState<IdPapier[]>([]);
  const [envoye, setEnvoye] = useState(false);
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!envoye) return;
    const t = setTimeout(() => setOuvert(true), 60);
    return () => clearTimeout(t);
  }, [envoye]);

  const basculer = (id: IdPapier) =>
    setChoisis((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const selection = PAPIERS.filter((p) => choisis.includes(p.id));

  return (
    <div data-film="echantillons" className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8 space-y-6">
      {!envoye ? (
        <>
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em]">Ta boîte d&apos;échantillons</p>
            <p className="whitespace-nowrap text-sm text-[var(--doux)] [font-variant-numeric:lining-nums]" aria-live="polite">{choisis.length}/4 papiers</p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {PAPIERS.map((p) => {
              const actif = choisis.includes(p.id);
              return (
                <li key={p.id}>
                  <button
                    id={`ag-papier-${p.id}`}
                    type="button"
                    aria-pressed={actif}
                    onClick={() => basculer(p.id)}
                    className={`w-full overflow-hidden rounded-2xl border-2 text-left transition-transform ${actif ? "-translate-y-1 border-[var(--accent)] shadow-[0_14px_24px_-16px_rgba(30,42,90,.6)]" : "border-[var(--trait)]"}`}
                  >
                    <span aria-hidden="true" className={`relative block h-24 sm:h-32 ${styles[p.id]}`}>
                      {actif && (
                        <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-[var(--accent)] text-base font-bold text-[var(--sur-accent)]">✓</span>
                      )}
                    </span>
                    <span className="block bg-[var(--carte)] px-3 py-2.5">
                      <span className="block font-[family-name:var(--titres)] text-2xl leading-tight">{p.nom}</span>
                      <span className="block text-sm text-[var(--doux)] [font-variant-numeric:lining-nums]">{p.grammage}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            id="ag-recevoir"
            type="button"
            disabled={choisis.length === 0}
            onClick={() => setEnvoye(true)}
            className="w-full min-h-[56px] rounded-full bg-[var(--accent)] px-6 text-lg font-bold text-[var(--sur-accent)] disabled:cursor-not-allowed disabled:bg-[var(--trait)] disabled:text-[var(--encre)]"
          >
            {choisis.length === 0 ? "Touche un papier pour commencer" : "Recevoir mes échantillons"}
          </button>
          <p className="text-sm text-[var(--doux)]">Par la poste, offerts. Une enveloppe par foyer.</p>
        </>
      ) : (
        <div role="status" className="space-y-6">
          <div aria-hidden="true" className="relative mx-auto h-[250px] max-w-[320px]">
            {selection.map((p, i) => {
              const e = EVENTAIL[Math.round((i * (EVENTAIL.length - 1)) / Math.max(1, selection.length - 1))] ?? EVENTAIL[1];
              return (
                <div
                  key={p.id}
                  className={`absolute left-1/2 top-4 h-[150px] w-[110px] -ml-[55px] rounded-[6px] border border-[rgba(30,42,90,.15)] shadow-md ${styles[p.id]} ${styles.feuille}`}
                  style={{
                    transform: ouvert ? `translate(${e.x}px, ${e.y}px) rotate(${e.r}deg)` : "translate(0, 90px) rotate(0deg)",
                    opacity: ouvert ? 1 : 0,
                    transitionDelay: `${i * 90}ms`,
                  }}
                >
                  <span className="absolute left-2 top-2 rounded bg-[rgba(255,253,248,.92)] px-1.5 text-[11px] font-bold text-[#1E2A5A] [font-variant-numeric:lining-nums]">
                    {p.nom}
                  </span>
                </div>
              );
            })}
            <div className={`absolute inset-x-0 bottom-0 h-[120px] rounded-[10px] ${styles.kraft} shadow-[0_18px_30px_-18px_rgba(30,42,90,.7)]`}>
              <div className="absolute inset-x-0 top-0 h-full [clip-path:polygon(0_0,50%_55%,100%_0)] bg-[rgba(90,60,30,.18)]" />
              <span className="absolute bottom-3 left-4 font-[family-name:var(--titres)] text-2xl italic text-[#1E2A5A]">À Garder</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-[family-name:var(--titres)] text-3xl leading-tight">Ta boîte est prête, par la poste.</p>
            <p className="text-lg [font-variant-numeric:lining-nums]">{selection.map((p) => `${p.nom} ${p.grammage}`).join(" · ")}</p>
            <p className="text-[var(--doux)]">Tu touches, tu compares chez toi. Et après, tu choisis.</p>
            <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEnvoye(false);
              setOuvert(false);
            }}
            className="text-sm font-semibold underline underline-offset-4"
          >
            Changer mes papiers
          </button>
        </div>
      )}
    </div>
  );
}
