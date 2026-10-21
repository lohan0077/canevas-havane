"use client";

import { useState } from "react";
import s from "./Relue.module.css";
import { euros, maison } from "./donnees";

const MOIS = ["JANV", "FÉVR", "MARS", "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT", "OCT", "NOV", "DÉC"];

/**
 * Le service « ta lettre dans un an » : on écrit quelques lignes, on cachette, et le
 * cachet de la poste tombe, daté d'un an jour pour jour — la date de dépôt, pas une
 * date de distribution. Tout se passe dans le navigateur : rien n'est envoyé.
 */
export default function LettreDansUnAn() {
  const [lignes, setLignes] = useState(["", "", "", ""]);
  const [prenom, setPrenom] = useState("");
  const [postee, setPostee] = useState<Date | null>(null);
  const vide = lignes.every((l) => !l.trim());

  const cacheter = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    setPostee(d);
  };
  const jours = postee ? Math.round((Date.UTC(postee.getFullYear(), postee.getMonth(), postee.getDate()) - Date.UTC(postee.getFullYear() - 1, postee.getMonth(), postee.getDate())) / 86400000) : 0;

  let resultat: React.ReactNode = null;
  if (postee) {
    const longue = postee.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    resultat = (
      <div className="space-y-5" data-film="cachetee">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Relue · ta lettre à toi-même</p>
        <p className="font-[family-name:var(--titres)] text-5xl leading-none">
          Postée dans <span className="italic">{jours} jours.</span>
        </p>
        <div className="relative mx-auto max-w-[380px]" style={{ perspective: "800px" }}>
          <svg viewBox="0 0 300 200" className="w-full drop-shadow-[0_14px_24px_rgba(30,43,74,0.18)]" aria-hidden="true">
            <rect x="4" y="14" width="292" height="182" rx="8" fill="#E9DCC3" />
            <g className={s.feuille}>
              <rect x="40" y="0" width="220" height="150" rx="4" fill="var(--carte)" />
              <path d="M62 34 H238 M62 56 H220 M62 78 H232" stroke="var(--encre)" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
            </g>
            <path d="M4 196 L150 104 L296 196 Z" fill="#E2D2B4" />
            <path d="M4 22 L4 196 L130 112 Z M296 22 L296 196 L170 112 Z" fill="#DFCDAD" />
            <path className={s.rabat} d="M4 14 H296 L150 122 Z" fill="#D6C29E" />
            <g className={s.cire}>
              <circle cx="150" cy="118" r="20" fill="var(--accent)" />
              <circle cx="150" cy="118" r="14" fill="none" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="2" />
              <text x="150" y="126" textAnchor="middle" fontSize="22" fill="#FFFFFF" style={{ fontFamily: "var(--titres)" }}>R</text>
            </g>
            <rect x="238" y="26" width="42" height="50" rx="3" fill="var(--sombre)" />
            <rect x="243" y="31" width="32" height="40" rx="2" fill="none" stroke="#E9B44C" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
          <div className={`${s.tampon} absolute right-[6%] top-[4%] grid place-items-center w-[104px] h-[104px] rounded-full border-[3px] border-[var(--sombre)] text-[var(--sombre)] bg-[var(--carte)]/80`}>
            <span className="text-center leading-tight">
              <span className="block text-sm font-bold tracking-[0.12em]">
                {postee.getDate()} {MOIS[postee.getMonth()]}
              </span>
              <span className="block font-[family-name:var(--titres)] text-3xl">{postee.getFullYear()}</span>
            </span>
          </div>
        </div>
        <div role="status" className="rounded-[18px] border border-[var(--trait)] bg-[var(--carte)] p-5 space-y-2">
          <p className="text-lg">
            {prenom.trim() ? `${prenom.trim()}, ta` : "Ta"} lettre est cachetée. Elle sera postée le <strong>{longue}</strong> — jour pour jour.
          </p>
          <p className="text-sm text-[var(--doux)]">
            Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré. Sur le vrai site, l&apos;adresse viendrait ici, et ne servirait qu&apos;à te poster ta lettre.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setPostee(null);
            setLignes(["", "", "", ""]);
          }}
          className="text-sm font-semibold underline underline-offset-4"
        >
          Écrire une autre lettre
        </button>
      </div>
    );
  }

  // Le formulaire reste dans la page, caché, une fois la lettre cachetée : on y revient
  // par « Écrire une autre lettre ».
  return (
    <>
    {resultat}
    <form
      hidden={!!postee}
      className="space-y-5"
      data-film="ecrire"
      onSubmit={(e) => {
        e.preventDefault();
        if (!vide) cacheter();
      }}
    >
      <div className="rounded-[6px] bg-[var(--carte)] border border-[var(--trait)] shadow-[0_18px_40px_-18px_rgba(30,43,74,0.35)] px-6 pt-6 pb-8">
        <p className="text-right text-sm text-[var(--doux)]">Ta Ville, aujourd&apos;hui</p>
        <div className="mt-4">
          {lignes.map((l, i) => (
            <label key={i} className="block">
              <span className="sr-only">Ligne {i + 1} de ta lettre</span>
              <input
                type="text"
                name={`ligne-${i + 1}`}
                value={l}
                maxLength={60}
                autoComplete="off"
                placeholder={["Cher moi de l'an prochain,", "Aujourd'hui, il s'est passé…", "Ce que j'espère pour toi…", "Garde cette lettre."][i]}
                onChange={(e) => setLignes(lignes.map((x, j) => (j === i ? e.target.value : x)))}
                className="w-full bg-transparent border-0 border-b border-[var(--trait)] py-2.5 font-[family-name:var(--titres)] text-2xl italic text-[var(--encre)] placeholder:text-[var(--doux)] placeholder:not-italic placeholder:text-lg placeholder:font-[family-name:var(--texte)] focus:outline-none focus:border-[var(--accent)]"
              />
            </label>
          ))}
        </div>
        <label className="mt-6 flex items-baseline gap-3">
          <span className="text-sm text-[var(--doux)] shrink-0">Signé :</span>
          <input
            type="text"
            name="prenom"
            value={prenom}
            maxLength={30}
            autoComplete="off"
            placeholder="ton prénom"
            onChange={(e) => setPrenom(e.target.value)}
            className="min-w-0 flex-1 bg-transparent border-0 border-b border-[var(--trait)] py-1.5 font-[family-name:var(--titres)] text-2xl text-[var(--encre)] placeholder:text-[var(--doux)] placeholder:text-lg placeholder:font-[family-name:var(--texte)] focus:outline-none focus:border-[var(--accent)]"
          />
        </label>
      </div>
      <button
        type="submit"
        data-film="cacheter"
        disabled={vide}
        className="w-full min-h-14 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 text-lg font-semibold disabled:cursor-not-allowed"
      >
        Cacheter · poster dans un an
      </button>
      <p className="text-sm text-[var(--doux)]">
        {euros(maison.prixService)} TTC, papier, cire et timbre compris · exemple. Ta lettre reste cachetée : personne ne la lit.
      </p>
    </form>
    </>
  );
}
