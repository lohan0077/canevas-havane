"use client";

import { useState } from "react";
import { PRIX, TAILLES, couleurs, euros } from "./donnees";
import { Pull } from "./Dessins";

function Tailles({ nom, valeur, choisir, film }: { nom: string; valeur: string; choisir: (t: string) => void; film: string }) {
  return (
    <div className="grid grid-cols-5 gap-2" role="group" aria-label={nom} data-film={film}>
      {TAILLES.map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={t === valeur}
          onClick={() => choisir(t)}
          className={`h-12 rounded-full border-2 font-bold ${t === valeur ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/**
 * Le pull, sa couleur, ta taille — et un bouton de plus : « Ajouter sa taille », celle de
 * la personne qui va te le prendre. En option : un pull se vend seul, et le second coûte
 * le même prix. Rien n'est commandé : la démonstration le dit.
 */
export default function Commande() {
  const [couleur, setCouleur] = useState(couleurs[0]);
  const [taille, setTaille] = useState("M");
  const [sienne, setSienne] = useState<string | null>(null);
  const [commande, setCommande] = useState(false);
  const nombre = sienne ? 2 : 1;

  return (
    <div className="space-y-6" data-film="commande">
      <div className="flex items-center gap-4">
        <Pull teinte={couleur.teinte} className="w-28 shrink-0 drop-shadow-md" titre={`Pull col rond, ${couleur.nom.toLowerCase()}`} />
        <div className="space-y-2">
          <p className="text-sm font-bold uppercase tracking-[0.14em]">Couleur · {couleur.nom}</p>
          <div className="flex gap-2" role="group" aria-label="Couleur">
            {couleurs.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-label={c.nom}
                aria-pressed={c.id === couleur.id}
                onClick={() => setCouleur(c)}
                className={`h-9 w-9 rounded-full border-2 ${c.id === couleur.id ? "border-[var(--encre)] ring-2 ring-[var(--encre)] ring-offset-2 ring-offset-[var(--fond)]" : "border-[var(--trait)]"}`}
                style={{ background: c.teinte }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-[0.14em]">Ta taille : {taille}</p>
        <Tailles nom="Ta taille" valeur={taille} choisir={setTaille} film="ta-taille" />
      </div>

      {sienne ? (
        <div className="space-y-2 rounded-[22px] border-2 border-dashed border-[var(--accent-texte)] p-4">
          <p className="flex items-center justify-between gap-3 text-sm font-bold uppercase tracking-[0.14em]">
            <span>+ Sa taille : {sienne} <span className="normal-case tracking-normal font-normal">(en option)</span></span>
            <button type="button" onClick={() => setSienne(null)} className="rounded-full px-2 py-1 text-xs normal-case tracking-normal underline underline-offset-2">
              Retirer
            </button>
          </p>
          <Tailles nom="Sa taille" valeur={sienne} choisir={setSienne} film="sa-taille" />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setSienne("L")}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--encre)] px-6 py-3.5 font-bold"
          data-film="ajouter"
        >
          <span aria-hidden="true" className="text-xl leading-none">+</span> Ajouter sa taille
        </button>
      )}

      <div className="flex items-baseline justify-between rounded-[22px] bg-[var(--carte)] px-5 py-4" aria-live="polite" data-film="resume">
        <p className="font-bold">{sienne ? `Deux pulls : ${taille} et ${sienne}` : `Un pull : ${taille}`}</p>
        <p className="text-xl font-black tabular-nums">
          {euros(PRIX * nombre)} <span className="text-xs font-bold text-[var(--doux)]">TTC</span>
        </p>
      </div>

      {commande ? (
        <div role="status" className="space-y-1 rounded-[22px] border-2 border-[var(--accent)] p-4">
          <p className="text-lg font-bold">{sienne ? `Commandé : deux pulls, ${taille} et ${sienne}.` : `Commandé : un pull, ${taille}.`}</p>
          <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est payé.</p>
        </div>
      ) : (
        <button type="button" onClick={() => setCommande(true)} className="w-full rounded-full bg-[var(--accent)] px-6 py-4 text-lg font-bold text-[var(--sur-accent)]">
          Commander
        </button>
      )}
      <p className="text-sm text-[var(--doux)]">
        {euros(PRIX)} TTC le pull, exemple. Le second, si tu l&apos;ajoutes, coûte le même prix : c&apos;est une option, pas une obligation.
      </p>
    </div>
  );
}
