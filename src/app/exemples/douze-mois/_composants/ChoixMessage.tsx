"use client";

import { useState } from "react";
import Image from "next/image";
import { MESSAGES, MOIS, NOM_TON, PHOTOS, boutique, deMois, euros } from "./donnees";
import { useMoisCourant } from "./mois";

const ETAPES = ["Dire", "Le bouquet", "La carte", "Signer"];

/**
 * L'outil de l'accueil, comme une application : « C'est pour dire quoi ? ». On touche
 * un mot ; le site propose le bouquet — fait de ce qui fleurit ce mois-ci — et la
 * phrase, écrite à la main sur la carte ; on signe, on commande. Rien ne quitte le
 * navigateur, et la confirmation le dit.
 */
export default function ChoixMessage() {
  const n = useMoisCourant();
  const mois = MOIS[n - 1];
  const [id, setId] = useState<string | null>(null);
  const [rang, setRang] = useState(0);
  const [pour, setPour] = useState("");
  const [signe, setSigne] = useState("");
  const [commande, setCommande] = useState(false);
  const message = MESSAGES.find((m) => m.id === id) ?? null;
  const photo = PHOTOS[mois.photo];
  const etape = !message ? 0 : commande ? 4 : signe ? 3 : 2;

  const choisir = (nouveau: string) => {
    setId(nouveau);
    setRang(0);
    setCommande(false);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--trait)] bg-[var(--carte)]">
      {/* La barre de l'application */}
      <div className="flex items-center justify-between gap-4 border-b border-[var(--trait)] bg-[var(--fond)] px-5 py-3.5 sm:px-8">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">Commande · {mois.nom}</p>
        <ol className="hidden items-center gap-5 text-[12px] font-medium uppercase tracking-[0.16em] sm:flex" aria-label="Étapes">
          {ETAPES.map((e, i) => (
            <li key={e} className={`flex items-center gap-2 ${i < etape ? "text-[var(--encre)]" : "text-[var(--doux)]"}`}>
              <span aria-hidden="true" className={`grid h-5 w-5 place-items-center rounded-full border text-[10px] ${i < etape ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)]"}`}>
                {i < etape ? "✓" : i + 1}
              </span>
              {e}
            </li>
          ))}
        </ol>
        <p className="font-[family-name:var(--titres)] text-[15px] italic text-[var(--doux)]">avant {boutique.heureLimite}, aujourd&apos;hui</p>
      </div>

      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        {/* 1. Ce qu'on veut dire */}
        <div className="space-y-5 border-b border-[var(--trait)] p-5 sm:p-8 lg:border-b-0 lg:border-r">
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">Touche le mot</p>
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="C'est pour dire quoi ?">
            {MESSAGES.map((m) => {
              const actif = id === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  data-message={m.id}
                  aria-pressed={actif}
                  onClick={() => choisir(m.id)}
                  className={`min-h-[60px] rounded-xl border px-3 py-2 text-left font-[family-name:var(--titres)] text-[clamp(1.15rem,2vw,1.45rem)] italic leading-tight transition-all duration-300 ${
                    actif
                      ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]"
                      : "border-[var(--trait)] bg-[var(--fond)] text-[var(--encre)] hover:border-[var(--encre)]"
                  }`}
                >
                  {m.dire}
                </button>
              );
            })}
          </div>
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">
            Le bouquet suit le mois : en {mois.nom.toLowerCase()}, {mois.fleur.toLowerCase()} et ce qui fleurit avec. Pas de roses en janvier.
          </p>
        </div>

        {/* 2, 3, 4. Le bouquet, la carte, la signature */}
        <div className="p-5 sm:p-8">
          {!message ? (
            <div className="flex h-full min-h-[260px] items-center gap-6">
              <span className="relative block h-48 w-32 shrink-0 overflow-hidden rounded-t-full opacity-80">
                <Image src={photo.src} alt="" fill sizes="128px" className="object-cover" />
              </span>
              <p className="font-[family-name:var(--titres)] text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">
                Touche un mot. <span className="italic text-[var(--accent-texte)]">Le bouquet et la phrase apparaissent ici.</span>
              </p>
            </div>
          ) : (
            <div id="proposition" className="scroll-mt-24 space-y-6">
              <div className="grid grid-cols-[104px_1fr] items-end gap-5 sm:grid-cols-[150px_1fr]">
                <span className="relative block aspect-[3/4] overflow-hidden rounded-t-full bg-[var(--sombre)]">
                  <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="150px" className="object-cover" />
                </span>
                <div className="space-y-2">
                  <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">Pour dire « {message.dire.toLowerCase()} »</p>
                  <p className="font-[family-name:var(--titres)] text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.02]">
                    Le bouquet {NOM_TON[message.ton]} <span className="italic">{deMois(mois)}</span>
                  </p>
                  <p className="text-[15px] leading-snug text-[var(--doux)]">{mois.bouquets[message.ton].charAt(0).toUpperCase() + mois.bouquets[message.ton].slice(1)}.</p>
                  <p className="font-[family-name:var(--titres)] text-3xl [font-variant-numeric:lining-nums]">{euros(message.prix)}</p>
                </div>
              </div>

              <div id="carte" className="scroll-mt-24 space-y-3">
                <div className="relative rounded-2xl border border-[var(--trait)] bg-[var(--fond)] px-6 py-5 [background-image:repeating-linear-gradient(transparent_0_37px,#EAD9CC_37px_38px)]">
                  <label className="flex items-baseline gap-2 font-[family-name:var(--f-caveat)] text-2xl">
                    <span>Pour :</span>
                    <input
                      value={pour}
                      onChange={(e) => setPour(e.target.value)}
                      placeholder="son prénom"
                      maxLength={24}
                      autoComplete="off"
                      className="w-full bg-transparent text-[var(--accent-texte)] outline-none placeholder:text-[var(--doux)]"
                    />
                  </label>
                  <p className="mt-3 min-h-[80px] font-[family-name:var(--f-caveat)] text-[32px] leading-[1.12]" aria-live="polite">
                    {message.phrases[rang]}
                  </p>
                  <label className="mt-2 flex items-baseline justify-end gap-2 font-[family-name:var(--f-caveat)] text-2xl">
                    <span>—</span>
                    <input
                      id="signature"
                      value={signe}
                      onChange={(e) => setSigne(e.target.value)}
                      placeholder="ta signature"
                      maxLength={24}
                      autoComplete="off"
                      aria-label="Ta signature"
                      className="w-40 bg-transparent text-right text-[var(--accent-texte)] outline-none placeholder:text-[var(--doux)]"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button type="button" onClick={() => setRang((rang + 1) % message.phrases.length)} className="text-[15px] font-medium underline underline-offset-4">
                    Une autre phrase ({rang + 1}/{message.phrases.length})
                  </button>
                  <p className="text-sm text-[var(--doux)]">Écrite à la main, à l&apos;encre.</p>
                </div>
              </div>

              {commande ? (
                <div role="status" className="space-y-1 rounded-2xl border border-[var(--encre)] bg-[var(--fond)] p-4">
                  <p className="font-medium">
                    Le bouquet {NOM_TON[message.ton]} {deMois(mois)} et sa carte{signe ? `, signée ${signe}` : ""} : livrés aujourd&apos;hui.
                  </p>
                  <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
                </div>
              ) : (
                <button
                  type="button"
                  data-film="commander"
                  onClick={() => setCommande(true)}
                  className="inline-flex h-12 w-full items-center justify-between gap-3 rounded-full bg-[var(--accent)] px-6 text-[15px] font-medium text-[var(--sur-accent)]"
                >
                  Commander pour aujourd&apos;hui
                  <span aria-hidden="true">→</span>
                </button>
              )}
              <p className="text-xs leading-relaxed text-[var(--doux)]">
                Prix TTC d&apos;exemple, livraison {euros(boutique.livraison)} dans la ville. Commandé avant {boutique.heureLimite}, livré aujourd&apos;hui.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
