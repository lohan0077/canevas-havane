"use client";

import { useRef, useState } from "react";
import { COMPOSITIONS, QUESTIONS_COFFRET, allergenesDe, auteursDu, boutique, formatPour, nomCourt, produit, type Budget, type Gout } from "./donnees";
import { DessinProduit } from "./Dessins";
import Ingredients from "./Ingredients";
import styles from "./Autographe.module.css";

const LIBELLE_GOUT: Record<Gout, string> = { sucre: "sucré", sale: "salé", lesDeux: "sucré et salé" };

const liste = (noms: string[]) => (noms.length < 2 ? noms.join("") : `${noms.slice(0, -1).join(", ")} et ${noms[noms.length - 1]}`);

/**
 * L'outil de l'accueil, celui de la vidéo « Remplir le carnet de commandes » : trois
 * questions (combien, quoi, quel budget), puis le coffret composé — chaque pot signé
 * de son auteur —, puis la commande, avec les ingrédients et les allergènes affichés
 * AVANT le bouton (règlement (UE) n° 1169/2011, art. 14). Tout se passe dans le
 * navigateur : rien n'est envoyé, rien n'est payé.
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
  const repondues = [convives, gout, budget].filter((x) => x !== null).length;

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

  const puce = (actif: boolean, compact = false) =>
    `min-h-12 min-w-14 rounded-full border-2 font-semibold transition-all duration-300 ${compact ? "whitespace-nowrap px-3 text-[15px]" : "px-5 text-base"} ${
      actif
        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)] scale-[1.04]"
        : "border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] hover:border-[var(--encre)]"
    }`;

  const question = (n: number, cle: "combien" | "gout" | "budget", choix: React.ReactNode) => (
    <li data-film={cle} className="space-y-3 border-t border-[var(--trait)] pt-5 first:border-t-0 first:pt-0">
      <p className="flex items-baseline gap-3">
        <span className="font-[family-name:var(--titres)] text-3xl font-semibold leading-none text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{n}</span>
        <span className="font-[family-name:var(--titres)] text-[1.6rem] font-semibold leading-tight">{QUESTIONS_COFFRET[cle].question}</span>
      </p>
      <div className="flex flex-wrap gap-2">{choix}</div>
    </li>
  );

  return (
    <div className="space-y-6">
      <div data-film="questions" className="overflow-hidden rounded-[28px] bg-[var(--carte)] text-[var(--encre)] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--trait)] bg-[var(--fond)] px-5 py-3.5 sm:px-7">
          <p className="font-[family-name:var(--titres)] text-lg font-semibold">On apporte quoi&nbsp;?</p>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-[var(--doux)]">
            <span className="sr-only">Questions répondues :</span>
            {[0, 1, 2].map((i) => (
              <span key={i} aria-hidden="true" className={`h-2 w-6 rounded-full transition-colors duration-500 ${i < repondues ? "bg-[var(--accent)]" : "bg-[var(--trait)]"}`} />
            ))}
            <span className="ml-1.5 [font-variant-numeric:lining-nums]">{repondues}/3</span>
          </p>
        </div>
        <div className="p-5 sm:p-7">
          <ol className="space-y-5">
            {question(1, "combien", QUESTIONS_COFFRET.combien.options.map((o) => (
              <button key={o.v} type="button" aria-pressed={convives === o.v} onClick={() => changer(() => setConvives(o.v))} className={`${puce(convives === o.v)} [font-variant-numeric:lining-nums]`}>
                {o.libelle}
              </button>
            )))}
            {question(2, "gout", QUESTIONS_COFFRET.gout.options.map((o) => (
              <button key={o.v} type="button" aria-pressed={gout === o.v} onClick={() => changer(() => setGout(o.v))} className={puce(gout === o.v)}>
                {o.libelle}
              </button>
            )))}
            {question(3, "budget", QUESTIONS_COFFRET.budget.options.map((o) => (
              <button key={o.v} type="button" aria-pressed={budget === o.v} onClick={() => changer(() => setBudget(o.v))} className={`${puce(budget === o.v)} [font-variant-numeric:lining-nums]`}>
                {o.libelle}
              </button>
            )))}
          </ol>
          <button
            type="button"
            disabled={!complet}
            onClick={composer}
            className="mt-7 w-full min-h-14 rounded-full bg-[var(--encre)] px-6 text-lg font-semibold text-[var(--fond)] transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:bg-[var(--trait)] disabled:text-[var(--encre)]"
          >
            Composer mon coffret
          </button>
          {!complet && <p className="mt-3 text-center text-sm text-[var(--doux)]">Réponds aux trois questions : le coffret se compose tout seul.</p>}
        </div>
      </div>

      <div ref={resultat} className="scroll-mt-24">
        {compose && coffret && convives !== null && gout !== null && budget !== null && (
          <div className="space-y-6">
            <section data-film="coffret" aria-label="Ton coffret" className="overflow-hidden rounded-[28px] bg-[#C8A06A] p-5 text-[#2A2118] sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.14em]">
                Pour {convives === 8 ? "8 et plus" : convives} · {LIBELLE_GOUT[gout]}
              </p>
              <h3 className="mt-2 text-[2rem] font-semibold leading-tight sm:text-4xl">{coffret.nom}</h3>
              <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {coffret.contenu.map((cle, i) => {
                  const { auteur, oeuvre } = produit(cle);
                  return (
                    <li
                      key={cle}
                      data-film={`article-${cle}`}
                      className={`${styles.produit} flex flex-col items-center gap-1.5 rounded-2xl bg-[#FFFCF6] px-3 pb-4 pt-3 text-center`}
                      style={{ animationDelay: `${0.4 + i * 0.75}s` }}
                    >
                      <DessinProduit dessin={oeuvre.dessin} teinte={oeuvre.teinte} className="h-20 w-16" />
                      <span className="text-[15px] font-semibold leading-snug">{nomCourt(cle)}</span>
                      <span className="text-xs text-[#5C4F42] [font-variant-numeric:lining-nums]">{formatPour(cle, convives)}</span>
                      <span className="font-[family-name:var(--titres)] text-[15px] italic text-[#8F2F25]">signé {auteur.prenom}</span>
                    </li>
                  );
                })}
                <li
                  className={`${styles.produit} flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-[#2A2118]/40 px-3 py-4 text-center`}
                  style={{ animationDelay: `${0.4 + coffret.contenu.length * 0.75}s` }}
                >
                  <span className="font-[family-name:var(--f-caveat)] text-2xl leading-none">Un mot</span>
                  <span className="text-xs font-semibold">pour tes hôtes</span>
                </li>
              </ul>
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold leading-snug">
                  Signé {liste(auteursDu(coffret.contenu).map((a) => a.prenom))}.
                  <br />
                  Fermé d&apos;une ficelle, prêt à {boutique.retrait}.
                </p>
                <p
                  data-film="prix"
                  className={`${styles.prix} shrink-0 rounded-xl bg-[var(--encre)] px-5 py-2.5 text-center text-[var(--fond)]`}
                  style={{ animationDelay: `${0.4 + (coffret.contenu.length + 1) * 0.75}s` }}
                >
                  <span className="block font-[family-name:var(--titres)] text-4xl font-semibold leading-none [font-variant-numeric:lining-nums]">{budget} €</span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em]">TTC · exemple</span>
                </p>
              </div>
            </section>

            <section data-film="commande" aria-label="Commander ce coffret" className="space-y-6 rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5 text-[var(--encre)] sm:p-7">
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Retrait en boutique</p>
                <h3 className="text-[2rem] font-semibold leading-tight">
                  Prêt <em>{retrait === "soir" ? "ce soir." : "demain soir."}</em>
                </h3>
              </div>

              <div data-film="allergenes" className="space-y-3 rounded-2xl bg-[var(--fond)] p-4 sm:p-5">
                <p className="font-semibold">Ingrédients et allergènes, avant de commander</p>
                <ul className="space-y-3 text-[15px] leading-relaxed text-[var(--doux)]">
                  {coffret.contenu.map((cle) => {
                    const { auteur, oeuvre } = produit(cle);
                    return (
                      <li key={cle}>
                        <span className="font-semibold text-[var(--encre)]">{oeuvre.nom}</span>{" "}
                        <span className="[font-variant-numeric:lining-nums]">· {formatPour(cle, convives)}</span>
                        {oeuvre.origine && <> · origine : {oeuvre.origine}</>} · {auteur.prenom}, n° {auteur.numero}
                        <br />
                        <Ingredients texte={oeuvre.ingredients} />
                      </li>
                    );
                  })}
                </ul>
                <p className="border-t border-[var(--trait)] pt-3 text-[15px]">
                  <span className="font-semibold">Allergènes du coffret : </span>
                  {allergenes.length ? allergenes.join(" · ") : "aucun des quatorze allergènes réglementaires"}
                </p>
              </div>

              <fieldset className="space-y-2">
                <legend className="mb-2 font-semibold">Je le récupère</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["soir", "demain"] as const).map((r) => (
                    <button key={r} type="button" data-retrait={r} aria-pressed={retrait === r} onClick={() => { setRetrait(r); setCommande(false); }} className={`${puce(retrait === r, true)} [font-variant-numeric:lining-nums]`}>
                      {r === "soir" ? "Ce soir · 18 h" : "Demain · 18 h"}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-[var(--doux)]">« Ce soir » si tu commandes avant {boutique.limite}, du mardi au samedi. Tu paies en boutique, au retrait.</p>
              </fieldset>

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
                  autoComplete="off"
                  className="w-full min-h-12 rounded-xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 text-base outline-none placeholder:text-[var(--doux)] focus:border-[var(--accent)]"
                />
                <span className="block text-sm text-[var(--doux)]">Recopié à la main sur une carte, glissée sous la ficelle. {140 - mot.length} signes restants.</span>
              </label>
              {mot && (
                <p aria-hidden="true" className="mx-auto w-fit max-w-full -rotate-2 rounded-md bg-[#FFFCF6] px-6 py-4 font-[family-name:var(--f-caveat)] text-[1.7rem] leading-tight text-[#2A2118] shadow-[0_10px_24px_-14px_rgba(42,33,24,0.6)]">
                  {mot}
                </p>
              )}


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
                  className="w-full min-h-14 rounded-full bg-[var(--accent)] px-6 text-lg font-semibold text-[var(--sur-accent)] transition-transform hover:scale-[1.01] [font-variant-numeric:lining-nums]"
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
