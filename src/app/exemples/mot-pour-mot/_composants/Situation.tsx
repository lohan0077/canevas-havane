"use client";

import { useState } from "react";
import Image from "next/image";
import { DOSSIER, photos, situations } from "./donnees";
import RendezVous from "./RendezVous";

/**
 * Une page par situation (CDD, auto-entrepreneur, premier achat) : ce que regardent les
 * banques, les pièces à réunir (à cocher), un dossier d'exemple, et le rendez-vous en bas.
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
      <div className="border-b border-[var(--trait)]">
        <div role="tablist" aria-label="Ta situation" className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-3 sm:px-6">
          {situations.map((x) => (
            <button
              key={x.slug}
              type="button"
              role="tab"
              data-film={`onglet-${x.slug}`}
              aria-selected={x.slug === slug}
              onClick={() => choisir(x.slug)}
              className={`min-h-11 shrink-0 rounded-full border-2 px-4 text-[14px] font-semibold ${x.slug === slug ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)]"}`}
            >
              {x.onglet}
            </button>
          ))}
        </div>
      </div>

      <div role="tabpanel" className="mx-auto max-w-6xl px-5 pt-10 sm:px-6 sm:pt-14">
        <p className="text-[12px] font-semibold tracking-[0.18em] text-[var(--accent-texte)] uppercase">Ta situation</p>
        <h1 data-film="titre-situation" className="mt-3 text-[38px] font-black tracking-[-0.035em] break-words uppercase sm:text-7xl">
          {s.titre} <span className="text-[var(--accent-texte)]">{s.accent}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-[var(--doux)]">{s.chapeau}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <section aria-labelledby="regardent" className="space-y-5">
            <h2 id="regardent" className="text-[26px] font-black tracking-[-0.02em] uppercase">Ce que regardent les banques</h2>
            <ol className="divide-y divide-[var(--trait)] border-y-2 border-[var(--encre)]">
              {s.regardent.map((r, i) => (
                <li key={r} className="grid grid-cols-[2.5rem_1fr] gap-2 py-3.5 text-[17px] leading-snug">
                  <span className="font-[family-name:var(--titres)] font-black text-[var(--accent-texte)] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {r}
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="pieces" className="space-y-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="pieces" className="text-[26px] font-black tracking-[-0.02em] uppercase">Les pièces</h2>
              <p className="text-[14px] font-semibold tabular-nums" aria-live="polite">
                {faites} / {s.pieces.length} prêtes
              </p>
            </div>
            <div aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-[var(--trait)]">
              <div className="h-full bg-[var(--accent)] transition-[width]" style={{ width: `${(faites / s.pieces.length) * 100}%` }} />
            </div>
            <ul className="space-y-2">
              {s.pieces.map((p) => {
                const cle = `${s.slug}:${p}`;
                return (
                  <li key={cle}>
                    <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-[14px] border border-[var(--trait)] px-4 py-2.5 text-[16px] has-[:checked]:border-[var(--encre)] has-[:checked]:bg-[var(--carte)]">
                      <input
                        type="checkbox"
                        checked={Boolean(cochees[cle])}
                        onChange={(e) => setCochees({ ...cochees, [cle]: e.target.checked })}
                        className="h-5 w-5 shrink-0 accent-[var(--accent)]"
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

        <section aria-labelledby="dossier" className="mt-14 grid gap-8 rounded-[24px] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] sm:p-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-[12px] font-semibold tracking-[0.18em] text-[#A9B8FF] uppercase">Un dossier, anonymisé</p>
            <h2 id="dossier" className="text-[28px] leading-tight font-black tracking-[-0.02em] uppercase sm:text-4xl">{s.dossier.titre}</h2>
            <ul className="space-y-2 text-[17px]">
              {s.dossier.lignes.map((l) => (
                <li key={l} className="flex gap-3">
                  <span aria-hidden="true" className="text-[#A9B8FF]">—</span>
                  {l}
                </li>
              ))}
            </ul>
            <p className="text-[14px] leading-relaxed text-[#B9B9BE]">
              Dossier d&apos;exemple : l&apos;entreprise est fictive. Sur un vrai site, un dossier réel,
              anonymisé avec l&apos;accord du client. Chaque dossier est différent, et aucune banque
              n&apos;est tenue de prêter.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#1C1C1F]">
            <Image src={photos.piece.src} alt={photos.piece.alt} width={photos.piece.largeur} height={photos.piece.hauteur} sizes="(min-width: 1024px) 420px, 100vw" className="h-full w-full object-cover grayscale" />
          </div>
        </section>

        <section aria-labelledby="question" className="mt-14 max-w-3xl space-y-3">
          <p className="text-[12px] font-semibold tracking-[0.18em] text-[var(--accent-texte)] uppercase">Ce que tu as tapé : « {s.recherche} »</p>
          <h2 id="question" className="text-[30px] leading-tight font-black tracking-[-0.02em] uppercase">{s.question.q}</h2>
          <p className="text-[17px] leading-relaxed text-[var(--doux)]">{s.question.r}</p>
        </section>
      </div>

      <section id="rendez-vous" aria-labelledby="titre-rdv" className="mt-16 scroll-mt-20 border-t-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="space-y-4">
            <p className="text-[12px] font-semibold tracking-[0.18em] text-[var(--accent-texte)] uppercase">Rendez-vous</p>
            <h2 id="titre-rdv" className="text-[36px] leading-[1.02] font-black tracking-[-0.03em] uppercase sm:text-5xl">Tu choisis ton créneau.</h2>
            <p className="text-[17px] leading-relaxed text-[var(--doux)]">Personne ne t&apos;appelle pour te le proposer. Ton dossier se prépare au premier rendez-vous, pièces en main.</p>
          </div>
          <RendezVous />
        </div>
      </section>
    </div>
  );
}
