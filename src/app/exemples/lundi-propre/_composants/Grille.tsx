"use client";

import { useState } from "react";
import { PASSAGES, SURFACES, euros, prixMensuel } from "./donnees";

/**
 * La grille de prix en ligne : la surface, les passages par semaine, et le prix mensuel
 * d'exemple, tout de suite. Prix hors taxes — nos clients sont des professionnels — et
 * prix ferme au devis, après visite. Démonstration : rien n'est envoyé.
 */
export default function Grille() {
  const [surface, setSurface] = useState<number | null>(null);
  const [passages, setPassages] = useState<number | null>(null);
  const [tel, setTel] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoye, setEnvoye] = useState(false);
  const prix = surface && passages ? prixMensuel(surface, passages) : null;

  const puce = (actif: boolean) =>
    `h-14 rounded-2xl border-2 text-lg font-bold tabular-nums transition-colors ${actif ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--fond)] text-[var(--encre)]"}`;

  const demander = (e: React.FormEvent) => {
    e.preventDefault();
    const chiffres = tel.replace(/\D/g, "");
    if (chiffres.length !== 10 || !chiffres.startsWith("0")) return setErreur("Indiquez un numéro à 10 chiffres pour convenir de la visite.");
    setErreur("");
    setEnvoye(true);
  };

  return (
    <div data-film="grille" className="rounded-[28px] bg-[var(--carte)] p-5 sm:p-8 space-y-6">
      <fieldset>
        <legend className="mb-2 text-xs font-bold uppercase tracking-[0.16em]">Surface</legend>
        <div className="grid grid-cols-4 gap-2">
          {SURFACES.map((s) => (
            <button key={s} id={`surface-${s}`} type="button" aria-pressed={surface === s} onClick={() => { setSurface(s); setEnvoye(false); }} className={puce(surface === s)}>
              <span className="text-[15px]">{s}&nbsp;m²</span>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-xs font-bold uppercase tracking-[0.16em]">Passages par semaine</legend>
        <div className="grid grid-cols-4 gap-2">
          {PASSAGES.map((p) => (
            <button key={p} id={`passages-${p}`} type="button" aria-pressed={passages === p} onClick={() => { setPassages(p); setEnvoye(false); }} className={puce(passages === p)}>
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      <div id="prix-mensuel" aria-live="polite" className="rounded-[22px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-5 min-h-[150px]">
        {prix && surface && passages ? (
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.16em]">Par mois</p>
            <p className="font-[family-name:var(--titres)] text-[44px] font-black leading-none tabular-nums">
              {euros(prix)} <span className="text-[var(--accent)] text-2xl">HT</span>
            </p>
            <p className="text-sm">
              {surface}&nbsp;m², {passages} passage{passages > 1 ? "s" : ""} par semaine · soit environ {euros(Math.round(prix / ((passages * 52) / 12)))} HT le passage
            </p>
            <p className="text-xs pt-1">Exemple · prix ferme au devis, après visite · TVA 20&nbsp;% en sus</p>
          </div>
        ) : (
          <p className="text-lg font-semibold">Choisissez votre surface et vos passages&nbsp;: le prix s'affiche ici.</p>
        )}
      </div>

      {prix &&
        (envoye ? (
          <div role="status" className="rounded-2xl border-2 border-[var(--accent)] p-4 space-y-1">
            <p className="font-bold">Demande de visite prête.</p>
            <p className="text-sm">On vous appelle pour fixer la visite, puis le devis arrive avec le prix ferme.</p>
            <p className="text-sm text-[var(--doux)]">Démonstration&nbsp;: rien n'est envoyé, rien n'est enregistré.</p>
          </div>
        ) : (
          <form onSubmit={demander} noValidate className="space-y-2.5">
            <input
              id="telephone"
              type="tel"
              inputMode="tel"
              autoComplete="off"
              aria-label="Votre téléphone"
              placeholder="Votre téléphone : 01 99 00 00 00"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="w-full h-12 rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-3 tabular-nums placeholder:text-[var(--doux)] focus:border-[var(--encre)] outline-none"
            />
            {erreur && <p role="alert" className="text-sm font-semibold">{erreur}</p>}
            <button type="submit" className="w-full h-12 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] font-bold">Demander une visite</button>
          </form>
        ))}
    </div>
  );
}
