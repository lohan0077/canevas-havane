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
    `h-14 rounded-[6px] border text-lg font-semibold tabular-nums transition-all duration-300 ${
      actif ? "scale-[1.03] border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--fond)] text-[var(--encre)] hover:border-[var(--accent)]"
    }`;

  const demander = (e: React.FormEvent) => {
    e.preventDefault();
    const chiffres = tel.replace(/\D/g, "");
    if (chiffres.length !== 10 || !chiffres.startsWith("0")) return setErreur("Indiquez un numéro à 10 chiffres pour convenir de la visite.");
    setErreur("");
    setEnvoye(true);
  };

  return (
    <div data-film="grille" className="space-y-6 rounded-[14px] border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)] sm:p-8">
      <div className="flex items-baseline justify-between gap-3 border-b border-[var(--trait)] pb-4">
        <p className="font-[family-name:var(--titres)] text-[28px] leading-none">La grille</p>
        <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">Hors taxes</p>
      </div>
      <fieldset>
        <legend className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--doux)]">Votre surface</legend>
        <div className="grid grid-cols-4 gap-2">
          {SURFACES.map((s) => (
            <button key={s} id={`surface-${s}`} type="button" aria-pressed={surface === s} onClick={() => { setSurface(s); setEnvoye(false); }} className={puce(surface === s)}>
              <span className="text-[15px]">{s}&nbsp;m²</span>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--doux)]">Passages par semaine</legend>
        <div className="grid grid-cols-4 gap-2">
          {PASSAGES.map((p) => (
            <button key={p} id={`passages-${p}`} type="button" aria-pressed={passages === p} onClick={() => { setPassages(p); setEnvoye(false); }} className={puce(passages === p)}>
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      <div id="prix-mensuel" aria-live="polite" className="min-h-[164px] rounded-[10px] border border-[var(--trait)] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
        {prix && surface && passages ? (
          <div key={`${surface}-${passages}`} className="kit-apparait space-y-1" data-vu="">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">Votre prix mensuel</p>
            <p className="font-[family-name:var(--titres)] text-[64px] leading-none tabular-nums">
              {euros(prix)} <span className="text-[26px] italic text-[var(--accent-texte)]">HT</span>
            </p>
            <p className="text-sm">
              {surface}&nbsp;m², {passages} passage{passages > 1 ? "s" : ""} par semaine · environ {euros(Math.round(prix / ((passages * 52) / 12)))} HT le passage
            </p>
            <p className="pt-1 text-xs text-[var(--doux)]">Exemple · prix ferme au devis, après visite · TVA 20&nbsp;% en sus</p>
          </div>
        ) : (
          <p className="font-[family-name:var(--titres)] text-[26px] leading-snug">Choisissez votre surface et vos passages&nbsp;: <span className="italic text-[var(--accent-texte)]">le prix s&apos;affiche ici.</span></p>
        )}
      </div>

      {prix &&
        (envoye ? (
          <div role="status" className="space-y-1 rounded-[10px] border border-[var(--accent)] p-4">
            <p className="font-semibold">Demande de visite prête.</p>
            <p className="text-sm">On vous appelle pour fixer la visite, puis le devis arrive avec le prix ferme.</p>
            <p className="text-sm text-[var(--doux)]">Démonstration&nbsp;: rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
          </div>
        ) : (
          <form onSubmit={demander} noValidate className="space-y-2.5">
            <input
              id="telephone"
              type="tel"
              inputMode="tel"
              autoComplete="off"
              aria-label="Votre téléphone"
              placeholder="Votre téléphone : 01 99 00 00 00"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="h-12 w-full rounded-[6px] border border-[var(--trait)] bg-[var(--fond)] px-3 tabular-nums outline-none placeholder:text-[var(--doux)] focus:border-[var(--accent)]"
            />
            {erreur && <p role="alert" className="text-sm font-semibold text-[var(--accent-texte)]">{erreur}</p>}
            <button type="submit" className="h-12 w-full rounded-[6px] bg-[var(--accent)] font-semibold text-[var(--sur-accent)]">Demander une visite</button>
          </form>
        ))}
    </div>
  );
}
