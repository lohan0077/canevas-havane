import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Frigo from "./_composants/Frigo";
import Soirs from "./_composants/Soirs";
import { DOSSIER, cabinet, photos, questions, reponse, seances } from "./_composants/donnees";

// Le site imaginé dans la vidéo « Si je devais remplir l'agenda d'une diététicienne » :
// pas un régime, le mardi soir. Sur l'accueil, une seule question — qu'y a-t-il dans
// votre frigo ? —, une page « diététicienne ou nutritionniste ? » avec le diplôme
// dessous, et des créneaux le soir. Premier écran inspiré du modèle « Evergreen
// Finance » de MotionSites (titre serif centré, une grande image, des cartes posées
// dessus), transposé à une cuisine, un soir.
export const metadata: Metadata = {
  title: "Mardi Soir — site de démonstration",
  description:
    "Site de démonstration d'une diététicienne imaginaire, réalisé par Canevas Havane : pas un régime, votre mardi soir. Une photo du frigo montrée en séance, et des créneaux le soir.",
  ...adressesDeLaPage("/exemples/mardi-soir"),
};

const lining = "[font-variant-numeric:lining-nums]";

export default function MardiSoir() {
  return (
    <main>
      {/* 1. Le titre au centre, la cuisine dessous, trois cartes posées dessus. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 text-center">
        <p className="text-sm font-semibold text-[var(--accent-texte)]">{cabinet.dieteticienne} · diététicienne diplômée</p>
        <h1 className="mt-5 text-[42px] sm:text-7xl leading-[1.04] max-w-4xl mx-auto">
          Pas un régime. <span className="block">Votre <span className="whitespace-nowrap bg-[var(--accent)] px-2 rounded-lg [box-decoration-break:clone]">mardi soir.</span></span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[var(--doux)]">
          Dix-neuf heures trente, frigo ouvert : c&apos;est là que tout se joue. On part de là,
          pas d&apos;un tableau de calories.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link href={`${DOSSIER}/reserver`} className="inline-flex items-center justify-center min-h-14 rounded-full bg-[var(--encre)] text-[var(--fond)] px-8 text-lg font-semibold">Réserver un soir</Link>
          <Link href={`${DOSSIER}/dieteticienne-ou-nutritionniste`} className="inline-flex items-center justify-center min-h-14 rounded-full border-2 border-[var(--encre)] px-8 text-lg font-semibold">Diététicienne ou nutritionniste&nbsp;?</Link>
        </div>

        <div className="relative mt-12">
          <div className="relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden rounded-[32px] bg-[#0E1F1A]">
            <Image src={photos.cuisine.src} alt={photos.cuisine.alt} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover object-[35%_50%]" />
          </div>
          <ul className="relative -mt-16 sm:-mt-20 grid gap-3 px-3 sm:grid-cols-3 sm:px-10 text-left">
            <li className="rounded-[22px] bg-[var(--carte)] p-5 shadow-[0_20px_40px_-24px_rgba(23,59,51,0.5)]">
              <p className="text-sm text-[var(--doux)]">Mardi</p>
              <p className={`font-[family-name:var(--titres)] text-4xl ${lining}`}>19 h 30</p>
            </li>
            <li className="rounded-[22px] bg-[var(--accent)] text-[var(--sur-accent)] p-5 shadow-[0_20px_40px_-24px_rgba(23,59,51,0.5)]">
              <p className="text-sm">La seule question</p>
              <p className="font-[family-name:var(--titres)] text-2xl leading-tight">Qu&apos;y a-t-il dans votre frigo&nbsp;?</p>
            </li>
            <li className="rounded-[22px] bg-[var(--carte)] p-5 shadow-[0_20px_40px_-24px_rgba(23,59,51,0.5)]">
              <p className="text-sm text-[var(--doux)]">Première séance · {seances[0].duree}</p>
              <p className={`font-[family-name:var(--titres)] text-4xl ${lining}`}>{seances[0].prix}</p>
              <p className="text-xs text-[var(--doux)]">Prix d&apos;exemple</p>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. La seule question. */}
      <section id="frigo" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-2 lg:items-center scroll-mt-16">
        <Frigo />
        <div className="space-y-6 px-1">
          <p className="text-sm font-semibold text-[var(--accent-texte)]">Comment on commence</p>
          <h2 className="text-[38px] sm:text-5xl">On part de votre frigo. Pas de celui des magazines.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Il n&apos;y a pas de bon ou de mauvais frigo. Il y a le vôtre, un mardi soir. La photo
            sert à en parler — elle reste sur votre téléphone, le site ne la reçoit jamais.
          </p>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[26px]">
            <Image src={photos.bocaux.src} alt={photos.bocaux.alt} fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 3. Diététicienne ou nutritionniste ? */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold text-[#F2C14E]">La question que tout le monde tape</p>
            <h2 className="text-[38px] sm:text-6xl leading-[1.05]">{reponse.titre}</h2>
            <p className="text-lg leading-relaxed text-[#D6E2DC]">{reponse.court}</p>
            <Link href={`${DOSSIER}/dieteticienne-ou-nutritionniste`} className="inline-flex items-center min-h-14 rounded-full bg-[#F2C14E] text-[#173B33] px-7 text-lg font-semibold">
              Lire la réponse
            </Link>
          </div>
          <div className="rounded-[26px] border border-white/15 p-6 sm:p-8 space-y-4">
            <p className="text-sm text-[#B8CBC3]">Mon diplôme</p>
            <p className="font-[family-name:var(--titres)] text-3xl">{cabinet.dieteticienne}, diététicienne</p>
            <p className="text-[#D6E2DC]">{cabinet.diplome}</p>
            <p className={`text-[#D6E2DC] ${lining}`}>N° ADELI {cabinet.adeli} (exemple)</p>
            <p className="border-t border-white/15 pt-4 text-sm text-[#B8CBC3]">Code de la santé publique, art. L4371-2 et L4372-2</p>
          </div>
        </div>
      </section>

      {/* 4. Pas de promesse. */}
      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-20 sm:py-28 text-center space-y-6">
        <p className="text-sm font-semibold text-[var(--accent-texte)]">Ce que vous ne trouverez pas ici</p>
        <h2 className="text-[38px] sm:text-6xl leading-[1.08]">Aucun kilo promis. Aucun avant-après. Aucun régime.</h2>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-[var(--doux)]">
          Personne ne peut promettre honnêtement un résultat. Je promets autre chose : partir de
          votre vie réelle, et ne jamais vous faire la morale sur votre frigo.
        </p>
      </section>

      {/* 5. La séance. */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[26px] order-last lg:order-first">
            <Image src={photos.legumes.src} alt={photos.legumes.alt} fill sizes="(min-width: 1024px) 500px, 100vw" className="object-cover" />
          </div>
          <div className="space-y-6">
            <p className="text-sm font-semibold text-[var(--accent-texte)]">La première séance</p>
            <h2 className="text-[38px] sm:text-5xl">Une heure, à partir de vos soirs.</h2>
            <ol className="space-y-4">
              {["On regarde la photo de votre frigo, ensemble.", "On parle de vos soirs : qui rentre quand, qui cuisine, ce qui coince.", "On choisit une ou deux choses à essayer, pas vingt.", "Vous repartez avec la facture, et sans liste d'interdits."].map((e, i) => (
                <li key={e} className="flex gap-4 text-lg leading-relaxed">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] font-semibold ${lining}`}>{i + 1}</span>
                  {e}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 6. Tarifs. */}
      <section id="tarifs" className="max-w-6xl mx-auto px-5 sm:px-6 py-20 space-y-8 scroll-mt-16">
        <h2 className="text-[38px] sm:text-5xl">Les tarifs, sans astérisque.</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {seances.map((s) => (
            <li key={s.id} className="rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-7 space-y-2">
              <p className="text-[var(--doux)]">{s.nom} · {s.duree}</p>
              <p className={`font-[family-name:var(--titres)] text-6xl ${lining}`}>{s.prix}</p>
              <p className="text-[var(--doux)]">{s.detail}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple, TTC. Carte bancaire acceptée, facture remise à chaque séance.</p>
      </section>

      {/* 7. Le soir. */}
      <section id="reserver" className="bg-[#F6E7C1] scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6 px-1">
            <p className="text-sm font-semibold text-[var(--accent-texte)]">Réserver</p>
            <h2 className="text-[38px] sm:text-6xl">Le soir, <span className={`${lining} whitespace-nowrap`}>jusqu&apos;à 20 h 30.</span></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Vous ne venez pas pour un régime. Vous venez pour votre mardi soir — alors les
              rendez-vous sont le soir aussi.
            </p>
          </div>
          <Soirs />
        </div>
      </section>

      {/* 8. La diététicienne. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 grid gap-8 lg:grid-cols-2 lg:items-end">
        <div className="space-y-5">
          <p className="text-sm font-semibold text-[var(--accent-texte)]">La diététicienne</p>
          <h2 className="text-[38px] sm:text-6xl">{cabinet.dieteticienne}, diététicienne diplômée.</h2>
        </div>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          {cabinet.diplome}. N° ADELI {cabinet.adeli} (exemple). Conseils nutritionnels et bilan
          diététique ; pour un trouble du métabolisme ou de l&apos;alimentation, sur prescription
          médicale.
        </p>
      </section>

      {/* 9. Questions. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pb-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-[38px] sm:text-5xl">Questions du mardi.</h2>
        <div className="border-t border-[var(--trait)]">
          {questions.map((q) => (
            <details key={q.q} className="group border-b border-[var(--trait)]">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {q.q}
                <span aria-hidden="true" className="text-2xl leading-none transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-6 pr-8 leading-relaxed text-[var(--doux)]">{q.r}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 10. Dernier écran. */}
      <section className="px-3 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto rounded-[32px] bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-16 text-center space-y-6">
          <p className="font-[family-name:var(--titres)] text-[40px] sm:text-6xl leading-[1.05]">À mardi soir&nbsp;?</p>
          <Link href={`${DOSSIER}/reserver`} className="inline-flex items-center justify-center min-h-14 rounded-full bg-[var(--encre)] text-[var(--fond)] px-8 text-lg font-semibold">Réserver un soir</Link>
          <p className={`font-semibold ${lining}`}>ou {cabinet.telephone}</p>
        </div>
      </section>
    </main>
  );
}
