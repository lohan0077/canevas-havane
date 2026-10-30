"use client";

import { useState } from "react";

/** « 11/09/2027 » devient « 11.09.2027 » : l'étiquette se lit comme un faire-part. */
const enPoints = (saisie: string) => saisie.trim().replace(/\s*[/.-]\s*/g, ".");

/**
 * Les cent parapluies jaunes : les prénoms des mariés et la date, sur l'étiquette qui
 * pend à la poignée. On les tape, l'étiquette se remplit. Démonstration : rien n'est
 * envoyé, rien n'est commandé.
 */
export default function Parapluie() {
  const [un, setUn] = useState("");
  const [deux, setDeux] = useState("");
  const [date, setDate] = useState("");
  const noms = [un.trim(), deux.trim()].filter(Boolean).join(" & ");
  return (
    <div data-film="parapluie" className="grid gap-6 rounded-[1.75rem] border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_40px_80px_-50px_rgba(25,26,40,0.5)] sm:p-8 md:grid-cols-[1fr_1fr] md:items-center">
      <figure className="relative mx-auto w-full max-w-[320px]" aria-label="Aperçu du parapluie et de son étiquette">
        <svg viewBox="0 0 320 300" className="w-full" aria-hidden="true">
          <path d="M20 132C20 60 84 14 160 14s140 46 140 118c-12-12-30-12-38 0-8-12-27-12-35 0-8-12-27-12-35 0-8-12-27-12-35 0-8-12-27-12-35 0-8-12-27-12-35 0-8-12-26-12-38 0z" fill="#FFC61A" />
          <path d="M160 14C130 40 118 90 125 132M160 14c30 26 42 76 35 118M160 14C104 34 70 84 55 132M160 14c56 20 90 70 105 118" fill="none" stroke="#C99500" strokeWidth="2" />
          <path d="M160 6v8" stroke="#191A28" strokeWidth="4" strokeLinecap="round" />
          <path d="M160 132v118a18 18 0 0 1-36 0" fill="none" stroke="#191A28" strokeWidth="7" strokeLinecap="round" />
          <path d="M160 214c14 4 26 12 34 22" fill="none" stroke="#8E8AA8" strokeWidth="1.5" />
        </svg>
        {/* L'étiquette se balance à chaque lettre tapée (la clé rejoue l'animation). */}
        <figcaption
          key={`${noms}|${date}`}
          id="esp-etiquette"
          className="esp-balance absolute right-0 top-[72%] w-[52%] rotate-[4deg] rounded-md border border-[#C99500] bg-[var(--fond)] px-3 py-2.5 text-center shadow-[0_10px_20px_-12px_rgba(25,26,40,0.6)]"
        >
          <span aria-hidden="true" className="absolute -top-1.5 left-3 h-3 w-3 rounded-full border-2 border-[#8E8AA8] bg-[var(--carte)]" />
          <span className="block font-[family-name:var(--titres)] text-[19px] italic leading-tight break-words">{noms || "Vos prénoms"}</span>
          <span className="block text-xs tracking-[0.2em] text-[var(--doux)]">{enPoints(date) || "la date"}</span>
        </figcaption>
        <span className="absolute left-0 top-2 rounded-full bg-[var(--sombre)] px-3 py-1 font-[family-name:var(--titres)] text-lg italic text-[var(--sur-sombre)]">× 100</span>
      </figure>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1.5">
            <span className="block text-sm font-semibold">Un prénom</span>
            <input id="esp-prenom-1" type="text" autoComplete="off" maxLength={18} value={un} onChange={(e) => setUn(e.target.value)} placeholder="Camille" className="w-full rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-3 py-3 text-lg placeholder:text-[var(--doux)] outline-none transition-[border-color,box-shadow] duration-300 focus:border-[var(--encre)] focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_55%,transparent)]" />
          </label>
          <label className="space-y-1.5">
            <span className="block text-sm font-semibold">L&apos;autre</span>
            <input id="esp-prenom-2" type="text" autoComplete="off" maxLength={18} value={deux} onChange={(e) => setDeux(e.target.value)} placeholder="Yanis" className="w-full rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-3 py-3 text-lg placeholder:text-[var(--doux)] outline-none transition-[border-color,box-shadow] duration-300 focus:border-[var(--encre)] focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_55%,transparent)]" />
          </label>
        </div>
        <label className="block space-y-1.5">
          <span className="block text-sm font-semibold">La date du mariage</span>
          <input id="esp-date" type="text" inputMode="numeric" autoComplete="off" maxLength={10} placeholder="11/09/2027" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-3 py-3 text-lg placeholder:text-[var(--doux)] outline-none transition-[border-color,box-shadow] duration-300 focus:border-[var(--encre)] focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_55%,transparent)]" />
        </label>
        <p className="text-sm leading-relaxed text-[var(--doux)]">
          Les prénoms et la date vont sur l&apos;étiquette, pas sur la toile : le parapluie resservira. Démonstration : rien n&apos;est envoyé, rien n&apos;est commandé.
        </p>
      </form>
    </div>
  );
}
