import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../../_kit/Apparition";
import Panier from "../../../_kit/Panier";
import TitreRevele from "../../../_kit/TitreRevele";
import { AppelFinal, Bouton, Surtitre } from "../../_composants/Blocs";
import { DessinProduit } from "../../_composants/Dessins";
import Ingredients from "../../_composants/Ingredients";
import Pot from "../../_composants/Pot";
import Recherche from "../../_composants/Recherche";
import Signature from "../../_composants/Signature";
import { AUTEURS, COMPOSITIONS, DEDICACE, DOSSIER, auteurDe, euros, photos, produit } from "../../_composants/donnees";

export function generateStaticParams() {
  return AUTEURS.map((a) => ({ auteur: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ auteur: string }> }): Promise<Metadata> {
  const a = auteurDe((await params).auteur);
  if (!a) return {};
  return {
    title: `${a.prenom}, ${a.metier} — Autographe, site de démonstration`,
    description: `${a.prenom}, ${a.metier} (personnage fictif), auteur${a.feminin ? "e" : ""} n° ${a.numero} de l'épicerie Autographe : ${a.resume}.`,
    ...adressesDeLaPage(`/exemples/autographe/auteurs/${a.slug}`),
  };
}

// Les coffrets où l'on retrouve un auteur.
const coffretsDe = (slug: string) =>
  Object.values(COMPOSITIONS).flatMap((parBudget) => Object.entries(parBudget))
    .filter(([, c]) => c.contenu.some((cle) => produit(cle).auteur.slug === slug))
    .map(([budget, c]) => ({ nom: c.nom, budget }));

// La page d'un auteur, celle de la vidéo : son prénom en grand, sa signature, ce qu'il
// fait, et ses pots — chacun avec ses ingrédients et ses allergènes, affichés avant de
// le mettre de côté.
export default async function PageAuteur({ params }: { params: Promise<{ auteur: string }> }) {
  const a = auteurDe((await params).auteur);
  if (!a) notFound();
  const dedicace = DEDICACE.programme.find((p) => p.slug === a.slug);
  const autres = AUTEURS.filter((x) => x.slug !== a.slug);
  const coffrets = coffretsDe(a.slug);
  const elle = a.feminin ? "elle" : "il";

  return (
    <main>
      <section className="kit-grain relative overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-28 sm:px-8 md:pt-36 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:pb-20">
          <div className="space-y-5">
            <p data-film="numero" className="text-sm font-semibold uppercase tracking-[0.22em] text-[#E8B4A8]">
              Auteur{a.feminin ? "e" : ""} n° {a.numero} · exemple
            </p>
            <TitreRevele as="h1" auChargement texte={a.prenom} className="text-[clamp(5.5rem,17vw,13rem)] font-semibold leading-[0.85] tracking-[-0.04em]" />
            <Signature variante={a.signature} couleur="#E8B4A8" animee className="h-14 w-72 sm:h-20 sm:w-[26rem]" />
            <p className="font-[family-name:var(--titres)] text-3xl italic">{a.metier}</p>
            <p data-film="resume" className="text-xl text-[var(--sur-sombre)]/90">{a.resume}</p>
          </div>
          <Apparition de="zoom" delai={300} className="hidden lg:block">
            <Pot auteur={a} oeuvre={a.oeuvres[0]} className="max-w-[17rem]" />
          </Apparition>
        </div>
      </section>

      <section id="oeuvre" data-film="oeuvre" className="scroll-mt-20 mx-auto max-w-7xl space-y-10 px-5 py-20 sm:px-8 md:py-28">
        <div className="space-y-5">
          <Apparition><Surtitre>Son œuvre</Surtitre></Apparition>
          <h2 className="text-[clamp(2.8rem,6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            Tout ce {a.feminin ? "qu'elle" : "qu'il"} <em className="font-normal text-[var(--accent-texte)]">fait.</em>
          </h2>
        </div>
        <ul className="grid gap-5 md:grid-cols-2">
          {a.oeuvres.map((o, i) => (
            <Apparition as="li" key={o.nom} delai={i * 90} className="grid grid-cols-[4.5rem_1fr] gap-5 border-2 border-[var(--encre)] bg-[var(--carte)] p-5 sm:grid-cols-[5.5rem_1fr]">
              <DessinProduit dessin={o.dessin} teinte={o.teinte} className="h-24 w-full" />
              <div className="space-y-2">
                <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-[family-name:var(--titres)] text-2xl font-semibold">{o.nom}</span>
                  <span className="font-semibold tabular-nums">{euros(o.prix)} TTC</span>
                </p>
                <p className="text-[15px] text-[var(--doux)]">{o.poids}{o.origine ? ` · origine : ${o.origine}` : ""} · prix d&apos;exemple</p>
                <p className="text-[15px] leading-relaxed text-[var(--doux)]">Ingrédients : <Ingredients texte={o.ingredients} /></p>
                <p className="text-[15px]"><span className="font-semibold">Allergènes :</span> {o.allergenes.length ? o.allergenes.join(" · ") : "aucun"}</p>
              </div>
            </Apparition>
          ))}
        </ul>
      </section>

      <section className="px-3 sm:px-5">
        <div className="mx-auto grid max-w-7xl gap-12 rounded-[2rem] bg-[#EFE4D2] px-5 py-16 sm:px-10 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <Surtitre>Retrait en boutique</Surtitre>
            <h2 className="text-[clamp(2.6rem,5vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">Mettre de <em className="font-normal text-[var(--accent-texte)]">côté.</em></h2>
            <p className="text-lg leading-relaxed">
              Tu choisis, on garde tes pots au comptoir, tu les retires quand tu passes et tu paies sur
              place. Les ingrédients et les allergènes sont juste au-dessus.
            </p>
            {coffrets.length > 0 && (
              <p className="text-lg leading-relaxed">
                On retrouve {a.prenom} dans {coffrets.length} coffret{coffrets.length > 1 ? "s" : ""} :{" "}
                {coffrets.map((c) => `${c.nom} (${c.budget} €)`).join(", ")}.{" "}
                <Link href={`${DOSSIER}/coffrets`} className="font-semibold underline underline-offset-4">Les coffrets</Link>
              </p>
            )}
          </div>
          <Panier
            produits={a.oeuvres.map((o) => ({ nom: o.nom, detail: o.poids, prix: o.prix }))}
            bouton="Mettre de côté"
            confirmation={`Tes pots t'attendent au comptoir, avec le nom ${/^[AEÉIOU]/.test(a.prenom) ? "d'" : "de "}${a.prenom} dessus.`}
            mention="Prix TTC d'exemple. Retrait et paiement en boutique."
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Apparition><Surtitre>Son travail</Surtitre></Apparition>
          <h2 className="text-[clamp(2.6rem,5vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">Comment {elle} <em className="font-normal text-[var(--accent-texte)]">travaille.</em></h2>
          {a.slug === "helene" && (
            <div className="relative aspect-[4/5] max-w-sm overflow-hidden">
              <Image src={photos.ruche.src} alt={photos.ruche.alt} fill sizes="(min-width: 1024px) 384px, 100vw" className="object-cover" />
            </div>
          )}
          {a.slug === "lina" && (
            <div className="relative aspect-[3/2] max-w-md overflow-hidden">
              <Image src={photos.huile.src} alt={photos.huile.alt} fill sizes="(min-width: 1024px) 448px, 100vw" className="object-cover" />
            </div>
          )}
        </div>
        <div className="space-y-6 text-xl leading-relaxed">
          {a.travail.map((t) => <Apparition as="p" key={t}>{t}</Apparition>)}
          <p className="text-[15px] text-[var(--doux)]">Portrait d&apos;exemple : {a.prenom} est un personnage fictif.</p>
          {dedicace && (
            <p className="border-l-4 border-[var(--accent)] pl-5 text-lg">
              <span className="font-semibold">{DEDICACE.date}, {dedicace.heure} :</span> {a.prenom} {dedicace.quoi} à la boutique.{" "}
              <Link href={`${DOSSIER}/dedicaces`} className="underline underline-offset-4">Le programme</Link>
            </p>
          )}
          {a.slug === "lina" && (
            <p className="border-l-4 border-[#6B7A3A] pl-5 text-lg">
              <span className="font-semibold">Un samedi par mois :</span> ses trois huiles se goûtent à l&apos;aveugle, vingt places.{" "}
              <Link href={`${DOSSIER}/degustations`} className="underline underline-offset-4">Choisir un samedi</Link>
            </p>
          )}
        </div>
      </section>

      <section className="border-t-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-16 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl font-semibold">Les autres auteurs</h2>
            <Bouton href={`${DOSSIER}/auteurs`} variante="contour">Tout le catalogue</Bouton>
          </div>
<div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                      <ul className="grid gap-px border-2 border-[var(--encre)] bg-[var(--encre)] sm:grid-cols-2 xl:grid-cols-3">
            {autres.map((x) => (
              <li key={x.slug} className="bg-[var(--fond)]">
                <Link href={`${DOSSIER}/auteurs/${x.slug}`} className="group flex h-full flex-col gap-2 p-5">
                  <span className="text-sm font-semibold text-[var(--doux)] [font-variant-numeric:lining-nums]">n° {x.numero}</span>
                  <span className="font-[family-name:var(--titres)] text-4xl font-semibold leading-none group-hover:italic">{x.prenom}</span>
                  <span className="text-[15px] text-[var(--doux)]">{x.metier}</span>
                </Link>
              </li>
            ))}
          </ul>
            <Recherche />
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
