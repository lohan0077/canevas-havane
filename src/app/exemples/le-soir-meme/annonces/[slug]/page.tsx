import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import { Depenses, Echelle, PrixAnnonce } from "../../_composants/Blocs";
import { ANNONCES, DOSSIER, euros, prixHonorairesInclus } from "../../_composants/donnees";

// Une annonce telle que l'arrêté du 10/01/2017 la veut (art. 3) : prix honoraires inclus
// en caractères plus grands que le prix hors honoraires, qui paie, les honoraires en %
// TTC précédés de « Honoraires : », et le barème à un clic (art. 2, IV). Plus les classes
// énergie et climat en couleur, et les dépenses estimées (CCH L126-33). Aucune adresse :
// ni rue ni numéro, seulement un secteur.
export function generateStaticParams() {
  return ANNONCES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = ANNONCES.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: `${a.titre} · ${a.surface} m² — Le Soir Même, site de démonstration`,
    description: `${a.titre} de ${a.surface} m², ${euros(prixHonorairesInclus(a))} honoraires inclus (exemple). Annonce fictive d'une agence immobilière imaginaire.`,
    ...adressesDeLaPage(`/exemples/le-soir-meme/annonces/${a.slug}`),
  };
}

export default async function Annonce({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = ANNONCES.find((x) => x.slug === slug);
  if (!a) notFound();
  const autres = ANNONCES.filter((x) => x.slug !== a.slug);

  return (
    <>
      <div className="-mt-[72px] bg-[var(--sombre)] pt-[72px]" />
      <article className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <p className="text-[14px]">
          <Link href={`${DOSSIER}#annonces`} className="underline underline-offset-4">Les maisons</Link>
          <span className="text-[var(--doux)]"> / {a.titre}</span>
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[4/3]">
              <Image src={a.photo.src} alt={a.photo.alt} fill priority sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-[var(--sombre)] px-3 py-1 text-[12px] font-semibold text-[var(--sur-sombre)]">Annonce : exemple</span>
            </div>
          </div>

          <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <header className="space-y-3" data-film="annonce">
              <h1 className="text-[52px] leading-[0.98] sm:text-[64px]">
                {a.titre} · {a.surface}&nbsp;m²
              </h1>
              <p className="text-[17px] text-[var(--doux)]">{a.secteur} · {a.terrain}</p>
            </header>

            <div className="space-y-4 rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-6" data-film="prix">
              <PrixAnnonce annonce={a} grand />
              <Link
                href={`${DOSSIER}#bareme`}
                data-film="lien-bareme"
                className="flex h-14 items-center justify-between rounded-full bg-[var(--sombre)] px-6 text-[16px] font-semibold text-[var(--sur-sombre)]"
              >
                Voir notre barème d&apos;honoraires
                <span aria-hidden="true">→</span>
              </Link>
              <p className="text-[13px] text-[var(--doux)]">Arrêté du 10 janvier 2017, art. 2 et 3 : le barème à un clic, le prix honoraires inclus en plus gros.</p>
            </div>

            <div className="space-y-5 rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-6" data-film="energie">
              <div className="grid gap-6 sm:grid-cols-2">
                <Echelle genre="energie" classe={a.energie} />
                <Echelle genre="climat" classe={a.climat} />
              </div>
              <Depenses annonce={a} />
              <p className="text-[13px] text-[var(--doux)]">Classes et montants : exemple. Diagnostic de performance énergétique réalisé par un diagnostiqueur certifié, disponible sur demande.</p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <h2 className="text-[40px] leading-none">{a.accroche}</h2>
            {a.description.map((d) => (
              <p key={d.slice(0, 20)} className="text-[18px] leading-relaxed text-[var(--doux)]">{d}</p>
            ))}
            <ul className="flex flex-wrap gap-2 pt-2">
              {a.points.map((p) => (
                <li key={p} className="rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 py-2 text-[15px]">{p}</li>
              ))}
            </ul>
            {a.galerie.map((p) => (
              <div key={p.src} className="relative aspect-[3/2] overflow-hidden rounded-[28px] mt-4">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
          <aside className="space-y-5 rounded-[24px] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)]">
            <p className="font-[family-name:var(--titres)] text-[32px] leading-tight">Visiter cette maison</p>
            <p className="text-[16px] leading-relaxed">
              Après la visite, le vendeur reçoit un compte rendu anonyme, le soir même : ce qui vous
              a plu, ce qui vous freine. Votre nom n&apos;y figure jamais.
            </p>
            <Link href={`${DOSSIER}/estimation`} className="flex min-h-14 items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-center text-[16px] font-semibold text-[var(--sur-accent)]">
              Vendre aussi ? Faire estimer ma maison
            </Link>
          </aside>
        </div>

        <section className="mt-20 space-y-6">
          <h2 className="text-[36px] leading-none">Les autres maisons</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {autres.map((x) => (
              <li key={x.slug}>
                <Link href={`${DOSSIER}/annonces/${x.slug}`} className="flex items-center gap-4 rounded-[20px] border border-[var(--trait)] bg-[var(--carte)] p-3">
                  <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-[14px]">
                    <Image src={x.photo.src} alt="" fill sizes="96px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-[24px] leading-none">{x.titre} · {x.surface} m²</span>
                    <span className="mt-1 block text-[15px] text-[var(--doux)]">{x.secteur}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}
