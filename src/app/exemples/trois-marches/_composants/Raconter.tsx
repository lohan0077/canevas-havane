"use client";

import { useState } from "react";

const DEPART = "Ici, on a fêté tous les anniversaires dans le jardin, même ceux de novembre.";

/**
 * « Raconte ta maison » : le vendeur écrit un souvenir, son prénom, ses années, et voit
 * aussitôt comment son annonce commencerait. Rien n'est envoyé : c'est le navigateur
 * qui compose l'aperçu.
 */
export default function Raconter() {
  const [souvenir, setSouvenir] = useState(DEPART);
  const [prenom, setPrenom] = useState("Sophie");
  const [depuis, setDepuis] = useState("2011");
  const [envoye, setEnvoye] = useState(false);
  const reste = 160 - souvenir.length;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setEnvoye(true);
        }}
      >
        <label className="block space-y-2">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em]">Un souvenir de la maison</span>
          <textarea
            value={souvenir}
            maxLength={160}
            rows={4}
            onChange={(e) => { setSouvenir(e.target.value); setEnvoye(false); }}
            className="w-full resize-none border border-[var(--trait)] bg-[var(--carte)] p-4 font-[family-name:var(--f-caveat)] text-[26px] leading-snug outline-none focus:border-[var(--encre)]"
          />
          <span className="block text-right text-[13px] text-[var(--doux)]">{reste} signes restants</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block space-y-2">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em]">Ton prénom</span>
            <input value={prenom} maxLength={30} onChange={(e) => { setPrenom(e.target.value); setEnvoye(false); }} className="h-12 w-full border border-[var(--trait)] bg-[var(--carte)] px-3 text-[17px] outline-none focus:border-[var(--encre)]" />
          </label>
          <label className="block space-y-2">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em]">Ici depuis</span>
            <input value={depuis} inputMode="numeric" maxLength={4} onChange={(e) => { setDepuis(e.target.value.replace(/\D/g, "")); setEnvoye(false); }} className="h-12 w-full border border-[var(--trait)] bg-[var(--carte)] px-3 text-[17px] tabular-nums outline-none focus:border-[var(--encre)]" />
          </label>
        </div>
        <p className="text-[14px] leading-relaxed text-[var(--doux)]">
          Des souvenirs seulement : l&apos;état de la maison, c&apos;est nous et les diagnostics. Ton prénom,
          jamais ton nom ; aucun prénom d&apos;enfant. Rien n&apos;est publié sans ton accord écrit.
        </p>
        <button type="submit" className="h-14 w-full bg-[var(--accent)] px-6 text-[15px] font-semibold uppercase tracking-[0.16em] text-[var(--sur-accent)] sm:w-auto">
          Proposer mon histoire
        </button>
        {envoye && (
          <p role="status" className="border-l-2 border-[var(--accent)] pl-4 text-[15px]">
            Démonstration : rien n&apos;est envoyé. Sur un vrai site, l&apos;agence te rappellerait pour relire ton texte avec toi.
          </p>
        )}
      </form>

      <figure aria-label="Aperçu de l'annonce" className="border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-texte)]">L&apos;histoire de la maison</p>
        <blockquote className="mt-4 font-[family-name:var(--f-caveat)] text-[34px] leading-[1.15]">
          «&nbsp;{souvenir.trim() || "…"}&nbsp;»
        </blockquote>
        <figcaption className="mt-4 text-[15px] text-[var(--doux)]">
          {prenom.trim() || "…"}, qui vend la maison · {depuis || "…"} – 2026
        </figcaption>
        <p className="mt-6 border-t border-[var(--trait)] pt-4 text-[13px] text-[var(--doux)]">Aperçu : c&apos;est ainsi que ton annonce commencerait. Le prix et ce que la loi impose suivent, juste en dessous.</p>
      </figure>
    </div>
  );
}
