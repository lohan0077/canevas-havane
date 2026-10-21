import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adressesDeLaPage } from "@/lib/seo";
import Panier from "../../../_kit/Panier";
import Ingredients from "../../_composants/Ingredients";
import { PotMini } from "../../_composants/Pot";
import Recherche from "../../_composants/Recherche";
import Signature from "../../_composants/Signature";
import { AUTEURS, DEDICACE, DOSSIER, auteurDe, euros, photos } from "../../_composants/donnees";

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

// La page d'un auteur, celle de la vidéo (« autographe-epicerie.fr/auteurs/helene ») :
// son prénom en grand, sa signature, ce qu'il fait, et ses pots — chacun avec ses
// ingrédients et ses allergènes, affichés avant de le mettre de côté.
export default async function PageAuteur({ params }: { params: Promise<{ auteur: string }> }) {
  const a = auteurDe((await params).auteur);
  if (!a) notFound();
  const dedicace = DEDICACE.programme.find((p) => p.slug === a.slug);
  const autres = AUTEURS.filter((x) => x.slug !== a.slug);

  // `scroll-mt-16` : arrivé depuis la recherche, Next amène la page sous la barre
  // collante sans cacher la ligne « Auteure n° 12 · exemple ».
  return (
    <div className="scroll-mt-16">
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-10 sm:pt-16 md:grid-cols-[1.3fr_0.7fr] md:items-end">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8B4A8]">Auteur{a.feminin ? "e" : ""} n° {a.numero} · exemple</p>
            <h1 className="text-[5.2rem] font-semibold leading-[0.9] sm:text-9xl">{a.prenom}</h1>
            <Signature variante={a.signature} couleur="#E8B4A8" animee className="h-14 w-72 sm:h-20 sm:w-[26rem]" />
            <p className="font-[family-name:var(--titres)] text-3xl italic">{a.metier}</p>
            <p data-film="resume" className="text-lg text-[#C9CFDD]">{a.resume}</p>
          </div>
          <dl className="grid grid-cols-2 gap-px self-end bg-[#F6EFE3]/25">
            <div className="bg-[var(--sombre)] py-3 pr-3">
              <dt className="text-sm text-[#C9CFDD]">Où</dt>
              <dd className="text-lg">{a.lieu.replace(/^(en|dans le|dans la|à) /, "")}</dd>
            </div>
            <div className="bg-[var(--sombre)] py-3 pl-3">
              <dt className="text-sm text-[#C9CFDD]">Combien</dt>
              <dd className="text-lg">{a.chiffre}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="oeuvre" data-film="oeuvre" className="scroll-mt-16 mx-auto max-w-6xl space-y-10 px-5 py-16 sm:py-24">
        <h2 className="text-5xl font-semibold">Tout ce {a.feminin ? "qu'elle" : "qu'il"} <em className="font-normal">fait.</em></h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {a.oeuvres.map((o) => (
            <li key={o.nom} className="grid grid-cols-[5.5rem_1fr] gap-5 border-t-2 border-[var(--encre)] pt-5">
              <PotMini auteur={a} oeuvre={o} />
              <div className="space-y-2">
                <p className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-[family-name:var(--titres)] text-2xl font-semibold">{o.nom}</span>
                  <span className="tabular-nums">{euros(o.prix)} TTC</span>
                </p>
                <p className="text-[15px] text-[var(--doux)]">{o.poids}{o.origine ? ` · origine : ${o.origine}` : ""} · prix d&apos;exemple</p>
                <p className="text-[15px] leading-relaxed text-[var(--doux)]">Ingrédients : <Ingredients texte={o.ingredients} /></p>
                <p className="text-[15px]"><span className="font-semibold">Allergènes :</span> {o.allergenes.length ? o.allergenes.join(" · ") : "aucun"}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-5xl font-semibold">Mettre de côté</h2>
            <p className="text-lg leading-relaxed">
              Tu choisis, on garde tes pots au comptoir, tu les retires quand tu passes et
              tu paies sur place. Les ingrédients et les allergènes sont juste au-dessus.
            </p>
            {a.slug === "helene" && (
              <div className="relative aspect-[4/5] max-w-sm overflow-hidden">
                <Image src={photos.ruche.src} alt={photos.ruche.alt} fill sizes="(min-width: 768px) 384px, 100vw" className="object-cover" />
              </div>
            )}
          </div>
          <Panier
            produits={a.oeuvres.map((o) => ({ nom: o.nom, detail: o.poids, prix: o.prix }))}
            bouton="Mettre de côté"
            confirmation={`Tes pots t'attendent au comptoir, avec le nom d'${a.prenom} dessus.`}
            mention="Prix TTC d'exemple. Retrait et paiement en boutique."
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-5xl font-semibold">Comment {a.feminin ? "elle" : "il"} <em className="font-normal">travaille.</em></h2>
        <div className="space-y-5 text-lg leading-relaxed">
          {a.travail.map((t) => <p key={t}>{t}</p>)}
          <p className="text-[15px] text-[var(--doux)]">Portrait d&apos;exemple : {a.prenom} est un personnage fictif.</p>
          {dedicace && (
            <p className="border-l-4 border-[var(--accent)] pl-4">
              <span className="font-semibold">{DEDICACE.date}, {dedicace.heure} :</span> {a.prenom} {dedicace.quoi} à la boutique.{" "}
              <Link href={`${DOSSIER}/dedicaces`} className="underline underline-offset-4">Le programme</Link>
            </p>
          )}
        </div>
      </section>

      <section className="border-t-2 border-[var(--encre)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-2">
          <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Les autres auteurs</h2>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {autres.map((x) => (
              <li key={x.slug}>
                <Link href={`${DOSSIER}/auteurs/${x.slug}`} className="font-[family-name:var(--titres)] text-2xl underline-offset-4 hover:underline">
                  {x.prenom} <span className="font-[family-name:var(--texte)] text-base text-[var(--doux)]">· {x.metier}</span>
                </Link>
              </li>
            ))}
          </ul>
          </div>
          <Recherche />
        </div>
      </section>
    </div>
  );
}
