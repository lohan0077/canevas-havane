"use client";

import { useState } from "react";
import { cabinet, jours, typesSeance } from "./donnees";

const cle = (h: string) => h.replace(/\s/g, "");

/**
 * Le rendez-vous en trois clics : la séance, le jour, l'heure. Puis un nom et un
 * téléphone — et jamais le motif de consultation, barré à l'écran pour qu'on le voie :
 * c'est une donnée de santé, le site n'en a pas besoin. Rien n'est envoyé.
 * Les attributs data-… et les ids servent au tournage des vidéos.
 */
export default function TroisClics() {
  const [type, setType] = useState<string | null>(null);
  const [jourId, setJourId] = useState<string | null>(null);
  const [heure, setHeure] = useState<string | null>(null);
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [erreur, setErreur] = useState("");
  const [reserve, setReserve] = useState(false);
  const jour = jours.find((j) => j.id === jourId);
  const clics = [type, jourId, heure].filter(Boolean).length;

  const recommencer = () => {
    setType(null);
    setJourId(null);
    setHeure(null);
    setReserve(false);
  };

  const envoyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || tel.replace(/\D/g, "").length < 10) {
      setErreur("Il manque un nom ou un numéro de téléphone à dix chiffres.");
      return;
    }
    setErreur("");
    setReserve(true);
  };

  const pastille = (actif: boolean) =>
    `min-h-12 rounded-2xl px-4 text-[15px] font-semibold transition-all duration-300 ${
      actif ? "bg-[var(--encre)] text-[var(--fond)] scale-[1.02]" : "bg-[var(--fond)] text-[var(--encre)] hover:bg-[#EADCCB]"
    }`;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_40px_90px_-50px_rgba(42,24,48,0.6)]" data-film="rdv">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--trait)] bg-[var(--fond)] px-5 py-3.5 sm:px-7">
        <p className="font-[family-name:var(--titres)] text-xl italic whitespace-nowrap">Rendez-vous</p>
        <p className="flex items-center gap-1 text-sm font-semibold whitespace-nowrap" aria-live="polite" data-film="compteur">
          {[1, 2, 3].map((n) => (
            <span key={n} aria-hidden="true" className={`h-2 w-5 rounded-full transition-colors duration-500 ${n <= clics ? "bg-[var(--accent)]" : "bg-[var(--trait)]"}`} />
          ))}
          <span className="ml-1.5 tabular-nums">{clics}/3 clics</span>
        </p>
      </div>

      <div className="space-y-6 p-5 sm:p-7">
        <fieldset className="space-y-2.5">
          <legend className="mb-2 text-sm font-semibold text-[var(--doux)]">1. Quelle séance&nbsp;?</legend>
          <div className="grid grid-cols-2 gap-2">
            {typesSeance.map((t) => (
              <button key={t.id} type="button" data-type={t.id} aria-pressed={type === t.id} disabled={reserve} onClick={() => setType(t.id)} className={`${pastille(type === t.id)} py-2.5 text-left`}>
                <span className="block">{t.libelle}</span>
                <span className="block text-xs font-normal">{t.detail}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Les étapes à venir, dessinées sans texte : l'application a sa forme dès l'arrivée. */}
        {!type && <Esquisse legende="2. Quel jour ?" cases={5} />}

        {type && (
          <fieldset className="kit-apparait space-y-2.5" data-vu="">
            <legend className="mb-2 text-sm font-semibold text-[var(--doux)]">2. Quel jour&nbsp;?</legend>
            <div className="grid grid-cols-5 gap-1.5">
              {jours.map((j) => (
                <button key={j.id} type="button" data-jour={j.id} aria-pressed={jourId === j.id} disabled={reserve} onClick={() => { setJourId(j.id); setHeure(null); }} className={`${pastille(jourId === j.id)} px-1`}>
                  {j.court}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {!jour && <Esquisse legende="3. À quelle heure ?" cases={4} />}

        {jour && (
          <fieldset className="space-y-2.5">
            <legend className="mb-2 text-sm font-semibold text-[var(--doux)]">3. À quelle heure&nbsp;?</legend>
            <div className="grid grid-cols-4 gap-1.5">
              {jour.heures.map((h) => (
                <button
                  key={h.h}
                  type="button"
                  data-heure={`${jour.id}-${cle(h.h)}`}
                  aria-pressed={heure === h.h}
                  disabled={h.pris || reserve}
                  onClick={() => setHeure(h.h)}
                  className={h.pris ? "min-h-12 rounded-2xl text-[15px] text-[var(--doux)] line-through" : `${pastille(heure === h.h)} px-1 tabular-nums`}
                >
                  {h.h}
                </button>
              ))}
            </div>
            <p className="text-xs text-[var(--doux)]">Créneaux d&apos;exemple. Barrés : déjà pris.</p>
          </fieldset>
        )}

        {jour && heure && (
          <form onSubmit={envoyer} noValidate className="space-y-3 border-t border-[var(--trait)] pt-5" data-film="coordonnees">
            <p className="font-[family-name:var(--titres)] text-3xl italic">
              {jour.long.charAt(0).toUpperCase() + jour.long.slice(1)}, {heure}
            </p>
            <label className="block space-y-1">
              <span className="text-sm font-semibold">Nom</span>
              <input id="cm-nom" value={nom} onChange={(e) => setNom(e.target.value)} readOnly={reserve} autoComplete="off" className="w-full min-h-12 rounded-xl border border-[var(--trait)] bg-[var(--fond)] px-4 text-base outline-none focus:border-[var(--encre)]" />
            </label>
            <label className="block space-y-1">
              <span className="text-sm font-semibold">Téléphone</span>
              <input id="cm-tel" value={tel} onChange={(e) => setTel(e.target.value)} readOnly={reserve} inputMode="tel" autoComplete="off" className="w-full min-h-12 rounded-xl border border-[var(--trait)] bg-[var(--fond)] px-4 text-base tabular-nums outline-none focus:border-[var(--encre)]" />
            </label>
            <div id="motif-barre" className="rounded-xl border border-dashed border-[var(--doux)] px-4 py-3">
              <p className="text-sm font-semibold text-[var(--doux)] line-through decoration-2 decoration-[var(--accent-texte)]">Motif de consultation</p>
              <p className="text-sm">Rien à expliquer ici. Vous le direz en séance, si vous le voulez.</p>
            </div>
            {reserve ? (
              <div role="status" className="space-y-1 rounded-2xl border-2 border-[var(--accent)] bg-[var(--fond)] p-4">
                <p className="font-[family-name:var(--titres)] text-xl italic">Réservé : {jour.long} {heure}</p>
                <p className="text-sm">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
              </div>
            ) : (
              <>
                {erreur && <p role="alert" className="text-sm font-semibold text-[var(--accent-texte)]">{erreur}</p>}
                <button type="submit" className="w-full min-h-14 rounded-full bg-[var(--encre)] text-lg font-semibold text-[var(--fond)] transition-transform hover:scale-[1.01]">
                  Réserver
                </button>
              </>
            )}
            <p className="text-xs text-[var(--doux)]">
              Séance de {cabinet.seance.duree} · {cabinet.seance.prix} (prix d&apos;exemple) · carte bancaire acceptée
            </p>
            {reserve && (
              <button type="button" onClick={recommencer} className="text-sm font-semibold underline underline-offset-4">Choisir un autre créneau</button>
            )}
          </form>
        )}

        <p id="urgence-rdv" className="text-sm text-[var(--doux)]">
          Urgence&nbsp;: <strong className="text-[var(--encre)]">15</strong> · Prévention du suicide&nbsp;: <strong className="text-[var(--encre)]">3114</strong>, jour et nuit
        </p>
      </div>
    </div>
  );
}

/** Une étape pas encore ouverte : son intitulé, et des cases vides. */
function Esquisse({ legende, cases }: { legende: string; cases: number }) {
  return (
    <div className="space-y-2.5">
      <p className="mb-2 text-sm font-semibold text-[var(--doux)]">{legende.replace(" ?", "\u00a0?")}</p>
      <div className={`grid gap-1.5 ${cases === 5 ? "grid-cols-5" : "grid-cols-4"}`}>
        {Array.from({ length: cases }, (_, i) => (
          <span key={i} aria-hidden="true" className="h-12 rounded-2xl border border-dashed border-[var(--trait)] bg-[var(--fond)]/60" />
        ))}
      </div>
    </div>
  );
}
