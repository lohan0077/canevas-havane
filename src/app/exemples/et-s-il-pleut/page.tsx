import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import Bascule from "./_composants/Bascule";
import { DOSSIER, FORMULES, PROTOCOLE, QUESTIONS, entreprise, euros, photos } from "./_composants/donnees";

// Le site de la marque imaginée dans la vidéo « Si je devais créer une marque de
// wedding planner » : pas le mariage parfait, le plan B. Chaque mariage en deux
// versions, soleil ou pluie, d'une bascule ; le plan B prévu, chiffré, réservé ;
// l'affiche « Et s'il pleut ? C'est prévu. » ; cent parapluies jaunes aux prénoms des
// mariés. Ouverture inspirée du modèle « Vectrus Energy » de MotionSites (une image
// pleine page voilée, un grand titre en bas à gauche, une ligne espacée, un bouton
// rond en bas à droite), transposée à la pluie.
export const metadata: Metadata = {
  title: "Et s'il pleut — site de démonstration",
  description: "Site de démonstration d'une wedding planner imaginaire, réalisé par Canevas Havane : chaque mariage en deux versions, soleil ou pluie, dans le même devis.",
  ...adressesDeLaPage("/exemples/et-s-il-pleut"),
};

export default function EtSilPleut() {
  return (
    <div>
      {/* L'ouverture : la question qui fait peur, devenue un nom. */}
      <section className="relative isolate overflow-hidden bg-[#1E2733] text-[var(--sur-sombre)]">
        <Image src={photos.fenetre.src} alt="" fill preload loading="eager" sizes="100vw" className="-z-10 object-cover opacity-45" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#1E2733d9_0%,#1E273359_32%,#1E273399_62%,#1E2733_100%)]" />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 min-h-[600px] sm:min-h-[680px] flex flex-col justify-between pt-8 pb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#B9C6D6]">{entreprise.metier} · {entreprise.region}</p>
          <div className="space-y-6">
            <h1 className="font-normal leading-[0.92] tracking-[-0.02em]">
              <span className="block text-[64px] sm:text-[112px]">Et s&apos;il pleut&nbsp;?</span>
              <span className="block text-[44px] sm:text-[72px] italic text-[var(--accent)]">C&apos;est prévu.</span>
            </h1>
            <p className="max-w-md text-xs uppercase leading-relaxed tracking-[0.28em] text-[#B9C6D6]">Chaque mariage en deux versions · soleil ou pluie · dans le même devis</p>
            <div className="flex items-end justify-between gap-4">
              <a href={`tel:${entreprise.telephoneLien}`} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-3.5 font-semibold">{entreprise.telephone}</a>
              <Link href="#deux-versions" aria-label="Voir les deux versions" className="grid h-14 w-14 place-items-center rounded-full border border-[#B9C6D6] text-xl">↓</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Le contre-pied. */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--doux)]">Ce que tout le monde vend</p>
        <p className="font-[family-name:var(--titres)] text-[34px] sm:text-5xl leading-[1.05] text-[var(--doux)] line-through decoration-[var(--accent)] decoration-[3px]">Le mariage parfait, sous un ciel bleu.</p>
        <h2 className="text-[46px] sm:text-7xl font-normal leading-[0.98] tracking-[-0.02em]">Nous, on vend <span className="italic">le plan B.</span></h2>
        <p className="max-w-2xl text-xl leading-relaxed text-[var(--doux)]">La vraie question des mariés, ce n&apos;est pas « comment rendre le jour parfait ». C&apos;est « et s&apos;il pleut&nbsp;? ». Alors on y répond avant qu&apos;on nous la pose.</p>
      </section>

      {/* La bascule. */}
      <section id="deux-versions" className="scroll-mt-16 bg-[#E4EAF1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--encre)]">Sur le site</p>
            <h2 className="text-[46px] sm:text-6xl font-normal leading-[0.98] tracking-[-0.02em]">Un mariage, <span className="italic">deux versions.</span></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">Soleil, ou pluie. Tu bascules, et tu vois ton mariage dans les deux cas : la cérémonie, le cocktail, les photos, le dîner, la danse.</p>
            <Link href={`${DOSSIER}/deux-versions`} className="inline-block font-semibold underline underline-offset-4 decoration-[var(--accent)] decoration-2">Les deux versions en détail →</Link>
          </div>
          <Bascule />
        </div>
      </section>

      {/* Prévu, chiffré, réservé. */}
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-24 space-y-12">
          <h2 className="text-[46px] sm:text-7xl font-normal leading-[0.98] tracking-[-0.02em]">Le plan B n&apos;est plus <span className="italic text-[var(--accent)]">une excuse.</span></h2>
          <ol className="grid gap-8 md:grid-cols-3">
            {[
              { mot: "Prévu", texte: "Chaque moment a sa version abritée, écrite avant la signature." },
              { mot: "Chiffré", texte: "Ses lignes et son prix sont dans le devis, à côté du plan A." },
              { mot: "Réservé", texte: "La grange est retenue à ta date dès le premier jour." },
            ].map((p, i) => (
              <li key={p.mot} className="space-y-3 border-t border-[#4A5A70] pt-5">
                <p className="flex items-baseline gap-3">
                  <span className="text-sm tabular-nums text-[#B9C6D6]">0{i + 1}</span>
                  <span className="font-[family-name:var(--titres)] text-4xl italic text-[var(--accent)]">{p.mot}.</span>
                </p>
                <p className="text-lg leading-relaxed text-[#B9C6D6]">{p.texte}</p>
              </li>
            ))}
          </ol>
          <Link href={`${DOSSIER}/deux-versions#devis`} className="inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-3.5 font-semibold">Voir un devis d&apos;exemple</Link>
        </div>
      </section>

      {/* Le protocole météo. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative aspect-[4/5] max-h-[560px] overflow-hidden rounded-[32px]">
          <Image src={photos.grange.src} alt={photos.grange.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover object-[50%_55%]" />
        </div>
        <div className="space-y-8">
          <h2 className="text-[46px] sm:text-6xl font-normal leading-[0.98] tracking-[-0.02em]">Une seule décision, <span className="italic">prise à l&apos;avance.</span></h2>
          <ol className="space-y-5">
            {PROTOCOLE.map((p) => (
              <li key={p.quand} className="grid grid-cols-[96px_1fr] gap-4 border-t border-[var(--trait)] pt-4">
                <span className="font-[family-name:var(--titres)] text-2xl italic">{p.quand.replace(/ /g, " ")}</span>
                <span className="leading-relaxed text-[var(--doux)]">{p.texte}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Les cent parapluies. */}
      <section className="px-3 sm:px-6">
        <div className="max-w-6xl mx-auto overflow-hidden rounded-[36px] bg-[#FFF4CF] grid md:grid-cols-2">
          <div className="relative min-h-[300px]">
            <Image src={photos.parapluies.src} alt={photos.parapluies.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
          </div>
          <div className="px-6 py-12 sm:px-12 space-y-5">
            <p className="font-[family-name:var(--titres)] text-6xl italic">× 100</p>
            <h2 className="text-[40px] sm:text-5xl font-normal leading-[1.0]">Cent parapluies jaunes, <span className="italic">aux prénoms des mariés.</span></h2>
            <p className="text-lg leading-relaxed text-[var(--doux)]">À chaque mariage. S&apos;il pleut, ils servent aux photos ; s&apos;il fait beau, à l&apos;ombre. Les invités repartent avec — et les invités d&apos;aujourd&apos;hui sont les mariés de demain.</p>
            <Link href={`${DOSSIER}/parapluies`} className="inline-flex rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-3.5 font-semibold">Mettre vos prénoms dessus</Link>
          </div>
        </div>
      </section>

      {/* L'affiche. */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28 grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--doux)]">Pour le lancement</p>
          <h2 className="text-[46px] sm:text-6xl font-normal leading-[0.98] tracking-[-0.02em]">Une seule affiche.</h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Une promesse de méthode, vraie dès le premier jour. Pas de « il a plu, c&apos;était parfait » : celle-là, on l&apos;écrira après un vrai mariage sous la pluie, avec l&apos;accord des mariés.</p>
        </div>
        <div aria-label="L'affiche de lancement" className="mx-auto w-full max-w-[340px] -rotate-2 rounded-[6px] bg-[var(--sombre)] px-8 pt-12 pb-8 text-[var(--sur-sombre)] shadow-[0_30px_60px_-30px_rgba(47,59,76,0.7)] space-y-16">
          <p className="font-[family-name:var(--titres)] text-[44px] leading-[1.0]">Et s&apos;il pleut&nbsp;? <span className="block italic text-[var(--accent)]">C&apos;est prévu.</span></p>
          <p className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#B9C6D6]">
            <span>Et s&apos;il pleut · wedding planner</span>
            <svg width="22" height="22" viewBox="0 0 40 40" aria-hidden="true"><path d="M8 19c0-6.6 5.4-11 12-11s12 4.4 12 11c-1.6-1.4-3.2-1.4-4 0-.8-1.4-3.2-1.4-4 0-.8-1.4-3.2-1.4-4 0-.8-1.4-3.2-1.4-4 0-.8-1.4-2.4-1.4-4 0z" fill="#F2C230" /><path d="M20 19v9.5a2.5 2.5 0 0 1-5 0" fill="none" stroke="#FBF6EC" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </p>
        </div>
      </section>

      {/* Les prix. */}
      <section id="prix" className="scroll-mt-16 bg-[#E4EAF1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 space-y-10">
          <div className="space-y-4">
            <h2 className="text-[46px] sm:text-6xl font-normal leading-[0.98] tracking-[-0.02em]">Les prix, <span className="italic">plan B compris.</span></h2>
            <p className="max-w-xl text-lg text-[var(--doux)]">Le plan B n&apos;est jamais une option : il est dans chaque formule.</p>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {FORMULES.map((f) => (
              <li key={f.titre} className="rounded-[28px] bg-[var(--carte)] p-6 sm:p-8 space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--doux)]">{f.sous}</p>
                <h3 className="text-4xl font-normal italic">{f.titre}</h3>
                <p className="font-[family-name:var(--titres)] text-4xl tabular-nums">dès {euros(f.prix)} <span className="text-base">TTC</span></p>
                <ul className="space-y-2 border-t border-[var(--trait)] pt-4">
                  {f.compris.map((c) => <li key={c} className="flex gap-3"><span aria-hidden="true">☂</span>{c}</li>)}
                </ul>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple, toutes taxes comprises. Le devis précis, en deux versions, suit le premier rendez-vous, gratuit.</p>
        </div>
      </section>

      {/* Questions. */}
      <section className="max-w-4xl mx-auto px-5 sm:px-6 py-20 sm:py-28 space-y-8">
        <h2 className="text-[46px] sm:text-6xl font-normal leading-[0.98] tracking-[-0.02em]">Les questions <span className="italic">qu&apos;on nous pose.</span></h2>
        <div className="border-t border-[var(--trait)]">
          {QUESTIONS.map((q) => (
            <details key={q.question} className="group border-b border-[var(--trait)]">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 font-[family-name:var(--titres)] text-[26px] leading-tight [&::-webkit-details-marker]:hidden">
                {q.question}
                <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pb-6 text-lg leading-relaxed text-[var(--doux)]">{q.reponse}</p>
            </details>
          ))}
        </div>
      </section>

      {/* L'appel. */}
      <section className="relative isolate overflow-hidden bg-[#1E2733] text-[var(--sur-sombre)]">
        <Image src={photos.lac.src} alt="" fill sizes="100vw" className="-z-10 object-cover object-[50%_60%] opacity-25" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#1E2733b3_0%,#1E273326_45%,#1E2733cc_100%)]" />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-24 sm:py-32 space-y-6">
          <h2 className="text-[52px] sm:text-8xl font-normal leading-[0.95]">Tu dirais <span className="italic text-[var(--accent)]">oui&nbsp;?</span></h2>
          <p className="max-w-md text-lg text-[#D4DCE6]">Un premier rendez-vous, gratuit : on parle de ton mariage, dans ses deux versions.</p>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-4 text-lg font-semibold">{entreprise.telephone}</a>
        </div>
      </section>
    </div>
  );
}
