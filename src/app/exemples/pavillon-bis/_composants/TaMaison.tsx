"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Curseur, Elevation, MAX_AJOUT, MAX_MAISON, Reponse } from "./Calcul";
import Maison from "./Maison";
import { DOSSIER, PROJETS, SEUIL, projetDe, type Modele } from "./donnees";

/**
 * Le seul outil de l'accueil, en deux temps. « Ta maison ressemble à laquelle ? » :
 * plain-pied, sur sous-sol ou à étage, et l'on voit ce qu'on a fait de la même — avant,
 * après, un rideau qu'on tire. Puis « Ta maison fait combien ? Tu agrandis de
 * combien ? » : le site calcule, et dit si l'architecte est obligatoire. Choisir une
 * maison règle les deux curseurs sur son projet. Tout se calcule dans le navigateur.
 */
export default function TaMaison() {
  const [choix, setChoix] = useState<Modele | null>(null);
  const [rideau, setRideau] = useState(100);
  const [balayage, setBalayage] = useState(false);
  const [tirage, setTirage] = useState(0);
  const [maison, setMaison] = useState(90);
  const [ajout, setAjout] = useState(0);
  const projet = choix ? projetDe(choix) : null;
  const total = maison + ajout;

  const choisir = (m: Modele) => {
    const p = projetDe(m);
    setChoix(m);
    setRideau(100);
    setBalayage(true);
    setTirage((n) => n + 1);
    setMaison(p.existant);
    setAjout(p.cree);
  };

  // Choisir une maison : on voit l'avant, puis le rideau découvre l'après.
  useEffect(() => {
    if (!tirage) return;
    const t = setTimeout(() => setRideau(44), 420);
    const u = setTimeout(() => setBalayage(false), 2100);
    return () => {
      clearTimeout(t);
      clearTimeout(u);
    };
  }, [tirage]);

  const etape = ajout > 0 ? 3 : choix ? 2 : 1;

  return (
    <div data-film="application" className="overflow-hidden rounded-2xl border border-[var(--trait)] bg-[var(--carte)] shadow-[0_30px_70px_-50px_rgba(21,24,28,0.45)]">
      {/* La barre de l'application : son nom, et les trois temps. */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--trait)] px-5 py-4 sm:px-8">
        <p className="font-[family-name:var(--texte)] text-[15px] font-medium">Ta maison, deuxième version</p>
        <ol className="flex gap-4 text-[13px] font-medium">
          {["Ta maison", "Tes m²", "La réponse"].map((e, i) => {
            const fait = i < etape;
            return (
              <li key={e} className={`border-b-2 pb-0.5 transition-colors duration-300 ${fait ? "border-[var(--accent)] text-[var(--encre)]" : "border-transparent text-[var(--doux)]"}`}>
                {i + 1}. {e}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        {/* 1. Ta maison ressemble à laquelle ? */}
        <div className="space-y-5 p-5 sm:p-8 lg:border-r lg:border-[var(--trait)]">
          <p className="font-[family-name:var(--titres)] text-[clamp(1.7rem,3vw,2.3rem)] font-medium leading-[1.05] tracking-[-0.035em]">
            Ta maison ressemble à <em className="font-[family-name:var(--serif)] text-[1.08em] font-normal tracking-normal text-[var(--accent-texte)]">laquelle&nbsp;?</em>
          </p>
          <div role="radiogroup" aria-label="Ta maison" data-film="modeles" className="grid grid-cols-3 gap-2.5">
            {PROJETS.map((p) => {
              const actif = choix === p.modele;
              return (
                <button
                  key={p.modele}
                  type="button"
                  role="radio"
                  aria-checked={actif}
                  data-film={`modele-${p.modele}`}
                  onClick={() => choisir(p.modele)}
                  className={`group rounded-2xl border-2 p-2 pb-3 text-center transition-all duration-300 ${
                    actif ? "-translate-y-1 border-[var(--encre)] bg-[var(--fond)] shadow-[0_8px_0_var(--accent)]" : "border-[var(--trait)] bg-[var(--fond)] hover:-translate-y-0.5 hover:border-[var(--encre)]"
                  }`}
                >
                  <Maison modele={p.modele} className="block h-auto w-full" />
                  <span className="mt-1.5 block whitespace-nowrap text-[13px] font-medium leading-tight sm:text-[15px]">{p.nom}</span>
                  <span className="block text-[12px] text-[var(--doux)]">{p.annee}</span>
                </button>
              );
            })}
          </div>

          {projet ? (
            <figure key={projet.modele} data-film="avant-apres" className="space-y-3">
              <div className="relative overflow-hidden rounded-2xl border-2 border-[var(--encre)] bg-[#DEDBD3]">
                <Maison modele={projet.modele} decor className="block h-auto w-full" libelle={`Avant, ${projet.annee} : ${projet.avant}`} />
                {/* Le rideau : l'après recouvre l'avant jusqu'à la ligne. */}
                <div className={`absolute inset-0 bg-[#F7E3DD] ${balayage ? "transition-[clip-path] duration-[1500ms] ease-[cubic-bezier(0.65,0,0.25,1)]" : ""}`} style={{ clipPath: `inset(0 0 0 ${rideau}%)` }}>
                  <Maison modele={projet.modele} apres decor className="block h-auto w-full" libelle={`Après : ${projet.apres}`} />
                </div>
                <span aria-hidden="true" className={`absolute inset-y-0 w-[3px] -translate-x-1/2 bg-[var(--encre)] ${balayage ? "transition-[left] duration-[1500ms] ease-[cubic-bezier(0.65,0,0.25,1)]" : ""}`} style={{ left: `${rideau}%` }}>
                  <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--encre)] text-[14px] text-[var(--fond)]">↔</span>
                </span>
                <span className="absolute left-3 top-3 rounded-full bg-[var(--sombre)] px-3 py-1 text-[12px] font-medium text-[var(--sur-sombre)]">Avant · {projet.annee}</span>
                <span className="absolute right-3 top-3 rounded-full bg-[var(--accent)] px-3 py-1 text-[12px] font-medium text-[var(--sur-accent)]">Après</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={rideau}
                  onChange={(e) => setRideau(Number(e.target.value))}
                  aria-label="Comparer l'avant et l'après"
                  className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                />
              </div>
              <figcaption className="grid gap-3 sm:grid-cols-2">
                <span className="block rounded-2xl bg-[var(--fond)] px-4 py-3">
                  <span className="block text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--accent-texte)]">Avant</span>
                  <span className="block text-[15px] font-medium leading-snug">{projet.avant}</span>
                </span>
                <span className="block rounded-2xl bg-[var(--fond)] px-4 py-3">
                  <span className="block text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--accent-texte)]">Après</span>
                  <span className="block text-[15px] font-medium leading-snug">{projet.apres}</span>
                </span>
              </figcaption>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--trait)] px-4 py-3">
                <span className="text-[15px]">
                  <strong className="font-medium">{projet.budget}</strong> · {projet.duree} · projet d&apos;exemple
                </span>
                <Link href={`${DOSSIER}/projets/${projet.slug}`} className="text-[15px] font-medium text-[var(--accent-texte)] underline-offset-4 hover:underline">
                  La page du projet →
                </Link>
              </div>
            </figure>
          ) : (
            <div className="grid place-items-center rounded-2xl border-2 border-dashed border-[var(--trait)] bg-[var(--fond)] px-5 py-10 text-center">
              <p className="max-w-xs text-[17px] text-[var(--doux)]">Touche la tienne : on te montre ce qu&apos;on a fait de la même.</p>
            </div>
          )}
        </div>

        {/* 2 et 3. Tes mètres carrés, et la réponse. */}
        <div data-film="calcul" className="space-y-5 border-t border-[var(--trait)] p-5 sm:p-8 lg:border-t-0">
          <p className="font-[family-name:var(--titres)] text-[clamp(1.7rem,3vw,2.3rem)] font-medium leading-[1.05] tracking-[-0.035em]">
            Architecte <em className="font-[family-name:var(--serif)] text-[1.08em] font-normal tracking-normal text-[var(--accent-texte)]">ou pas&nbsp;?</em>
          </p>
          <div className="relative rounded-2xl bg-[var(--fond)] px-3 pt-3">
            <Elevation maison={maison} ajout={ajout} />
            <p className="pointer-events-none absolute left-4 top-3 rounded-full bg-[var(--carte)] px-2.5 py-1 text-[12px] font-medium">Existant · {maison}&nbsp;m²</p>
            {ajout > 0 && (
              <p className="pointer-events-none absolute right-4 top-3 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[12px] font-medium text-[var(--sur-accent)]">+ {ajout}&nbsp;m²</p>
            )}
            <p className="pointer-events-none absolute bottom-1 text-[11px] font-medium" style={{ left: `calc(${((16 + (SEUIL / 350) * 288) / 320) * 100}% - 18px)` }}>
              150&nbsp;m²
            </p>
          </div>
          <Curseur etiquette="Ta maison fait combien ?" valeur={maison} min={30} max={MAX_MAISON} pas={5} changer={setMaison} film="maison" />
          <Curseur etiquette="Tu agrandis de combien ?" valeur={ajout} min={0} max={MAX_AJOUT} pas={1} changer={setAjout} film="ajout" />
          <p className={`flex items-baseline justify-between rounded-2xl px-4 py-3 transition-colors duration-500 ${total > SEUIL ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--fond)]"}`}>
            <span className="font-medium">Au total</span>
            <span data-film="total" className="font-[family-name:var(--titres)] text-[30px] font-medium tracking-[-0.03em] tabular-nums">{total}&nbsp;m²</span>
          </p>
          <Reponse maison={maison} ajout={ajout} />
          <p className="text-[13px] leading-relaxed text-[var(--doux)]">
            Surface de plancher, pour un particulier qui construit pour lui-même. Une société (SCI comprise)
            n&apos;a pas la dispense. Une première réponse : ton PLU peut changer la donne.
          </p>
        </div>
      </div>
    </div>
  );
}
