"use client";

import { useState } from "react";

const MAJORITE = 18;
const LIBELLES = ["Premier enfant", "Deuxième enfant", "Troisième enfant", "Quatrième enfant"];

/** Un âge saisi, s'il est un entier entre 0 et 17 ; sinon rien. */
function age(saisie: string) {
  if (!/^\d{1,2}$/.test(saisie.trim())) return null;
  const n = Number(saisie);
  return n < MAJORITE ? n : null;
}

/**
 * Le seul outil du site : l'âge des enfants, et le nombre d'étés qu'il reste avec eux
 * à la maison — un par an jusqu'à leurs 18 ans. Tout se calcule dans le navigateur :
 * il n'y a ni envoi, ni enregistrement, ni champ qui partirait quelque part.
 */
export default function CalculEtes() {
  const [saisies, setSaisies] = useState(["", ""]);
  const [resultat, setResultat] = useState<{ tous: number; plusJeune: number; nombre: number } | null>(null);
  const [erreur, setErreur] = useState(false);

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
    });
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculer();
        }}
        className="rounded-[28px] bg-white p-6 sm:p-8 shadow-[0_24px_60px_-34px_rgba(18,68,90,0.6)] space-y-5"
      >
        {saisies.map((valeur, i) => (
          <label key={LIBELLES[i]} className="block space-y-2">
            <span className="text-sm font-bold text-[#12445A]">{LIBELLES[i]}</span>
            <span className="flex items-center gap-3">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={2}
                placeholder="âge"
                value={valeur}
                onChange={(e) => setSaisies(saisies.map((s, j) => (j === i ? e.target.value : s)))}
                className="w-28 rounded-2xl border-[3px] border-[#D5E3E8] bg-[#FFF8EC] px-4 py-3 text-2xl font-bold text-[#12445A] placeholder:text-[#5B7480] focus:border-[#176F8C] outline-none"
              />
              <span className="text-[#12445A]">ans</span>
            </span>
          </label>
        ))}
        {saisies.length < LIBELLES.length && (
          <button
            type="button"
            onClick={() => setSaisies([...saisies, ""])}
            className="text-sm font-bold text-[#176F8C] underline underline-offset-4"
          >
            + Ajouter un enfant
          </button>
        )}
        <button
          type="submit"
          className="w-full rounded-full bg-[#12445A] px-6 py-4 text-lg font-bold text-[#FFF8EC] hover:bg-[#0D3546] transition-colors"
        >
          Calculer
        </button>
        <p className="text-xs text-[#5B7480]">Calcul fait sur ton téléphone · rien n&apos;est enregistré ni envoyé.</p>
        {erreur && (
          <p role="alert" className="text-sm font-bold text-[#9B2C10]">
            Indique au moins un âge, entre 0 et 17 ans.
          </p>
        )}
      </form>

      {resultat && (
        <div role="status" className="rounded-[28px] bg-[#12445A] text-[#FFF8EC] p-8 text-center space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F6C445]">Il te reste</p>
          <p className="font-[family-name:var(--ne-titres)] text-7xl font-bold leading-none tabular-nums">
            {resultat.tous} {resultat.tous > 1 ? "étés" : "été"}
          </p>
          <p className="text-xl">
            {resultat.nombre > 1 ? "avec eux, à la maison." : "avec lui ou avec elle, à la maison."}
          </p>
          {resultat.nombre > 1 && resultat.plusJeune !== resultat.tous && (
            <p className="text-[#D9E6EB]">Et {resultat.plusJeune} avec le plus jeune.</p>
          )}
          <p className="text-sm text-[#D9E6EB]">
            Un été par an, jusqu&apos;à leurs 18 ans. Après, ils reviendront peut-être l&apos;été.
          </p>
        </div>
      )}
    </div>
  );
}
