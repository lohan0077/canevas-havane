"use client";

import { useState } from "react";
import { STATUT, rubriques } from "./donnees";
import { fabriquerPdf, type LignePdf } from "./pdf";

const TOUTES = rubriques.flatMap((r) => r.lignes);

/**
 * Le carnet de famille : où est quoi, qui appeler, ce qui est prévu. On l'écrit ici, il
 * reste dans la page (rien n'est enregistré, rien n'est envoyé) ; « Télécharger en PDF »
 * le fabrique dans le navigateur, et c'est le parent qui le donne à ses enfants. Le cabinet
 * n'écrit à personne (CPCE L34-5 ; CMF L341-1) et n'en garde aucune copie.
 */
export default function Carnet() {
  const [onglet, setOnglet] = useState(rubriques[0].cle);
  const [valeurs, setValeurs] = useState<Record<string, string>>({});
  const [fichier, setFichier] = useState<string | null>(null);
  const r = rubriques.find((x) => x.cle === onglet) ?? rubriques[0];
  const remplies = TOUTES.filter((l) => valeurs[l.cle]?.trim()).length;

  const exemple = () => {
    const v: Record<string, string> = {};
    for (const l of TOUTES) if (l.exemple) v[l.cle] = l.exemple;
    setValeurs(v);
    setFichier(null);
  };

  const telecharger = () => {
    const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    const lignes: LignePdf[] = [
      { texte: "Le carnet de famille", taille: 24, gras: true },
      { texte: `Écrit le ${date}. Ce carnet n'a été envoyé à personne : c'est toi qui le donnes.`, taille: 10, couleur: [0.33, 0.38, 0.31], avant: 4 },
    ];
    for (const rub of rubriques) {
      lignes.push({ texte: rub.titre, taille: 15, gras: true, couleur: [0.64, 0.27, 0.18], avant: 18 });
      for (const l of rub.lignes) {
        lignes.push({ texte: l.libelle, taille: 11, gras: true, avant: 6 });
        lignes.push({ texte: valeurs[l.cle]?.trim() || "—", taille: 11 });
      }
    }
    lignes.push({ texte: `Dimanche Midi · ${STATUT}. Site de démonstration : entreprise fictive.`, taille: 8, couleur: [0.33, 0.38, 0.31], avant: 24 });
    const octets = fabriquerPdf(lignes);
    const lien = URL.createObjectURL(new Blob([octets.buffer as ArrayBuffer], { type: "application/pdf" }));
    const a = document.createElement("a");
    a.href = lien;
    a.download = "carnet-de-famille.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(lien), 2000);
    setFichier(a.download);
  };

  return (
    <div data-film="carnet" className="overflow-hidden rounded-[26px] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_30px_60px_-40px_rgba(34,56,44,0.6)]">
      <div className="space-y-1 border-b border-[var(--trait)] px-5 pt-5 pb-4 sm:px-7">
        <p className="font-[family-name:var(--titres)] text-[28px] leading-tight">Le carnet de famille</p>
        <p className="text-[13px] text-[var(--doux)]">Il reste sur ton téléphone : rien n&apos;est envoyé au cabinet.</p>
      </div>

      <div role="tablist" aria-label="Rubriques du carnet" className="grid grid-cols-3 border-b border-[var(--trait)] bg-[#F3E7CF]">
        {rubriques.map((x) => (
          <button
            key={x.cle}
            type="button"
            role="tab"
            data-film={`rubrique-${x.cle}`}
            aria-selected={onglet === x.cle}
            aria-controls={`carnet-${x.cle}`}
            onClick={() => setOnglet(x.cle)}
            className={`min-h-12 px-2 text-[14px] leading-tight font-semibold ${onglet === x.cle ? "bg-[var(--carte)] text-[var(--encre)] shadow-[inset_0_3px_0_#B5523B]" : "text-[#55604F]"}`}
          >
            {x.titre}
          </button>
        ))}
      </div>

      <div id={`carnet-${r.cle}`} role="tabpanel" className="space-y-1 px-5 py-5 sm:px-7">
        <p className="pb-2 text-[14px] text-[var(--doux)]">{r.chapeau}</p>
        {r.lignes.map((l) => (
          <label key={l.cle} className="block border-b border-dashed border-[var(--trait)] pb-1.5 pt-2.5">
            <span className="block text-[13px] font-semibold tracking-[0.04em] text-[var(--accent-texte)] uppercase">{l.libelle}</span>
            <input
              value={valeurs[l.cle] ?? ""}
              data-film={`champ-${l.cle}`}
              onChange={(e) => {
                setValeurs({ ...valeurs, [l.cle]: e.target.value });
                setFichier(null);
              }}
              placeholder={l.aide}
              autoComplete="off"
              className="w-full bg-transparent font-[family-name:var(--f-caveat)] text-[24px] leading-tight text-[#22382C] placeholder:font-[family-name:var(--texte)] placeholder:text-[15px] placeholder:text-[#636D5D] focus:outline-none"
            />
          </label>
        ))}
      </div>

      <div className="space-y-3 border-t border-[var(--trait)] bg-[#FBF5EA] px-5 py-5 sm:px-7">
        <div className="flex items-center justify-between gap-3 text-[13px]">
          <span className="font-semibold tabular-nums" aria-live="polite">{remplies} / {TOUTES.length} lignes écrites</span>
          <span className="flex gap-3">
            <button type="button" data-film="exemple" onClick={exemple} className="font-semibold underline underline-offset-4">Un exemple</button>
            <button type="button" onClick={() => { setValeurs({}); setFichier(null); }} className="font-semibold underline underline-offset-4">Effacer</button>
          </span>
        </div>
        <button type="button" data-film="pdf" onClick={telecharger} className="w-full rounded-full bg-[var(--accent)] px-6 py-3.5 text-[16px] font-semibold text-[var(--sur-accent)]">
          Télécharger en PDF
        </button>
        <div aria-live="polite">
          {fichier && (
            <p role="status" className="rounded-[14px] border-2 border-[var(--accent)] bg-[var(--carte)] p-3.5 text-[14px] leading-snug">
              <span className="font-semibold">Carnet enregistré : {fichier}, sur cet appareil.</span>{" "}
              <span className="text-[var(--doux)]">À toi de le donner à tes enfants. Rien n&apos;a été envoyé au cabinet, qui n&apos;en garde aucune copie.</span>
            </p>
          )}
        </div>
        <p className="text-[12px] leading-snug text-[var(--doux)]">
          Rien n&apos;est enregistré dans la page : si tu la fermes, le carnet s&apos;efface. Télécharge-le avant.
        </p>
        <p className="border-t border-[var(--trait)] pt-3 text-[11px] leading-snug text-[var(--doux)]">Dimanche Midi · {STATUT}</p>
      </div>
    </div>
  );
}
