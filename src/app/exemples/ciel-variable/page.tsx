import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { BULLETINS, DOSSIER, ETAPES, FORMULES, QUESTIONS, ferme } from "./_composants/donnees";
import { Faits, Picto, Semaine } from "./_composants/Meteo";
import PanierSemaine from "./_composants/PanierSemaine";
import { Faq, Libelle, Titre } from "./_composants/Blocs";

// L'accueil : pas de catalogue. Le bulletin de la semaine d'abord — ce que le ciel a
// fait —, puis le panier qui en découle, le lundi en vidéo, l'affiche, les formules,
// la méthode, les questions et le retrait.
export const metadata: Metadata = {
  title: "Ciel Variable — site de démonstration",
  description: "Site de démonstration d'une ferme imaginaire, réalisé par Canevas Havane : pas de catalogue, le bulletin météo de la semaine et le panier qui va avec.",
  ...adressesDeLaPage("/exemples/ciel-variable"),
};

const B = BULLETINS[0];

export default function CielVariable() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <Image
          src="/exemples/ciel-variable/champ-dans-la-brume.webp"
          alt="Des rangs de légumes qui disparaissent dans le brouillard"
          width={1600}
          height={899}
          sizes="100vw"
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover object-bottom"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(238,243,245,0.92)_0%,rgba(238,243,245,0.75)_55%,rgba(238,243,245,0.2)_100%)]" />
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 sm:pb-40 sm:pt-24">
          <Libelle>Ciel Variable · ferme maraîchère</Libelle>
          <Titre niveau={1} className="mt-5 max-w-4xl text-[44px] sm:text-[80px]">
            Ce qui pousse dépend du ciel.
          </Titre>
          <p className="mt-6 max-w-md text-xl leading-snug">
            Ici, pas de catalogue. Chaque lundi, le bulletin de la semaine — et ce qu&apos;il a
            mis dans ton panier.
          </p>
          <a href="#bulletin" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--fond)] py-1 pl-1 pr-5 font-[family-name:var(--titres)] text-xs uppercase tracking-[0.24em]">
            <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full border border-[var(--encre)]">↓</span>
            Lire le bulletin n° {B.numero}
          </a>
        </div>
      </section>

      <section id="bulletin" className="scroll-mt-16 border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:py-20">
          <div className="space-y-5">
            <Libelle>Bulletin · semaine {B.numero}</Libelle>
            <Titre className="text-4xl sm:text-6xl">
              Ce que le ciel <span className="font-semibold">a fait</span>
            </Titre>
            <p className="text-lg text-[var(--doux)]">Semaine {B.semaine}. Relevés de la ferme, au pluviomètre et au thermomètre du champ.</p>
          </div>
          <div className="space-y-6">
            <Faits bulletin={B} />
            <Semaine bulletin={B} />
            <p className="text-sm text-[var(--doux)]">Relevés d&apos;exemple : la ferme est fictive.</p>
          </div>
        </div>
      </section>

      <section id="panier" className="scroll-mt-16 border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:py-20">
          <div className="space-y-5">
            <Libelle>Le panier de la semaine {B.numero}</Libelle>
            <Titre className="text-4xl sm:text-6xl">Donc, dans ton panier</Titre>
            <p className="text-lg text-[var(--doux)]">Touche un légume : on te dit pourquoi il y est, ou pourquoi il n&apos;y est pas.</p>
            <Link href={`${DOSSIER}/panier`} className="inline-block rounded-full bg-[var(--accent)] px-6 py-3.5 font-[family-name:var(--titres)] text-xs uppercase tracking-[0.2em] text-[var(--sur-accent)]">
              Réserver le panier de samedi
            </Link>
          </div>
          <PanierSemaine bulletin={B} />
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24">
          <div className="space-y-6">
            <Libelle clair>Pourquoi le ciel</Libelle>
            <Titre className="text-4xl sm:text-6xl">
              C&apos;est lui qui décide. <span className="text-[#E9C46A]">Pas nous.</span>
            </Titre>
            <p className="text-xl leading-snug text-[#D6E2EA]">
              Une ferme ne choisit pas ce qu&apos;elle récolte. Le gel prend une salade, la pluie
              fait gonfler les poireaux. Plutôt que de le cacher derrière un catalogue, on te
              le raconte. Ça ne vend pas des légumes : ça donne des nouvelles de ta ferme.
            </p>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[4px]">
            <Image
              src="/exemples/ciel-variable/givre.webp"
              alt="Des feuilles vertes prises dans le givre, au matin"
              width={1200}
              height={800}
              sizes="(min-width: 768px) 560px, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-label="L'affiche de la semaine" className="bg-[#E9C46A] text-[#1C2E3A]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-[family-name:var(--titres)] text-[11px] uppercase tracking-[0.32em]">L&apos;affiche · semaine {B.numero}</p>
          <p className="mt-6 max-w-4xl font-[family-name:var(--titres)] text-[40px] font-light uppercase leading-[1.02] sm:text-[72px]">
            Cette semaine, la pluie a choisi <span className="font-semibold">tes légumes.</span>
          </p>
          <p className="mt-6 font-[family-name:var(--titres)] text-xs uppercase tracking-[0.24em]">Ciel Variable · ferme</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-16 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-5">
            <Libelle>Chaque lundi</Libelle>
            <Titre className="text-4xl sm:text-6xl">Trente secondes de ciel</Titre>
            <p className="max-w-xl text-lg text-[var(--doux)]">
              Le lundi, une vidéo de trente secondes : le ciel de la semaine, et le panier qui
              va avec. Ici, sa version écrite.
            </p>
          </div>
          <Link href={`${DOSSIER}/bulletins`} className="font-[family-name:var(--titres)] text-xs uppercase tracking-[0.24em] underline underline-offset-8">
            Tous les bulletins
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {BULLETINS.map((b) => (
            <li key={b.numero} className="flex flex-col justify-between gap-10 rounded-[4px] border border-[var(--trait)] bg-[var(--carte)] p-6">
              <div className="flex items-start justify-between">
                <p className="font-[family-name:var(--titres)] text-xs uppercase tracking-[0.24em]">Lundi · n° {b.numero}</p>
                <Picto temps={b.faits[0].temps} className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <p className="font-[family-name:var(--titres)] text-2xl font-light uppercase leading-tight">{b.faits[0].titre}</p>
                <p className="text-[var(--doux)]">{b.phrase}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1fr] md:py-24">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] md:order-2">
            <Image
              src="/exemples/ciel-variable/poireaux.webp"
              alt="Trois poireaux posés sur une plaque de métal rouillé"
              width={900}
              height={1350}
              sizes="(min-width: 768px) 520px, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-8">
            <Libelle>Les paniers</Libelle>
            <Titre className="text-4xl sm:text-6xl">Deux tailles, un seul ciel</Titre>
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {FORMULES.map((f) => (
                <li key={f.nom} className="flex items-baseline justify-between gap-6 py-5">
                  <div>
                    <p className="font-[family-name:var(--titres)] text-xl uppercase">{f.nom}</p>
                    <p className="text-[var(--doux)]">{f.pour} · {f.detail}</p>
                  </div>
                  <p className="shrink-0 font-[family-name:var(--titres)] text-3xl font-light tabular-nums">{f.prix} €</p>
                </li>
              ))}
            </ul>
            <p className="text-sm text-[var(--doux)]">Prix TTC d&apos;exemple, par semaine. Rien n&apos;est payé d&apos;avance : tu règles au retrait.</p>
            <Link href={`${DOSSIER}/panier`} className="inline-block rounded-full bg-[var(--accent)] px-6 py-3.5 font-[family-name:var(--titres)] text-xs uppercase tracking-[0.2em] text-[var(--sur-accent)]">
              Réserver pour samedi
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-16 sm:px-6 md:py-24">
        <Libelle>La semaine d&apos;une ferme</Libelle>
        <ol className="grid gap-px overflow-hidden border border-[var(--trait)] bg-[var(--trait)] md:grid-cols-3">
          {ETAPES.map((e) => (
            <li key={e.jour} className="space-y-3 bg-[var(--fond)] p-6">
              <p className="font-[family-name:var(--titres)] text-[44px] font-light uppercase leading-none">{e.jour}</p>
              <h3 className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.2em]">{e.titre}</h3>
              <p className="text-lg leading-snug text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="questions" className="scroll-mt-16 border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:py-24">
          <div className="space-y-5">
            <Libelle>Questions</Libelle>
            <Titre className="text-4xl sm:text-6xl">Avant le premier panier</Titre>
          </div>
          <Faq questions={QUESTIONS} />
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 md:py-24">
          <div className="space-y-5">
            <Libelle>Le retrait</Libelle>
            <Titre className="text-4xl">À la ferme, le samedi</Titre>
          </div>
          <dl className="grid gap-8 sm:grid-cols-2 md:col-span-2">
            <div className="space-y-1">
              <dt><Libelle>Téléphone</Libelle></dt>
              <dd><a href={`tel:${ferme.telephoneLien}`} className="font-[family-name:var(--titres)] text-3xl font-light tabular-nums">{ferme.telephone}</a></dd>
            </div>
            <div className="space-y-1">
              <dt><Libelle>Adresse</Libelle></dt>
              <dd className="text-lg leading-snug">{ferme.adresse.map((l) => <span key={l} className="block">{l}</span>)}</dd>
            </div>
            <div className="space-y-1">
              <dt><Libelle>Retrait</Libelle></dt>
              <dd className="text-lg">{ferme.retrait.charAt(0).toUpperCase() + ferme.retrait.slice(1)}</dd>
            </div>
            <div className="space-y-1">
              <dt><Libelle>Le bulletin</Libelle></dt>
              <dd className="text-lg">Chaque lundi matin, ici et en vidéo.</dd>
            </div>
          </dl>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] sm:aspect-[16/9] md:col-span-3 md:aspect-[21/9]">
            <Image
              src="/exemples/ciel-variable/courges.webp"
              alt="Des courges d'hiver de toutes les couleurs, entassées"
              width={900}
              height={1200}
              sizes="100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-sm text-[var(--doux)] md:col-span-3">
            Numéro de la tranche que l&apos;ARCEP réserve à la fiction, adresse inventée : la ferme n&apos;existe pas.{" "}
            <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
