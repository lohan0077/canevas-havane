"use client";

import { useId, useState } from "react";
import { MUR_EXEMPLES } from "./donnees";
import Billet from "./Billet";

const ANGLES = [-3, 2, -1.5, 3, -2.5, 1.5, -2, 2.5];

/**
 * Le mur de la vitrine, en ligne : six billets d'exemple, et le tien, que tu écris
 * ici. Sans nom ni coordonnées ; il reste sur ton écran.
 */
export default function Mur() {
  const id = useId();
  const [ou, setOu] = useState("");
  const [pour, setPour] = useState("");
  const [miens, setMiens] = useState<{ ou: string; pour: string }[]>([]);

  const coller = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ou.trim()) return;
    setMiens([...miens, { ou: ou.trim(), pour: pour.trim() || "un jour" }].slice(-2));
    setOu("");
    setPour("");
  };

  return (
    <div className="space-y-8">
      <ul className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4" aria-label="Billets du mur (exemples)">
        {[...MUR_EXEMPLES, ...miens].map((b, i) => (
          <li key={`${b.ou}-${i}`}>
            <Billet ou={b.ou} pour={b.pour} angle={ANGLES[i % ANGLES.length]} neuf={i >= MUR_EXEMPLES.length} />
          </li>
        ))}
      </ul>
      <form onSubmit={coller} className="grid gap-3 rounded-[6px] bg-[var(--carte)] p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="space-y-1">
          <span className="block text-sm font-semibold">Ta destination</span>
          <input id={`${id}-ou`} value={ou} onChange={(e) => setOu(e.target.value)} maxLength={24} autoComplete="off" placeholder="L'Écosse" className="w-full border-b-2 border-[var(--trait)] bg-transparent py-2 text-lg outline-none focus:border-[var(--encre)]" />
        </label>
        <label className="space-y-1">
          <span className="block text-sm font-semibold">Pour qui, ou pour quand</span>
          <input id={`${id}-pour`} value={pour} onChange={(e) => setPour(e.target.value)} maxLength={28} autoComplete="off" placeholder="avec ma sœur" className="w-full border-b-2 border-[var(--trait)] bg-transparent py-2 text-lg outline-none focus:border-[var(--encre)]" />
        </label>
        <button type="submit" className="min-h-12 rounded-full bg-[var(--accent)] px-6 font-semibold text-[var(--sur-accent)]">Coller mon billet</button>
        <p className="text-xs text-[var(--doux)] sm:col-span-3">Sans nom ni coordonnées. Démonstration : ton billet reste sur ton écran, rien n&apos;est envoyé.</p>
      </form>
    </div>
  );
}
