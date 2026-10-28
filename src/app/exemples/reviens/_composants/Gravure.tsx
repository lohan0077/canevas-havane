"use client";

import { useState } from "react";
import { euros, nettoyer, outils, teintes, ttc, type IdOutil } from "./donnees";
import { OutilGrave } from "./Outils";

/**
 * L'atelier de gravure en ligne, présenté comme une application : on choisit l'outil et
 * sa couleur, on tape son prénom, et la gravure apparaît en direct sur le dessin, lettre
 * par lettre. Puis « Commander, gravée ». Rien n'est commandé : la démonstration le dit.
 */
export default function Gravure({ outilDepart = "perceuse" }: { outilDepart?: IdOutil }) {
  const [id, setId] = useState<IdOutil>(outilDepart);
  const [teinteId, setTeinteId] = useState("anthracite");
  const [saisie, setSaisie] = useState("");
  const [commande, setCommande] = useState(false);
  const outil = outils.find((o) => o.id === id) ?? outils[0];
  const teinte = teintes.find((t) => t.id === teinteId) ?? teintes[0];
  const prenom = nettoyer(saisie, outil.maxLettres).trim();

  return (
    <div className="overflow-hidden rounded-[18px] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_40px_90px_-45px_rgba(31,43,53,0.65)]" data-film="gravure">
      {/* La barre de l'application. */}
      <div className="flex items-center justify-between gap-3 border-b border-dashed border-[var(--trait)] px-4 py-3 sm:px-5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D9C08A]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--trait)]" />
        </span>
        <span className="font-[family-name:var(--titres)] text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--doux)]">Atelier de gravure · en direct</span>
      </div>

      <div className="space-y-5 p-4 sm:p-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="L'outil">
          {outils.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={o.id === id}
              disabled={commande}
              onClick={() => setId(o.id)}
              data-outil={o.id}
              className={`rounded-[8px] border-2 px-3.5 py-2 font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.06em] transition-colors ${o.id === id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--fond)] text-[var(--encre)] hover:border-[var(--encre)]"}`}
            >
              {o.nom}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-[14px] bg-[#E7E1D5] px-4 pb-4 pt-6">
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(#DCD4C4_1px,transparent_1px),linear-gradient(90deg,#DCD4C4_1px,transparent_1px)] bg-[size:28px_28px] opacity-70" />
          <OutilGrave
            id={id}
            corps={teinte.corps}
            gravure={teinte.gravure}
            prenom={prenom}
            laser
            titre={`${outil.nom} ${teinte.nom.toLowerCase()}${prenom ? `, gravée « ${prenom} »` : ""}`}
            className="relative mx-auto h-52 w-full max-w-md drop-shadow-[0_22px_18px_rgba(0,0,0,0.25)]"
          />
          <div className="relative mt-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#1F2B35]">{outil.nom} · {outil.detail}</p>
            <div className="flex gap-2" role="group" aria-label="La couleur">
              {teintes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={t.nom}
                  aria-pressed={t.id === teinteId}
                  disabled={commande}
                  onClick={() => setTeinteId(t.id)}
                  className={`h-8 w-8 rounded-full border-2 ${t.id === teinteId ? "border-[#1F2B35] ring-2 ring-[#1F2B35] ring-offset-2 ring-offset-[#E7E1D5]" : "border-white/70"}`}
                  style={{ background: t.corps }}
                />
              ))}
            </div>
          </div>
        </div>

        <label className="block space-y-2">
          <span className="font-[family-name:var(--titres)] text-[13px] font-bold uppercase tracking-[0.16em]">Ton prénom · {outil.maxLettres} lettres au plus</span>
          <input
            type="text"
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
            disabled={commande}
            maxLength={outil.maxLettres + 4}
            autoComplete="off"
            placeholder="Ton prénom"
            data-film="prenom"
            className="h-14 w-full rounded-[10px] border-2 border-[var(--encre)] bg-[var(--fond)] px-5 font-[family-name:var(--titres)] text-xl font-bold uppercase tracking-[0.08em] outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-[var(--doux)] focus:border-[var(--accent)]"
          />
        </label>

        <div className="flex items-end justify-between gap-4 border-t border-dashed border-[var(--trait)] pt-4" data-film="prix">
          <p className="font-[family-name:var(--titres)] text-[2.6rem] font-black leading-none tabular-nums">
            {euros(outil.prix)} <span className="text-lg font-bold">HT</span>
          </p>
          <p className="text-right text-sm text-[var(--doux)]">
            soit {euros(ttc(outil.prix))} TTC · exemple
            <br />
            gravure comprise
          </p>
        </div>

        {commande ? (
          <div role="status" className="space-y-1 rounded-[10px] border-2 border-[var(--accent)] bg-[var(--fond)] p-4">
            <p className="text-lg font-bold">Commandée : {outil.nom.toLowerCase()} {teinte.nom.toLowerCase()}, gravée « {prenom} ».</p>
            <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est payé.</p>
          </div>
        ) : (
          <button
            type="button"
            disabled={!prenom}
            onClick={() => setCommande(true)}
            className="w-full rounded-[10px] bg-[var(--accent)] px-6 py-4 font-[family-name:var(--titres)] text-lg font-extrabold uppercase tracking-[0.04em] text-[var(--sur-accent)] disabled:border-2 disabled:border-dashed disabled:border-[var(--encre)] disabled:bg-transparent disabled:text-[var(--encre)]"
          >
            {prenom ? "Commander, gravée" : "Tape ton prénom pour commander"}
          </button>
        )}
        <p className="text-xs leading-relaxed text-[var(--doux)]">
          Vente réservée aux professionnels : un numéro SIRET est demandé à l&apos;ouverture du compte. Un outil gravé reste
          couvert contre les vices cachés, comme un autre.
        </p>
      </div>
    </div>
  );
}
