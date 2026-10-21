"use client";

import { useState } from "react";
import BoiteTirages from "./BoiteTirages";

/** L'étiquette de la boîte : on écrit le nom, il s'affiche sur la boîte. Rien n'est envoyé. */
export default function AtelierBoite() {
  const [nom, setNom] = useState("");
  const [date, setDate] = useState("séance du 14 mars");

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <label className="block space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.18em]">Le nom sur l&apos;étiquette</span>
          <input
            type="text"
            value={nom}
            maxLength={22}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Famille M."
            className="w-full border-b-2 border-[var(--encre)] bg-transparent py-2 font-[family-name:var(--titres)] text-3xl italic outline-none placeholder:text-[var(--doux)] focus:border-[var(--accent)]"
          />
        </label>
        <fieldset className="space-y-2">
          <legend className="text-xs font-bold uppercase tracking-[0.18em]">La date sur l&apos;étiquette</legend>
          <div className="flex flex-wrap gap-2 pt-1">
            {["séance du 14 mars", "été 2027", "les 6 ans de Léo"].map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={date === d}
                onClick={() => setDate(d)}
                className={`rounded-full border px-4 py-2.5 text-sm font-bold ${date === d ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </fieldset>
        <p className="text-sm text-[var(--doux)]">
          L&apos;étiquette s&apos;écrit sur la boîte, ici, dans ton navigateur. Rien n&apos;est
          envoyé ni enregistré : c&apos;est une démonstration.
        </p>
      </form>
      <BoiteTirages etiquette={nom.trim() || "Famille M."} date={date} />
    </div>
  );
}
