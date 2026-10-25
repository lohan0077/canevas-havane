"use client";

import { useState } from "react";
import MentionCnaps from "./MentionCnaps";
import { TARIFS, euros, type TypeDeSite } from "./donnees";

const TYPES = Object.entries(TARIFS) as [TypeDeSite, (typeof TARIFS)[TypeDeSite]][];

/**
 * Le devis en trois questions : quoi, où, combien de nuits. La fourchette se calcule
 * ici, dans le navigateur ; rien n'est envoyé. HT pour un professionnel, TTC pour un
 * particulier (un mariage), et la page le dit. Un devis est un document contractuel :
 * il porte les mentions de l'art. L612-15.
 */
export default function Devis() {
  const [type, setType] = useState<TypeDeSite | null>(null);
  const [lieu, setLieu] = useState("");
  const [nuits, setNuits] = useState(1);
  const [pret, setPret] = useState(false);
  const [manque, setManque] = useState(false);
  const tarif = type ? TARIFS[type] : null;
  const rempli = ((nuits - 1) / 29) * 100;
  const unite = tarif?.unite === "soirée" ? (nuits > 1 ? "soirées" : "soirée") : nuits > 1 ? "nuits" : "nuit";

  const changer = () => {
    setPret(false);
    setManque(false);
  };

  return (
    <form
      data-film="devis"
      id="devis-3-questions"
      onSubmit={(e) => {
        e.preventDefault();
        if (!type || !lieu.trim()) {
          setManque(true);
          return;
        }
        setPret(true);
      }}
      className="rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] p-5 sm:p-8 space-y-7"
    >
      <fieldset className="space-y-3">
        <legend className="flex items-baseline gap-3 mb-3">
          <span className="font-[family-name:var(--titres)] text-3xl text-[var(--accent-texte)] tabular-nums">1</span>
          <span className="font-[family-name:var(--titres)] text-2xl">Quoi ?</span>
        </legend>
        <div className="grid grid-cols-2 gap-2.5">
          {TYPES.map(([cle, t]) => (
            <button
              key={cle}
              type="button"
              data-type={cle}
              aria-pressed={type === cle}
              onClick={() => {
                setType(cle);
                changer();
              }}
              className={`rounded-2xl border-2 px-3 py-3 text-left text-[15px] font-semibold leading-snug transition-colors ${type === cle ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--fond)] text-[var(--encre)]"}`}
            >
              {t.libelle}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="space-y-3">
        <label htmlFor="sh-lieu" className="flex items-baseline gap-3">
          <span className="font-[family-name:var(--titres)] text-3xl text-[var(--accent-texte)] tabular-nums">2</span>
          <span className="font-[family-name:var(--titres)] text-2xl">Où ?</span>
        </label>
        <input
          id="sh-lieu"
          name="lieu"
          type="text"
          autoComplete="off"
          placeholder="Ville ou arrondissement"
          value={lieu}
          onChange={(e) => {
            setLieu(e.target.value);
            changer();
          }}
          className="w-full rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 py-3.5 text-lg placeholder:text-[var(--doux)] focus:border-[var(--encre)] outline-none"
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="sh-nuits" className="flex items-baseline justify-between gap-3">
          <span className="flex items-baseline gap-3">
            <span className="font-[family-name:var(--titres)] text-3xl text-[var(--accent-texte)] tabular-nums">3</span>
            <span className="font-[family-name:var(--titres)] text-2xl">Combien de nuits ?</span>
          </span>
        </label>
        <p className="font-[family-name:var(--titres)] text-4xl tabular-nums" aria-live="polite">
          {nuits} <span className="text-xl italic">{unite}</span>
        </p>
        <input
          id="sh-nuits"
          type="range"
          min={1}
          max={30}
          value={nuits}
          onChange={(e) => {
            setNuits(Number(e.target.value));
            changer();
          }}
          className="w-full h-2.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--carte)] [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[var(--accent)] [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--carte)] [&::-moz-range-thumb]:border-[5px] [&::-moz-range-thumb]:border-[var(--accent)]"
          style={{ background: `linear-gradient(90deg, var(--accent) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
        <p className="flex justify-between text-xs text-[var(--doux)]"><span>1</span><span>30</span></p>
      </div>

      {manque && (
        <p role="alert" className="rounded-2xl bg-[var(--fond)] border-2 border-[var(--accent)] px-4 py-3 text-sm font-semibold">
          Il manque une réponse : dis-nous quoi veiller et où.
        </p>
      )}

      {pret && tarif ? (
        <div role="status" className="rounded-[22px] bg-[var(--fond)] border border-[var(--trait)] p-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Ta fourchette · exemple</p>
          <p className="font-[family-name:var(--titres)] text-3xl sm:text-4xl leading-tight tabular-nums">
            {euros(tarif.min * nuits)} – {euros(tarif.max * nuits)} {tarif.ttc ? "TTC" : "HT"}
          </p>
          <p className="text-[15px] leading-relaxed">
            {tarif.libelle} à {lieu.trim()}, {nuits} {unite} : {euros(tarif.min)} à {euros(tarif.max)} {tarif.ttc ? "TTC" : "HT"} par {tarif.unite}, {tarif.detail}.
          </p>
          <p className="text-sm text-[var(--doux)]">
            {tarif.ttc ? "Prix TTC : devis pour un particulier." : "Prix HT : devis pour un professionnel."} Le prix ferme vient après la visite du site, gratuite.
          </p>
          <p className="text-sm font-semibold">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
          <MentionCnaps compacte />
        </div>
      ) : (
        <button type="submit" className="w-full rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-4 text-lg font-bold">
          Voir ma fourchette
        </button>
      )}
    </form>
  );
}
