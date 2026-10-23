import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import { AppelFinal, EnTetePage } from "../../_composants/Blocs";
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
      <EnTetePage surtitre={<>Geste n° {g.numero} · <Link href={`${DOSSIER}#gestes`} className="underline underline-offset-4">tous les gestes</Link></>} titre={g.question} photo={photos[g.photo]}>
        <p>Ce que Google suggère : « {g.recherche} »</p>
      </EnTetePage>

      <div className="mx-auto max-w-6xl space-y-6 px-6 py-20 md:py-28">
        {BLOCS.map((b, i) => (
          <Apparition
            as="section"
            key={b.id}
            id={b.id}
            data-film={`bloc-${b.id}`}
            className={`grid scroll-mt-28 gap-6 rounded-2xl p-7 sm:p-12 lg:grid-cols-[0.8fr_1.2fr] ${
              i === 2 ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border border-[var(--trait)] bg-[var(--carte)]"
            }`}
          >
            <div className="space-y-3">
              <p className={`text-[12px] font-medium uppercase tracking-[0.2em] ${i === 2 ? "text-[#F0A07A]" : "text-[var(--doux)]"}`}>{String(i + 1).padStart(2, "0")}</p>
              <h2 className="text-[clamp(2rem,3.4vw,2.75rem)] font-normal leading-[1.05] tracking-[-0.02em] text-balance">{b.titre}</h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed">
              {g[b.cle].map((t) => <p key={t}>{t}</p>)}
            </div>
          </Apparition>
        ))}
        <p className="pt-2 text-[15px] text-[var(--doux)]">
          Texte d&apos;exemple, écrit pour cette démonstration : sur un vrai site, chaque page est
          écrite par l&apos;ostéopathe. Elle décrit un geste ; elle ne dit pas s&apos;il vous
          convient — ça, on en parle au cabinet.
        </p>
      </div>

      <section className="mx-auto max-w-6xl space-y-6 px-6 pb-28">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">Les autres gestes</p>
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {autres.map((a) => (
            <li key={a.slug}>
              <Link href={`${DOSSIER}/gestes/${a.slug}`} className="group flex items-center justify-between gap-4 py-5">
                <span className="font-[family-name:var(--titres)] text-[clamp(1.35rem,2.4vw,1.9rem)]">{a.question}</span>
                <span aria-hidden="true" className="text-[var(--accent-texte)] transition-transform group-hover:translate-x-1">→</span>
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
