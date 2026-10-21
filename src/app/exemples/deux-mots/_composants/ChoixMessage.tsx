"use client";

import { useState } from "react";
import Image from "next/image";
import { MESSAGES, PHOTOS, boutique, euros } from "./donnees";

/**
 * L'outil de l'accueil : « C'est pour dire quoi ? ». On touche un mot ; le site
 * propose le bouquet et la phrase, écrite à la main sur la carte ; on signe, on
 * commande. Rien ne quitte le navigateur, et la confirmation le dit.
 */
export default function ChoixMessage() {
  const [id, setId] = useState<string | null>(null);
  const [rang, setRang] = useState(0);
  const [pour, setPour] = useState("");
  const [signe, setSigne] = useState("");
  const [commande, setCommande] = useState(false);
  const message = MESSAGES.find((m) => m.id === id) ?? null;
  const photo = message ? PHOTOS[message.couleur] : null;

  const choisir = (nouveau: string) => {
    setId(nouveau);
    setRang(0);
    setCommande(false);
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" role="group" aria-label="C'est pour dire quoi ?">
        {MESSAGES.map((m) => (
          <button
            key={m.id}
            type="button"
            data-message={m.id}
            aria-pressed={id === m.id}
            onClick={() => choisir(m.id)}
            className={`min-h-[72px] rounded-full border px-4 py-3 font-[family-name:var(--titres)] text-xl italic transition-colors ${
              id === m.id ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--encre)] bg-[var(--carte)] text-[var(--encre)] hover:bg-[var(--fond)]"
            }`}
          >
            {m.dire}
          </button>
        ))}
      </div>

      {message && photo && (
        <div id="proposition" className="scroll-mt-20 grid gap-8 md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full">
              <Image src={photo.src} alt={photo.alt} width={photo.largeur} height={photo.hauteur} sizes="(min-width: 768px) 420px, 100vw" className="h-full w-full object-cover" />
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Pour dire « {message.dire.toLowerCase()} »</p>
                <p className="font-[family-name:var(--titres)] text-3xl">{message.bouquet}</p>
              </div>
              <p className="font-[family-name:var(--titres)] text-3xl [font-variant-numeric:lining-nums]">{euros(message.prix)}</p>
            </div>
            <p className="text-[var(--doux)]">{message.detail}</p>
          </div>

          <div id="carte" className="scroll-mt-20 space-y-5">
            <div className="relative rotate-[-1.5deg] rounded-[6px] bg-[var(--carte)] p-6 shadow-[0_24px_50px_-28px_rgba(58,14,28,0.55)] [background-image:repeating-linear-gradient(transparent_0_37px,#F1DDD5_37px_38px)]">
              <label className="flex items-baseline gap-2 font-[family-name:var(--f-caveat)] text-2xl">
                <span>Pour :</span>
                <input
                  value={pour}
                  onChange={(e) => setPour(e.target.value)}
                  placeholder="son prénom"
                  maxLength={24}
                  className="w-full bg-transparent text-[var(--accent-texte)] outline-none placeholder:text-[var(--doux)]"
                />
              </label>
              <p className="mt-4 min-h-[96px] font-[family-name:var(--f-caveat)] text-[34px] leading-[1.1] text-[var(--encre)]" aria-live="polite">
                {message.phrases[rang]}
              </p>
              <label className="mt-4 flex items-baseline justify-end gap-2 font-[family-name:var(--f-caveat)] text-2xl">
                <span>—</span>
                <input
                  id="signature"
                  value={signe}
                  onChange={(e) => setSigne(e.target.value)}
                  placeholder="ta signature"
                  maxLength={24}
                  aria-label="Ta signature"
                  className="w-40 bg-transparent text-right text-[var(--accent-texte)] outline-none placeholder:text-[var(--doux)]"
                />
              </label>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button type="button" onClick={() => setRang((rang + 1) % message.phrases.length)} className="text-sm font-semibold underline underline-offset-4">
                Une autre phrase ({rang + 1}/{message.phrases.length})
              </button>
              <p className="text-sm text-[var(--doux)]">Écrite à la main, à l&apos;encre.</p>
            </div>
            {commande ? (
              <div role="status" className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--carte)] p-4 space-y-1">
                <p className="font-semibold">
                  {message.bouquet} et sa carte{signe ? `, signée ${signe}` : ""} : livrés aujourd&apos;hui.
                </p>
                <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setCommande(true)}
                className="flex w-full items-center justify-between gap-4 rounded-full bg-[var(--encre)] py-2 pl-6 pr-2 text-[var(--fond)]"
              >
                <span className="text-lg font-semibold">Commander pour aujourd&apos;hui</span>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--fond)] text-[var(--encre)] [font-variant-numeric:lining-nums]" aria-hidden="true">→</span>
              </button>
            )}
            <p className="text-xs text-[var(--doux)]">
              Prix TTC d&apos;exemple, livraison {euros(boutique.livraison)} dans la ville. Commandé avant {boutique.heureLimite}, livré aujourd&apos;hui.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
