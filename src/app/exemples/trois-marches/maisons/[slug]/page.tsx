import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import { Depenses, Echelle, Marches, PrixMaison } from "../../_composants/Blocs";
import { DOSSIER, MAISONS, euros, prixHonorairesInclus, photos } from "../../_composants/donnees";

// Une annonce de Trois Marches : elle commence par l'histoire de la maison, racontée par
// ceux qui y ont vécu (des souvenirs, jamais l'état du bien). Juste en dessous, ce que
// la loi impose : prix honoraires inclus en plus gros, prix hors honoraires, honoraires
// en % TTC et qui paie (arrêté du 10/01/2017, art. 3), le barème à un clic (art. 2, IV),
// les classes énergie et climat et les dépenses estimées (CCH L126-33). L'adresse de la
// page ne nomme pas la rue : à côté d'un prénom, elle localiserait un logement.
export function generateStaticParams() {
  return MAISONS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = MAISONS.find((x) => x.slug === slug);
  if (!m) return {};
  return {
    title: `${m.titre} · ${m.surface} m² — Trois Marches, site de démonstration`,
    description: `« ${m.histoire.citation} » ${m.titre} de ${m.surface} m², ${euros(prixHonorairesInclus(m))} honoraires inclus (exemple). Annonce fictive d'une agence imaginaire.`,
    ...adressesDeLaPage(`/exemples/trois-marches/maisons/${m.slug}`),
  };
}

export default async function PageMaison({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = MAISONS.find((x) => x.slug === slug);
  if (!m) notFound();
  const autres = MAISONS.filter((x) => x.slug !== m.slug);

  return (
    <article className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
      <p className="text-[13px]">
        <Link href={`${DOSSIER}#maisons`} className="underline underline-offset-4">Les maisons</Link>
        <span className="text-[var(--doux)]"> / {m.titre}</span>
      </p>
      <h1 className="mt-4 text-[13px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-texte)] [font-family:var(--texte)]!">
        {m.titre} · {m.surface}&nbsp;m² · {m.terrain}
      </h1>

      <div className="mt-5 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={m.photo.src} alt={m.photo.alt} fill priority sizes="(min-width: 1024px) 620px, 100vw" className="object-cover" />
            <span className="absolute left-3 top-3 bg-[var(--carte)] px-2.5 py-1 text-[12px] font-semibold">Annonce : exemple</span>
          </div>

          <section aria-label="L'histoire de la maison" data-film="histoire" className="space-y-4">
            <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-texte)]">
              <Marches className="h-3.5 w-8 text-[var(--accent)]" />
              L&apos;histoire de la maison
            </p>
            <blockquote>
              <p className="font-[family-name:var(--titres)] text-[40px] italic leading-[1.08] sm:text-[52px]">«&nbsp;{m.histoire.citation}&nbsp;»</p>
              <footer data-film="auteur" className="mt-4 text-[16px] text-[var(--doux)]">
                {m.histoire.auteur} · {m.histoire.annees} · exemple
              </footer>
            </blockquote>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start" data-film="regle">
          <div className="space-y-5 border border-[var(--trait)] bg-[var(--carte)] p-6">
            <PrixMaison maison={m} grand />
            <Link
              href={`${DOSSIER}/bareme`}
              data-film="lien-bareme"
              className="flex h-14 items-center justify-between bg-[var(--encre)] px-5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--fond)]"
            >
              Voir notre barème d&apos;honoraires
              <span aria-hidden="true">→</span>
            </Link>
            <div className="grid grid-cols-2 gap-5 border-t border-[var(--trait)] pt-5" data-film="energie">
              <Echelle genre="energie" classe={m.energie} />
              <Echelle genre="climat" classe={m.climat} />
            </div>
            <Depenses maison={m} />
            <p className="text-[12px] text-[var(--doux)]">Prix, classes et montants : exemple. Arrêté du 10 janvier 2017, art. 2 et 3 ; CCH, art. L126-33.</p>
          </div>
          <p className="text-[14px] text-[var(--doux)]">{m.secteur}. L&apos;adresse est donnée à ceux qui visitent.</p>
        </aside>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <h2 className="text-[34px] font-normal">Ce qu&apos;ils en racontent</h2>
          <ul className="space-y-5">
            {m.histoire.souvenirs.map((s) => (
              <li key={s.slice(0, 24)} className="border-l-2 border-[var(--accent)] pl-5 font-[family-name:var(--f-caveat)] text-[28px] leading-[1.2]">
                {s}
              </li>
            ))}
          </ul>
          <p className="text-[14px] text-[var(--doux)]">Souvenirs d&apos;exemple. Sur un vrai site : les mots du vendeur, relus et signés par lui, avec son prénom seulement.</p>
        </section>
        <section className="space-y-4">
          <h2 className="text-[34px] font-normal">La maison</h2>
          {m.description.map((d) => (
            <p key={d.slice(0, 20)} className="text-[17px] leading-relaxed text-[var(--doux)]">{d}</p>
          ))}
        </section>
      </div>

      <section className="mt-16 grid items-center gap-8 bg-[#E9EFE6] p-6 sm:grid-cols-[180px_1fr] sm:p-8">
        <div className="relative mx-auto aspect-[3/4] w-[160px] rotate-[-3deg] bg-[var(--carte)] p-2 pb-8 shadow-lg">
          <div className="relative h-full w-full">
            <Image src={photos.perron.src} alt="" fill sizes="160px" className="object-cover" />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-[30px] font-normal leading-tight">Et le jour du départ, la dernière photo, sur le perron.</h2>
          <p className="text-[16px] text-[var(--doux)]">Offerte à ceux qui vendent, tirée sur papier, jamais publiée.</p>
          <Link href={`${DOSSIER}/la-derniere-photo`} className="inline-block text-[13px] font-semibold uppercase tracking-[0.18em] underline decoration-[var(--accent)] underline-offset-8">
            La dernière photo
          </Link>
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <h2 className="text-[30px] font-normal">Les autres maisons</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {autres.map((x) => (
            <li key={x.slug}>
              <Link href={`${DOSSIER}/maisons/${x.slug}`} className="flex items-center gap-4 border border-[var(--trait)] bg-[var(--carte)] p-3">
                <span className="relative h-20 w-24 shrink-0 overflow-hidden">
                  <Image src={x.photo.src} alt="" fill sizes="96px" className="object-cover" />
                </span>
                <span className="font-[family-name:var(--titres)] text-[19px] italic leading-snug">«&nbsp;{x.histoire.citation}&nbsp;»</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
