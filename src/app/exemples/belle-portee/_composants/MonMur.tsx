"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DESSUS, DOSSIER } from "./donnees";
import styles from "./Portee.module.css";

const LARGEUR_MUR = 5; // mètres représentés par la largeur de l'image
const metres = (cm: number) => `${(cm / 100).toFixed(2).replace(".", ",")} m`;

/** Le mur d'exemple, dessiné : plâtre, plinthe, un cadre, un interrupteur. */
function MurExemple() {
  return (
    <div aria-hidden="true" className={`absolute inset-0 ${styles.platre}`}>
      <div className="absolute left-[9%] top-[18%] h-[26%] w-[20%] rounded-[3px] border-[5px] border-[#8A6A4A] bg-[#C9D6DE]" />
      <div className="absolute right-[10%] top-[44%] h-[7%] w-[4.5%] rounded-[3px] border-2 border-[#C7BCA8] bg-[#FBF8F2]" />
      <div className="absolute inset-x-0 bottom-0 h-[6%] bg-[#D9CDB7]" />
      <div className="absolute inset-x-0 bottom-[6%] h-[1.5%] bg-[#C7B99F]" />
    </div>
  );
}

/**
 * « Tu prends ton mur en photo. Tu dis ce qu'il y a au-dessus, et la largeur que tu
 * veux ouvrir. » La photo reste dans le navigateur (lue sur place, jamais envoyée) ;
 * on peut aussi essayer sur un mur d'exemple. Le résultat ne dit jamais oui : il dit
 * ce que la visite vérifiera.
 */
export default function MonMur() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [exemple, setExemple] = useState(false);
  const [prise, setPrise] = useState(0); // change à chaque photo : rejoue le flash
  const [dessus, setDessus] = useState<string | null>(null);
  const [largeur, setLargeur] = useState(100);
  const [touche, setTouche] = useState(false);
  const pret = photo !== null || exemple;
  const choixDessus = DESSUS.find((d) => d.id === dessus);
  const part = Math.min(96, (largeur / 100 / LARGEUR_MUR) * 100);

  const lire = (f: File | undefined) => {
    if (!f || !f.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = () => {
      setPhoto(String(r.result));
      setExemple(false);
      setPrise((p) => p + 1);
    };
    r.readAsDataURL(f);
  };

  return (
    <div data-film="mur" className="border-2 border-[var(--encre)] bg-[var(--carte)]">
      <div className="flex items-center justify-between border-b-2 border-[var(--encre)] px-4 py-2.5">
        <p className="text-xs font-bold uppercase tracking-[0.16em]">Ton projet</p>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{pret ? "1 · 2 · 3" : "1 · photo"}</p>
      </div>

      {/* La photo du mur, et l'ouverture voulue dessus. */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#2A3442]">
        {!pret && (
          <div className="absolute inset-0 grid place-items-center p-5">
            <div className="w-full max-w-xs space-y-3 text-center text-[#F3EEE4]">
              <p className="font-[family-name:var(--titres)] text-2xl font-bold uppercase leading-tight">Ton mur, en photo.</p>
              <label className="flex min-h-[52px] cursor-pointer items-center justify-center rounded-none bg-[var(--accent)] px-5 font-bold text-[var(--sur-accent)]">
                Prendre mon mur en photo
                <input type="file" accept="image/*" className="sr-only" onChange={(e) => lire(e.target.files?.[0])} />
              </label>
              <button
                id="bp-exemple"
                type="button"
                onClick={() => {
                  setExemple(true);
                  setPrise((p) => p + 1);
                }}
                className="min-h-[48px] w-full border-2 border-[#F3EEE4] px-5 font-semibold"
              >
                Utiliser un mur d&apos;exemple
              </button>
            </div>
          </div>
        )}
        {photo && <Image src={photo} alt="Ton mur" fill unoptimized sizes="(max-width: 640px) 100vw, 560px" className="object-cover" />}
        {exemple && !photo && <MurExemple />}
        {pret && (
          <>
            <div
              aria-hidden="true"
              className="absolute bottom-[6%] left-1/2 h-[72%] -translate-x-1/2 border-[3px] border-dashed border-[#F2B134] bg-[rgba(30,42,56,.72)] transition-[width] duration-150"
              style={{ width: `${part}%` }}
            >
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-[family-name:var(--titres)] text-xl font-bold text-[#F2B134]">{metres(largeur)}</span>
            </div>
            {touche && (
              <div
                aria-hidden="true"
                key={`poutre-${prise}`}
                className={`absolute left-1/2 h-[7%] -translate-x-1/2 bg-[#1E2A38] ${styles.poutre}`}
                style={{ bottom: "78%", width: `${Math.min(100, part + 10)}%` }}
              >
                <span className="absolute inset-0 grid place-items-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#F2B134]">Poutre à calculer</span>
              </div>
            )}
            <div key={`flash-${prise}`} aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-white ${styles.flash}`} />
          </>
        )}
      </div>

      <div className="space-y-5 p-4 sm:p-6">
        <fieldset className="space-y-2" disabled={!pret}>
          <legend className="text-sm font-bold uppercase tracking-[0.12em]">2 · Au-dessus de ce mur</legend>
          <div className="grid grid-cols-2 gap-2">
            {DESSUS.map((d) => (
              <button
                key={d.id}
                id={`bp-dessus-${d.id}`}
                type="button"
                aria-pressed={dessus === d.id}
                onClick={() => setDessus(d.id)}
                className={`min-h-[48px] border-2 px-2 text-sm font-semibold leading-tight transition-colors disabled:opacity-50 ${dessus === d.id ? "border-[var(--encre)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--fond)]"}`}
              >
                {d.libelle}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="block space-y-2">
          <span className="flex items-baseline justify-between gap-3">
            <span className="text-sm font-bold uppercase tracking-[0.12em]">3 · Largeur à ouvrir</span>
            <span className="font-[family-name:var(--titres)] text-2xl font-bold tabular-nums">{metres(largeur)}</span>
          </span>
          <input
            id="bp-largeur"
            type="range"
            min={80}
            max={400}
            step={10}
            value={largeur}
            disabled={!pret}
            onChange={(e) => {
              setLargeur(Number(e.target.value));
              setTouche(true);
            }}
            className="w-full accent-[#1E2A38] disabled:opacity-40"
          />
        </label>
        <div role="status" className="border-l-4 border-[var(--accent)] bg-[var(--fond)] p-4 space-y-1.5">
          {pret && (dessus || touche) ? (
            <>
              <p className="font-bold">Ce que la visite vérifiera</p>
              {choixDessus && <p className="text-[var(--doux)]">{choixDessus.note}</p>}
              {touche && <p className="text-[var(--doux)]">Sur {metres(largeur)}, la poutre et ses deux appuis : c&apos;est la note de calcul qui les fixera.</p>}
              <p className="text-sm font-semibold">Pas de oui à distance : on vient voir avant.</p>
            </>
          ) : (
            <p className="text-[var(--doux)]">Ta photo reste sur ton téléphone : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
          )}
        </div>
        <Link href={`${DOSSIER}/visite`} className="flex min-h-[52px] items-center justify-center bg-[var(--encre)] px-6 font-bold uppercase tracking-[0.08em] text-[var(--fond)]">
          Choisir ma date de visite
        </Link>
      </div>
    </div>
  );
}
