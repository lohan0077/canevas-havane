import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import { AppelFinal, EnTetePage, Surtitre } from "../../_composants/Blocs";
import Carte from "../../_composants/Carte";
import Plateau from "../../_composants/Plateau";
import { DOSSIER, OCCASIONS, euros, photos, plateauPour } from "../../_composants/donnees";

export function generateStaticParams() {
  return OCCASIONS.map((o) => ({ occasion: o.slug }));
}

const occasionDe = (slug: string) => OCCASIONS.find((o) => o.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ occasion: string }> }): Promise<Metadata> {
  const o = occasionDe((await params).occasion);
  if (!o) return {};
  return {
    title: `${o.titre} — Patience, site de démonstration`,
    description: `${o.titre} à la fromagerie Patience (entreprise fictive) : ${o.chapo}`,
    ...adressesDeLaPage(`/exemples/patience/plateaux/${o.slug}`),
  };
}

// Une page par occasion, comme le dit la vidéo (« pour Google, une page par
// occasion ») : le titre que les gens tapent, la réponse chiffrée, les cartes, et la
// commande déjà réglée sur le bon nombre de personnes.
export default async function Occasion({ params }: { params: Promise<{ occasion: string }> }) {
  const o = occasionDe((await params).occasion);
  if (!o) notFound();
  const p = plateauPour(o.personnes);

  return (
    <main>
      <EnTetePage surtitre={<Link href={`${DOSSIER}/plateaux`} className="underline underline-offset-4">Toutes les occasions</Link>} titre={o.titre} photo={photos.plateau}>
        {o.chapo}
      </EnTetePage>

      <section className="mx-auto max-w-7xl px-5 pt-12 sm:px-8">
        <dl className="grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-[1.25rem] border-2 border-[var(--encre)] bg-[var(--encre)]">
          {[
            ["Fromages", String(p.fromages.length)],
            ["Poids", p.poids],
            ["Par personne", euros(p.parPersonne)],
          ].map(([t, v]) => (
            <div key={t} className="bg-[var(--carte)] p-4 sm:p-5">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">{t}</dt>
              <dd className="font-[family-name:var(--titres)] text-3xl [font-variant-numeric:lining-nums]">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-[var(--doux)]">Repère : 120 g par personne en fin de repas. Prix TTC d&apos;exemple.</p>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-5 py-16 sm:px-8 md:py-20">
        <div className="space-y-5">
          <Apparition><Surtitre>Les fromages du plateau</Surtitre></Apparition>
          <h2 className="text-[clamp(2.4rem,4.6vw,4rem)] leading-[0.95] tracking-[-0.03em]">Chacun avec <em className="text-[var(--accent-texte)]">sa carte.</em></h2>
        </div>
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {p.fromages.map((f, i) => <Apparition as="li" key={f.numero} delai={(i % 3) * 110}><Carte f={f} /></Apparition>)}
        </ul>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-t-[3rem] rounded-b-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)] sm:rounded-t-[10rem]">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-24 sm:px-10 md:pt-32 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-6">
              <Surtitre clair>Le commander</Surtitre>
              <h2 className="text-[clamp(2.4rem,4.6vw,4rem)] leading-[0.95] tracking-[-0.03em]">Déjà réglé <em className="text-[#E3B85C]">sur {o.personnes}.</em></h2>
              <p className="text-lg leading-relaxed text-[var(--sur-sombre)]/90">Tu peux l&apos;ajuster, puis choisir ton créneau de retrait. Commandé jeudi, prêt samedi matin.</p>
            </div>
            <Plateau depart={o.personnes} />
          </div>
        </div>
      </section>

      <div className="h-16" />
      <AppelFinal />
    </main>
  );
}
