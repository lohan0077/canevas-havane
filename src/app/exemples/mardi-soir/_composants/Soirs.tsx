"use client";

import { useState } from "react";
import { seances, soirs } from "./donnees";

const cle = (h: string) => h.replace(/\s/g, "");

/**
 * Réserver un soir : la séance, le soir, l'heure, puis un nom et un téléphone. Pas de
 * poids, pas d'objectif, pas de motif : rien de tout ça ne se saisit ici. Rien n'est
 * envoyé.
 */
export default function Soirs() {
  const [seanceId, setSeanceId] = useState("premiere");
  const [soirId, setSoirId] = useState("mardi");
  const [heure, setHeure] = useState<string | null>(null);
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [erreur, setErreur] = useState("");
  const [reserve, setReserve] = useState(false);
  const seance = seances.find((s) => s.id === seanceId) ?? seances[0];
  const soir = soirs.find((s) => s.id === soirId) ?? soirs[1];

  const envoyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || tel.replace(/\D/g, "").length < 10) {
      setErreur("Il manque un nom ou un numéro de téléphone à dix chiffres.");
      return;
    }
    setErreur("");
    setReserve(true);
  };

  return (
    <div className="rounded-[32px] bg-[var(--carte)] border border-[var(--trait)] p-5 sm:p-8 space-y-6" data-film="soirs">
      <div role="group" aria-label="Séance" className="grid grid-cols-2 gap-2">
        {seances.map((s) => (
          <button
            key={s.id}
            type="button"
            data-seance={s.id}
            aria-pressed={seanceId === s.id}
            disabled={reserve}
            onClick={() => setSeanceId(s.id)}
            className={`rounded-2xl border-2 px-4 py-3 text-left ${seanceId === s.id ? "border-[var(--encre)] bg-[#F6E7C1]" : "border-[var(--trait)]"}`}
          >
            <span className="block font-semibold">{s.nom}</span>
            <span className="block text-sm text-[var(--doux)] [font-variant-numeric:lining-nums]">{s.duree} · {s.prix}</span>
          </button>
        ))}
      </div>

      <div role="group" aria-label="Soir" className="flex gap-1.5 overflow-x-auto">
        {soirs.map((s) => (
          <button
            key={s.id}
            type="button"
            data-soir={s.id}
            aria-pressed={soirId === s.id}
            disabled={reserve}
            onClick={() => { setSoirId(s.id); setHeure(null); }}
            className={`flex-1 min-h-12 rounded-full px-3 text-[15px] font-semibold ${soirId === s.id ? "bg-[var(--encre)] text-[var(--fond)]" : "bg-[var(--fond)]"}`}
          >
            {s.court}
          </button>
        ))}
      </div>

      <div role="group" aria-label={`Heures du ${soir.long} soir`} className="grid grid-cols-4 gap-1.5">
        {soir.heures.map((h) => (
          <button
            key={h.h}
            type="button"
            data-heure={`${soir.id}-${cle(h.h)}`}
            aria-pressed={heure === h.h}
            disabled={h.pris || reserve}
            onClick={() => setHeure(h.h)}
            className={`min-h-14 rounded-2xl text-[15px] font-semibold [font-variant-numeric:lining-nums] ${
              h.pris ? "text-[var(--doux)] line-through" : heure === h.h ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "bg-[var(--fond)]"
            }`}
          >
            {h.h}
          </button>
        ))}
      </div>
      <p className="text-sm text-[var(--doux)]">Soirs d&apos;exemple. Barrés : déjà pris.</p>

      {heure && (
        <form onSubmit={envoyer} noValidate className="space-y-3 border-t border-[var(--trait)] pt-5" data-film="coordonnees">
          <p className="font-[family-name:var(--titres)] text-3xl [font-variant-numeric:lining-nums]">
            {soir.long.charAt(0).toUpperCase() + soir.long.slice(1)}, {heure}
          </p>
          <p className="text-[var(--doux)] [font-variant-numeric:lining-nums]">{seance.nom} · {seance.duree} · {seance.prix} · prix d&apos;exemple</p>
          <label className="block space-y-1">
            <span className="text-sm font-semibold">Nom</span>
            <input id="ms-nom" value={nom} onChange={(e) => setNom(e.target.value)} readOnly={reserve} autoComplete="off" className="w-full min-h-12 rounded-xl border-2 border-[var(--trait)] px-4 outline-none focus:border-[var(--encre)]" />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-semibold">Téléphone</span>
            <input id="ms-tel" value={tel} onChange={(e) => setTel(e.target.value)} readOnly={reserve} inputMode="tel" autoComplete="off" className="w-full min-h-12 rounded-xl border-2 border-[var(--trait)] px-4 tabular-nums outline-none focus:border-[var(--encre)]" />
          </label>
          <p className="text-sm text-[var(--doux)]">Ni poids, ni objectif, ni motif à écrire : on en parle en séance.</p>
          {reserve ? (
            <div role="status" className="rounded-2xl bg-[#F6E7C1] p-4 space-y-1">
              <p className="font-[family-name:var(--titres)] text-2xl [font-variant-numeric:lining-nums]">Réservé : {soir.long} {heure}</p>
              <p className="text-sm">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
            </div>
          ) : (
            <>
              {erreur && <p role="alert" className="text-sm font-semibold text-[var(--accent-texte)]">{erreur}</p>}
              <button type="submit" className="w-full min-h-14 rounded-full bg-[var(--encre)] text-[var(--fond)] text-lg font-semibold">Réserver</button>
            </>
          )}
          {reserve && (
            <button type="button" onClick={() => { setReserve(false); setHeure(null); }} className="text-sm font-semibold underline underline-offset-4">
              Choisir un autre soir
            </button>
          )}
        </form>
      )}
    </div>
  );
}
