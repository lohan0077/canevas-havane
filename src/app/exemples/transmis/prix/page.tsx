import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Note, SAUCE, Tirage } from "../_composants/Blocs";
import Invites from "../_composants/Invites";
import { ALLERGENES, COMPRIS, DOSSIER, MENU_EXEMPLE, PALIERS, euros, photos } from "../_composants/donnees";

// Le prix par personne, TTC, selon le nombre d'invités (exemple), ce qu'il comprend,
// les allergènes et les boissons (sans alcool).
export const metadata: Metadata = {
  title: "Le prix — Transmis, site de démonstration",
  description: "Le prix par personne, toutes taxes comprises, selon le nombre d'invités, et ce qu'il comprend. Site de démonstration, prix d'exemple.",
  ...adressesDeLaPage("/exemples/transmis/prix"),
};

export default function Prix() {
  return (
    <main>
      <EnTetePage note="le prix, sans détour" titre="Par personne, *tout compris.*" photo={photos.ragout}>
        Glisse le nombre d&apos;invités&nbsp;: le prix par personne s&apos;affiche, toutes taxes comprises, pour un menu complet. Ce
        sont des prix d&apos;exemple.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-6">
          <Apparition><Note>trois paliers</Note></Apparition>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {PALIERS.map((p, i) => (
              <Apparition as="li" key={p.jusqua} delai={i * 110} className="flex items-baseline justify-between gap-4 py-5">
                <span>
                  <span className="block font-[family-name:var(--titres)] text-[28px] italic leading-tight">{p.titre}</span>
                  <span className="block text-[15px] text-[var(--doux)]">{i === 0 ? `jusqu'à ${p.jusqua} invités` : `de ${PALIERS[i - 1].jusqua + 5} à ${p.jusqua} invités`}</span>
                </span>
                <span className="font-[family-name:var(--titres)] text-[40px] leading-none tabular-nums">{euros(p.prix)}</span>
              </Apparition>
            ))}
          </ul>
          <p className="text-[14px] text-[var(--doux)]">TTC par personne, exemple. Les essais en cuisine et la dégustation sont compris, quel que soit le nombre d&apos;invités.</p>
        </div>
        <Apparition de="zoom"><Invites depart={120} /></Apparition>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
          <div className="space-y-6">
            <TitreRevele texte="Ce que comprend *le prix.*" className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5vw,4.4rem)] font-normal leading-[0.95]" classeAccent={SAUCE} />
            <ul className="space-y-3 text-lg">
              {COMPRIS.map((c, i) => (
                <Apparition as="li" key={c} delai={i * 80} className="flex gap-3 border-b border-[var(--trait)] pb-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">✓</span>{c}</Apparition>
              ))}
            </ul>
            <p className="text-[15px] leading-relaxed text-[var(--doux)]">Les boissons comprises sont sans alcool&nbsp;: eaux plates et gazeuses, citronnade maison, café.</p>
          </div>
          <div className="space-y-6">
            <TitreRevele texte="Les *allergènes.*" className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5vw,4.4rem)] font-normal leading-[0.95]" classeAccent={SAUCE} />
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Chaque plat dit ce qu&apos;il contient, parmi les quatorze allergènes que la réglementation européenne oblige à
              signaler. Avant la commande, on te demande les allergies et les régimes de tes invités, table par table.
            </p>
            <ul className="flex flex-wrap gap-2">
              {ALLERGENES.map((a) => (
                <li key={a} className="rounded-full border border-[var(--trait)] bg-[var(--fond)] px-3 py-1 text-[14px]">{a}</li>
              ))}
            </ul>
            <div className="space-y-1 rounded-[16px] border border-[var(--accent)] p-5">
              <p className="font-[family-name:var(--titres)] text-[24px] italic">{MENU_EXEMPLE.plat.nom}</p>
              <p className="text-[15px]"><strong>Allergènes&nbsp;:</strong> {MENU_EXEMPLE.plat.allergenes.join(", ").toLowerCase()} (exemple).</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:items-center md:py-32">
        <Apparition de="gauche" className="mx-auto w-full max-w-[300px] [clip-path:none]"><Tirage photo={photos.framboises} angle={-3} /></Apparition>
        <div className="space-y-6">
          <TitreRevele texte="Le prix d'un repas. *Le goût d'une famille.*" className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,4.8rem)] font-normal leading-[0.95]" classeAccent={SAUCE} />
          <Bouton href={`${DOSSIER}#recette`}>Envoyer ma recette</Bouton>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
