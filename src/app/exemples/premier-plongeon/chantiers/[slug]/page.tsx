import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import CoupeDuChantier from "../../../_composants/CoupeDuChantier";
import { DOSSIER, chantiers, gammes, photosDeChantier } from "../../_composants/donnees";
import { Intitule, PhotoPlaque, Plaque, styles as s } from "../../_composants/Habillage";
import { AppelFinal, CarteChantier, HautDePage, Section } from "../../_composants/Blocs";

// « Chaque chantier devient une page » : la page d'un chantier, telle que la vidéo la
// décrit. Elle répond à ce que les gens tapent (« piscine coque 8x4 prix ») avec la
// taille, la durée, le prix et le déroulé jour par jour.

export const dynamicParams = false;

export function generateStaticParams() {
  return chantiers.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = chantiers.find((x) => x.slug === slug);
  if (!c) return {};
  const titre = c.titre.replace(/ /g, " ");
  return {
    title: `${titre} — Premier Plongeon (démonstration)`,
    description: `Page de chantier d'un pisciniste imaginaire : une ${titre.toLowerCase()} à ${c.lieu}, ${c.duree} de travaux racontées jour par jour.`,
    ...adressesDeLaPage(`/exemples/premier-plongeon/chantiers/${c.slug}`),
  };
}

export default async function PageChantier({ params }: Props) {
  const { slug } = await params;
  const chantier = chantiers.find((c) => c.slug === slug);
  if (!chantier) notFound();
  const gamme = gammes.find((g) => g.id === chantier.gamme);
  const autres = chantiers.filter((c) => c.slug !== chantier.slug);

  return (
    <>
      <HautDePage />
      <main>
        <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-14 space-y-12">
          <PhotoPlaque photo={chantier.photo} ratio="21 / 9" sizes="(min-width: 1152px) 1104px, 100vw" coupe={28} priority />
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-8">
              <Intitule
                niveau={1}
                libelle={`Chantier n° ${chantier.numero} · ${chantier.lieu}`}
                titre={<>Piscine coque <span className="text-[#e8d1cb] whitespace-nowrap">{chantier.titre.replace("Piscine coque ", "")}</span></>}
              >
                {chantier.resume}
              </Intitule>
              <ul className="flex flex-wrap gap-3">
                {chantier.caracteristiques.map((x) => (
                  <li key={x}>
                    <Plaque coupe={10}>
                      <span className={`${s.technique} block px-4 py-2.5 text-[11px] text-[#e6eaf5]`}>{x}</span>
                    </Plaque>
                  </li>
                ))}
              </ul>
            </div>
            <Plaque coupe={20}>
              <dl className="p-6 sm:p-8 space-y-5">
                <div>
                  <dt className={`${s.technique} text-[11px] text-[#8f98a8]`}>Prix payé</dt>
                  <dd className={`${s.titre} pt-1 text-3xl text-[#7edbee]`}>{chantier.prix}</dd>
                </div>
                <div>
                  <dt className={`${s.technique} text-[11px] text-[#8f98a8]`}>Durée des travaux</dt>
                  <dd className="pt-1 text-lg font-bold text-white">{chantier.duree}</dd>
                </div>
                {gamme && (
                  <div>
                    <dt className={`${s.technique} text-[11px] text-[#8f98a8]`}>Gamme</dt>
                    <dd className="pt-1">
                      <Link href={`${DOSSIER}/piscines#${gamme.id}`} className={`${s.lien} text-lg font-bold`}>
                        {gamme.nom} · {gamme.coque}{" "}m
                      </Link>
                    </dd>
                  </div>
                )}
                <p className="text-sm text-[#8f98a8]">Exemple : l&apos;entreprise est fictive.</p>
              </dl>
            </Plaque>
          </div>
        </section>

        <Section className="space-y-12">
          <Intitule libelle="Jour par jour" titre={<>Le chantier, <span className="text-[#e8d1cb]">étape par étape.</span></>} />
          <ol className="space-y-6">
            {chantier.jours.map((j, i) => (
              <li key={j.jour}>
                <Plaque coupe={24}>
                  <div className="grid md:grid-cols-[1.1fr_1fr]">
                    <div className={`${s.quadrillage} px-5 py-6 sm:px-8 flex items-center`}>
                      <CoupeDuChantier etape={j.etape} palette="nuit" fond="#070b13" libelle={`Coupe du chantier : ${j.titre.toLowerCase()}`} />
                    </div>
                    <div className="p-6 sm:p-8 space-y-3 flex flex-col justify-center">
                      <p className="flex items-center justify-between gap-4">
                        <span className={`${s.technique} text-xs text-[#e8d1cb]`}>{j.jour}</span>
                        <span className={`${s.technique} text-[11px] text-[#8f98a8]`}>Étape {i + 1} / {chantier.jours.length}</span>
                      </p>
                      <h3 className={`${s.titre} text-2xl sm:text-3xl`}>{j.titre}</h3>
                      <p className="text-[#b9c0cc] leading-relaxed">{j.texte}</p>
                    </div>
                  </div>
                </Plaque>
              </li>
            ))}
          </ol>
        </Section>

        <Section sombre className="space-y-12">
          <Intitule libelle="En images" titre={<>Sur le terrain, <span className="text-[#e8d1cb]">chaque soir.</span></>}>
            Sur un vrai chantier, une photo et trois lignes s&apos;ajoutent ici chaque soir.
            Photos d&apos;illustration : l&apos;entreprise est fictive.
          </Intitule>
          <ul className="grid gap-6 md:grid-cols-3">
            {photosDeChantier.map((p) => (
              <li key={p.src}>
                <PhotoPlaque photo={p} ratio="4 / 5" sizes="(min-width: 768px) 360px, 100vw" coupe={22} />
              </li>
            ))}
          </ul>
        </Section>

        <Section className="space-y-12">
          <Intitule libelle="Autres chantiers" titre={<>D&apos;autres jardins, <span className="text-[#e8d1cb]">d&apos;autres tailles.</span></>} />
          <ul className="grid gap-10 md:grid-cols-2">
            {autres.map((c) => (
              <li key={c.slug}>
                <CarteChantier chantier={c} />
              </li>
            ))}
          </ul>
        </Section>

        <AppelFinal />
      </main>
    </>
  );
}
