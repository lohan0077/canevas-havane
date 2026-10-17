import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { COMPARAISON, CONSEILS, DOSSIER, ETAPES, FORMULE, INVENTAIRE, QUESTIONS, photos } from "./_composants/donnees";
import { AppelFinal, Bouton, Cartel, Faq } from "./_composants/Blocs";
import BoiteTirages from "./_composants/BoiteTirages";

// L'accueil de Pour Plus Tard. La vidéo : « Sur le site, une seule formule. Une
// séance, et une boîte de vingt tirages, livrée chez toi. » La boîte s'ouvre pour de
// vrai ; autour, ce qu'un studio dirait : ce qu'il y a dedans, comment ça se passe,
// la réponse à « que faire de ses photos numériques », la vitrine, les questions.
export const metadata: Metadata = {
  title: "Pour Plus Tard — site de démonstration",
  description: "Site de démonstration d'un studio photo imaginaire, réalisé par Canevas Havane : pas des fichiers, une boîte de vingt tirages qu'on garde.",
  ...adressesDeLaPage("/exemples/pour-plus-tard"),
};

export default function PourPlusTard() {
  return (
    <main>
      {/* 1 · Le titre, et la figure annotée. */}
      <section className="max-w-6xl mx-auto px-5 pt-6 pb-14 sm:pt-10">
        <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.2em]">
          <span>Studio photo de famille</span>
          <span className="tabular-nums">Catalogue n° 001</span>
        </div>
        <h1 className="mt-6 text-[19vw] sm:text-[124px] lg:text-[150px] font-normal italic leading-[0.92] tracking-[-0.03em]">
          Pour Plus Tard
        </h1>
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-end">
          <div className="space-y-6 md:order-2">
            <p className="font-[family-name:var(--titres)] text-[28px] sm:text-4xl leading-[1.2]">
              Pas des fichiers. <span className="italic">La photo que tes petits-enfants retrouveront dans un tiroir.</span>
            </p>
            <p className="text-lg leading-relaxed">
              Une séance, vingt tirages, une boîte à ton nom. Livrée chez toi, à ranger dans
              un placard, à ouvrir dans trente ans.
            </p>
            <div className="flex flex-wrap gap-3">
              <Bouton href="#formule">Voir la boîte</Bouton>
              <Link href={`${DOSSIER}/la-vitrine`} className="inline-flex min-h-[52px] items-center rounded-full border border-[var(--encre)] px-7 font-bold">
                La vitrine
              </Link>
            </div>
          </div>
          <figure className="relative">
            <div className="relative mx-auto w-[82%] md:w-full aspect-[4/5] overflow-hidden">
              <Image src={photos.vieuxTirage.src} alt={photos.vieuxTirage.alt} fill priority sizes="(min-width: 768px) 480px, 82vw" className="object-cover" />
            </div>
            <span aria-hidden="true" className="absolute left-0 top-[18%] h-px w-[14%] bg-[var(--encre)]" />
            <span aria-hidden="true" className="absolute right-0 bottom-[22%] h-px w-[14%] bg-[var(--encre)]" />
            <figcaption className="mt-3 flex justify-between gap-4 text-[11px] font-bold uppercase tracking-[0.16em]">
              <span>Fig. 1 · Un tirage qui a traversé le temps</span>
              <span className="text-[var(--doux)] normal-case tracking-normal font-normal">Photo d&apos;illustration</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2 · Ce que les autres livrent, ce qu'on livre. */}
      <section className="border-y border-[var(--encre)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 space-y-10">
          <Cartel numero="2">Le constat</Cartel>
          <h2 className="text-4xl sm:text-6xl font-normal max-w-3xl">
            Cinquante fichiers dans un lien qui expire. <span className="italic">Puis plus rien.</span>
          </h2>
          <div className="overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.18em]">
                  <th scope="col" className="py-3 pr-3 font-bold sr-only sm:not-sr-only">&nbsp;</th>
                  <th scope="col" className="py-3 pr-3 font-bold text-[var(--doux)]">Ailleurs</th>
                  <th scope="col" className="py-3 font-bold">Pour Plus Tard</th>
                </tr>
              </thead>
              <tbody>
                {COMPARAISON.map((c) => (
                  <tr key={c.quoi} className="border-t border-[var(--trait)] align-top">
                    <th scope="row" className="hidden sm:table-cell py-4 pr-4 text-xs font-bold uppercase tracking-[0.14em]">{c.quoi}</th>
                    <td className="py-4 pr-4 text-[var(--doux)] line-through decoration-1">{c.eux}</td>
                    <td className="py-4 font-[family-name:var(--titres)] text-xl leading-snug">{c.nous}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3 · La formule unique : la boîte qui s'ouvre. */}
      <section id="formule" className="scroll-mt-20 max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="space-y-5">
          <Cartel numero="3">La formule</Cartel>
          <h2 data-film="formule" className="text-5xl sm:text-6xl font-normal">Une seule <span className="italic">formule.</span></h2>
          <p className="text-lg leading-relaxed">
            Une séance, et une boîte de vingt tirages, livrée chez toi. Pas de forfait
            « bronze, argent, or » : la même boîte pour tout le monde.
          </p>
          <ul className="hidden md:block space-y-2">
            {FORMULE.details.map((d) => (
              <li key={d} className="flex gap-3"><span aria-hidden="true">—</span>{d}</li>
            ))}
          </ul>
        </div>
        <BoiteTirages />
      </section>

      {/* 4 · L'inventaire de la boîte. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)] [--doux:#E3D6C2]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <Cartel numero="4">Inventaire</Cartel>
            <h2 className="text-4xl sm:text-6xl font-normal">Ce qu&apos;il y a <span className="italic">dans la boîte.</span></h2>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={photos.albumFleurs.src} alt={photos.albumFleurs.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            </div>
          </div>
          <ol className="border-t border-[var(--sur-sombre)]">
            {INVENTAIRE.map((x) => (
              <li key={x.n} className="grid grid-cols-[44px_1fr] gap-x-3 border-b border-[rgba(243,235,221,.25)] py-5">
                <span className="text-xs font-bold tabular-nums pt-1.5">{x.n}</span>
                <div className="space-y-1.5">
                  <h3 className="text-2xl font-normal">{x.titre}</h3>
                  <p className="leading-relaxed text-[var(--doux)]">{x.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · La question qu'on tape déjà. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <Cartel numero="5">Que faire de ses photos numériques&nbsp;?</Cartel>
          <h2 className="text-4xl sm:text-6xl font-normal">Les imprimer. <span className="italic">Pas toutes&nbsp;: vingt.</span></h2>
          <p className="text-lg leading-relaxed">
            Tu as peut-être tapé la question sur Google. Voilà notre réponse, même si tu ne
            fais jamais de séance avec nous.
          </p>
        </div>
        <ol className="space-y-6">
          {CONSEILS.map((c, i) => (
            <li key={c.titre} className="border-t border-[var(--encre)] pt-4 space-y-2">
              <p className="text-xs font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-2xl font-normal">{c.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{c.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 6 · Comment ça se passe. */}
      <section className="border-y border-[var(--encre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20 space-y-10">
          <Cartel numero="6">Comment ça se passe</Cartel>
          <ol className="grid gap-px bg-[var(--trait)] sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="bg-[var(--fond)] p-6 space-y-3">
                <p className="font-[family-name:var(--titres)] text-5xl italic [font-variant-numeric:lining-nums]">{i + 1}</p>
                <h3 className="text-2xl font-normal">{e.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7 · La vitrine. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={photos.boite1942.src} alt={photos.boite1942.alt} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-6">
          <Cartel numero="7">La vitrine · novembre 2026</Cartel>
          <h2 className="text-4xl sm:text-6xl font-normal">Apporte la plus vieille <span className="italic">photo de ta famille.</span></h2>
          <p className="text-lg leading-relaxed">
            Du 2 au 28 novembre, la vitrine du studio devient un mur de grands-parents :
            les plus vieilles photos de famille du quartier, exposées avec l&apos;accord de
            chacun. L&apos;original repart avec toi le jour même.
          </p>
          <Bouton href={`${DOSSIER}/la-vitrine`}>Comment déposer ta photo</Bouton>
        </div>
      </section>

      {/* 8 · Les questions. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <Cartel numero="8">Questions</Cartel>
          <h2 className="text-4xl sm:text-6xl font-normal">Avant <span className="italic">d&apos;appeler.</span></h2>
        </div>
        <Faq questions={QUESTIONS} />
      </section>

      <AppelFinal />
    </main>
  );
}
