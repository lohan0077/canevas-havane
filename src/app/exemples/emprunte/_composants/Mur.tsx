"use client";

import { useState } from "react";
import { voleurs } from "./donnees";
import { Voleur } from "./Dessins";

const GROUPES = [
  { id: "tous", libelle: "Tous" },
  { id: "famille", libelle: "Famille" },
  { id: "amis", libelle: "Amis" },
  { id: "animaux", libelle: "Animaux" },
] as const;

const ANGLES = [-4, 3, -2, 4, -3, 2];

/**
 * Le mur des voleurs : la photo de celui qui a pris le pull, envoyée par le client, avec
 * l'accord de la personne photographiée. Ici, des dessins — aucune vraie personne.
 */
export default function Mur({ limite, surSombre = false }: { limite?: number; surSombre?: boolean }) {
  const [groupe, setGroupe] = useState<(typeof GROUPES)[number]["id"]>("tous");
  const [ouvert, setOuvert] = useState<string | null>(null);
  const liste = voleurs.filter((v) => groupe === "tous" || v.groupe === groupe).slice(0, limite);

  return (
    <div className="space-y-6" data-film="mur">
      {!limite && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer le mur">
          {GROUPES.map((g) => (
            <button
              key={g.id}
              type="button"
              aria-pressed={groupe === g.id}
              onClick={() => setGroupe(g.id)}
              className={`rounded-full border-2 px-4 py-2 text-sm font-bold ${groupe === g.id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
            >
              {g.libelle}
            </button>
          ))}
        </div>
      )}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
        {liste.map((v, i) => (
          <li key={v.id} style={{ transform: `rotate(${ANGLES[i % ANGLES.length]}deg)` }}>
            <button
              type="button"
              onClick={() => setOuvert(ouvert === v.id ? null : v.id)}
              aria-expanded={ouvert === v.id}
              className="block w-full space-y-2 rounded-[8px] bg-[#FFFFFF] p-2.5 pb-3 text-left shadow-[0_14px_28px_-14px_rgba(30,42,68,0.55)]"
            >
              <Voleur v={v} />
              <span className="block font-[family-name:var(--f-caveat)] text-2xl leading-none text-[#1E2A44]">{v.legende}</span>
              {ouvert === v.id && <span className="block text-xs text-[#4A5368]">{v.depuis} · rendu : jamais</span>}
            </button>
          </li>
        ))}
      </ul>
      <p className={`rounded-full border-2 px-5 py-3 text-center text-sm font-bold ${surSombre ? "border-[var(--sur-sombre)]" : "border-[var(--encre)]"}`} data-film="accord">
        ✓ Chaque photo publiée avec l&apos;accord de la personne
      </p>
      <p className={`text-sm ${surSombre ? "text-[#C9C3B6]" : "text-[var(--doux)]"}`}>Exemple : des dessins, aucune vraie photo — la marque est fictive. Sur le vrai site, aucun mineur sur le mur.</p>
    </div>
  );
}
