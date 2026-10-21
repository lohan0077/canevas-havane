"use client";

import { useId, useState } from "react";
import Bougie from "./Bougie";

const format = (d: Date) => d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

/**
 * « Ta future recrue arrive quand ? » : la date de sa première bougie, un an plus
 * tard, jour pour jour. Une vraie date, calculée ici ; rien n'est envoyé.
 */
export default function Jour365() {
  const id = useId();
  const [arrivee, setArrivee] = useState("");
  const d = arrivee ? new Date(`${arrivee}T12:00:00`) : null;
  const valide = d && !Number.isNaN(d.getTime());
  const bougie = valide ? new Date(d.getFullYear() + 1, d.getMonth(), d.getDate()) : null;

  return (
    <div className="grid gap-6 rounded-[28px] border-2 border-[var(--encre)] bg-[var(--carte)] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
      <div className="space-y-4">
        <label htmlFor={id} className="block font-[family-name:var(--titres)] text-3xl leading-tight">Ta future recrue arrive quand&nbsp;?</label>
        <input
          id={id}
          type="date"
          value={arrivee}
          onChange={(e) => setArrivee(e.target.value)}
          className="w-full rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 py-3 text-lg outline-none focus:border-[var(--encre)] [font-variant-numeric:lining-nums]"
        />
        <div aria-live="polite" className="min-h-16">
          {bougie ? (
            <p className="text-lg leading-snug">
              Sa première bougie : <strong className="font-[family-name:var(--titres)] text-2xl font-normal text-[var(--accent-texte)]">{format(bougie)}</strong>. Ce jour-là, un gâteau livré chez toi.
            </p>
          ) : (
            <p className="text-[var(--doux)]">Choisis la date d&apos;arrivée prévue : on te donne la date de sa première bougie.</p>
          )}
        </div>
        <p className="text-xs text-[var(--doux)]">Calculé sur ton écran ; rien n&apos;est envoyé.</p>
      </div>
      <div className="mx-auto grid h-36 w-28 place-items-end rounded-b-[40px] rounded-t-xl bg-[#FBEFD8] pb-3">
        <Bougie allumee={Boolean(bougie)} className="h-28 w-12" />
      </div>
    </div>
  );
}
