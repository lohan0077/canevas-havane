"use client";

import { useState } from "react";
import { DEVIS, plantesPour, type Expo, type Sol } from "./donnees";
import { LignePrix, euros } from "./Elements";

const ANIMATION = `@keyframes va-monte { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }`;
const monte = (i: number) => ({ animation: `va-monte 420ms cubic-bezier(.2,.8,.2,1) ${i * 180}ms both` });

const SOLS: [Sol, string][] = [["leger", "Léger, caillouteux"], ["ordinaire", "Ordinaire"], ["lourd", "Lourd, argileux"]];
const EXPOS: [Expo, string][] = [["soleil", "Plein soleil"], ["mi-ombre", "Mi-ombre"]];

/**
 * « Tu tapes ta commune, et il te montre les plantes adaptées à l'été chez toi. »
 * Ici, le climat est un exemple (été chaud et sec) : un vrai site s'appuierait sur les
 * normales climatiques officielles de la commune, et le dirait. Rien n'est envoyé.
 */
export function Commune() {
  const [commune, setCommune] = useState("");
  const [sol, setSol] = useState<Sol>("ordinaire");
  const [expo, setExpo] = useState<Expo>("soleil");
  const [vu, setVu] = useState<{ commune: string; sol: Sol; expo: Expo } | null>(null);
  const plantes = vu ? plantesPour(vu.sol, vu.expo) : [];

  return (
    <div className="rounded-[30px] bg-[var(--carte)] p-5 sm:p-7 space-y-5" data-film="commune">
      <style>{ANIMATION}</style>
      <form onSubmit={(e) => { e.preventDefault(); if (commune.trim()) setVu({ commune: commune.trim(), sol, expo }); }} className="space-y-4">
        <label className="block space-y-2">
          <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--doux)]">Ta commune</span>
          <input
            type="text"
            value={commune}
            onChange={(e) => setCommune(e.target.value)}
            placeholder="Annonay, Valence, Lyon…"
            autoComplete="off"
            data-film="saisie-commune"
            className="w-full rounded-[16px] border-2 border-[var(--trait)] bg-[var(--fond)] px-4 py-3.5 text-[20px] font-medium outline-none focus:border-[var(--encre)]"
          />
        </label>
        <fieldset className="space-y-2">
          <legend className="mb-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--doux)]">Ton sol</legend>
          <div className="flex flex-wrap gap-2">
            {SOLS.map(([v, l]) => (
              <button key={v} type="button" aria-pressed={sol === v} onClick={() => setSol(v)} className={`rounded-full border-2 px-3.5 py-2 text-[14px] font-semibold ${sol === v ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)]"}`}>{l}</button>
            ))}
          </div>
        </fieldset>
        <fieldset className="space-y-2">
          <legend className="mb-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--doux)]">L&apos;exposition</legend>
          <div className="flex flex-wrap gap-2">
            {EXPOS.map(([v, l]) => (
              <button key={v} type="button" aria-pressed={expo === v} onClick={() => setExpo(v)} className={`rounded-full border-2 px-3.5 py-2 text-[14px] font-semibold ${expo === v ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)]"}`}>{l}</button>
            ))}
          </div>
        </fieldset>
        <button type="submit" data-film="voir-plantes" className="w-full rounded-full bg-[var(--accent)] px-6 py-4 text-[17px] font-bold text-[var(--sur-accent)]">
          Voir mes plantes
        </button>
      </form>

      <div aria-live="polite">
        {vu && (
          <div key={`${vu.commune}-${vu.sol}-${vu.expo}`} className="space-y-3" data-film="plantes">
            <div style={monte(0)}>
              <p className="font-[family-name:var(--titres)] text-[22px] font-bold leading-tight">À {vu.commune}, l&apos;été</p>
              <p className="text-[14px] text-[var(--doux)]">Climat d&apos;exemple : chaud et sec, peu de pluie en juillet et en août.</p>
            </div>
            <ul className="space-y-2">
              {plantes.map((p, i) => (
                <li key={p.nom} className="flex items-center gap-3 rounded-[18px] border border-[var(--trait)] bg-[var(--fond)] p-3" style={monte(i + 1)}>
                  <span aria-hidden="true" className="h-11 w-11 shrink-0 rounded-full" style={{ background: `radial-gradient(circle at 35% 35%, #fff6, transparent 60%), ${p.teinte}` }} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[17px] font-bold leading-tight">{p.nom}</span>
                    <span className="block text-[13px] text-[var(--doux)]"><i>{p.latin}</i> · {p.hauteur} · fleurs {p.fleurs}</span>
                    <span className="mt-1 inline-block rounded-full bg-[#E7D7B4] px-2.5 py-0.5 text-[12px] font-bold">arrosage : 1<sup>re</sup> année</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-[14px] leading-relaxed text-[var(--doux)]" style={monte(5)}>
              Selon ton sol et ton exposition. Sur un vrai site, la réponse s&apos;appuierait sur les normales climatiques
              officielles de ta commune ; ici, le climat est un exemple. Démonstration : rien n&apos;est envoyé.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Le devis d'exemple, avec « la ligne que personne ne met » : l'arrosage qu'il faudra,
 * l'été. Un bouton en déplie le détail.
 */
export function Devis() {
  const [detail, setDetail] = useState(false);
  const ht = DEVIS.postes.reduce((t, p) => t + p.ht, 0);
  const tva = Math.round(ht * DEVIS.tva);
  return (
    <div className="rounded-[10px] bg-white p-5 text-[#2F4A2C] shadow-[0_24px_50px_-30px_rgba(47,74,44,0.6)] sm:p-7 space-y-4" data-film="devis">
      <div className="flex items-start justify-between gap-3 border-b-2 border-[#2F4A2C] pb-3">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.16em]">Devis n° {DEVIS.numero} · exemple</p>
          <p className="font-[family-name:var(--titres)] text-[19px] font-bold leading-tight">{DEVIS.titre}</p>
        </div>
        <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#2F4A2C] font-[family-name:var(--titres)] text-[15px] font-bold text-[#E0B85C]">8</span>
      </div>
      <div className="space-y-2">
        {DEVIS.postes.map((p) => <LignePrix key={p.libelle} libelle={p.libelle} montant={p.ht} />)}
      </div>
      <div className="rounded-[14px] border-2 border-[#84432C] bg-[#F8EEDB] p-4" data-film="ligne-arrosage">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#84432C]">Arrosage à prévoir</p>
        <p className="font-[family-name:var(--titres)] text-[20px] font-bold leading-tight">La 1<sup>re</sup> année, l&apos;été</p>
        <p className="text-[14px]">Ensuite : en cas de canicule · estimation</p>
        <button type="button" onClick={() => setDetail((d) => !d)} aria-expanded={detail} className="mt-2 text-[14px] font-bold underline underline-offset-4">
          {detail ? "Masquer le détail" : "Le détail"}
        </button>
        {detail && (
          <ul className="mt-2 space-y-1 text-[14px] leading-snug">
            <li>De juin à août : un arrosage profond par semaine sans pluie, au pied, le soir.</li>
            <li>À l&apos;automne suivant : on arrête.</li>
            <li>Toujours dans le respect des restrictions de ta commune.</li>
          </ul>
        )}
      </div>
      <div className="space-y-1 border-t border-[#DCD2BC] pt-3">
        <LignePrix libelle="Total HT" montant={ht} />
        <LignePrix libelle="TVA 20 % · exemple" montant={tva} />
        <LignePrix libelle="Total TTC · exemple" montant={ht + tva} fort />
      </div>
      <p className="text-[12px] text-[#55573F]">Devis d&apos;exemple : postes, quantités, taux et prix inventés. {euros(ht + tva)} TTC.</p>
    </div>
  );
}
