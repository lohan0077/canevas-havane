import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import TitreRevele from "../../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../../_composants/Blocs";
import Budgets from "../../_composants/Budgets";
import { BUDGETS, DOSSIER, euros, photos, total } from "../../_composants/donnees";

// Une page par vraie question : « voyage de noces prix moyen » est ce que les gens
// tapent (suggestions Google relevées le 15/10/2026). « Une page, trois budgets,
// détaillés ligne par ligne. Les vols, les nuits, les transferts. » (« Remplir l'agenda »)
export const dynamicParams = false;
export function generateStaticParams() {
  return BUDGETS.map((b) => ({ page: b.slug }));
}

type Params = { params: Promise<{ page: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { page } = await params;
  const b = BUDGETS.find((x) => x.slug === page);
  if (!b) return {};
  return {
    title: `${b.titre} : trois budgets — Parole Tenue, site de démonstration`,
    description: `${b.intro} Budgets d'exemple, site de démonstration.`,
    ...adressesDeLaPage(`/exemples/parole-tenue/budgets/${b.slug}`),
  };
}

export default async function PageBudget({ params }: Params) {
  const { page } = await params;
  const b = BUDGETS.find((x) => x.slug === page);
  if (!b) notFound();
  const moins = Math.min(...b.voyages.map(total));
  const plus = Math.max(...b.voyages.map(total));

  return (
    <main>
      <EnTetePage surtitre={`Ce qu'on tape : « ${b.recherche} »`} titre={`${b.titre} : *trois budgets.*`} photo={photos[b.voyages[0].photo]}>
        {b.intro} De {euros(moins)} à {euros(plus)} {b.pour}, TTC, exemples.
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 md:py-24">
        <Budgets page={b} />
      </section>

      <section className="px-3 sm:px-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Apparition className="space-y-4 rounded-[2.5rem] border border-[var(--trait)] bg-[var(--carte)] p-8 sm:p-10">
            <Surtitre className="text-[var(--doux)]">Ce que ces budgets sont</Surtitre>
            <TitreRevele
              texte="Des exemples, *pas des offres.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.95]"
              classeAccent="italic text-[var(--accent-texte)]"
            />
            <p className="text-[17px] leading-relaxed text-[var(--doux)]">
              Pour deux, TTC, relevés pour la démonstration. Une vraie agence les date et les tient à jour.
              Avant toute réservation, on te remet le formulaire d&apos;information prévu par le Code du tourisme
              (art. L.211-8), avec le prix exact et ce qu&apos;il comprend.
            </p>
          </Apparition>
          <Apparition delai={150} className="flex flex-col justify-between gap-6 rounded-[2.5rem] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)] sm:p-10">
            <div className="space-y-4">
              <Surtitre>Le tien</Surtitre>
              <p className="font-[family-name:var(--titres)] text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.95]">
                En trente minutes, <em className="text-[var(--accent)]">chiffré ligne par ligne.</em>
              </p>
              <p className="text-[17px] leading-relaxed">Avec qui, quand, quel budget : un conseiller arrive avec un voyage chiffré.</p>
            </div>
            <div><Bouton href={`${DOSSIER}#ferme`}>Ferme tes onglets</Bouton></div>
          </Apparition>
        </div>
      </section>

      <nav aria-label="Les autres pages de budgets" className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <ul className="flex flex-wrap gap-3">
          {BUDGETS.filter((x) => x.slug !== b.slug).map((x) => (
            <li key={x.slug}>
              <Link href={`${DOSSIER}/budgets/${x.slug}`} className="inline-flex min-h-12 items-center rounded-full border-2 border-[var(--encre)] px-5 font-semibold transition-colors hover:bg-[var(--encre)] hover:text-[var(--fond)]">
                {x.titre} : trois budgets →
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <AppelFinal />
    </main>
  );
}
