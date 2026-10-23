"use client";

import { useState, type FormEvent } from "react";

export type Champ = {
  nom: string;
  libelle: string;
  type?: "text" | "tel" | "textarea";
  requis?: boolean;
  autocomplete?: string;
  aide?: string;
};

/**
 * Un formulaire de démonstration : il se remplit et se valide comme un vrai, puis
 * s'arrête là. Aucun `fetch`, aucune donnée ne quitte le navigateur — si un jour il
 * envoie pour de bon, il lui faudra une route serveur conforme et une mise à jour de
 * /confidentialite dans le même commit.
 */
export default function Formulaire({
  champs,
  bouton,
  confirmation,
}: {
  champs: Champ[];
  bouton: string;
  confirmation: string;
}) {
  const [envoye, setEnvoye] = useState(false);

  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnvoye(true);
  };

  if (envoye) {
    return (
      <div className="space-y-2 rounded-[2rem] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)]" role="status">
        <p className="font-[family-name:var(--titres)] text-xl font-normal text-[var(--accent)]">{confirmation}</p>
        <p>Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        <button type="button" onClick={() => setEnvoye(false)} className="pt-2 text-[15px] font-bold underline underline-offset-4">
          Revenir au formulaire
        </button>
      </div>
    );
  }

  const classeChamp =
    "w-full rounded-2xl border-2 border-[var(--trait)] bg-[var(--carte)] px-4 py-3.5 text-[var(--encre)] focus:border-[var(--accent-texte)] focus:outline-none transition-colors";

  return (
    <form onSubmit={soumettre} className="space-y-5 rounded-[2rem] border border-[var(--trait)] bg-[var(--fond)] p-6 sm:p-8">
      {champs.map((c) => (
        <label key={c.nom} className="block space-y-2">
          <span className="block font-[family-name:var(--titres)] text-[15px] font-normal">
            {c.libelle}
            {c.requis ? "" : " (facultatif)"}
          </span>
          {c.type === "textarea" ? (
            <textarea name={c.nom} required={c.requis} rows={4} className={classeChamp} />
          ) : (
            <input name={c.nom} type={c.type ?? "text"} required={c.requis} autoComplete={c.autocomplete} className={classeChamp} />
          )}
          {c.aide && <span className="block text-[15px] text-[var(--doux)]">{c.aide}</span>}
        </label>
      ))}
      <button
        type="submit"
        className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-[var(--sombre)] px-7 font-[family-name:var(--titres)] text-lg font-normal text-[var(--sur-sombre)] sm:w-auto"
      >
        {bouton}
      </button>
      <p className="text-[15px] text-[var(--doux)]">Site de démonstration : ce formulaire n&apos;envoie rien.</p>
    </form>
  );
}
