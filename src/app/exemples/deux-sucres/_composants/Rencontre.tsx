"use client";

import { useState } from "react";
import { INTERVENANTES } from "./donnees";

/**
 * Le portrait d'une intervenante, dessiné. Sur un vrai site, ce serait sa photo,
 * publiée avec son accord écrit ; ici l'entreprise est fictive, et aucun visage
 * n'est montré.
 */
export function Portrait({ prenom, teinte, taille = "h-16 w-16 text-3xl" }: { prenom: string; teinte: string; taille?: string }) {
  return (
    <span aria-hidden="true" className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full font-[family-name:var(--titres)] italic text-[#3B2A1E] ${taille}`} style={{ background: teinte }}>
      <span className="absolute inset-x-[18%] bottom-[-30%] h-[62%] rounded-t-full bg-[rgba(255,251,244,.45)]" />
      <span className="relative -mt-[12%]">{prenom[0]}</span>
    </span>
  );
}

/**
 * « Tu choisis pas un service. Tu rencontres celle qui viendra. Son prénom, sa photo,
 * ce qu'elle aime. » On touche un prénom : le portrait, les jours, ce qu'elle aime, qui
 * la remplace. « Rencontrer Nadia » ne demande rien et n'envoie rien.
 */
export default function Rencontre() {
  const [choisie, setChoisie] = useState<number | null>(null);
  const [demande, setDemande] = useState(false);
  const p = choisie === null ? null : INTERVENANTES[choisie];

  return (
    <div className="rounded-[36px] bg-[var(--carte)] p-5 shadow-[0_30px_70px_-45px_rgba(59,42,30,.6)] sm:p-7">
      <p className="text-sm font-semibold text-[var(--doux)]">Celles qui viennent dans ton quartier</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {INTERVENANTES.map((x, i) => (
          <button
            key={x.id}
            id={`ds-${x.id}`}
            type="button"
            aria-pressed={choisie === i}
            onClick={() => {
              setChoisie(i);
              setDemande(false);
            }}
            className={`flex items-center gap-3 rounded-[22px] border-2 p-3 text-left transition-colors ${choisie === i ? "border-[var(--accent)] bg-[var(--fond)]" : "border-[var(--trait)]"}`}
          >
            <Portrait prenom={x.prenom} teinte={x.teinte} taille="h-12 w-12 text-2xl" />
            <span>
              <span className="block font-[family-name:var(--titres)] text-xl font-semibold">{x.prenom}</span>
              <span className="block text-xs text-[var(--doux)]">{x.jours}</span>
            </span>
          </button>
        ))}
      </div>

      <div data-film="profil" className="mt-5 min-h-[120px]" aria-live="polite">
        {!p ? (
          <p className="rounded-[22px] border border-dashed border-[var(--trait)] p-5 text-center text-[var(--doux)]">Touche un prénom pour la rencontrer.</p>
        ) : (
          <div key={p.id} className="space-y-5 text-center">
            <div className="flex flex-col items-center gap-3">
              <Portrait prenom={p.prenom} teinte={p.teinte} taille="h-28 w-28 text-6xl" />
              <p className="font-[family-name:var(--titres)] text-5xl font-semibold">{p.prenom}</p>
              <p className="text-[var(--doux)]">Chez toi {p.jours}</p>
              <p className="text-xs text-[var(--doux)]">Sur le vrai site, sa photo, publiée avec son accord. Ici, un dessin : l&apos;entreprise est fictive.</p>
            </div>
            <p className="font-[family-name:var(--titres)] text-xl italic leading-snug">« {p.phrase} »</p>
            <div id="ds-aime" className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Ce qu&apos;elle aime</p>
              <ul className="flex flex-wrap justify-center gap-2">
                {p.aime.map((a) => (
                  <li key={a} className="rounded-full bg-[var(--fond)] px-4 py-2 font-semibold">{a}</li>
                ))}
              </ul>
              <p className="text-xs text-[var(--doux)]">Goûts publiés avec son accord.</p>
            </div>
            <p className="rounded-[18px] bg-[#EFE2D0] px-4 py-3 text-sm">Si {p.prenom} est absente : {p.releve} la remplace.</p>
            {demande ? (
              <div role="status" className="rounded-[22px] border-2 border-[var(--accent)] p-4 space-y-1">
                <p className="font-semibold">{p.prenom} viendrait se présenter, avant le premier passage.</p>
                <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
              </div>
            ) : (
              <button
                type="button"
                id="ds-rencontrer"
                onClick={() => setDemande(true)}
                className="w-full min-h-[54px] rounded-full bg-[var(--accent)] px-6 text-lg font-semibold text-[var(--sur-accent)]"
              >
                Rencontrer {p.prenom}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
