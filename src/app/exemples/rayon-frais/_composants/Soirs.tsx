"use client";

import { useState } from "react";
import { seances, soirs } from "./donnees";

const cle = (h: string) => h.replace(/\s/g, "");
const SEANCES = seances.filter((s) => s.id === "premiere" || s.id === "suivi");

/**
 * Réserver un soir : la séance, le soir, l'heure, puis un nom et un téléphone. Pas de
 * poids, pas d'objectif, pas de motif : rien de tout ça ne se saisit ici. Rien n'est
 * envoyé. Les data-… et les ids servent au tournage de la vidéo.
 */
export default function Soirs() {
  const [seanceId, setSeanceId] = useState("premiere");
  const [soirId, setSoirId] = useState("mardi");
  const [heure, setHeure] = useState<string | null>(null);
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [erreur, setErreur] = useState("");
  const [reserve, setReserve] = useState(false);
  const seance = SEANCES.find((s) => s.id === seanceId) ?? SEANCES[0];
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
    <div className="overflow-hidden rounded-[2rem] border-2 border-[var(--encre)] bg-white shadow-[10px_10px_0_0_var(--encre)]" data-film="soirs">
      <div className="flex items-center justify-between gap-3 bg-[var(--encre)] px-6 py-3 text-[var(--fond)] sm:px-8">
        <p className="font-[family-name:var(--titres)] text-lg font-bold">Réserver un soir</p>
        <p className="text-sm font-semibold">jusqu&apos;à 20 h 30</p>
      </div>
      <div className="space-y-6 p-5 sm:p-8">
        <div role="group" aria-label="Séance" className="grid grid-cols-2 gap-2">
          {SEANCES.map((s) => (
            <button
              key={s.id}
              type="button"
              data-seance={s.id}
              aria-pressed={seanceId === s.id}
              disabled={reserve}
              onClick={() => setSeanceId(s.id)}
              className={`rounded-2xl border-2 px-4 py-3 text-left transition-colors ${seanceId === s.id ? "border-[var(--encre)] bg-[#F2C94C] text-[#1F3B24]" : "border-[var(--trait)] bg-[var(--fond)]"}`}
            >
              <span className="block font-semibold">{s.nom}</span>
              <span className="block text-sm [font-variant-numeric:lining-nums]">{s.duree} · {s.prix}</span>
            </button>
          ))}
        </div>

        <div role="group" aria-label="Soir" className="flex gap-1.5">
          {soirs.map((s) => (
            <button
              key={s.id}
              type="button"
              data-soir={s.id}
              aria-pressed={soirId === s.id}
              disabled={reserve}
              onClick={() => { setSoirId(s.id); setHeure(null); }}
              className={`min-h-12 flex-1 rounded-full px-2 text-[15px] font-semibold transition-colors ${soirId === s.id ? "bg-[var(--encre)] text-[var(--fond)]" : "bg-[var(--fond)]"}`}
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
              className={`min-h-14 rounded-2xl text-[15px] font-semibold [font-variant-numeric:lining-nums] transition-colors ${
                h.pris ? "text-[var(--doux)] line-through" : heure === h.h ? "bg-[var(--accent)] text-white" : "bg-[var(--fond)]"
              }`}
            >
              {h.h}
            </button>
          ))}
        </div>
        <p className="text-sm text-[var(--doux)]">Soirs d&apos;exemple. Barrés : déjà pris.</p>

        {heure && (
          <form onSubmit={envoyer} noValidate className="space-y-3 border-t-2 border-dashed border-[var(--trait)] pt-5" data-film="coordonnees">
            <p className="font-[family-name:var(--titres)] text-3xl font-bold [font-variant-numeric:lining-nums]">
              {soir.long.charAt(0).toUpperCase() + soir.long.slice(1)}, {heure}
            </p>
            <p className="text-[var(--doux)] [font-variant-numeric:lining-nums]">{seance.nom} · {seance.duree} · {seance.prix} · prix d&apos;exemple</p>
            <label className="block space-y-1">
              <span className="text-sm font-semibold">Nom</span>
              <input id="rf-nom" value={nom} onChange={(e) => setNom(e.target.value)} readOnly={reserve} autoComplete="off" className="w-full min-h-12 rounded-xl border-2 border-[var(--trait)] px-4 outline-none focus:border-[var(--encre)]" />
            </label>
            <label className="block space-y-1">
              <span className="text-sm font-semibold">Téléphone</span>
              <input id="rf-tel" value={tel} onChange={(e) => setTel(e.target.value)} readOnly={reserve} inputMode="tel" autoComplete="off" className="w-full min-h-12 rounded-xl border-2 border-[var(--trait)] px-4 tabular-nums outline-none focus:border-[var(--encre)]" />
            </label>
            <p className="text-sm text-[var(--doux)]">Ni poids, ni objectif, ni motif à écrire : on en parle en séance.</p>
            {reserve ? (
              <div role="status" className="space-y-1 rounded-2xl bg-[#F2C94C] p-4 text-[#1F3B24]">
                <p className="font-[family-name:var(--titres)] text-2xl font-bold [font-variant-numeric:lining-nums]">Réservé : {soir.long} {heure}</p>
                <p className="text-sm">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
              </div>
            ) : (
              <>
                {erreur && <p role="alert" className="text-sm font-semibold text-[var(--accent-texte)]">{erreur}</p>}
                <button type="submit" className="w-full min-h-14 rounded-full bg-[var(--encre)] font-[family-name:var(--titres)] text-xl font-bold text-[var(--fond)]">Réserver</button>
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
    </div>
  );
}
