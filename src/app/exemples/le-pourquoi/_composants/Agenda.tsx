"use client";

import { useState } from "react";
import { seanceAdulte, semaine } from "./donnees";

const cle = (heure: string) => heure.replace(/\s/g, "");
const tot = (h: string) => h.startsWith("7 h");
const tard = (h: string) => h.startsWith("20 h") || h.startsWith("19 h");

/**
 * L'agenda du cabinet : on choisit le jour, puis l'heure, puis on laisse un nom et un
 * téléphone. Jamais de motif de consultation : c'est une donnée de santé, et le site
 * n'en a pas besoin. Rien ne quitte le navigateur.
 */
export default function Agenda({ depart = "mardi" }: { depart?: string }) {
  const [jourId, setJourId] = useState(depart);
  const [heure, setHeure] = useState<string | null>(null);
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [erreur, setErreur] = useState("");
  const [reserve, setReserve] = useState(false);
  const jour = semaine.find((j) => j.id === jourId) ?? semaine[1];

  const choisirJour = (id: string) => {
    setJourId(id);
    setHeure(null);
    setReserve(false);
    setErreur("");
  };

  const envoyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || tel.replace(/\D/g, "").length < 10) {
      setErreur("Indiquez un nom et un numéro de téléphone à dix chiffres.");
      return;
    }
    setErreur("");
    setReserve(true);
  };

  return (
    <div className="rounded-[2rem] bg-[var(--carte)] border border-[var(--trait)] p-5 sm:p-8 space-y-6 shadow-[0_30px_80px_-40px_rgba(19,42,36,0.45)]" data-film="agenda">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--doux)]">Semaine d&apos;exemple</p>
        <p className="text-xs font-semibold text-[var(--doux)]">Séance adulte · {seanceAdulte.duree}</p>
      </div>

      <div role="group" aria-label="Jour" className="grid grid-cols-6 gap-1.5">
        {semaine.map((j) => (
          <button
            key={j.id}
            type="button"
            data-jour={j.id}
            aria-pressed={j.id === jourId}
            onClick={() => choisirJour(j.id)}
            className={`min-h-12 rounded-2xl font-[family-name:var(--titres)] text-[15px] font-semibold transition-all duration-300 ${
              j.id === jourId ? "bg-[var(--encre)] text-[var(--fond)] scale-[1.04]" : "bg-[var(--fond)] text-[var(--encre)] hover:bg-[#E9DFCF]"
            }`}
          >
            {j.court}
          </button>
        ))}
      </div>

      <div role="group" aria-label={`Heures du ${jour.long}`} className="grid grid-cols-3 gap-2">
        {jour.creneaux.map((c) => {
          const actif = heure === c.heure;
          return (
            <button
              key={c.heure}
              type="button"
              data-creneau={`${jour.id}-${cle(c.heure)}`}
              disabled={c.pris || reserve}
              aria-pressed={actif}
              onClick={() => {
                setHeure(c.heure);
                setErreur("");
              }}
              className={`relative min-h-[58px] rounded-2xl border-2 px-2 py-2 text-center transition-all duration-300 ${
                c.pris
                  ? "border-transparent bg-[var(--fond)] text-[var(--doux)] line-through decoration-1"
                  : actif
                    ? "border-[var(--accent)] bg-[#FBE7DC] text-[var(--encre)] scale-[1.03]"
                    : "border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] hover:border-[var(--encre)]"
              }`}
            >
              <span className="block font-[family-name:var(--titres)] text-[17px] font-semibold tabular-nums">{c.heure}</span>
              <span className="block text-[11px] font-semibold mt-0.5">
                {c.pris ? "Pris" : tot(c.heure) ? "Avant le travail" : tard(c.heure) ? "Après le travail" : "Libre"}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-sm text-[var(--doux)]">
        Créneaux d&apos;exemple. Sur un vrai site, cet agenda suit le planning réel du cabinet.
      </p>

      {heure && (
        <form onSubmit={envoyer} className="rounded-[22px] bg-[var(--fond)] p-5 space-y-4" data-film="formulaire" noValidate>
          <p className="font-[family-name:var(--titres)] text-2xl font-semibold tracking-[-0.02em]">
            {jour.long.charAt(0).toUpperCase() + jour.long.slice(1)}, {heure}
          </p>
          <p className="text-[15px] text-[var(--doux)]">
            Séance adulte · {seanceAdulte.duree} · {seanceAdulte.prix} (prix d&apos;exemple)
          </p>
          <label className="block space-y-1.5">
            <span className="text-sm font-bold">Nom</span>
            <input
              id="lp-nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              readOnly={reserve}
              autoComplete="off"
              className="w-full min-h-12 rounded-xl border-2 border-[var(--trait)] bg-[var(--carte)] px-4 text-base focus:border-[var(--encre)] outline-none"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-bold">Téléphone</span>
            <input
              id="lp-tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              readOnly={reserve}
              inputMode="tel"
              autoComplete="off"
              className="w-full min-h-12 rounded-xl border-2 border-[var(--trait)] bg-[var(--carte)] px-4 text-base tabular-nums focus:border-[var(--encre)] outline-none"
            />
          </label>
          {reserve ? (
            <div role="status" className="rounded-2xl bg-[var(--carte)] border-2 border-[var(--accent)] p-4 space-y-1">
              <p className="font-[family-name:var(--titres)] text-lg font-semibold">Réservé : {jour.long} {heure}</p>
              <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[var(--doux)]">
                On ne vous demande pas pourquoi vous venez. Vous le direz au cabinet.
              </p>
              {erreur && <p role="alert" className="text-sm font-bold text-[var(--accent-texte)]">{erreur}</p>}
              <button type="submit" className="w-full min-h-14 rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-lg font-semibold text-[var(--sur-accent)] transition-transform hover:scale-[1.01]">
                Réserver
              </button>
            </>
          )}
          {reserve && (
            <button
              type="button"
              onClick={() => {
                setReserve(false);
                setHeure(null);
              }}
              className="text-sm font-bold underline underline-offset-4"
            >
              Choisir un autre créneau
            </button>
          )}
        </form>
      )}
    </div>
  );
}
