import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import { CarteProjet, Intitule, Section, Volumes } from "../../_composants/Blocs";
import { DOSSIER, PROJETS, SEUIL, photos } from "../../_composants/donnees";

// Une page par projet : « Extension de quarante mètres carrés, maison de 1974, avec le
// budget » — exactement ce que les gens tapent (« architecte extension maison prix »).
// Projets fictifs, budgets d'exemple, TTC (arrêté du 3 décembre 1987, art. 1).
export function generateStaticParams() {
  return PROJETS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJETS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.titre} — Atelier Samedi, site de démonstration`,
    description: `${p.titre} : budget ${p.budget} (exemple), ${p.duree}, ${p.autorisation.toLowerCase()}. Projet fictif d'une agence d'architecture imaginaire.`,
    ...adressesDeLaPage(`/exemples/atelier-samedi/projets/${p.slug}`),
  };
}

export default async function Projet({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJETS.find((x) => x.slug === slug);
  if (!p) notFound();
  const total = p.existant + p.cree;
  const FAITS = [
    { libelle: "Budget des travaux", valeur: p.budget, note: "exemple" },
    { libelle: "Durée", valeur: p.duree, note: "de l'esquisse à la réception" },
    { libelle: "Autorisation", valeur: p.autorisation, note: p.architecteObligatoire ? "architecte obligatoire" : "architecte non obligatoire" },
  ];

  return (
    <main>
      <section data-film="projet" className="bg-[linear-gradient(var(--trait)_1px,transparent_1px),linear-gradient(90deg,var(--trait)_1px,transparent_1px)] bg-[size:28px_28px]">
        <div className="mx-auto max-w-6xl space-y-6 px-4 pb-12 pt-8 sm:px-6 sm:pt-14">
          <p className="text-[14px]">
            <Link href={`${DOSSIER}#projets`} className="font-semibold underline underline-offset-4">Projets</Link>
            <span className="text-[var(--doux)]"> / Projet n°&nbsp;{p.numero}</span>
          </p>
          <h1 className="max-w-3xl text-[42px] font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl">{p.titre}</h1>
          <div className="relative overflow-hidden rounded-[22px] border border-[var(--trait)] bg-[var(--carte)]">
            <div className="flex h-[190px] items-end justify-center px-5 pb-8" aria-hidden="true">
              <Volumes projet={p} echelle={1.6} />
            </div>
            <p className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[var(--fond)] px-3 py-1 text-[12px] font-semibold">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-[var(--encre)] bg-[var(--accent)]" />
              Existant · {p.existant}&nbsp;m², {p.annee}
            </p>
            {p.cree > 0 && (
              <p className="pointer-events-none absolute right-4 top-4 flex items-center gap-2 rounded-full bg-[var(--accent)] px-3 py-1 text-[12px] font-semibold text-[var(--sur-accent)]">
                Créé · {p.cree}&nbsp;m²
              </p>
            )}
            <p className="border-t border-[var(--trait)] px-5 py-3 text-[14px] text-[var(--doux)]">
              {total}&nbsp;m² au total · seuil de {SEUIL}&nbsp;m² {total > SEUIL ? "dépassé" : "non dépassé"}
            </p>
          </div>
          <dl data-film="faits" className="grid overflow-hidden rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] sm:grid-cols-3">
            {FAITS.map((f, i) => (
              <div key={f.libelle} className={`space-y-1 px-5 py-4 ${i ? "border-t border-[var(--trait)] sm:border-l sm:border-t-0" : ""}`}>
                <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">{f.libelle}</dt>
                <dd className="font-[family-name:var(--titres)] text-[26px] font-bold">{f.valeur}</dd>
                <dd className="text-[13px] text-[var(--doux)]">{f.note}</dd>
              </div>
            ))}
          </dl>
          <a href="#plans" className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--encre)] px-6 font-semibold text-[var(--fond)]">Voir les plans</a>
        </div>
      </section>

      <Section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Intitule surtitre="Le projet" titre="Ce qui a été fait, et pourquoi.">{p.resume}</Intitule>
        <div className="relative aspect-[3/4] max-h-[520px] overflow-hidden rounded-[22px]">
          <Image src={photos.lumiere.src} alt={photos.lumiere.alt} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
          <p className="absolute bottom-3 left-3 rounded-full bg-[var(--carte)] px-3 py-1 text-[12px] font-semibold">Photo d&apos;illustration</p>
        </div>
      </Section>

      <Section id="plans" sombre className="space-y-10">
        <Intitule surtitre="Les plans" titre="Avant, après." />
        <div className="grid gap-5 sm:grid-cols-2">
          {[{ titre: `Avant · ${p.existant} m²`, cree: false }, { titre: `Après · ${total} m²`, cree: true }].map((v) => (
            <figure key={v.titre} className="space-y-3 rounded-[22px] bg-[var(--carte)] p-5">
              <svg viewBox="0 0 300 180" role="img" aria-label={`Plan schématique, ${v.titre}`} className="block h-auto w-full">
                <rect x="20" y="30" width="150" height="120" fill="none" stroke="var(--encre)" strokeWidth="3" />
                <path d="M95 30V150M20 90H95" stroke="var(--encre)" strokeWidth="1.5" />
                <text x="57" y="64" fill="var(--doux)" fontSize="11" textAnchor="middle">Chambre</text>
                <text x="57" y="124" fill="var(--doux)" fontSize="11" textAnchor="middle">Cuisine</text>
                <text x="132" y="94" fill="var(--doux)" fontSize="11" textAnchor="middle">Séjour</text>
                {v.cree && p.slug.startsWith("extension") && (
                  <g>
                    <rect x="170" y="50" width={Math.min(110, p.cree * 2.2)} height="100" fill="rgba(228,242,91,0.25)" stroke="var(--accent)" strokeWidth="3" />
                    <text x={170 + Math.min(110, p.cree * 2.2) / 2} y="96" fill="var(--encre)" fontSize="11" textAnchor="middle">Extension</text>
                    <text x={170 + Math.min(110, p.cree * 2.2) / 2} y="112" fill="var(--encre)" fontSize="11" textAnchor="middle">{p.cree} m²</text>
                  </g>
                )}
                {v.cree && p.slug.startsWith("garage") && (
                  <g>
                    <rect x="170" y="70" width="80" height="80" fill="rgba(228,242,91,0.25)" stroke="var(--accent)" strokeWidth="3" />
                    <text x="210" y="106" fill="var(--encre)" fontSize="11" textAnchor="middle">Séjour</text>
                    <text x="210" y="122" fill="var(--encre)" fontSize="11" textAnchor="middle">{p.cree} m²</text>
                  </g>
                )}
                {!v.cree && p.slug.startsWith("garage") && (
                  <g>
                    <rect x="170" y="70" width="80" height="80" fill="none" stroke="var(--encre)" strokeWidth="2" strokeDasharray="5 4" />
                    <text x="210" y="114" fill="var(--doux)" fontSize="11" textAnchor="middle">Garage</text>
                  </g>
                )}
                {v.cree && p.slug.startsWith("surelevation") && (
                  <g>
                    <rect x="30" y="20" width="130" height="100" fill="rgba(228,242,91,0.25)" stroke="var(--accent)" strokeWidth="3" strokeDasharray="8 5" />
                    <text x="95" y="170" fill="var(--encre)" fontSize="11" textAnchor="middle">+ un étage · {p.cree} m²</text>
                  </g>
                )}
              </svg>
              <figcaption className="font-semibold">{v.titre}</figcaption>
            </figure>
          ))}
        </div>
        <p className="text-[14px] text-[var(--doux)]">Plans schématiques d&apos;exemple : le projet est fictif.</p>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-8">
          <Intitule surtitre="Le calendrier" titre={`${p.duree}, étape par étape.`} />
          <ol className="space-y-0 border-l-2 border-[var(--accent-texte)] pl-6">
            {p.etapes.map((e) => (
              <li key={e.quoi} className="relative pb-6 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[33px] top-1 h-4 w-4 rounded-full border-2 border-[var(--encre)] bg-[var(--accent)]" />
                <p className="text-[18px] font-semibold">{e.quoi}</p>
                <p className="text-[var(--doux)]">{e.quand}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-8">
          <Intitule surtitre="Le budget" titre={`${p.budget}, poste par poste.`} />
          <ul className="overflow-hidden rounded-[20px] border border-[var(--trait)] bg-[var(--carte)]">
            {p.postes.map((x) => (
              <li key={x.poste} className="flex items-baseline justify-between gap-4 border-b border-[var(--trait)] px-5 py-3.5">
                <span>{x.poste}</span>
                <span className="shrink-0 font-semibold tabular-nums">{x.montant}</span>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-4 bg-[var(--fond)] px-5 py-3.5 font-bold">
              <span>Total des travaux, TTC</span>
              <span className="tabular-nums">{p.budget}</span>
            </li>
          </ul>
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">
            Montants TTC d&apos;exemple. Honoraires de l&apos;architecte en plus : {p.honoraires}
          </p>
        </div>
      </Section>

      <Section sombre className="space-y-8">
        <Intitule surtitre="Ton projet" titre="Le tien ressemble à celui-là ?">
          Trente minutes un samedi matin, pour savoir s&apos;il tient.
          <p className="mt-6">
            <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex min-h-[54px] items-center rounded-full bg-[var(--accent)] px-7 font-semibold text-[var(--sur-accent)]">
              Réserver mes 30 minutes
            </Link>
          </p>
        </Intitule>
        <ul className="grid gap-5 md:grid-cols-2">
          {PROJETS.filter((x) => x.slug !== p.slug).map((x) => (
            <li key={x.slug} className="text-[var(--encre)] [--encre:#16202C] [--doux:#47546A] [--carte:#FFFFFF] [--fond:#ECEFF3] [--trait:#C7D0DC] [--accent-texte:#2A4B8D]">
              <CarteProjet projet={x} />
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
