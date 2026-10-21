import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, EQUIPE, MONTURES, VISAGES, euros } from "../../_composants/donnees";
import Lunettes from "../../_composants/Lunettes";
import { FormeVisage, Surtitre } from "../../_composants/Blocs";

// Une page par vraie question : « quelle monture pour un visage rond » est ce que
// les gens tapent (suggestions Google relevées le 15/10/2026). Chaque page montre
// les montures de la boutique qui vont à cette forme, et pourquoi.
export const dynamicParams = false;
export function generateStaticParams() {
  return VISAGES.map((v) => ({ forme: v.slug }));
}

type Params = { params: Promise<{ forme: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { forme } = await params;
  const v = VISAGES.find((x) => x.slug === forme);
  if (!v) return {};
  return {
    title: `${v.titre} : quelle monture ? · Bonjour Monture — site de démonstration`,
    description: `${v.recherche} Les montures de la boutique qui vont à un visage ${v.nom}, et pourquoi. Site de démonstration.`,
    ...adressesDeLaPage(`/exemples/bonjour-monture/visages/${v.slug}`),
  };
}

// Des fonds doux derrière chaque dessin, comme un studio photo de boutique.
const FONDS = ["#EFE6DA", "#E3EBEC", "#F1E4DC", "#E8E6DF"];

export default async function PageVisage({ params }: Params) {
  const { forme } = await params;
  const v = VISAGES.find((x) => x.slug === forme);
  if (!v) notFound();
  const montures = MONTURES.filter((m) => m.visages.includes(v.slug)).slice(0, 8);

  return (
    <main>
      <header className="mx-auto max-w-6xl px-5 pt-12 sm:pt-20 pb-10" data-film="visage-entete">
        <div className="flex items-start gap-5">
          <FormeVisage forme={v.slug} className="mt-2 h-16 w-12 shrink-0" />
          <div className="space-y-5">
            <Surtitre>{v.titre}</Surtitre>
            <h1 className="text-[2.9rem] sm:text-7xl">
              Les montures qui <em className="text-[var(--accent-texte)]">lui vont.</em>
            </h1>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">{v.idee}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--doux)]">
          {montures.length} montures de la boutique, portées par l&apos;équipe, en photo. Ici, des
          dessins : Bonjour Monture est une entreprise fictive.
        </p>
      </header>

      <section aria-label={`Montures pour un visage ${v.nom}`} className="mx-auto max-w-6xl px-5" data-film="visage-montures">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {montures.map((m, i) => (
            <li key={m.id} className="space-y-3">
              <div className="relative grid aspect-[4/5] place-items-center rounded-[4px] px-4" style={{ background: FONDS[i % FONDS.length] }}>
                <Lunettes forme={m.forme} couleur={m.couleur} className="w-full max-w-[150px]" titre={`${m.nom}, ${m.matiere.toLowerCase()}`} />
                <span className="absolute left-2 top-2 rounded-full bg-[var(--carte)] px-2.5 py-1 text-[11px] font-bold">
                  Portée par {EQUIPE[i % EQUIPE.length].prenom}
                </span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl leading-tight">{m.nom}</h2>
                <p className="text-sm text-[var(--doux)]">{m.matiere}</p>
                <p className="mt-1 text-sm font-bold tabular-nums">{euros(m.prix)} TTC <span className="font-normal text-[var(--doux)]">· monture seule, prix exemple</span></p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24 space-y-10">
        <h2 className="text-4xl sm:text-5xl">Pourquoi <em className="text-[var(--accent-texte)]">celles-là.</em></h2>
        <ol className="grid gap-8 md:grid-cols-3">
          {v.conseils.map((c, i) => (
            <li key={c.titre} className="space-y-2 border-t-2 border-[var(--encre)] pt-5">
              <p className="text-xs font-bold tabular-nums text-[var(--accent-texte)]">0{i + 1}</p>
              <h3 className="text-2xl">{c.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{c.texte}</p>
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={`${DOSSIER}/essayage`} className="inline-flex min-h-13 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-[var(--sur-accent)]">
            Les essayer en boutique
          </Link>
        </div>
      </section>

      <nav aria-label="Les autres formes de visage" className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl px-5 py-12 space-y-5">
          <Surtitre>Les autres pages</Surtitre>
          <ul className="grid gap-3 sm:grid-cols-3">
            {VISAGES.filter((x) => x.slug !== v.slug).map((x) => (
              <li key={x.slug}>
                <Link href={`${DOSSIER}/visages/${x.slug}`} className="flex items-center gap-4 rounded-xl border border-[var(--trait)] px-4 py-4 hover:border-[var(--accent)]">
                  <FormeVisage forme={x.slug} className="h-10 w-8 shrink-0" />
                  <span className="font-[family-name:var(--titres)] text-2xl">{x.titre}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </main>
  );
}
