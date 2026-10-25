"use client";

import { useEffect, useState } from "react";
import styles from "./reviens.module.css";
import { appareilParModele, appareils, euros, ttc, type Appareil } from "./donnees";

type Etape = "bouton" | "viseur" | "lecture" | "trouve";

// Les couleurs de la console, posées sur son fond #151E25 (le parent le porte) :
// pastilles #1E2A33, texte #F2EEE6, texte doux #B9C2CA — tous au-dessus de 4,5:1.

/** La plaque signalétique d'un appareil, dessinée : aucune marque, « FABRICANT » et « exemple ». */
function Plaque({ a }: { a: Appareil }) {
  return (
    <div className="mx-auto w-[80%] max-w-[300px] rotate-[-1.5deg] rounded-md border-2 border-[#8A9099] bg-[#C9CED3] bg-[linear-gradient(135deg,#D9DDE1,#B9BFC6)] px-4 py-3 text-[13px] font-semibold uppercase leading-6 tabular-nums text-[#15181C] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_18px_30px_-12px_rgba(0,0,0,0.6)]">
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
      <div className="flex flex-col items-center gap-6 py-4 text-center text-[#F2EEE6]" data-film="panne">
        <div className="relative grid place-items-center">
          <svg aria-hidden="true" viewBox="0 0 300 300" className={`pointer-events-none absolute h-[300px] w-[300px] ${styles.tourne}`}>
            <circle cx="150" cy="150" r="144" fill="none" stroke="#E9D8B4" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 9" />
          </svg>
          <button
            type="button"
            onClick={() => setEtape("viseur")}
            data-film="en-panne"
            className={`relative grid h-56 w-56 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] shadow-[inset_0_-10px_0_rgba(0,0,0,0.18)] transition-transform active:scale-95 ${styles.pouls}`}
          >
            <span className="space-y-1.5">
              <span className="block font-[family-name:var(--titres)] text-[44px] font-black uppercase leading-none tracking-[-0.03em]">En panne</span>
              <span className="block text-sm font-semibold uppercase tracking-[0.18em]">Touche ici</span>
            </span>
          </button>
        </div>
        <p className="max-w-xs text-[15px] leading-relaxed text-[#F2EEE6]">Une photo de la plaque de l&apos;appareil suffit. Le site trouve la pièce, et le vrai stock.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 text-[#F2EEE6]" data-film="panne">
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
                className={`shrink-0 rounded-[8px] border px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] ${a.id === appareil.id ? "border-[#F2EEE6] bg-[#F2EEE6] text-[#151E25]" : "border-white/20 bg-[#1E2A33] text-[#F2EEE6]"}`}
              >
                {a.court}
              </button>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-[12px] border border-white/15 bg-[#0B1015] px-4 py-10" data-film="viseur">
            <p className="absolute left-3 top-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#B9C2CA]">Photo de la plaque</p>
            {["left-3 top-8 border-l-4 border-t-4", "right-3 top-8 border-r-4 border-t-4", "bottom-3 left-3 border-b-4 border-l-4", "bottom-3 right-3 border-b-4 border-r-4"].map((c) => (
              <span key={c} aria-hidden="true" className={`absolute h-7 w-7 border-[#E9D8B4] ${c}`} />
            ))}
            <Plaque a={appareil} />
            {etape === "lecture" && <span aria-hidden="true" className={`absolute left-6 right-6 h-1 rounded-full bg-[#E9D8B4] shadow-[0_0_18px_4px_rgba(233,216,180,0.6)] ${styles.balayage}`} />}
          </div>
          <button
            type="button"
            disabled={etape === "lecture"}
            onClick={() => setEtape("lecture")}
            data-film="photo"
            className="flex min-h-14 w-full items-center justify-center gap-3 rounded-[10px] bg-[var(--accent)] px-6 font-[family-name:var(--titres)] text-lg font-extrabold uppercase tracking-[0.04em] text-[var(--sur-accent)]"
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
              placeholder="Ou tape le modèle : AR-700"
              aria-label="Référence du modèle"
              className="h-12 min-w-0 flex-1 rounded-[10px] border border-white/20 bg-[#1E2A33] px-4 text-[#F2EEE6] outline-none placeholder:text-[#B9C2CA] focus:border-[#E9D8B4]"
            />
            <button type="submit" className="rounded-[10px] border border-[#F2EEE6] px-5 font-bold">
              Chercher
            </button>
          </form>
          {inconnu && <p role="alert" className="text-sm text-[#F2B84B]">Modèle inconnu. Modèles d&apos;exemple : AR-700, LV-500, FP-2.</p>}
          <p className="text-xs text-[#B9C2CA]">Démonstration : pas d&apos;appareil photo ici, la plaque est un dessin. Rien n&apos;est envoyé.</p>
        </>
      ) : (
        <div className="space-y-4" data-film="pieces">
          <div className="rounded-[12px] border border-[#5CD68D]/50 bg-[#1E2A33] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5CD68D]">Modèle reconnu</p>
            <p className="mt-1 font-[family-name:var(--titres)] text-2xl font-extrabold">{appareil.modele} · {appareil.nom}</p>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B9C2CA]">Ses pièces · stock du dépôt, maintenant</p>
          <ul className="divide-y divide-white/10 overflow-hidden rounded-[12px] border border-white/15 bg-[#1E2A33]">
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
                      <span className="block text-xs tabular-nums text-[#B9C2CA]">{euros(ttc(p.prix))} TTC</span>
                    </p>
                  </div>
                  {reservee ? (
                    <div role="status" className="rounded-[8px] border border-[#5CD68D]/60 px-3 py-2 text-sm">
                      <p className="font-bold">Réservée : elle t&apos;attend au comptoir.</p>
                      <p className="text-[#B9C2CA]">Démonstration : rien n&apos;est envoyé.</p>
                    </div>
                  ) : (
                    p.stock > 0 && (
                      <button
                        type="button"
                        onClick={() => setReservees([...reservees, p.ref])}
                        className="w-full rounded-[8px] bg-[#F2EEE6] px-5 py-2.5 font-bold text-[#151E25]"
                      >
                        Je la réserve
                      </button>
                    )
                  )}
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-[#B9C2CA]">Stocks et prix HT d&apos;exemple. Sur le vrai site : le stock du dépôt, mis à jour à chaque sortie.</p>
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
