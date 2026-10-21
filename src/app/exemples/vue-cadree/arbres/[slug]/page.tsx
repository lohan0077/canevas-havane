import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import { ARBRES, DOSSIER, PHOTOS, arbre as trouver } from "../../_composants/donnees";
import { Note, Surtitre } from "../../_composants/Elements";
import { ReserverTaille } from "../../_composants/Interactifs";

// « Une page par arbre » : la question qu'on tape sur Google, la réponse du jardinier
// en trois lignes, et en bas, un bouton pour réserver la taille.

export const dynamicParams = false;

export function generateStaticParams() {
  return ARBRES.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = trouver(slug);
  if (!a) return {};
  return {
    title: "Vue Cadrée — site de démonstration",
    description: `${a.question} La réponse d'un paysagiste imaginaire en trois lignes, et un bouton pour réserver la taille.`,
    ...adressesDeLaPage(`/exemples/vue-cadree/arbres/${a.slug}`),
  };
}

export default async function PageArbre({ params }: Props) {
  const { slug } = await params;
  const a = trouver(slug);
  if (!a) notFound();
  const autres = ARBRES.filter((x) => x.slug !== a.slug);
  return (
    <main>
      <section className="mx-auto max-w-3xl px-5 pb-6 pt-8 sm:px-8">
        <nav aria-label="Fil d'Ariane" className="text-[14px] text-[var(--doux)]">
          <Link href={`${DOSSIER}/arbres`} className="underline underline-offset-4">Quand tailler</Link> / {a.nom}
        </nav>
        <div className="mt-5 flex items-end justify-between gap-3">
          <Surtitre>{a.nom}</Surtitre>
          <Note>{a.saison}</Note>
        </div>
        <h1 className="mt-3 text-[46px] font-bold leading-[1] sm:text-7xl">{a.question}</h1>
      </section>
      <section className="mx-auto max-w-3xl px-5 sm:px-8">
        <ol className="space-y-3" data-film="reponse">
          {a.reponse.map((l, i) => (
            <li key={i} className="flex gap-4 rounded-[18px] bg-[var(--carte)] p-4 text-[18px] leading-snug">
              <span className="font-[family-name:var(--titres)] text-[28px] font-bold leading-none text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}</span>
              <span>{l}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[14px] text-[var(--doux)]">La réponse de ton jardinier, pour un arbre de jardin, à hauteur d&apos;homme.</p>
        {a.photo === "olivier" && (
          <div className="mt-8 overflow-hidden rounded-[6px] border-[10px] border-[#FBFAF5]">
            <Image src={PHOTOS.olivier.src} alt={PHOTOS.olivier.alt} width={PHOTOS.olivier.largeur} height={PHOTOS.olivier.hauteur} sizes="(min-width: 768px) 700px, 92vw" className="h-auto w-full" />
          </div>
        )}
        <div className="mt-8">
          <ReserverTaille arbre={a} />
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <h2 className="text-[30px] font-bold">Les autres pages</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {autres.map((x) => (
            <li key={x.slug}>
              <Link href={`${DOSSIER}/arbres/${x.slug}`} className="block rounded-[18px] border border-[var(--trait)] bg-[var(--carte)] p-5 font-[family-name:var(--titres)] text-[22px] font-bold">{x.question}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
