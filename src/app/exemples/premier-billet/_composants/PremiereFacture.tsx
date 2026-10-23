"use client";

import { useEffect, useRef, useState } from "react";
import { MENTIONS } from "./donnees";
import s from "./Mouvements.module.css";

/**
 * L'outil « Votre première facture » : les mentions de base se cochent à mesure qu'on
 * remplit, l'aperçu se compose, et le tampon « Prête à envoyer » tombe quand les six y
 * sont. Ce n'est pas une certification, et l'outil le dit. Tout reste dans le navigateur.
 * `compact` (l'accueil) : les mentions, l'aperçu et l'exemple, sans le formulaire.
 */

type Champs = {
  numero: string;
  date: string;
  nom: string;
  adresse: string;
  siren: string;
  franchise: boolean;
  tvaIntra: string;
  client: string;
  clientAdresse: string;
  clientPro: boolean;
  designation: string;
  quantite: string;
  prix: string;
  echeance: string;
};

const VIDE: Champs = {
  numero: "", date: "", nom: "", adresse: "", siren: "", franchise: true, tvaIntra: "",
  client: "", clientAdresse: "", clientPro: true, designation: "", quantite: "1", prix: "", echeance: "",
};

const montant = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

/** Le SIREN : neuf chiffres, dont le dernier est une clé de Luhn. */
function sirenValide(s: string) {
  const c = s.replace(/\s/g, "");
  if (!/^\d{9}$/.test(c)) return false;
  let somme = 0;
  for (let i = 0; i < 9; i++) {
    let n = Number(c[8 - i]);
    if (i % 2 === 1) n = n * 2 > 9 ? n * 2 - 9 : n * 2;
    somme += n;
  }
  return somme % 10 === 0;
}
const dateValide = (s: string) => /^\d{2}\/\d{2}\/\d{4}$/.test(s.trim());
const nombre = (s: string) => Number(s.replace(/\s/g, "").replace(",", "."));

function verifier(c: Champs) {
  const prix = nombre(c.prix);
  return [
    c.numero.trim().length > 0,
    dateValide(c.date),
    sirenValide(c.siren),
    c.client.trim().length > 1 && c.clientAdresse.trim().length > 4,
    c.designation.trim().length > 1 && prix > 0 && (c.franchise || c.tvaIntra.trim().length > 3),
    dateValide(c.echeance),
  ];
}

/**
 * L'exemple, rempli mention par mention : on voit chaque ligne se cocher. Ses dates sont
 * fixes (le 3 mars, comme la facture encadrée) : l'exemple, et le film qui le montre, ne
 * dépendent pas du jour où on les regarde.
 */
const EXEMPLE_DATE = "03/03/2026";
const EXEMPLE_ECHEANCE = "02/04/2026";
function etapesExemple(): Partial<Champs>[] {
  return [
    { numero: "0001" },
    { date: EXEMPLE_DATE },
    { nom: "Atelier M., céramiste (exemple)", adresse: "12 rue de l'Exemple, 00000 Ville-Exemple", siren: "000 000 000" },
    { client: "Boutique d'exemple", clientAdresse: "3 place de l'Exemple, 00000 Ville-Voisine" },
    { designation: "Six bols en grès, émail bleu", quantite: "6", prix: "38" },
    { echeance: EXEMPLE_ECHEANCE },
  ];
}

function Champ({ libelle, valeur, changer, aide, ...reste }: { libelle: string; valeur: string; changer: (v: string) => void; aide?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[14px] font-semibold">{libelle}</span>
      <input
        value={valeur}
        onChange={(e) => changer(e.target.value)}
        className="w-full border-b-2 border-[var(--trait)] bg-transparent px-0.5 py-2 text-[17px] placeholder:text-[var(--doux)] focus:border-[var(--encre)] focus:outline-none"
        {...reste}
      />
      {aide && <span className="block text-[13px] text-[var(--doux)]">{aide}</span>}
    </label>
  );
}

export default function PremiereFacture({ compact = false }: { compact?: boolean }) {
  const [c, setC] = useState<Champs>(VIDE);
  const minuteurs = useRef<number[]>([]);
  const maj = (p: Partial<Champs>) => setC((x) => ({ ...x, ...p }));
  const coches = verifier(c);
  const prete = coches.every(Boolean);
  const nbCoches = coches.filter(Boolean).length;
  const q = Math.max(1, nombre(c.quantite) || 1);
  const ht = Math.max(0, nombre(c.prix) || 0) * q;
  const tva = c.franchise ? 0 : Math.round(ht * 20) / 100;

  useEffect(() => () => minuteurs.current.forEach((m) => window.clearTimeout(m)), []);

  const exemple = () => {
    minuteurs.current.forEach((m) => window.clearTimeout(m));
    setC(VIDE);
    minuteurs.current = etapesExemple().map((p, i) => window.setTimeout(() => maj(p), 260 + i * 380));
  };
  const effacer = () => {
    minuteurs.current.forEach((m) => window.clearTimeout(m));
    setC(VIDE);
  };

  /* Les mentions, cochées à mesure ; le tampon quand les six y sont. */
  const mentions = (
    <div data-film="mentions" className="relative border border-[var(--trait)] bg-[var(--carte)] shadow-[0_24px_50px_-36px_rgba(30,59,50,0.55)]">
      <p className="flex items-baseline justify-between gap-4 border-b border-[var(--trait)] px-5 py-4">
        <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[23px] font-semibold sm:text-[26px]">Facture n°&nbsp;{c.numero || "0001"}</span>
        <span className="text-right text-[14px] tabular-nums text-[var(--doux)]">{nbCoches}&nbsp;/&nbsp;6 mentions</span>
      </p>
      <div aria-hidden="true" className="h-1 bg-[var(--trait)]">
        <div className="h-full bg-[var(--accent)] transition-[width] duration-500" style={{ width: `${(nbCoches / 6) * 100}%` }} />
      </div>
      <ul>
        {MENTIONS.map((m, i) => (
          <li key={m} className="flex items-center justify-between gap-3 border-b border-dashed border-[var(--trait)] px-5 py-3 text-[16px]">
            <span className="flex items-baseline gap-3">
              <span aria-hidden="true" className="w-4 font-[family-name:var(--titres)] text-[15px] tabular-nums text-[var(--accent-texte)]">{i + 1}</span>
              {m}
            </span>
            <span
              aria-label={coches[i] ? "présente" : "manquante"}
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 text-[15px] font-bold transition-colors duration-300 ${coches[i] ? "border-[#17302A] bg-[#17302A] text-[#F3EBD8]" : "border-[var(--trait)]"}`}
            >
              {coches[i] ? "✓" : ""}
            </span>
          </li>
        ))}
      </ul>
      <p className="px-5 py-3 text-[13px] text-[var(--doux)]">Exemple · outil gratuit · Premier Billet</p>
      {prete && (
        <p data-film="tampon" role="status" className={`${s.tampon} absolute right-3 top-[44%] border-[3px] border-[#8E2A2A] bg-[#FBF6EA]/90 px-3 py-1.5 text-[18px] font-bold uppercase tracking-[0.1em] text-[#8E2A2A]`}>
          Prête à envoyer
        </p>
      )}
    </div>
  );

  const boutons = (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" data-film="exemple" onClick={exemple} className="inline-flex min-h-13 items-center gap-3 bg-[var(--encre)] px-6 font-semibold text-[var(--fond)] transition-transform hover:-translate-y-0.5">
        Voir un exemple rempli
        <span aria-hidden="true">↻</span>
      </button>
      <button type="button" onClick={effacer} className="min-h-13 px-3 font-semibold underline underline-offset-4">
        Tout effacer
      </button>
    </div>
  );

  /* L'aperçu : la facture telle qu'elle partirait. */
  const apercu = (
    <article data-film="apercu" aria-label="Aperçu de la facture" className="border border-[var(--trait)] bg-white p-5 text-[14px] leading-relaxed text-[#1E3B32] shadow-[0_30px_60px_-40px_rgba(10,25,20,0.6)] sm:p-8">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[#DCCFB0] pb-4">
        <div>
          <p className="font-semibold">{c.nom || "Votre nom"}</p>
          <p>{c.adresse || "Votre adresse"}</p>
          <p>SIREN {c.siren || "—"}{!c.franchise && c.tvaIntra ? ` · TVA ${c.tvaIntra}` : ""}</p>
        </div>
        <div className="text-right">
          <p className="font-[family-name:var(--titres)] text-[22px] font-semibold">Facture n° {c.numero || "—"}</p>
          <p>Date : {c.date || "—"}</p>
        </div>
      </header>
      <p className="mt-4"><span className="font-semibold">Client :</span> {c.client || "—"}, {c.clientAdresse || "—"}</p>
      <table className="mt-4 w-full">
        <thead>
          <tr className="border-b border-[#DCCFB0] text-left text-[12px] uppercase tracking-[0.1em]">
            <th className="py-2 font-semibold">Désignation</th>
            <th className="py-2 text-right font-semibold">Qté</th>
            <th className="py-2 text-right font-semibold">Total HT</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[#DCCFB0]">
            <td className="py-2 pr-2">{c.designation || "—"}</td>
            <td className="py-2 text-right tabular-nums">{c.quantite || "1"}</td>
            <td className="py-2 text-right tabular-nums">{montant(ht)}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-3 space-y-1 text-right tabular-nums">
        <p>Total HT : {montant(ht)}</p>
        <p>{c.franchise ? "TVA non applicable, art. 293 B du CGI" : `TVA 20 % : ${montant(tva)}`}</p>
        <p className="text-[16px] font-semibold">Net à payer : {montant(ht + tva)}</p>
      </div>
      <p className="mt-4 border-t border-[#DCCFB0] pt-3">À régler au plus tard le {c.echeance || "—"}.</p>
      {c.clientPro && (
        <p className="mt-1 text-[13px]">
          Pas d&apos;escompte pour paiement anticipé. En cas de retard : pénalités au taux de trois fois le taux
          d&apos;intérêt légal, et indemnité forfaitaire de 40 € pour frais de recouvrement (code de commerce, art. L441-10).
        </p>
      )}
    </article>
  );

  const avertissement = (
    <p className="text-[14px] leading-relaxed text-[var(--doux)]">
      Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré. Les six mentions cochées
      sont une partie des mentions obligatoires (code de commerce, art. L441-9 ; code général des
      impôts, annexe II, art. 242 nonies A), pas leur liste complète : selon votre situation,
      d&apos;autres s&apos;ajoutent, et la réforme de la facturation électronique, en cours depuis le
      1er septembre 2026, en ajoute. Le tampon n&apos;est pas une certification.
    </p>
  );

  if (compact) {
    return (
      <div className="grid grid-cols-1 gap-8 p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6">
          {mentions}
          {boutons}
        </div>
        <div className="space-y-5">
          {apercu}
          <p className="text-[13px] leading-relaxed text-[var(--doux)]">
            Démonstration : rien n&apos;est envoyé. Six mentions de base, une partie seulement des
            mentions obligatoires ; le tampon n&apos;est pas une certification.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
      <div className="space-y-8">
        {mentions}
        {boutons}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-10" aria-label="Votre première facture">
          <fieldset className="space-y-5">
            <legend className="mb-2 font-[family-name:var(--titres)] text-[30px] font-semibold">1. La facture</legend>
            <div className="grid grid-cols-2 gap-5">
              <Champ libelle="Numéro" valeur={c.numero} changer={(v) => maj({ numero: v })} placeholder="0001" aide="Unique, dans une suite continue" />
              <Champ libelle="Date" valeur={c.date} changer={(v) => maj({ date: v })} placeholder="jj/mm/aaaa" inputMode="numeric" />
            </div>
          </fieldset>
          <fieldset className="space-y-5">
            <legend className="mb-2 font-[family-name:var(--titres)] text-[30px] font-semibold">2. Vous</legend>
            <Champ libelle="Votre nom ou votre dénomination" valeur={c.nom} changer={(v) => maj({ nom: v })} />
            <Champ libelle="Votre adresse" valeur={c.adresse} changer={(v) => maj({ adresse: v })} />
            <Champ libelle="Votre SIREN" valeur={c.siren} changer={(v) => maj({ siren: v })} inputMode="numeric" placeholder="000 000 000" aide={c.siren && !sirenValide(c.siren) ? "Neuf chiffres, dont le dernier est une clé de contrôle : vérifiez-le." : "Sur votre avis de situation au répertoire SIRENE"} />
            <div role="radiogroup" aria-label="TVA" className="grid grid-cols-2 gap-2">
              {[{ v: true, l: "Franchise de TVA" }, { v: false, l: "Je facture la TVA" }].map((o) => (
                <button key={o.l} type="button" role="radio" aria-checked={c.franchise === o.v} onClick={() => maj({ franchise: o.v })} className={`min-h-12 border px-2 text-[15px] font-semibold ${c.franchise === o.v ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}>
                  {o.l}
                </button>
              ))}
            </div>
            {!c.franchise && <Champ libelle="Votre numéro de TVA intracommunautaire" valeur={c.tvaIntra} changer={(v) => maj({ tvaIntra: v })} placeholder="FR00 000000000" />}
          </fieldset>
          <fieldset className="space-y-5">
            <legend className="mb-2 font-[family-name:var(--titres)] text-[30px] font-semibold">3. Votre client</legend>
            <Champ libelle="Son nom" valeur={c.client} changer={(v) => maj({ client: v })} />
            <Champ libelle="Son adresse" valeur={c.clientAdresse} changer={(v) => maj({ clientAdresse: v })} />
            <div role="radiogroup" aria-label="Votre client est" className="grid grid-cols-2 gap-2">
              {[{ v: true, l: "Un professionnel" }, { v: false, l: "Un particulier" }].map((o) => (
                <button key={o.l} type="button" role="radio" aria-checked={c.clientPro === o.v} onClick={() => maj({ clientPro: o.v })} className={`min-h-12 border px-2 text-[15px] font-semibold ${c.clientPro === o.v ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}>
                  {o.l}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="space-y-5">
            <legend className="mb-2 font-[family-name:var(--titres)] text-[30px] font-semibold">4. Ce que vous facturez</legend>
            <Champ libelle="Désignation" valeur={c.designation} changer={(v) => maj({ designation: v })} />
            <div className="grid grid-cols-2 gap-5">
              <Champ libelle="Quantité" valeur={c.quantite} changer={(v) => maj({ quantite: v })} inputMode="decimal" />
              <Champ libelle="Prix unitaire HT" valeur={c.prix} changer={(v) => maj({ prix: v })} inputMode="decimal" placeholder="0,00" />
            </div>
            <Champ libelle="Date de paiement attendue" valeur={c.echeance} changer={(v) => maj({ echeance: v })} placeholder="jj/mm/aaaa" inputMode="numeric" />
          </fieldset>
        </form>
      </div>
      <div className="space-y-6 lg:sticky lg:top-28">
        {apercu}
        {avertissement}
      </div>
    </div>
  );
}
