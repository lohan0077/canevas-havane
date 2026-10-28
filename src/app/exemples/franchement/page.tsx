import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { DOSSIER, JE_FAIS, JE_NE_FAIS_PAS, PROMESSES_BARREES, QUESTIONS, TARIFS, entreprise, photos } from "./_composants/donnees";
import { AppelFinal, Bouton, Faq, Pastille } from "./_composants/Blocs";
import LecteurSeance from "./_composants/LecteurSeance";
import QuestionsSemaine from "./_composants/QuestionsSemaine";

// L'accueil de Franchement. La vidéo : « Moi, je ferais l'inverse. Je promettrais rien.
// Je montrerais la première séance. Minute par minute. » Le lecteur de séance est là ;
// autour, ce qu'un vrai cabinet dirait : ce qu'il fait, ce qu'il ne fait pas, la page
// « coach ou psy », la question de la semaine, les prix, les questions.
export const metadata: Metadata = {
  title: "Franchement — site de démonstration",
  description: "Site de démonstration d'un cabinet de coaching imaginaire, réalisé par Canevas Havane : aucune promesse, la première séance montrée minute par minute.",
  ...adressesDeLaPage("/exemples/franchement"),
};

export default function Franchement() {
  return (
    <main>
      {/* 1 · L'ouverture : un panneau clair posé sur le vert sauge, et trois cartes. */}
      <section className="px-3 pt-2 pb-12">
        <div className="max-w-6xl mx-auto grid gap-3 lg:grid-cols-[1.25fr_1fr]">
          <div className="rounded-[36px] bg-[var(--carte)] px-6 py-10 sm:px-12 sm:py-16 space-y-7">
            <Pastille>Coaching · avec {entreprise.coach}</Pastille>
            <h1 className="text-[56px] sm:text-[88px] font-extrabold tracking-[-0.05em]">
              Aucune <span className="text-[var(--accent-texte)]">promesse.</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-lg">
              Personne ne sait ce qui se passe une fois la porte fermée. Alors je te montre
              la première séance, minute par minute, avant que tu réserves quoi que ce soit.
            </p>
            <div className="flex flex-wrap gap-3">
              <Bouton href="#seance">Voir la séance</Bouton>
              <Bouton href={`${DOSSIER}/premier-appel`} variante="contour">Appel de 20 min</Bouton>
            </div>
          </div>
          <div className="grid gap-3 grid-cols-2">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[36px]">
              <Image src={photos.fauteuils.src} alt={photos.fauteuils.alt} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            </div>
            <div className="rounded-[28px] bg-[var(--carte)] p-5 space-y-1">
              <p className="text-sm font-semibold text-[var(--doux)]">{TARIFS.appel.nom}</p>
              <p className="font-[family-name:var(--titres)] text-3xl font-extrabold tracking-[-0.03em]">{TARIFS.appel.duree}</p>
              <p className="text-sm">{TARIFS.appel.prix}</p>
            </div>
            <div className="rounded-[28px] bg-[var(--accent)] text-[var(--sur-accent)] p-5 space-y-1">
              <p className="text-sm font-semibold">{TARIFS.seance.nom} · {TARIFS.seance.duree}</p>
              <p className="font-[family-name:var(--titres)] text-3xl font-extrabold tracking-[-0.03em] tabular-nums">{TARIFS.seance.prix}</p>
              <p className="text-sm">TTC · prix d&apos;exemple</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Ce que tu ne liras pas ici. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em]">Ce que tu ne liras <span className="text-[var(--accent-texte)]">pas ici.</span></h2>
          <p className="text-lg leading-relaxed">
            Un coach ne peut pas savoir ce que tu obtiendras. Ceux qui l&apos;écrivent le
            devinent. Moi, je te dis ce qui se passe pendant l&apos;heure, et le prix.
          </p>
        </div>
        <div className="relative">
        <ul className="rounded-[32px] bg-[var(--carte)] p-6 sm:p-8 space-y-3">
          {PROMESSES_BARREES.map((p) => (
            <li key={p} className="text-xl sm:text-2xl font-semibold text-[var(--doux)] line-through decoration-[var(--accent)] decoration-2">
              {p}
            </li>
          ))}
        </ul>
          <p aria-hidden="true" className="absolute -top-4 right-5 rotate-[8deg] rounded-xl border-2 border-[#17251C] bg-[#E9B44C] px-3 py-1 text-sm font-extrabold uppercase tracking-[0.14em] text-[#17251C]">
            Promesses
          </p>
        </div>
      </section>

      {/* 3 · La première séance, minute par minute. */}
      <section id="seance" className="scroll-mt-24 px-3 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5 px-2 lg:sticky lg:top-28">
            <Pastille>Ta première séance</Pastille>
            <h2 data-film="seance" className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em]">Minute <span className="text-[var(--accent-texte)]">par minute.</span></h2>
            <p className="text-lg leading-relaxed">
              Touche une minute. C&apos;est le déroulé de toutes les premières séances : le
              même pour tout le monde, écrit avant que tu viennes.
            </p>
          </div>
          <LecteurSeance />
        </div>
      </section>

      {/* 4 · Ce que je fais, ce que je ne fais pas. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid gap-3 md:grid-cols-2">
        <div className="rounded-[32px] bg-[var(--carte)] p-6 sm:p-8 space-y-4">
          <h2 className="text-3xl font-extrabold tracking-[-0.03em]">Ce que je fais</h2>
          <ul className="space-y-2.5">
            {JE_FAIS.map((x) => (
              <li key={x} className="flex gap-3 text-lg"><span aria-hidden="true" className="font-bold text-[var(--accent-texte)]">✓</span>{x}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[32px] border-2 border-[var(--encre)] p-6 sm:p-8 space-y-4">
          <h2 className="text-3xl font-extrabold tracking-[-0.03em]">Ce que je ne fais pas</h2>
          <ul className="space-y-2.5">
            {JE_NE_FAIS_PAS.map((x) => (
              <li key={x} className="flex gap-3 text-lg"><span aria-hidden="true" className="font-bold">✕</span>{x}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · La page que personne n'ose faire. */}
      <section className="px-3 pb-16 sm:pb-24">
        <Link href={`${DOSSIER}/coach-ou-psy`} className="group max-w-6xl mx-auto grid gap-0 overflow-hidden rounded-[36px] bg-[var(--carte)] md:grid-cols-2">
          <div className="relative aspect-[3/2] md:aspect-auto">
            <Image src={photos.porte.src} alt={photos.porte.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
          </div>
          <div className="p-6 sm:p-12 space-y-4">
            <Pastille>Coach ou psychologue&nbsp;?</Pastille>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.04em]">Si ce n&apos;est pas pour moi, <span className="text-[var(--accent-texte)]">je te le dis.</span></h2>
            <p className="text-lg leading-relaxed">
              C&apos;est ce que les gens tapent sur Google. La réponse franche, et trois
              questions pour t&apos;orienter.
            </p>
            <span className="inline-flex items-center gap-2 font-bold underline underline-offset-4 decoration-2 decoration-[var(--accent)]">Lire la page <span aria-hidden="true">↗</span></span>
          </div>
        </Link>
      </section>

      {/* 6 · La question de la semaine. */}
      <section className="px-3 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto rounded-[36px] bg-[var(--sombre)] text-[var(--sur-sombre)] [--accent-texte:#B9D3BF] px-6 py-12 sm:p-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em]">Chaque semaine</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.04em]">Une question reçue, <span className="text-[var(--accent-texte)]">une question en retour.</span></h2>
            <p className="text-lg leading-relaxed">
              Les questions viennent des commentaires publics, jamais d&apos;une séance. Je ne
              réponds pas : je pose la question que je poserais.
            </p>
          </div>
          <QuestionsSemaine />
        </div>
      </section>

      {/* 7 · Qui je suis. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[32px]">
          <Image src={photos.carnet.src} alt={photos.carnet.alt} fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-4">
          <Pastille>Qui je suis</Pastille>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.04em]">{entreprise.coach}, <span className="text-[var(--accent-texte)]">coach.</span></h2>
          <p className="text-lg leading-relaxed">
            Dix ans de ressources humaines, puis une formation de coach professionnel
            (exemple). Je ne suis ni psychologue, ni médecin : je pose des questions, et
            c&apos;est toi qui choisis quoi en faire.
          </p>
        </div>
      </section>

      {/* 8 · Les prix. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 space-y-8">
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em]">Deux prix. <span className="text-[var(--accent-texte)]">C&apos;est tout.</span></h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {[TARIFS.appel, TARIFS.seance].map((t, k) => (
            <li key={t.nom} className={`rounded-[32px] p-6 sm:p-8 space-y-3 ${k ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "bg-[var(--carte)]"}`}>
              <p className="text-sm font-bold uppercase tracking-[0.14em]">{t.nom} · {t.duree}</p>
              <p className="font-[family-name:var(--titres)] text-5xl font-extrabold tracking-[-0.04em] tabular-nums">{t.prix}{k ? <span className="text-xl"> TTC</span> : null}</p>
              <p className="text-lg leading-relaxed">{t.detail}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple : l&apos;entreprise est fictive. Rien n&apos;est vendu en paquet de séances.</p>
      </section>

      {/* 9 · Les questions. */}
      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em]">Avant <span className="text-[var(--accent-texte)]">l&apos;appel.</span></h2>
        <Faq questions={QUESTIONS} />
      </section>

      <AppelFinal />
    </main>
  );
}
