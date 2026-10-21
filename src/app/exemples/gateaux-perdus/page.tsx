import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ETAPES, FICHES, QUESTIONS, QUESTIONS_APPEL, boutique } from "./_composants/donnees";
import EnvoyerRecette from "./_composants/EnvoyerRecette";
import Fiche from "./_composants/Fiche";
import { Faq, Surtitre } from "./_composants/Blocs";

// L'accueil : le titre de l'affiche, le gâteau sur la nappe et les questions du
// pâtissier autour ; puis le seul bouton du site, « envoyer la photo ». Ensuite la
// méthode, la vitrine des fiches, le prix, les allergènes, les questions.
export const metadata: Metadata = {
  title: "Gâteaux Perdus — site de démonstration",
  description: "Site de démonstration d'une pâtisserie imaginaire, réalisé par Canevas Havane : envoie-nous la photo de la recette de ta grand-mère, même tachée. On la refait.",
  ...adressesDeLaPage("/exemples/gateaux-perdus"),
};

const NOTES = [
  { n: "01", texte: "Beurre doux ou salé ?" },
  { n: "02", texte: "Moule en fer ou en verre ?" },
  { n: "03", texte: "Et il la refait." },
  { n: "04", texte: "« C'est elle. »" },
];

export default function GateauxPerdus() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 text-center sm:px-6 sm:pt-16">
        <Surtitre centre>Gâteaux Perdus · pâtisserie</Surtitre>
        <h1 className="mx-auto mt-5 max-w-4xl text-[46px] leading-[1] text-[var(--accent)] sm:text-[84px]">
          Le gâteau de ta grand-mère. <span className="italic text-[var(--accent-texte)]">Encore une fois.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed">
          On ne vend pas nos recettes. On refait la sienne — celle qu&apos;elle n&apos;a jamais écrite en entier.
        </p>
        <div className="relative mt-10 grid items-center gap-6 md:grid-cols-[1fr_1.6fr_1fr]">
          <ul className="order-2 grid grid-cols-2 gap-4 text-left md:order-1 md:grid-cols-1 md:gap-16 md:text-right">
            {NOTES.slice(0, 2).map((x) => (
              <li key={x.n} className="space-y-1">
                <p className="font-[family-name:var(--titres)] text-3xl text-[var(--accent-texte)]">{x.n}</p>
                <p className="text-sm leading-snug">{x.texte}</p>
              </li>
            ))}
          </ul>
          <div className="relative order-1 mx-auto aspect-[3/2] w-full overflow-hidden rounded-t-[999px] md:order-2">
            <Image src="/exemples/gateaux-perdus/gateau-sur-la-dentelle.webp" alt="Un gâteau en couronne saupoudré de sucre glace, sur une nappe en dentelle, dans une salle à manger" width={1400} height={933} sizes="(min-width: 768px) 560px, 100vw" priority className="h-full w-full object-cover" />
          </div>
          <ul className="order-3 grid grid-cols-2 gap-4 text-left md:grid-cols-1 md:gap-16">
            {NOTES.slice(2).map((x) => (
              <li key={x.n} className="space-y-1">
                <p className="font-[family-name:var(--titres)] text-3xl text-[var(--accent-texte)]">{x.n}</p>
                <p className="text-sm leading-snug">{x.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="envoyer" className="scroll-mt-16 border-y border-[var(--trait)] bg-[#F7E6CC]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-20">
          <div className="space-y-4">
            <Surtitre>Le gâteau de ta famille</Surtitre>
            <h2 className="text-5xl leading-[1.02] sm:text-6xl">Envoie-nous <span className="italic text-[var(--accent-texte)]">sa recette.</span></h2>
            <p className="text-lg leading-relaxed">Une photo de la fiche suffit. Même tachée, même incomplète.</p>
          </div>
          <div className="rounded-[28px] bg-[var(--carte)] p-5 shadow-[0_24px_50px_-30px_rgba(61,29,19,0.6)] sm:p-7">
            <EnvoyerRecette />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-4 py-20 sm:px-6">
        <div className="max-w-2xl space-y-4">
          <Surtitre>Comment ça marche</Surtitre>
          <h2 className="text-5xl leading-[1.02] sm:text-6xl">De la fiche tachée <span className="italic text-[var(--accent-texte)]">à la première bouchée.</span></h2>
        </div>
        <ol className="grid gap-8 md:grid-cols-4">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="space-y-3 border-t border-[var(--accent)] pt-5">
              <p className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)]">{i + 1}.</p>
              <h3 className="text-2xl">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
        <Link href={`${DOSSIER}/comment-ca-marche`} className="inline-block border-b border-[var(--accent)] pb-1 font-semibold">Ce que le pâtissier va te demander</Link>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F3D88A]">Pourquoi Gâteaux Perdus</p>
            <h2 className="text-5xl leading-[1.02] sm:text-6xl">Pas mes recettes. <span className="italic text-[#E9B7C0]">Celle de ta grand-mère.</span></h2>
            <p className="text-lg leading-relaxed">
              Toutes les pâtisseries vendent des gâteaux parfaits, brillants. Qu&apos;on photographie,
              et qu&apos;on oublie. Le gâteau dont on se souvient, c&apos;est le sien. Pour tous ceux
              qu&apos;on croyait perdus.
            </p>
            <ul className="space-y-2 font-[family-name:var(--f-caveat)] text-3xl text-[#F3D88A]">
              {QUESTIONS_APPEL.slice(0, 3).map((q) => <li key={q}>— {q}</li>)}
            </ul>
          </div>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[6px]">
            <Image src="/exemples/gateaux-perdus/farine-et-oeufs.webp" alt="De la farine, des œufs, du beurre et un rouleau à pâtisserie sur un torchon rayé" width={900} height={1200} sizes="(min-width: 768px) 380px, 90vw" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <Surtitre>La vitrine</Surtitre>
            <h2 className="text-5xl leading-[1.02] sm:text-6xl">Leurs recettes, <span className="italic text-[var(--accent-texte)]">épinglées.</span></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">En vitrine, à côté des gâteaux, les vraies fiches des clients. Épinglées avec leur accord, et seulement avec.</p>
          </div>
          <Link href={`${DOSSIER}/la-vitrine`} className="inline-block border-b border-[var(--accent)] pb-1 font-semibold">Toute la vitrine</Link>
        </div>
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {FICHES.slice(1, 4).map((f, i) => (
            <li key={f.titre} className="px-2">
              <Fiche fiche={f} angle={[-3, 2, -1.5][i]} punaise />
            </li>
          ))}
        </ul>
        <p className="text-xs text-[var(--doux)]">Fiches inventées pour l&apos;exemple : la pâtisserie est fictive.</p>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-[999px]">
            <Image src="/exemples/gateaux-perdus/une-tranche.webp" alt="Une tranche de gâteau moelleux sur une assiette, sur une table en marbre" width={900} height={1162} sizes="(min-width: 768px) 380px, 90vw" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-6">
            <Surtitre>Le prix, les allergènes</Surtitre>
            <h2 className="text-5xl leading-[1.02]">38 € <span className="italic text-[var(--accent-texte)]">le premier.</span></h2>
            <p className="text-lg leading-relaxed">
              Le premier gâteau refait, essais compris, pour six parts. Ensuite, il entre dans tes
              commandes au prix d&apos;un gâteau de la vitrine.
            </p>
            <div className="rounded-[20px] bg-[#E9B7C0] p-5 text-[#3D1D13]">
              <p className="font-[family-name:var(--titres)] text-2xl">Et ses allergènes&nbsp;?</p>
              <p className="mt-1 leading-relaxed">
                Établis avec toi au téléphone, d&apos;après ce que contenait la recette, et écrits sur
                sa fiche avant la commande. Exemple, le gâteau de Mamie Jeanne : gluten, œufs, lait.
              </p>
            </div>
            <p className="text-xs text-[var(--doux)]">Prix TTC d&apos;exemple.</p>
          </div>
        </div>
      </section>

      <section id="questions" className="scroll-mt-16 mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-5xl leading-[1.02]">Avant d&apos;envoyer <span className="italic text-[var(--accent-texte)]">la photo.</span></h2>
        </div>
        <Faq questions={QUESTIONS} />
      </section>

      <section className="border-t border-[var(--trait)] bg-[#F3D88A] text-[#3D1D13]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 text-center sm:px-6 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Téléphone</p>
            <a href={`tel:${boutique.telephoneLien}`} className="font-[family-name:var(--titres)] text-4xl">{boutique.telephone}</a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Adresse</p>
            <p className="leading-relaxed">{boutique.adresse.map((l) => <span key={l} className="block">{l}</span>)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Horaires</p>
            <p>{boutique.horaires}</p>
          </div>
          <p className="text-xs md:col-span-3">
            Numéro de la tranche que l&apos;ARCEP réserve à la fiction, adresse inventée : la pâtisserie n&apos;existe pas.{" "}
            <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
