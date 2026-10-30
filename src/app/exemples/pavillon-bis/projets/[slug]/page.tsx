import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import TitreRevele from "../../../_kit/TitreRevele";
import { AppelFinal, Surtitre, Titre } from "../../_composants/Blocs";
import Maison from "../../_composants/Maison";
import { DOSSIER, PROJETS, SEUIL, photos } from "../../_composants/donnees";

// Une page par projet : « Extension de quarante mètres carrés, maison de 1974, avec le
// budget » — exactement ce que les gens tapent (« architecte extension maison prix »).
// Un projet par maison des années 70 (plain-pied, sur sous-sol, à étage) : ce qu'on a
// fait de la même que la tienne. Projets fictifs, budgets TTC d'exemple (arrêté du
// 3 décembre 1987, art. 1), rémunération dite avant tout engagement (art. 46).
export function generateStaticParams() {
  return PROJETS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJETS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.titre} — Pavillon Bis, site de démonstration`,
    description: `${p.titre} : ${p.apres.toLowerCase()}. Budget ${p.budget} (exemple), ${p.duree}, ${p.autorisation.toLowerCase()}. Projet fictif d'une agence d'architecture imaginaire.`,
    ...adressesDeLaPage(`/exemples/pavillon-bis/projets/${p.slug}`),
  };
}

const PHOTO = { "extension-1974": photos.lumiere, "sous-sol-1976": photos.sousSol, "facade-1978": photos.jardin } as Record<string, { src: string; alt: string }>;

export default async function Projet({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJETS.find((x) => x.slug === slug);
  if (!p) notFound();
  const total = p.existant + p.cree;
  const FAITS = [
    { libelle: "Budget des travaux", valeur: p.budget, note: "exemple, honoraires en plus" },
    { libelle: "Durée", valeur: p.duree, note: "de l'esquisse à la réception" },
    { libelle: "Autorisation", valeur: p.autorisation, note: p.architecteObligatoire ? "architecte obligatoire" : "architecte non obligatoire" },
  ];
  const photo = PHOTO[p.slug];

  return (
    <main>
      {/* ---------- Le haut : le titre tel qu'on le tape, et la fiche ---------- */}
      <section data-film="projet" className="relative isolate flex min-h-[64svh] flex-col bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-8 px-6 pb-14 pt-32 md:pb-20 md:pt-40">
          <Apparition as="p" className="text-[15px]">
            <Link href={`${DOSSIER}#maisons`} className="underline underline-offset-4">Les maisons</Link>
            <span> / {p.nom}, {p.annee}</span>
          </Apparition>
          <TitreRevele
            as="h1"
            auChargement
            texte={p.titre}
            className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(2.75rem,6vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.045em] text-balance"
          />
          <dl data-film="faits" className="grid overflow-hidden rounded-2xl bg-[var(--fond)] text-[var(--encre)] sm:grid-cols-3">
            {FAITS.map((f, i) => (
              <Apparition key={f.libelle} delai={300 + i * 120} className={`space-y-1 px-6 py-5 ${i ? "border-t border-[var(--trait)] sm:border-l sm:border-t-0" : ""}`}>
                <dt className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{f.libelle}</dt>
                <dd className="font-[family-name:var(--titres)] text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight">{f.valeur}</dd>
                <dd className="text-[14px] text-[var(--doux)]">{f.note}</dd>
              </Apparition>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Avant, après ---------- */}
      <section>
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
            <div className="space-y-5">
              <Apparition><Surtitre>01 — Avant, après</Surtitre></Apparition>
              <Titre texte="La même maison, *deuxième version.*" />
            </div>
            <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">{p.resume}</Apparition>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {[false, true].map((apres) => (
              <Apparition as="figure" key={String(apres)} delai={apres ? 150 : 0} className="space-y-3">
                <div className={`overflow-hidden rounded-2xl ${apres ? "bg-[#F7E3DD]" : "bg-[#DEDBD3]"}`}>
                  <Maison modele={p.modele} apres={apres} decor className="block h-auto w-full" libelle={apres ? `Après : ${p.apres}` : `Avant, ${p.annee} : ${p.avant}`} />
                </div>
                <figcaption className="space-y-0.5">
                  <span className="block text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{apres ? `Après · ${total} m²` : `Avant · ${p.annee} · ${p.existant} m²`}</span>
                  <span className="block text-[16px] leading-snug">{apres ? p.apres : p.avant}</span>
                </figcaption>
              </Apparition>
            ))}
          </div>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {p.detail.map((d) => (
              <li key={d} className="py-4 text-lg">{d}</li>
            ))}
            <li className="py-4 text-[15px] text-[var(--doux)]">
              {p.existant}&nbsp;m² + {p.cree}&nbsp;m² créés : {total}&nbsp;m² au total · seuil de {SEUIL}&nbsp;m² {total > SEUIL ? "dépassé" : "non dépassé"}.
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- Le calendrier et le budget ---------- */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:py-40 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-5">
              <Surtitre clair>02 — Le calendrier</Surtitre>
              <Titre texte={`${p.duree}, *étape par étape.*`} clair taille="moyen" />
            </div>
            <ol className="divide-y divide-white/20 border-y border-white/20">
              {p.etapes.map((e) => (
                <li key={e.quoi} className="flex items-baseline justify-between gap-4 py-4 text-lg">
                  <span>{e.quoi}</span>
                  <span className="shrink-0 text-[15px]">{e.quand}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-8">
            <div className="space-y-5">
              <Surtitre clair>03 — Le budget</Surtitre>
              <Titre texte={`${p.budget}, *poste par poste.*`} clair taille="moyen" />
            </div>
            <ul className="divide-y divide-white/20 border-y border-white/20">
              {p.postes.map((x) => (
                <li key={x.poste} className="flex items-baseline justify-between gap-4 py-4 text-lg">
                  <span>{x.poste}</span>
                  <span className="shrink-0 tabular-nums">{x.montant}</span>
                </li>
              ))}
              <li className="flex items-baseline justify-between gap-4 py-4 font-[family-name:var(--titres)] text-2xl">
                <span>Total des travaux, TTC</span>
                <span className="tabular-nums text-[var(--accent-clair)]">{p.budget}</span>
              </li>
            </ul>
            <p className="text-[15px] leading-relaxed">Montants TTC d&apos;exemple. Honoraires de l&apos;architecte en plus : {p.honoraires}</p>
          </div>
        </div>
      </section>

      {/* ---------- La lumière, et les autres maisons ---------- */}
      <section>
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:py-40 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Apparition className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
          </Apparition>
          <div className="space-y-8">
            <div className="space-y-5">
              <Apparition><Surtitre>04 — Les autres maisons</Surtitre></Apparition>
              <Titre texte={"La tienne ressemble *à laquelle ?*"} taille="moyen" />
            </div>
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {PROJETS.filter((x) => x.slug !== p.slug).map((x) => (
                <li key={x.slug}>
                  <Link href={`${DOSSIER}/projets/${x.slug}`} className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-5 py-5">
                    <span className="block overflow-hidden rounded-xl bg-[#DEDBD3]">
                      <Maison modele={x.modele} apres className="block h-auto w-full" />
                    </span>
                    <span>
                      <span className="block font-[family-name:var(--titres)] text-[1.4rem] leading-tight">{x.titre}</span>
                      <span className="block text-[15px] text-[var(--doux)]">{x.budget} · {x.duree}</span>
                    </span>
                    <span aria-hidden="true" className="text-[var(--accent-texte)] transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-[14px] text-[var(--doux)]">Photo d&apos;illustration, dessins et budgets d&apos;exemple : le projet est fictif.</p>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
