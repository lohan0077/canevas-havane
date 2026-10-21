import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Panier from "../../_kit/Panier";
import Sachet from "../_composants/Sachet";
import { CAFES, ORDRE, euros } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les trois cafés — Moins le Quart, site de démonstration",
  description: "Les trois cafés de la marque Moins le Quart (entreprise fictive) : 6 h 45, 15 h 45, et le décaféiné de 21 h 45.",
  ...adressesDeLaPage("/exemples/moins-le-quart/cafes"),
};

export default function Cafes() {
  return (
    <div>
      <section className="mx-auto max-w-6xl space-y-5 px-5 pb-12 pt-12 sm:pt-20">
        <p className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">La gamme</p>
        <h1 className="font-[family-name:var(--titres)] text-5xl font-extralight tracking-[-0.03em] sm:text-7xl">Trois cafés. <span className="font-medium">Toujours moins le quart.</span></h1>
        <p className="max-w-2xl text-lg leading-relaxed">L&apos;heure est un nom, pas une consigne : bois celui que tu veux, quand tu veux.</p>
      </section>

      {ORDRE.map((k, i) => {
        const c = CAFES[k];
        return (
          <section key={k} id={k} className={`scroll-mt-16 border-t border-[var(--trait)] ${i % 2 ? "bg-[var(--carte)]" : ""}`}>
            <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:py-20 md:grid-cols-[0.6fr_1.4fr] md:items-center">
              <Sachet cafe={c} />
              <div className="space-y-4">
                <p className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">{c.enLettres}</p>
                <h2 className="font-[family-name:var(--titres)] text-4xl font-light tracking-[-0.02em] sm:text-5xl">{c.nom}</h2>
                <p className="text-lg leading-relaxed">{c.phrase}</p>
                <dl className="grid gap-2 border-y border-[var(--trait)] py-4 sm:grid-cols-[9rem_1fr]">
                  <dt className="font-semibold">Ingrédient</dt>
                  <dd className="text-[var(--doux)]">{c.ingredient} Aucun allergène réglementaire.</dd>
                  <dt className="font-semibold">Formats</dt>
                  <dd className="text-[var(--doux)]">250 g, en grain ou moulu (filtre, piston, expresso, italienne)</dd>
                  <dt className="font-semibold">Prix</dt>
                  <dd className="text-[var(--doux)] tabular-nums">{euros(c.prix)} TTC les 250 g · exemple</dd>
                </dl>
              </div>
            </div>
          </section>
        );
      })}

      <section id="commander" className="scroll-mt-16 border-t border-[var(--trait)] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <h2 className="font-[family-name:var(--titres)] text-4xl font-light tracking-[-0.02em] sm:text-5xl">Commander</h2>
            <p className="text-lg leading-relaxed">Trois sachets, une heure chacun. Tu les retires au comptoir et tu paies sur place.</p>
          </div>
          <div className="text-[var(--encre)]">
            <Panier
              produits={ORDRE.map((k) => ({ nom: `${CAFES[k].heure} · ${CAFES[k].nom}`, detail: "250 g · grain ou moulu", prix: CAFES[k].prix }))}
              bouton="Commander"
              confirmation="Commande prête : tes sachets t'attendent au comptoir."
              mention="Prix TTC d'exemple. Ingrédient : café torréfié (le soir, décaféiné), rien d'autre ; aucun allergène réglementaire. Paiement au retrait."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
