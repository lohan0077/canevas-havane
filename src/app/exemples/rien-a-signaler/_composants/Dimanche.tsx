"use client";

import { useState } from "react";
import s from "./Calme.module.css";

/**
 * Le message du dimanche, sur un écran verrouillé : un rapport automatique de l'alarme,
 * sans télésurveillance. Le bouton fait arriver l'exemple ; rien n'est envoyé.
 */
export default function Dimanche() {
  const [recu, setRecu] = useState(false);
  return (
    <div className="space-y-4" data-film="dimanche">
      <div className="mx-auto w-full max-w-[300px] rounded-[44px] border-[10px] border-[var(--encre)] bg-[#14213D] bg-[linear-gradient(180deg,#1E2F57_0%,#14213D_100%)] text-[var(--sur-sombre)] px-4 pt-10 pb-14 min-h-[440px]">
        <p className="text-center font-[family-name:var(--titres)] text-6xl font-bold tabular-nums tracking-[-0.03em]">9:00</p>
        <p className="text-center text-sm">dimanche</p>
        {recu ? (
          <div className={`${s.notification} mt-8 rounded-[20px] bg-[var(--fond)] text-[var(--encre)] p-4 space-y-1`} role="status" data-film="message">
            <p className="flex items-center gap-2 text-sm">
              <span aria-hidden="true" className="grid place-items-center w-6 h-6 rounded-md bg-[var(--accent)] text-[var(--sur-accent)] text-xs font-bold">✓</span>
              <span className="font-semibold">Rien à Signaler</span>
              <span className="ml-auto text-xs text-[var(--doux)]">maintenant</span>
            </p>
            <p className="font-[family-name:var(--titres)] text-lg font-bold leading-snug">Cette semaine : rien à signaler.</p>
            <p className="text-sm">0 alerte · 0 fausse alerte. Bon dimanche.</p>
            <p className="pt-1 text-xs text-[var(--doux)]">Rapport automatique de ton alarme · sans télésurveillance</p>
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-[#B7C3DE]">Aucune notification</p>
        )}
      </div>
      <button
        type="button"
        data-film="recevoir"
        onClick={() => setRecu((r) => !r)}
        className="mx-auto flex min-h-12 items-center rounded-full bg-[var(--encre)] text-[var(--fond)] px-6 text-base font-semibold"
      >
        {recu ? "Masquer le message" : "Voir le message de dimanche"}
      </button>
      <p className="text-center text-sm text-[var(--doux)]">Un exemple, affiché dans ton navigateur : rien n&apos;est envoyé.</p>
    </div>
  );
}
