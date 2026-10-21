"use client";

import { useState } from "react";
import Link from "next/link";
import { FOURCHETTES, SITUATIONS } from "./donnees";
import styles from "./Limite.module.css";

// « 1 100 – 1 500 € », espaces insécables, écrit à la main (Intl varie d'un navigateur à l'autre).
const milliers = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202F");
const fourchette = (a: number, b: number) => `${milliers(a)}\u00A0–\u00A0${milliers(b)}\u00A0€`;

/**
 * L'accueil : une seule question, trois situations. On en touche une, et tout
 * s'explique dessous — en mots simples, avec le texte qui s'applique.
 */
export function Situations() {
  const [choisie, setChoisie] = useState<number | null>(null);
  const s = choisie === null ? null : SITUATIONS[choisie];

  return (
    <div data-film="situations" className="mx-auto w-full max-w-xl space-y-3">
      {SITUATIONS.map((x, i) => (
        <button
          key={x.id}
          id={`lbl-situation-${x.id}`}
          type="button"
          aria-pressed={choisie === i}
          aria-controls="lbl-explication"
          onClick={() => setChoisie(i)}
          className={`flex w-full items-center justify-between gap-4 rounded-full border-2 px-6 py-4 text-left text-lg font-semibold transition-colors ${
            choisie === i ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--accent)]"
          }`}
        >
          {x.choix}
          <span aria-hidden="true" className="text-2xl leading-none">›</span>
        </button>
      ))}
      <div id="lbl-explication" aria-live="polite">
        {s && (
          <div key={s.id} className={`mt-3 rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-6 text-left shadow-[0_20px_40px_-30px_rgba(31,42,28,.5)] space-y-3 ${styles.entree}`}>
            <p className="flex items-center gap-2 text-sm font-semibold text-[var(--accent-texte)]">
              <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-[var(--accent)] text-xs text-[var(--sur-accent)]">✓</span>
              {s.choix}
            </p>
            <p className="font-[family-name:var(--titres)] text-2xl font-bold leading-tight">{s.titre}</p>
            <p className="leading-relaxed text-[var(--doux)]">{s.texte}</p>
            <Link href={s.lien.href} className="inline-flex min-h-[44px] items-center font-semibold underline underline-offset-4 decoration-[var(--accent)]">
              {s.lien.libelle} →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Le prix au nombre de bornes : − et +, la fourchette TTC qui suit, et la part de
 * chacun si les voisins partagent (le bornage se fait à frais communs, C. civ., art. 646).
 */
export function Bornes() {
  const [n, setN] = useState(2);
  const [bas, haut] = FOURCHETTES[n];

  return (
    <div data-film="prix" className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p id="lbl-nb-libelle" className="text-lg font-semibold">Nombre de bornes</p>
        <div className="flex items-center gap-3" role="group" aria-labelledby="lbl-nb-libelle">
          <button id="lbl-moins" type="button" aria-label="Une borne de moins" disabled={n <= 2} onClick={() => setN(n - 1)} className="grid h-12 w-12 place-items-center rounded-full border-2 border-[var(--trait)] text-2xl font-bold disabled:opacity-40">−</button>
          <output aria-live="polite" className="w-8 text-center font-[family-name:var(--titres)] text-4xl font-bold tabular-nums">{n}</output>
          <button id="lbl-plus" type="button" aria-label="Une borne de plus" disabled={n >= 6} onClick={() => setN(n + 1)} className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent)] text-2xl font-bold text-[var(--sur-accent)] disabled:opacity-40">+</button>
        </div>
      </div>
      <div aria-hidden="true" className="flex items-end gap-2">
        {[1, 2, 3, 4, 5, 6].map((k) => (
          <span key={k} className={`grid h-11 flex-1 place-items-center rounded-lg border-2 transition-all ${k <= n ? "border-[#2C3A26] bg-[#EDE7DB]" : "border-dashed border-[var(--trait)] bg-transparent"}`}>
            {k <= n && <span className="h-3 w-3 rounded-full bg-[#F27438]" />}
          </span>
        ))}
      </div>
      <div className="rounded-[22px] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] space-y-2" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C8D8BE]">Fourchette TTC</p>
        <p className="whitespace-nowrap font-[family-name:var(--titres)] text-[28px] font-bold tabular-nums sm:text-4xl">{fourchette(bas, haut)}</p>
        <p className="text-sm text-[#C8D8BE]">Déplacement, recherche des titres et procès-verbal compris · exemple</p>
        <p className="border-t border-[rgba(247,246,241,.2)] pt-3 text-sm">
          À partager avec ton voisin : le bornage se fait à frais communs. À deux, environ{" "}
          <b className="whitespace-nowrap tabular-nums">{fourchette(bas / 2, haut / 2)}</b> chacun.
        </p>
      </div>
      <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple pour un particulier. Le devis écrit, remis avant toute intervention, tient compte du terrain et des titres.</p>
    </div>
  );
}

/** Le formulaire de contact : rien n'est envoyé, la confirmation le dit. */
export function Contact() {
  const [envoye, setEnvoye] = useState(false);
  if (envoye) {
    return (
      <div role="status" className="rounded-[28px] border-2 border-[var(--accent)] bg-[var(--carte)] p-6 space-y-2">
        <p className="font-[family-name:var(--titres)] text-2xl font-bold">Demande prête.</p>
        <p className="text-[var(--doux)]">Le cabinet te rappellerait pour fixer un rendez-vous.</p>
        <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        <button type="button" onClick={() => setEnvoye(false)} className="pt-2 text-sm font-semibold underline underline-offset-4">Recommencer</button>
      </div>
    );
  }
  const champ = "w-full rounded-2xl border-2 border-[var(--trait)] bg-[var(--carte)] px-4 py-3 text-[var(--encre)] outline-none focus:border-[var(--accent)]";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setEnvoye(true);
      }}
      className="space-y-4"
    >
      <label className="block space-y-1.5">
        <span className="text-sm font-semibold">Ton prénom</span>
        <input required name="prenom" autoComplete="given-name" className={champ} />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-semibold">Ton téléphone</span>
        <input required name="telephone" type="tel" autoComplete="tel" placeholder="06 39 98 00 00" className={`${champ} placeholder:text-[var(--doux)]`} />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-semibold">Ta situation</span>
        <select name="situation" className={champ} defaultValue={SITUATIONS[1].choix}>
          {SITUATIONS.map((s) => (
            <option key={s.id}>{s.choix}</option>
          ))}
          <option>Autre chose</option>
        </select>
      </label>
      <button type="submit" className="w-full min-h-[54px] rounded-full bg-[var(--accent)] px-6 text-lg font-semibold text-[var(--sur-accent)]">
        Être rappelé
      </button>
      <p className="text-xs text-[var(--doux)]">Démonstration : rien n&apos;est envoyé. Sur un vrai site, ces informations ne serviraient qu&apos;à te rappeler.</p>
    </form>
  );
}
