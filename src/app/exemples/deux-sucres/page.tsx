import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, INTERVENANTES, agence, photos, questions } from "./_composants/donnees";
import { Affiche, Faq, Tarif, Tasse } from "./_composants/Blocs";
import { Portrait } from "./_composants/Rencontre";
import CafeDuMardi from "./_composants/CafeDuMardi";

// L'accueil de Deux Sucres, l'entreprise d'aide à domicile imaginée dans la vidéo « Si
// je devais créer une entreprise d'aide à domicile de zéro » : on ne vend pas de
// l'aide, on vend la même personne, chaque mardi. Autour : celle qui viendra, le tarif
// honnête, le café du premier mardi, l'affiche des boulangeries.
export const metadata: Metadata = {
  title: "Deux Sucres — site de démonstration",
  description: "Site de démonstration d'une entreprise d'aide à domicile imaginaire, réalisé par Canevas Havane : la même personne, chaque mardi — celle qui sait que ta mère prend deux sucres.",
  ...adressesDeLaPage("/exemples/deux-sucres"),
};

export default function DeuxSucres() {
  const nadia = INTERVENANTES[0];
  return (
    <>
      {/* 1 · Le grand panneau : un portrait, un titre, trois petites cartes. */}
      <section className="px-3 pb-12 pt-2 sm:px-5">
        <div className="mx-auto grid max-w-6xl gap-3 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[36px] bg-[var(--carte)] px-5 pb-5 pt-10 text-center shadow-[0_30px_70px_-50px_rgba(59,42,30,.6)] sm:px-10">
            <div className="mx-auto w-fit">
              <Portrait prenom={nadia.prenom} teinte={nadia.teinte} taille="h-20 w-20 text-4xl" />
            </div>
            <h1 className="mx-auto mt-6 max-w-2xl text-5xl font-semibold tracking-tight sm:text-6xl">
              Elle sait que ta mère prend <span className="italic text-[var(--accent-texte)]">deux sucres.</span>
            </h1>
            <svg aria-hidden="true" viewBox="0 0 200 16" className="mx-auto mt-3 h-4 w-40"><path d="M2 10 C 40 2, 70 14, 100 8 S 160 2, 198 9" fill="none" stroke="#D98E73" strokeWidth="3" strokeLinecap="round" /></svg>
            <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-[var(--doux)]">
              Ménage et courses à domicile. La même personne, chaque semaine, les mêmes jours.
            </p>
            <Link href={`${DOSSIER}/celle-qui-viendra`} className="mt-6 inline-flex min-h-[54px] items-center gap-3 rounded-full bg-[var(--accent)] px-7 font-semibold text-[var(--sur-accent)]">
              Rencontrer celle qui viendra <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-[var(--sur-accent)] text-[var(--accent)]">→</span>
            </Link>
            <ul className="mt-10 grid gap-3 text-left sm:grid-cols-3">
              <li className="rounded-[24px] bg-[var(--fond)] p-4">
                <p className="font-semibold">La même personne</p>
                <p className="text-sm text-[var(--doux)]">Les mêmes jours, chaque semaine. Une collègue connue si elle est absente.</p>
              </li>
              <li className="rounded-[24px] bg-[var(--fond)] p-4">
                <p className="font-semibold">Le prix en gros</p>
                <p className="text-sm text-[var(--doux)]">HT et TTC, écrits. Le crédit d&apos;impôt à part.</p>
              </li>
              <li className="rounded-[24px] bg-[var(--fond)] p-4">
                <p className="font-semibold">Le café du mardi</p>
                <p className="text-sm text-[var(--doux)]">Le premier mardi du mois, à l&apos;agence, pour les familles.</p>
              </li>
            </ul>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-[36px] bg-[var(--sombre)]">
            <Image src={photos.cafe.src} alt={photos.cafe.alt} fill priority sizes="(min-width: 1024px) 380px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 2 · Le contre-pied. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-2 md:items-center">
        <Tasse className="mx-auto w-full max-w-sm" />
        <div className="space-y-5">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            <span className="text-[var(--doux)] line-through decoration-[#D98E73] decoration-2">De l&apos;aide.</span>{" "}
            La même personne, <span className="italic text-[var(--accent-texte)]">chaque mardi.</span>
          </h2>
          <p className="text-lg leading-relaxed">
            Toutes les marques d&apos;aide à domicile promettent la bienveillance. Nous, on
            promet un prénom. Celle qui vient le mardi connaît la maison : où sont les
            torchons, quelle radio est allumée, et combien de sucres dans le café.
          </p>
        </div>
      </section>

      {/* 3 · Celles qui viendront. */}
      <section className="bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-10 px-5 py-16 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Sur le site</p>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Tu ne choisis pas un service. Tu rencontres celle qui viendra.</h2>
            </div>
            <Link href={`${DOSSIER}/celle-qui-viendra`} className="font-semibold underline underline-offset-4 decoration-[#D98E73]">Les rencontrer →</Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {INTERVENANTES.map((p) => (
              <li key={p.id} className="flex gap-4 rounded-[28px] bg-[var(--fond)] p-5">
                <Portrait prenom={p.prenom} teinte={p.teinte} />
                <div className="space-y-2">
                  <p className="font-[family-name:var(--titres)] text-3xl font-semibold">{p.prenom}</p>
                  <p className="text-sm text-[var(--doux)]">Chez toi {p.jours}</p>
                  <p className="flex flex-wrap gap-1.5 text-sm">
                    {p.aime.map((a) => (
                      <span key={a} className="rounded-full bg-[var(--carte)] px-3 py-1">{a}</span>
                    ))}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--doux)]">Prénoms, goûts et portraits d&apos;exemple. Sur un vrai site, photos et goûts publiés avec l&apos;accord écrit de chacune.</p>
        </div>
      </section>

      {/* 4 · Ce qu'on fait. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Ce qu&apos;on fait</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Le ménage et les courses. Bien.</h2>
          <p className="text-lg leading-relaxed">
            Les sols, la cuisine, le linge, la liste de courses faite ensemble et rangée à sa
            place. Pas plus, mais pas moins.
          </p>
          <p className="rounded-[24px] border border-[var(--trait)] p-5 text-[var(--doux)]">
            L&apos;aide aux gestes du quotidien d&apos;une personne âgée — le lever, la toilette — exige
            une autorisation du département. Nous ne la proposons pas, et nous vous indiquons
            les services qui l&apos;ont.
          </p>
        </div>
        <Image src={photos.mains.src} alt={photos.mains.alt} width={photos.mains.largeur} height={photos.mains.hauteur} sizes="(min-width: 768px) 480px, 100vw" className="h-auto w-full rounded-[32px]" />
      </section>

      {/* 5 · Le tarif. */}
      <section id="tarif" className="scroll-mt-20 bg-[#EFE2D0]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Le tarif</p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Le prix, en gros. Le crédit d&apos;impôt, à part.</h2>
            <p className="text-lg leading-relaxed">C&apos;est la règle, et c&apos;est plus honnête.</p>
            <Link href={`${DOSSIER}/tarif`} className="inline-flex min-h-[44px] items-center font-semibold underline underline-offset-4 decoration-[#D98E73]">Le tarif en détail →</Link>
          </div>
          <Tarif />
        </div>
      </section>

      {/* 6 · Le café du premier mardi. */}
      <section id="cafe" className="scroll-mt-20 mx-auto max-w-6xl space-y-8 px-5 py-16 sm:py-24">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Chaque premier mardi du mois</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Un café ouvert, à l&apos;agence. <span className="italic text-[var(--accent-texte)]">Pour les familles.</span></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Une heure et demie pour parler, poser ses questions, rencontrer les intervenantes. Entrée libre.</p>
        </div>
        <CafeDuMardi />
      </section>

      {/* 7 · L'affiche des boulangeries. */}
      <section className="bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 md:grid-cols-2 md:items-center">
          <Affiche />
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Dans les boulangeries du quartier</p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Une affiche, là où l&apos;on achète le pain du matin.</h2>
            <p className="text-lg leading-relaxed">Posée avec l&apos;accord des boulangers. Une phrase, et notre nom en bas.</p>
          </div>
        </div>
      </section>

      {/* 8 · La maison. */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="relative overflow-hidden rounded-[36px] bg-[var(--sombre)]">
          <Image src={photos.fauteuil.src} alt={photos.fauteuil.alt} width={photos.fauteuil.largeur} height={photos.fauteuil.hauteur} sizes="(min-width: 1152px) 1100px, 100vw" className="h-[340px] w-full object-cover opacity-90 sm:h-[460px]" />
          <p className="absolute inset-x-5 bottom-5 max-w-xl rounded-[24px] bg-[var(--sombre)] p-5 font-[family-name:var(--titres)] text-2xl italic leading-snug text-[var(--sur-sombre)] sm:inset-x-8 sm:bottom-8">
            On connaît la maison. C&apos;est tout ce qu&apos;on promet.
          </p>
        </div>
      </section>

      {/* 9 · Les questions. */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Les questions des familles.</h2>
        <Faq questions={questions} />
      </section>

      {/* 10 · L'appel. */}
      <section className="mx-auto max-w-3xl space-y-5 px-5 pb-24 text-center">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Un café, pour commencer&nbsp;?</h2>
        <p className="text-lg text-[var(--doux)]">Appelez l&apos;agence, ou passez le premier mardi du mois.</p>
        <a href={`tel:${agence.telephoneLien}`} className="inline-flex min-h-[54px] items-center rounded-full bg-[var(--accent)] px-7 text-lg font-semibold text-[var(--sur-accent)]">{agence.telephone}</a>
        <p className="text-sm text-[var(--doux)]">Numéro réservé aux œuvres de fiction : il ne sonne chez personne.</p>
      </section>
    </>
  );
}
