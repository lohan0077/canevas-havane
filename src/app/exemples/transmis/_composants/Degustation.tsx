"use client";

import { useState } from "react";
import { DEGUSTATIONS } from "./donnees";

/**
 * La dégustation se réserve en ligne, comme une table au restaurant : un samedi, une
 * heure, pour deux. Les allergies se disent avant, dans la même page. Rien n'est
 * envoyé : la confirmation le dit. Les créneaux « complets » sont un exemple.
 */
export default function Degustation() {
  const [id, setId] = useState<string | null>(null);
  const [allergies, setAllergies] = useState("");
  const [reservee, setReservee] = useState(false);
  const c = DEGUSTATIONS.find((x) => x.id === id) ?? null;

  return (
    <div className="space-y-6">
      <div id="creneaux" className="grid grid-cols-2 gap-2.5">
        {DEGUSTATIONS.map((x) => (
          <button
            key={x.id}
            type="button"
            data-film={`degustation-${x.id}`}
            disabled={x.pris || reservee}
            aria-pressed={x.id === id}
            onClick={() => setId(x.id)}
            className={`rounded-[18px] border px-4 py-3 text-left transition-colors ${
              x.pris
                ? "border-[var(--trait)] text-[var(--doux)] cursor-not-allowed"
                : x.id === id
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]"
                  : "border-[var(--trait)] bg-[var(--carte)]"
            }`}
          >
            <span className="block font-[family-name:var(--titres)] text-[24px] leading-tight">{x.jour}</span>
            <span className="block text-[14px]">{x.heure} · pour deux · {x.pris ? "complet" : "libre"}</span>
          </button>
        ))}
      </div>
      <p className="text-[13px] text-[var(--doux)]">Créneaux d&apos;exemple : l&apos;entreprise est fictive.</p>

      <form
        id="reserver-degustation"
        className="rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-5 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (c) setReservee(true);
        }}
      >
        <p className="font-[family-name:var(--titres)] text-[28px] leading-tight">
          {c ? <>{c.jour}, {c.heure} · pour deux</> : "Choisis un samedi libre."}
        </p>
        <label className="block space-y-2">
          <span className="block font-medium">Des allergies, un régime&nbsp;?</span>
          <span className="block text-[13px] text-[var(--doux)]">On adapte ce que tu goûtes. Et on te reposera la question pour chaque table avant la commande.</span>
          <textarea
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            rows={2}
            placeholder="Par exemple : sans gluten pour l'un de nous deux"
            className="w-full rounded-[14px] border border-[var(--trait)] bg-[var(--fond)] p-3 text-[16px] placeholder:text-[var(--doux)]"
          />
        </label>
        {reservee && c ? (
          <div role="status" className="rounded-[16px] border border-[var(--accent)] p-4 space-y-1">
            <p className="font-[family-name:var(--titres)] text-[26px]">Dégustation réservée&nbsp;: {c.court}.</p>
            <p className="text-[14px] text-[var(--doux)]">
              {allergies.trim() ? "Tes allergies sont notées pour la dégustation. " : ""}Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.
            </p>
          </div>
        ) : (
          <button
            type="submit"
            disabled={!c}
            className="flex h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] text-[17px] font-medium text-[var(--sur-accent)] disabled:bg-[var(--trait)] disabled:text-[var(--encre)] disabled:cursor-not-allowed"
          >
            Réserver ma dégustation
          </button>
        )}
      </form>
    </div>
  );
}
