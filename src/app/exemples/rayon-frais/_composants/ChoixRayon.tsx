"use client";

import { useState } from "react";
import { rayons, samedis, seanceRayon } from "./donnees";

/**
 * « Quel rayon ? » — on choisit le rayon qu'on veut faire ensemble, puis un créneau.
 * Une séance en individuel, dans le magasin du patient, avec l'accord du magasin.
 * Rien n'est envoyé.
 */
export default function ChoixRayon() {
  const [rayonId, setRayonId] = useState<string | null>(null);
  const [creneau, setCreneau] = useState<number | null>(null);
  const [reserve, setReserve] = useState(false);
  const rayon = rayons.find((r) => r.id === rayonId);

  return (
    <div className="space-y-5" data-film="choix-rayon">
      <div role="group" aria-label="Rayon" className="grid gap-3">
        {rayons.map((r) => {
          const actif = rayonId === r.id;
          return (
            <button
              key={r.id}
              type="button"
              data-rayon={r.id}
              aria-pressed={actif}
              disabled={reserve}
              onClick={() => { setRayonId(r.id); setCreneau(null); }}
              className={`flex items-center gap-4 rounded-[22px] border-2 px-5 py-4 text-left transition-colors ${
                actif ? "border-[var(--encre)] bg-[#F2C94C]" : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"
              }`}
            >
              <span aria-hidden="true" className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[var(--fond)] text-3xl">{r.emoji}</span>
              <span className="flex-1 font-[family-name:var(--titres)] text-2xl font-semibold">{r.nom}</span>
              <span aria-hidden="true" className="text-2xl">›</span>
            </button>
          );
        })}
      </div>

      {rayon && (
        <div className="rounded-[26px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-5 sm:p-7 space-y-4" data-film="detail-rayon">
          <p className="text-sm font-semibold text-[#F2C94C]">Séance au rayon · en individuel</p>
          <p className="font-[family-name:var(--titres)] text-3xl font-semibold">{rayon.emoji} {rayon.nom}</p>
          <p className="leading-relaxed text-[#D7E6D2]">{rayon.texte}</p>
          <p className="text-sm text-[#D7E6D2] [font-variant-numeric:lining-nums]">{seanceRayon.duree} · {seanceRayon.prix} (prix d&apos;exemple) · {seanceRayon.lieu}.</p>
          <div role="group" aria-label="Créneau" className="grid grid-cols-3 gap-2">
            {samedis.map((s, i) => (
              <button
                key={s.libelle + s.sous}
                type="button"
                disabled={s.pris || reserve}
                aria-pressed={creneau === i}
                onClick={() => setCreneau(i)}
                className={`rounded-xl px-1 py-2 text-center [font-variant-numeric:lining-nums] ${
                  s.pris ? "text-[#D7E6D2] line-through" : creneau === i ? "bg-[#F2C94C] text-[#1F3B24]" : "bg-white/10"
                }`}
              >
                <span className="block font-semibold">{s.libelle}</span>
                <span className="block text-xs">{s.sous}</span>
              </button>
            ))}
          </div>
          {reserve ? (
            <div role="status" className="rounded-2xl bg-[#FFF7E6] text-[#1F3B24] p-4 space-y-1">
              <p className="font-[family-name:var(--titres)] text-xl font-semibold">Réservé : {rayon.nom.toLowerCase()}, {samedis[creneau ?? 0].sous.toLowerCase()} {samedis[creneau ?? 0].libelle}</p>
              <p className="text-sm">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
            </div>
          ) : (
            <button
              type="button"
              disabled={creneau === null}
              onClick={() => setReserve(true)}
              className="w-full min-h-14 rounded-full bg-[#C2402A] text-white text-lg font-semibold disabled:bg-white/10 disabled:text-[#D7E6D2]"
            >
              {creneau === null ? "Choisissez un créneau" : "Réserver ce rayon"}
            </button>
          )}
          <p className="text-xs text-[#D7E6D2]">Créneaux d&apos;exemple. La première séance a lieu au cabinet ; le rayon, c&apos;est si vous voulez.</p>
        </div>
      )}
    </div>
  );
}
