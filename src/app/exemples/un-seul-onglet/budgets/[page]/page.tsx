import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import { BUDGETS, DOSSIER } from "../../_composants/donnees";
import Budgets from "../../_composants/Budgets";

// Une page par vraie question : « voyage de noces prix moyen » est ce que les gens
// tapent (suggestions Google relevées le 15/10/2026). Trois budgets, ligne par ligne.
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
    title: `${b.titre} : trois budgets · Un Seul Onglet — site de démonstration`,
    description: `${b.intro} Budgets d'exemple, site de démonstration.`,
    ...adressesDeLaPage(`/exemples/un-seul-onglet/budgets/${b.slug}`),
  };
}

export default async function PageBudget({ params }: Params) {
  const { page } = await params;
  const b = BUDGETS.find((x) => x.slug === page);
  if (!b) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-5">
      <header className="space-y-3 pt-6 pb-5 sm:pt-14 sm:pb-8">
        <p className="text-sm font-bold text-[var(--accent-texte)]">{b.titre} · {b.pour}</p>
        <h1 className="text-[2.6rem] sm:text-7xl font-medium">Trois budgets, <em>ligne par ligne.</em></h1>
        <p className="max-w-2xl leading-relaxed">{b.intro}</p>
      </header>

      <Budgets page={b} />

      <section className="grid gap-8 py-14 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl bg-[var(--carte)] p-6">
          <h2 className="text-3xl font-medium">Ce que ces budgets <em>sont</em></h2>
          <p className="leading-relaxed text-[var(--doux)]">
            Des exemples, pour deux, TTC, relevés pour la démonstration. Une vraie agence les date
            et les tient à jour. Un budget n&apos;est pas une offre : avant toute réservation, on te
            remet le formulaire d&apos;information prévu par le Code du tourisme (art. L.211-8),
            avec le prix exact et ce qu&apos;il comprend.
          </p>
        </div>
        <div className="space-y-4 rounded-2xl bg-[var(--sombre)] p-6 text-[var(--sur-sombre)]">
          <h2 className="text-3xl font-medium">Le tien, <em>en trente minutes.</em></h2>
          <p className="leading-relaxed text-[#D3E2EF]">Dis-nous avec qui, quand et quel budget : un conseiller arrive avec un voyage chiffré.</p>
          <Link href={`${DOSSIER}#questions`} className="inline-flex min-h-12 items-center rounded-xl bg-[var(--sur-sombre)] px-6 font-bold text-[var(--sombre)]">
            Ferme tes onglets
          </Link>
        </div>
      </section>

      <nav aria-label="Les autres pages de budgets" className="pb-16">
        <ul className="flex flex-wrap gap-2">
          {BUDGETS.filter((x) => x.slug !== b.slug).map((x) => (
            <li key={x.slug}>
              <Link href={`${DOSSIER}/budgets/${x.slug}`} className="inline-flex min-h-11 items-center rounded-xl bg-[var(--carte)] px-4 font-semibold hover:ring-2 hover:ring-[var(--accent)]">
                {x.titre} : trois budgets →
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
