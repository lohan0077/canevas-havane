"use client";

import { useState } from "react";

// Prix de rachat = montant mensuel du partenariat × ce multiplicateur,
// sauf accord différent au devis. Modifier cette seule valeur suffit.
const MULTIPLICATEUR_RACHAT = 10;

const euros = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

type Modele = "rendez-vous" | "vente" | "devis";

const parametres: Record<
  Modele,
  {
    onglet: string;
    volume: { label: string; max: number; step: number; defaut: number; unite: string };
    taux: { label: string; min: number; max: number; step: number; defaut: number; unite: string };
  }
> = {
  "rendez-vous": {
    onglet: "Rendez-vous",
    volume: {
      label: "Rendez-vous pris via votre site, par mois",
      max: 200,
      step: 5,
      defaut: 40,
      unite: "rendez-vous",
    },
    taux: { label: "Montant par rendez-vous", min: 1, max: 30, step: 1, defaut: 5, unite: "€" },
  },
  vente: {
    onglet: "Vente en ligne",
    volume: {
      label: "Ventes réalisées via votre site, par mois",
      max: 20000,
      step: 100,
      defaut: 2000,
      unite: "€",
    },
    taux: { label: "Pourcentage des ventes", min: 1, max: 25, step: 1, defaut: 10, unite: "%" },
  },
  devis: {
    onglet: "Demandes de devis",
    volume: {
      label: "Demandes de devis qualifiées reçues, par mois",
      max: 100,
      step: 1,
      defaut: 10,
      unite: "demandes",
    },
    taux: { label: "Montant par demande", min: 5, max: 100, step: 5, defaut: 30, unite: "€" },
  },
};

export default function SimulateurRachat() {
  const [modele, setModele] = useState<Modele>("rendez-vous");
  const [volumes, setVolumes] = useState<Record<Modele, number>>({
    "rendez-vous": parametres["rendez-vous"].volume.defaut,
    vente: parametres.vente.volume.defaut,
    devis: parametres.devis.volume.defaut,
  });
  const [tauxChoisis, setTauxChoisis] = useState<Record<Modele, number>>({
    "rendez-vous": parametres["rendez-vous"].taux.defaut,
    vente: parametres.vente.taux.defaut,
    devis: parametres.devis.taux.defaut,
  });

  const p = parametres[modele];
  const volume = volumes[modele];
  const taux = tauxChoisis[modele];

  const mensuel = modele === "vente" ? (volume * taux) / 100 : volume * taux;
  const rachat = mensuel * MULTIPLICATEUR_RACHAT;

  return (
    <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 space-y-12">
      <div className="space-y-4 text-center">
        <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary-texte)]">
          Simulateur
        </h3>
        <p className="text-xl md:text-2xl font-light text-[var(--color-foreground)]/70 font-serif">
          Choisissez votre modèle, ajustez, lisez.
        </p>
      </div>

      {/* Choix du type de site */}
      <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Type de site">
        {(Object.keys(parametres) as Modele[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setModele(m)}
            aria-pressed={modele === m}
            className={`px-5 py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500 border ${
              modele === m
                ? "bg-secondary text-white border-transparent"
                : "border-[var(--color-foreground)]/10 text-[var(--color-foreground)]/70 hover:border-[var(--color-foreground)]/30"
            }`}
          >
            {parametres[m].onglet}
          </button>
        ))}
      </div>

      <div className="max-w-xl mx-auto space-y-10">
        {/* Volume */}
        <div className="space-y-4">
          <label
            htmlFor="volume"
            className="block text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)] text-center"
          >
            {p.volume.label}
          </label>
          <div className="flex items-center justify-center gap-4">
            <input
              id="volume"
              type="number"
              min={0}
              step={p.volume.step}
              value={volume}
              onChange={(e) =>
                setVolumes({ ...volumes, [modele]: Math.max(0, Number(e.target.value) || 0) })
              }
              className="w-40 bg-transparent border-b-2 border-[var(--color-foreground)]/10 py-2 focus:outline-none focus:border-[var(--color-primary)] transition-all duration-700 font-light text-2xl md:text-4xl text-center"
            />
            <span className="text-lg md:text-xl font-light text-[var(--color-foreground)]/70">
              {p.volume.unite}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={p.volume.max}
            step={p.volume.step}
            value={Math.min(volume, p.volume.max)}
            onChange={(e) => setVolumes({ ...volumes, [modele]: Number(e.target.value) })}
            aria-label={p.volume.label}
            className="w-full accent-[var(--color-primary)] cursor-pointer"
          />
        </div>

        {/* Taux ou montant, au choix */}
        <div className="space-y-4">
          <label
            htmlFor="taux"
            className="block text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)] text-center"
          >
            {p.taux.label}
          </label>
          <div className="flex items-center justify-center gap-4">
            <input
              id="taux"
              type="number"
              min={p.taux.min}
              max={p.taux.max}
              step={p.taux.step}
              value={taux}
              onChange={(e) =>
                setTauxChoisis({
                  ...tauxChoisis,
                  [modele]: Math.min(p.taux.max, Math.max(p.taux.min, Number(e.target.value) || p.taux.min)),
                })
              }
              className="w-28 bg-transparent border-b-2 border-[var(--color-foreground)]/10 py-2 focus:outline-none focus:border-[var(--color-primary)] transition-all duration-700 font-light text-2xl md:text-4xl text-center"
            />
            <span className="text-lg md:text-xl font-light text-[var(--color-foreground)]/70">
              {p.taux.unite}
            </span>
          </div>
          <input
            type="range"
            min={p.taux.min}
            max={p.taux.max}
            step={p.taux.step}
            value={taux}
            onChange={(e) => setTauxChoisis({ ...tauxChoisis, [modele]: Number(e.target.value) })}
            aria-label={p.taux.label}
            className="w-full accent-[var(--color-primary)] cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-[var(--color-foreground)]/5">
        <div className="space-y-3 text-center">
          <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-foreground)]/70">
            Partenariat par mois
          </span>
          <p className="text-2xl md:text-4xl font-medium font-serif text-[var(--color-foreground)]">
            {euros(mensuel)}
          </p>
          <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--color-foreground)]/70 italic">
            uniquement sur l&apos;activité passée via votre site
          </span>
        </div>

        <div className="space-y-3 text-center">
          <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-primary-texte)]">
            Prix de rachat
          </span>
          <p className="text-2xl md:text-4xl font-medium font-serif text-[var(--color-primary-texte)]">
            {euros(rachat)}
          </p>
          <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--color-foreground)]/70 italic">
            pour devenir propriétaire à 100 %
          </span>
        </div>
      </div>

      <p className="text-[10px] md:text-[11px] text-center text-[var(--color-foreground)]/70 uppercase tracking-[0.25em] leading-loose">
        Estimation indicative — montants et taux réels fixés au devis. <br />
        Rachat : dix fois le montant mensuel du partenariat, sauf accord différent au devis.
      </p>
    </div>
  );
}
