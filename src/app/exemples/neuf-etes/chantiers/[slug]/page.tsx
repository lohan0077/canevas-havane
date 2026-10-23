import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import { AppelFinal, CarteChantier, EnTetePage, Surtitre, Titre } from "../../_composants/Blocs";
import { DOSSIER, chantiers, gammes, photosDeChantier } from "../../_composants/donnees";
import FilmChantier from "../../_composants/FilmChantier";
import VideoChantier from "../../_composants/VideoChantier";

// « Chaque chantier devient une page » : la page d'un chantier, telle que la vidéo
// « Remplir l'agenda » la décrit — elle répond à ce que les gens tapent (« piscine
// coque 8x4 prix ») avec la taille, la durée, le prix — et, comme le dit la vidéo de
// la marque, le chantier filmé jour après jour jusqu'au premier plongeon.

export const dynamicParams = false;

export function generateStaticParams() {
  return chantiers.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = chantiers.find((x) => x.slug === slug);
  if (!c) return {};
  const titre = c.titre.replace(/ /g, " ");
  return {
    title: `${titre} — Neuf Étés (démonstration)`,
    description: `Page de chantier d'une marque de piscines imaginaire : une ${titre.toLowerCase()} à ${c.lieu}, ${c.duree} de travaux filmées jour par jour.`,
    ...adressesDeLaPage(`/exemples/neuf-etes/chantiers/${c.slug}`),
  };
}

export default async function PageChantier({ params }: Props) {
  const { slug } = await params;
  const chantier = chantiers.find((c) => c.slug === slug);
  if (!chantier) notFound();
  const gamme = gammes.find((g) => g.id === chantier.gamme);
  const autres = chantiers.filter((c) => c.slug !== chantier.slug);
  const dimensions = chantier.titre.replace("Piscine coque ", "");

  return (
    <main>
      <EnTetePage
        surtitre={`Chantier n° ${chantier.numero} · ${chantier.lieu}`}
        titre={`Piscine coque *${dimensions.replace(/ /g, " ")}*`}
        photo={chantier.photo}
      >
        {chantier.resume}
      </EnTetePage>

      {/* La fiche : ce que les gens cherchent, en gros. */}
      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 md:pt-20">
        <Apparition>
          <dl data-film="fiche" className="grid gap-4 md:grid-cols-[1.3fr_1fr_1fr]">
            <div className="rounded-[2rem] bg-[var(--accent)] p-7 text-[var(--sur-accent)] sm:p-9">
              <dt className="font-[family-name:var(--titres)] text-sm font-normal uppercase tracking-[0.14em]">Prix payé</dt>
              <dd className="mt-2 font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,4.5rem)] font-normal leading-none tracking-[-0.03em] tabular-nums">{chantier.prix}</dd>
              <dd className="mt-3 text-[15px]">Exemple : l&apos;entreprise est fictive.</dd>
            </div>
            <div className="rounded-[2rem] bg-[var(--sombre)] p-7 text-[var(--sur-sombre)] sm:p-9">
              <dt className="font-[family-name:var(--titres)] text-sm font-normal uppercase tracking-[0.14em] text-[var(--accent)]">Durée des travaux</dt>
              <dd className="mt-2 font-[family-name:var(--titres)] text-[clamp(2.4rem,5vw,3.75rem)] font-normal leading-none tracking-[-0.03em]">{chantier.duree}</dd>
            </div>
            <div className="rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7 sm:p-9">
              <dt className="font-[family-name:var(--titres)] text-sm font-normal uppercase tracking-[0.14em] text-[var(--doux)]">Coque</dt>
              <dd className="mt-2 font-[family-name:var(--titres)] text-[clamp(2.4rem,5vw,3.75rem)] font-normal leading-none tracking-[-0.03em]">{dimensions}{" "}m</dd>
              {gamme && (
                <dd className="mt-3">
                  <Link href={`${DOSSIER}/piscines#${gamme.id}`} className="font-bold text-[var(--accent-texte)] underline underline-offset-4">
                    Gamme {gamme.nom}
                  </Link>
                </dd>
              )}
            </div>
          </dl>
        </Apparition>
        <ul className="mt-5 flex flex-wrap gap-2">
          {chantier.caracteristiques.map((x) => (
            <li key={x} className="rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 py-2 text-[15px] font-bold">{x}</li>
          ))}
        </ul>
      </section>

      {/* Le film du chantier. */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="space-y-6">
          <Apparition><Surtitre>Le film du chantier</Surtitre></Apparition>
          <Titre texte="Filmé jour après jour, *avec l'accord de la famille.*" taille="moyen" />
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            Du premier coup de pelle au premier plongeon. La famille choisit ce qui est publié :
            le jardin et le bassin, jamais elle-même sans son accord écrit.
          </Apparition>
          <p className="text-[15px] text-[var(--doux)]">
            Images d&apos;illustration (Pexels) : l&apos;entreprise est fictive. Sur un vrai site, le
            film de ce chantier.
          </p>
        </div>
        <Apparition de="zoom">
          <VideoChantier src={`${DOSSIER}/chantier.mp4`} poster={`${DOSSIER}/chantier.webp`} libelle="Un chantier de piscine vu du ciel : la pelle creuse le jardin" />
        </Apparition>
      </section>

      {/* Jour par jour. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)] py-24 md:py-32">
        <div className="mx-auto max-w-7xl space-y-12 px-5 sm:px-8">
          <div className="space-y-6">
            <Apparition><Surtitre>Jour par jour</Surtitre></Apparition>
            <Titre texte={`${chantier.duree}, *${chantier.jours.length} étapes.*`} />
          </div>
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {chantier.jours.map((j, i) => (
              <Apparition as="li" key={j.jour} delai={(i % 3) * 120} className="overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--fond)]">
                <div className="relative aspect-[16/10]">
                  <FilmChantier jour={j} rang={i + 1} total={chantier.jours.length} />
                </div>
                <div className="space-y-2 p-6">
                  <h3 className="text-2xl font-bold">{j.titre}</h3>
                  <p className="leading-relaxed text-[var(--doux)]">{j.texte}</p>
                </div>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-5 py-24 sm:px-8 md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>En images</Surtitre></Apparition>
          <Titre texte="Sur le terrain, *chaque soir.*" taille="moyen" />
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--doux)]">
            Sur un vrai chantier, une image et trois lignes s&apos;ajoutent ici chaque soir.
            Photos d&apos;illustration : l&apos;entreprise est fictive.
          </p>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {photosDeChantier.map((p, i) => (
            <Apparition as="li" key={p.src} delai={i * 120} className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </Apparition>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-5 pb-24 sm:px-8 md:pb-32">
        <Titre texte="D'autres jardins, *d'autres tailles.*" taille="moyen" />
        <ul className="grid gap-5 md:grid-cols-2">
          {autres.map((c) => (
            <li key={c.slug}>
              <CarteChantier chantier={c} />
            </li>
          ))}
        </ul>
      </section>

      <AppelFinal />
    </main>
  );
}
