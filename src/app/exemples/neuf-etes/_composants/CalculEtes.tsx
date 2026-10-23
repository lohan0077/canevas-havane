"use client";

import { useState } from "react";
import Apparition from "../../_kit/Apparition";
import { MAJORITE } from "./donnees";
import { Monogramme, Soleil } from "./Blocs";

const LIBELLES = ["Premier enfant", "Deuxième enfant", "Troisième enfant", "Quatrième enfant"];

/** Un âge saisi, s'il est un entier entre 0 et 17 ; sinon rien. */
function age(saisie: string) {
  if (!/^\d{1,2}$/.test(saisie.trim())) return null;
  const n = Number(saisie);
  return n < MAJORITE ? n : null;
}

/** Le premier été à venir : celui de cette année tant que septembre n'est pas là. */
function premierEte() {
  const maintenant = new Date();
  return maintenant.getMonth() >= 8 ? maintenant.getFullYear() + 1 : maintenant.getFullYear();
}

type Resultat = { tous: number; plusJeune: number; nombre: number; depuis: number };

/**
 * L'outil de la marque, mis en scène comme une application : l'âge des enfants, et
 * le nombre d'étés qu'il reste avec eux à la maison — un par an jusqu'à leurs 18 ans.
 * Tout se calcule dans le navigateur : ni envoi, ni enregistrement.
 */
export default function CalculEtes() {
  const [saisies, setSaisies] = useState(["", ""]);
  const [resultat, setResultat] = useState<Resultat | null>(null);
  const [erreur, setErreur] = useState(false);

  const changer = (i: number, valeur: string) => {
    setSaisies(saisies.map((s, j) => (j === i ? valeur.replace(/\D/g, "").slice(0, 2) : s)));
  };
  const pas = (i: number, ecart: number) => {
    const actuel = age(saisies[i]) ?? (ecart > 0 ? -1 : 1);
    const suivant = Math.min(MAJORITE - 1, Math.max(0, actuel + ecart));
    changer(i, String(suivant));
  };

  const calculer = () => {
    const ages = saisies.map(age).filter((a): a is number => a !== null);
    if (ages.length === 0) {
      setErreur(true);
      setResultat(null);
      return;
    }
    setErreur(false);
    setResultat({
      tous: MAJORITE - Math.max(...ages),
      plusJeune: MAJORITE - Math.min(...ages),
      nombre: ages.length,
      depuis: premierEte(),
    });
  };

  return (
    <div data-film="app-etes" className="relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)] shadow-[0_50px_90px_-50px_rgba(13,52,70,0.9)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/15 px-6 py-4 sm:px-8">
        <span className="flex items-center gap-3">
          <Monogramme className="h-9 w-9 text-lg" />
          <span className="font-[family-name:var(--titres)] text-lg font-bold">Le calcul de l&apos;été</span>
        </span>
        <span className="rounded-full border border-white/25 px-3 py-1 text-[13px]">Rien n&apos;est envoyé</span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculer();
        }}
        className="space-y-4 px-6 pb-6 pt-6 sm:px-8"
      >
        {saisies.map((valeur, i) => (
          <div key={LIBELLES[i]} className="flex flex-col gap-3 rounded-[1.5rem] bg-white/[0.08] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <label htmlFor={`ne-age-${i + 1}`} className="font-[family-name:var(--titres)] text-[17px] font-bold">
              {LIBELLES[i]}
            </label>
            <span className="flex items-center justify-between gap-2 sm:justify-start">
              <button
                type="button"
                onClick={() => pas(i, -1)}
                aria-label={`Un an de moins, ${LIBELLES[i].toLowerCase()}`}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-2xl leading-none transition-colors hover:bg-white/10"
              >
                −
              </button>
              <input
                id={`ne-age-${i + 1}`}
                data-film={`age-${i + 1}`}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={2}
                placeholder="–"
                value={valeur}
                onChange={(e) => changer(i, e.target.value)}
                className="w-[4.5rem] rounded-2xl border-2 border-white/25 bg-[var(--sombre)] px-2 py-2 text-center font-[family-name:var(--titres)] text-3xl font-bold tabular-nums text-[var(--sur-sombre)] outline-none placeholder:text-[var(--sur-sombre)] focus:border-[var(--accent)]"
              />
              <button
                type="button"
                onClick={() => pas(i, 1)}
                aria-label={`Un an de plus, ${LIBELLES[i].toLowerCase()}`}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-2xl leading-none transition-colors hover:bg-white/10"
              >
                +
              </button>
              <span className="w-7 text-[15px]">ans</span>
            </span>
          </div>
        ))}

        {saisies.length < LIBELLES.length && (
          <button
            type="button"
            onClick={() => setSaisies([...saisies, ""])}
            className="font-[family-name:var(--titres)] text-[15px] font-bold text-[var(--accent)] underline underline-offset-4"
          >
            + Ajouter un enfant
          </button>
        )}

        <button
          type="submit"
          data-film="calculer"
          className="flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[var(--accent)] px-6 font-[family-name:var(--titres)] text-lg font-bold text-[var(--sur-accent)] transition-transform hover:scale-[1.01]"
        >
          Compter mes étés
        </button>
        <p className="text-center text-[14px]">Calcul fait sur ton téléphone · rien n&apos;est enregistré ni envoyé.</p>
        {erreur && (
          <p role="alert" className="rounded-2xl bg-[var(--fond)] px-4 py-3 text-center font-bold text-[#9B2C10]">
            Indique au moins un âge, entre 0 et 17 ans.
          </p>
        )}
      </form>

      {resultat && (
        <div role="status" data-film="resultat" className="border-t border-white/15 bg-[#0A2A39] px-6 pb-8 pt-7 sm:px-8">
          <p className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Il te reste</p>
          <Apparition as="p" de="zoom" className="mt-2 font-[family-name:var(--titres)] text-[clamp(4.5rem,13vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.015em] tabular-nums">
            {resultat.tous} {resultat.tous > 1 ? "étés" : "été"}
          </Apparition>
          <p className="mt-2 text-2xl">
            {resultat.nombre > 1 ? "avec eux, à la maison." : "avec lui ou avec elle, à la maison."}
          </p>
          {resultat.nombre > 1 && resultat.plusJeune !== resultat.tous && (
            <p className="mt-1 text-lg">Et {resultat.plusJeune} avec le plus jeune.</p>
          )}
          <ol className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5" aria-label="Les étés qui restent">
            {Array.from({ length: resultat.tous }, (_, i) => (
              <Apparition
                as="li"
                key={i}
                de="zoom"
                delai={150 + i * 80}
                className="flex items-center gap-2 rounded-2xl bg-[var(--accent)] px-3 py-2.5 font-[family-name:var(--titres)] text-[15px] font-bold text-[var(--sur-accent)]"
              >
                <Soleil className="h-4 w-4 [&_circle]:fill-[#12445A] [&_g]:stroke-[#12445A]" />
                Été {resultat.depuis + i}
              </Apparition>
            ))}
          </ol>
          <p className="mt-5 text-[15px] leading-relaxed">
            Un été par an, jusqu&apos;à leurs 18 ans. Après, ils reviendront peut-être l&apos;été.
          </p>
        </div>
      )}
    </div>
  );
}
