"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { HEURES } from "./donnees";
import { joursOuvrables, useAujourdhui } from "./jours";

// L'heure apportée par le toit-horloge de l'accueil : « …/rendez-vous#appel-18 ». Lue
// dans l'ancre de l'adresse, qui ne quitte jamais le navigateur.
const abonnerAncre = (f: () => void) => {
  window.addEventListener("hashchange", f);
  return () => window.removeEventListener("hashchange", f);
};
const useAncre = () => useSyncExternalStore(abonnerAncre, () => window.location.hash, () => "");

/**
 * « Quand veux-tu qu'on t'appelle ? » Le visiteur choisit un jour parmi les cinq
 * prochains jours ouvrables et une heure ; l'appel aura lieu à ce créneau, pas avant,
 * et seulement pour son devis. La case garde la trace de la demande (C. consom.,
 * art. R223-4) et de l'accord pour une date et un horaire précis (art. L223-1).
 * Démonstration : rien n'est envoyé.
 */
export default function Creneau() {
  const aujourdhui = useAujourdhui();
  const jours = useMemo(() => (aujourdhui ? joursOuvrables(aujourdhui) : []), [aujourdhui]);
  const [tel, setTel] = useState("");
  const [accord, setAccord] = useState(false);
  const [jour, setJour] = useState<string | null>(null);
  const [heureChoisie, setHeure] = useState<string | null>(null);
  const ancre = useAncre();
  const apportee = HEURES.find((x) => ancre === `#appel-${x.id}`)?.id ?? null;
  const heure = heureChoisie ?? apportee;
  // Arrivé du toit-horloge avec une heure : on amène le formulaire à l'écran.
  const formulaire = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!apportee) return;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => formulaire.current?.scrollIntoView({ block: "start", behavior: reduit ? "auto" : "smooth" }), 120);
    return () => window.clearTimeout(t);
  }, [apportee]);
  const [erreur, setErreur] = useState("");
  const [pret, setPret] = useState(false);
  const j = jours.find((x) => x.cle === jour);
  const h = HEURES.find((x) => x.id === heure);

  const reserver = (e: React.FormEvent) => {
    e.preventDefault();
    const chiffres = tel.replace(/\D/g, "");
    if (chiffres.length !== 10 || !chiffres.startsWith("0")) return setErreur("Indique ton numéro, 10 chiffres.");
    if (!accord) return setErreur("Coche la case : sans ta demande, personne n'a le droit de t'appeler.");
    if (!j || !h) return setErreur("Choisis un jour et une heure.");
    setErreur("");
    setPret(true);
  };

  const puce = (actif: boolean) =>
    `rounded-2xl border-2 transition-colors ${actif ? "border-[var(--sombre)] bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] hover:border-[var(--encre)]"}`;

  return (
    <form ref={formulaire} onSubmit={reserver} noValidate data-film="creneau" className="scroll-mt-28 space-y-7">
      <fieldset className="space-y-3" disabled={pret}>
        <legend className="font-[family-name:var(--titres)] text-2xl font-bold tracking-[-0.03em] mb-3">1. Ton numéro</legend>
        <input
          id="telephone"
          type="tel"
          inputMode="tel"
          autoComplete="off"
          aria-label="Ton téléphone"
          placeholder="06 39 98 00 00"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          className="w-full h-14 rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 text-lg tabular-nums placeholder:text-[var(--doux)] focus:border-[var(--encre)] outline-none"
        />
        <label className="flex items-start gap-3">
          <input id="accord" type="checkbox" checked={accord} onChange={(e) => setAccord(e.target.checked)} className="mt-0.5 h-6 w-6 shrink-0 accent-[var(--sombre)]" />
          <span className="leading-snug">Je souhaite être appelé au jour et à l'heure que je choisis ci-dessous, au sujet de mon devis uniquement.</span>
        </label>
      </fieldset>

      <fieldset id="choix-jour" className="space-y-3" disabled={pret}>
        <legend className="font-[family-name:var(--titres)] text-2xl font-bold tracking-[-0.03em] mb-1">2. Le jour</legend>
        <p className="text-sm text-[var(--doux)]">Les 5 prochains jours ouvrables</p>
        <div className="grid grid-cols-5 gap-2">
          {(jours.length ? jours : Array.from({ length: 5 }, () => null)).map((x, i) =>
            x ? (
              <button
                key={x.cle}
                type="button"
                id={`jour-${i}`}
                data-semaine={x.semaine}
                aria-pressed={jour === x.cle}
                aria-label={`${x.long} ${x.quantieme} ${x.mois}`}
                onClick={() => setJour(x.cle)}
                className={`${puce(jour === x.cle)} h-[72px] flex flex-col items-center justify-center`}
              >
                <span className="text-sm font-medium">{x.court}</span>
                <span className="font-[family-name:var(--titres)] text-[26px] font-bold leading-none tabular-nums">{x.quantieme}</span>
              </button>
            ) : (
              <span key={i} aria-hidden="true" className="h-[72px] rounded-2xl border-2 border-[var(--trait)]" />
            ),
          )}
        </div>
      </fieldset>

      <fieldset id="choix-heure" className="space-y-3" disabled={pret}>
        <legend className="font-[family-name:var(--titres)] text-2xl font-bold tracking-[-0.03em] mb-3">3. L'heure</legend>
        <div className="grid grid-cols-3 gap-2">
          {HEURES.map((x) => (
            <button key={x.id} type="button" id={`heure-${x.id}`} aria-pressed={heure === x.id} onClick={() => setHeure(x.id)} className={`${puce(heure === x.id)} h-14 text-lg font-medium tabular-nums`}>
              {x.libelle}
            </button>
          ))}
        </div>
      </fieldset>

      {erreur && <p role="alert" className="rounded-2xl border-2 border-[var(--encre)] px-4 py-3 text-sm font-medium">{erreur}</p>}

      {pret && j && h ? (
        <div role="status" data-film="confirmation" className="rounded-2xl bg-[var(--sombre)] text-[var(--sur-sombre)] p-6 space-y-2">
          <p className="font-[family-name:var(--titres)] text-[30px] font-bold leading-tight tracking-[-0.03em]">
            On t'appelle {j.long} à {h.parle}.
          </p>
          <p className="text-lg">Pas avant. Et seulement pour ton devis.</p>
          <p className="text-sm">
            {j.long[0].toUpperCase() + j.long.slice(1)} {j.quantieme} {j.mois}, {h.parle} · Démonstration : rien n'est envoyé, rien n'est enregistré.
          </p>
          <button type="button" onClick={() => setPret(false)} className="pt-1 text-sm font-medium underline underline-offset-4">
            Changer de créneau
          </button>
        </div>
      ) : (
        <button type="submit" className="w-full h-12 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-[15px] font-medium">
          Réserver mon appel
        </button>
      )}
    </form>
  );
}
