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
    <div className="rounded-2xl bg-[var(--carte)] border border-[var(--trait)] p-5 sm:p-8 space-y-6 text-[var(--encre)]" data-film="agenda">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-[family-name:var(--titres)] text-xl">Semaine d&apos;exemple</p>
        <p className="text-[13px] text-[var(--doux)]">Séance adulte de {seanceAdulte.duree}</p>
      </div>

      <div role="group" aria-label="Jour" className="grid grid-cols-6 gap-1.5">
        {semaine.map((j) => (
          <button
            key={j.id}
            type="button"
            data-jour={j.id}
            aria-pressed={j.id === jourId}
            onClick={() => choisirJour(j.id)}
            className={`min-h-12 rounded-xl text-[15px] font-medium transition-all duration-300 ${
              j.id === jourId ? "bg-[var(--encre)] text-[var(--fond)] scale-[1.04]" : "bg-[var(--fond)] text-[var(--encre)] hover:bg-[#E6E9F5]"
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
              className={`relative min-h-[58px] rounded-xl border px-2 py-2 text-center transition-all duration-300 ${
                c.pris
                  ? "border-transparent bg-[var(--fond)] text-[var(--doux)] line-through decoration-1"
                  : actif
                    ? "border-[var(--accent)] bg-[#E9ECFF] text-[var(--encre)] scale-[1.03]"
                    : "border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] hover:border-[var(--encre)]"
              }`}
            >
              <span className="block text-[16px] font-medium tabular-nums">{c.heure}</span>
              <span className="block text-[11px] mt-0.5">
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
        <form onSubmit={envoyer} className="rounded-xl bg-[var(--fond)] p-5 space-y-4" data-film="formulaire" noValidate>
          <p className="font-[family-name:var(--titres)] text-2xl font-normal tracking-[-0.01em]">
            {jour.long.charAt(0).toUpperCase() + jour.long.slice(1)}, {heure}
          </p>
          <p className="text-[15px] text-[var(--doux)]">
            Séance adulte de {seanceAdulte.duree}, {seanceAdulte.prix} (prix d&apos;exemple)
          </p>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Nom</span>
            <input
              id="lp-nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              readOnly={reserve}
              autoComplete="off"
              className="w-full min-h-12 rounded-xl border border-[var(--trait)] bg-[var(--carte)] px-4 text-base focus:border-[var(--encre)] outline-none"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Téléphone</span>
            <input
              id="lp-tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              readOnly={reserve}
              inputMode="tel"
              autoComplete="off"
              className="w-full min-h-12 rounded-xl border border-[var(--trait)] bg-[var(--carte)] px-4 text-base tabular-nums focus:border-[var(--encre)] outline-none"
            />
          </label>
          {reserve ? (
            <div role="status" className="rounded-xl bg-[var(--carte)] border border-[var(--accent)] p-4 space-y-1">
              <p className="font-[family-name:var(--titres)] text-xl font-normal">Réservé : {jour.long} {heure}</p>
              <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[var(--doux)]">
                On ne vous demande pas pourquoi vous venez. Vous le direz au cabinet.
              </p>
              {erreur && <p role="alert" className="text-sm font-medium text-[var(--accent-texte)]">{erreur}</p>}
              <button type="submit" className="h-12 w-full rounded-full bg-[var(--accent)] text-[15px] font-medium text-[var(--sur-accent)]">
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
              className="text-sm font-medium underline underline-offset-4"
            >
              Choisir un autre créneau
            </button>
          )}
        </form>
      )}
    </div>
  );
}
