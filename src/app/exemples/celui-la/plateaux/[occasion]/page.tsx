import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Carte from "../../_composants/Carte";
import Plateau from "../../_composants/Plateau";
import { DOSSIER, OCCASIONS, euros, plateauPour } from "../../_composants/donnees";

export function generateStaticParams() {
  return OCCASIONS.map((o) => ({ occasion: o.slug }));
}

const occasionDe = (slug: string) => OCCASIONS.find((o) => o.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ occasion: string }> }): Promise<Metadata> {
  const o = occasionDe((await params).occasion);
  if (!o) return {};
  return {
    title: `${o.titre} — Celui-Là, site de démonstration`,
    description: `${o.titre} à la fromagerie Celui-Là (entreprise fictive) : ${o.chapo}`,
    ...adressesDeLaPage(`/exemples/celui-la/plateaux/${o.slug}`),
  };
}

// Une page par occasion, comme le dit la vidéo (« pour Google, une page par
// occasion ») : le titre que les gens tapent, la réponse chiffrée, les cartes, et
// la commande déjà réglée sur le bon nombre de personnes.
export default async function Occasion({ params }: { params: Promise<{ occasion: string }> }) {
  const o = occasionDe((await params).occasion);
  if (!o) notFound();
  const p = plateauPour(o.personnes);

  return (
    <div>
      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 pt-12 sm:pt-20">
        <Link href={`${DOSSIER}/plateaux`} className="text-sm font-semibold underline underline-offset-4">Toutes les occasions</Link>
        <h1 className="max-w-4xl text-5xl sm:text-7xl">{o.titre}</h1>
        <p className="max-w-2xl text-lg leading-relaxed">{o.chapo}</p>
        <dl className="grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-[6px] border border-[var(--encre)] bg-[var(--encre)]">
          {[
            ["Fromages", String(p.fromages.length)],
            ["Poids", p.poids],
            ["Par personne", euros(p.parPersonne)],
          ].map(([t, v]) => (
            <div key={t} className="bg-[var(--carte)] p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">{t}</dt>
              <dd className="font-[family-name:var(--titres)] text-2xl [font-variant-numeric:lining-nums]">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm text-[var(--doux)]">Repère : 120 g par personne en fin de repas. Prix TTC d&apos;exemple.</p>
      </section>

      <section className="border-t border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-8 px-5 py-16">
          <h2 className="text-4xl">Les fromages du plateau</h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {p.fromages.map((f) => <li key={f.numero}><Carte f={f} /></li>)}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-20 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <h2 className="text-4xl">Le commander</h2>
          <p className="text-lg leading-relaxed">Le nombre de personnes est déjà réglé. Tu peux l&apos;ajuster, puis choisir ton créneau de retrait.</p>
        </div>
        <Plateau depart={o.personnes} />
      </section>
    </div>
  );
}
