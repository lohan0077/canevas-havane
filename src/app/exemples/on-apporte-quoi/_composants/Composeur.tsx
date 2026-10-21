"use client";

import { useRef, useState } from "react";
import { COMPOSITIONS, QUESTIONS, allergenesDe, boutique, formatPour, produits, type Budget, type Gout } from "./donnees";
import { DessinProduit } from "./Dessins";
import Ingredients from "./Ingredients";
import styles from "./Composeur.module.css";

const LIBELLE_GOUT: Record<Gout, string> = { sucre: "sucré", sale: "salé", lesDeux: "sucré et salé" };

/**
 * L'outil de l'accueil, celui de la vidéo : trois questions (combien, quoi, quel
 * budget), puis le coffret composé, puis la commande — avec les ingrédients et
 * les allergènes affichés AVANT le bouton (règlement (UE) n° 1169/2011, art. 14).
 * Tout se passe dans le navigateur : rien n'est envoyé, rien n'est payé.
 */
export default function Composeur() {
  const [convives, setConvives] = useState<number | null>(null);
  const [gout, setGout] = useState<Gout | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [compose, setCompose] = useState(false);
  const [mot, setMot] = useState("");
  const [retrait, setRetrait] = useState<"soir" | "demain">("soir");
  const [commande, setCommande] = useState(false);
  const resultat = useRef<HTMLDivElement>(null);

  const complet = convives !== null && gout !== null && budget !== null;
  const coffret = complet ? COMPOSITIONS[gout][budget] : null;
  const allergenes = coffret ? allergenesDe(coffret.contenu) : [];

  const changer = (f: () => void) => {
    f();
    setCompose(false);
    setCommande(false);
  };

  const composer = () => {
    setCompose(true);
    setCommande(false);
    // Le coffret apparaît sous les questions : on l'amène à l'écran.
    requestAnimationFrame(() => resultat.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const puce = (actif: boolean) =>
    `min-h-12 rounded-full border-2 px-4 text-base font-semibold transition-colors ${
      actif
        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]"
        : "border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] hover:border-[var(--accent)]"
    }`;

  return (
    <div className="space-y-8">
      <div data-film="questions" className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_24px_60px_-40px_rgba(42,33,24,0.55)] sm:p-8">
        <ol className="space-y-6">
          <li data-film="combien" className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">
              <span className="mr-2 font-[family-name:var(--titres)] text-[var(--accent-texte)]">1</span>
              {QUESTIONS.combien.question}
            </p>
            <div className="flex flex-wrap gap-2">
              {QUESTIONS.combien.options.map((o) => (
                <button key={o.v} type="button" aria-pressed={convives === o.v} onClick={() => changer(() => setConvives(o.v))} className={puce(convives === o.v)}>
                  {o.libelle}
                </button>
              ))}
            </div>
          </li>
          <li data-film="gout" className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">
              <span className="mr-2 font-[family-name:var(--titres)] text-[var(--accent-texte)]">2</span>
              {QUESTIONS.gout.question}
            </p>
            <div className="flex flex-wrap gap-2">
              {QUESTIONS.gout.options.map((o) => (
                <button key={o.v} type="button" aria-pressed={gout === o.v} onClick={() => changer(() => setGout(o.v))} className={puce(gout === o.v)}>
                  {o.libelle}
                </button>
              ))}
            </div>
          </li>
          <li data-film="budget" className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">
              <span className="mr-2 font-[family-name:var(--titres)] text-[var(--accent-texte)]">3</span>
              {QUESTIONS.budget.question}
            </p>
            <div className="flex flex-wrap gap-2">
              {QUESTIONS.budget.options.map((o) => (
                <button key={o.v} type="button" aria-pressed={budget === o.v} onClick={() => changer(() => setBudget(o.v))} className={`${puce(budget === o.v)} [font-variant-numeric:lining-nums]`}>
                  {o.libelle}
                </button>
              ))}
            </div>
          </li>
        </ol>
        <button
          type="button"
          disabled={!complet}
          onClick={composer}
          className="mt-7 w-full min-h-14 rounded-full bg-[var(--encre)] px-6 text-lg font-semibold text-[var(--fond)] transition-opacity disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-[var(--trait)] disabled:text-[var(--doux)]"
        >
          Composer mon coffret
        </button>
        {!complet && <p className="mt-3 text-center text-sm text-[var(--doux)]">Réponds aux trois questions : le coffret se compose tout seul.</p>}
      </div>

      <div ref={resultat} className="scroll-mt-24">
        {compose && coffret && convives !== null && gout !== null && budget !== null && (
          <div className="space-y-6">
            <section data-film="coffret" aria-label="Ton coffret" className="overflow-hidden rounded-[28px] bg-[#C8A06A] p-5 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#2A2118]">
                Pour {convives === 8 ? "8 et plus" : convives} · {LIBELLE_GOUT[gout]}
              </p>
              <h3 className="mt-2 text-[2rem] font-semibold leading-tight text-[#2A2118] sm:text-4xl">{coffret.nom}</h3>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {coffret.contenu.map((cle, i) => (
                  <li
                    key={cle}
                    data-film={`article-${cle}`}
                    className={`${styles.produit} flex flex-col items-center gap-2 rounded-2xl bg-[#FFFDF8] px-3 pb-4 pt-3 text-center text-[#2A2118]`}
                    style={{ animationDelay: `${0.45 + i * 0.6}s` }}
                  >
                    <DessinProduit dessin={produits[cle].dessin} teinte={produits[cle].teinte} className="h-20 w-16" />
                    <span className="text-[15px] font-semibold leading-snug">{produits[cle].nom}</span>
                    <span className="text-xs text-[#5C4F42] [font-variant-numeric:lining-nums]">{formatPour(cle, convives)}</span>
                  </li>
                ))}
                <li
                  className={`${styles.produit} flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-[#2A2118]/40 px-3 py-4 text-center text-[#2A2118]`}
                  style={{ animationDelay: `${0.45 + coffret.contenu.length * 0.6}s` }}
                >
                  <span className="font-[family-name:var(--f-caveat)] text-2xl leading-none">Un mot</span>
                  <span className="text-xs font-semibold">pour tes hôtes</span>
                </li>
              </ul>
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold leading-snug text-[#2A2118]">
                  Fermé d&apos;une ficelle,
                  <br />
                  prêt à {boutique.retrait}
                </p>
                <p
                  data-film="prix"
                  className={`${styles.prix} rounded-xl bg-[var(--encre)] px-5 py-2.5 text-center text-[var(--fond)]`}
                  style={{ animationDelay: `${0.45 + (coffret.contenu.length + 1) * 0.6}s` }}
                >
                  <span className="block font-[family-name:var(--titres)] text-4xl font-semibold leading-none [font-variant-numeric:lining-nums]">{budget} €</span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em]">TTC · exemple</span>
                </p>
              </div>
            </section>

            <section data-film="commande" aria-label="Commander ce coffret" className="space-y-6 rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8">
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Retrait en boutique</p>
                <h3 className="text-[2rem] font-semibold leading-tight">
                  Prêt <em>{retrait === "soir" ? "ce soir." : "demain soir."}</em>
                </h3>
              </div>

              <div data-film="allergenes" className="space-y-3 rounded-2xl bg-[var(--fond)] p-4 sm:p-5">
                <p className="font-semibold">Ingrédients et allergènes, avant de commander</p>
                <ul className="space-y-3 text-[15px] leading-relaxed text-[var(--doux)]">
                  {coffret.contenu.map((cle) => (
                    <li key={cle}>
                      <span className="font-semibold text-[var(--encre)]">{produits[cle].nom}</span>{" "}
                      <span className="[font-variant-numeric:lining-nums]">· {formatPour(cle, convives)}</span>
                      {produits[cle].origine && <> · origine : {produits[cle].origine}</>}
                      <br />
                      <Ingredients texte={produits[cle].ingredients} />
                    </li>
                  ))}
                </ul>
                <p className="border-t border-[var(--trait)] pt-3 text-[15px]">
                  <span className="font-semibold">Allergènes du coffret : </span>
                  {allergenes.length ? allergenes.join(" · ") : "aucun des quatorze allergènes réglementaires"}
                </p>
              </div>

              <label className="block space-y-2">
                <span className="font-semibold">Un mot pour tes hôtes</span>
                <input
                  type="text"
                  name="mot"
                  maxLength={140}
                  value={mot}
                  onChange={(e) => {
                    setMot(e.target.value);
                    setCommande(false);
                  }}
                  placeholder="Merci pour l'invitation !"
                  className="w-full min-h-12 rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 text-base outline-none focus:border-[var(--accent)]"
                />
                <span className="block text-sm text-[var(--doux)]">Recopié à la main sur une carte, glissée sous le ruban. {140 - mot.length} signes restants.</span>
              </label>
              {mot && (
                <p aria-hidden="true" className="mx-auto w-fit max-w-full -rotate-2 rounded-md bg-[#FFFDF8] px-6 py-4 font-[family-name:var(--f-caveat)] text-[1.7rem] leading-tight text-[#2A2118] shadow-[0_10px_24px_-14px_rgba(42,33,24,0.6)]">
                  {mot}
                </p>
              )}

              <fieldset className="space-y-2">
                <legend className="mb-2 font-semibold">Je le récupère</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["soir", "demain"] as const).map((r) => (
                    <button key={r} type="button" aria-pressed={retrait === r} onClick={() => { setRetrait(r); setCommande(false); }} className={puce(retrait === r)}>
                      {r === "soir" ? "Ce soir · 18 h" : "Demain · 18 h"}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-[var(--doux)]">« Ce soir » si tu commandes avant {boutique.limite}. Tu paies en boutique, au retrait.</p>
              </fieldset>

              {commande ? (
                <div role="status" className="space-y-1 rounded-2xl border-2 border-[var(--accent)] bg-[var(--fond)] p-5">
                  <p className="font-[family-name:var(--titres)] text-2xl font-semibold">Prêt à 18 h en boutique</p>
                  <p>{coffret.nom}, {retrait === "soir" ? "ce soir" : "demain"}, {boutique.adresse}. Tu paies sur place.</p>
                  <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCommande(true)}
                  className="w-full min-h-14 rounded-full bg-[var(--accent)] px-6 text-lg font-semibold text-[var(--sur-accent)] [font-variant-numeric:lining-nums]"
                >
                  Commander · {budget} €
                </button>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
