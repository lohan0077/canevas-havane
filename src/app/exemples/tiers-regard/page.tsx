import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { Certification, CommeTous, Etiquette, Intitule, Section } from "./_composants/Blocs";
import Regard from "./_composants/Regard";
import { CITATION, DOSSIER, FAQ, INTERETS, METHODE, RAPPORT, TARIFS, cabinet, euros } from "./_composants/donnees";

// L'accueil de Tiers Regard. Les idées de la vidéo, en état de marche : dans une vente,
// tout le monde a un intérêt ; le diagnostiqueur, aucun, et c'est la loi pour tous (CCH
// L271-6, dit « comme tout diagnostiqueur ») ; « Je dis ce que je vois » ; le rapport
// traduit en une page ; l'affiche « Aucun intérêt à ce que ta maison soit belle ».
export const metadata: Metadata = {
  title: "Tiers Regard — site de démonstration",
  description: "Site de démonstration d'un diagnostiqueur immobilier imaginaire, réalisé par Canevas Havane : je dis ce que je vois, et ton rapport tient en une page.",
  ...adressesDeLaPage("/exemples/tiers-regard"),
};

const BOUTON = "inline-flex h-12 items-center justify-between gap-3 rounded-[6px] pl-5 pr-2 text-[13px] font-medium uppercase tracking-[0.16em]";

export default function TiersRegard() {
  const exemple = TARIFS.slice(0, 3).reduce((t, x) => t + x.prix, 0);
  return (
    <>
      <section id="regard" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16 pt-10 sm:px-8 sm:pt-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <Etiquette>Diagnostic immobilier · vente et location</Etiquette>
              <h1 className="font-[family-name:var(--titres)] text-[54px] font-semibold leading-[0.95] tracking-[-0.035em] sm:text-[92px]">
                Je dis ce que <span className="text-[var(--accent-texte)]">je&nbsp;vois.</span>
              </h1>
            </div>
            <div className="space-y-5">
              <p className="text-[17px] leading-relaxed text-[var(--doux)]">
                Dans une vente, tout le monde a un intérêt. Le diagnostiqueur, aucun : c&apos;est la loi,
                pour tous. Nous, on en a fait notre façon de travailler.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={`${DOSSIER}/une-page`} className={`${BOUTON} bg-[var(--accent)] text-[var(--sur-accent)]`}>
                  Ton rapport en une page
                  <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-[4px] bg-[var(--sur-accent)] text-[var(--accent)]">↗</span>
                </Link>
                <Link href={`${DOSSIER}/rendez-vous`} className={`${BOUTON} border border-[var(--encre)]`}>
                  Prendre rendez-vous
                  <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-[4px] border border-[var(--trait)]">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Etiquette>Ce qu&apos;on regarde · touche un point</Etiquette>
            <Regard />
          </div>
        </div>
      </section>

      <Section className="space-y-10">
        <Intitule numero="01" etiquette="Les intérêts d'une vente" titre={<>Tout le monde a <span className="text-[var(--accent-texte)]">un intérêt.</span></>} />
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {INTERETS.map((r) => (
            <li key={r.qui} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
              <span className="font-[family-name:var(--titres)] text-[28px] font-semibold tracking-[-0.02em] sm:text-[38px]">{r.qui}</span>
              <span className="text-[17px] text-[var(--doux)]">{r.veut}</span>
            </li>
          ))}
          <li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
            <span className="font-[family-name:var(--titres)] text-[28px] font-semibold tracking-[-0.02em] text-[var(--accent-texte)] sm:text-[38px]">Le diagnostiqueur</span>
            <span className="text-[17px]">n&apos;en a aucun. C&apos;est la loi, pour tous.</span>
          </li>
        </ul>
        <figure className="max-w-3xl space-y-3 border-l-2 border-[var(--accent)] pl-5">
          <blockquote className="font-[family-name:var(--titres)] text-[24px] font-medium leading-snug sm:text-[30px]">«&nbsp;{CITATION}&nbsp;»</blockquote>
          <figcaption className="text-[14px] text-[var(--doux)]">
            Code de la construction et de l&apos;habitation, art. L271-6 (extrait) · envers le propriétaire,
            son mandataire et les entreprises de travaux. Une obligation de tous les diagnostiqueurs.
          </figcaption>
        </figure>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Intitule numero="02" etiquette="Le rapport" titre={<>Ton rapport, en <span className="text-[var(--accent-texte)]">une seule page.</span></>}>
          Des dizaines de pages, traduites en une : ce qui va, ce qui cloche. En clair, ou mot pour mot.
          Le rapport complet reste joint, et c&apos;est lui qui fait foi.
        </Intitule>
        <Link href={`${DOSSIER}/une-page`} className="group block space-y-3 rounded-[10px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-6">
          <span className="flex items-start justify-between gap-4">
            <span>
              <span className="block text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--doux)]">Ton rapport · exemple</span>
              <span className="mt-1 block font-[family-name:var(--titres)] text-[26px] font-semibold leading-tight tracking-[-0.02em]">Ta maison, en une page</span>
            </span>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[8px] bg-[#F4E70F] font-[family-name:var(--titres)] text-[28px] font-bold text-[#111111]">{RAPPORT.lettre}</span>
          </span>
          <span className="grid gap-3 sm:grid-cols-2">
            <span className="rounded-[8px] border border-[var(--trait)] p-4">
              <span className="block text-[12px] font-medium uppercase tracking-[0.18em] text-[#5CCB7F]">Ce qui va</span>
              {RAPPORT.va.map((l) => <span key={l.id} className="mt-2 block text-[16px]">{l.titre}</span>)}
            </span>
            <span className="rounded-[8px] border border-[var(--trait)] p-4">
              <span className="block text-[12px] font-medium uppercase tracking-[0.18em] text-[#FF8A5C]">Ce qui cloche</span>
              {RAPPORT.cloche.map((l) => <span key={l.id} className="mt-2 block text-[16px]">{l.titre}</span>)}
            </span>
          </span>
          <span className="flex items-center justify-between pt-1 text-[13px] font-medium uppercase tracking-[0.16em] text-[var(--accent-texte)]">
            Ouvrir la page
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </Link>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <Etiquette>03 · Notre affiche</Etiquette>
          <h2 className="font-[family-name:var(--titres)] text-[44px] font-semibold leading-[0.98] tracking-[-0.03em] sm:text-[76px]">
            Aucun intérêt à ce que ta maison soit <span className="text-[var(--accent-texte)]">belle.</span>
          </h2>
          <p className="max-w-xl text-[17px] leading-relaxed text-[var(--doux)]">
            Pas de mots pour adoucir, pas de mots pour inquiéter. Ce qu&apos;on voit, on l&apos;écrit :
            ni plus beau, ni plus grave. C&apos;est ce qui rend un diagnostic utile, au vendeur
            comme à l&apos;acheteur.
          </p>
          <CommeTous className="max-w-xl" />
        </div>
        <figure className="relative aspect-[3/2] overflow-hidden rounded-[10px] border border-[var(--trait)]">
          <Image src="/exemples/tiers-regard/prise-ancienne.webp" alt="Une vieille prise ronde en porcelaine sur un mur à la peinture écaillée" fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
          <figcaption className="absolute bottom-3 left-3 rounded-[4px] bg-[#0F141C]/90 px-2.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#F3F4F6]">
            Vu · écrit tel quel
          </figcaption>
        </figure>
      </Section>

      <Section id="prix" className="space-y-10">
        <Intitule numero="04" etiquette="Les prix" titre={<>Les prix, <span className="text-[var(--accent-texte)]">avant de réserver.</span></>}>
          Toutes taxes comprises, par diagnostic. Un diagnostic qui ne concerne pas ton bien n&apos;est ni
          fait, ni facturé. Prix d&apos;exemple.
        </Intitule>
        <div className="overflow-hidden rounded-[10px] border border-[var(--trait)]">
          <table className="w-full text-left">
            <caption className="sr-only">Prix des diagnostics, toutes taxes comprises, exemple</caption>
            <thead className="bg-[var(--carte)] text-[12px] uppercase tracking-[0.16em] text-[var(--doux)]">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium sm:px-6">Diagnostic</th>
                <th scope="col" className="px-4 py-3 text-right font-medium sm:px-6">TTC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--trait)]">
              {TARIFS.map((t) => (
                <tr key={t.nom}>
                  <th scope="row" className="px-4 py-4 font-normal sm:px-6">
                    <span className="block font-[family-name:var(--titres)] text-[20px] font-semibold">{t.nom}</span>
                    <span className="block text-[14px] text-[var(--doux)]">{t.condition}</span>
                  </th>
                  <td className="px-4 py-4 text-right font-[family-name:var(--titres)] text-[22px] font-semibold tabular-nums sm:px-6">{euros(t.prix)}</td>
                </tr>
              ))}
              <tr>
                <th scope="row" className="px-4 py-4 font-normal sm:px-6">
                  <span className="block font-[family-name:var(--titres)] text-[20px] font-semibold">Audit énergétique</span>
                  <span className="block text-[14px] text-[var(--doux)]">Pour vendre une maison classée E, F ou G</span>
                </th>
                <td className="px-4 py-4 text-right text-[16px] font-medium sm:px-6">sur devis</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[15px] text-[var(--doux)]">
          Exemple : une maison avec un permis de 1985, à vendre → DPE, amiante et électricité,{" "}
          <span className="font-medium text-[var(--encre)]">{euros(exemple)} TTC</span>. Conditions : Service-Public,
          fiche F10798 (vérifiée le 07/03/2025).
        </p>
      </Section>

      <Section className="space-y-10">
        <Intitule numero="05" etiquette="La méthode" titre={<>Du rendez-vous <span className="text-[var(--accent-texte)]">à la page.</span></>} />
        <ol className="grid gap-px overflow-hidden rounded-[10px] border border-[var(--trait)] bg-[var(--trait)] sm:grid-cols-2 lg:grid-cols-4">
          {METHODE.map((m, i) => (
            <li key={m.titre} className="space-y-3 bg-[var(--fond)] p-6">
              <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--accent-texte)]">Étape 0{i + 1}</p>
              <h3 className="font-[family-name:var(--titres)] text-[24px] font-semibold tracking-[-0.02em]">{m.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-8">
          <Intitule numero="06" etiquette="Certifiée, assurée" titre={<>Qui vient <span className="text-[var(--accent-texte)]">chez toi.</span></>} />
          <Certification />
        </div>
        <figure className="relative aspect-[3/2] overflow-hidden rounded-[10px] border border-[var(--trait)]">
          <Image src="/exemples/tiers-regard/prise-ouverte.webp" alt="Une prise électrique démontée dans un mur blanc, son mécanisme à nu" fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          <figcaption className="absolute bottom-3 left-3 rounded-[4px] bg-[#0F141C]/90 px-2.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#F3F4F6]">
            <span className="text-[#F5D90A]">Électricité</span> · installation de plus de 15 ans
          </figcaption>
        </figure>
      </Section>

      <Section id="questions" className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Intitule numero="07" etiquette="Questions" titre={<>Ce qu&apos;on nous <span className="text-[var(--accent-texte)]">demande.</span></>} />
        <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-[family-name:var(--titres)] text-[20px] font-semibold leading-snug">
                {f.q}
                <span aria-hidden="true" className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-[4px] border border-[var(--trait)] text-[16px] text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--doux)]">{f.r}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="border-t border-[var(--trait)] bg-[var(--accent)] text-[var(--sur-accent)]">
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-16 sm:px-8 sm:py-24">
          <p className="font-[family-name:var(--titres)] text-[22px] font-medium tracking-[-0.01em] sm:text-[30px]">Tout le monde la veut belle.</p>
          <h2 className="font-[family-name:var(--titres)] text-[52px] font-semibold leading-[0.95] tracking-[-0.035em] sm:text-[96px]">Nous, on la veut vraie.</h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={`${DOSSIER}/rendez-vous`} className={`${BOUTON} bg-[var(--sur-accent)] text-[var(--accent)]`}>
              Prendre rendez-vous
              <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-[4px] bg-[var(--accent)] text-[var(--sur-accent)]">↗</span>
            </Link>
            <p className="text-[15px]">
              Ou appelle le <a href={`tel:${cabinet.telephone.replace(/ /g, "")}`} className="font-medium underline underline-offset-4">{cabinet.telephone}</a> · numéro de fiction
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
