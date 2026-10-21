"use client";

import { useState } from "react";

const PIECES = ["Studio", "2 pièces", "3 pièces", "4 pièces ou plus", "Maison"];

/**
 * « Parler de mon logement » : la commune et la taille suffisent, l'adresse se donne de
 * vive voix. Rien ne part : la confirmation le dit.
 */
export default function Contact() {
  const [pieces, setPieces] = useState(PIECES[1]);
  const [etat, setEtat] = useState<"saisie" | "erreur" | "pret">("saisie");

  return (
    <form
      data-film="contact"
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const ok = ["prenom", "telephone"].every((k) => String(d.get(k) ?? "").trim());
        setEtat(ok ? "pret" : "erreur");
      }}
      className="space-y-5 rounded-[28px] bg-[var(--carte)] p-5 text-[var(--encre)] sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-[14px] font-semibold">Ton prénom</span>
          <input name="prenom" autoComplete="given-name" className="w-full rounded-2xl border border-[var(--trait)] bg-[var(--fond)] px-4 py-3 text-[16px] focus:border-[var(--encre)] focus:outline-none" />
        </label>
        <label className="block space-y-2">
          <span className="text-[14px] font-semibold">Ton téléphone</span>
          <input name="telephone" type="tel" autoComplete="tel" className="w-full rounded-2xl border border-[var(--trait)] bg-[var(--fond)] px-4 py-3 text-[16px] focus:border-[var(--encre)] focus:outline-none" />
        </label>
      </div>
      <label className="block space-y-2">
        <span className="text-[14px] font-semibold">La commune du logement</span>
        <input name="commune" autoComplete="address-level2" className="w-full rounded-2xl border border-[var(--trait)] bg-[var(--fond)] px-4 py-3 text-[16px] focus:border-[var(--encre)] focus:outline-none" />
      </label>
      <fieldset className="space-y-2">
        <legend className="text-[14px] font-semibold">Sa taille</legend>
        <div className="flex flex-wrap gap-2">
          {PIECES.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={pieces === p}
              onClick={() => setPieces(p)}
              className={`min-h-11 rounded-full px-4 text-[14px] font-semibold ${pieces === p ? "bg-[var(--encre)] text-[var(--carte)]" : "border border-[var(--trait)] bg-[var(--fond)]"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>
      {etat === "erreur" && (
        <p role="alert" className="text-[14px] font-semibold text-[#9B2C10]">Laisse ton prénom et ton téléphone : on te rappelle.</p>
      )}
      {etat === "pret" ? (
        <div role="status" className="space-y-1 rounded-2xl border-2 border-[var(--accent)] bg-[var(--fond)] p-4">
          <p className="font-semibold">C&apos;est noté : {pieces.toLowerCase()}, on te rappelle.</p>
          <p className="text-[14px] text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        </div>
      ) : (
        <button type="submit" className="w-full rounded-full bg-[var(--accent)] px-6 py-4 text-[17px] font-semibold text-[var(--sur-accent)]">
          Être rappelé
        </button>
      )}
      <p className="text-[12px] leading-relaxed text-[var(--doux)]">
        Nous t&apos;appelons parce que tu le demandes ici, et seulement pour ton logement. Ici, rien ne
        quitte ton téléphone.
      </p>
    </form>
  );
}
