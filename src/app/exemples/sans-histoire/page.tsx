import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { BESOINS, DOSSIER, METHODE, QUESTIONS, entreprise, photos } from "./_composants/donnees";
import { Intitule, Questions } from "./_composants/Blocs";
import RapportDeNuit from "./_composants/RapportDeNuit";

// Le site imaginé dans la vidéo « Si je devais remplir le carnet de commandes d'une
// société de sécurité » : pas de peur, pas d'agent bras croisés — un lundi matin où
// il ne s'est rien passé, le rapport de la nuit à 7 h, un devis en trois questions,
// une page par besoin, et les mentions du CNAPS en évidence au pied de chaque page.
// Mise en page inspirée du modèle « TrustFlow » de MotionSites (grand titre centré
// sur fond clair, image et carte qui se chevauchent), transposée au gardiennage.
export const metadata: Metadata = {
  title: "Sans Histoire — site de démonstration",
  description: "Site de démonstration d'une société de sécurité privée imaginaire, réalisé par Canevas Havane : le rapport de la nuit à 7 h, un devis en trois questions.",
  ...adressesDeLaPage("/exemples/sans-histoire"),
};

const PROMESSES = [
  { titre: "Des nuits sans histoire", texte: "Des rondes à heures variables, des consignes écrites, un agent qui connaît le site avant d'y passer la nuit." },
  { titre: "Un rapport chaque matin", texte: "À 7 h : l'heure de chaque ronde, ce qui a été vérifié, une photo du site à chaque passage." },
  { titre: "Des prix en clair", texte: "Une fourchette en trois questions, sur le site. Le prix ferme après une visite, gratuite." },
];

const RECHERCHES = ["gardiennage chantier prix", "agent de sécurité mariage prix", "agent de sécurité événementiel prix"];

export default function SansHistoire() {
  return (
    <div>
      {/* L'ouverture : la page d'éphéméride du lundi matin. */}
      <section className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 pt-12 sm:pt-20 text-center space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            Sécurité privée · {entreprise.ville}
          </p>
          <h1 className="text-[52px] leading-[0.98] sm:text-7xl lg:text-8xl font-normal tracking-[-0.02em]">
            Lundi, 7 h.
            <span className="block italic text-[var(--accent-texte)]">Rien à signaler.</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg leading-relaxed text-[var(--doux)]">
            On ne vend pas de la peur. On vend un lundi matin où il ne s&apos;est rien passé —
            et le rapport de la nuit qui le prouve, chaque matin à 7 h.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <Link href={`${DOSSIER}/devis`} className="w-full sm:w-auto rounded-full bg-[var(--encre)] text-[var(--fond)] px-7 py-4 font-semibold">Devis en 3 questions</Link>
            <a href="#rapport" className="w-full sm:w-auto rounded-full border border-[var(--encre)] px-7 py-4 font-semibold">Voir un rapport de nuit</a>
          </div>
        </div>
        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 mt-12 sm:mt-16">
          <div className="relative aspect-[4/5] sm:aspect-[16/9] overflow-hidden rounded-[30px]">
            <Image src={photos.aube.src} alt={photos.aube.alt} fill preload loading="eager" sizes="(min-width: 1024px) 960px, 100vw" className="object-cover object-[50%_70%]" />
          </div>
          <div className="relative -mt-24 sm:-mt-28 mx-3 sm:mx-auto sm:max-w-md rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] p-5 shadow-[0_24px_50px_-30px_rgba(30,35,38,0.5)]">
            <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em]">
              <span className="text-[var(--accent-texte)]">07 h 00 · Rapport</span>
              <span className="text-[var(--doux)]">exemple</span>
            </p>
            <p className="mt-2 font-[family-name:var(--titres)] text-2xl leading-snug">4 rondes. 4 photos. <span className="italic">Rien à signaler.</span></p>
            <p className="mt-1 text-sm text-[var(--doux)]">Chantier rue de l&apos;Exemple, Lyon 7e</p>
          </div>
        </div>
      </section>

      {/* Ce qu'on vend vraiment. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-14">
        <p className="font-[family-name:var(--titres)] text-[30px] sm:text-5xl leading-[1.12] max-w-4xl">
          Le client n&apos;achète pas des gros bras.{" "}
          <span className="italic text-[var(--accent-texte)]">Il achète des nuits sans histoire.</span>
        </p>
        <ul className="grid gap-8 md:grid-cols-3">
          {PROMESSES.map((p, i) => (
            <li key={p.titre} className="space-y-3 border-t border-[var(--encre)] pt-5">
              <p className="text-sm font-semibold tabular-nums text-[var(--doux)]">0{i + 1}</p>
              <h3 className="text-2xl font-normal">{p.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{p.texte}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Le rapport de 7 h, en état de marche. */}
      <section id="rapport" className="scroll-mt-20 bg-[#EDE8DD]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <Intitule surtitre="Le rapport de 7 h" titre={<>Chaque matin, <span className="italic">la nuit racontée.</span></>}>
              Les rondes, l&apos;heure, la photo. Le rapport arrive à 7 h, avant votre premier
              café. Faites glisser le curseur pour rejouer une nuit d&apos;exemple.
            </Intitule>
            <ul className="space-y-2 text-[15px]">
              <li className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">—</span>Des heures de ronde qui varient d&apos;une nuit à l&apos;autre.</li>
              <li className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">—</span>Une photo du site à chaque passage : jamais une personne.</li>
              <li className="flex gap-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">—</span>Ce qui mérite votre attention, en tête, s&apos;il y a quelque chose.</li>
            </ul>
          </div>
          <RapportDeNuit />
        </div>
      </section>

      {/* Le devis en trois questions. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24 space-y-12">
          <Intitule sombre surtitre="Le devis" titre={<>Trois questions. <span className="italic text-[#F0A47F]">Une fourchette.</span></>}>
            Pas de formulaire de vingt lignes, pas de « tarif sur demande ». Vous répondez,
            le site calcule, et le prix ferme vient après la visite.
          </Intitule>
          <ol className="grid gap-4 sm:grid-cols-3">
            {["Quoi ?", "Où ?", "Combien de nuits ?"].map((q, i) => (
              <li key={q} className="rounded-[22px] border border-[#4A5652] p-6 space-y-6">
                <p className="font-[family-name:var(--titres)] text-5xl italic text-[#F0A47F] tabular-nums">{i + 1}</p>
                <p className="font-[family-name:var(--titres)] text-2xl">{q}</p>
              </li>
            ))}
          </ol>
          <Link href={`${DOSSIER}/devis`} className="inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-4 font-semibold">Faire mon devis</Link>
        </div>
      </section>

      {/* Une page par besoin. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-12">
        <Intitule surtitre="Une page par besoin" titre={<>Vos mots, <span className="italic">pas les nôtres.</span></>}>
          Chaque besoin a sa page, écrite avec les mots que nos clients tapent avant
          d&apos;appeler&nbsp;:
        </Intitule>
        <ul className="flex flex-wrap gap-2">
          {RECHERCHES.map((r) => (
            <li key={r} className="rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 py-2 text-sm">
              <span aria-hidden="true" className="mr-2 text-[var(--doux)]">⌕</span>{r}
            </li>
          ))}
        </ul>
        <ul className="grid gap-4 sm:grid-cols-2">
          {BESOINS.map((b) => (
            <li key={b.titre} className="rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] p-6 sm:p-7 flex flex-col gap-4">
              <h3 className="text-[28px] font-normal leading-tight">{b.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)] flex-1">{b.texte}</p>
              <Link href={b.href} className="font-semibold underline underline-offset-4 decoration-[var(--accent)] decoration-2">{b.lien} →</Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Une image de nuit, et ce qu'on y fait. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28">
        <figure className="space-y-4">
          <div className="relative aspect-[3/2] sm:aspect-[21/9] overflow-hidden rounded-[30px]">
            <Image src={photos.brouillard.src} alt={photos.brouillard.alt} fill sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
          </div>
          <figcaption className="grid gap-2 sm:grid-cols-[auto_1fr] sm:gap-8 sm:items-baseline">
            <span className="font-[family-name:var(--titres)] text-3xl italic tabular-nums">03 h 05</span>
            <span className="text-lg leading-relaxed text-[var(--doux)]">Une ronde de plus. Rien à raconter — et c&apos;est exactement ce que vous payez.</span>
          </figcaption>
        </figure>
      </section>

      {/* La méthode. */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24 space-y-12">
          <Intitule surtitre="La première semaine" titre={<>De la visite <span className="italic">au premier rapport.</span></>} />
          <ol className="grid gap-8 md:grid-cols-4">
            {METHODE.map((m, i) => (
              <li key={m.titre} className="space-y-3">
                <p className="flex items-baseline justify-between border-b border-[var(--trait)] pb-3">
                  <span className="font-[family-name:var(--titres)] text-4xl italic text-[var(--accent-texte)] tabular-nums">{i + 1}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">{m.duree}</span>
                </p>
                <h3 className="text-2xl font-normal">{m.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{m.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Qui veille : le droit de savoir. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-2 lg:items-center">
        <Intitule surtitre="Qui veille chez vous" titre={<>La loi vous permet de demander. <span className="italic">On vous le dit avant.</span></>}>
          Vous pouvez demander les références de la carte professionnelle de chaque agent
          qui travaille pour vous (Code de la sécurité intérieure, art. L612-15). Nous les
          envoyons avant la première nuit, avec son prénom et ses horaires.
        </Intitule>
        <div className="rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-6 sm:p-8 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Vendredi, 17 h · exemple</p>
          <p className="font-[family-name:var(--titres)] text-2xl leading-snug">Cette nuit, sur votre chantier&nbsp;:</p>
          <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            <div className="flex justify-between gap-4 py-3"><dt className="text-[var(--doux)]">Agent</dt><dd className="font-semibold">S.</dd></div>
            <div className="flex justify-between gap-4 py-3"><dt className="text-[var(--doux)]">Horaires</dt><dd className="font-semibold tabular-nums">19 h – 7 h</dd></div>
            <div className="flex justify-between gap-4 py-3"><dt className="text-[var(--doux)]">Carte professionnelle</dt><dd className="font-semibold text-right">références jointes</dd></div>
          </dl>
          <p className="text-sm text-[var(--doux)]">Nos agents sont présentés par leur prénom et leur carte professionnelle. Rien d&apos;autre.</p>
        </div>
      </section>

      {/* Questions fréquentes. */}
      <section className="max-w-4xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28 space-y-10">
        <Intitule surtitre="Questions fréquentes" titre={<>Ce qu&apos;on nous demande <span className="italic">avant d&apos;appeler.</span></>} />
        <Questions questions={QUESTIONS} />
      </section>

      {/* L'appel. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 sm:pb-28">
        <div className="rounded-[32px] bg-[#F7E3D6] px-6 py-14 sm:px-14 sm:py-20 text-center space-y-6">
          <h2 className="text-[40px] sm:text-6xl font-normal leading-[1.02]">
            Votre prochain lundi, <span className="block italic text-[var(--accent-texte)]">sans histoire.</span>
          </h2>
          <p className="max-w-lg mx-auto text-lg leading-relaxed">Trois questions pour une fourchette, ou un appel pour une visite du site, gratuite.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={`${DOSSIER}/devis`} className="w-full sm:w-auto rounded-full bg-[var(--encre)] text-[var(--fond)] px-7 py-4 font-semibold">Devis en 3 questions</Link>
            <a href={`tel:${entreprise.telephoneLien}`} className="w-full sm:w-auto rounded-full border border-[var(--encre)] px-7 py-4 font-semibold tabular-nums">{entreprise.telephone}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
