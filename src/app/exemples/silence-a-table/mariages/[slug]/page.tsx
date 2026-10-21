import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, MARIAGES, MENUS, euros, prixParPersonne } from "../../_composants/donnees";
import { CartesMenu, Surtitre } from "../../_composants/Blocs";

// « Ensuite, chaque mariage devient une page. Cent invités, menu de juin, prix par
// personne. » Une page par mariage, écrite pour ce que les gens tapent (« combien coûte
// un traiteur mariage pour 100 personnes ») : le nombre d'invités, le menu et ses
// allergènes, le prix par personne TTC. Des exemples : aucun nom, aucune photo d'invités.
export function generateStaticParams() {
  return MARIAGES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = MARIAGES.find((x) => x.slug === slug);
  return {
    title: `${m ? m.titre : "Mariage"} · Silence à Table — site de démonstration`,
    description: m
      ? `Mariage d'exemple : ${m.invites} invités, ${MENUS[m.menu].saison.toLowerCase()}, prix par personne TTC et allergènes plat par plat. Site de démonstration.`
      : "Mariage d'exemple. Site de démonstration.",
    ...adressesDeLaPage(`/exemples/silence-a-table/mariages/${slug}`),
  };
}

export default async function PageMariage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = MARIAGES.find((x) => x.slug === slug);
  if (!m) notFound();
  const menu = MENUS[m.menu];
  const prix = prixParPersonne(m.invites);

  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 pt-8 pb-12 sm:pt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-5">
          <p className="text-[14px] text-[var(--doux)]">
            <Link href={`${DOSSIER}/mariages`} className="underline underline-offset-4">Les mariages</Link> / n° {m.numero}
          </p>
          <Surtitre>Mariage n° {m.numero} · exemple</Surtitre>
          <h1 className="text-[56px] sm:text-[88px] font-normal lowercase">{m.titre}</h1>
          <p className="text-lg leading-relaxed text-[var(--doux)]">{m.recit}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
          <Image src={m.photo.src} alt={m.photo.alt} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
        </div>
      </section>

      <section id="prix" className="scroll-mt-16 max-w-6xl mx-auto px-5 pb-12">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-[var(--trait)] bg-[var(--trait)] sm:grid-cols-4">
          {[
            ["Invités", String(m.invites)],
            ["Par personne", `${euros(prix)} TTC`],
            ["Total", `${euros(prix * m.invites)} TTC`],
            ["Le menu", menu.saison.replace("Menu ", "")],
          ].map(([k, v]) => (
            <div key={k} className="bg-[var(--carte)] p-5">
              <dt className="text-[12px] uppercase tracking-[0.22em] text-[var(--doux)]">{k}</dt>
              <dd className="mt-1 font-[family-name:var(--titres)] text-[30px] leading-tight tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[13px] text-[var(--doux)]">
          Prix d&apos;exemple, toutes taxes comprises : entrée, plat, dessert, service, vaisselle, eaux et café. Exemple : le {m.date}, dans {m.lieu}.
        </p>
      </section>

      <section id="menu" className="scroll-mt-16 max-w-6xl mx-auto px-5 pb-16 sm:pb-24 space-y-6">
        <h2 className="text-[44px] sm:text-6xl font-normal lowercase">{menu.saison}, plat par plat.</h2>
        <CartesMenu menu={menu} />
        <p className="text-[14px] text-[var(--doux)]">
          Les allergènes sont indiqués pour chaque plat. Avant la commande, on demande les allergies et les régimes de chaque table.
        </p>
      </section>

      <section className="bg-[var(--sombre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
          <p className="font-[family-name:var(--titres)] text-[44px] sm:text-6xl leading-[1.04] lowercase">
            {m.invites} invités&nbsp;? <span className="text-[var(--accent-texte)]">viens goûter ce menu.</span>
          </p>
          <Link href={`${DOSSIER}/degustation`} className="inline-flex h-14 w-fit items-center rounded-full bg-[var(--accent)] px-7 text-[17px] font-medium text-[var(--sur-accent)]">
            Réserver ma dégustation
          </Link>
        </div>
      </section>
    </div>
  );
}
