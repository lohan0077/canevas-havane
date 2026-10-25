"use client";

import { useState } from "react";
import { CHAISES_PRISES, CONCERT, MORCEAUX, PRIX, PROGRAMME_3E, SEMAINE, entreprise, type Matiere } from "./donnees";

const euros = (n: number) => `${n.toLocaleString("fr-FR")} €`;

/**
 * Le chemin d'un morceau, étape par étape, jusqu'au jour où on le joue en entier. On
 * coche l'étape passée ; la suivante s'allume. Aucune durée n'est promise.
 */
export function Chemin() {
  const [id, setId] = useState(MORCEAUX[0].id);
  const [faites, setFaites] = useState(0);
  const morceau = MORCEAUX.find((m) => m.id === id) ?? MORCEAUX[0];
  const fini = faites >= morceau.etapes.length;

  return (
    <div className="space-y-6">
      <div role="tablist" aria-label="Choisir le morceau" className="flex flex-wrap gap-2">
        {MORCEAUX.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={m.id === id}
            onClick={() => {
              setId(m.id);
              setFaites(0);
            }}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${m.id === id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
          >
            {m.titre}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_40px_90px_-50px_rgba(30,42,68,0.55)]">
        <div className="space-y-1 bg-[var(--sombre)] px-6 py-7 text-[var(--sur-sombre)] sm:px-10">
          <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#E7C774]">{morceau.compositeur} · {morceau.annee}</p>
          <h2 className="text-4xl sm:text-5xl">{morceau.titre}</h2>
          <p className="italic text-[var(--sur-sombre)]/90">{morceau.mot}</p>
        </div>
        <div className="space-y-6 p-6 sm:p-10">
          <ol id="etapes" className="relative">
            {morceau.etapes.map((e, i) => {
              const etat = i < faites ? "faite" : i === faites ? "en-cours" : "a-venir";
              return (
                <li key={e} data-etape={i + 1} className="relative grid grid-cols-[52px_1fr] gap-4 pb-7 last:pb-0">
                  {i < morceau.etapes.length - 1 && (
                    <span aria-hidden="true" className={`absolute bottom-0 left-[25px] top-13 w-0.5 transition-colors duration-500 ${i < faites ? "bg-[var(--accent)]" : "bg-[var(--trait)]"}`} />
                  )}
                  <span
                    aria-hidden="true"
                    className={`relative z-10 grid h-13 w-13 place-items-center rounded-full border-2 font-[family-name:var(--titres)] text-xl [font-variant-numeric:lining-nums] transition-all duration-500 ${
                      etat === "faite"
                        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]"
                        : etat === "en-cours"
                          ? "scale-110 border-[var(--accent-texte)] bg-[var(--carte)] text-[var(--accent-texte)]"
                          : "border-[var(--trait)] bg-[var(--carte)] text-[var(--doux)]"
                    }`}
                  >
                    {etat === "faite" ? "✓" : i + 1}
                  </span>
                  <span className="pt-2.5">
                    <span className={`block text-xl ${etat === "a-venir" ? "text-[var(--doux)]" : "font-semibold"}`}>{e}</span>
                    <span className="block text-sm text-[var(--doux)]">{etat === "faite" ? "Passée" : etat === "en-cours" ? "En cours" : "Plus tard"}</span>
                  </span>
                </li>
              );
            })}
          </ol>
          <div aria-live="polite">
            {fini ? (
              <div role="status" className="space-y-3 rounded-2xl bg-[var(--sombre)] p-6 text-[var(--sur-sombre)]">
                <p className="font-[family-name:var(--titres)] text-4xl italic text-[#E7C774]">Tu le joues en entier.</p>
                <p className="text-[var(--sur-sombre)]/90">Le prochain concert de salon t&apos;attend, si tu veux. Démonstration : rien n&apos;est enregistré.</p>
                <button type="button" onClick={() => setFaites(0)} className="text-sm font-semibold underline underline-offset-4">Recommencer le chemin</button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setFaites((f) => f + 1)}
                className="flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] font-semibold text-[var(--sur-accent)] transition-transform hover:scale-[1.01]"
              >
                {faites === morceau.etapes.length - 1 ? "Je le joue en entier" : "Étape passée"}
              </button>
            )}
          </div>
        </div>
      </div>
      <p className="text-sm text-[var(--doux)]">Aucune durée promise : le chemin avance au rythme des cours et de tes soirées.</p>
    </div>
  );
}

/** Les douze chaises du concert de salon : on en choisit une. Rien n'est envoyé. */
export function Chaises() {
  const [choisie, setChoisie] = useState<number | null>(null);
  const [gardee, setGardee] = useState(false);

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] sm:p-8">
        <p className="mx-auto mb-6 w-fit rounded-full border border-white/30 px-5 py-1.5 text-center text-[12px] font-bold uppercase tracking-[0.24em]">Le piano</p>
        <ul className="grid grid-cols-4 gap-3">
          {Array.from({ length: CONCERT.chaises }, (_, k) => {
            const prise = CHAISES_PRISES.includes(k);
            const active = choisie === k;
            return (
              <li key={k}>
                <button
                  type="button"
                  disabled={prise || gardee}
                  aria-pressed={active}
                  aria-label={`Chaise ${k + 1}${prise ? ", prise" : ""}`}
                  onClick={() => setChoisie(k)}
                  className={`grid aspect-square w-full place-items-center rounded-2xl border-2 transition-all duration-300 ${
                    prise ? "cursor-not-allowed border-dashed border-white/25 text-white/60" : active ? "scale-105 border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-white/50 text-[var(--sur-sombre)] hover:border-[var(--accent)]"
                  }`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
                    <path d="M7 3h10v9H7zM5 12h14v3H5zM7 15v6M17 15v6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="text-sm text-[var(--doux)]">Chaises prises : exemple, l&apos;entreprise est fictive.</p>
      {choisie !== null &&
        (gardee ? (
          <div role="status" className="space-y-1 rounded-2xl border-2 border-[var(--accent)] bg-[var(--carte)] p-5">
            <p className="font-semibold">Chaise {choisie + 1} gardée pour toi. Entrée libre, voisins bienvenus.</p>
            <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
          </div>
        ) : (
          <button type="button" onClick={() => setGardee(true)} className="flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] font-semibold text-[var(--sur-accent)]">
            Garder la chaise {choisie + 1}
          </button>
        ))}
    </div>
  );
}

/** Le programme de 3e : on coche ce qui bloque, le site dit par où commencer. Rien n'est envoyé. */
export function Programme3e() {
  const [coches, setCoches] = useState<string[]>([]);
  const premier = PROGRAMME_3E.find((p) => coches.includes(p.nom));

  return (
    <div className="space-y-4">
      <ul className="divide-y divide-[var(--trait)] overflow-hidden rounded-[1.5rem] border border-[var(--trait)] bg-[var(--carte)]">
        {PROGRAMME_3E.map((p) => {
          const coche = coches.includes(p.nom);
          return (
            <li key={p.nom}>
              <label className={`flex cursor-pointer items-start gap-4 px-5 py-4 transition-colors ${coche ? "bg-[var(--fond)]" : ""}`}>
                <input
                  type="checkbox"
                  checked={coche}
                  onChange={() => setCoches(coche ? coches.filter((c) => c !== p.nom) : [...coches, p.nom])}
                  className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent-texte)]"
                />
                <span>
                  <span className="block text-lg font-bold">{p.nom}</span>
                  <span className="block text-[var(--doux)]">{p.detail}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <p aria-live="polite" className="min-h-[2.5rem] -rotate-1 font-[family-name:var(--f-caveat)] text-[32px] text-[var(--accent-texte)]">
        {premier ? `On commencerait par : ${premier.nom.toLowerCase()}.` : "Cochez ce qui bloque."}
      </p>
    </div>
  );
}

/** Combien par mois : le total TTC en grand ; l'avantage fiscal à part, en petit. */
export function CalculMois() {
  const [heures, setHeures] = useState(4);
  const total = heures * PRIX.heure;
  const rempli = ((heures - 1) / 11) * 100;

  return (
    <div className="space-y-5 rounded-[2rem] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] sm:p-8">
      <label className="block space-y-3">
        <span className="flex items-baseline justify-between gap-4">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em]">Heures par mois</span>
          <span className="font-[family-name:var(--titres)] text-4xl [font-variant-numeric:lining-nums]">{heures}&nbsp;h</span>
        </span>
        <input
          type="range"
          min={1}
          max={12}
          value={heures}
          onChange={(e) => setHeures(Number(e.target.value))}
          className="h-2.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[5px] [&::-moz-range-thumb]:border-[#C9A24B] [&::-moz-range-thumb]:bg-[var(--sur-sombre)] [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[#C9A24B] [&::-webkit-slider-thumb]:bg-[var(--sur-sombre)]"
          style={{ background: `linear-gradient(90deg, #C9A24B ${rempli}%, rgba(246,240,225,.25) ${rempli}%)` }}
        />
      </label>
      <div aria-live="polite" className="space-y-1">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em]">Total du mois</p>
        <p className="font-[family-name:var(--titres)] text-6xl [font-variant-numeric:lining-nums]">{euros(total)} <span className="text-xl italic">TTC</span></p>
        <p className="text-sm">{euros(total)} HT · TVA non applicable (exemple) · déplacement compris</p>
        <p className="text-sm">
          {total >= 100 ? "À partir de 100 € TTC par mois : un devis gratuit vous est remis avant le premier cours." : "Devis gratuit sur simple demande."}
        </p>
      </div>
      <p className="rounded-xl border border-dashed border-white/60 px-3 py-2 text-[12px] leading-snug">
        Avantage fiscal, sous conditions : après crédit d&apos;impôt de 50&nbsp;%, {euros(total * PRIX.credit)} pour le mois.
      </p>
    </div>
  );
}

/**
 * L'agenda de la semaine, en vrai : piano le soir, maths le mercredi. On filtre, on
 * touche un créneau libre, on réserve en un clic. Créneaux pris : exemple. Rien n'est
 * envoyé.
 */
export function AgendaSemaine() {
  const [filtre, setFiltre] = useState<Matiere | "Tout">("Tout");
  const [choisi, setChoisi] = useState<string | null>(null);
  const [reserve, setReserve] = useState(false);
  const creneau = SEMAINE.find((c) => c.id === choisi) ?? null;
  const visibles = SEMAINE.filter((c) => filtre === "Tout" || c.matiere === filtre);
  const jours = [...new Set(visibles.map((c) => c.jour))];

  return (
    <div data-film="agenda" className="overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_40px_90px_-50px_rgba(30,42,68,0.55)]">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--sombre)] px-5 py-4 text-[var(--sur-sombre)] sm:px-7">
        <p className="font-[family-name:var(--titres)] text-2xl">Semaine du 2 novembre</p>
        <div role="group" aria-label="Filtrer" className="flex gap-1 rounded-full bg-white/10 p-1">
          {(["Tout", "Piano", "Maths"] as const).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filtre === f}
              onClick={() => setFiltre(f)}
              className={`min-h-9 rounded-full px-3.5 text-sm font-semibold transition-colors ${filtre === f ? "bg-[var(--accent)] text-[var(--sur-accent)]" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div id="creneaux" className="divide-y divide-[var(--trait)] px-5 sm:px-7">
        {jours.map((jour) => (
          <div key={jour} className="grid grid-cols-[92px_1fr] items-start gap-3 py-4">
            <p className="pt-2">
              <span className="block font-bold">{jour}</span>
              <span className="block text-sm text-[var(--doux)]">{visibles.find((c) => c.jour === jour)?.date}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {visibles.filter((c) => c.jour === jour).map((c) => {
                const actif = choisi === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    data-creneau={c.id}
                    disabled={c.pris || reserve}
                    aria-pressed={actif}
                    onClick={() => setChoisi(c.id)}
                    className={`min-h-13 rounded-2xl border-2 px-3.5 py-1.5 text-left transition-all duration-300 ${
                      c.pris
                        ? "border-transparent bg-[var(--fond)] text-[var(--doux)] line-through decoration-1"
                        : actif
                          ? "scale-[1.04] border-[var(--accent-texte)] bg-[var(--accent-texte)] text-white"
                          : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"
                    }`}
                  >
                    <span className="block font-[family-name:var(--titres)] text-xl leading-tight [font-variant-numeric:lining-nums]">{c.heure}</span>
                    <span className="block text-[12px] font-semibold">{c.pris ? "Pris" : c.matiere}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div id="reservation" aria-live="polite" className="border-t border-[var(--trait)] bg-[var(--fond)] p-5 sm:p-7">
        {creneau ? (
          <div className="space-y-3">
            <p className="font-[family-name:var(--titres)] text-3xl leading-tight">{creneau.jour} {creneau.date.replace(" nov.", " novembre")}, {creneau.heure}</p>
            <p className="text-[var(--doux)]">
              {creneau.matiere === "Piano" ? `Piano avec ${entreprise.pianiste}` : `Maths avec ${entreprise.mathematicienne}`} · chez vous · 1 heure · {PRIX.heure}&nbsp;€ TTC (exemple)
            </p>
            {reserve ? (
              <div role="status" className="space-y-1 rounded-2xl border-2 border-[var(--accent)] bg-[var(--carte)] p-4">
                <p className="text-lg font-bold">C&apos;est réservé.</p>
                <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
                <button type="button" onClick={() => { setReserve(false); setChoisi(null); }} className="pt-1 text-sm font-semibold underline underline-offset-4">Choisir un autre créneau</button>
              </div>
            ) : (
              <button type="button" onClick={() => setReserve(true)} className="flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] text-lg font-semibold text-[var(--sur-accent)] transition-transform hover:scale-[1.01]">
                Réserver ce créneau
              </button>
            )}
          </div>
        ) : (
          <p className="text-[var(--doux)]">Touchez un créneau libre : il se réserve en un clic.</p>
        )}
      </div>
    </div>
  );
}
