"use client";

import { useState, type FormEvent } from "react";
import { COURSE, CRENEAUX } from "./donnees";

const champ = "min-h-12 w-full rounded-2xl border-2 border-[var(--encre)] bg-[var(--carte)] px-4 text-lg focus:outline-none focus:ring-4 focus:ring-[#F2C14E]";

/** Réserver sa première heure : un prénom, un créneau. Rien n'est envoyé. */
export function PremiereHeure() {
  const [creneau, setCreneau] = useState(CRENEAUX[0]);
  const [fait, setFait] = useState<string | null>(null);
  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFait(String(new FormData(e.currentTarget).get("prenom")));
  };
  if (fait) {
    return (
      <div role="status" className="space-y-2 rounded-[32px] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)]">
        <p className="font-[family-name:var(--titres)] text-[30px] font-extrabold leading-tight text-[#F2C14E]">À {creneau.toLowerCase()}, {fait} !</p>
        <p className="leading-relaxed">Rendez-vous sur le parking du magasin. Vélo et casque prêtés, selle réglée avant de partir.</p>
        <p className="text-sm font-semibold">Démonstration : rien n&apos;est envoyé, rien n&apos;est réservé.</p>
        <button type="button" onClick={() => setFait(null)} className="text-sm font-semibold underline underline-offset-4">Changer de créneau</button>
      </div>
    );
  }
  return (
    <form onSubmit={soumettre} className="space-y-5 rounded-[32px] bg-[var(--carte)] p-6">
      <label className="block space-y-2">
        <span className="block font-semibold">Ton prénom</span>
        <input name="prenom" required maxLength={30} autoComplete="given-name" className={champ} />
      </label>
      <fieldset className="space-y-2">
        <legend className="font-semibold">Quand ?</legend>
        <div className="grid grid-cols-2 gap-2">
          {CRENEAUX.map((c) => (
            <button key={c} type="button" aria-pressed={creneau === c} onClick={() => setCreneau(c)} className={`min-h-12 rounded-2xl border-2 px-3 text-[15px] font-semibold ${creneau === c ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--fond)]"}`}>
              {c}
            </button>
          ))}
        </div>
      </fieldset>
      <button type="submit" className="min-h-14 w-full rounded-full bg-[#F2C14E] px-6 text-[17px] font-bold text-[#1F3A2C]">
        Réserver ma première heure
      </button>
      <p className="text-[13px] text-[var(--doux)]">Créneaux d&apos;exemple. La première heure est offerte, sans obligation d&apos;achat.</p>
    </form>
  );
}

/** S'inscrire à la course de lenteur. Rien à gagner, rien n'est envoyé. */
export function Inscription() {
  const [fait, setFait] = useState<string | null>(null);
  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFait(String(new FormData(e.currentTarget).get("prenom")));
  };
  if (fait) {
    return (
      <div role="status" className="space-y-2 rounded-[32px] bg-[var(--carte)] p-6">
        <p className="font-[family-name:var(--titres)] text-[28px] font-extrabold leading-tight">Inscrit·e, {fait}. Prends ton temps.</p>
        <p className="leading-relaxed text-[var(--doux)]">{COURSE.date}, {COURSE.heure}, {COURSE.lieu}. Casque prêté sur place.</p>
        <p className="text-sm font-semibold">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
      </div>
    );
  }
  return (
    <form onSubmit={soumettre} className="space-y-4 rounded-[32px] bg-[var(--carte)] p-6">
      <label className="block space-y-2">
        <span className="block font-semibold">Ton prénom</span>
        <input name="prenom" required maxLength={30} autoComplete="given-name" className={champ} />
      </label>
      <label className="flex items-start gap-3 text-[15px] leading-relaxed">
        <input type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]" />
        <span>Je viens avec mon vélo, ou j&apos;en emprunte un sur place. Je porterai un casque (prêté).</span>
      </label>
      <button type="submit" className="min-h-14 w-full rounded-full bg-[var(--accent)] px-6 text-[17px] font-bold text-[var(--sur-accent)]">
        M&apos;inscrire (lentement)
      </button>
    </form>
  );
}
