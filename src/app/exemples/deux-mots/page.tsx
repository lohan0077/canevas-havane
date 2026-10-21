import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CARTES, DOSSIER, ETAPES, MESSAGES, PHOTOS, QUESTIONS, boutique, euros } from "./_composants/donnees";
import ChoixMessage from "./_composants/ChoixMessage";
import { Faq, HeureLimite, Libelle } from "./_composants/Blocs";

// L'accueil : l'heure limite en gros, tout en haut ; puis une seule question, « c'est
// pour dire quoi ? », le bouquet et la phrase. Ensuite ce qu'un vrai fleuriste
// montre : les bouquets par ce qu'ils disent, les phrases, la livraison, l'atelier.
export const metadata: Metadata = {
  title: "Deux Mots — site de démonstration",
  description: "Site de démonstration d'un fleuriste imaginaire, réalisé par Canevas Havane : c'est pour dire quoi ? Le bouquet, et la phrase sur la carte, écrite à la main.",
  ...adressesDeLaPage("/exemples/deux-mots"),
};

export default function DeuxMots() {
  return (
    <main>
      <HeureLimite />

      <section id="choix" className="scroll-mt-16 bg-[linear-gradient(180deg,#F6D9B8_0%,#FBF1EA_70%)]">
        <div className="mx-auto max-w-6xl space-y-10 px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-3xl space-y-4">
            <Libelle>Ton bouquet</Libelle>
            <h1 className="text-[52px] sm:text-[88px]">
              C&apos;est pour dire <span className="italic text-[var(--accent-texte)]">quoi&nbsp;?</span>
            </h1>
            <p className="max-w-lg text-lg">Touche le mot. On s&apos;occupe des fleurs, et de la phrase sur la carte.</p>
          </div>
          <ChoixMessage />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[999px_999px_24px_24px] md:order-2">
          <Image src="/exemples/deux-mots/atelier.webp" alt="Une main tient des sécateurs sur un plan de travail en marbre, à côté d'un dahlia" width={1400} height={933} sizes="(min-width: 768px) 540px, 100vw" className="h-full w-full object-cover" />
        </div>
        <div className="space-y-6">
          <Libelle>Pourquoi Deux Mots</Libelle>
          <h2 className="text-5xl sm:text-6xl">
            Pas des fleurs. <span className="italic text-[var(--accent-texte)]">La phrase sur la carte.</span>
          </h2>
          <p className="text-lg leading-relaxed">
            Devant quarante bouquets qui s&apos;appellent Tendresse, Douceur ou Passion, on prend
            celui du milieu. Et on ne sait toujours pas quoi écrire. Ici, on commence par ce
            que tu veux dire. Les fleurs suivent.
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-6xl space-y-12 px-4 py-20 sm:px-6">
          <div className="max-w-2xl space-y-4">
            <Libelle>Les bouquets</Libelle>
            <h2 className="text-5xl sm:text-6xl">
              Six bouquets, <span className="italic text-[var(--accent-texte)]">nommés par ce qu&apos;ils disent.</span>
            </h2>
          </div>
          <ul className="grid gap-10 md:grid-cols-3">
            {(["jaune", "blanc", "rose"] as const).map((couleur) => (
              <li key={couleur} className="space-y-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-full">
                  <Image src={PHOTOS[couleur].src} alt={PHOTOS[couleur].alt} width={PHOTOS[couleur].largeur} height={PHOTOS[couleur].hauteur} sizes="(min-width: 768px) 340px, 100vw" className="h-full w-full object-cover" />
                </div>
                <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
                  {MESSAGES.filter((m) => m.couleur === couleur).map((m) => (
                    <li key={m.id} className="flex items-baseline justify-between gap-4 py-3">
                      <span>
                        <span className="block font-[family-name:var(--titres)] text-2xl italic leading-tight">« {m.dire} »</span>
                        <span className="text-sm text-[var(--doux)]">{m.bouquet}</span>
                      </span>
                      <span className="shrink-0 font-[family-name:var(--titres)] text-2xl [font-variant-numeric:lining-nums]">{euros(m.prix)}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--doux)]">Prix TTC d&apos;exemple. Les fleurs exactes dépendent de l&apos;arrivage du jour.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <Libelle>La carte</Libelle>
          <h2 className="text-5xl sm:text-6xl">
            Il ne cherche pas un bouquet. <span className="italic text-[var(--accent-texte)]">Il cherche ses mots.</span>
          </h2>
          <p className="text-lg leading-relaxed">Et c&apos;est toi qui les as. Des phrases toutes prêtes, pour chaque occasion — ou la tienne, écrite à la main.</p>
          <Link href={`${DOSSIER}/la-carte`} className="inline-flex items-center gap-3 rounded-full border border-[var(--encre)] py-2 pl-5 pr-2 font-semibold">
            Que mettre sur la carte&nbsp;?
            <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--encre)] text-[var(--fond)]">→</span>
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {CARTES.slice(0, 4).map((c, i) => (
            <li key={c.occasion} className={`rounded-[6px] bg-[var(--carte)] p-5 shadow-[0_18px_40px_-28px_rgba(58,14,28,0.5)] ${i % 2 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--doux)]">{c.occasion}</p>
              <p className="mt-2 font-[family-name:var(--f-caveat)] text-[28px] leading-[1.1]">{c.phrases[0]}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-end">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F3C9A8]">Livraison</p>
            <h2 className="text-5xl [font-variant-numeric:lining-nums] sm:text-6xl">
              Avant 14 h, <span className="italic text-[#F3C9A8]">c&apos;est aujourd&apos;hui.</span>
            </h2>
            <p className="text-lg leading-relaxed">
              On livre nous-mêmes, dans la ville et les communes voisines, du mardi au samedi.
              L&apos;heure limite est écrite en haut de chaque page : c&apos;est une promesse, alors on la tient.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-[rgba(251,239,234,0.2)]">
            {[
              ["Heure limite", "14 h"],
              ["Livraison", euros(boutique.livraison)],
              ["Jours", "mar.–sam."],
              ["Retrait", "gratuit"],
            ].map(([t, v]) => (
              <div key={t} className="bg-[var(--sombre)] p-5">
                <dt className="text-xs uppercase tracking-[0.18em] text-[#F3C9A8]">{t}</dt>
                <dd className="mt-1 font-[family-name:var(--titres)] text-3xl [font-variant-numeric:lining-nums]">{v}</dd>
              </div>
            ))}
          </dl>
          <Link href={`${DOSSIER}/livraison`} className="inline-flex w-fit items-center gap-3 rounded-full bg-[var(--sur-sombre)] py-2 pl-5 pr-2 font-semibold text-[var(--sombre)]">
            Ma rue est-elle livrée&nbsp;?
            <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)]">→</span>
          </Link>
          <p className="text-xs md:text-right">Tarif et heure limite d&apos;exemple : la boutique est fictive.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-4 py-20 sm:px-6">
        <div className="max-w-2xl space-y-4">
          <Libelle>Comment ça marche</Libelle>
          <h2 className="text-5xl sm:text-6xl">
            Trois gestes, <span className="italic text-[var(--accent-texte)]">et ta signature.</span>
          </h2>
        </div>
        <ol className="grid gap-6 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="space-y-3 border-t border-[var(--encre)] pt-5">
              <p className="font-[family-name:var(--titres)] text-5xl italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">0{i + 1}</p>
              <h3 className="text-2xl">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="questions" className="scroll-mt-16 border-t border-[var(--trait)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <Libelle>Questions</Libelle>
            <h2 className="text-5xl sm:text-6xl">Avant de <span className="italic text-[var(--accent-texte)]">signer.</span></h2>
          </div>
          <Faq questions={QUESTIONS} />
        </div>
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-3">
          <div className="space-y-4">
            <Libelle>La boutique</Libelle>
            <h2 className="text-5xl">Passe <span className="italic text-[var(--accent-texte)]">nous voir.</span></h2>
          </div>
          <dl className="grid gap-8 sm:grid-cols-2 md:col-span-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--doux)]">Téléphone</dt>
              <dd className="mt-1"><a href={`tel:${boutique.telephoneLien}`} className="font-[family-name:var(--titres)] text-3xl [font-variant-numeric:lining-nums]">{boutique.telephone}</a></dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--doux)]">Adresse</dt>
              <dd className="mt-1 text-lg leading-relaxed">{boutique.adresse.map((l) => <span key={l} className="block">{l}</span>)}</dd>
            </div>
            {boutique.horaires.map((h) => (
              <div key={h.jours}>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--doux)]">{h.jours}</dt>
                <dd className="mt-1 text-lg">{h.heures}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs text-[var(--doux)] md:col-span-3">
            Numéro de la tranche que l&apos;ARCEP réserve à la fiction, adresse inventée : la boutique n&apos;existe pas.{" "}
            <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
