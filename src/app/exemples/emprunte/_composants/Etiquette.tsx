"use client";

import { useState } from "react";

/**
 * L'étiquette cousue « À rendre à… » : on tape son prénom, elle se brode sous les yeux.
 * Dessous, l'étiquette de composition, obligatoire, reste à sa place. Rien n'est envoyé.
 */
export default function Etiquette() {
  const [prenom, setPrenom] = useState("");
  const propre = prenom.replace(/[^\p{L}\p{M}' -]/gu, "").slice(0, 14);

  return (
    <div className="space-y-6" data-film="etiquette">
      <label className="block space-y-2">
        <span className="text-sm font-bold uppercase tracking-[0.14em]">Ton prénom, brodé dans le col</span>
        <input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          maxLength={14}
          autoComplete="off"
          placeholder="Ton prénom"
          data-film="prenom"
          className="h-14 w-full rounded-full border-2 border-[var(--encre)] bg-[var(--carte)] px-6 text-xl outline-none placeholder:text-[var(--doux)] focus:border-[var(--accent)]"
        />
      </label>
      <div className="relative mx-auto max-w-sm rounded-[28px] bg-[repeating-linear-gradient(90deg,#1E2A44_0_6px,#24324F_6px_12px)] px-8 pb-10 pt-12" aria-live="polite">
        <div className="relative mx-auto w-[86%] rotate-[-2deg] rounded-[4px] bg-[#FBF7EF] px-5 py-4 text-center shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
          <span aria-hidden="true" className="absolute left-2 top-1/2 h-[70%] w-px -translate-y-1/2 border-l-2 border-dashed border-[#B5532E]/60" />
          <span aria-hidden="true" className="absolute right-2 top-1/2 h-[70%] w-px -translate-y-1/2 border-l-2 border-dashed border-[#B5532E]/60" />
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#1E2A44]">Emprunté</p>
          <p className="mt-1 text-sm italic text-[#4A5368]">À rendre à :</p>
          <p className="mt-1 min-h-[2.5rem] font-[family-name:var(--f-caveat)] text-4xl leading-none text-[#9A4423]" data-film="brode">
            {propre || "……"}
          </p>
        </div>
        <div className="mx-auto mt-5 w-[62%] rounded-[3px] bg-[#FFFFFF] px-3 py-2 text-center text-[11px] leading-snug text-[#1E2A44] shadow-[0_6px_12px_rgba(0,0,0,0.3)]">
          <p className="font-bold">100&nbsp;% laine</p>
          <p>Lavage à la main · 30 °C</p>
          <p>Taille M</p>
        </div>
      </div>
      <p className="text-sm text-[var(--doux)]">
        L&apos;étiquette « À rendre à » s&apos;ajoute à l&apos;étiquette de composition, qui reste cousue dessous. Avec un prénom
        brodé, le pull est personnalisé : il ne peut pas être renvoyé au titre de la rétractation.
      </p>
    </div>
  );
}
