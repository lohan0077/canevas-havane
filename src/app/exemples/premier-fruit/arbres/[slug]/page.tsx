import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import { ARBRES, DOSSIER, PHOTOS, arbre as trouver, euros, recolteDe, type Arbre } from "../../_composants/donnees";
import { Fruit } from "../../_composants/Dessins";
import Commande from "../../_composants/Commande";
import Passeport from "../../_composants/Passeport";

// La fiche d'un arbre, telle que la vidéo la décrit : l'été de la première récolte,
// le passeport phytosanitaire montré en photo, et la commande directement sur le site.

export const dynamicParams = false;

export function generateStaticParams() {
  return ARBRES.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const NOMS: Record<Arbre["fruit"], string> = {
  cerise: "Ta première cerise",
  pomme: "Ta première pomme",
  figue: "Ta première figue",
  abricot: "Ton premier abricot",
  poire: "Ta première poire",
  prune: "Ta première prune",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = trouver(slug);
  if (!a) return {};
  return {
    title: "Premier Fruit — site de démonstration",
    description: `${a.espece} ${a.variete} : première récolte estimée ${recolteDe(a, "demi-tige").toLowerCase()}, passeport phytosanitaire en photo. Fiche d'une pépinière imaginaire.`,
    ...adressesDeLaPage(`/exemples/premier-fruit/arbres/${a.slug}`),
  };
}

export default async function FicheArbre({ params }: Props) {
  const { slug } = await params;
  const a = trouver(slug);
  if (!a) notFound();
  const autres = ARBRES.filter((x) => x.slug !== a.slug);
  const [premier, ...suite] = NOMS[a.fruit].split(" ");
  const dernier = suite.pop();

  return (
    <main>
      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <nav aria-label="Fil d'Ariane" className="text-sm text-[var(--doux)]">
          <Link href={`${DOSSIER}/arbres`} className="underline underline-offset-4">Nos arbres</Link>
          <span aria-hidden="true"> / </span>
          <span>{a.espece} {a.variete}</span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-6 lg:order-2">
          <div className="space-y-3">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">
              {a.espece} · {a.variete}
            </p>
            <h1 className="font-normal text-[52px] sm:text-7xl">
              {premier} {suite.join(" ")} <span className="italic">{dernier}.</span>
            </h1>
            <p className="inline-block rounded-full bg-[var(--sombre)] px-4 py-2 text-[15px] font-semibold text-[var(--sur-sombre)]">
              Récolte estimée : {recolteDe(a, "demi-tige").toLowerCase()} · exemple
            </p>
          </div>
          <Commande
            nom={`${a.espece} ${a.variete}`}
            prixParForme={a.prix}
            livre={a.livre}
            recolte={{ "demi-tige": recolteDe(a, "demi-tige").toLowerCase(), scion: recolteDe(a, "scion").toLowerCase() }}
          />
        </div>
        <div className="space-y-5 lg:order-1">
          {a.fruit === "cerise" ? (
            <div className="overflow-hidden rounded-[28px]">
              <Image src={PHOTOS.cueillette.src} alt={PHOTOS.cueillette.alt} width={PHOTOS.cueillette.largeur} height={PHOTOS.cueillette.hauteur} sizes="(min-width: 1024px) 540px, 92vw" className="h-auto max-h-[620px] w-full object-cover" priority />
            </div>
          ) : (
            <div className="grid aspect-[4/5] max-h-[620px] w-full place-items-center rounded-[28px] bg-[#F1E6D6]">
              <Fruit fruit={a.fruit} className="h-2/3 w-2/3" />
            </div>
          )}
          <p className="font-[family-name:var(--titres)] text-[26px] leading-snug">{a.phrase}</p>
        </div>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <dl className="mx-auto grid max-w-6xl gap-px px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {[
            ["Nom botanique", a.latin],
            ["Cueillette", a.cueillette],
            ["Pollinisation", a.pollinisation],
            ["Livré", "Le 24 novembre, avec son passeport phytosanitaire"],
          ].map(([t, d]) => (
            <div key={t} className="space-y-1.5 border-b border-[var(--trait)] py-6 last:border-0 sm:border-0 sm:pr-6">
              <dt className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">{t}</dt>
              <dd className={`text-lg leading-snug ${t === "Nom botanique" ? "italic" : ""}`}>{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="passeport" className="scroll-mt-20 bg-[#E8D6BA]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#7E1621]">Son passeport</p>
            <h2 className="font-normal text-[40px] sm:text-5xl">L&apos;étiquette qui part avec lui.</h2>
            <p className="text-lg leading-relaxed">
              Expédié, ton {a.espece.toLowerCase()} voyage avec son passeport phytosanitaire, attaché à l&apos;arbre.
              C&apos;est obligatoire pour toute plante vendue à distance. Voici la photo de celui de ce lot.
            </p>
            <p className="text-[15px] text-[#4F3B2F]">Règl. (UE) 2016/2031, art. 79, 81 et 83 · valeurs d&apos;exemple</p>
          </div>
          <Passeport latin={a.latin} lot={a.lot} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-5 py-14 sm:px-8">
        <h2 className="font-normal text-[36px] sm:text-5xl">Le planter, le 25 novembre.</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["La veille", "Laisse tremper les racines dans un seau d'eau une heure ou deux."],
            ["Le trou", "Large et profond comme une bêche et demie. Ameublis le fond."],
            ["La greffe", "Le bourrelet de la greffe reste au-dessus du sol, jamais enterré."],
            ["Le tuteur", "Planté avant l'arbre, côté vent dominant. Puis un arrosoir, même s'il pleut."],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-6 space-y-2">
              <p className="font-[family-name:var(--titres)] text-3xl text-[var(--accent-texte)] tabular-nums">0{i + 1}</p>
              <h3 className="font-normal text-2xl">{t}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{d}</p>
            </li>
          ))}
        </ol>
        <Link href={`${DOSSIER}/sainte-catherine`} className="inline-block font-semibold underline underline-offset-4">Le rendez-vous de la Sainte-Catherine</Link>
      </section>

      <section className="border-t border-[var(--trait)] bg-[#F1E6D6]">
        <div className="mx-auto max-w-6xl space-y-6 px-5 py-14 sm:px-8">
          <h2 className="font-normal text-[32px] sm:text-4xl">Les autres arbres</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {autres.map((x) => (
              <li key={x.slug}>
                <Link href={`${DOSSIER}/arbres/${x.slug}`} className="flex h-full flex-col rounded-[20px] border border-[var(--trait)] bg-[var(--carte)] p-4">
                  <Fruit fruit={x.fruit} className="h-14 w-14" />
                  <span className="mt-2 font-semibold">{x.espece} {x.variete}</span>
                  <span className="text-[14px] text-[var(--doux)]">{recolteDe(x, "demi-tige")} · dès {euros(x.prix.scion)} TTC</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--doux)]">Prix TTC et années de récolte d&apos;exemple.</p>
        </div>
      </section>
    </main>
  );
}
