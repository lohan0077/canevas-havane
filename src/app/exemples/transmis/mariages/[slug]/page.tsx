import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import { AppelFinal, Bouton, CartesMenu, EnTetePage, Section, Titre } from "../../_composants/Blocs";
import { DOSSIER, MARIAGES, euros, prixParPersonne } from "../../_composants/donnees";

// « Ensuite, chaque mariage devient une page. Cent invités, menu de juin, prix par
// personne. » Une page par mariage, écrite pour ce que les gens tapent (« combien coûte
// un traiteur mariage pour 100 personnes ») : le nombre d'invités, le menu et ses
// allergènes, le plat de la famille, le prix par personne TTC. Des exemples : aucun nom,
// aucune photo d'invités.
export function generateStaticParams() {
  return MARIAGES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = MARIAGES.find((x) => x.slug === slug);
  return {
    title: `${m ? m.titre : "Mariage"} — Transmis, site de démonstration`,
    description: m
      ? `Mariage d'exemple : ${m.invites} invités, ${m.menu.saison.toLowerCase()}, ${m.menu.plat.nom.toLowerCase()}, prix par personne TTC et allergènes plat par plat. Site de démonstration.`
      : "Mariage d'exemple. Site de démonstration.",
    ...adressesDeLaPage(`/exemples/transmis/mariages/${slug}`),
  };
}

export default async function PageMariage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = MARIAGES.find((x) => x.slug === slug);
  if (!m) notFound();
  const prix = prixParPersonne(m.invites);

  return (
    <main>
      <EnTetePage surtitre={`Mariage n° ${m.numero}, en exemple`} titre={`${m.titre}.`} photo={m.photo}>
        {m.recit}
      </EnTetePage>

      <section id="prix" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl space-y-4 px-6 pt-20 md:pt-28">
          <p className="text-[14px] text-[var(--doux)]">
            <Link href={`${DOSSIER}/mariages`} className="underline underline-offset-4">Les mariages</Link> / n° {m.numero}
          </p>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--trait)] bg-[var(--trait)] md:grid-cols-4">
            {[
              ["Invités", String(m.invites)],
              ["Par personne", `${euros(prix)} TTC`],
              ["Total", `${euros(prix * m.invites)} TTC`],
              ["Le menu", m.menu.saison.replace("Menu ", "")],
            ].map(([k, v], i) => (
              <Apparition key={k} delai={i * 90} className="bg-[var(--carte)] p-5 sm:p-6">
                <dt className="text-[15px] text-[var(--doux)]">{k}</dt>
                <dd className="mt-1 font-[family-name:var(--titres)] text-[clamp(1.6rem,3vw,2.4rem)] leading-tight tabular-nums">{v}</dd>
              </Apparition>
            ))}
          </dl>
          <p className="text-[13px] text-[var(--doux)]">
            Prix d&apos;exemple, toutes taxes comprises : entrée, le plat de la famille, dessert, service, vaisselle, eaux et café.
            Exemple : le {m.date}, dans {m.lieu}.
          </p>
        </div>
      </section>

      <Section id="menu" className="space-y-14">
        <Titre texte={`${m.menu.saison}, plat par plat.`} />
        <CartesMenu menu={m.menu} />
        <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--doux)]">
          Les allergènes sont indiqués pour chaque plat. Avant la commande, on demande les allergies et les régimes de chaque table.
          Sur la table, une carte : {m.transmis.charAt(0).toLowerCase() + m.transmis.slice(1)} (exemple).
        </p>
        <Bouton href={`${DOSSIER}/degustation`}>Viens goûter ce menu</Bouton>
      </Section>

      <AppelFinal />
    </main>
  );
}
