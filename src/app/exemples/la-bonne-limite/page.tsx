import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ETAPES, cabinet, photos, questions } from "./_composants/donnees";
import { Bornes, Contact, Situations } from "./_composants/Outils";
import { Faq, Releve } from "./_composants/Blocs";

// L'accueil de La Bonne Limite, le site imaginé dans la vidéo « Si je devais remplir
// le carnet de commandes d'un géomètre » : une seule question (qu'est-ce qui
// t'arrive ?), le prix au nombre de bornes, le bornage raconté étape par étape. Tout
// est information sur l'activité, sur un ton modéré : la règle des géomètres-experts.
export const metadata: Metadata = {
  title: "La Bonne Limite — site de démonstration",
  description: "Site de démonstration d'un cabinet de géomètre-expert imaginaire, réalisé par Canevas Havane : qu'est-ce qui t'arrive ? Le bornage expliqué, et son prix au nombre de bornes.",
  ...adressesDeLaPage("/exemples/la-bonne-limite"),
};

const PRESTATIONS = [
  { titre: "Bornage", texte: "Fixer la limite entre deux terrains, poser les bornes, signer le procès-verbal." },
  { titre: "Division", texte: "Détacher un terrain à bâtir, partager une propriété, mettre le cadastre à jour." },
  { titre: "Plan du terrain", texte: "Mesurer les niveaux, les arbres, les murs : le plan dont l'architecte a besoin." },
  { titre: "Implantation", texte: "Placer la future maison sur le terrain, à la bonne distance des limites." },
];

export default function LaBonneLimite() {
  return (
    <>
      {/* 1 · Une seule question. */}
      <section className="px-5 pb-16 pt-10 text-center sm:pb-20 sm:pt-16">
        <p className="mx-auto max-w-md text-sm font-medium text-[var(--doux)]">{cabinet.titre} · bornage, division, plans</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-[44px] font-bold tracking-tight sm:text-7xl">
          Qu&apos;est-ce qui <span className="text-[var(--accent-texte)]">t&apos;arrive</span>&nbsp;?
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-[var(--doux)]">
          Touche ta situation : on t&apos;explique ce qui s&apos;applique, comment ça se passe et
          ce que ça coûte.
        </p>
        <div className="mt-8">
          <Situations />
        </div>
      </section>

      {/* 2 · La prairie et le relevé. */}
      <Releve />

      {/* 3 · La limite, écrite et signée. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Pourquoi borner</p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Une limite claire, écrite, signée par les deux.</h2>
          <p className="text-lg leading-relaxed">
            Derrière beaucoup de bornages, il y a une haie, un mur, une clôture dont plus
            personne ne sait à qui elle est. Une limite mesurée, posée et signée par les deux
            voisins, c&apos;est souvent ce qui permet de passer à autre chose.
          </p>
          <p className="leading-relaxed text-[var(--doux)]">
            Le procès-verbal ne se signe que si chacun est d&apos;accord. Sinon, on t&apos;explique la
            suite, sans dramatiser.
          </p>
        </div>
        <Image src={photos.cloture.src} alt={photos.cloture.alt} width={photos.cloture.largeur} height={photos.cloture.hauteur} sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full rounded-[28px]" />
      </section>

      {/* 4 · Le prix au nombre de bornes. */}
      <section id="prix" className="scroll-mt-20 border-y border-[var(--trait)] bg-[#EEF0E6]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Le prix</p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Combien coûte ton bornage&nbsp;?</h2>
            <p className="text-lg leading-relaxed">
              Ce que les gens tapent, c&apos;est « prix géomètre pour 4 bornes ». Alors on répond au
              nombre de bornes : tu choisis, tu vois la fourchette.
            </p>
            <Link href={`${DOSSIER}/prix`} className="inline-flex min-h-[44px] items-center font-semibold underline underline-offset-4 decoration-[var(--accent)]">Ce qui est compris, et ce qui est sur devis →</Link>
          </div>
          <Bornes />
        </div>
      </section>

      {/* 5 · Le bornage, étape par étape. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Le guide</p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Un bornage, comment ça se passe&nbsp;?</h2>
          </div>
          <Link href={`${DOSSIER}/bornage`} className="font-semibold underline underline-offset-4 decoration-[var(--accent)]">Les 4 étapes en détail →</Link>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-6 space-y-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] font-bold text-[var(--sur-accent)]">{i + 1}</span>
              <h3 className="text-xl font-bold">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.court}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 6 · Ce que fait le cabinet. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#C8D8BE]">Le cabinet</p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Ce qu&apos;on fait, dit simplement.</h2>
            <p className="leading-relaxed text-[#DCE6D4]">
              Pas de « topographie », pas de « servitudes » sans explication. Quatre missions, en
              mots de tous les jours. Le reste, on en parle au téléphone.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {PRESTATIONS.map((p) => (
              <li key={p.titre} className="rounded-[22px] border border-[rgba(247,246,241,.18)] p-5 space-y-2">
                <h3 className="text-2xl font-bold">{p.titre}</h3>
                <p className="leading-relaxed text-[#DCE6D4]">{p.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 · Le géomètre-expert. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-28 md:grid-cols-2 md:items-center">
        <Image src={photos.parcelles.src} alt={photos.parcelles.alt} width={photos.parcelles.largeur} height={photos.parcelles.hauteur} sizes="(min-width: 768px) 560px, 100vw" className="h-auto w-full rounded-[28px]" />
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Le géomètre-expert</p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Celui qui peut fixer la limite.</h2>
          <p className="text-lg leading-relaxed">
            Quand un professionnel fixe la limite entre deux terrains, ce ne peut être qu&apos;un
            géomètre-expert inscrit à l&apos;Ordre (loi n° 46-942 du 7 mai 1946, art. 1er et 2).
          </p>
          <p className="leading-relaxed text-[var(--doux)]">
            Ce site ne fait que t&apos;informer sur notre activité : c&apos;est la seule publicité que
            permet notre profession, avec modération (décret n° 96-478, art. 53). Il a été
            communiqué au conseil régional de l&apos;Ordre.
          </p>
        </div>
      </section>

      {/* 8 · Les questions. */}
      <section className="border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Les questions qu&apos;on nous pose.</h2>
          <Faq questions={questions} />
        </div>
      </section>

      {/* 9 · Le contact. */}
      <section id="contact" className="scroll-mt-20 bg-[#EEF0E6]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">On en parle&nbsp;?</h2>
            <p className="text-lg leading-relaxed">Laisse ton numéro, ou appelle directement le cabinet.</p>
            <a href={`tel:${cabinet.telephoneLien}`} className="inline-block font-[family-name:var(--titres)] text-3xl font-bold underline underline-offset-4 decoration-[var(--accent)]">{cabinet.telephone}</a>
            <p className="text-sm text-[var(--doux)]">{cabinet.horaires}. Numéro réservé aux œuvres de fiction : il ne sonne chez personne.</p>
          </div>
          <Contact />
        </div>
      </section>
    </>
  );
}
