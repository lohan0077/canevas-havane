"use client";

import { useState } from "react";
import { dossiers } from "./donnees";

const espace = (n: string) => n.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/**
 * Le dossier qui se suit comme un colis : reçu, envoyé aux banques, réponse des banques,
 * fonds versés. On entre son numéro, on touche « Suivre » ; chaque étape se touche et dit
 * ce qui s'y est passé. Deux dossiers d'exemple : l'un accordé, l'autre refusé (on appelle
 * dans les deux cas). Rien n'est envoyé : la recherche se fait dans la page.
 */
export default function Suivi() {
  const [saisie, setSaisie] = useState(dossiers[0].numero);
  const [numero, setNumero] = useState<string | null>(null);
  const [ouverte, setOuverte] = useState<number | null>(null);
  const [inconnu, setInconnu] = useState(false);
  const d = dossiers.find((x) => x.numero === numero);

  const suivre = (n: string) => {
    const trouve = dossiers.find((x) => x.numero === n.replace(/\D/g, ""));
    setInconnu(!trouve);
    setNumero(trouve ? trouve.numero : null);
    setOuverte(null);
  };

  return (
    <div data-film="suivi" className="overflow-hidden rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_30px_70px_-45px_rgba(27,42,65,0.55)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          suivre(saisie);
        }}
        className="space-y-3 border-b border-[var(--trait)] p-5 sm:p-7"
      >
        <label htmlFor="numero-dossier" className="block text-[14px] font-semibold">
          Ton numéro de dossier
        </label>
        <div className="flex gap-2">
          <input
            id="numero-dossier"
            inputMode="numeric"
            autoComplete="off"
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
            className="min-w-0 flex-1 rounded-full border-2 border-[var(--trait)] bg-[var(--fond)] px-5 py-3 text-[18px] font-semibold tabular-nums focus:border-[var(--encre)] focus:outline-none"
          />
          <button type="submit" data-film="suivre" className="rounded-full bg-[var(--encre)] px-6 text-[16px] font-semibold text-[var(--carte)]">
            Suivre
          </button>
        </div>
        <p className="text-[13px] text-[var(--doux)]">
          Exemples :{" "}
          {dossiers.map((x, i) => (
            <span key={x.numero}>
              {i > 0 && " ou "}
              <button
                type="button"
                data-film={`exemple-${x.numero}`}
                onClick={() => {
                  setSaisie(x.numero);
                  suivre(x.numero);
                }}
                className="font-semibold text-[var(--encre)] underline underline-offset-4"
              >
                n° {espace(x.numero)}
              </button>
            </span>
          ))}
          . Sur un vrai site, ton dossier est derrière un accès personnel.
        </p>
        {inconnu && <p role="alert" className="text-[14px] font-semibold text-[#9B2C10]">Ce numéro ne correspond à aucun dossier d&apos;exemple.</p>}
      </form>

      {d ? (
        <div aria-live="polite" className="p-5 sm:p-7">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-[family-name:var(--titres)] text-[26px] leading-tight [font-variant-numeric:lining-nums]">Dossier n° {espace(d.numero)}</p>
            <p className={`rounded-full px-3 py-1 text-[13px] font-semibold ${d.issue === "accord" ? "bg-[#E3F2E9] text-[#1F5F3C]" : "bg-[#F3ECDD] text-[#5B4A23]"}`}>{d.statut}</p>
          </div>
          <ol className="relative space-y-1">
            {d.etapes.map((e, i) => {
              const active = ouverte === i;
              return (
                <li key={e.titre} className="relative">
                  {i < d.etapes.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`absolute top-[46px] bottom-[-10px] left-[19px] w-[3px] rounded-full transition-colors duration-500 ${d.etapes[i + 1].etat === "fait" ? "bg-[#3FA36B]" : "bg-[var(--trait)]"}`}
                    />
                  )}
                  <button
                    type="button"
                    data-film={`etape-${i + 1}`}
                    aria-expanded={active}
                    onClick={() => setOuverte(active ? null : i)}
                    className={`grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl py-2.5 pr-3 text-left ${active ? "bg-[var(--fond)]" : ""}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border-[3px] text-[15px] font-bold ${
                        e.etat === "fait" ? "border-[#3FA36B] bg-[#3FA36B] text-[#1B2A41]" : "border-[var(--trait)] bg-[var(--carte)] text-[var(--doux)]"
                      }`}
                    >
                      {e.etat === "fait" ? "✓" : "—"}
                    </span>
                    <span className="text-[17px] font-semibold leading-snug">{e.titre}</span>
                    <span className="text-right text-[13px] text-[var(--doux)] tabular-nums">{e.date}</span>
                  </button>
                  {active && <p className="pr-3 pb-3 pl-14 text-[15px] leading-relaxed text-[var(--doux)]">{e.texte}</p>}
                </li>
              );
            })}
          </ol>
          <p className="mt-4 rounded-2xl bg-[var(--sombre)] px-4 py-3 text-[14px] text-[var(--sur-sombre)]">
            Dossier d&apos;exemple : l&apos;entreprise est fictive. À chaque réponse des banques, oui ou non, on t&apos;appelle.
          </p>
        </div>
      ) : (
        <p className="p-5 text-[15px] leading-relaxed text-[var(--doux)] sm:p-7">
          Reçu, envoyé aux banques, réponse, fonds versés : chaque étape, avec sa date. Plus besoin d&apos;appeler pour savoir où en est ton dossier.
        </p>
      )}
    </div>
  );
}
