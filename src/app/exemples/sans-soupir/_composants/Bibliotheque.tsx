"use client";

import { useEffect, useState } from "react";
import { FICHES, type FicheGuide } from "./donnees";

const THEMES = ["Toutes", "Appels", "Photos", "Sécurité", "Réglages"] as const;

// À l'impression, seule la feuille sort : ni le bandeau, ni le menu, ni le pied.
const IMPRESSION = "@media print { body * { visibility: hidden !important; } #ss-feuille, #ss-feuille * { visibility: visible !important; } #ss-feuille { position: absolute; inset: 0 auto auto 0; width: 100%; border: 0 !important; box-shadow: none !important; } #ss-feuille [data-ecran] { display: none !important; } }";

/**
 * Toutes les fiches, gratuites, à imprimer. On en choisit une : elle s'ouvre comme une
 * feuille, en gros caractères, prête pour l'imprimante (seule la feuille s'imprime).
 * Rien n'est envoyé, aucun compte, aucune adresse demandée.
 */
export default function Bibliotheque() {
  const [theme, setTheme] = useState<(typeof THEMES)[number]>("Toutes");
  const [ouverte, setOuverte] = useState<FicheGuide | null>(null);
  const [gros, setGros] = useState(false);
  const liste = FICHES.filter((f) => theme === "Toutes" || f.theme === theme);
  // La fiche ouverte vient sous les yeux : sur un téléphone, elle serait sinon plus bas.
  useEffect(() => {
    if (ouverte) document.getElementById("ss-fiche-ouverte")?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [ouverte]);

  if (ouverte) {
    return (
      <div data-film="fiches" id="ss-fiche-ouverte" className="scroll-mt-[84px] space-y-4">
        <style>{IMPRESSION}</style>
        <div data-ecran className="flex flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={() => setOuverte(null)} className="rounded-full border-2 border-[var(--sombre)] px-5 py-3 font-bold">
            ← Toutes les fiches
          </button>
          <button type="button" aria-pressed={gros} onClick={() => setGros((g) => !g)} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 py-3 font-bold">
            {gros ? "Taille normale" : "Encore plus gros"}
          </button>
        </div>
        <article id="ss-feuille" aria-label={`Fiche n° ${ouverte.numero}`} className="rounded-[10px] bg-[var(--carte)] border border-[var(--trait)] shadow-[0_30px_60px_-35px_rgba(47,72,88,0.6)] px-6 py-8 sm:px-10 sm:py-12 space-y-6">
          <p className="flex items-center justify-between text-base font-bold text-[var(--accent-texte)]">
            <span>Sans Soupir · fiche n° {ouverte.numero}</span>
            <span data-ecran className="rounded-full bg-[var(--fond)] px-3 py-1 text-sm text-[var(--encre)]">à imprimer</span>
          </p>
          <h2 className={`${gros ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"} font-bold leading-[1.05] tracking-tight`}>{ouverte.titre}</h2>
          <ol className="space-y-5">
            {ouverte.etapes.map((e, i) => (
              <li key={e} className={`flex items-start gap-4 ${gros ? "text-[32px] sm:text-4xl" : "text-[26px] sm:text-3xl"} font-semibold leading-snug`}>
                <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-2xl font-bold text-[var(--sur-accent)]">{i + 1}</span>
                <span className="pt-1">{e}</span>
              </li>
            ))}
          </ol>
          <p className="border-t-2 border-dashed border-[var(--trait)] pt-5 text-2xl font-semibold">{ouverte.aide}</p>
        </article>
        <button data-ecran type="button" onClick={() => window.print()} className="w-full rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-4 text-lg font-bold">
          Imprimer cette fiche
        </button>
        <p data-ecran className="text-sm text-[var(--doux)]">Gratuite, sans compte, sans adresse. Rien n&apos;est envoyé : la fiche s&apos;imprime depuis ton navigateur.</p>
      </div>
    );
  }

  return (
    <div data-film="fiches" className="space-y-5">
      <div role="group" aria-label="Thèmes" className="flex flex-wrap gap-2">
        {THEMES.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={theme === t}
            onClick={() => setTheme(t)}
            className={`shrink-0 rounded-full border-2 px-4 py-2.5 font-bold transition-colors ${theme === t ? "border-[var(--sombre)] bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {liste.map((f) => (
          <li key={f.numero}>
            <button
              type="button"
              data-fiche={f.numero}
              onClick={() => {
                setOuverte(f);
                setGros(false);
              }}
              className="w-full rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] p-5 text-left space-y-2 hover:border-[var(--sombre)]"
            >
              <span className="flex items-center justify-between text-sm font-bold text-[var(--doux)]">
                <span>Fiche n° {f.numero}</span>
                <span className="rounded-full bg-[#DCEBF3] px-2.5 py-0.5 text-[var(--encre)]">{f.theme}</span>
              </span>
              <span className="block font-[family-name:var(--titres)] text-[22px] font-bold leading-tight">{f.titre}</span>
              <span className="block font-semibold text-[var(--accent-texte)]">Voir la fiche →</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
