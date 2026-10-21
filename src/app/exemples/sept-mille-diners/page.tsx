import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, ETAPES, FAQ, FOYERS, photos } from "./_composants/donnees";
import TaVie from "./_composants/TaVie";
import Ticket from "./_composants/Ticket";
import Faq from "./_composants/Faq";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une marque de
// cuisines » : une cuisine gardée vingt ans, c'est 7 300 dîners. Mise en page inspirée
// du modèle « Kairo Studio » de MotionSites — un mot immense, une image posée dedans —,
// transposée à une marque de cuisines : le mot, ici, c'est un nombre.
export const metadata: Metadata = {
  title: "Sept Mille Dîners — site de démonstration",
  description: "Site de démonstration d'une marque de cuisines imaginaire, réalisé par Canevas Havane : pas de catalogue, trois questions sur ta vie et le plan qui va avec ; le soir de la pose, le premier dîner.",
  ...adressesDeLaPage("/exemples/sept-mille-diners"),
};

const Chiffres = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`[font-variant-numeric:lining-nums] ${className}`}>{children}</span>
);

export default function SeptMilleDiners() {
  return (
    <div>
      {/* 1. L'ouverture : le nombre, et la table dedans. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent-texte)]">Cuisines · Ta Ville</p>
        <h1 className="sr-only">Sept mille dîners : on vend des dîners, les meubles sont fournis.</h1>
        <div aria-hidden="true" className="relative mt-4 select-none">
          <p className="font-[family-name:var(--titres)] text-[7rem] leading-[0.82] sm:text-[15rem] tracking-[-0.04em] whitespace-nowrap [font-variant-numeric:lining-nums]">7&nbsp;300</p>
          <div className="relative -mt-8 ml-auto w-[56%] sm:-mt-24 sm:w-[45%] aspect-[4/5] overflow-hidden rounded-[999px_999px_24px_24px] bg-[var(--sombre)] shadow-[0_30px_50px_-30px_rgba(46,42,38,0.6)]">
            <Image src={photos.table.src} alt="" fill priority sizes="(min-width: 640px) 500px, 56vw" className="object-cover" />
          </div>
          <p className="absolute z-10 left-0 bottom-[14%] font-[family-name:var(--titres)] text-[3.3rem] sm:text-9xl italic leading-none text-[var(--accent-texte)]">dîners.</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div className="space-y-4">
            <p className="font-[family-name:var(--titres)] text-4xl sm:text-5xl leading-[1.05]">On vend des dîners. <span className="italic">Les meubles sont fournis.</span></p>
            <p className="text-lg leading-relaxed text-[var(--doux)]">
              Une cuisine, si tu la gardes vingt ans, ça fait <Chiffres>7&nbsp;300</Chiffres> dîners. C&apos;est un calcul — vingt
              fois <Chiffres>365</Chiffres> soirs —, pas une durée de vie annoncée.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="#ta-vie" className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-3.5 text-lg font-semibold">Trois questions</Link>
            <Link href={`${DOSSIER}/le-premier-diner`} className="rounded-full border border-[var(--encre)] px-7 py-3.5 text-lg font-medium">Le premier dîner</Link>
          </div>
        </div>
      </section>

      {/* 2. Pas de catalogue : trois questions. */}
      <section id="ta-vie" className="scroll-mt-20 border-y border-[var(--trait)] bg-[#EFE7DA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent-texte)]">Pas de catalogue</p>
            <h2 className="text-5xl sm:text-6xl">Trois questions <span className="italic">sur ta vie.</span></h2>
            <p className="text-xl leading-relaxed">
              Combien à table, qui cuisine, qui fait la vaisselle. Et le site te dessine le plan qui va avec
              ta vie. Pas avec la photo.
            </p>
          </div>
          <TaVie />
        </div>
      </section>

      {/* 3. Pas avec la photo. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent-texte)]">La photo que tout le monde fait</p>
          <h2 className="text-5xl sm:text-6xl">Une cuisine blanche, un bol de citrons, <span className="italic">et personne dedans.</span></h2>
          <p className="text-xl leading-relaxed text-[var(--doux)]">
            Nous, on dessine celle où quelqu&apos;un remue une cocotte un mardi soir, pendant qu&apos;un autre met
            la table. C&apos;est la seule photo qui compte.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden bg-[var(--sombre)]">
            <Image src={photos.cocotte.src} alt={photos.cocotte.alt} fill sizes="(min-width: 768px) 270px, 50vw" className="object-cover" />
          </div>
          <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden bg-[var(--sombre)] mt-10">
            <Image src={photos.herbes.src} alt={photos.herbes.alt} fill sizes="(min-width: 768px) 270px, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 4. Le premier dîner. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#E3A58C]">Le soir de la pose</p>
            <h2 className="text-5xl sm:text-6xl">On cuisine <span className="italic text-[#E3A58C]">le premier dîner.</span></h2>
            <p className="text-xl leading-relaxed">
              Chez toi, dans ta nouvelle cuisine. Offert, sans condition : il n&apos;est pas compté dans le
              prix, et la cuisine coûte la même chose si tu n&apos;en veux pas.
            </p>
            <Link href={`${DOSSIER}/le-premier-diner`} className="inline-flex rounded-full bg-[var(--sur-sombre)] text-[var(--sombre)] px-7 py-3.5 text-lg font-semibold">Comment ça se passe</Link>
          </div>
          <Ticket />
        </div>
      </section>

      {/* 5. Les 7 299 autres. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center space-y-4">
        <p className="font-[family-name:var(--titres)] text-[5.2rem] leading-none sm:text-[11rem] tracking-[-0.03em] whitespace-nowrap [font-variant-numeric:lining-nums]">7&nbsp;299</p>
        <p className="font-[family-name:var(--titres)] text-3xl sm:text-5xl italic">autres dîners : à toi.</p>
      </section>

      {/* 6. Comment ça se passe. */}
      <section className="border-y border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-10">
          <h2 className="text-5xl sm:text-6xl max-w-2xl">Des questions <span className="italic">au premier dîner.</span></h2>
          <ol className="grid gap-3 md:grid-cols-5">
            {ETAPES.map((e, i) => (
              <li key={e.titre} className="rounded-[20px] border border-[var(--trait)] bg-[var(--fond)] p-5 space-y-2">
                <span className="font-[family-name:var(--titres)] text-4xl italic text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">{i + 1}</span>
                <h3 className="text-2xl">{e.titre}</h3>
                <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Les prix. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent-texte)]">Les prix</p>
          <h2 className="text-5xl sm:text-6xl">Selon combien <span className="italic">vous êtes à table.</span></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Fourchettes TTC, pose comprise, hors électroménager. Des exemples : le prix ferme est sur le devis, après la prise de cotes.</p>
        </div>
        <ul className="divide-y divide-[var(--trait)] border-y border-[var(--encre)]">
          {FOYERS.map((f) => (
            <li key={f.pour} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
              <span className="font-[family-name:var(--titres)] text-3xl italic">{f.pour}</span>
              <span className="text-2xl font-medium [font-variant-numeric:lining-nums]">{f.fourchette}</span>
            </li>
          ))}
          <li className="py-4 text-sm text-[var(--doux)]">TTC · pose comprise · exemple. Le premier dîner n&apos;est compté dans aucun de ces prix.</li>
        </ul>
      </section>

      {/* 8. La table, le soir. */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="relative aspect-[4/3] sm:aspect-[21/9] rounded-[24px] overflow-hidden bg-[var(--sombre)]">
          <Image src={photos.service.src} alt={photos.service.alt} fill sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
        </div>
      </section>

      {/* 9. Questions. */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 space-y-8">
        <h2 className="text-5xl sm:text-6xl">Questions.</h2>
        <Faq questions={FAQ} />
      </section>

      {/* 10. Le dernier mot. */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto rounded-[28px] bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-14 sm:p-16 text-center space-y-6">
          <p className="font-[family-name:var(--titres)] text-5xl sm:text-7xl leading-[1.02]">
            Combien de dîners <span className="italic">te reste-t-il ?</span>
          </p>
          <Link href="#ta-vie" className="inline-flex rounded-full bg-[var(--fond)] text-[var(--encre)] px-8 py-4 text-lg font-semibold">
            Commencer par trois questions
          </Link>
        </div>
      </section>
    </div>
  );
}
