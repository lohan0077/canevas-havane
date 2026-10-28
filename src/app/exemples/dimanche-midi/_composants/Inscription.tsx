"use client";

import { useState } from "react";
import { dimanches } from "./donnees";

function Compteur({ libelle, valeur, min, max, changer }: { libelle: string; valeur: number; min: number; max: number; changer: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-[16px] font-semibold">{libelle}</span>
      <span className="flex items-center gap-3">
        <button type="button" aria-label={`${libelle} : un de moins`} disabled={valeur <= min} onClick={() => changer(valeur - 1)} className="grid h-10 w-10 place-items-center rounded-full border border-[var(--encre)] text-[20px] disabled:opacity-40">−</button>
        <span className="w-6 text-center font-[family-name:var(--titres)] text-[24px] tabular-nums" aria-live="polite">{valeur}</span>
        <button type="button" aria-label={`${libelle} : un de plus`} disabled={valeur >= max} onClick={() => changer(valeur + 1)} className="grid h-10 w-10 place-items-center rounded-full border border-[var(--encre)] text-[20px] disabled:opacity-40">+</button>
      </span>
    </div>
  );
}

/**
 * S'inscrire au dimanche des familles : un dimanche, combien de parents, combien
 * d'enfants. Les familles viennent au cabinet ; personne ne va chez elles (CMF L341-1,
 * al. 2). Aucun nom demandé, rien n'est envoyé.
 */
export default function Inscription() {
  const [date, setDate] = useState<string | null>(null);
  const [parents, setParents] = useState(2);
  const [enfants, setEnfants] = useState(2);
  const [confirme, setConfirme] = useState(false);
  const choisi = dimanches.find((d) => d.cle === date);

  return (
    <div data-film="inscription" className="space-y-5 rounded-[26px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7">
      <div className="space-y-2.5">
        <p className="text-[13px] font-semibold text-[var(--doux)]">Quel dimanche&nbsp;?</p>
        <div role="group" aria-label="Le dimanche" className="grid gap-2">
          {dimanches.map((d) => (
            <button
              key={d.cle}
              type="button"
              aria-pressed={date === d.cle}
              onClick={() => {
                setDate(d.cle);
                setConfirme(false);
              }}
              className={`flex min-h-12 items-center justify-between rounded-[14px] px-4 text-left text-[16px] font-semibold ${
                date === d.cle ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--trait)] bg-[var(--fond)]"
              }`}
            >
              {d.libelle}
              <span className="text-[14px] font-normal">midi – 15 h</span>
            </button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
        <Compteur libelle="Parents" valeur={parents} min={1} max={4} changer={(n) => { setParents(n); setConfirme(false); }} />
        <Compteur libelle="Enfants" valeur={enfants} min={0} max={6} changer={(n) => { setEnfants(n); setConfirme(false); }} />
      </div>
      {confirme && choisi ? (
        <div role="status" className="space-y-1 rounded-[16px] border-2 border-[var(--accent)] p-4">
          <p className="text-[17px] font-semibold">
            À {choisi.libelle.toLowerCase()}, midi : {parents} parent{parents > 1 ? "s" : ""}
            {enfants > 0 ? ` et ${enfants} enfant${enfants > 1 ? "s" : ""}` : ""}, au cabinet.
          </p>
          <p className="text-[14px] text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        </div>
      ) : (
        <button
          type="button"
          disabled={!choisi}
          onClick={() => setConfirme(true)}
          className="w-full rounded-full bg-[var(--accent)] px-6 py-3.5 text-[16px] font-semibold text-[var(--sur-accent)] disabled:cursor-not-allowed"
        >
          {choisi ? "Réserver notre place à table" : "Choisis un dimanche"}
        </button>
      )}
      <p className="text-[12px] leading-relaxed text-[var(--doux)]">
        Dates d&apos;exemple. Aucun nom n&apos;est demandé. Le dimanche se passe au cabinet : nous ne venons pas chez vous.
      </p>
    </div>
  );
}
