"use client";

import { useEffect, useState } from "react";
import styles from "./animations.module.css";
import { appareilParModele, appareils, euros, type Appareil } from "./donnees";

type Etape = "bouton" | "viseur" | "lecture" | "trouve";

/** La plaque signalétique d'un appareil, dessinée : aucune marque, « FABRICANT » et « exemple ». */
function Plaque({ a }: { a: Appareil }) {
  return (
    <div className="mx-auto w-[78%] rotate-[-1.5deg] rounded-md border-2 border-[#8A9099] bg-[#C9CED3] bg-[linear-gradient(135deg,#D9DDE1,#B9BFC6)] px-4 py-3 text-[13px] font-semibold uppercase leading-6 tabular-nums text-[#15181C] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
      <p className="text-base font-bold tracking-[0.2em]">FABRICANT</p>
      <p>Modèle {a.modele}</p>
      <p>N° {a.serie}</p>
      <p>{a.tension}</p>
      <p className="text-[11px] uppercase tracking-[0.2em]">exemple</p>
    </div>
  );
}

/**
 * Le bouton « En panne » et ce qu'il ouvre : la photo de la plaque (simulée — pas
 * d'appareil photo ici), le modèle reconnu, ses pièces avec le vrai stock du dépôt, et la
 * réservation. Rien n'est envoyé : la démonstration le dit.
 */
export default function Panne({ ouvert = false }: { ouvert?: boolean }) {
  const [etape, setEtape] = useState<Etape>(ouvert ? "viseur" : "bouton");
  const [appareil, setAppareil] = useState(appareils[0]);
  const [reservees, setReservees] = useState<string[]>([]);
  const [saisie, setSaisie] = useState("");
  const [inconnu, setInconnu] = useState(false);

  useEffect(() => {
    if (etape !== "lecture") return;
    const t = setTimeout(() => setEtape("trouve"), 1300);
    return () => clearTimeout(t);
  }, [etape]);

  if (etape === "bouton") {
    return (
      <div className="flex flex-col items-center gap-5 text-center" data-film="panne">
        <button
          type="button"
          onClick={() => setEtape("viseur")}
          data-film="en-panne"
          className={`grid h-52 w-52 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] ring-8 ring-[var(--accent)]/25 ${styles.pouls}`}
        >
          <span className="space-y-1">
            <span className="block font-[family-name:var(--titres)] text-[40px] font-extrabold leading-none">En panne</span>
            <span className="block text-sm font-semibold">Touche ici</span>
          </span>
        </button>
        <p className="text-[var(--doux)]">Une photo de la plaque suffit.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5" data-film="panne">
      {etape !== "trouve" ? (
        <>
          <div className="flex flex-wrap gap-2" role="group" aria-label="L'appareil en panne">
            {appareils.map((a) => (
              <button
                key={a.id}
                type="button"
                aria-pressed={a.id === appareil.id}
                disabled={etape === "lecture"}
                onClick={() => setAppareil(a)}
                className={`shrink-0 rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] ${a.id === appareil.id ? "border-[var(--sur-sombre)] bg-[var(--sur-sombre)] text-[var(--sombre)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
              >
                {a.court}
              </button>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-[14px] border border-[var(--trait)] bg-[#050607] px-4 py-10" data-film="viseur">
            <p className="absolute left-3 top-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--doux)]">Photo de la plaque</p>
            {["left-3 top-8 border-l-4 border-t-4", "right-3 top-8 border-r-4 border-t-4", "bottom-3 left-3 border-b-4 border-l-4", "bottom-3 right-3 border-b-4 border-r-4"].map((c) => (
              <span key={c} aria-hidden="true" className={`absolute h-7 w-7 border-[var(--accent-texte)] ${c}`} />
            ))}
            <Plaque a={appareil} />
            {etape === "lecture" && <span aria-hidden="true" className={`absolute left-6 right-6 h-1 rounded-full bg-[var(--accent-texte)] shadow-[0_0_18px_4px_rgba(255,138,125,0.6)] ${styles.balayage}`} />}
          </div>
          <button
            type="button"
            disabled={etape === "lecture"}
            onClick={() => setEtape("lecture")}
            data-film="photo"
            className="flex w-full items-center justify-center gap-3 rounded-full bg-[var(--accent)] px-6 py-4 text-lg font-bold text-[var(--sur-accent)] disabled:opacity-80"
          >
            <span aria-hidden="true" className="h-5 w-5 rounded-full border-[3px] border-current" />
            {etape === "lecture" ? "Lecture de la plaque…" : "Prendre la photo"}
          </button>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const a = appareilParModele(saisie);
              if (!a) return setInconnu(true);
              setInconnu(false);
              setAppareil(a);
              setEtape("trouve");
            }}
          >
            <input
              type="text"
              value={saisie}
              onChange={(e) => setSaisie(e.target.value)}
              placeholder="Ou tape le modèle : AR-700"
              aria-label="Référence du modèle"
              className="h-12 min-w-0 flex-1 rounded-full border border-[var(--trait)] bg-[var(--carte)] px-5 outline-none placeholder:text-[var(--doux)] focus:border-[var(--accent-texte)]"
            />
            <button type="submit" className="rounded-full border border-[var(--sur-sombre)] px-5 font-bold">
              Chercher
            </button>
          </form>
          {inconnu && <p role="alert" className="text-sm text-[var(--accent-texte)]">Modèle inconnu. Modèles d&apos;exemple : AR-700, LV-500, FP-2.</p>}
          <p className="text-xs text-[var(--doux)]">Démonstration : pas d&apos;appareil photo ici, la plaque est un dessin. Rien n&apos;est envoyé.</p>
        </>
      ) : (
        <div className="space-y-4" data-film="pieces">
          <div className="rounded-[14px] border border-[#5CD68D]/50 bg-[var(--carte)] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5CD68D]">Modèle reconnu</p>
            <p className="mt-1 font-[family-name:var(--titres)] text-2xl font-extrabold">{appareil.modele} · {appareil.nom}</p>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--doux)]">Ses pièces · stock du dépôt</p>
          <ul className="divide-y divide-[var(--trait)] overflow-hidden rounded-[14px] border border-[var(--trait)] bg-[var(--carte)]">
            {appareil.pieces.map((p) => {
              const reservee = reservees.includes(p.ref);
              return (
                <li key={p.ref} className="space-y-3 p-4" data-piece={p.ref}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">{p.nom} {p.ref}</p>
                      <p className={`mt-1 inline-flex items-center gap-2 text-sm font-semibold ${p.stock ? "text-[#5CD68D]" : "text-[#F2B84B]"}`}>
                        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${p.stock ? "bg-[#5CD68D]" : "bg-[#F2B84B]"}`} />
                        {p.stock ? `En stock : ${p.stock}, au dépôt` : `Sur commande : ${p.delai}`}
                      </p>
                    </div>
                    <p className="shrink-0 text-right">
                      <span className="block font-bold tabular-nums">{euros(p.prix)} HT</span>
                      <span className="block text-xs text-[var(--doux)] tabular-nums">{euros(p.prix * 1.2)} TTC</span>
                    </p>
                  </div>
                  {reservee ? (
                    <div role="status" className="rounded-md border border-[#5CD68D]/60 px-3 py-2 text-sm">
                      <p className="font-bold">Réservée : retrait dès 7 h.</p>
                      <p className="text-[var(--doux)]">Démonstration : rien n&apos;est envoyé.</p>
                    </div>
                  ) : (
                    p.stock > 0 && (
                      <button
                        type="button"
                        onClick={() => setReservees([...reservees, p.ref])}
                        className="w-full rounded-full bg-[var(--sur-sombre)] px-5 py-2.5 font-bold text-[var(--sombre)]"
                      >
                        Je la réserve
                      </button>
                    )
                  )}
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-[var(--doux)]">Stocks et prix d&apos;exemple. Sur le vrai site : le stock du dépôt, mis à jour à chaque sortie.</p>
          <button
            type="button"
            onClick={() => {
              setEtape("viseur");
              setReservees([]);
              setSaisie("");
            }}
            className="text-sm font-semibold underline underline-offset-4"
          >
            Une autre plaque
          </button>
        </div>
      )}
    </div>
  );
}
