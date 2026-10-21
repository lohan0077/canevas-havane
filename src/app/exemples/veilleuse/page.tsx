import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ETAPES, OFFRES, QUESTIONS, entreprise, photos } from "./_composants/donnees";
import Affiche from "./_composants/Affiche";
import EspaceClient from "./_composants/EspaceClient";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une société de
// sécurité de zéro » : pas de bouclier, pas d'aigle, pas de noir — une veilleuse.
// Le client ne veut pas avoir peur, il veut dormir ; et chaque soir, son espace
// client lui dit qui vient, avec les références de sa carte professionnelle.
// Ouverture inspirée du modèle « Camper Overnight » de MotionSites (une nuit en
// grand, un titre serif clair, un seul bouton chaud), transposée à la veille de nuit.
export const metadata: Metadata = {
  title: "Veilleuse — site de démonstration",
  description: "Site de démonstration d'une marque de sécurité privée imaginaire, réalisé par Canevas Havane : on veille, tu dors — et tu sais qui vient ce soir.",
  ...adressesDeLaPage("/exemples/veilleuse"),
};

const PAS = ["Pas de bouclier.", "Pas d'aigle.", "Pas de nom en anglais."];

export default function Veilleuse() {
  return (
    <div>
      {/* La nuit, en grand : le titre, puis la lune au-dessus des sapins. */}
      <section className="bg-[#1A2B24] text-[var(--sur-sombre)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-12 sm:pt-20 lg:pb-20 grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-7 relative z-10">
            <p className="inline-flex w-fit items-center gap-2.5 rounded-full bg-[#23382F] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_4px_rgba(244,201,93,0.6)] motion-safe:animate-pulse" />
              Sécurité privée · {entreprise.ville}
            </p>
            <h1 className="text-[64px] sm:text-8xl lg:text-9xl font-normal leading-[0.95]">
              On veille.
              <span className="block text-[var(--accent)]">Tu dors.</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-[#E4DCCB]">
              Veilleuse garde ta maison quand tu pars, ton commerce la nuit, ton chantier le
              week-end. Et chaque soir, tu sais qui vient.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`${DOSSIER}/ce-soir`} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-4 font-bold text-center">Qui vient ce soir&nbsp;?</Link>
              <Link href={`${DOSSIER}/nos-nuits`} className="rounded-full border-2 border-[var(--sur-sombre)] px-7 py-[14px] font-bold text-center">Nos nuits et nos prix</Link>
            </div>
          </div>
          {/* La lune est à 44 % de la hauteur de la photo, les sapins à partir de 55 %. */}
          <div aria-hidden="true" className="relative -mx-5 sm:mx-0 h-[380px] sm:h-[520px] lg:h-[640px] lg:rounded-[36px] lg:overflow-hidden">
            <Image src={photos.lune.src} alt="" fill preload loading="eager" sizes="(min-width: 1024px) 520px, 100vw" className="object-cover object-[50%_42%]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#1A2B24_0%,rgba(26,43,36,0)_35%)] lg:hidden" />
          </div>
        </div>
      </section>

      {/* Le contre-pied. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Pourquoi une veilleuse</p>
          <h2 className="text-[42px] sm:text-6xl font-normal leading-[1.02]">
            Tu ne veux pas avoir peur. <span className="text-[var(--accent-texte)]">Tu veux dormir.</span>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-[var(--doux)]">
            Comme la petite lumière qui reste allumée toute la nuit dans une chambre
            d&apos;enfant : elle ne fait pas peur, elle rassure. C&apos;est tout ce qu&apos;on veut être.
          </p>
        </div>
        <div className="space-y-4">
          <ul className="space-y-2">
            {PAS.map((p) => (
              <li key={p} className="font-[family-name:var(--titres)] text-3xl line-through decoration-[var(--accent)] decoration-[3px]">{p}</li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-[var(--doux)]">
            La loi va dans le même sens : rien, dans le nom ou le logo d&apos;une société de
            sécurité privée, ne doit prêter à confusion avec la police (Code de la sécurité
            intérieure, art. L612-3 et R631-12).
          </p>
        </div>
      </section>

      {/* L'espace client : qui vient ce soir. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Ton espace client</p>
            <h2 className="text-[42px] sm:text-6xl font-normal leading-[1.02]">Qui vient ce soir. <span className="text-[var(--accent)]">Son prénom.</span></h2>
            <p className="text-lg leading-relaxed text-[#C9C2B3]">
              Et les références de sa carte professionnelle. La loi te permet de les
              demander&nbsp;: on te les donne avant que tu demandes, dans ton espace, et
              nulle part ailleurs.
            </p>
            <Link href={`${DOSSIER}/ce-soir`} className="inline-flex rounded-full border-2 border-[var(--sur-sombre)] px-6 py-3.5 font-bold">Ouvrir l&apos;espace d&apos;exemple</Link>
          </div>
          <EspaceClient />
        </div>
      </section>

      {/* Avant même qu'il demande. */}
      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-20 sm:py-28 text-center space-y-8">
        <p className="font-[family-name:var(--titres)] text-[38px] sm:text-6xl leading-[1.05]">
          La loi te permet de demander.{" "}
          <span className="text-[var(--accent-texte)]">On te le dit avant.</span>
        </p>
        <blockquote className="mx-auto max-w-2xl rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] p-6 text-left space-y-3">
          <p className="text-[17px] leading-relaxed">
            Qui a recours à une entreprise de sécurité privée « peut demander communication
            des références de la carte professionnelle de chacun des employés participant à
            l&apos;exécution de la prestation. »
          </p>
          <footer className="text-sm text-[var(--doux)]">Code de la sécurité intérieure, art. L612-15</footer>
        </blockquote>
      </section>

      {/* La maison, quand tu pars. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28">
        <figure className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-[32px] bg-[#1A2B24]">
            <Image src={photos.maison.src} alt={photos.maison.alt} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
          </div>
          <figcaption className="space-y-3">
            <p className="font-[family-name:var(--titres)] text-3xl leading-tight">Tu pars une semaine.</p>
            <p className="text-lg leading-relaxed text-[var(--doux)]">Deux ou trois passages par nuit, le portail et les volets vérifiés, une photo à chaque fois. Le matin, un mot&nbsp;: «&nbsp;Nuit calme.&nbsp;»</p>
          </figcaption>
        </figure>
      </section>

      {/* Nos nuits. */}
      <section className="bg-[#E9DFCB]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24 space-y-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Nos nuits</p>
              <h2 className="text-[42px] sm:text-6xl font-normal leading-[1.02]">Ce qu&apos;on veille.</h2>
            </div>
            <Link href={`${DOSSIER}/nos-nuits`} className="font-bold underline underline-offset-4 decoration-2">Tous les prix →</Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {OFFRES.map((o) => (
              <li key={o.titre} className="rounded-[26px] bg-[var(--fond)] p-6 sm:p-7 flex flex-col gap-4">
                <h3 className="text-[30px] font-normal leading-tight">{o.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)] flex-1">{o.texte}</p>
                <p className="flex flex-wrap items-baseline justify-between gap-2 border-t border-[var(--trait)] pt-4">
                  <span className="font-bold">{o.prix}</span>
                  <span className="text-sm text-[var(--doux)]">exemple · {o.pour}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comment ça se passe. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-12">
        <h2 className="text-[42px] sm:text-6xl font-normal leading-[1.02] max-w-2xl">Trois choses, <span className="text-[var(--accent-texte)]">et tu dors.</span></h2>
        <ol className="grid gap-5 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <li key={e.titre} className="rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-4">
              <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-[var(--sombre)] font-[family-name:var(--titres)] text-2xl text-[var(--accent)]">{i + 1}</span>
              <h3 className="text-2xl font-normal">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* L'affiche de lancement. */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Bientôt sur les murs</p>
            <h2 className="text-[42px] sm:text-6xl font-normal leading-[1.02]">Une seule affiche.</h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Quatre mots, une lune. Et en bas, comme sur tout ce que nous publions, le
              numéro de notre autorisation et la phrase que la loi impose.
            </p>
          </div>
          <Affiche />
        </div>
      </section>

      {/* Questions. */}
      <section id="questions" className="scroll-mt-20 max-w-4xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-10">
        <h2 className="text-[42px] sm:text-6xl font-normal leading-[1.02]">Tes questions, <span className="text-[var(--accent-texte)]">la nuit.</span></h2>
        <div className="space-y-3">
          {QUESTIONS.map((q) => (
            <details key={q.question} className="group rounded-[22px] bg-[var(--carte)] border border-[var(--trait)] px-5 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-bold text-lg [&::-webkit-details-marker]:hidden">
                {q.question}
                <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--sombre)] text-[var(--accent)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-5 leading-relaxed text-[var(--doux)]">{q.reponse}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Bonne nuit. */}
      <section className="bg-[#1A2B24] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[30px] lg:order-2">
          <Image src={photos.chevet.src} alt={photos.chevet.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-7">
          <h2 className="text-[56px] sm:text-8xl font-normal leading-[0.98]">Bonne <span className="text-[var(--accent)]">nuit.</span></h2>
          <p className="max-w-md text-lg leading-relaxed text-[#E4DCCB]">On passe voir de jour, gratuitement. Tu nous dis ce qui compte ; on s&apos;occupe du reste, la nuit.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`tel:${entreprise.telephoneLien}`} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-4 font-bold text-center">{entreprise.telephone}</a>
            <Link href={`${DOSSIER}/nos-nuits`} className="rounded-full border-2 border-[var(--sur-sombre)] px-7 py-[14px] font-bold text-center">Calculer mes nuits</Link>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
