import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Conseil, { MarquePage } from "./_composants/Conseil";
import { Faq, Libelle, Port } from "./_composants/Blocs";
import { DOSSIER, IMAGES, LIBRAIRES, RENCONTRES, entreprise } from "./_composants/donnees";

export const metadata: Metadata = {
  title: "Tu Vas Voir — site de démonstration",
  description: "Site de démonstration d'une librairie imaginaire, réalisé par Canevas Havane : le dernier livre que t'as adoré, et un libraire qui te conseille les trois suivants.",
  ...adressesDeLaPage("/exemples/tu-vas-voir"),
};

const ETAPES = [
  { n: "01", titre: "Tu nous dis le dernier livre que t'as adoré", texte: "Un titre suffit, même approximatif." },
  { n: "02", titre: "Un libraire te répond", texte: "Trois livres, signés de son prénom. Un humain qui les a lus." },
  { n: "03", titre: "Tu le réserves, tu passes le prendre", texte: "Dans ton casier, avec un marque-page écrit à la main. 0 € de port." },
];

export default function TuVasVoir() {
  return (
    <div>
      {/* 1. L'ouverture : une seule question. */}
      <section id="conseil" className="scroll-mt-16">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-6 lg:pt-12">
          <div className="grid grid-cols-2 gap-4 border-b border-[var(--trait)] pb-4 text-[11px] font-semibold uppercase leading-snug tracking-[0.08em] sm:grid-cols-3">
            <p>Librairie indépendante</p>
            <p>Conseils écrits à la main, pas par un algorithme</p>
            <p className="hidden sm:block">{entreprise.horaires}</p>
          </div>
          <div className="grid gap-8 pt-6 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-14 lg:pt-12">
            <h1 className="text-[46px] font-medium tracking-tight sm:text-[72px] lg:text-[88px]">
              C&apos;est quoi le dernier livre que t&apos;as{" "}
              <em className="relative whitespace-nowrap font-normal">
                <span aria-hidden="true" className="absolute inset-x-[-4px] bottom-[0.12em] -z-0 h-[0.38em] rounded-sm bg-[#F6D84B]" />
                <span className="relative">adoré</span>
              </em>
              &nbsp;?
            </h1>
            <div className="lg:pt-4">
              <Conseil />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Le parti pris. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="relative aspect-[16/9] max-h-[560px] w-full overflow-hidden sm:aspect-[21/9]">
          <Image src={IMAGES.annotes.src} alt={IMAGES.annotes.alt} width={IMAGES.annotes.largeur} height={IMAGES.annotes.hauteur} sizes="100vw" className="h-full w-full object-cover" />
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 lg:grid-cols-2 lg:py-20">
          <h2 className="text-[40px] font-medium sm:text-[56px]">
            On ne vend pas un catalogue. On vend le livre que t&apos;aurais <em className="font-normal">jamais trouvé tout seul.</em>
          </h2>
          <p className="text-lg leading-relaxed lg:pt-3">
            Le prix d&apos;un livre neuf est fixé par l&apos;éditeur : il est le même partout. Alors on ne se bat pas sur le prix. On se bat sur le conseil — et chaque conseil a un prénom.
          </p>
        </div>
      </section>

      {/* 3. Les libraires. */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
        <Libelle n="01">Pas un algorithme</Libelle>
        <h2 className="mt-4 max-w-2xl text-[40px] font-medium sm:text-[56px]">Quatre libraires, <em className="font-normal">quatre prénoms.</em></h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LIBRAIRES.map((l) => (
            <li key={l.prenom} className="space-y-3 rounded-3xl bg-[var(--carte)] p-6">
              <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-full font-[family-name:var(--f-caveat)] text-3xl font-bold text-white" style={{ background: l.couleur }}>
                {l.prenom[0]}
              </span>
              <h3 className="text-[28px] font-medium">{l.prenom}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{l.lit}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[13px] text-[var(--doux)]">Libraires imaginaires : la librairie est fictive.</p>
      </section>

      {/* 4. Comment ça marche. */}
      <section className="border-y border-[var(--encre)]">
        <ol className="mx-auto grid max-w-6xl divide-y divide-[var(--trait)] px-5 md:grid-cols-3 md:divide-x md:divide-y-0">
          {ETAPES.map((e) => (
            <li key={e.n} className="space-y-2 py-8 md:px-6 md:first:pl-0">
              <p className="font-[family-name:var(--titres)] text-[44px] italic leading-none text-[var(--accent-texte)]">{e.n}</p>
              <h3 className="text-[24px] font-medium">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. Le marque-page. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1fr_auto] md:items-center lg:py-24">
        <div className="space-y-5">
          <Libelle n="02">Le nom de la boutique</Libelle>
          <h2 className="text-[40px] font-medium sm:text-[56px]">
            Trois mots, <em className="font-normal">sur chaque marque-page.</em>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
            Dans chaque livre réservé, un marque-page écrit à la main : ton prénom, la page où ça commence vraiment, et ces trois mots. C&apos;est un mot du libraire, pas un cadeau : il ne change rien au prix.
          </p>
        </div>
        <MarquePage prenom="Julie" page={112} libraire="Margaux" />
      </section>

      {/* 6. Le port. */}
      <section className="bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
          <div className="space-y-5">
            <Libelle n="03">Réserver, retirer</Libelle>
            <h2 className="text-[40px] font-medium sm:text-[56px]">
              En boutique, <em className="font-normal">zéro.</em>
            </h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Par la poste, la loi impose un port minimum sur les livres neufs. Retiré en boutique, il n&apos;y en a pas. Alors on réserve en ligne, et on passe le prendre.
            </p>
          </div>
          <Port />
        </div>
      </section>

      {/* 7. Commander n'importe quel livre. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center lg:py-24">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image src={IMAGES.pile.src} alt={IMAGES.pile.alt} width={IMAGES.pile.largeur} height={IMAGES.pile.hauteur} sizes="(min-width: 768px) 540px, 100vw" className="h-full w-full object-cover" />
        </div>
        <div className="space-y-5">
          <Libelle n="04">Pas en rayon&nbsp;?</Libelle>
          <h2 className="text-[40px] font-medium sm:text-[56px]">
            On le commande. <em className="font-normal">Un seul, s&apos;il le faut.</em>
          </h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            N&apos;importe quel livre disponible chez son éditeur, à l&apos;unité, sans frais de commande. Quelques jours, et il t&apos;attend.
          </p>
          <Link href={`${DOSSIER}/commander`} className="inline-flex min-h-14 items-center rounded-full bg-[var(--encre)] px-7 font-semibold text-[var(--fond)]">
            Commander un livre
          </Link>
        </div>
      </section>

      {/* 8. Les rencontres. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <Libelle n="05" clair>À la boutique</Libelle>
          <ul className="mt-8 divide-y divide-white/20 border-y border-white/20">
            {RENCONTRES.map((r) => (
              <li key={r.titre} className="grid gap-2 py-6 md:grid-cols-[220px_1fr]">
                <p className="text-[13px] font-semibold uppercase tracking-[0.12em]">{r.date} · {r.heure}</p>
                <div>
                  <h3 className="text-[28px] font-medium">{r.titre}</h3>
                  <p className="mt-1 leading-relaxed">{r.texte}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px]">Rencontres d&apos;exemple, entrée libre : la librairie est fictive.</p>
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
        <div className="space-y-5">
          <Libelle n="06">Questions</Libelle>
          <h2 className="text-[40px] font-medium sm:text-[56px]">Ce qu&apos;on nous <em className="font-normal">demande.</em></h2>
          <div className="relative hidden aspect-[3/2] overflow-hidden rounded-3xl lg:block">
            <Image src={IMAGES.plaid.src} alt={IMAGES.plaid.alt} width={IMAGES.plaid.largeur} height={IMAGES.plaid.hauteur} sizes="440px" className="h-full w-full object-cover" />
          </div>
        </div>
        <Faq />
      </section>

      {/* 10. Venir. */}
      <section id="venir" className="scroll-mt-16 border-t border-[var(--encre)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:items-end">
          <div className="space-y-3">
            <h2 className="text-[40px] font-medium sm:text-[56px]">Passer <em className="font-normal">nous voir.</em></h2>
            <p className="text-lg leading-relaxed">{entreprise.adresse}<br />{entreprise.horaires}</p>
          </div>
          <a href={`tel:${entreprise.telephone.replace(/ /g, "")}`} className="flex min-h-14 items-center justify-center rounded-full bg-[var(--accent)] px-8 text-lg font-semibold tabular-nums text-[var(--sur-accent)] md:justify-self-end">
            {entreprise.telephone}
          </a>
        </div>
      </section>
    </div>
  );
}
