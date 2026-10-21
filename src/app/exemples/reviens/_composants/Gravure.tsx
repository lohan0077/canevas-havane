"use client";

import { useState } from "react";
import { euros, nettoyer, outils, teintes, type IdOutil } from "./donnees";
import { OutilGrave } from "./Outils";

/**
 * L'atelier de gravure en ligne : on choisit l'outil et sa couleur, on tape son prénom,
 * et la gravure apparaît en direct sur le dessin. Puis « Commander, gravée ». Rien n'est
 * commandé : la démonstration le dit.
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
    <div className="space-y-5" data-film="gravure">
      <div className="flex flex-wrap gap-2" role="group" aria-label="L'outil">
        {outils.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={o.id === id}
            disabled={commande}
            onClick={() => setId(o.id)}
            data-outil={o.id}
            className={`rounded-full border-2 px-4 py-2 text-sm font-semibold ${o.id === id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
          >
            {o.nom}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-[28px] bg-[#E7E1D5] px-4 pb-4 pt-6">
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-[#DCD4C4]" />
        <OutilGrave
          id={id}
          corps={teinte.corps}
          gravure={teinte.gravure}
          prenom={prenom}
          laser
          titre={`${outil.nom} ${teinte.nom.toLowerCase()}${prenom ? `, gravée « ${prenom} »` : ""}`}
          className="relative mx-auto h-48 w-full max-w-md"
        />
        <div className="relative mt-3 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">{outil.nom} · {outil.detail}</p>
          <div className="flex gap-2" role="group" aria-label="La couleur">
            {teintes.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-label={t.nom}
                aria-pressed={t.id === teinteId}
                disabled={commande}
                onClick={() => setTeinteId(t.id)}
                className={`h-8 w-8 rounded-full border-2 ${t.id === teinteId ? "border-[var(--encre)] ring-2 ring-[var(--encre)] ring-offset-2 ring-offset-[#E7E1D5]" : "border-white/70"}`}
                style={{ background: t.corps }}
              />
            ))}
          </div>
        </div>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-semibold uppercase tracking-[0.14em]">Ton prénom · {outil.maxLettres} lettres au plus</span>
        <input
          type="text"
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          disabled={commande}
          maxLength={outil.maxLettres + 4}
          autoComplete="off"
          placeholder="Ton prénom"
          data-film="prenom"
          className="h-14 w-full rounded-2xl border-2 border-[var(--encre)] bg-[var(--carte)] px-5 text-xl font-semibold uppercase tracking-[0.08em] outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-[var(--doux)] focus:border-[var(--accent)]"
        />
      </label>

      <div className="flex items-end justify-between gap-4" data-film="prix">
        <p className="font-[family-name:var(--titres)] text-4xl font-extrabold tabular-nums">{euros(outil.prix)}</p>
        <p className="text-right text-sm text-[var(--doux)]">TTC · exemple<br />gravure comprise</p>
      </div>

      {commande ? (
        <div role="status" className="space-y-1 rounded-2xl border-2 border-[var(--accent)] bg-[var(--carte)] p-4">
          <p className="text-lg font-bold">Commandée : {outil.nom.toLowerCase()} {teinte.nom.toLowerCase()}, gravée « {prenom} ».</p>
          <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est payé.</p>
        </div>
      ) : (
        <button
          type="button"
          disabled={!prenom}
          onClick={() => setCommande(true)}
          className="w-full rounded-2xl bg-[var(--accent)] px-6 py-4 text-lg font-bold text-[var(--sur-accent)] disabled:border-2 disabled:border-dashed disabled:border-[var(--encre)] disabled:bg-transparent disabled:text-[var(--encre)]"
        >
          {prenom ? "Commander, gravée" : "Tape ton prénom pour commander"}
        </button>
      )}
      <p className="text-xs text-[var(--doux)]">
        Gravé à ton prénom, l&apos;outil est fait pour toi : il ne peut pas être renvoyé au titre de la rétractation. Les
        garanties légales, elles, s&apos;appliquent.
      </p>
    </div>
  );
}
