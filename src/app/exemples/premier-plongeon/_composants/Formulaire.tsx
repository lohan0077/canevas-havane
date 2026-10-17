"use client";

import { useState, type FormEvent } from "react";
import { Plaque, styles as s } from "./Habillage";

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
      <Plaque fond="#0e1522" coupe={14}>
        <div className="p-6 space-y-2" role="status">
          <p className={`${s.technique} text-sm text-[#7edbee]`}>{confirmation}</p>
          <p className="text-[#b9c0cc]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
          <button type="button" onClick={() => setEnvoye(false)} className={`${s.lien} pt-2 text-sm font-bold`}>
            Revenir au formulaire
          </button>
        </div>
      </Plaque>
    );
  }

  const classeChamp =
    "w-full bg-[#070b13] px-4 py-3.5 text-white placeholder:text-[#8f98a8] border border-[rgba(255,255,255,0.18)] focus:border-[#e8d1cb] focus:outline-none transition-colors";

  return (
    <form onSubmit={soumettre} className="space-y-5">
      {champs.map((c) => (
        <label key={c.nom} className="block space-y-2">
          <span className={`${s.technique} block text-xs text-[#e8d1cb]`}>
            {c.libelle}
            {c.requis ? "" : " (facultatif)"}
          </span>
          {c.type === "textarea" ? (
            <textarea name={c.nom} required={c.requis} rows={4} className={classeChamp} />
          ) : (
            <input name={c.nom} type={c.type ?? "text"} required={c.requis} autoComplete={c.autocomplete} className={classeChamp} />
          )}
          {c.aide && <span className="block text-sm text-[#8f98a8]">{c.aide}</span>}
        </label>
      ))}
      <button type="submit" className={`${s.bouton} w-full sm:w-auto`}>
        {bouton}
      </button>
      <p className="text-sm text-[#8f98a8]">Site de démonstration : ce formulaire n&apos;envoie rien.</p>
    </form>
  );
}
