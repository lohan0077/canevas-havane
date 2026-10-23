import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import TitreRevele from "../../../_kit/TitreRevele";
import { AppelFinal, Bouton, CartesMenu, MOUTARDE, Note, SAUCE, Tirage } from "../../_composants/Blocs";
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
      <section className="relative overflow-hidden border-b border-[var(--trait)] bg-[var(--fond)] [background-image:repeating-linear-gradient(180deg,transparent_0_39px,rgba(201,214,227,.45)_39px_40px)]">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-44 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <p className="text-[14px] text-[var(--doux)]">
              <Link href={`${DOSSIER}/mariages`} className="underline underline-offset-4">Les mariages</Link> / n° {m.numero}
            </p>
            <Apparition><Note>mariage n° {m.numero} · exemple</Note></Apparition>
            <TitreRevele
              as="h1"
              auChargement
              texte={m.titre.replace(/, (.*)$/, ", *$1.*")}
              className="font-[family-name:var(--titres)] text-[clamp(3.2rem,7.5vw,7rem)] font-normal leading-[0.95] tracking-[-0.02em]"
              classeAccent={SAUCE}
            />
            <Apparition as="p" delai={450} className="max-w-2xl text-lg leading-relaxed text-[var(--doux)]">{m.recit}</Apparition>
          </div>
          <Apparition de="droite" delai={300} className="mx-auto w-full max-w-[320px] [clip-path:none]">
            <Tirage photo={m.photo} angle={3} />
          </Apparition>
        </div>
      </section>

      <section id="prix" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[26px] border border-[var(--trait)] bg-[var(--trait)] md:grid-cols-4">
          {[
            ["Invités", String(m.invites)],
            ["Par personne", `${euros(prix)} TTC`],
            ["Total", `${euros(prix * m.invites)} TTC`],
            ["Le menu", m.menu.saison.replace("Menu ", "")],
          ].map(([k, v], i) => (
            <Apparition key={k} delai={i * 90} className="bg-[var(--carte)] p-5 sm:p-6">
              <dt className="text-[12px] uppercase tracking-[0.22em] text-[var(--doux)]">{k}</dt>
              <dd className="mt-1 font-[family-name:var(--titres)] text-[clamp(1.7rem,3vw,2.6rem)] leading-tight tabular-nums">{v}</dd>
            </Apparition>
          ))}
        </dl>
        <p className="mt-3 text-[13px] text-[var(--doux)]">
          Prix d&apos;exemple, toutes taxes comprises : entrée, le plat de la famille, dessert, service, vaisselle, eaux et café.
          Exemple : le {m.date}, dans {m.lieu}.
        </p>
      </section>

      <section id="menu" className="scroll-mt-24 mx-auto max-w-7xl space-y-8 px-5 pb-24 sm:px-8 md:pb-32">
        <TitreRevele texte={`${m.menu.saison}, *plat par plat.*`} className="font-[family-name:var(--titres)] text-[clamp(2.8rem,5.5vw,4.8rem)] font-normal leading-[0.95]" classeAccent={SAUCE} />
        <CartesMenu menu={m.menu} />
        <p className="text-[14px] text-[var(--doux)]">
          Les allergènes sont indiqués pour chaque plat. Avant la commande, on demande les allergies et les régimes de chaque table.
          Sur la table, une carte&nbsp;: {m.transmis.charAt(0).toLowerCase() + m.transmis.slice(1)} (exemple).
        </p>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain grid gap-8 rounded-[2.5rem] bg-[var(--sombre)] px-6 py-16 text-[var(--sur-sombre)] sm:px-12 md:grid-cols-[1.3fr_1fr] md:items-center md:py-20">
          <TitreRevele texte={`${m.invites} invités ? *Viens goûter ce menu.*`} className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] font-normal leading-[0.98]" classeAccent={MOUTARDE} />
          <div className="md:justify-self-end"><Bouton href={`${DOSSIER}/degustation`}>Réserver ma dégustation</Bouton></div>
        </div>
      </section>

      <div className="pt-24 md:pt-32">
        <AppelFinal />
      </div>
    </main>
  );
}
