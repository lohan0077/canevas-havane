"use client";

import { useId, useState } from "react";
import { MONTURES, plateauPour, type Choix } from "./donnees";
import Lunettes from "./Lunettes";

/**
 * Le plateau de bois et ses douze montures, avec le chevalet au prénom posé devant.
 * Le prénom se tape ici et ne va nulle part : il s'écrit sur le chevalet, c'est tout.
 */
export default function Plateau({
  choix,
  prenom: prenomExterne,
  creneau = "samedi · 10 h",
  saisie = true,
}: {
  choix?: Choix;
  prenom?: string;
  creneau?: string;
  saisie?: boolean;
}) {
  const id = useId();
  const [interne, setInterne] = useState("");
  const prenom = (prenomExterne ?? interne).trim();
  const montures = choix ? plateauPour(choix) : MONTURES.slice(0, 12);

  return (
    <div className="space-y-5">
      <figure className="relative pb-10" data-film="plateau">
        <div
          className="rounded-[22px] p-3 sm:p-4 shadow-[0_30px_50px_-30px_rgba(28,42,48,0.6)]"
          style={{ background: "repeating-linear-gradient(92deg, #9C6B43 0 7px, #A87650 7px 15px, #93623C 15px 22px)" }}
        >
          <ul className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 rounded-[14px] bg-[#EFE6DA] p-2 sm:p-3">
            {montures.map((m) => (
              <li key={m.id} className="grid aspect-[4/3] place-items-center rounded-lg bg-[#F8F3EC] px-2 shadow-[inset_0_-2px_0_rgba(0,0,0,0.06)]">
                <Lunettes forme={m.forme} couleur={m.couleur} className="w-full max-w-[110px]" titre={`${m.nom}, ${m.matiere.toLowerCase()}`} />
              </li>
            ))}
          </ul>
        </div>
        <figcaption className="absolute -bottom-1 right-4 sm:right-8 rotate-[-3deg] rounded-xl bg-[var(--carte)] px-5 py-3 text-center shadow-[0_14px_30px_-12px_rgba(28,42,48,0.55)] border-t-4 border-[var(--accent)]">
          <span className="block font-[family-name:var(--titres)] text-3xl italic leading-none">{prenom || "Camille"}</span>
          <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">{creneau}</span>
        </figcaption>
      </figure>

      {saisie && (
        <div className="space-y-2">
          <label htmlFor={id} className="block text-sm font-semibold">
            Écris ton prénom : il se pose sur le chevalet
          </label>
          <input
            id={id}
            type="text"
            maxLength={20}
            autoComplete="off"
            value={interne}
            onChange={(e) => setInterne(e.target.value)}
            placeholder="Camille"
            className="w-full rounded-xl border border-[var(--trait)] bg-[var(--carte)] px-4 py-3 text-lg outline-none focus:border-[var(--accent)]"
          />
          <p className="text-xs text-[var(--doux)]">Démonstration : ton prénom reste sur ton écran, rien n&apos;est envoyé.</p>
        </div>
      )}
    </div>
  );
}
