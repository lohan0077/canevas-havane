"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CONSEILS, JOURS, LIBRAIRES, euros, livre, trouverConseil, type Conseil as TConseil, type Livre } from "./donnees";

/** Un livre dessiné : sa tranche de couleur, son titre, son auteur. */
function Tranche({ l }: { l: Livre }) {
  return <span aria-hidden="true" className="block h-[76px] w-[14px] shrink-0 rounded-[3px] shadow-[inset_-4px_0_0_rgba(0,0,0,0.18)]" style={{ background: l.couleur }} />;
}

/** Le marque-page écrit à la main : le mot se trace lettre à lettre. */
export function MarquePage({ prenom, page, libraire }: { prenom: string; page: number; libraire: string }) {
  const mot = `Pour ${prenom} : page ${page}, tu vas voir.`;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= mot.length) return;
    const t = setTimeout(() => setN((x) => x + 1), n === 0 ? 450 : 32);
    return () => clearTimeout(t);
  }, [n, mot.length]);
  return (
    <figure data-film="marque-page" className="mx-auto w-[172px] rotate-[-4deg]">
      <div className="relative min-h-[300px] rounded-[6px] border border-[#D9C9A6] bg-[#FFF6DA] px-4 pb-6 pt-10 shadow-[0_18px_30px_-18px_rgba(22,19,15,0.6)]">
        <span aria-hidden="true" className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#16130F] bg-[var(--fond)]" />
        <p className="font-[family-name:var(--f-caveat)] text-[30px] font-bold leading-[1.05] text-[#16130F]" aria-label={mot}>
          <span aria-hidden="true">{mot.slice(0, n)}</span>
        </p>
        <p className="mt-4 text-right font-[family-name:var(--f-caveat)] text-[24px] text-[#2340C8]" aria-hidden={n < mot.length}>
          {n >= mot.length ? `— ${libraire}` : " "}
        </p>
      </div>
      <figcaption className="mt-3 text-center text-[12px] text-[var(--doux)]">Glissé dans ton livre, en boutique</figcaption>
    </figure>
  );
}

/** Réserver un livre conseillé, le retirer en boutique : 0 € de port. */
function Reservation({ l, conseil, fermer }: { l: Livre; conseil: TConseil; fermer: () => void }) {
  const [prenom, setPrenom] = useState("");
  const [jour, setJour] = useState("samedi");
  const [fait, setFait] = useState<string | null>(null);
  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFait(prenom.trim());
  };

  // Après la réservation, le formulaire reste dans la page, masqué : on y revient
  // si l'on veut changer de prénom ou de jour.
  const confirmation = fait !== null && (
      <div role="status" data-film="reserve" className="grid gap-6 rounded-3xl bg-[var(--carte)] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="space-y-2">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-texte)]">Réservé · {fait} · retrait {jour}</p>
          <p className="font-[family-name:var(--titres)] text-[28px] leading-tight">{l.titre} t&apos;attend en boutique.</p>
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">
            À payer sur place : {euros(l.prix)}, le prix de l&apos;éditeur. Port : 0 €. Une semaine dans ton casier.
          </p>
          <p className="text-sm font-semibold">Démonstration : rien n&apos;est envoyé, rien n&apos;est réservé.</p>
          <button type="button" onClick={() => setFait(null)} className="text-sm font-semibold underline underline-offset-4">Changer le prénom ou le jour</button>
        </div>
        <MarquePage prenom={fait} page={conseil.page} libraire={conseil.libraire} />
      </div>
  );

  return (
    <>
    {confirmation}
    <form onSubmit={soumettre} data-film="reserver" hidden={fait !== null} className="space-y-4 rounded-3xl bg-[var(--carte)] p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-[family-name:var(--titres)] text-[24px] leading-tight">Réserver <em>{l.titre}</em></p>
        <button type="button" onClick={fermer} className="text-sm font-semibold underline underline-offset-4">Annuler</button>
      </div>
      <label className="block space-y-1.5">
        <span className="block text-[12px] font-semibold uppercase tracking-[0.12em]">Ton prénom</span>
        <input id="tvv-prenom" required maxLength={30} autoComplete="given-name" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="min-h-12 w-full rounded-2xl border-2 border-[var(--encre)] bg-[var(--fond)] px-4 text-lg focus:outline-none focus:ring-4 focus:ring-[#B9C3F5]" />
      </label>
      <fieldset className="space-y-1.5">
        <legend className="text-[12px] font-semibold uppercase tracking-[0.12em]">Je passe le chercher</legend>
        <div className="flex flex-wrap gap-2">
          {JOURS.map((j) => (
            <button key={j} type="button" aria-pressed={jour === j} onClick={() => setJour(j)} className={`min-h-11 rounded-full border-2 px-4 text-[15px] font-semibold ${jour === j ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--fond)]"}`}>
              {j}
            </button>
          ))}
        </div>
      </fieldset>
      <button type="submit" className="min-h-14 w-full rounded-full bg-[var(--encre)] px-6 text-[15px] font-semibold text-[var(--fond)]">
        Réserver en boutique · 0 € de port
      </button>
    </form>
    </>
  );
}

/** Les trois livres d'un conseil, signés : ils arrivent l'un après l'autre. */
function Reponse({ c }: { c: TConseil }) {
  const [etape, setEtape] = useState(0);
  const [choisi, setChoisi] = useState<string | null>(null);
  const libraire = LIBRAIRES.find((x) => x.prenom === c.libraire)!;

  useEffect(() => {
    if (etape >= 5) return;
    const t = setTimeout(() => setEtape((e) => e + 1), etape === 0 ? 120 : 380);
    return () => clearTimeout(t);
  }, [etape]);

  const voit = (k: number) => `transition-[opacity,translate] duration-500 ${etape > k ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`;

  return (
    <div data-film="conseils" className="space-y-4">
      <p className={`flex items-center gap-3 ${voit(0)}`}>
        <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full font-[family-name:var(--f-caveat)] text-2xl font-bold text-white" style={{ background: libraire.couleur }}>
          {c.libraire[0]}
        </span>
        <span>
          <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--doux)]">Pour « {c.pour} »</span>
          <span className="block font-[family-name:var(--titres)] text-[24px] leading-tight">{c.libraire} te conseille :</span>
        </span>
      </p>
      <ol className="space-y-2.5">
        {c.livres.map((id, k) => {
          const l = livre(id);
          return (
            <li key={id} className={voit(k + 1)}>
              <div className="flex items-center gap-4 rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-3 pr-3">
                <Tranche l={l} />
                <span className="min-w-0 flex-1">
                  <span className="block font-[family-name:var(--titres)] text-[20px] leading-tight">{l.titre}</span>
                  <span className="block text-[14px] text-[var(--doux)]">{l.auteur} · {euros(l.prix)}</span>
                </span>
                <button type="button" onClick={() => setChoisi(id)} aria-pressed={choisi === id} className="min-h-11 shrink-0 rounded-full bg-[var(--accent)] px-4 text-[14px] font-semibold text-[var(--sur-accent)]">
                  Le réserver
                </button>
              </div>
            </li>
          );
        })}
      </ol>
      <p className={`font-[family-name:var(--f-caveat)] text-[26px] leading-snug ${voit(4)}`}>
        « {c.mot} » — {c.libraire}, libraire
      </p>
      <p className="text-[13px] text-[var(--doux)]">Prix fixés par l&apos;éditeur, les mêmes partout (exemples). Conseil écrit à la main, pas par un algorithme.</p>
      {choisi && <Reservation key={choisi} l={livre(choisi)} conseil={c} fermer={() => setChoisi(null)} />}
    </div>
  );
}

/**
 * La seule question de l'accueil : « le dernier livre que t'as adoré ? ». Si un
 * libraire y a déjà répondu, sa réponse s'affiche ; sinon, on lui laisse la question.
 */
export default function Conseil() {
  const [saisie, setSaisie] = useState("");
  const [demande, setDemande] = useState<string | null>(null);
  const [laisse, setLaisse] = useState(false);
  const conseil = demande ? trouverConseil(demande) : undefined;

  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLaisse(false);
    setDemande(saisie.trim());
  };

  return (
    <div className="space-y-6">
      <form onSubmit={soumettre} data-film="question" className="space-y-3">
        <label htmlFor="tvv-livre" className="sr-only">Le dernier livre que tu as adoré</label>
        <input
          id="tvv-livre"
          required
          autoComplete="off"
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          placeholder="Un titre…"
          className="min-h-16 w-full rounded-2xl border-2 border-[var(--encre)] bg-[var(--carte)] px-4 font-[family-name:var(--titres)] text-[22px] italic placeholder:text-[var(--doux)] focus:outline-none focus:ring-4 focus:ring-[#B9C3F5]"
        />
        <button type="submit" className="min-h-14 w-full rounded-full bg-[var(--accent)] px-6 text-[16px] font-semibold text-[var(--sur-accent)] sm:w-auto">
          Demander un conseil
        </button>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[13px] text-[var(--doux)]">
          <span>Déjà répondu :</span>
          {CONSEILS.slice(1).map((c) => (
            <button key={c.pour} type="button" onClick={() => setSaisie(c.pour)} className="rounded-full border border-[var(--trait)] bg-[var(--carte)] px-3 py-2 text-[13px] text-[var(--encre)]">
              {c.pour}
            </button>
          ))}
        </p>
      </form>

      {demande && (conseil ? (
        <Reponse key={conseil.pour} c={conseil} />
      ) : (
        <div role="status" className="space-y-3 rounded-3xl bg-[var(--carte)] p-5">
          <p className="font-[family-name:var(--titres)] text-[24px] leading-tight">Personne ici n&apos;a encore répondu pour « {demande} ».</p>
          {laisse ? (
            <p className="leading-relaxed">C&apos;est noté : un libraire te répondra par écrit sous 48 h. <strong>Démonstration : rien n&apos;est envoyé.</strong></p>
          ) : (
            <>
              <p className="leading-relaxed text-[var(--doux)]">Laisse-la-nous : un libraire qui l&apos;a lu t&apos;écrit trois titres, et les met de côté. Essaie aussi « Le Comte de Monte-Cristo ».</p>
              <button type="button" onClick={() => setLaisse(true)} className="min-h-12 rounded-full border-2 border-[var(--encre)] px-5 font-semibold">Laisser ma question</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
