"use client";

import { useState } from "react";
import s from "./Diners.module.css";
import { NOTES, QUESTIONS, type Reponses } from "./donnees";

const ENCRE = "#2E2A26";
const BOIS = "#D8C3A5";
const TERRE = "#B5523B";
const SAUGE = "#5B6B4E";

/** Le plan vu de dessus, qui change selon les trois réponses. */
function Plan({ r }: { r: Reponses }) {
  // Les repères 1, 2, 3 : la table, les postes de travail, le lave-vaisselle.
  const lvX = { moi: 186, enfants: 282, personne: 212 }[r.vaisselle];
  const lvW = r.vaisselle === "personne" ? 48 : 34;
  const repTable = { "2": [290, 132], "4": [190, 150], "6": [270, 225] }[r.combien];
  const repPoste = { moi: [150, 86], deux: [92, 138], tous: r.combien === "4" ? [128, 150] : [147, 125] }[r.cuisine];
  const repLv = [lvX + lvW / 2, 86];
  return (
    <svg viewBox="0 0 360 300" className="w-full" role="img" aria-label={`Plan : ${NOTES.combien[r.combien].titre}, ${NOTES.cuisine[r.cuisine].titre}, ${NOTES.vaisselle[r.vaisselle].titre}`}>
      <rect x="8" y="8" width="344" height="284" rx="6" fill="#FFFCF6" stroke={ENCRE} strokeWidth="5" />
      {/* Les plans de travail : le long du mur du haut et du mur de gauche. */}
      <rect x="10" y="10" width="340" height="52" fill={BOIS} />
      <rect x="10" y="62" width="52" height="190" fill={BOIS} />
      {/* Évier (simple ou double) et plaque. */}
      <rect x={r.vaisselle === "personne" ? 118 : 128} y="20" width={r.vaisselle === "personne" ? 66 : 44} height="32" rx="7" fill="none" stroke={ENCRE} strokeWidth="2.5" />
      {r.vaisselle === "personne" && <path d="M151 20 V52" stroke={ENCRE} strokeWidth="2.5" />}
      <g fill="none" stroke={ENCRE} strokeWidth="2.2">
        <circle cx="26" cy="126" r="8" /><circle cx="46" cy="126" r="8" /><circle cx="26" cy="150" r="8" /><circle cx="46" cy="150" r="8" />
      </g>
      {/* Frigo, au bout. */}
      <rect x="10" y="252" width="52" height="38" fill={SAUGE} />
      {/* Lave-vaisselle. */}
      <rect x={lvX} y="16" width={lvW} height="40" rx="3" fill={TERRE} />
      <text x={lvX + lvW / 2} y="41" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFFFFF">LV</text>
      {/* La table, selon le nombre. */}
      {r.combien === "2" && (
        <g>
          <rect x="228" y="150" width="124" height="30" fill={BOIS} />
          <circle cx="262" cy="196" r="11" fill={ENCRE} /><circle cx="318" cy="196" r="11" fill={ENCRE} />
        </g>
      )}
      {r.combien === "4" && (
        <g>
          <rect x="120" y="118" width="140" height="64" rx="8" fill={BOIS} />
          {[146, 178, 210, 242].map((x) => <circle key={x} cx={x} cy="200" r="11" fill={ENCRE} />)}
        </g>
      )}
      {r.combien === "6" && (
        <g>
          <rect x="196" y="186" width="148" height="78" rx="8" fill={BOIS} />
          {[222, 270, 318].map((x) => <circle key={`h${x}`} cx={x} cy="174" r="10" fill={ENCRE} />)}
          {[222, 270, 318].map((x) => <circle key={`b${x}`} cx={x} cy="276" r="10" fill={ENCRE} />)}
        </g>
      )}
      {r.cuisine === "tous" && r.combien === "4" && <rect x="112" y="110" width="156" height="80" rx="12" fill="none" stroke={ENCRE} strokeWidth="2.5" strokeDasharray="6 5" />}
      {r.cuisine === "tous" && r.combien !== "4" && <rect x="92" y="100" width="110" height="50" rx="8" fill={BOIS} stroke={ENCRE} strokeWidth="2.5" strokeDasharray="6 5" />}
      {/* Les trois repères. */}
      {[repTable, repPoste, repLv].map(([x, y], i) => (
        <g key={i} className={s.pastille} style={{ animationDelay: `${0.35 + i * 0.35}s` }}>
          <circle cx={x} cy={y} r="15" fill={ENCRE} />
          <text x={x} y={y + 5.5} textAnchor="middle" fontSize="15" fontWeight="700" fill="#FFFFFF">{i + 1}</text>
        </g>
      ))}
    </svg>
  );
}

/**
 * Pas de catalogue : trois questions sur ta vie — combien à table, qui cuisine, qui
 * fait la vaisselle — et le plan qui va avec, annoté. Tout se passe dans le navigateur.
 */
export default function TaVie() {
  const [rep, setRep] = useState<Partial<Reponses>>({});
  const [dessine, setDessine] = useState(false);
  const complet = Boolean(rep.combien && rep.cuisine && rep.vaisselle);
  const r = rep as Reponses;

  return (
    <div className="space-y-5">
      <div className="space-y-3" data-film="questions">
        {QUESTIONS.map((q, i) => (
          <fieldset key={q.id} className="rounded-[20px] bg-[var(--carte)] border border-[var(--trait)] p-4">
            <legend className="sr-only">{q.question}</legend>
            <p aria-hidden="true" className="font-[family-name:var(--titres)] text-xl">
              <span className="italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}.</span> {q.question}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {q.options.map((o) => {
                const actif = rep[q.id] === o.v;
                return (
                  <button
                    key={o.v}
                    type="button"
                    data-reponse={`${q.id}-${o.v}`}
                    aria-pressed={actif}
                    onClick={() => setRep({ ...rep, [q.id]: o.v })}
                    className={`min-h-12 rounded-full border px-2 text-base font-semibold [font-variant-numeric:lining-nums] transition-colors ${
                      actif ? "bg-[var(--encre)] border-[var(--encre)] text-[var(--fond)]" : "bg-[var(--fond)] border-[var(--trait)] text-[var(--encre)]"
                    }`}
                  >
                    {o.libelle}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {!dessine ? (
        <button
          type="button"
          data-film="dessiner"
          disabled={!complet}
          onClick={() => setDessine(true)}
          className="w-full min-h-14 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 text-lg font-semibold disabled:cursor-not-allowed"
        >
          {complet ? "Dessiner le plan de ma vie" : "Réponds aux trois questions"}
        </button>
      ) : (
        <div role="status" className="space-y-4" data-film="plan">
          {complet ? (
            <>
              <div key={`${r.combien}${r.cuisine}${r.vaisselle}`} className={`${s.feuille} rounded-[24px] bg-[#E8DDCB] p-3 sm:p-4`}>
                <p className="px-1 pb-2 font-[family-name:var(--titres)] text-2xl">
                  Ton plan, <span className="italic">pour ta vie.</span>
                </p>
                <Plan r={r} />
              </div>
              <ol className="space-y-2">
                {(["combien", "cuisine", "vaisselle"] as const).map((k, i) => {
                  const n = NOTES[k][r[k] as keyof (typeof NOTES)[typeof k]] as { titre: string; texte: string };
                  return (
                    <li key={`${k}${r[k]}`} className={`${s.note} flex gap-3 rounded-[18px] bg-[var(--carte)] border border-[var(--trait)] p-3`} style={{ animationDelay: `${0.35 + i * 0.35}s` }}>
                      <span className="grid place-items-center shrink-0 w-8 h-8 rounded-full bg-[var(--encre)] text-[var(--fond)] font-bold [font-variant-numeric:lining-nums]">{i + 1}</span>
                      <span>
                        <span className="block font-semibold">{n.titre}</span>
                        <span className="block text-sm text-[var(--doux)]">{n.texte}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
              <p className="text-sm text-[var(--doux)]">Un premier plan, dessiné dans ton navigateur : rien n&apos;est envoyé. Le vrai se dessine chez toi, sur tes cotes.</p>
            </>
          ) : (
            <p className="text-[var(--doux)]">Réponds aux trois questions, et le plan se redessine.</p>
          )}
        </div>
      )}
    </div>
  );
}
