"use client";

import { useState } from "react";

// Prix de rachat = bénéfice mensuel × ce multiplicateur.
// Modifier cette seule valeur suffit à changer la formule sur toute la page.
const MULTIPLICATEUR_RACHAT = 10;
const COMMISSION_MIN = 0.25;
const COMMISSION_MAX = 0.5;

const euros = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function SimulateurRachat() {
  const [benefice, setBenefice] = useState(100);

  const rachat = benefice * MULTIPLICATEUR_RACHAT;
  const commissionMin = benefice * COMMISSION_MIN;
  const commissionMax = benefice * COMMISSION_MAX;

  return (
    <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 space-y-12">
      <div className="space-y-4 text-center">
        <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-[var(--color-primary)]">
          Simulateur
        </h3>
        <p className="text-xl md:text-2xl font-light text-[var(--color-foreground)]/60 font-serif">
          Estimez votre partenariat en un chiffre.
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        <label
          htmlFor="benefice"
          className="block text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-[var(--color-secondary)] text-center"
        >
          Bénéfice mensuel généré
        </label>
        <div className="flex items-center justify-center gap-4">
          <input
            id="benefice"
            type="number"
            min={0}
            step={50}
            value={benefice}
            onChange={(e) => setBenefice(Math.max(0, Number(e.target.value) || 0))}
            className="w-48 bg-transparent border-b-2 border-[var(--color-foreground)]/10 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-all duration-700 font-light text-3xl md:text-5xl text-center"
          />
          <span className="text-3xl md:text-5xl font-light text-[var(--color-foreground)]/20">€</span>
        </div>
        <input
          type="range"
          min={0}
          max={5000}
          step={50}
          value={Math.min(benefice, 5000)}
          onChange={(e) => setBenefice(Number(e.target.value))}
          aria-label="Ajuster le bénéfice mensuel"
          className="w-full accent-[var(--color-primary)] cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-[var(--color-foreground)]/5">
        <div className="space-y-3 text-center">
          <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-foreground)]/30">
            Votre part mensuelle
          </span>
          <p className="text-2xl md:text-4xl font-medium font-serif text-[var(--color-foreground)]">
            {euros(benefice - commissionMax)} – {euros(benefice - commissionMin)}
          </p>
          <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--color-foreground)]/25 italic">
            après commission de {euros(commissionMin)} à {euros(commissionMax)}
          </span>
        </div>

        <div className="space-y-3 text-center">
          <span className="block text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-primary)]">
            Prix de rachat
          </span>
          <p className="text-2xl md:text-4xl font-medium font-serif text-[var(--color-primary)]">
            {euros(rachat)}
          </p>
          <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--color-foreground)]/25 italic">
            pour devenir pleinement propriétaire
          </span>
        </div>
      </div>

      <p className="text-[10px] md:text-[11px] text-center text-[var(--color-foreground)]/25 uppercase tracking-[0.25em] leading-loose">
        Estimation indicative — le taux exact est fixé lors de la négociation.
      </p>
    </div>
  );
}
