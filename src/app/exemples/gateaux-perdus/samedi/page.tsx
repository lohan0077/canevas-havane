import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import Samedi from "../_composants/Samedi";
import { PHOTOS, SAMEDI } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le samedi — Gâteaux Perdus, site de démonstration",
  description: "Le samedi d'une pâtisserie imaginaire se commande en ligne : douze gâteaux, ce que le labo sort vraiment. Pas un de plus.",
  ...adressesDeLaPage("/exemples/gateaux-perdus/samedi"),
};

export default function LeSamedi() {
  return (
    <main>
      <EnTetePage surtitre={`Le ${SAMEDI.date}`} titre="Douze gâteaux. *Pas un de plus.*" photo={PHOTOS.mainsPate} origine="55% 50%">
        C&apos;est ce que le labo sort, bien, un samedi. Le site en vend douze. Quand c&apos;est
        complet, le samedi suivant est ouvert.
      </EnTetePage>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 md:pb-32 lg:grid-cols-[0.7fr_1.3fr]">
        <Apparition as="ul" className="space-y-4 text-lg lg:pt-6">
          {["Commande jusqu'au jeudi soir.", "Retrait en boutique, à l'heure choisie.", "Paiement au retrait : rien n'est payé en ligne.", "Les allergènes, rappelés avant le bouton."].map((t) => (
            <li key={t} className="flex gap-3 border-b border-[var(--trait)] pb-4">
              <span aria-hidden="true" className="font-[family-name:var(--f-caveat)] text-2xl leading-none text-[var(--accent-texte)]">✓</span>
              {t}
            </li>
          ))}
        </Apparition>
        <Apparition de="zoom">
          <Samedi complet />
        </Apparition>
      </section>
      <AppelFinal />
    </main>
  );
}
