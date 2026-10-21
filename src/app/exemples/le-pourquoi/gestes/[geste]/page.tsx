import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import { AppelFinal, Arche, Surtitre } from "../../_composants/Blocs";
import { DOSSIER, cabinet, gestes, photos } from "../../_composants/donnees";

// Une page par geste : ce que je fais, pourquoi, et ce que ça ne promet pas. Les
// textes décrivent une pratique ; ils ne disent ni quand consulter, ni ce que le geste
// guérirait.
export function generateStaticParams() {
  return gestes.map((g) => ({ geste: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ geste: string }> }): Promise<Metadata> {
  const { geste } = await params;
  const g = gestes.find((x) => x.slug === geste);
  if (!g) return {};
  return {
    title: `${g.question} — Le Pourquoi, site de démonstration`,
    description: `Une page du site de démonstration d'un cabinet d'ostéopathie imaginaire : ${g.question.toLowerCase()} Ce que je fais, pourquoi, et ce que ça ne promet pas.`,
    ...adressesDeLaPage(`/exemples/le-pourquoi/gestes/${g.slug}`),
  };
}

const BLOCS = [
  { id: "fais", titre: "Ce que je fais", cle: "fais" },
  { id: "pourquoi", titre: "Pourquoi", cle: "pourquoi" },
  { id: "promet", titre: "Ce que ça ne promet pas", cle: "promet" },
] as const;

export default async function PageGeste({ params }: { params: Promise<{ geste: string }> }) {
  const { geste } = await params;
  const g = gestes.find((x) => x.slug === geste);
  if (!g) notFound();
  const autres = gestes.filter((x) => x.slug !== g.slug);

  return (
    <main>
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-8 sm:pt-14 pb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-6">
          <p className="font-[family-name:var(--titres)] text-sm">
            <Link href={`${DOSSIER}#gestes`} className="underline underline-offset-4">Les gestes</Link>
            <span className="text-[var(--doux)]"> · geste n° {g.numero}</span>
          </p>
          <h1 className="text-[50px] sm:text-7xl font-semibold tracking-[-0.045em]">{g.question}</h1>
          <p className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 py-2 text-[15px] text-[var(--doux)]">
            <span className="font-[family-name:var(--titres)] font-semibold text-[var(--encre)]">Ce que Google suggère :</span>
            « {g.recherche} »
          </p>
        </div>
        <Arche photo={photos[g.photo]} priority sizes="(min-width: 1024px) 420px, 100vw" className="aspect-[4/3] lg:aspect-[3/4] max-h-[460px]" />
      </section>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 pb-8 space-y-4">
        {BLOCS.map((b, i) => (
          <section
            key={b.id}
            id={b.id}
            data-film={`bloc-${b.id}`}
            className={`scroll-mt-24 rounded-[30px] p-6 sm:p-10 grid gap-5 lg:grid-cols-[0.6fr_1.4fr] ${
              i === 2 ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--carte)] border border-[var(--trait)]"
            }`}
          >
            <div className="space-y-3">
              <p className={`font-[family-name:var(--titres)] text-sm font-semibold ${i === 2 ? "text-[#F0A07A]" : "text-[var(--accent-texte)]"}`}>{String(i + 1).padStart(2, "0")}</p>
              <h2 className="text-[34px] sm:text-5xl font-semibold tracking-[-0.035em]">{b.titre}</h2>
            </div>
            <div className={`space-y-4 text-[19px] leading-relaxed ${i === 2 ? "text-[#D8E2DB]" : ""}`}>
              {g[b.cle].map((t) => <p key={t}>{t}</p>)}
            </div>
          </section>
        ))}
        <p className="pt-2 text-sm text-[var(--doux)]">
          Texte d&apos;exemple, écrit pour cette démonstration : sur un vrai site, chaque page est
          écrite par l&apos;ostéopathe. Elle décrit un geste ; elle ne dit pas s&apos;il vous
          convient — ça, on en parle au cabinet.
        </p>
      </div>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-16 space-y-6">
        <Surtitre>Les autres gestes</Surtitre>
        <ul className="grid gap-3 sm:grid-cols-2">
          {autres.map((a) => (
            <li key={a.slug}>
              <Link href={`${DOSSIER}/gestes/${a.slug}`} className="flex items-center justify-between gap-4 rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] px-6 py-5">
                <span className="font-[family-name:var(--titres)] text-xl font-medium">{a.question}</span>
                <span aria-hidden="true" className="text-xl text-[var(--accent-texte)]">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-[var(--doux)]">{cabinet.praticienne}, ostéopathe D.O. — {cabinet.diplome}.</p>
      </section>

      <AppelFinal />
    </main>
  );
}
