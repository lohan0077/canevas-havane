import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Verificateur from "../_composants/Verificateur";

// La page qui répond à ce que les gens tapent (« crédit d'impôt assistance
// informatique », suggestion Google relevée le 16/10/2026), avec la vraie réponse.
export const metadata: Metadata = {
  title: "Crédit d'impôt et dépannage informatique : la vraie réponse · Dimanche Libre — site de démonstration",
  description: "Le dépannage informatique ouvre-t-il droit au crédit d'impôt ? Non. Les cours et l'installation à domicile, oui, sous conditions. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/dimanche-libre/credit-d-impot"),
};

const SOURCES = [
  "Code du travail, art. D7231-1, II, 11° : l'assistance informatique à domicile est un service à la personne.",
  "Fiche « Assistance informatique à domicile » de la DGE (servicesalapersonne.gouv.fr) : le dépannage, la réparation de matériels, la vente et l'assistance à distance en sont exclus.",
  "Code général des impôts, art. 199 sexdecies : le crédit d'impôt suppose un organisme déclaré et une prestation à la résidence du client.",
  "Code du travail, art. D7233-5 : 3 000 € de dépenses par an et par foyer, au plus, pour l'assistance informatique.",
];

export default function CreditDImpot() {
  return (
    <div>
      <section data-film="reponse" className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-14 pb-12 space-y-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Crédit d&apos;impôt · la vraie réponse</p>
        <h1 className="text-[50px] sm:text-8xl font-extrabold leading-[0.92] tracking-[-0.03em]">
          Le dépannage&nbsp;? <span className="text-[var(--accent-texte)]">Non.</span>
        </h1>
        <p className="max-w-2xl text-xl leading-relaxed">
          Installation, maintenance des logiciels, cours chez toi&nbsp;: <strong className="text-[#14614E]">oui, sous conditions</strong>, si l&apos;entreprise est déclarée services à la personne.
        </p>
        <p className="max-w-2xl text-[var(--doux)]">Même si ça ne nous arrange pas. Beaucoup de sites affichent « crédit d&apos;impôt » à côté d&apos;un dépannage : ce n&apos;est pas ce que disent les textes.</p>
      </section>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Verificateur />
        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold">Les conditions, en clair</h2>
          <ul className="space-y-3 text-[15px] leading-relaxed">
            <li className="rounded-[20px] bg-[var(--carte)] border border-[var(--trait)] p-4"><strong>Chez toi.</strong> La prestation a lieu à ta résidence : l&apos;aide au téléphone ou à distance ne compte pas.</li>
            <li className="rounded-[20px] bg-[var(--carte)] border border-[var(--trait)] p-4"><strong>Une entreprise déclarée.</strong> Déclarée services à la personne, avec les cours et l&apos;installation comme activité principale.</li>
            <li className="rounded-[20px] bg-[var(--carte)] border border-[var(--trait)] p-4"><strong>Un plafond.</strong> 3&nbsp;000&nbsp;€ de dépenses par an et par foyer, pour l&apos;assistance informatique.</li>
          </ul>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="rounded-[30px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-6 sm:p-10 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">D&apos;où vient la réponse</h2>
          <ul className="space-y-2.5 text-[15px] leading-relaxed text-[#C9C0DD]">
            {SOURCES.map((s) => <li key={s} className="flex gap-3"><span aria-hidden="true" className="text-[#FF9A80]">§</span>{s}</li>)}
          </ul>
          <p className="text-sm text-[#C9C0DD]">Ce site est une démonstration : vérifie toujours ta situation sur impots.gouv.fr ou auprès de ton centre des impôts.</p>
        </div>
      </section>
    </div>
  );
}
