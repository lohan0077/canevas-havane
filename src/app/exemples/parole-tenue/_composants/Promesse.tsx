"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { DOSSIER, VOYAGES, euros, plan } from "./donnees";

type Resultat = { qui: string; voyage: (typeof VOYAGES)[number]; annee: number; ans: number; plan: ReturnType<typeof plan> };

/**
 * La promesse : à qui, quel voyage, depuis quand. Le site répond depuis combien de
 * temps tu la repousses, propose une date et ce qu'il faut mettre de côté chaque
 * mois. Tout se calcule ici, au moment du clic ; rien n'est envoyé.
 */
export default function Promesse() {
  const id = useId();
  const [qui, setQui] = useState("");
  const [voyageId, setVoyageId] = useState<string | null>(null);
  const [depuis, setDepuis] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [resultat, setResultat] = useState<Resultat | null>(null);
  const [compte, setCompte] = useState(0);

  // Les années défilent jusqu'au total, une par une.
  useEffect(() => {
    if (!resultat || compte >= resultat.ans) return;
    const minuteur = setTimeout(() => setCompte((n) => n + 1), 140);
    return () => clearTimeout(minuteur);
  }, [resultat, compte]);

  const tenir = (e: React.FormEvent) => {
    e.preventDefault();
    const maintenant = new Date();
    const annee = Number(depuis);
    const voyage = VOYAGES.find((v) => v.id === voyageId);
    if (!voyage) return setErreur("Choisis le voyage promis.");
    if (!Number.isInteger(annee) || annee < 1950 || annee > maintenant.getFullYear()) return setErreur(`Indique l'année de la promesse, entre 1950 et ${maintenant.getFullYear()}.`);
    setErreur(null);
    setCompte(0);
    setResultat({ qui: qui.trim(), voyage, annee, ans: maintenant.getFullYear() - annee, plan: plan(voyage, maintenant) });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={tenir} noValidate className="space-y-5 rounded-[1.8rem] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_30px_60px_-45px_rgba(22,48,42,0.8)] p-5 sm:p-7" data-film="formulaire">
        <div className="space-y-1.5">
          <label htmlFor={`${id}-qui`} className="block font-[family-name:var(--titres)] text-2xl italic">À qui&nbsp;?</label>
          <input
            id={`${id}-qui`}
            name="qui"
            type="text"
            maxLength={30}
            autoComplete="off"
            value={qui}
            onChange={(e) => setQui(e.target.value)}
            placeholder="Un prénom : Léo, maman…"
            className="w-full border-b-2 border-[var(--trait)] bg-transparent py-2 text-xl outline-none focus:border-[var(--encre)]"
          />
        </div>
        <fieldset className="space-y-2">
          <legend className="font-[family-name:var(--titres)] text-2xl italic">Quel voyage&nbsp;?</legend>
          <div className="flex flex-wrap gap-2">
            {VOYAGES.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-pressed={voyageId === v.id}
                data-film={`voyage-${v.id}`}
                onClick={() => setVoyageId(v.id)}
                className={`min-h-10 rounded-full border-2 px-4 text-[15px] font-semibold ${voyageId === v.id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--carte)]" : "border-[var(--trait)] hover:border-[var(--encre)]"}`}
              >
                {v.nom}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="space-y-1.5">
          <label htmlFor={`${id}-depuis`} className="block font-[family-name:var(--titres)] text-2xl italic">Depuis quand&nbsp;?</label>
          <input
            id={`${id}-depuis`}
            name="depuis"
            type="text"
            inputMode="numeric"
            maxLength={4}
            autoComplete="off"
            value={depuis}
            onChange={(e) => setDepuis(e.target.value.replace(/\D/g, ""))}
            placeholder="L'année : 2019"
            className="w-full border-b-2 border-[var(--trait)] bg-transparent py-2 text-xl tabular-nums outline-none focus:border-[var(--encre)] [font-variant-numeric:lining-nums]"
          />
        </div>
        {erreur && <p role="alert" className="font-semibold text-[var(--accent-texte)]">{erreur}</p>}
        <button type="submit" data-film="tenir" className="flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] text-lg font-semibold text-[var(--sur-accent)] transition-transform hover:scale-[1.01]">
          Tenir ma promesse
        </button>
        <p className="text-xs text-[var(--doux)]">Démonstration : tout se calcule sur ton écran, rien n&apos;est envoyé ni enregistré.</p>
      </form>

      {resultat && (
        <div role="status" className="space-y-6">
          <div className="space-y-1 text-center" data-film="resultat">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Tu la repousses depuis</p>
            <p className="font-[family-name:var(--titres)] text-[6.5rem] leading-none [font-variant-numeric:lining-nums]">
              {resultat.ans === 0 ? "cette année" : <>{compte}<span className="text-5xl"> an{compte > 1 ? "s" : ""}</span></>}
            </p>
          </div>

          {/* Le billet de la promesse */}
          <div className="flex overflow-hidden rounded-[1.8rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
            <div className="flex-1 space-y-2 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E9D8B4]">Ta promesse</p>
              <p className="font-[family-name:var(--titres)] text-3xl leading-tight">
                {resultat.voyage.nom}
                {resultat.qui && <span className="block italic text-[#F2A58E]">avec {resultat.qui}</span>}
              </p>
              <p className="text-sm text-[#E9D8B4] [font-variant-numeric:lining-nums]">promis en {resultat.annee}</p>
            </div>
            <div aria-hidden="true" className="grid w-16 place-items-center border-l-2 border-dashed border-[#E9D8B4]/60 text-3xl">✈</div>
          </div>

          <div className="space-y-5 rounded-[1.8rem] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_30px_60px_-45px_rgba(22,48,42,0.8)] p-5" data-film="plan-date">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Départ proposé · dans {resultat.plan.mois} mois</p>
                <p className="font-[family-name:var(--titres)] text-4xl capitalize [font-variant-numeric:lining-nums]">{resultat.plan.date}</p>
              </div>
            </div>
            <p className="text-sm text-[var(--doux)]">{resultat.voyage.pourquoi}.</p>
            <ol className="grid grid-cols-12 gap-1" aria-label={`${resultat.plan.mois} mois jusqu'au départ`}>
              {Array.from({ length: resultat.plan.mois }, (_, k) => (
                <li key={k} className="h-3 rounded-full bg-[#E5674B]" />
              ))}
            </ol>
            <div className="rounded-[1.2rem] bg-[#F3EAD8] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">À mettre de côté</p>
              <p className="font-[family-name:var(--titres)] text-5xl [font-variant-numeric:lining-nums]">
                {euros(resultat.plan.parMois)} <span className="text-2xl">/ mois</span>
              </p>
              <p className="mt-1 text-sm text-[var(--doux)] [font-variant-numeric:lining-nums]">
                Budget exemple : {euros(resultat.voyage.budget)} pour deux, {resultat.voyage.duree}. Un calcul, pas un placement : l&apos;agence n&apos;encaisse rien d&apos;avance.
              </p>
            </div>
            <p className="text-xs text-[var(--doux)]">Immatriculée Atout France (IM000000000, exemple) · garant et assureur indiqués en bas de page.</p>
            <Link href={`${DOSSIER}#ferme`} className="flex min-h-12 items-center justify-center rounded-full border-2 border-[var(--encre)] font-semibold">
              La tenir avec un conseiller
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
