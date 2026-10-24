import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import Verificateur from "../_composants/Verificateur";

// La page qui répond à ce que les gens tapent (« crédit d'impôt assistance
// informatique », suggestion Google relevée le 16/10/2026), avec la vraie réponse. La
// vidéo « Remplir l'agenda » la filme : « Avec la vraie réponse, même si elle ne
// t'arrange pas. »
export const metadata: Metadata = {
  title: "Crédit d'impôt et dépannage informatique : la vraie réponse — Sans Soupir, site de démonstration",
  description: "Le dépannage informatique ouvre-t-il droit au crédit d'impôt ? Non. Les cours et l'installation à domicile, oui, sous conditions. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/sans-soupir/credit-d-impot"),
};

const CONDITIONS = [
  ["Chez toi.", "La prestation a lieu à ta résidence : l'aide au téléphone ou à distance ne compte pas."],
  ["Une entreprise déclarée.", "Déclarée services à la personne, avec les cours et l'installation comme activité principale."],
  ["Un plafond.", "3 000 € de dépenses par an et par foyer, pour l'assistance informatique."],
];

const SOURCES = [
  "Code du travail, art. D7231-1, II, 11° : l'assistance informatique à domicile est un service à la personne.",
  "Code du travail, art. L7232-1-2 : l'activité de services à la personne doit rester l'activité exclusive, ou principale selon les cas, de l'entreprise déclarée.",
  "Fiche « Assistance informatique à domicile » de la DGE (servicesalapersonne.gouv.fr) : le dépannage, la réparation de matériels, la vente et l'assistance à distance en sont exclus.",
  "Code général des impôts, art. 199 sexdecies : le crédit d'impôt suppose un organisme déclaré et une prestation à la résidence du client.",
  "Code du travail, art. D7233-5 : 3 000 € de dépenses par an et par foyer, au plus, pour l'assistance informatique.",
];

export default function CreditDImpot() {
  return (
    <main>
      <EnTetePage film="reponse" surtitre="Crédit d'impôt · la vraie réponse" titre={"Le dépannage ? *Non.*"} teinte="#DDF6EC">
        Installation, maintenance des logiciels, cours chez toi : <strong className="text-[#14614E]">oui, sous conditions</strong>.
        Même si ça ne nous arrange pas : beaucoup de sites affichent « crédit d&apos;impôt » à côté
        d&apos;un dépannage, ce n&apos;est pas ce que disent les textes.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Apparition de="zoom"><Verificateur /></Apparition>
        <div className="space-y-5">
          <TitreRevele texte="Les conditions, *en clair.*" className="text-[clamp(2.4rem,4.6vw,3.8rem)] font-extrabold leading-[0.96] tracking-[-0.04em]" classeAccent="text-[#14614E]" />
          <ul className="space-y-3">
            {CONDITIONS.map(([t, x], i) => (
              <Apparition as="li" key={t} delai={i * 120} className="rounded-[1.6rem] border border-[var(--trait)] bg-[var(--carte)] p-5 leading-relaxed">
                <strong>{t}</strong> {x}
              </Apparition>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-3 sm:px-5">
        <div className="rounded-[3rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-5xl space-y-5 px-6 py-20 sm:px-10">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold">D&apos;où vient la réponse</h2>
            <ul className="space-y-3 text-[17px] leading-relaxed">
              {SOURCES.map((s) => (
                <li key={s} className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent)]">§</span>{s}</li>
              ))}
            </ul>
            <p className="text-[15px]">Ce site est une démonstration : vérifie toujours ta situation sur impots.gouv.fr ou auprès de ton centre des impôts.</p>
          </div>
        </div>
      </section>

      <div className="h-20" />
      <AppelFinal />
    </main>
  );
}
