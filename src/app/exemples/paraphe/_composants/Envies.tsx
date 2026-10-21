"use client";

import { useEffect, useState, type FormEvent } from "react";
import Paraphe from "./Paraphe";
import { ENVIES, euros, livre, type Envie } from "./donnees";

/** La fiche d'un livre pour une envie : le titre, puis le paraphe qui se trace, puis le mot. */
function Fiche({ envie }: { envie: Envie }) {
  const l = livre(envie.livre);
  const [mot, setMot] = useState(false);
  const [cote, setCote] = useState<string | null>(null);
  useEffect(() => {
    const t = setTimeout(() => setMot(true), 1300);
    return () => clearTimeout(t);
  }, []);
  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCote(String(new FormData(e.currentTarget).get("prenom")));
  };

  return (
    <article data-film="fiche" className="relative overflow-hidden border border-[var(--trait)] bg-[var(--carte)]">
      <div className="flex gap-5 p-5">
        <span aria-hidden="true" className="relative block h-[132px] w-[92px] shrink-0 rounded-r-[4px] shadow-[inset_8px_0_0_rgba(0,0,0,0.18),0_10px_20px_-12px_rgba(44,30,22,0.7)]" style={{ background: l.couleur }}>
          <span className="absolute inset-x-2 top-4 h-px bg-white/50" />
          <span className="absolute inset-x-2 bottom-4 h-px bg-white/50" />
        </span>
        <div className="min-w-0 space-y-1">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Pour : {envie.libelle.toLowerCase()}</p>
          <h3 className="text-[30px] leading-tight">{l.titre}</h3>
          <p className="text-[15px] text-[var(--doux)]">{l.auteur} · {l.duree}</p>
        </div>
      </div>
      <div data-film="paraphe" className="flex items-center gap-4 border-t border-dashed border-[var(--trait)] px-5 py-3">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em]">Lu et paraphé par {l.lecteur}</p>
        <Paraphe key={l.id} lecteur={l.lecteur} delai={350} rejouable className="h-16 w-40 shrink-0 text-[#2B4C8C]" />
      </div>
      <p data-film="mot" className={`px-5 pb-4 font-[family-name:var(--f-caveat)] text-[28px] leading-snug text-[#2B4C8C] transition-opacity duration-500 ${mot ? "opacity-100" : "opacity-0"}`}>
        « {l.mot} » — {l.lecteur[0]}.
      </p>
      <div className="space-y-3 border-t border-[var(--trait)] bg-[var(--fond)] px-5 py-4">
        <p className="text-[15px]"><strong>{euros(l.prix)}</strong> · prix de l&apos;éditeur · retrait en boutique, 0 € de port</p>
        {cote ? (
          <p role="status" className="text-[15px]">
            Mis de côté au prénom de {cote}, pour une semaine. <strong>Démonstration : rien n&apos;est envoyé.</strong>
          </p>
        ) : (
          <form onSubmit={soumettre} className="flex gap-2">
            <label className="sr-only" htmlFor={`pa-prenom-${l.id}`}>Ton prénom</label>
            <input id={`pa-prenom-${l.id}`} name="prenom" required maxLength={30} autoComplete="given-name" placeholder="Ton prénom" className="min-h-12 min-w-0 flex-1 border border-[var(--encre)] bg-[var(--carte)] px-3 placeholder:text-[var(--doux)]" />
            <button type="submit" className="min-h-12 shrink-0 bg-[var(--accent)] px-4 text-[14px] font-semibold text-[var(--sur-accent)]">Le mettre de côté</button>
          </form>
        )}
      </div>
    </article>
  );
}

/** Pas de rayons : des envies. On en touche une, le livre lu pour elle apparaît. */
export default function Envies({ depart }: { depart?: string }) {
  const [choisie, setChoisie] = useState<string | null>(depart ?? null);
  const envie = ENVIES.find((e) => e.id === choisie);
  return (
    <div className="space-y-6">
      <div role="group" aria-label="Choisir une envie" data-film="envies" className="flex flex-wrap gap-2.5">
        {ENVIES.map((e) => (
          <button
            key={e.id}
            type="button"
            data-envie={e.id}
            aria-pressed={choisie === e.id}
            onClick={() => setChoisie(e.id)}
            className={`min-h-12 rounded-full border px-4 text-left text-[16px] transition-colors ${choisie === e.id ? "border-[var(--sombre)] bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border-[var(--encre)] bg-transparent hover:bg-[var(--carte)]"}`}
          >
            {e.libelle}
          </button>
        ))}
      </div>
      {envie ? <Fiche key={envie.id} envie={envie} /> : <p className="text-[15px] text-[var(--doux)]">Touche une envie : un livre lu pour elle apparaît.</p>}
    </div>
  );
}
