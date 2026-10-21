"use client";

import { useState } from "react";

const TYPES = ["Studio", "Deux pièces", "Trois pièces", "Maison"];
const MOMENTS = ["En semaine, le matin", "En semaine, l'après-midi", "Le samedi matin"];

/**
 * La demande de visite d'un propriétaire. Pas d'adresse demandée : la commune suffit
 * pour savoir si nous y allons, l'adresse se donne à la visite. Rien ne part : la
 * confirmation le dit.
 */
export default function Estimation() {
  const [type, setType] = useState<string | null>(null);
  const [moment, setMoment] = useState(MOMENTS[0]);
  const [envoye, setEnvoye] = useState(false);
  const [erreur, setErreur] = useState(false);

  return (
    <form
      data-film="estimation"
      onSubmit={(e) => {
        e.preventDefault();
        const donnees = new FormData(e.currentTarget);
        const ok = type && String(donnees.get("prenom") ?? "").trim() && String(donnees.get("telephone") ?? "").trim();
        setErreur(!ok);
        setEnvoye(Boolean(ok));
      }}
      className="space-y-6 rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7"
    >
      <fieldset className="space-y-3">
        <legend className="text-[14px] font-bold">Ton logement</legend>
        <div className="grid grid-cols-2 gap-2.5">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={type === t}
              onClick={() => setType(t)}
              className={`min-h-12 rounded-2xl border-2 px-3 text-[15px] font-bold ${type === t ? "border-[var(--encre)] bg-[var(--fond)]" : "border-[var(--trait)]"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block space-y-2">
        <span className="text-[14px] font-bold">Sa commune</span>
        <input name="commune" autoComplete="address-level2" placeholder="Lyon, Villeurbanne…" className="w-full rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 py-3 text-[16px] placeholder:text-[var(--doux)] focus:border-[var(--encre)] focus:outline-none" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-[14px] font-bold">Ton prénom</span>
          <input name="prenom" autoComplete="given-name" className="w-full rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 py-3 text-[16px] focus:border-[var(--encre)] focus:outline-none" />
        </label>
        <label className="block space-y-2">
          <span className="text-[14px] font-bold">Ton téléphone</span>
          <input name="telephone" type="tel" autoComplete="tel" className="w-full rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 py-3 text-[16px] focus:border-[var(--encre)] focus:outline-none" />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-[14px] font-bold">Quand te rappeler ?</span>
        <select
          value={moment}
          onChange={(e) => setMoment(e.target.value)}
          className="w-full rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 py-3 text-[16px] focus:border-[var(--encre)] focus:outline-none"
        >
          {MOMENTS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>

      {erreur && (
        <p role="alert" className="text-[14px] font-bold text-[#9B2C10]">
          Choisis le type de logement, et laisse ton prénom et ton téléphone.
        </p>
      )}

      {envoye ? (
        <div role="status" className="space-y-1 rounded-2xl border-2 border-[var(--accent)] bg-[var(--fond)] p-4">
          <p className="font-bold">Demande prête : {type?.toLowerCase()}, rappel {moment.toLowerCase()}.</p>
          <p className="text-[14px] text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        </div>
      ) : (
        <button type="submit" className="w-full rounded-full bg-[var(--encre)] px-6 py-4 text-[17px] font-bold text-[var(--fond)]">
          Demander la visite
        </button>
      )}

      <p className="text-[12px] leading-relaxed text-[var(--doux)]">
        Sur un vrai site, ces informations ne serviraient qu&apos;à te rappeler au moment choisi, puis
        seraient effacées si tu ne confies pas ton logement. Ici, elles ne quittent pas ton téléphone.
      </p>
    </form>
  );
}
