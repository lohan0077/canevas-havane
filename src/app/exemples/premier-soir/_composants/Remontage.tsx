"use client";

import { useState } from "react";
import { MEUBLES, entreprise } from "./donnees";

const duree = (m: number) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${String(m % 60).padStart(2, "0")}` : ""}`);
const liste = (noms: string[]) => (noms.length < 2 ? noms.join("") : `${noms.slice(0, -1).join(", ")} et ${noms[noms.length - 1]}`).toLowerCase();

/**
 * « On remonte quoi, ce soir ? » Le client coche ce que l'équipe remonte avant de
 * partir. La promesse « tu dors dedans ce soir » ne vaut que pour un déménagement livré
 * dans la journée, et seulement pour ce qui est coché : le site le dit au moment même
 * où l'on coche. Démonstration : rien n'est envoyé.
 */
export default function Remontage() {
  const [journee, setJournee] = useState(true);
  const [coches, setCoches] = useState<string[]>([]);
  const [ajoute, setAjoute] = useState(false);
  const choisis = MEUBLES.filter((m) => coches.includes(m.id));
  const minutes = choisis.reduce((t, m) => t + m.minutes, 0);
  const basculer = (id: string) => {
    setAjoute(false);
    setCoches((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  };

  return (
    <div data-film="remontage" className="rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] p-5 sm:p-8 space-y-6 shadow-[0_30px_60px_-40px_rgba(29,43,79,.6)]">
      <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-[var(--fond)] p-1.5" role="group" aria-label="Ton déménagement">
        {[
          { id: "court", oui: true, titre: `Moins de ${entreprise.seuilKm} km`, sous: "livré dans la journée" },
          { id: "long", oui: false, titre: "Plus loin", sous: "livré le lendemain" },
        ].map((d) => (
          <button
            key={d.id}
            id={`distance-${d.id}`}
            type="button"
            aria-pressed={journee === d.oui}
            onClick={() => { setJournee(d.oui); setAjoute(false); }}
            className={`rounded-xl px-2 py-2.5 leading-tight ${journee === d.oui ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : ""}`}
          >
            <span className="block font-semibold">{d.titre}</span>
            <span className="block text-xs">{d.sous}</span>
          </button>
        ))}
      </div>

      <ul className="divide-y divide-[var(--trait)]">
        {MEUBLES.map((m) => {
          const oui = coches.includes(m.id);
          return (
            <li key={m.id}>
              <button
                type="button"
                role="switch"
                id={`meuble-${m.id}`}
                aria-checked={oui}
                onClick={() => basculer(m.id)}
                className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
              >
                <span>
                  <span className="block font-[family-name:var(--titres)] text-[26px] leading-tight">{m.nom}</span>
                  <span className="block text-sm text-[var(--doux)]">environ {duree(m.minutes)} · exemple</span>
                </span>
                <span aria-hidden="true" className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${oui ? "bg-[var(--accent)]" : "bg-[var(--trait)]"}`}>
                  <span className={`absolute top-1 h-6 w-6 rounded-full bg-[var(--carte)] shadow transition-transform ${oui ? "translate-x-7" : "translate-x-1"}`} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div id="promesse-du-soir" aria-live="polite" className={`rounded-[22px] p-5 space-y-2 ${journee ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--fond)] text-[var(--encre)] border border-[var(--trait)]"}`}>
        {choisis.length === 0 ? (
          <p className="text-lg">Coche ce qu'on remonte. Seul ce qui est coché est promis.</p>
        ) : journee ? (
          <>
            <p className="font-[family-name:var(--titres)] text-[26px] leading-tight">
              Livré dans la journée&nbsp;: monté avant qu'on parte. <span className="text-[var(--accent)]">Tu dors dedans ce soir.</span>
            </p>
            <p className="text-[15px]">On remonte {liste(choisis.map((m) => m.nom))} · environ {duree(minutes)}, compté au devis.</p>
          </>
        ) : (
          <>
            <p className="font-[family-name:var(--titres)] text-[26px] leading-tight">Livré le lendemain&nbsp;: on ne te promet pas le premier soir.</p>
            <p className="text-[15px]">
              On remonte {liste(choisis.map((m) => m.nom))} à la livraison, et le carton orange voyage avec toi, pour ta nuit sur place.
            </p>
          </>
        )}
      </div>

      {ajoute ? (
        <div role="status" className="rounded-2xl border-2 border-[var(--accent)] p-4 space-y-1">
          <p className="font-semibold">Ajouté à ta demande de devis.</p>
          <p className="text-sm">Le devis, gratuit, dira ce qu'on remonte, le montant HT et TTC, et que ce prix est définitif.</p>
          <p className="text-sm text-[var(--doux)]">Démonstration&nbsp;: rien n'est envoyé, rien n'est enregistré.</p>
        </div>
      ) : (
        <button
          type="button"
          disabled={choisis.length === 0}
          onClick={() => setAjoute(true)}
          className="w-full h-14 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-lg font-semibold disabled:cursor-not-allowed"
        >
          Ajouter à mon devis
        </button>
      )}
    </div>
  );
}
