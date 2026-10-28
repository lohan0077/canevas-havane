import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Section, Surtitre, Titre } from "../_composants/Blocs";
import Invites from "../_composants/Invites";
import { ALLERGENES, COMPRIS, MENU_EXEMPLE, PALIERS, euros, photos } from "../_composants/donnees";

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
      <EnTetePage surtitre="Le prix, sans détour" titre="Par personne, *tout compris.*" photo={photos.ragout} origine="50% 40%">
        Glisse le nombre d&apos;invités : le prix par personne s&apos;affiche, toutes taxes comprises, pour un menu complet. Ce sont
        des prix d&apos;exemple.
      </EnTetePage>

      <Section className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-6">
          <Apparition><Surtitre>Trois paliers</Surtitre></Apparition>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {PALIERS.map((p, i) => (
              <Apparition as="li" key={p.jusqua} delai={i * 110} className="flex items-baseline justify-between gap-4 py-5">
                <span>
                  <span className="block font-[family-name:var(--titres)] text-[26px] leading-tight">{p.titre}</span>
                  <span className="block text-[15px] text-[var(--doux)]">{i === 0 ? `jusqu'à ${p.jusqua} invités` : `de ${PALIERS[i - 1].jusqua + 5} à ${p.jusqua} invités`}</span>
                </span>
                <span className="font-[family-name:var(--titres)] text-[34px] leading-none tabular-nums">{euros(p.prix)}</span>
              </Apparition>
            ))}
          </ul>
          <p className="text-[14px] leading-relaxed text-[var(--doux)]">TTC par personne, exemple. Les essais en cuisine et la dégustation sont compris, quel que soit le nombre d&apos;invités.</p>
        </div>
        <Apparition delai={150}><Invites depart={120} /></Apparition>
      </Section>

      <Section fond="bg-[var(--carte)] border-y border-[var(--trait)]" className="grid gap-16 md:grid-cols-2">
        <div className="space-y-6">
          <Titre texte="Ce que comprend *le prix.*" />
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-lg">
            {COMPRIS.map((c) => (
              <li key={c} className="py-3">{c}</li>
            ))}
          </ul>
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">Les boissons comprises sont sans alcool : eaux plates et gazeuses, citronnade maison, café.</p>
        </div>
        <div className="space-y-6">
          <Titre texte="Les *allergènes.*" />
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Chaque plat dit ce qu&apos;il contient, parmi les quatorze allergènes que la réglementation européenne oblige à signaler.
            Avant la commande, on te demande les allergies et les régimes de tes invités, table par table.
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[15px] sm:grid-cols-3">
            {ALLERGENES.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <p className="rounded-2xl border border-[var(--trait)] p-5 text-[15px] leading-relaxed">
            <span className="font-[family-name:var(--titres)] text-[22px] italic">{MENU_EXEMPLE.plat.nom}</span>
            <br />
            Allergènes : {MENU_EXEMPLE.plat.allergenes.join(", ").toLowerCase()} (exemple).
          </p>
        </div>
      </Section>

      <AppelFinal />
    </main>
  );
}
