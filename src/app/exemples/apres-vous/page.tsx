import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, PRESTATIONS, PRIX, QUESTIONS, entreprise, photos } from "./_composants/donnees";
import { Affiche, AppelFinal, PetitMot, Section, Surtitre } from "./_composants/Blocs";
import Depart from "./_composants/Depart";

export const metadata: Metadata = {
  title: "Après Vous — site de démonstration",
  description: "Site de démonstration d'une entreprise de nettoyage de bureaux imaginaire, réalisé par Canevas Havane : ceux qui passent après vous, quand vous avez éteint la lumière.",
  ...adressesDeLaPage("/exemples/apres-vous"),
};

export default function ApresVous() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image src={photos.interrupteur.src} alt={photos.interrupteur.alt} width={photos.interrupteur.largeur} height={photos.interrupteur.hauteur} priority sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover object-[80%_50%] opacity-60" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(18,28,51,.55)_0%,rgba(18,28,51,.75)_55%,#121C33_100%)]" />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-20 pb-16 sm:pt-32 sm:pb-24 min-h-[640px] flex flex-col justify-end">
          <Surtitre>Nettoyage de bureaux</Surtitre>
          <h1 className="mt-6 text-[76px] sm:text-[150px] leading-[0.9] tracking-[-0.02em]">
            Après <span className="italic text-[var(--accent-texte)]">vous.</span>
          </h1>
          <p className="mt-6 max-w-lg font-[family-name:var(--titres)] text-[28px] sm:text-4xl leading-tight">
            Une politesse. Et la vérité&nbsp;: on arrive quand vous partez.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={`${DOSSIER}/l-equipe-du-soir`} className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--accent)] px-8 font-semibold text-[var(--sur-accent)]">
              L'équipe du soir
            </Link>
            <Link href={`${DOSSIER}#prix`} className="inline-flex h-14 items-center justify-center rounded-full border border-[var(--encre)] px-8">
              Nos prix, hors taxes
            </Link>
          </div>
        </div>
      </section>

      <Section className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <Surtitre>Ce qu'on vend</Surtitre>
          <h2 className="text-[46px] sm:text-7xl leading-[1]">Pas du propre. <span className="italic">Ceux qui passent après vous.</span></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Toutes les entreprises de nettoyage ont le même nom et vendent la même chose. Nous, on
            vend des gens de confiance, dans vos bureaux, la nuit — quand vous avez éteint la lumière.
          </p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[200px]">
          <Image src={photos.nuit.src} alt={photos.nuit.alt} fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
        </div>
      </Section>

      <div className="bg-[var(--sombre)]">
        <Section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6 lg:sticky lg:top-28">
            <Surtitre>Votre soir, le nôtre</Surtitre>
            <h2 className="text-[46px] sm:text-7xl leading-[1]">Vous partez à quelle heure&nbsp;?</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Glissez l'heure où la dernière lumière s'éteint&nbsp;: la soirée de l'équipe se cale dessus.
              Rien ne se fait pendant que vous êtes là.
            </p>
          </div>
          <Depart />
        </Section>
      </div>

      <Section className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-6 md:order-2">
          <Surtitre>Pas de gant jaune</Surtitre>
          <h2 className="text-[46px] sm:text-7xl leading-[1]">L'équipe du soir, <span className="italic">toujours la même.</span></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Deux agents, chez vous chaque soir, ensemble chez nous depuis {entreprise.ensemble} ans (exemple).
            On ne publie ni leurs noms ni leurs visages&nbsp;: ce qu'on vous montre, c'est ce qu'ils font,
            et depuis combien de temps.
          </p>
          <Link href={`${DOSSIER}/l-equipe-du-soir`} className="inline-block text-lg underline underline-offset-8 decoration-[var(--accent)]">Rencontrer l'équipe du soir</Link>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] md:order-1">
          <Image src={photos.vitre.src} alt={photos.vitre.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
      </Section>

      <div className="bg-[var(--carte)]">
        <Section className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <Surtitre>Chaque matin</Surtitre>
            <h2 className="text-[46px] sm:text-7xl leading-[1]">Un petit mot sur le bureau.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              L'heure du passage, et ce qu'on a remarqué. Signé de l'équipe du soir, pas d'un prénom&nbsp;:
              le mot vous dit ce qui a été fait, pas qui l'a fait.
            </p>
          </div>
          <PetitMot />
        </Section>
      </div>

      <Section className="space-y-12">
        <div className="max-w-2xl space-y-6">
          <Surtitre>Ce qu'on fait</Surtitre>
          <h2 className="text-[46px] sm:text-7xl leading-[1]">Tout, sauf vos papiers.</h2>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-[24px] border border-[var(--trait)] bg-[var(--trait)] sm:grid-cols-2 lg:grid-cols-4">
          {PRESTATIONS.map((p) => (
            <li key={p.titre} className="bg-[var(--fond)] p-6 space-y-2">
              <h3 className="text-3xl">{p.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{p.texte}</p>
            </li>
          ))}
        </ul>
      </Section>

      <div className="bg-[var(--sombre)]">
        <Section id="prix" className="space-y-10">
          <div className="grid gap-5 md:grid-cols-2 md:items-end">
            <div className="space-y-6">
              <Surtitre>Nos prix</Surtitre>
              <h2 className="text-[46px] sm:text-7xl leading-[1]">Hors taxes, comme vos factures.</h2>
            </div>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Nos clients sont des entreprises&nbsp;: nos prix sont hors taxes, TVA à 20&nbsp;% en sus. Ce
              sont des exemples&nbsp;; le prix ferme vient au devis, après une visite.
            </p>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {PRIX.map((p) => (
              <li key={p.taille} className="rounded-[24px] border border-[var(--trait)] p-6 space-y-6">
                <div>
                  <h3 className="text-3xl">{p.taille}</h3>
                  <p className="text-[var(--doux)]">{p.passages}</p>
                </div>
                <p>
                  <span className="font-[family-name:var(--titres)] text-5xl tabular-nums whitespace-nowrap">{p.prix}</span>
                  {p.prix !== "Sur devis" && <span className="block text-sm text-[var(--doux)]">HT par mois · exemple</span>}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <Surtitre>Notre affiche</Surtitre>
          <h2 className="text-[46px] sm:text-7xl leading-[1]">Dans les halls de bureaux.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Une seule affiche, posée avec l'accord du gestionnaire de l'immeuble. Et c'est vrai pour
            tous nos contrats&nbsp;: on passe le soir, après votre départ.
          </p>
          <Link href={`${DOSSIER}/un-bureau-la-nuit`} className="inline-block text-lg underline underline-offset-8 decoration-[var(--accent)]">Notre série : un bureau, la nuit</Link>
        </div>
        <Affiche />
      </Section>

      <div className="bg-[var(--carte)]">
        <Section id="questions" className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <Surtitre>Questions</Surtitre>
            <h2 className="text-[46px] sm:text-7xl leading-[1]">Ce qu'on nous demande.</h2>
            <div className="relative mt-6 hidden aspect-[2/3] max-w-xs overflow-hidden rounded-[24px] lg:block">
              <Image src={photos.lampe.src} alt={photos.lampe.alt} fill sizes="320px" className="object-cover" />
            </div>
          </div>
          <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {QUESTIONS.map((q) => (
              <details key={q.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--titres)] text-[26px] leading-snug">
                  {q.q}
                  <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--accent)] text-[var(--accent-texte)] font-[family-name:var(--texte)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[17px] leading-relaxed text-[var(--doux)]">{q.r}</p>
              </details>
            ))}
          </div>
        </Section>
      </div>

      <AppelFinal />
    </>
  );
}
