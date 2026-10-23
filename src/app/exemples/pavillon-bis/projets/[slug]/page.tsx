import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import TitreRevele from "../../../_kit/TitreRevele";
import { AppelFinal, Arcs, Surtitre } from "../../_composants/Blocs";
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
      <section data-film="projet" className="kit-grain relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="relative mx-auto max-w-7xl space-y-8 px-5 pb-16 pt-32 sm:px-8 md:pb-20 md:pt-40">
          <div className="grid gap-x-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="space-y-8">
              <Apparition as="p" className="text-[15px]">
                <Link href={`${DOSSIER}#maisons`} className="font-semibold underline underline-offset-4">Les maisons</Link>
                <span> / {p.nom}, {p.annee}</span>
              </Apparition>
              <TitreRevele
                as="h1"
                auChargement
                texte={p.titre}
                className="max-w-4xl font-[family-name:var(--titres)] text-[clamp(3rem,6.8vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.04em]"
              />
            </div>
            <Apparition de="rideau" delai={300} className="hidden lg:block">
              <Arcs className="block w-[340px]" />
            </Apparition>
          </div>
          <dl data-film="faits" className="grid overflow-hidden rounded-[2rem] bg-[var(--fond)] text-[var(--encre)] sm:grid-cols-3">
            {FAITS.map((f, i) => (
              <Apparition key={f.libelle} delai={300 + i * 120} className={`space-y-1 px-6 py-5 ${i ? "border-t border-[var(--trait)] sm:border-l sm:border-t-0" : ""}`}>
                <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">{f.libelle}</dt>
                <dd className="font-[family-name:var(--titres)] text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-tight">{f.valeur}</dd>
                <dd className="text-[14px] text-[var(--doux)]">{f.note}</dd>
              </Apparition>
            ))}
          </dl>
          <Apparition delai={500} className="grid gap-4 sm:grid-cols-2">
            {[false, true].map((apres) => (
              <figure key={String(apres)} className="overflow-hidden rounded-[2rem] bg-[var(--fond)] text-[var(--encre)]">
                <div className={apres ? "bg-[#F6E2B8]" : "bg-[#E8DCC6]"}>
                  <Maison modele={p.modele} apres={apres} decor className="block h-auto w-full" libelle={apres ? `Après : ${p.apres}` : `Avant, ${p.annee} : ${p.avant}`} />
                </div>
                <figcaption className="space-y-0.5 px-5 py-4">
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">{apres ? `Après · ${total} m²` : `Avant · ${p.annee} · ${p.existant} m²`}</span>
                  <span className="block text-[16px] font-medium leading-snug">{apres ? p.apres : p.avant}</span>
                </figcaption>
              </figure>
            ))}
          </Apparition>
        </div>
      </section>

      {/* ---------- Le projet ---------- */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre className="text-[var(--doux)]">Le projet</Surtitre></Apparition>
          <TitreRevele
            texte="Ce qui a été fait, *et pourquoi.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5.4vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
            classeAccent="italic font-normal text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="text-xl leading-relaxed text-[var(--doux)]">{p.resume}</Apparition>
          <ul className="space-y-3">
            {p.detail.map((d, i) => (
              <Apparition as="li" key={d} delai={200 + i * 100} className="flex items-baseline gap-4 border-b border-[var(--trait)] pb-3 text-lg">
                <span className="font-[family-name:var(--titres)] italic text-[var(--accent-texte)]">{i + 1}</span>
                {d}
              </Apparition>
            ))}
          </ul>
          <p className="rounded-2xl bg-[var(--carte)] px-5 py-4 text-[15px] text-[var(--doux)]">
            {p.existant}&nbsp;m² + {p.cree}&nbsp;m² créés : {total}&nbsp;m² au total · seuil de {SEUIL}&nbsp;m² {total > SEUIL ? "dépassé" : "non dépassé"}.
          </p>
        </div>
        <Apparition de="rideau" className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem]">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
          <p className="absolute bottom-4 left-4 rounded-full bg-[var(--sombre)] px-3 py-1 text-[13px] font-semibold text-[var(--sur-sombre)]">Photo d&apos;illustration</p>
        </Apparition>
      </section>

      {/* ---------- Le calendrier et le budget ---------- */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-2">
            <div className="space-y-8">
              <Surtitre>Le calendrier</Surtitre>
              <TitreRevele
                texte={`${p.duree}, *étape par étape.*`}
                className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
                classeAccent="italic font-normal text-[var(--accent)]"
              />
              <ol className="border-l-2 border-[var(--accent)] pl-7">
                {p.etapes.map((e, i) => (
                  <Apparition as="li" key={e.quoi} delai={i * 120} className="relative pb-7 last:pb-0">
                    <span aria-hidden="true" className="absolute -left-[38px] top-1 h-5 w-5 rounded-full border-4 border-[var(--sombre)] bg-[var(--accent)]" />
                    <p className="text-xl font-semibold">{e.quoi}</p>
                    <p>{e.quand}</p>
                  </Apparition>
                ))}
              </ol>
            </div>
            <div className="space-y-8">
              <Surtitre>Le budget</Surtitre>
              <TitreRevele
                texte={`${p.budget}, *poste par poste.*`}
                className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
                classeAccent="italic font-normal text-[var(--accent)]"
              />
              <ul className="divide-y divide-white/20 border-y border-white/20">
                {p.postes.map((x, i) => (
                  <Apparition as="li" key={x.poste} delai={i * 100} className="flex items-baseline justify-between gap-4 py-4 text-lg">
                    <span>{x.poste}</span>
                    <span className="shrink-0 font-semibold tabular-nums">{x.montant}</span>
                  </Apparition>
                ))}
                <li className="flex items-baseline justify-between gap-4 py-4 font-[family-name:var(--titres)] text-2xl font-semibold">
                  <span>Total des travaux, TTC</span>
                  <span className="tabular-nums text-[var(--accent)]">{p.budget}</span>
                </li>
              </ul>
              <p className="text-[15px] leading-relaxed">
                Montants TTC d&apos;exemple. Honoraires de l&apos;architecte en plus : {p.honoraires}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Les autres maisons ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-28">
        <div className="mb-10 space-y-5">
          <Surtitre className="text-[var(--doux)]">Les autres maisons</Surtitre>
          <TitreRevele
            texte={"La tienne ressemble *à laquelle\u202f?*"}
            className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
            classeAccent="italic font-normal text-[var(--accent-texte)]"
          />
        </div>
        <ul className="grid gap-5 md:grid-cols-2">
          {PROJETS.filter((x) => x.slug !== p.slug).map((x, i) => (
            <Apparition as="li" key={x.slug} de="zoom" delai={i * 120}>
              <Link href={`${DOSSIER}/projets/${x.slug}`} className="group grid h-full gap-5 rounded-[2.5rem] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
                <span className="block overflow-hidden rounded-[1.6rem] bg-[#E8DCC6]">
                  <Maison modele={x.modele} apres decor className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]" />
                </span>
                <span className="space-y-2">
                  <span className="block text-[14px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">{x.nom} · {x.annee}</span>
                  <span className="block font-[family-name:var(--titres)] text-[1.7rem] font-semibold leading-[1.02]">{x.titre}</span>
                  <span className="block text-[15px] text-[var(--doux)]">{x.budget} · {x.duree}</span>
                </span>
              </Link>
            </Apparition>
          ))}
        </ul>
      </section>

      <AppelFinal />
    </main>
  );
}
