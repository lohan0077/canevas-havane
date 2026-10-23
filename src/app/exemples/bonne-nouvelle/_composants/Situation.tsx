"use client";

import { useState } from "react";
import Image from "next/image";
import { DOSSIER, photos, situations } from "./donnees";
import FondVivant from "../../_kit/FondVivant";

/**
 * Une page par situation (CDD, auto-entrepreneur, premier achat) : ce que regardent les
 * banques, les pièces à réunir (à cocher), un dossier d'exemple ; le rendez-vous est en bas
 * de chaque page (le gabarit le pose).
 * Les onglets passent d'une situation à l'autre sans recharger : l'adresse suit (chaque
 * situation a aussi sa propre page, servie à cette adresse).
 */
export default function Situation({ initiale }: { initiale: string }) {
  const [slug, setSlug] = useState(initiale);
  const [cochees, setCochees] = useState<Record<string, boolean>>({});
  const s = situations.find((x) => x.slug === slug) ?? situations[0];
  const faites = s.pieces.filter((p) => cochees[`${s.slug}:${p}`]).length;

  const choisir = (nouveau: string) => {
    setSlug(nouveau);
    window.history.replaceState(null, "", `${DOSSIER}/situations/${nouveau}`);
  };

  return (
    <div>
      <section className="kit-grain relative isolate overflow-hidden bg-[#1B2A41] text-[#FFF8EC]">
        <FondVivant couleurs={["#16233A", "#1F4A47", "#6E6A3A"]} vitesse={0.7} />
        <div className="absolute inset-0 bg-[#1B2A41]/50" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-40">
          <div role="tablist" aria-label="Ta situation" className="flex flex-wrap gap-2">
            {situations.map((x) => (
              <button
                key={x.slug}
                type="button"
                role="tab"
                data-film={`onglet-${x.slug}`}
                aria-selected={x.slug === slug}
                onClick={() => choisir(x.slug)}
                className={`min-h-11 shrink-0 rounded-full border-2 px-4 text-[14px] font-bold ${x.slug === slug ? "border-[#F2C14E] bg-[#F2C14E] text-[#1B2A41]" : "border-white/30 text-[#FFF8EC]"}`}
              >
                {x.onglet}
              </button>
            ))}
          </div>
          <p className="mt-10 text-[12px] font-bold uppercase tracking-[0.18em] text-[#F2C14E]">Ce que tu as tapé&nbsp;: «&nbsp;{s.recherche}&nbsp;»</p>
          <h1 data-film="titre-situation" className="mt-4 max-w-5xl break-words font-[family-name:var(--titres)] text-[clamp(3rem,8vw,7.2rem)] font-medium leading-[0.95] tracking-[-0.035em]">
            {s.titre} <em className="font-normal text-[#F2C14E]">{s.accent}</em>
          </h1>
          <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-[#E6EBF2]">{s.chapeau}</p>
        </div>
      </section>

      <div role="tabpanel" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <section aria-labelledby="regardent" className="space-y-5">
            <h2 id="regardent" className="font-[family-name:var(--titres)] text-[34px] font-semibold tracking-[-0.02em]">Ce que regardent les banques</h2>
            <ol className="divide-y divide-[var(--trait)] border-y-2 border-[#1B2A41]">
              {s.regardent.map((r, i) => (
                <li key={r} className="grid grid-cols-[2.5rem_1fr] gap-2 py-3.5 text-[17px] leading-snug">
                  <span className="font-[family-name:var(--titres)] font-semibold text-[var(--accent-texte)] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {r}
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="pieces" className="space-y-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="pieces" className="font-[family-name:var(--titres)] text-[34px] font-semibold tracking-[-0.02em]">Les pièces</h2>
              <p className="text-[14px] font-semibold tabular-nums" aria-live="polite">
                {faites} / {s.pieces.length} prêtes
              </p>
            </div>
            <div aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-[var(--trait)]">
              <div className="h-full bg-[#3FA36B] transition-[width]" style={{ width: `${(faites / s.pieces.length) * 100}%` }} />
            </div>
            <ul className="space-y-2">
              {s.pieces.map((p) => {
                const cle = `${s.slug}:${p}`;
                return (
                  <li key={cle}>
                    <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-[14px] border border-[var(--trait)] px-4 py-2.5 text-[16px] bg-white has-[:checked]:border-[#1B2A41] has-[:checked]:bg-[#FBF1D8]">
                      <input
                        type="checkbox"
                        checked={Boolean(cochees[cle])}
                        onChange={(e) => setCochees({ ...cochees, [cle]: e.target.checked })}
                        className="h-5 w-5 shrink-0 accent-[#1B2A41]"
                      />
                      {p}
                    </label>
                  </li>
                );
              })}
            </ul>
            <p className="text-[13px] text-[var(--doux)]">Ta liste reste sur ton téléphone : rien n&apos;est envoyé.</p>
          </section>
        </div>

        <section aria-labelledby="dossier" className="mt-14 grid grid-cols-1 gap-8 rounded-[2rem] bg-[#1B2A41] p-6 text-[#FFF8EC] sm:p-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-[12px] font-semibold tracking-[0.18em] text-[#F2C14E] uppercase">Un dossier, anonymisé</p>
            <h2 id="dossier" className="font-[family-name:var(--titres)] text-[32px] font-semibold leading-tight tracking-[-0.02em] sm:text-[44px]">{s.dossier.titre}</h2>
            <ul className="space-y-2 text-[17px]">
              {s.dossier.lignes.map((l) => (
                <li key={l} className="flex gap-3">
                  <span aria-hidden="true" className="text-[#F2C14E]">—</span>
                  {l}
                </li>
              ))}
            </ul>
            <p className="text-[14px] leading-relaxed text-[#DDE4EE]">
              Dossier d&apos;exemple : l&apos;entreprise est fictive. Sur un vrai site, un dossier réel,
              anonymisé avec l&apos;accord du client. Chaque dossier est différent, et aucune banque
              n&apos;est tenue de prêter.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#1C1C1F]">
            <Image src={photos.piece.src} alt={photos.piece.alt} width={photos.piece.largeur} height={photos.piece.hauteur} sizes="(min-width: 1024px) 420px, 100vw" className="h-full w-full object-cover" />
          </div>
        </section>

        <section aria-labelledby="question" className="mt-14 max-w-3xl space-y-3">
          <p className="text-[12px] font-bold tracking-[0.18em] text-[var(--accent-texte)] uppercase">La question qu&apos;on nous pose</p>
          <h2 id="question" className="font-[family-name:var(--titres)] text-[36px] font-semibold leading-tight tracking-[-0.02em]">{s.question.q}</h2>
          <p className="text-[17px] leading-relaxed text-[var(--doux)]">{s.question.r}</p>
        </section>
      </div>

    </div>
  );
}
