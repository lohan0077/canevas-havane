"use client";

import { useMemo, useState } from "react";
import { MOIS, VOLUMES, dateLongue, euros, mois } from "./calendrier";
import { useAujourdhui } from "./aujourdhui";

const ENTETES = ["L", "M", "M", "J", "V", "S", "D"];

/**
 * Le calendrier de l'accueil : un prix par date, comme un billet de train. On choisit
 * son volume, son mois, sa date ; le billet dit le prix indicatif, et le bouton demande
 * le devis — gratuit, écrit, avec le montant HT et TTC (arrêté du 27 avril 2010).
 * Démonstration : rien n'est envoyé.
 */
export default function CalendrierPrix() {
  const aujourdhui = useAujourdhui();
  const [volume, setVolume] = useState("t2");
  const [decalage, setDecalage] = useState(1); // le mois prochain, par défaut
  const [date, setDate] = useState<string | null>(null);
  const [tel, setTel] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoye, setEnvoye] = useState(false);
  const v = VOLUMES.find((x) => x.id === volume) ?? VOLUMES[1];

  const affiche = useMemo(() => {
    if (!aujourdhui) return null;
    const [a, m] = aujourdhui.split("-").map(Number);
    const d = new Date(Date.UTC(a, m - 1 + decalage, 1));
    return { annee: d.getUTCFullYear(), m: d.getUTCMonth(), ...mois(d.getUTCFullYear(), d.getUTCMonth(), v, aujourdhui) };
  }, [aujourdhui, decalage, v]);
  const choisie = affiche?.cases.find((c) => c.cle === date && c.prix !== null);

  const demander = (e: React.FormEvent) => {
    e.preventDefault();
    const chiffres = tel.replace(/\D/g, "");
    if (chiffres.length !== 10 || !chiffres.startsWith("0")) return setErreur("Indique ton numéro, 10 chiffres : on t'envoie le devis et on t'appelle pour le volume.");
    setErreur("");
    setEnvoye(true);
  };

  return (
    <div data-film="calendrier" className="rounded-[28px] bg-[var(--carte)] border-2 border-[var(--encre)] p-4 sm:p-7 space-y-5 shadow-[8px_8px_0_var(--encre)]">
      <fieldset>
        <legend className="text-xs font-bold uppercase tracking-[0.16em] mb-2">Ton déménagement</legend>
        <div className="grid grid-cols-4 gap-1.5">
          {VOLUMES.map((x) => (
            <button
              key={x.id}
              type="button"
              id={`volume-${x.id}`}
              aria-pressed={volume === x.id}
              onClick={() => { setVolume(x.id); setEnvoye(false); }}
              className={`rounded-xl border-2 px-1 py-2 leading-tight ${volume === x.id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--carte)]" : "border-[var(--trait)]"}`}
            >
              <span className="block font-bold">{x.nom}</span>
              <span className="block text-xs tabular-nums">{x.m3}&nbsp;m³</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex items-center justify-between">
        <button type="button" aria-label="Mois précédent" disabled={decalage <= 0} onClick={() => setDecalage((d) => d - 1)} className="grid h-10 w-10 place-items-center rounded-full border-2 border-[var(--encre)] text-lg disabled:opacity-30">‹</button>
        <p className="font-[family-name:var(--titres)] text-2xl font-bold first-letter:uppercase" aria-live="polite">
          {affiche ? `${MOIS[affiche.m]} ${affiche.annee}` : " "}
        </p>
        <button type="button" aria-label="Mois suivant" disabled={decalage >= 6} onClick={() => setDecalage((d) => d + 1)} className="grid h-10 w-10 place-items-center rounded-full border-2 border-[var(--encre)] text-lg disabled:opacity-30">›</button>
      </div>

      <div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold" aria-hidden="true">
          {ENTETES.map((e, i) => <span key={i} className="py-1">{e}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-1" id="grille-prix">
          {affiche && Array.from({ length: affiche.vides }, (_, i) => <span key={`v${i}`} />)}
          {affiche?.cases.map((c) => {
            const ferme = c.prix === null || c.passe;
            const actif = c.cle === date;
            const mardi = c.semaine === 2 && !ferme;
            return (
              <button
                key={c.cle}
                type="button"
                disabled={ferme}
                data-jour={c.cle}
                data-semaine={c.semaine}
                data-rang={c.rang}
                {...(c.samediFin ? { "data-samedi-fin": "" } : {})}
                aria-pressed={actif}
                aria-label={ferme ? `${dateLongue(c.cle)} : fermé` : `${dateLongue(c.cle)} : ${euros(c.prix as number)}`}
                onClick={() => { setDate(c.cle); setEnvoye(false); }}
                className={`h-[54px] rounded-lg flex flex-col items-center justify-center leading-none transition-colors ${
                  actif
                    ? "bg-[var(--sombre)] text-[var(--sur-sombre)]"
                    : ferme
                      ? "text-[var(--doux)]"
                      : mardi
                        ? "bg-[var(--accent)] text-[var(--sur-accent)]"
                        : "bg-[var(--fond)] text-[var(--encre)]"
                }`}
              >
                <span className="text-[15px] font-bold tabular-nums">{c.quantieme}</span>
                <span className="mt-1 text-[11px] tabular-nums">{ferme ? "—" : String(c.prix).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs text-[var(--doux)]">
          <span aria-hidden="true" className="h-3 w-3 rounded-sm bg-[var(--accent)]" /> Les mardis · prix indicatifs TTC en euros · exemple · jusqu'à 30&nbsp;km
        </p>
      </div>

      <div data-film="billet" className="rounded-2xl border-2 border-dashed border-[var(--encre)] p-4 space-y-3">
        {choisie ? (
          <>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em]">Ta date</p>
                <p className="font-[family-name:var(--titres)] text-[26px] font-bold leading-tight first-letter:uppercase">{dateLongue(choisie.cle)}</p>
                <p className="text-sm">{v.nom} · {v.m3}&nbsp;m³ · jusqu'à 30&nbsp;km</p>
              </div>
              <p className="text-right shrink-0">
                <span className="block font-[family-name:var(--titres)] text-[28px] font-bold tabular-nums whitespace-nowrap">{euros(choisie.prix as number)}</span>
                <span className="block text-xs">TTC · prix indicatif</span>
              </p>
            </div>
            {envoye ? (
              <div role="status" className="rounded-xl bg-[var(--sombre)] text-[var(--sur-sombre)] p-4 space-y-1">
                <p className="font-bold text-lg">Demande prête · devis gratuit sous 24&nbsp;h</p>
                <p className="text-sm">Il dira le montant HT et TTC, et que ce prix est définitif.</p>
                <p className="text-sm">Démonstration&nbsp;: rien n'est envoyé, rien n'est enregistré.</p>
              </div>
            ) : (
              <form onSubmit={demander} noValidate className="space-y-2.5">
                <input
                  id="telephone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="off"
                  aria-label="Ton téléphone"
                  placeholder="Ton téléphone : 06 39 98 00 00"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  className="w-full h-12 rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-3 tabular-nums placeholder:text-[var(--doux)] focus:border-[var(--encre)] outline-none"
                />
                {erreur && <p role="alert" className="text-sm font-semibold">{erreur}</p>}
                <button type="submit" className="w-full h-12 rounded-full bg-[var(--encre)] text-[var(--carte)] font-bold">Demander mon devis</button>
              </form>
            )}
            <p className="text-xs text-[var(--doux)]">Prix indicatif d'exemple. Le prix ferme vient au devis, gratuit, après le calcul de ton volume.</p>
          </>
        ) : (
          <p className="text-[15px]">Touche une date&nbsp;: ton billet s'affiche ici, avec son prix.</p>
        )}
      </div>
    </div>
  );
}
