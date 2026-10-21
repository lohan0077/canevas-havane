import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, OPTIONS, QUESTIONS, TENTES, WEEKEND, entreprise, photos } from "./_composants/donnees";
import { CarteTente, Faq, Surtitre } from "./_composants/Blocs";
import VueDuCiel from "./_composants/VueDuCiel";

// L'accueil de Pignon sur Pré. La vidéo : « Je vendrais la plus belle salle de la
// région. Le pré où t'as grandi. » puis « Sur le site, tu tapes ton adresse. Et le site
// pose la tente sur la vue du ciel. À l'échelle, avec les tables. » Autour : les trois
// tentes, le week-end de vendredi à lundi, les voisins, le bal du lancement, les questions.
export const metadata: Metadata = {
  title: "Pignon sur Pré — site de démonstration",
  description: "Site de démonstration d'un loueur de tentes de réception imaginaire, réalisé par Canevas Havane : tu tapes ton adresse, la tente se pose sur la vue du ciel.",
  ...adressesDeLaPage("/exemples/pignon-sur-pre"),
};

export default function PignonSurPre() {
  return (
    <div>
      {/* 1 · Le pré, en grand ; le titre sur un pan vert qui le recouvre. */}
      <section className="relative">
        <div className="relative h-[46vh] min-h-[300px] max-h-[620px] sm:h-[70vh]">
          <Image src={photos.pre.src} alt={photos.pre.alt} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="relative -mt-14 sm:-mt-40 max-w-6xl mx-auto px-3 sm:px-5">
          <div className="rounded-[28px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 pt-7 pb-8 sm:px-12 sm:py-12 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div className="space-y-4">
              <Surtitre clair>Location de tentes de réception</Surtitre>
              <h1 className="text-[52px] sm:text-7xl font-normal tracking-[-0.02em]">
                Ta salle des fêtes, <em className="text-[#F2C98A]">chez toi.</em>
              </h1>
            </div>
            <div className="space-y-5">
              <p className="text-[17px] leading-relaxed text-[#E4EBDA]">
                La plus belle salle de la région, c&apos;est le pré où tu as grandi. On y pose une tente, le temps d&apos;un week-end.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={`${DOSSIER}#pre`} className="inline-flex h-14 items-center rounded-full bg-[var(--accent)] px-6 text-[17px] font-semibold text-[var(--sur-accent)]">
                  Poser ma tente sur mon pré
                </Link>
                <Link href={`${DOSSIER}/tentes`} className="inline-flex h-14 items-center rounded-full border border-[var(--sur-sombre)] px-6 text-[17px] font-medium">
                  Les tentes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · L'outil : l'adresse, la vue du ciel, la tente à l'échelle. */}
      <section id="pre" className="scroll-mt-16 max-w-6xl mx-auto px-5 pt-14 pb-16 sm:py-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-4 lg:pt-6">
          <Surtitre>Ton pré, vu du ciel</Surtitre>
          <h2 className="text-[40px] sm:text-6xl font-normal">Tape ton adresse. <em className="text-[var(--accent-texte)]">On pose la tente.</em></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            À l&apos;échelle, avec les tables. Tu vois tout de suite si elle rentre, et où.
          </p>
        </div>
        <VueDuCiel />
      </section>

      {/* 3 · Pas de la toile : une adresse. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div className="space-y-6">
            <Surtitre clair>Ce qu&apos;on loue vraiment</Surtitre>
            <p className="font-[family-name:var(--titres)] text-[44px] sm:text-6xl leading-[1.05]">
              Pas de la toile. <em className="text-[#F2C98A]">Une adresse. La tienne.</em>
            </p>
            <p className="text-lg leading-relaxed text-[#E4EBDA]">
              Une salle des fêtes, on la loue chez quelqu&apos;un d&apos;autre. Une tente, on la pose chez soi : sous le
              tilleul, à côté de la grange, dans le pré où l&apos;on a appris à faire du vélo.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-sm aspect-[2/3] overflow-hidden rounded-t-full">
            <Image src={photos.tenteJardin.src} alt={photos.tenteJardin.alt} fill sizes="(min-width: 768px) 380px, 90vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 4 · Trois tentes. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
        <div className="grid gap-4 md:grid-cols-2 md:items-end">
          <div className="space-y-4">
            <Surtitre>Les tentes</Surtitre>
            <h2 className="text-[40px] sm:text-6xl font-normal">Trois tentes. <em className="text-[var(--accent-texte)]">Pas un catalogue.</em></h2>
          </div>
          <p className="text-lg leading-relaxed text-[var(--doux)]">
            Le nombre d&apos;invités est celui que donne le fabricant de chaque modèle, assis à des tables rondes de dix.
          </p>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {TENTES.map((t) => (
            <li key={t.id}><CarteTente t={t} /></li>
          ))}
        </ul>
        <Link href={`${DOSSIER}/tentes`} className="inline-flex font-semibold underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">
          Les tentes en détail, et ce qu&apos;on pose avec →
        </Link>
      </section>

      {/* 5 · Le week-end, de vendredi à lundi. */}
      <section className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 space-y-10">
          <div className="space-y-4">
            <Surtitre>Comment ça se passe</Surtitre>
            <h2 className="text-[40px] sm:text-6xl font-normal">Une maison qui pousse <em className="text-[var(--accent-texte)]">dans l&apos;herbe.</em></h2>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WEEKEND.map((w, i) => (
              <li key={w.titre} className="space-y-2 border-t-2 border-[var(--encre)] pt-4">
                <p className="text-[13px] uppercase tracking-[0.16em] text-[var(--accent-texte)]">{w.quand}</p>
                <h3 className="text-[26px] leading-tight">
                  <span className="text-[var(--doux)]">{i + 1}. </span>
                  {w.titre}
                </h3>
                <p className="leading-relaxed text-[var(--doux)]">{w.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 · Ce qu'on pose avec. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
          <Image src={photos.tenteNuit.src} alt={photos.tenteNuit.alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-6">
          <Surtitre>Avec la tente</Surtitre>
          <h2 className="text-[40px] sm:text-5xl font-normal">Le plancher, les tables, <em className="text-[var(--accent-texte)]">les guirlandes.</em></h2>
          <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {OPTIONS.map((o) => (
              <li key={o.nom} className="flex items-baseline justify-between gap-4 py-3.5">
                <span>
                  <span className="block font-semibold">{o.nom}</span>
                  <span className="block text-[15px] text-[var(--doux)]">{o.detail}</span>
                </span>
                <span className="shrink-0 text-right text-[15px] font-semibold tabular-nums">{o.prix}</span>
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-[var(--doux)]">Prix TTC d&apos;exemple, pour le week-end.</p>
        </div>
      </section>

      {/* 7 · Les voisins. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24">
        <div className="grid gap-8 rounded-[28px] border border-[var(--encre)] p-6 sm:p-12 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-4">
            <Surtitre>Après la réservation</Surtitre>
            <h2 className="text-[40px] sm:text-5xl font-normal">Ça rentre&nbsp;? Tu réserves. <em className="text-[var(--accent-texte)]">Et tu préviens les voisins.</em></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">Le site te donne le mot, tout prêt, avec la date. Il n&apos;y a plus qu&apos;à le glisser dans leur boîte aux lettres.</p>
            <Link href={`${DOSSIER}/reserver`} className="inline-flex h-14 items-center rounded-full bg-[var(--accent)] px-6 text-[17px] font-semibold text-[var(--sur-accent)]">
              Choisir mon samedi
            </Link>
          </div>
          <div className="rotate-[-2deg] rounded-[6px] bg-[var(--carte)] p-6 shadow-[0_24px_50px_-28px_rgba(34,49,27,.55)] font-[family-name:var(--titres)] text-[18px] leading-relaxed">
            <p>Bonjour,</p>
            <p className="mt-3">Le samedi 12 juin, on fait la fête dans le pré, sous une tente. Si ça vous gêne, sonnez&nbsp;: on en parle volontiers. Et passez boire un café dimanche matin.</p>
            <p className="mt-3 italic">Vos voisins</p>
          </div>
        </div>
      </section>

      {/* 8 · Le bal du lancement. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[28px]">
            <Image src={photos.village.src} alt={photos.village.alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
          </div>
          <div className="space-y-5">
            <Surtitre clair>Le lancement</Surtitre>
            <h2 className="text-[40px] sm:text-6xl font-normal">Un bal, <em className="text-[#F2C98A]">avec la mairie.</em></h2>
            <p className="text-lg leading-relaxed text-[#E4EBDA]">
              Une tente sur la place du village, un samedi soir, ouverte à tout le monde. Une tente qui reçoit du public ne se
              monte pas sans l&apos;autorisation de la mairie : ce bal-là, c&apos;est elle qui l&apos;accueille.
            </p>
            <Link href={`${DOSSIER}/le-bal`} className="inline-flex h-14 items-center rounded-full bg-[var(--fond)] px-6 text-[17px] font-semibold text-[var(--encre)]">
              Le bal, et la suite
            </Link>
          </div>
        </div>
      </section>

      {/* 9 · Les questions. */}
      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Surtitre>Questions</Surtitre>
          <h2 className="text-[40px] sm:text-6xl font-normal">Avant de poser <em className="text-[var(--accent-texte)]">la tente.</em></h2>
        </div>
        <Faq questions={QUESTIONS} />
      </section>

      {/* 10 · L'appel. */}
      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-24 text-center space-y-6">
          <p className="font-[family-name:var(--titres)] text-[44px] sm:text-7xl leading-[1.05]">Et si on la faisait <em className="text-[var(--accent-texte)]">chez nous&nbsp;?</em></p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`${DOSSIER}#pre`} className="inline-flex h-14 items-center rounded-full bg-[var(--accent)] px-6 text-[17px] font-semibold text-[var(--sur-accent)]">
              Voir ma tente sur mon pré
            </Link>
            <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex h-14 items-center rounded-full border border-[var(--encre)] px-6 text-[17px] font-medium tabular-nums">
              {entreprise.telephone}
            </a>
          </div>
          <p className="text-sm text-[var(--doux)]">Numéro fictif, réservé par l&apos;ARCEP aux œuvres de fiction.</p>
        </div>
      </section>
    </div>
  );
}
