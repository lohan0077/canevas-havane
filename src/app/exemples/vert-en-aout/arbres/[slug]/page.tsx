import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import { AppelFinal, EnTetePage, Surtitre } from "../../_composants/Blocs";
import { ReserverTaille } from "../../_composants/Interactifs";
import { ARBRES, DOSSIER, arbre as trouver } from "../../_composants/donnees";

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
    title: `${a.question.replace(/ /g, " ")} — Vert en Août (démonstration)`,
    description: `${a.question} La réponse d'un paysagiste imaginaire en trois lignes, et un bouton pour réserver la taille.`,
    ...adressesDeLaPage(`/exemples/vert-en-aout/arbres/${a.slug}`),
  };
}

export default async function PageArbre({ params }: Props) {
  const { slug } = await params;
  const a = trouver(slug);
  if (!a) notFound();
  const autres = ARBRES.filter((x) => x.slug !== a.slug);
  const [debut, fin] = [a.question.replace(/ \?$/, ""), " ?"];
  const mots = debut.split(" ");
  // Le nom de l'arbre en relief : « Quand tailler *un olivier* ? »
  const titre = `${mots.slice(0, 2).join(" ")} *${mots.slice(2).join(" ")}${fin}*`;

  return (
    <main>
      <EnTetePage surtitre={`Quand tailler · ${a.nom}`} titre={titre} photo={a.photo} note={a.saison}>
        <nav aria-label="Fil d'Ariane" className="text-[17px]">
          <Link href={`${DOSSIER}/arbres`} className="underline underline-offset-4">Quand tailler</Link> / {a.nom}
        </nav>
      </EnTetePage>

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 md:py-28">
        <Apparition><Surtitre>La réponse, en trois lignes</Surtitre></Apparition>
        <ol className="mt-8 space-y-4" data-film="reponse">
          {a.reponse.map((l, i) => (
            <Apparition as="li" key={i} delai={i * 140} className="flex gap-5 rounded-[1.75rem] border border-[var(--trait)] bg-[var(--carte)] p-6">
              <span className="font-[family-name:var(--titres)] text-5xl font-black leading-none text-[var(--accent-texte)]">{i + 1}</span>
              <span className="text-[19px] leading-snug">{l}</span>
            </Apparition>
          ))}
        </ol>
        <p className="mt-4 text-[15px] text-[var(--doux)]">La réponse de ton jardinier, pour un arbre de jardin, à hauteur d&apos;homme.</p>
        <div className="mt-12">
          <ReserverTaille arbre={a} />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <h2 className="text-3xl font-extrabold">Les autres pages</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {autres.map((x) => (
            <li key={x.slug}>
              <Link href={`${DOSSIER}/arbres/${x.slug}`} className="block rounded-[1.75rem] bg-[var(--sombre)] p-6 font-[family-name:var(--titres)] text-2xl font-extrabold text-[var(--sur-sombre)] transition-transform hover:scale-[1.01]">
                {x.question} <span aria-hidden="true" className="text-[var(--accent)]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <AppelFinal />
    </main>
  );
}
