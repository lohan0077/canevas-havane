"use client";

import { useState } from "react";
import { SAMEDIS } from "./donnees";

/** L'inscription à l'atelier du samedi : une date, un prénom. Rien n'est envoyé. */
export default function InscriptionSamedi() {
  const [date, setDate] = useState(0);
  const [prenom, setPrenom] = useState("");
  const [inscrit, setInscrit] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setInscrit(true);
      }}
      className="rounded-[14px] border-[3px] border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7 space-y-5"
    >
      <fieldset className="space-y-2">
        <legend className="font-[family-name:var(--titres)] text-xl font-bold">Ton samedi</legend>
        <div className="grid grid-cols-2 gap-2">
          {SAMEDIS.map((s, i) => (
            <button
              key={s.date}
              type="button"
              aria-pressed={date === i}
              onClick={() => { setDate(i); setInscrit(false); }}
              className={`rounded-md border-[3px] border-[var(--trait)] px-3 py-3 text-left ${date === i ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--carte)]"}`}
            >
              <span className="block text-sm">Samedi</span>
              <span className="block font-[family-name:var(--titres)] text-2xl font-bold [font-variant-numeric:lining-nums]">{s.court}</span>
              <span className="block text-sm">9 h 30 – 11 h 30</span>
            </button>
          ))}
        </div>
      </fieldset>
      <label className="block space-y-2">
        <span className="font-[family-name:var(--titres)] text-xl font-bold">Ton prénom</span>
        <input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          autoComplete="off"
          className="w-full rounded-md border-[3px] border-[var(--trait)] bg-[var(--carte)] px-4 py-3 text-lg"
        />
      </label>
      {inscrit ? (
        <div role="status" className="rounded-md bg-[var(--sombre)] p-4 text-[var(--sur-sombre)] space-y-1">
          <p className="font-[family-name:var(--titres)] text-2xl font-bold">
            C'est noté{prenom.trim() ? `, ${prenom.trim()}` : ""} : {SAMEDIS[date].date.toLowerCase()}, 9 h 30.
          </p>
          <p className="text-sm">Démonstration : rien n'est envoyé, rien n'est enregistré.</p>
        </div>
      ) : (
        <button type="submit" className="w-full rounded-md bg-[var(--accent)] py-4 font-[family-name:var(--titres)] text-2xl font-bold text-[var(--sur-accent)]">
          Je viens
        </button>
      )}
      <p className="text-sm text-[var(--doux)]">Gratuit, ouvert à tous, dix personnes par atelier. Dates réelles, atelier d'exemple.</p>
    </form>
  );
}
