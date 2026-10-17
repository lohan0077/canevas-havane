"use client";

import { useState } from "react";

const AUTEURS = [
  { id: "famille", libelle: "Quelqu'un de la famille" },
  { id: "studio", libelle: "Un studio photo" },
  { id: "inconnu", libelle: "Je ne sais pas" },
];

/**
 * Préparer le dépôt d'une photo pour la vitrine. Trois questions, dont celle qui
 * compte : qui l'a prise (un vieux portrait de studio reste protégé par le droit
 * d'auteur). Le formulaire n'envoie rien : la démonstration le dit.
 */
export default function DepotPhoto() {
  const [annee, setAnnee] = useState("");
  const [auteur, setAuteur] = useState("famille");
  const [accord, setAccord] = useState(false);
  const [pret, setPret] = useState(false);
  const [erreur, setErreur] = useState("");

  const valider = (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(annee);
    if (!annee || !Number.isInteger(n) || n < 1850 || n > 2026) {
      setErreur("Indique une année entre 1850 et 2026, même approximative.");
      setPret(false);
      return;
    }
    if (!accord) {
      setErreur("Sans l'accord des personnes photographiées (ou de leurs proches), on n'expose pas la photo.");
      setPret(false);
      return;
    }
    setErreur("");
    setPret(true);
  };

  return (
    <form onSubmit={valider} noValidate className="border border-[var(--encre)] bg-[var(--carte)] p-5 sm:p-8 space-y-6">
      <label className="block space-y-2">
        <span className="text-xs font-bold uppercase tracking-[0.18em]">L&apos;année de la photo, à peu près</span>
        <input
          type="text"
          inputMode="numeric"
          value={annee}
          onChange={(e) => {
            setAnnee(e.target.value.replace(/\D/g, "").slice(0, 4));
            setPret(false);
          }}
          placeholder="1957"
          className="w-full border-b-2 border-[var(--encre)] bg-transparent py-2 font-[family-name:var(--titres)] text-4xl outline-none placeholder:text-[var(--doux)] focus:border-[var(--accent)] [font-variant-numeric:lining-nums]"
        />
      </label>

      <fieldset className="space-y-2">
        <legend className="text-xs font-bold uppercase tracking-[0.18em]">Qui l&apos;a prise&nbsp;?</legend>
        <div className="grid gap-2 pt-1">
          {AUTEURS.map((a) => (
            <label key={a.id} className={`flex items-center gap-3 border px-4 py-3 cursor-pointer ${auteur === a.id ? "border-[var(--encre)] bg-[var(--fond)]" : "border-[var(--trait)]"}`}>
              <input type="radio" name="auteur" value={a.id} checked={auteur === a.id} onChange={() => { setAuteur(a.id); setPret(false); }} className="h-5 w-5 accent-[var(--accent)]" />
              <span className="font-bold">{a.libelle}</span>
            </label>
          ))}
        </div>
        {auteur !== "famille" && (
          <p className="pt-2 text-sm leading-relaxed text-[var(--doux)]">
            Un portrait de studio reste protégé soixante-dix ans après la mort du photographe :
            on préfère les photos prises par la famille, ou l&apos;accord de ses ayants droit.
          </p>
        )}
      </fieldset>

      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" checked={accord} onChange={(e) => { setAccord(e.target.checked); setPret(false); }} className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]" />
        <span className="leading-snug">Les personnes sur la photo, ou leurs proches, sont d&apos;accord pour qu&apos;elle soit exposée.</span>
      </label>

      {erreur && <p role="alert" className="font-bold text-[var(--accent-texte)]">{erreur}</p>}

      <button type="submit" className="w-full min-h-[52px] rounded-full bg-[var(--accent)] text-[var(--sur-accent)] font-bold">
        Préparer mon dépôt
      </button>

      {pret && (
        <div role="status" className="border-2 border-[var(--accent)] bg-[var(--fond)] p-4 space-y-1">
          <p className="font-bold">Ta photo de {annee} a sa place sur le mur. Apporte-la au studio : on la scanne devant toi, on expose un tirage, et l'original repart avec toi.</p>
          <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        </div>
      )}
    </form>
  );
}
