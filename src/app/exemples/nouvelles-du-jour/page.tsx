import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, SERVICES, agence, etapes, photos, questions } from "./_composants/donnees";
import { Conversation, Faq, PrixHonnete, TelephoneDe18h } from "./_composants/Blocs";

// L'accueil de Nouvelles du Jour, le site imaginé dans la vidéo « Si je devais remplir
// le planning d'une entreprise d'aide à domicile » : on ne vend pas des heures de
// ménage, on vend le texto de 18 h. Le prix en gros, l'avantage fiscal à part et plus
// petit, le devis en trois questions : ce que la vidéo montre, en état de marche.
export const metadata: Metadata = {
  title: "Nouvelles du Jour — site de démonstration",
  description: "Site de démonstration d'une entreprise d'aide à domicile imaginaire, réalisé par Canevas Havane : ménage, linge, courses, et le texto de 18 h à la famille.",
  ...adressesDeLaPage("/exemples/nouvelles-du-jour"),
};

export default function NouvellesDuJour() {
  return (
    <>
      {/* 1 · Le ciel doux, le titre, le téléphone de 18 h. */}
      <section className="relative overflow-hidden bg-[#E6EDE4]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,#FBF6EC_0%,rgba(251,246,236,0)_70%),radial-gradient(60%_50%_at_10%_90%,#D3E1D5_0%,rgba(211,225,213,0)_70%),radial-gradient(50%_50%_at_95%_70%,#F1DCC8_0%,rgba(241,220,200,0)_70%)]" />
        <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-10 text-center sm:pt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Aide à domicile · ménage, linge, courses</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-semibold tracking-tight sm:text-7xl">
            Le texto de <span className="italic text-[var(--accent-texte)]">18&nbsp;h.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-[var(--doux)]">
            Après chaque passage, un message à la famille : ce qui a été fait, et un mot de
            ta mère. Avec son accord, bien sûr.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={`${DOSSIER}/devis`} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--accent)] px-7 font-semibold text-[var(--sur-accent)]">Mon devis en 3 questions</Link>
            <Link href={`${DOSSIER}/tarifs`} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--carte)] px-6 font-semibold">Les tarifs</Link>
          </div>
          <div className="mt-12">
            <TelephoneDe18h />
          </div>
        </div>
      </section>

      {/* 2 · Le contre-pied. */}
      <section className="mx-auto max-w-4xl space-y-6 px-5 py-20 text-center sm:py-28">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          <span className="text-[var(--doux)] line-through decoration-[var(--accent)] decoration-2">Des heures de ménage.</span>{" "}
          La tranquillité, à 18&nbsp;h.
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed">
          Quand on habite loin, ce qu&apos;on cherche, ce n&apos;est pas une heure de ménage de plus.
          C&apos;est de savoir que tout va bien, sans avoir à appeler pour le demander.
        </p>
      </section>

      {/* 3 · Le message. */}
      <section className="bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-24 md:grid-cols-2 md:items-center">
          <Conversation />
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Après chaque passage</p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Ce qui a été fait, et un mot.</h2>
            <ul className="space-y-3 text-lg leading-relaxed">
              <li><b>Ce qui a été fait</b> : le ménage, les courses, le linge.</li>
              <li><b>Un mot</b> de la personne aidée, si elle le souhaite.</li>
              <li><b>Son accord</b>, d&apos;abord : le message ne part pas sans.</li>
            </ul>
            <p className="text-[var(--doux)]">Jamais d&apos;information de santé dans le message : il dit la maison, pas l&apos;ordonnance.</p>
          </div>
        </div>
      </section>

      {/* 4 · Ce qu'on fait. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-24">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Ce qu&apos;on fait</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Trois choses, bien faites.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
          <ul className="grid gap-4">
            {SERVICES.map((s) => (
              <li key={s.titre} className="rounded-[28px] bg-[var(--carte)] p-6 space-y-2">
                <h3 className="text-2xl font-semibold">{s.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{s.texte}</p>
              </li>
            ))}
          </ul>
          <Image src={photos.linge.src} alt={photos.linge.alt} width={photos.linge.largeur} height={photos.linge.hauteur} sizes="(min-width: 768px) 480px, 100vw" className="h-full w-full rounded-[28px] object-cover" />
        </div>
        <p className="rounded-[24px] border border-[var(--trait)] p-5 text-[var(--doux)]">
          L&apos;aide aux gestes du quotidien d&apos;une personne âgée — le lever, la toilette, les
          repas — exige une autorisation du département. Nous ne la proposons pas : nous
          t&apos;indiquons les services qui l&apos;ont.
        </p>
      </section>

      {/* 5 · Le prix. */}
      <section id="prix" className="scroll-mt-20 bg-[#E6EDE4]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Le prix</p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Le prix en gros. Le reste, à part.</h2>
            <p className="text-lg leading-relaxed">
              Le prix d&apos;une heure, hors taxes et toutes taxes comprises. Et en dessous, à part
              et en plus petit, le crédit d&apos;impôt, sous conditions. C&apos;est la règle, et
              c&apos;est plus honnête.
            </p>
            <Link href={`${DOSSIER}/tarifs`} className="inline-flex min-h-[44px] items-center font-semibold underline underline-offset-4 decoration-[var(--accent)]">Tous les tarifs →</Link>
          </div>
          <PrixHonnete />
        </div>
      </section>

      {/* 6 · Comment ça se passe. */}
      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:py-24">
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Du devis au <span className="italic text-[var(--accent-texte)]">premier texto.</span></h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {etapes.map((e, i) => (
            <li key={e.titre} className="rounded-[28px] bg-[var(--carte)] p-6 space-y-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E6EDE4] font-[family-name:var(--titres)] text-lg font-semibold text-[var(--accent-texte)]">{i + 1}</span>
              <h3 className="text-xl font-semibold">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 7 · La maison. */}
      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-20 md:grid-cols-[0.8fr_1.2fr]">
        <Image src={photos.salon.src} alt={photos.salon.alt} width={photos.salon.largeur} height={photos.salon.hauteur} sizes="(min-width: 768px) 420px, 100vw" className="h-[420px] w-full rounded-[28px] object-cover md:h-full" />
        <div className="flex flex-col justify-between gap-6 rounded-[28px] bg-[var(--sombre)] p-8 text-[var(--sur-sombre)]">
          <p className="font-[family-name:var(--titres)] text-3xl leading-snug sm:text-4xl">
            « On range comme chez soi, mais chez quelqu&apos;un d&apos;autre : à sa place, à sa façon. »
          </p>
          <p className="text-[#C9D8CC]">Notre façon de travailler, en une phrase.</p>
          <Image src={photos.table.src} alt={photos.table.alt} width={photos.table.largeur} height={photos.table.hauteur} sizes="(min-width: 768px) 600px, 100vw" className="h-auto w-full rounded-[20px]" />
        </div>
      </section>

      {/* 8 · Les questions. */}
      <section className="bg-[#E6EDE4]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Les questions des familles.</h2>
          <Faq questions={questions} />
        </div>
      </section>

      {/* 9 · L'appel. */}
      <section className="mx-auto max-w-3xl space-y-5 px-5 py-20 text-center sm:py-24">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">On en parle&nbsp;?</h2>
        <p className="text-lg text-[var(--doux)]">Trois questions sur le site, ou un appel. Le devis est gratuit.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={`${DOSSIER}/devis`} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--accent)] px-7 font-semibold text-[var(--sur-accent)]">Mon devis</Link>
          <a href={`tel:${agence.telephoneLien}`} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--carte)] px-6 font-semibold">{agence.telephone}</a>
        </div>
        <p className="text-sm text-[var(--doux)]">Numéro réservé aux œuvres de fiction : il ne sonne chez personne.</p>
      </section>
    </>
  );
}
