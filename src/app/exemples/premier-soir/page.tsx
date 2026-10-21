import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CARTON, DOSSIER, JOUR_J, QUESTIONS, entreprise, photos } from "./_composants/donnees";
import { Affiche, AppelFinal, Section, Surtitre } from "./_composants/Blocs";
import { DessinCarton } from "./_composants/Carton";

export const metadata: Metadata = {
  title: "Premier Soir — site de démonstration",
  description: "Site de démonstration d'un déménageur imaginaire, réalisé par Canevas Havane : le carton du premier soir, et ce qu'on remonte avant de partir pour que tu dormes dans ton lit.",
  ...adressesDeLaPage("/exemples/premier-soir"),
};

export default function PremierSoir() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <Image src={photos.immeuble.src} alt={photos.immeuble.alt} width={photos.immeuble.largeur} height={photos.immeuble.hauteur} priority sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_35%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(29,43,79,.45)_0%,rgba(29,43,79,.25)_35%,rgba(20,30,58,.92)_72%,rgba(20,30,58,1)_100%)]" />
        <span aria-hidden="true" className="absolute right-6 top-8 h-16 w-16 rounded-full bg-[#F6EBD9] shadow-[0_0_60px_20px_rgba(246,235,217,.35)]" />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-[300px] sm:pt-[340px] pb-14 sm:pb-20 min-h-[720px] flex flex-col justify-end">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">Déménagements · Exemple-Ville</p>
          <h1 className="mt-4 text-[54px] sm:text-[96px] leading-[0.98] max-w-3xl">
            Ce soir, tu dors <span className="text-[var(--accent)]">dans ton lit.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed">
            Le pire moment d'un déménagement, ce n'est pas le camion. C'est le premier soir. Alors
            on remonte ton lit avant de partir, et ton carton orange arrive en premier.
          </p>
          <p className="mt-3 text-sm">Pour les déménagements livrés dans la journée · lit coché au devis</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`${DOSSIER}/ce-soir`} className="inline-flex h-14 items-center justify-center rounded-md bg-[var(--accent)] px-7 text-lg font-semibold text-[var(--sur-accent)]">
              On remonte quoi&nbsp;?
            </Link>
            <Link href={`${DOSSIER}/le-carton`} className="inline-flex h-14 items-center justify-center rounded-md border border-[var(--sur-sombre)] px-7 text-lg">
              Le carton orange
            </Link>
          </div>
        </div>
      </section>

      <Section className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[8px]">
          <Image src={photos.cartons.src} alt={photos.cartons.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <Surtitre>Le premier soir</Surtitre>
          <h2 className="text-[44px] sm:text-6xl leading-[1.02]">Des cartons partout, et le lit en pièces.</h2>
          <p className="text-lg leading-relaxed">
            Tout le monde vend des bras et un camion. Mais le soir venu, il faut retrouver les
            draps, la brosse à dents, le chargeur — et remonter le lit, fatigué, avec une clé
            Allen introuvable. Nous, on ne vend pas un déménagement. On vend le premier soir.
          </p>
        </div>
      </Section>

      <div className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <Section className="grid gap-12 md:grid-cols-2 md:items-center">
          <DessinCarton className="scale-110 md:scale-125" />
          <div className="space-y-5">
            <Surtitre>Le carton orange</Surtitre>
            <h2 className="text-[44px] sm:text-6xl leading-[1.02]">Chargé en dernier, déchargé en premier.</h2>
            <p className="text-lg leading-relaxed">Le matin du jour J, on t'apporte un carton orange. Le carton du premier soir. Dedans&nbsp;:</p>
            <ul className="grid grid-cols-2 gap-2">
              {CARTON.map((c) => (
                <li key={c} className="rounded-xl border border-[var(--trait)] bg-[var(--fond)] px-4 py-3 font-semibold">{c}</li>
              ))}
            </ul>
            <Link href={`${DOSSIER}/le-carton`} className="inline-block text-lg underline underline-offset-4 decoration-[var(--accent)] decoration-2">Composer mon carton</Link>
          </div>
        </Section>
      </div>

      <Section className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-5">
          <Surtitre>Avant de partir</Surtitre>
          <h2 className="text-[44px] sm:text-6xl leading-[1.02]">Tu coches ce qu'on remonte. On le remonte.</h2>
          <p className="text-lg leading-relaxed">
            Le lit, le berceau, la table&nbsp;: sur le site, tu coches ce qu'on remonte avant de
            partir. C'est écrit au devis, avec le temps que ça prend. Ce qui est coché est monté
            avant qu'on parte&nbsp;; ce qui ne l'est pas, on ne le promet pas.
          </p>
          <Link href={`${DOSSIER}/ce-soir`} className="inline-flex h-14 items-center justify-center rounded-md bg-[var(--sombre)] px-7 text-lg font-semibold text-[var(--sur-sombre)]">
            Cocher mes meubles
          </Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[8px]">
          <Image src={photos.lit.src} alt={photos.lit.alt} fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover" />
        </div>
      </Section>

      <div id="promesse" className="bg-[var(--sombre)] text-[var(--sur-sombre)] scroll-mt-16">
        <Section className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">La promesse, et sa limite</p>
            <h2 className="text-[44px] sm:text-6xl leading-[1.02]">On promet ce qu'on tient. Pas plus.</h2>
            <p className="text-lg leading-relaxed">
              « Ce soir, tu dors dans ton lit » vaut pour un déménagement livré dans la journée. Plus
              loin, ou plus gros, il est livré le lendemain&nbsp;: on te le dit au devis, avant que tu
              signes.
            </p>
          </div>
          <ul className="space-y-3 self-end">
            {[
              ["Livré dans la journée", `Moins de ${entreprise.seuilKm} km et ${entreprise.seuilM3} m³ (exemple), accès possible au camion.`],
              ["Seul ce qui est coché", "Le lit — et ce que tu as coché — est monté avant qu'on parte. Le reste n'est pas promis."],
              ["Plus loin : le lendemain", "On remonte à la livraison, et le carton orange voyage avec toi pour ta nuit sur place."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-[14px] border border-[var(--sur-sombre)]/30 p-4 space-y-1">
                <p className="font-[family-name:var(--titres)] text-2xl">{t}</p>
                <p className="leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section className="space-y-10">
        <div className="max-w-2xl space-y-3">
          <Surtitre>Le jour J</Surtitre>
          <h2 className="text-[44px] sm:text-6xl leading-[1.02]">Du carton orange au lit monté.</h2>
          <p className="text-[var(--doux)]">Un exemple de journée, pour un T2 à 20&nbsp;km.</p>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-[14px] border border-[var(--trait)] bg-[var(--trait)] md:grid-cols-5">
          {JOUR_J.map((j) => (
            <li key={j.heure} className="bg-[var(--carte)] p-5 space-y-2">
              <p className="font-[family-name:var(--titres)] text-3xl text-[var(--accent-texte)] tabular-nums">{j.heure}</p>
              <h3 className="text-xl leading-snug">{j.quoi}</h3>
              <p className="text-[15px] leading-relaxed text-[var(--doux)]">{j.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <div className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <Section className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Surtitre>Le devis</Surtitre>
            <h2 className="text-[44px] sm:text-6xl leading-[1.02]">Gratuit, écrit, et tout y est.</h2>
            <p className="text-lg leading-relaxed">
              Avant tout contrat, tu reçois un devis gratuit&nbsp;: la prestation exacte — dont ce
              qu'on remonte et le carton orange —, le montant HT et TTC, et la mention que ce prix
              est définitif.
            </p>
            <p className="rounded-[14px] border border-[var(--trait)] bg-[var(--fond)] p-4">
              Exemple&nbsp;: T2, 18&nbsp;m³, 20&nbsp;km, lit et berceau remontés —{" "}
              <strong className="whitespace-nowrap">741,67&nbsp;€ HT</strong>, soit{" "}
              <strong className="whitespace-nowrap">890,00&nbsp;€ TTC</strong>. Prix d'exemple.
            </p>
          </div>
          <Affiche />
        </Section>
      </div>

      <Section id="questions" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-[44px] sm:text-6xl leading-[1.02]">Ce qu'on nous demande.</h2>
          <div className="relative mt-6 hidden aspect-[2/3] max-w-xs overflow-hidden rounded-[8px] lg:block">
            <Image src={photos.lampe.src} alt={photos.lampe.alt} fill sizes="320px" className="object-cover" />
          </div>
        </div>
        <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {QUESTIONS.map((q) => (
            <details key={q.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--titres)] text-2xl leading-snug">
                {q.q}
                <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] font-[family-name:var(--texte)] text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[17px] leading-relaxed text-[var(--doux)]">{q.r}</p>
            </details>
          ))}
        </div>
      </Section>

      <AppelFinal />
    </>
  );
}
