"use client";

import { useState } from "react";

/**
 * La carte posée sur chaque table, le jour J : le plat, d'où il vient, à qui il a été
 * transmis. On l'écrit, elle se compose à mesure. Elle ne dit que l'histoire vraie de
 * la famille : le site le rappelle sous le formulaire. Rien n'est envoyé.
 */
export default function CarteDeTable() {
  const [plat, setPlat] = useState("La blanquette de Mamie Jo");
  const [origine, setOrigine] = useState("");
  const [transmis, setTransmis] = useState("");

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
      <div id="carte" className="mx-auto w-full max-w-sm rounded-2xl border border-[var(--trait)] bg-[var(--carte)] px-6 py-7 sm:px-7 sm:py-9 text-center shadow-[0_26px_50px_-30px_rgba(31,16,25,.55)]">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">Plat principal</p>
        <p className="mt-3 font-[family-name:var(--titres)] text-[30px] italic leading-tight text-balance">{plat || "Le plat"}</p>
        <span aria-hidden="true" className="mx-auto my-4 block h-px w-16 bg-[var(--accent)]" />
        <p data-film="origine" className="min-h-[48px] text-[16px] leading-relaxed">{origine || <span className="text-[var(--doux)]">D&apos;où il vient…</span>}</p>
        <p data-film="transmis" className="mt-1 min-h-[48px] text-[16px] leading-relaxed">{transmis || <span className="text-[var(--doux)]">À qui il a été transmis…</span>}</p>
        <p className="mt-4 font-[family-name:var(--titres)] text-[20px] italic text-[var(--accent-texte)]">Transmis</p>
      </div>

      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <label className="block space-y-1.5">
          <span className="text-[14px] font-medium">Le plat</span>
          <input id="carte-plat" value={plat} onChange={(e) => setPlat(e.target.value)} className="w-full rounded-xl border border-[var(--trait)] bg-[var(--carte)] px-4 h-12" />
        </label>
        <label className="block space-y-1.5">
          <span className="text-[14px] font-medium">D&apos;où il vient</span>
          <input id="carte-origine" value={origine} onChange={(e) => setOrigine(e.target.value)} placeholder="Une année, une ville…" className="w-full rounded-xl border border-[var(--trait)] bg-[var(--carte)] px-4 h-12 placeholder:text-[var(--doux)]" />
        </label>
        <label className="block space-y-1.5">
          <span className="text-[14px] font-medium">À qui il a été transmis</span>
          <input id="carte-transmis" value={transmis} onChange={(e) => setTransmis(e.target.value)} placeholder="Un prénom, un lien…" className="w-full rounded-xl border border-[var(--trait)] bg-[var(--carte)] px-4 h-12 placeholder:text-[var(--doux)]" />
        </label>
        <p className="rounded-xl bg-[#EEE6E6] p-4 text-[14px] leading-relaxed">
          On n&apos;écrit que ton histoire vraie. Une année, une ville, un prénom : si on ne le sait pas, on ne
          l&apos;invente pas. Démonstration : rien n&apos;est envoyé.
        </p>
      </form>
    </div>
  );
}
